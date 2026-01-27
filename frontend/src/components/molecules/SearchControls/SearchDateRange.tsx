import { cn } from '@/lib/utils'
import { SearchDateInput } from './SearchDateInput'
import { SearchSelect, type SearchSelectOption } from './SearchSelect'

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

export interface SearchPeriodRangeProps {
  periodOptions: SearchSelectOption[]
  periodValue: string
  onPeriodChange: (value: string) => void
  startDate: string
  endDate: string
  onStartDateChange: (value: string) => void
  onEndDateChange: (value: string) => void
  className?: string
}

export function SearchPeriodRange({
  periodOptions,
  periodValue,
  onPeriodChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className,
}: SearchPeriodRangeProps) {
  return (
    <div className={cn('shrink-0 flex items-center gap-2', className)}>
      <SearchSelect
        options={periodOptions}
        value={periodValue}
        onChange={(e) => onPeriodChange(e.target.value)}
      />
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
