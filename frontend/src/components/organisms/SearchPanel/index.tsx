import {
  type ReactNode,
  type SelectHTMLAttributes,
  type InputHTMLAttributes,
  forwardRef,
} from 'react'
import { cn } from '@/lib/utils'

/**
 * SearchPanel - 검색 조건 영역 컨테이너
 */
export interface SearchPanelProps {
  children: ReactNode
  className?: string
}

export function SearchPanel({ children, className }: SearchPanelProps) {
  return (
    <div
      className={cn(
        'w-full space-y-2 rounded border border-gray-300 bg-gray-50 p-2',
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

/**
 * SearchLabel - 검색 필드 라벨
 */
export interface SearchLabelProps {
  children: ReactNode
  className?: string
}

export function SearchLabel({ children, className }: SearchLabelProps) {
  return <label className={cn('shrink-0 text-sm whitespace-nowrap', className)}>{children}</label>
}

/**
 * SearchSelect - 검색 조건용 select
 */
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
          'shrink-0 rounded border border-gray-300 px-2 py-1 text-sm',
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

/**
 * SearchMultiSelect - 다중 선택 select
 */
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

/**
 * SearchInput - 검색 조건용 input
 */
export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'xs' | 'sm' | 'md' | 'lg'
}

const INPUT_SIZE_MAP = {
  xs: 'w-20',
  sm: 'w-24',
  md: 'w-32',
  lg: 'w-40',
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, inputSize = 'md', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'shrink-0 rounded border border-gray-300 px-2 py-1 text-sm',
          INPUT_SIZE_MAP[inputSize],
          className
        )}
        {...props}
      />
    )
  }
)
SearchInput.displayName = 'SearchInput'

/**
 * SearchDateInput - 날짜 입력용 input
 */
export const SearchDateInput = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="date"
      className={cn(
        'shrink-0 rounded border border-gray-300 px-2 py-1 text-sm',
        className
      )}
      {...props}
    />
  )
})
SearchDateInput.displayName = 'SearchDateInput'

/**
 * SearchDateRange - 시작~종료 날짜 범위
 */
export interface SearchDateRangeProps {
  startDate: string
  endDate: string
  onStartDateChange: (value: string) => void
  onEndDateChange: (value: string) => void
  className?: string
}

export function SearchDateRange({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className,
}: SearchDateRangeProps) {
  return (
    <div className={cn('shrink-0 flex items-center gap-2', className)}>
      <SearchDateInput
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
      />
      <span className="shrink-0 text-sm">~</span>
      <SearchDateInput
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
      />
    </div>
  )
}

/**
 * SearchCheckbox - 검색 조건용 체크박스
 */
export interface SearchCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

export const SearchCheckbox = forwardRef<HTMLInputElement, SearchCheckboxProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className={cn('shrink-0 flex items-center gap-1 text-sm whitespace-nowrap', className)}>
        <input ref={ref} type="checkbox" {...props} />
        {label}
      </label>
    )
  }
)
SearchCheckbox.displayName = 'SearchCheckbox'

/**
 * SearchField - 라벨 + 컨트롤 조합 (인라인)
 */
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
