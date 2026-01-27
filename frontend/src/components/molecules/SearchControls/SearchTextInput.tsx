import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface SearchTextInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'xs' | 'sm' | 'md' | 'lg'
}

const INPUT_SIZE_MAP = {
  xs: 'w-20',  // 80px
  sm: 'w-32',  // 128px
  md: 'w-40',  // 160px (default)
  lg: 'w-48',  // 192px
}

export const SearchTextInput = forwardRef<
  HTMLInputElement,
  SearchTextInputProps
>(({ className, inputSize = 'md', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'shrink-0 h-[30px] rounded border border-gray-300 px-2 text-sm',
        INPUT_SIZE_MAP[inputSize],
        className
      )}
      {...props}
    />
  )
})
SearchTextInput.displayName = 'SearchTextInput'
