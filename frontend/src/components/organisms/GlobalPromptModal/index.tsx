import { memo, useEffect, useRef, useState, useId } from 'react'
import { usePromptStore } from '@/stores/promptStore'

export const GlobalPromptModal = memo(function GlobalPromptModal() {
  const { prompt, resolvePrompt } = usePromptStore()
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const titleId = useId()
  const descId = useId()
  const inputId = useId()

  useEffect(() => {
    if (prompt.isOpen) {
      setInputValue(prompt.defaultValue)
      setTimeout(() => {
        inputRef.current?.focus()
        inputRef.current?.select()
      }, 0)
    }
  }, [prompt.isOpen, prompt.defaultValue])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!prompt.isOpen) return

      if (e.key === 'Escape') {
        resolvePrompt(null)
      } else if (e.key === 'Enter') {
        resolvePrompt(inputValue.trim() || null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [prompt.isOpen, inputValue, resolvePrompt])

  if (!prompt.isOpen) return null

  const displayTitle = prompt.title || '입력'

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50"
      onClick={() => resolvePrompt(null)}
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
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100"
              aria-hidden="true"
            >
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
            <div className="ml-4 flex-1">
              <h3 id={titleId} className="text-lg font-semibold text-gray-900">
                {displayTitle}
              </h3>
              <label id={descId} htmlFor={inputId} className="mt-2 block whitespace-pre-wrap text-sm text-gray-700">
                {prompt.message}
              </label>
              <input
                id={inputId}
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={prompt.placeholder}
                aria-describedby={descId}
                className="mt-3 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-gray-200 bg-gray-50 px-6 py-3">
          <button
            type="button"
            onClick={() => resolvePrompt(null)}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {prompt.cancelText}
          </button>
          <button
            type="button"
            onClick={() => resolvePrompt(inputValue.trim() || null)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {prompt.confirmText}
          </button>
        </div>
      </div>
    </div>
  )
})
