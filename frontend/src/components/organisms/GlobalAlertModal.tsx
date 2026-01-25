import { memo, useEffect, useRef, useId, type ReactNode } from 'react'
import { useAlertStore, type AlertType } from '@/stores/alertStore'

const ALERT_CONFIG: Record<AlertType, { icon: ReactNode; bgColor: string; iconBg: string }> = {
  success: {
    icon: (
      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bgColor: 'bg-green-50',
    iconBg: 'bg-green-100',
  },
  error: {
    icon: (
      <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    bgColor: 'bg-red-50',
    iconBg: 'bg-red-100',
  },
  warning: {
    icon: (
      <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
    bgColor: 'bg-yellow-50',
    iconBg: 'bg-yellow-100',
  },
  info: {
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    ),
    bgColor: 'bg-blue-50',
    iconBg: 'bg-blue-100',
  },
}

const BUTTON_STYLES: Record<AlertType, string> = {
  success: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
  error: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
  warning: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
  info: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
}

const ALERT_TITLES: Record<AlertType, string> = {
  success: '성공',
  error: '오류',
  warning: '경고',
  info: '안내',
}

export const GlobalAlertModal = memo(function GlobalAlertModal() {
  const { alert, hideAlert } = useAlertStore()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const descId = useId()

  useEffect(() => {
    if (alert.isOpen) {
      buttonRef.current?.focus()
    }
  }, [alert.isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && alert.isOpen) {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [alert.isOpen])

  const handleClose = () => {
    alert.onConfirm?.()
    hideAlert()
  }

  if (!alert.isOpen) return null

  const config = ALERT_CONFIG[alert.type]
  const buttonStyle = BUTTON_STYLES[alert.type]

  const displayTitle = alert.title || ALERT_TITLES[alert.type]

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50"
      onClick={handleClose}
      role="presentation"
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className={`w-full max-w-md overflow-hidden rounded-lg shadow-xl ${config.bgColor}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start">
            <div 
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${config.iconBg}`}
              aria-hidden="true"
            >
              {config.icon}
            </div>
            <div className="ml-4 flex-1">
              <h3 id={titleId} className="text-lg font-semibold text-gray-900">
                {displayTitle}
              </h3>
              <p id={descId} className="mt-2 whitespace-pre-wrap text-sm text-gray-700">
                {alert.message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end border-t border-gray-200 bg-white/50 px-6 py-3">
          <button
            ref={buttonRef}
            type="button"
            onClick={handleClose}
            className={`rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonStyle}`}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
})
