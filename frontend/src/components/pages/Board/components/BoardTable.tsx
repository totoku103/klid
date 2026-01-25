import { cn } from '@/lib/utils'

export interface BoardColumn<T> {
  key: string
  header: string
  width?: string
  align?: 'left' | 'center' | 'right'
  render?: (value: unknown, row: T, index: number) => React.ReactNode
}

export interface BoardTableProps<T> {
  columns: BoardColumn<T>[]
  data: T[]
  totalCount: number
  isLoading?: boolean
  selectedRow?: T | null
  rowKey: keyof T
  onRowClick?: (row: T) => void
  onRowDoubleClick?: (row: T) => void
  emptyMessage?: string
}

export function BoardTable<T>({
  columns,
  data,
  totalCount,
  isLoading,
  selectedRow,
  rowKey,
  onRowClick,
  onRowDoubleClick,
  emptyMessage = '데이터가 없습니다',
}: BoardTableProps<T>) {
  return (
    <div className="h-full overflow-auto rounded border border-gray-300">
      <table className="w-full border-collapse text-sm">
        <thead className="sticky top-0 bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="border-b border-gray-300 p-2"
                style={{
                  width: col.width,
                  textAlign: col.align || 'center',
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="p-4 text-center text-gray-500"
              >
                로딩 중...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="p-4 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => {
              const key = row[rowKey]
              const isSelected =
                selectedRow && selectedRow[rowKey] === key
              return (
                <tr
                  key={String(key)}
                  onClick={() => onRowClick?.(row)}
                  onDoubleClick={() => onRowDoubleClick?.(row)}
                  className={cn(
                    'cursor-pointer hover:bg-gray-50',
                    isSelected && 'bg-blue-100'
                  )}
                >
                  {columns.map((col) => {
                    let value: unknown
                    if (col.key === 'index') {
                      value = totalCount - idx
                    } else {
                      value = (row as Record<string, unknown>)[col.key]
                    }

                    const content = col.render
                      ? col.render(value, row, idx)
                      : String(value ?? '')

                    return (
                      <td
                        key={String(col.key)}
                        className="border-b border-gray-200 p-2"
                        style={{ textAlign: col.align || 'left' }}
                      >
                        {content}
                      </td>
                    )
                  })}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
