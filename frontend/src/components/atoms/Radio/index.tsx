import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={cn(
          'flex cursor-pointer items-center gap-2 text-sm',
          props.disabled && 'cursor-not-allowed opacity-60',
          className
        )}
      >
        <input
          type="radio"
          id={id}
          ref={ref}
          className={cn(
            'size-[18px] cursor-pointer accent-[var(--color-secondary)]',
            props.disabled && 'cursor-not-allowed'
          )}
          {...props}
        />
        {label && <span>{label}</span>}
      </label>
    )
  }
)

Radio.displayName = 'Radio'
