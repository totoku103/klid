import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  isHome?: boolean
  isCurrent?: boolean
}

export interface PageNavProps {
  title: string
  breadcrumb: BreadcrumbItem[]
  className?: string
  actions?: ReactNode
}

export function PageNav({ title, breadcrumb, className }: PageNavProps) {
  return (
    <nav aria-label="페이지 경로" className={cn('border-b border-gray-200 bg-white', className)}>
      <div className="flex items-center justify-between px-4 py-2">
        {/* 좌측: 페이지 이름 */}
        <div className="flex items-center">
          <img src="/img/navi/pagename-prefix.png" alt="" className="mr-2" />
          <h1 className="text-lg font-bold text-gray-900">{title}</h1>
        </div>

        {/* 우측: 브레드크럼브 경로 */}
        <div className="flex items-center text-sm text-gray-600">
          <img src="/img/navi/breadcrumb.gif" alt="" className="mr-2" />
          {breadcrumb.map((item, index) => (
            <span key={index} className="flex items-center">
              <span
                className={cn(
                  item.isCurrent ? 'text-gray-900 font-medium' : 'text-gray-500'
                )}
              >
                {item.label}
              </span>
              {index < breadcrumb.length - 1 && (
                <span className="mx-2 text-gray-400">&gt;</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </nav>
  )
}

export function createBreadcrumb(
  page: string,
  pageGroup: string,
  pageMenu: string
): BreadcrumbItem[] {
  return [
    { label: '홈', isHome: true },
    { label: page },
    { label: pageGroup },
    { label: pageMenu, isCurrent: true },
  ]
}
