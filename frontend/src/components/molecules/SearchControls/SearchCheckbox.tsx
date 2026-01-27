import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface SearchCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

export const SearchCheckbox = forwardRef<HTMLInputElement, SearchCheckboxProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label
        className={cn(
          'shrink-0 h-[30px] flex items-center gap-1 text-sm whitespace-nowrap',
          className
        )}
      >
        <input ref={ref} type="checkbox" {...props} />
        {label}
      </label>
    )
  }
)
SearchCheckbox.displayName = 'SearchCheckbox'
