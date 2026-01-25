import { forwardRef, type ComponentProps } from 'react'
import { type LucideIcon } from 'lucide-react'
import { Input } from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface InputWithIconProps extends ComponentProps<typeof Input> {
  icon: LucideIcon
  iconPosition?: 'left' | 'right'
}

export const InputWithIcon = forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ icon: Icon, iconPosition = 'left', className, ...props }, ref) => {
    return (
      <div className="relative flex w-full items-center">
        <Icon
          className={cn(
            'absolute size-[18px] text-[var(--color-text-muted)]',
            iconPosition === 'left' ? 'left-3.5' : 'right-3.5'
          )}
        />
        <Input
          ref={ref}
          className={cn(
            iconPosition === 'left' ? 'pl-12' : 'pr-12',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

InputWithIcon.displayName = 'InputWithIcon'
