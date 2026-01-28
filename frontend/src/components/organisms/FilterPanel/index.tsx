import { cn } from '@/lib/utils'

export interface FilterPanelProps {
  children: React.ReactNode
  className?: string
}

export function FilterPanel({ children, className }: FilterPanelProps) {
  return (
    <div id="filter-panel" className={cn('flex items-start gap-2 flex-shrink-0', className)}>
      {children}
    </div>
  )
}
