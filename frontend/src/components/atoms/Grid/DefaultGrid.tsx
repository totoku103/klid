import { useRef, useEffect, useCallback, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'

export interface DefaultGridColumn {
  text: string
  datafield: string
  width?: number | string
  align?: 'left' | 'center' | 'right'
  cellsalign?: 'left' | 'center' | 'right'
  columntype?: 'textbox' | 'checkbox' | 'number' | 'date'
  hidden?: boolean
  cellsrenderer?: (
    row: number,
    column: string,
    value: unknown,
    rowData: Record<string, unknown>
  ) => string
}

export interface DefaultGridDataField {
  name: string
  type?: 'string' | 'number' | 'date' | 'boolean'
}

export interface DefaultGridProps {
  id: string
  columns: DefaultGridColumn[]
  datafields: DefaultGridDataField[]
  data?: unknown[]
  width?: string | number
  height?: string | number
  onRowSelect?: (rowData: Record<string, unknown>, rowIndex: number) => void
  onRowDoubleClick?: (
    rowData: Record<string, unknown>,
    rowIndex: number
  ) => void
  className?: string
  style?: CSSProperties
}

export function DefaultGrid({
  id,
  columns,
  datafields,
  data = [],
  width = '100%',
  height = 400,
  onRowSelect,
  onRowDoubleClick,
  className,
  style,
}: DefaultGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  const initGrid = useCallback(async () => {
    if (!gridRef.current || typeof window === 'undefined') return

    try {
      await import('jqwidgets-scripts/jqwidgets/jqxcore')
      await import('jqwidgets-scripts/jqwidgets/jqxdata')
      await import('jqwidgets-scripts/jqwidgets/jqxbuttons')
      await import('jqwidgets-scripts/jqwidgets/jqxscrollbar')
      await import('jqwidgets-scripts/jqwidgets/jqxmenu')
      await import('jqwidgets-scripts/jqwidgets/jqxgrid')
      await import('jqwidgets-scripts/jqwidgets/jqxgrid.selection')

      interface JqxGridElement {
        jqxGrid: (options: unknown) => void
        on: (event: string, handler: (event: JqxGridEvent) => void) => void
      }

      interface JqxGridEvent {
        args: {
          rowindex: number
          [key: string]: unknown
        }
      }

      const $ = (window as unknown as { $: unknown }).$ as (
        el: HTMLElement
      ) => JqxGridElement
      const jqx = (
        window as unknown as {
          jqx: { dataAdapter: new (source: unknown) => unknown }
        }
      ).jqx

      const source = {
        datatype: 'array',
        datafields,
        localdata: data,
      }

      const gridOptions = {
        width,
        height,
        columns: columns.map((col) => ({
          ...col,
          align: col.align || 'center',
        })),
        source: new jqx.dataAdapter(source),
        selectionmode: 'singlerow',
        columnsresize: true,
        columnsheight: 26,
        rowsheight: 22,
        altrows: false,
        enablebrowserselection: true,
      }

      const $grid = $(gridRef.current)
      $grid.jqxGrid(gridOptions)

      if (onRowSelect) {
        $grid.on('rowselect', (event) => {
          const rowIndex = event.args.rowindex
          const rowData = (
            $grid as unknown as {
              jqxGrid: (method: string, ...args: unknown[]) => unknown
            }
          ).jqxGrid('getrowdata', rowIndex) as Record<string, unknown>
          onRowSelect(rowData, rowIndex)
        })
      }

      if (onRowDoubleClick) {
        $grid.on('celldoubleclick', (event) => {
          const rowIndex = event.args.rowindex
          const rowData = (
            $grid as unknown as {
              jqxGrid: (method: string, ...args: unknown[]) => unknown
            }
          ).jqxGrid('getrowdata', rowIndex) as Record<string, unknown>
          onRowDoubleClick(rowData, rowIndex)
        })
      }
    } catch (error) {
      console.error('Failed to initialize DefaultGrid:', error)
    }
  }, [columns, datafields, data, width, height, onRowSelect, onRowDoubleClick])

  useEffect(() => {
    initGrid()
  }, [initGrid])

  return (
    <div
      id={id}
      ref={gridRef}
      className={cn('default-grid-container', className)}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
    />
  )
}

export function useDefaultGrid(gridId: string) {
  const getGrid = useCallback(() => {
    if (typeof window === 'undefined') return null
    const grid = document.getElementById(gridId)
    if (!grid) return null
    const $ = (window as unknown as { $: unknown }).$ as (
      el: HTMLElement
    ) => { jqxGrid: (method: string, ...args: unknown[]) => unknown }
    return $(grid)
  }, [gridId])

  const refresh = useCallback(() => {
    getGrid()?.jqxGrid('updatebounddata')
  }, [getGrid])

  const getSelectedRow = useCallback((): Record<string, unknown> | null => {
    const grid = getGrid()
    if (!grid) return null
    const rowIndex = grid.jqxGrid('getselectedrowindex') as number
    if (rowIndex === -1) return null
    return grid.jqxGrid('getrowdata', rowIndex) as Record<string, unknown>
  }, [getGrid])

  const clearSelection = useCallback(() => {
    getGrid()?.jqxGrid('clearselection')
  }, [getGrid])

  const setData = useCallback(
    (data: unknown[]) => {
      const grid = getGrid()
      if (!grid) return
      const source = grid.jqxGrid('source') as {
        _source: { localdata: unknown[] }
      }
      source._source.localdata = data
      grid.jqxGrid('updatebounddata')
    },
    [getGrid]
  )

  return {
    refresh,
    getSelectedRow,
    clearSelection,
    setData,
  }
}
