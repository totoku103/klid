import { useRef, useEffect, useCallback, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'

export interface GridColumn {
  text: string
  datafield: string
  width?: number | string
  align?: 'left' | 'center' | 'right'
  cellsalign?: 'left' | 'center' | 'right'
  columntype?: 'textbox' | 'checkbox' | 'number' | 'date'
  filterable?: boolean
  sortable?: boolean
  hidden?: boolean
  pinned?: boolean
  cellsrenderer?: (
    row: number,
    column: string,
    value: unknown,
    rowData: Record<string, unknown>
  ) => string
}

export interface GridDataSource {
  datatype: 'json' | 'array' | 'xml'
  datafields: Array<{ name: string; type?: string }>
  url?: string
  localdata?: unknown[]
  id?: string
}

export interface DataGridProps {
  id: string
  columns: GridColumn[]
  source: GridDataSource
  width?: string | number
  height?: string | number
  pageable?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
  sortable?: boolean
  filterable?: boolean
  selectionMode?: 'singlerow' | 'multiplerows' | 'checkbox'
  columnsReorder?: boolean
  enableTooltips?: boolean
  onRowSelect?: (rowData: Record<string, unknown>, rowIndex: number) => void
  onRowDoubleClick?: (
    rowData: Record<string, unknown>,
    rowIndex: number
  ) => void
  className?: string
  style?: CSSProperties
}

export function DataGrid({
  id,
  columns,
  source,
  width = '100%',
  height = '100%',
  pageable = true,
  pageSize = 50,
  pageSizeOptions = [50, 100, 500, 1000],
  sortable = true,
  filterable = false,
  selectionMode = 'singlerow',
  columnsReorder = true,
  enableTooltips = true,
  onRowSelect,
  onRowDoubleClick,
  className,
  style,
}: DataGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  const initGrid = useCallback(async () => {
    if (!gridRef.current || typeof window === 'undefined') return

    try {
      await import('jqwidgets-framework/jqwidgets/jqxcore')
      await import('jqwidgets-framework/jqwidgets/jqxdata')
      await import('jqwidgets-framework/jqwidgets/jqxbuttons')
      await import('jqwidgets-framework/jqwidgets/jqxscrollbar')
      await import('jqwidgets-framework/jqwidgets/jqxlistbox')
      await import('jqwidgets-framework/jqwidgets/jqxdropdownlist')
      await import('jqwidgets-framework/jqwidgets/jqxmenu')
      await import('jqwidgets-framework/jqwidgets/jqxgrid')
      await import('jqwidgets-framework/jqwidgets/jqxgrid.selection')
      await import('jqwidgets-framework/jqwidgets/jqxgrid.pager')
      await import('jqwidgets-framework/jqwidgets/jqxgrid.sort')
      await import('jqwidgets-framework/jqwidgets/jqxgrid.filter')
      await import('jqwidgets-framework/jqwidgets/jqxgrid.columnsresize')
      await import('jqwidgets-framework/jqwidgets/jqxgrid.columnsreorder')
      // @ts-expect-error - jqwidgets-framework has no type declarations
      await import('jqwidgets-framework/jqwidgets/jqxgrid.export')

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

      const gridOptions = {
        width,
        height,
        columns: columns.map((col) => ({
          ...col,
          align: col.align || 'center',
        })),
        source: new jqx.dataAdapter(source),
        pageable,
        pagesize: pageSize,
        pagesizeoptions: pageSizeOptions,
        sortable,
        filterable,
        selectionmode: selectionMode,
        columnsresize: true,
        columnsreorder: columnsReorder,
        enabletooltips: enableTooltips,
        columnsheight: 26,
        rowsheight: 22,
        altrows: false,
        enablebrowserselection: true,
        showpinnedcolumnbackground: false,
        showsortcolumnbackground: false,
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
      console.error('Failed to initialize jqxGrid:', error instanceof Error ? error.message : error)
      console.error('Stack:', error instanceof Error ? error.stack : 'No stack')
    }
  }, [
    columns,
    source,
    width,
    height,
    pageable,
    pageSize,
    pageSizeOptions,
    sortable,
    filterable,
    selectionMode,
    columnsReorder,
    enableTooltips,
    onRowSelect,
    onRowDoubleClick,
  ])

  useEffect(() => {
    initGrid()
  }, [initGrid])

  return (
    <div
      id={id}
      ref={gridRef}
      className={cn('jqx-grid-container', className)}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
    />
  )
}

export function useDataGrid(gridId: string) {
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

  const getSelectedRows = useCallback((): Record<string, unknown>[] => {
    const grid = getGrid()
    if (!grid) return []
    const rowIndexes = grid.jqxGrid('getselectedrowindexes') as number[]
    if (!rowIndexes || rowIndexes.length === 0) return []
    return rowIndexes.map(
      (idx) => grid.jqxGrid('getrowdata', idx) as Record<string, unknown>
    )
  }, [getGrid])

  const clearSelection = useCallback(() => {
    getGrid()?.jqxGrid('clearselection')
  }, [getGrid])

  const setLocalData = useCallback(
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

  const exportToExcel = useCallback(
    (filename: string) => {
      getGrid()?.jqxGrid('exportdata', 'xls', filename)
    },
    [getGrid]
  )

  const showColumn = useCallback(
    (datafield: string) => {
      getGrid()?.jqxGrid('showcolumn', datafield)
    },
    [getGrid]
  )

  const hideColumn = useCallback(
    (datafield: string) => {
      getGrid()?.jqxGrid('hidecolumn', datafield)
    },
    [getGrid]
  )

  const getVisibleColumns = useCallback((): string[] => {
    const grid = getGrid()
    if (!grid) return []
    const columns = grid.jqxGrid('columns') as {
      records: Array<{ datafield: string; hidden: boolean }>
    }
    return columns.records
      .filter((col) => !col.hidden)
      .map((col) => col.datafield)
  }, [getGrid])

  return {
    refresh,
    getSelectedRow,
    getSelectedRows,
    clearSelection,
    setLocalData,
    exportToExcel,
    showColumn,
    hideColumn,
    getVisibleColumns,
  }
}
