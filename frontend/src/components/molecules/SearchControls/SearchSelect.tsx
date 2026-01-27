import { type SelectHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface SearchSelectOption {
  label: string
  value: string
}

export interface SearchSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  options: SearchSelectOption[]
  placeholder?: string
}

export const SearchSelect = forwardRef<HTMLSelectElement, SearchSelectProps>(
  ({ options, placeholder, className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'shrink-0 h-[30px] rounded border border-gray-300 px-2 text-sm',
          className
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    )
  }
)
SearchSelect.displayName = 'SearchSelect'

export interface SearchMultiSelectProps
  extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    'children' | 'multiple'
  > {
  options: SearchSelectOption[]
}

export const SearchMultiSelect = forwardRef<
  HTMLSelectElement,
  SearchMultiSelectProps
>(({ options, className, ...props }, ref) => {
  return (
    <select
      ref={ref}
      multiple
      className={cn(
        'shrink-0 h-16 rounded border border-gray-300 px-1 py-1 text-sm',
        className
      )}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
})
SearchMultiSelect.displayName = 'SearchMultiSelect'
