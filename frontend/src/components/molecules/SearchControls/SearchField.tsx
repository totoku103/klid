import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { SearchLabel } from './SearchLabel'

export interface SearchFieldProps {
  label: string
  children: ReactNode
  className?: string
}

export function SearchField({ label, children, className }: SearchFieldProps) {
  return (
    <div className={cn('shrink-0 flex items-center gap-1', className)}>
      <SearchLabel>{label}</SearchLabel>
      {children}
    </div>
  )
}
