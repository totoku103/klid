import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface MainLayoutProps {
  children: ReactNode
  header?: ReactNode
  sidebar?: ReactNode
  className?: string
}

export function MainLayout({
  children,
  header,
  sidebar,
  className,
}: MainLayoutProps) {
  return (
    <div className={cn('flex min-h-screen flex-col', className)}>
      {header && (
        <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
          {header}
        </header>
      )}
      <div className="flex flex-1">
        {sidebar && (
          <aside className="w-60 shrink-0 border-r bg-gray-50">
            {sidebar}
          </aside>
        )}
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  )
}

export interface ContentCardProps {
  children: ReactNode
  title?: string
  actions?: ReactNode
  className?: string
}

export function ContentCard({
  children,
  title,
  actions,
  className,
}: ContentCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-white shadow-sm',
        className
      )}
    >
      {(title || actions) && (
        <div className="flex items-center justify-between border-b px-4 py-3">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  )
}
