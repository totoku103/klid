import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export const SearchDateInput = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="date"
      className={cn(
        'shrink-0 h-[30px] rounded border border-gray-300 px-2 text-sm',
        className
      )}
      {...props}
    />
  )
})
SearchDateInput.displayName = 'SearchDateInput'
