import { type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { cn } from '@/lib/utils'
import { useNavigationStore, type NavigationHistoryItem } from '@/stores/navigationStore'
import { X } from 'lucide-react'

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

export function PageNav({ title, className }: PageNavProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { history, removeFromHistory } = useNavigationStore()

  const handleTabClick = (item: NavigationHistoryItem) => {
    if (item.path !== location.pathname) {
      navigate(item.path)
    }
  }

  const handleTabClose = (e: React.MouseEvent, path: string) => {
    e.stopPropagation()
    const currentIndex = history.findIndex((h) => h.path === path)
    const isCurrentTab = path === location.pathname

    removeFromHistory(path)

    // 현재 탭을 닫는 경우 다른 탭으로 이동
    if (isCurrentTab && history.length > 1) {
      const remainingHistory = history.filter((h) => h.path !== path)
      if (remainingHistory.length > 0) {
        // 다음 탭이 있으면 다음 탭으로, 없으면 이전 탭으로
        const nextIndex = Math.min(currentIndex, remainingHistory.length - 1)
        navigate(remainingHistory[nextIndex].path)
      }
    }
  }

  return (
    <div className={cn('border-b border-gray-200 bg-white', className)}>
      <div className="flex items-center justify-between px-4 py-2">
        {/* 좌측: 페이지 이름 */}
        <div className="flex items-center">
          <h1 className="text-lg font-bold text-gray-900">{title}</h1>
        </div>

        {/* 우측: 네비게이션 히스토리 탭 */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-[70%]">
          {history.map((item) => {
            const isActive = item.path === location.pathname
            return (
              <div
                key={item.path}
                onClick={() => handleTabClick(item)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-md cursor-pointer transition-colors text-sm whitespace-nowrap',
                  isActive
                    ? 'bg-[#036ca5] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                <span className="max-w-[120px] truncate">{item.title}</span>
                <button
                  onClick={(e) => handleTabClose(e, item.path)}
                  className={cn(
                    'flex items-center justify-center w-4 h-4 rounded-full transition-colors',
                    isActive
                      ? 'hover:bg-white/20 text-white'
                      : 'hover:bg-gray-300 text-gray-500'
                  )}
                >
                  <X size={12} />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
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
