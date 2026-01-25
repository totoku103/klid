export interface BoardItem {
  id: string
  title: string
  date: string
}

export interface BoardListWidgetProps {
  title: string
  items: BoardItem[]
  onMoreClick?: () => void
  onItemClick?: (id: string) => void
}

export function BoardListWidget({
  title,
  items,
  onMoreClick,
  onItemClick,
}: BoardListWidgetProps) {
  return (
    <div className="h-full rounded border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2.5">
        <span className="bg-[#22516d] px-3 py-1 text-sm font-bold text-white">{title}</span>
        {onMoreClick && (
          <button
            onClick={onMoreClick}
            className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-gray-100 text-gray-500 hover:bg-gray-200"
            type="button"
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </div>
      <div className="divide-y divide-gray-100">
        {items.length > 0 ? (
          items.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id)}
              className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-gray-50"
              type="button"
            >
              <span className="text-gray-400">•</span>
              <span className="flex-1 truncate text-sm text-gray-700">{item.title}</span>
              <span className="shrink-0 text-xs text-gray-400">
                {item.date}
              </span>
            </button>
          ))
        ) : (
          <div className="px-3 py-4 text-center text-sm text-gray-400">
            데이터가 없습니다
          </div>
        )}
      </div>
    </div>
  )
}
