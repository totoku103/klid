import { memo, useEffect, useRef, useId } from 'react'
import { useConfirmStore } from '@/stores/confirmStore'

export const GlobalConfirmModal = memo(function GlobalConfirmModal() {
  const { confirm, resolveConfirm } = useConfirmStore()
  const confirmButtonRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const descId = useId()

  useEffect(() => {
    if (confirm.isOpen) {
      confirmButtonRef.current?.focus()
    }
  }, [confirm.isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!confirm.isOpen) return

      if (e.key === 'Escape') {
        resolveConfirm(false)
      } else if (e.key === 'Enter') {
        resolveConfirm(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [confirm.isOpen, resolveConfirm])

  if (!confirm.isOpen) return null

  const displayTitle = confirm.title || '확인'

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50"
      onClick={() => resolveConfirm(false)}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start">
            <div 
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100"
              aria-hidden="true"
            >
              <svg
                className="h-6 w-6 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <div className="ml-4 flex-1">
              <h3 id={titleId} className="text-lg font-semibold text-gray-900">
                {displayTitle}
              </h3>
              <p id={descId} className="mt-2 whitespace-pre-wrap text-sm text-gray-700">
                {confirm.message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-gray-200 bg-gray-50 px-6 py-3">
          <button
            type="button"
            onClick={() => resolveConfirm(false)}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {confirm.cancelText}
          </button>
          <button
            ref={confirmButtonRef}
            type="button"
            onClick={() => resolveConfirm(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {confirm.confirmText}
          </button>
        </div>
      </div>
    </div>
  )
})
