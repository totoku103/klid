import { useEffect } from 'react'
import { useParams } from 'react-router'
import { ComparePolicy202502 } from '../ComparePolicy202502'
import { ComparePolicy202403 } from '../ComparePolicy202403'

const COMPARE_MAP: Record<string, React.ReactNode> = {
  '2025-02': <ComparePolicy202502 />,
  '2024-03': <ComparePolicy202403 />,
}

export function ComparePolicyPage() {
  const { version } = useParams<{ version: string }>()
  const component = version ? COMPARE_MAP[version] : null

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.close()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  if (!component) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>해당 버전의 신·구 대조표를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-between border-b bg-[#22516d] px-4 py-2">
        <h2 className="font-bold text-white">신·구 대조표</h2>
        <button
          onClick={() => window.close()}
          className="text-xl text-white hover:text-gray-200"
          type="button"
          aria-label="닫기"
        >
          ×
        </button>
      </div>
      <div className="overflow-y-auto p-4">
        {component}
      </div>
    </div>
  )
}
