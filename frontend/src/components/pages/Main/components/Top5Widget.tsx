import type { Top5Item } from '@/types'

export interface Top5WidgetProps {
  title: string
  items: Top5Item[]
  headerColor?: string
}

function formatNumber(num: number): string {
  return num.toLocaleString()
}

const BADGE_COLORS = [
  'bg-[#2a5c6e]',
  'bg-[#3a7a8c]',
  'bg-[#4a98aa]',
  'bg-[#5ab6c8]',
  'bg-[#6accd8]',
] as const

export function Top5Widget({
  title,
  items,
  headerColor = '#3a9ebb',
}: Top5WidgetProps) {
  const displayItems = [...items]
  while (displayItems.length < 5) {
    displayItems.push({ name: '-', y: 0 })
  }

  return (
    <div className="h-full rounded border border-gray-200 bg-white shadow-sm">
      <div
        className="px-4 py-2.5 text-sm font-bold text-white"
        style={{ backgroundColor: headerColor }}
      >
        {title}
      </div>
      <div className="divide-y divide-gray-100">
        {displayItems.slice(0, 5).map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex items-center gap-3 px-3 py-2 text-sm"
          >
            <span
              className={`flex h-5 w-5 items-center justify-center text-xs font-bold text-white ${BADGE_COLORS[index]}`}
            >
              {index + 1}
            </span>
            <span className="flex-1 truncate text-gray-700">{item.name}</span>
            <span className="font-bold text-gray-800">
              {formatNumber(item.y)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
