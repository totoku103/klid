import { useEffect } from 'react'
import { useParams } from 'react-router'
import { HistoryPolicy202502 } from '../HistoryPolicy202502'
import { HistoryPolicy202403 } from '../HistoryPolicy202403'
import { HistoryPolicy201901 } from '../HistoryPolicy201901'

const POLICY_MAP: Record<string, { title: string; component: React.ReactNode }> = {
  '2025-02': { title: '2025. 2. 16 ~ 2025. 6. 30 적용지침', component: <HistoryPolicy202502 /> },
  '2024-03': { title: '2024. 3. 15 ~ 2025. 2. 16 적용지침', component: <HistoryPolicy202403 /> },
  '2019-01': { title: '2019. 1. 1. ~ 2024. 3. 14 적용지침', component: <HistoryPolicy201901 /> },
}

export function HistoryPolicyPage() {
  const { version } = useParams<{ version: string }>()
  const policy = version ? POLICY_MAP[version] : null

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.close()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  if (!policy) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>해당 버전의 개인정보처리방침을 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-between border-b bg-[#22516d] px-4 py-2">
        <h2 className="font-bold text-white">{policy.title}</h2>
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
        {policy.component}
      </div>
    </div>
  )
}
