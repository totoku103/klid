import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface AuthLayoutProps {
  children: ReactNode
  className?: string
}

export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div
      className={cn(
        'min-h-screen bg-[#040b16] bg-cover bg-center bg-no-repeat bg-fixed',
        className
      )}
      style={{ backgroundImage: "url('/img/login-background.jpg')" }}
    >
      <div className="flex min-h-screen items-center justify-center p-5">
        {children}
      </div>
    </div>
  )
}

export interface AuthBoxProps {
  children: ReactNode
  className?: string
}

export function AuthBox({ children, className }: AuthBoxProps) {
  return (
    <div
      className={cn(
        'w-[810px] rounded-[20px] border-[3px] border-[rgba(103,197,255,0.85)] bg-[#132a56] p-[30px]',
        'shadow-[0_20px_50px_rgba(4,9,20,0.38),0_10px_25px_rgba(13,36,76,0.28),inset_0_1px_0_rgba(103,197,255,0.2)]',
        className
      )}
    >
      {children}
    </div>
  )
}
