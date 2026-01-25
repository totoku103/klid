import { type LucideIcon, type LucideProps } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface IconProps extends LucideProps {
  icon: LucideIcon
}

export function Icon({ icon: IconComponent, className, ...props }: IconProps) {
  return <IconComponent className={cn('size-4', className)} {...props} />
}

export * from 'lucide-react'
