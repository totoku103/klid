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
  onRowSelect: _onRowSelect,
  onRowDoubleClick: _onRowDoubleClick,
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
      await import('jqwidgets-framework/jqwidgets/jqxmenu')
      await import('jqwidgets-framework/jqwidgets/jqxgrid')
      await import('jqwidgets-framework/jqwidgets/jqxgrid.selection')
      await import('jqwidgets-framework/jqwidgets/jqxgrid.pager')
      await import('jqwidgets-framework/jqwidgets/jqxgrid.sort')
      await import('jqwidgets-framework/jqwidgets/jqxgrid.filter')

      const $ = (window as unknown as { $: unknown }).$ as (
        el: HTMLElement
      ) => { jqxGrid: (options: unknown) => void }
      const jqx = (window as unknown as { jqx: { dataAdapter: new (source: unknown) => unknown } }).jqx

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
        enabletooltips: true,
        columnsheight: 26,
        rowsheight: 22,
        altrows: false,
        enablebrowserselection: true,
        showpinnedcolumnbackground: false,
        showsortcolumnbackground: false,
      }

      $(gridRef.current).jqxGrid(gridOptions)
    } catch (error) {
      console.error('Failed to initialize jqxGrid:', error)
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
  ])

  useEffect(() => {
    initGrid()
  }, [initGrid])

  return (
    <div
      id={id}
      ref={gridRef}
      className={cn('jqx-grid-container', className)}
      style={style}
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
      const source = grid.jqxGrid('source') as { _source: { localdata: unknown[] } }
      source._source.localdata = data
      grid.jqxGrid('updatebounddata')
    },
    [getGrid]
  )

  return {
    refresh,
    getSelectedRow,
    getSelectedRows,
    clearSelection,
    setLocalData,
  }
}
