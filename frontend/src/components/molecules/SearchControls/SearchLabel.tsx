import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface SearchLabelProps {
  children: ReactNode
  className?: string
}

export function SearchLabel({ children, className }: SearchLabelProps) {
  return (
    <label className={cn('shrink-0 h-[30px] flex items-center text-sm whitespace-nowrap', className)}>
      {children}
    </label>
  )
}
