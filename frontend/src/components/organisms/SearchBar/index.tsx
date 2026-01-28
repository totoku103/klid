import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Re-export from molecules for backward compatibility
export {
  SearchLabel,
  SearchSelect,
  SearchMultiSelect,
  SearchTextInput,
  SearchDateInput,
  SearchDateRange,
  SearchPeriodRange,
  SearchCheckbox,
  SearchField,
} from '@/components/molecules/SearchControls'

export type {
  SearchLabelProps,
  SearchSelectOption,
  SearchSelectProps,
  SearchMultiSelectProps,
  SearchTextInputProps,
  SearchDateRangeProps,
  SearchPeriodRangeProps,
  SearchCheckboxProps,
  SearchFieldProps,
} from '@/components/molecules/SearchControls'

// Backward compatibility alias: SearchInput -> SearchTextInput
export { SearchTextInput as SearchInput } from '@/components/molecules/SearchControls'
export type { SearchTextInputProps as SearchInputProps } from '@/components/molecules/SearchControls'

/**
 * SearchBar - 검색 조건 영역 컨테이너
 */
export interface SearchBarProps {
  children: ReactNode
  className?: string
}

export function SearchBar({ children, className }: SearchBarProps) {
  return (
    <div
      className={cn(
        'my-[5px] h-[50px] w-full space-y-2 rounded border border-gray-300 bg-gray-50 p-2',
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * SearchRow - 검색 조건 행
 */
export interface SearchRowProps {
  children: ReactNode
  className?: string
}

export function SearchRow({ children, className }: SearchRowProps) {
  return (
    <div className={cn('flex flex-nowrap items-center gap-2', className)}>
      {children}
    </div>
  )
}
