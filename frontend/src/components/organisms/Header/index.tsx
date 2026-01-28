import { useCallback, useEffect } from 'react'
import { useUserStore } from '@/stores/userStore'
import { sessionApi } from './api'
import { cn } from '@/lib/utils'
import { LAYOUT_MIN_WIDTH_CLASS } from '@/constants/layout'
import type { SessionInfo } from '@/types'

const MOCK_SESSION_INFO: SessionInfo = {
  user: {
    userId: 'test',
    userName: '테스트 사용자',
    instCd: 1,
    instNm: '테스트 기관',
    boardRole: {
      tbz: { role01: 'N', role02: 'N', role03: 'N', role04: 'N', role05: 'N', role06: 'N' },
      notice: { role01: 'N', role02: 'N', role03: 'N', role04: 'N', role05: 'N', role06: 'N' },
      resource: { role01: 'N', role02: 'N', role03: 'N', role04: 'N', role05: 'N', role06: 'N' },
      share: { role01: 'N', role02: 'N', role03: 'N', role04: 'N', role05: 'N', role06: 'N' },
      qna: { role01: 'N', role02: 'N', role03: 'N', role04: 'N', role05: 'N', role06: 'N' },
    },
    authRole: {
      main: 'AUTH_MAIN_1',
      sub: '',
      grpNo: 1,
      grpName: '기본',
    },
  },
  webSiteName: '사이버 침해대응시스템',
  ncscUrl: 'https://www.ncsc.go.kr',
  uploadSize: 10485760,
}

export interface HeaderProps {
  className?: string
  onUserClick?: () => void
}

export function Header({ className, onUserClick }: HeaderProps) {
  const { user, sessionValidated, setSessionInfo, setLoading, clear } = useUserStore()

  useEffect(() => {
    const checkSession = async () => {
      // 이미 검증 완료면 스킵
      if (sessionValidated && user) {
        setLoading(false)
        return
      }

      try {
        const sessionInfo = await sessionApi.getSessionInfo()
        setSessionInfo(sessionInfo)
      } catch {
        if (import.meta.env.DEV) {
          // DEV 모드에서는 MOCK_SESSION_INFO 사용
          setSessionInfo(MOCK_SESSION_INFO)
        } else {
          clear()
          window.location.href = '/login'
        }
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [sessionValidated, user, setSessionInfo, setLoading, clear])

  const handleLogout = useCallback(async () => {
    try {
      await sessionApi.logout()
      window.location.href = '/login'
    } catch {
      window.location.href = '/login'
    }
  }, [])

  // Note: localCd property removed from User type - city logo display disabled
  const showCityLogo = false

  return (
    <div id="app-header" className={cn('w-full', LAYOUT_MIN_WIDTH_CLASS, className)}>
      <div className="flex h-[60px] items-center justify-between bg-white px-4">
        <a
          href="/main"
          className="flex items-center gap-3 text-gray-900 no-underline hover:no-underline"
        >
          {showCityLogo && (
            <img
              src="/img/city-logo/default_cityLogo.png"
              alt="로고"
              className="h-10"
            />
          )}
          <span className="text-lg font-bold text-[#005e9e]">사이버 침해대응시스템</span>
        </a>

        <ul className="flex items-center gap-4 text-sm text-gray-900">
          <li>
            <button
              onClick={handleLogout}
              className="font-bold cursor-pointer"
              type="button"
            >
              Logout
            </button>
          </li>
          <li>
            |
          </li>
          <li>
            <button
              onClick={onUserClick}
              className="font-bold cursor-pointer"
              type="button"
            >
              {user?.userName || '사용자'}
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
