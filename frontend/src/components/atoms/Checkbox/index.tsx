import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
          type="checkbox"
          id={id}
          ref={ref}
          className={cn(
            'size-[18px] cursor-pointer rounded accent-[var(--color-secondary)]',
            props.disabled && 'cursor-not-allowed'
          )}
          {...props}
        />
        {label && <span>{label}</span>}
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'
