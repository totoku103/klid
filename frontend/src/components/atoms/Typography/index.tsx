import { type HTMLAttributes, forwardRef, type ElementType } from 'react'
import { cn } from '@/lib/utils'

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body'
  | 'small'
  | 'muted'

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-4xl font-bold tracking-tight',
  h2: 'text-3xl font-semibold tracking-tight',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl font-semibold',
  body: 'text-base',
  small: 'text-sm',
  muted: 'text-sm text-[var(--color-text-muted)]',
}

const variantElements: Record<TypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  body: 'p',
  small: 'span',
  muted: 'span',
}

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant
  as?: ElementType
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ variant = 'body', as, className, children, ...props }, ref) => {
    const Component = as || variantElements[variant]

    return (
      <Component
        ref={ref}
        className={cn(variantStyles[variant], className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Typography.displayName = 'Typography'
