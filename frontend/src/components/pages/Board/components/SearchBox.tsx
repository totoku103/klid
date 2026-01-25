import { type ReactNode } from 'react'
import { Button } from '@/components/ui/button'

export interface SearchBoxProps {
  children: ReactNode
  onSearch: () => void
  onWrite?: () => void
  showWriteButton?: boolean
}

export function SearchBox({
  children,
  onSearch,
  onWrite,
  showWriteButton = true,
}: SearchBoxProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-4 rounded border border-gray-200 bg-gray-50 p-3">
      <div className="flex flex-1 flex-wrap items-center gap-3">{children}</div>
      <div className="flex gap-2">
        <Button onClick={onSearch} size="sm">
          검색
        </Button>
        {showWriteButton && onWrite && (
          <Button onClick={onWrite} size="sm" variant="outline">
            글쓰기
          </Button>
        )}
      </div>
    </div>
  )
}

export interface SearchFieldProps {
  label: string
  children: ReactNode
}

export function SearchField({ label, children }: SearchFieldProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  )
}
