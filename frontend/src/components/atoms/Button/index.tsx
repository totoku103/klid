import { type ComponentProps } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { type VariantProps } from 'class-variance-authority'

export type ButtonProps = ComponentProps<typeof Button> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export { Button, buttonVariants }
