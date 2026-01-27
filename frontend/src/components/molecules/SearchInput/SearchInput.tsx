import { forwardRef, type ComponentProps } from 'react'
import { Search } from 'lucide-react'
import { Input, Button } from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface SearchInputProps
  extends Omit<ComponentProps<typeof Input>, 'onSubmit'> {
  onSearch?: (value: string) => void
  buttonText?: string
  showButton?: boolean
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      onSearch,
      buttonText = '조회',
      showButton = true,
      className,
      ...props
    },
    ref
  ) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const value = formData.get('search') as string
      onSearch?.(value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !showButton) {
        onSearch?.(e.currentTarget.value)
      }
    }

    return (
      <form onSubmit={handleSubmit} className={cn('flex gap-2', className)}>
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[var(--color-text-muted)]" />
          <Input
            ref={ref}
            name="search"
            className="pl-12"
            onKeyDown={handleKeyDown}
            {...props}
          />
        </div>
        {showButton && <Button type="submit">{buttonText}</Button>}
      </form>
    )
  }
)

SearchInput.displayName = 'SearchInput'
