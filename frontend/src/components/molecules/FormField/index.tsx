import { type ReactNode } from 'react'
import { Label } from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface FormFieldProps {
  label: string
  htmlFor?: string
  required?: boolean
  error?: string
  className?: string
  children: ReactNode
}

export function FormField({
  label,
  htmlFor,
  required,
  error,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={htmlFor} className="flex items-center gap-1">
        {label}
        {required && <span className="text-[var(--color-error)]">*</span>}
      </Label>
      {children}
      {error && (
        <p className="text-sm text-[var(--color-error)]">{error}</p>
      )}
    </div>
  )
}
