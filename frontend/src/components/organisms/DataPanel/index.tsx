import { cn } from '@/lib/utils'

export interface DataPanelProps {
  children: React.ReactNode
  className?: string
}

export function DataPanel({ children, className }: DataPanelProps) {
  return (
    <div id="data-panel" className={cn('flex-1 min-h-0', className)}>
      {children}
    </div>
  )
}
