import { cn } from '@/lib/utils'

export interface NoticeTypeBadgeProps {
  type: string
}

const TYPE_COLORS: Record<string, string> = {
  긴급공지: 'bg-red-600',
  중요공지: 'bg-orange-500',
  일반공지: 'bg-teal-500',
}

export function NoticeTypeBadge({ type }: NoticeTypeBadgeProps) {
  const colorClass = TYPE_COLORS[type] || 'bg-gray-400'
  const displayText = type.replace('공지', '')

  return (
    <span
      className={cn(
        'inline-block rounded-full px-3 py-0.5 text-xs text-white',
        colorClass
      )}
    >
      {displayText}
    </span>
  )
}
