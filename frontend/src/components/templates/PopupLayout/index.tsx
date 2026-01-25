import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface PopupLayoutProps {
  children: ReactNode
  title?: string
  className?: string
}

export function PopupLayout({ children, title, className }: PopupLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-gray-100', className)}>
      {title && (
        <header className="border-b bg-white px-4 py-3 shadow-sm">
          <h1 className="text-lg font-semibold">{title}</h1>
        </header>
      )}
      <main className="p-4">{children}</main>
    </div>
  )
}
