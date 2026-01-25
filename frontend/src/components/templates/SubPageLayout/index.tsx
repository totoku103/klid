import { type ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'

export interface SubPageLayoutProps {
  children: ReactNode
  leftPanel?: ReactNode
  leftPanelTitle?: string
  leftPanelWidth?: number
  locationPath?: string[]
  className?: string
}

export function SubPageLayout({
  children,
  leftPanel,
  leftPanelTitle,
  leftPanelWidth = 250,
  locationPath,
  className,
}: SubPageLayoutProps) {
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false)

  return (
    <div className={cn('flex h-full flex-col overflow-hidden', className)}>
      <div className="flex flex-1 overflow-hidden">
        {leftPanel && (
          <div
            className={cn(
              'flex flex-col border-r border-gray-300 bg-white transition-all',
              isLeftCollapsed ? 'w-0' : ''
            )}
            style={{ width: isLeftCollapsed ? 0 : leftPanelWidth }}
          >
            {leftPanelTitle && (
              <div className="flex items-center justify-between bg-[#22516d] px-4 py-2">
                <span className="text-sm font-bold text-white">
                  {leftPanelTitle}
                </span>
                <button
                  onClick={() => setIsLeftCollapsed(true)}
                  className="text-white hover:text-gray-300"
                  type="button"
                  title="패널 닫기"
                >
                  ◀
                </button>
              </div>
            )}
            <div className="flex-1 overflow-auto">{leftPanel}</div>
          </div>
        )}

        {isLeftCollapsed && leftPanel && (
          <button
            onClick={() => setIsLeftCollapsed(false)}
            className="flex h-full w-6 items-center justify-center border-r border-gray-300 bg-gray-100 hover:bg-gray-200"
            type="button"
            title="패널 열기"
          >
            ▶
          </button>
        )}

        <div className="flex flex-1 flex-col overflow-hidden">
          {locationPath && locationPath.length > 0 && (
            <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-2 text-sm">
              <span className="text-gray-500">위치:</span>
              {locationPath.map((path, index) => (
                <span key={path} className="flex items-center gap-2">
                  {index > 0 && <span className="text-gray-400">&gt;</span>}
                  <span
                    className={
                      index === locationPath.length - 1
                        ? 'font-semibold text-[#036ca5]'
                        : 'text-gray-600'
                    }
                  >
                    {path}
                  </span>
                </span>
              ))}
            </div>
          )}
          <div className="flex-1 overflow-auto p-4">{children}</div>
        </div>
      </div>
    </div>
  )
}

export interface PageToolbarProps {
  children?: ReactNode
  className?: string
}

export function PageToolbar({ children, className }: PageToolbarProps) {
  return (
    <div
      className={cn(
        'mb-4 flex items-center justify-end gap-2',
        className
      )}
    >
      {children}
    </div>
  )
}

export interface ToolbarButtonProps {
  icon: 'add' | 'edit' | 'delete' | 'sms' | 'search' | 'refresh' | 'excel' | 'save' | 'sync' | 'apply'
  onClick: () => void
  disabled?: boolean
  title?: string
}

const ICONS = {
  add: '+',
  edit: '✎',
  delete: '✕',
  sms: '✉',
  search: '🔍',
  refresh: '↻',
  excel: '📊',
  save: '💾',
  sync: '🔄',
  apply: '✓',
}

export function ToolbarButton({
  icon,
  onClick,
  disabled,
  title,
}: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-sm',
        disabled
          ? 'cursor-not-allowed opacity-50'
          : 'hover:bg-gray-100 active:bg-gray-200'
      )}
      type="button"
    >
      {ICONS[icon]}
    </button>
  )
}
