import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Header, MenuBar } from '@/components/organisms'
import { useUserStore } from '@/stores/userStore'
import { useMenuStore } from '@/stores/menuStore'
import { userApi } from '@/services/api/userApi'
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

export function AppLayout() {
  const navigate = useNavigate()
  const { user, setSessionInfo, setLoading, isLoading } = useUserStore()
  const { setMenus } = useMenuStore()

  useEffect(() => {
    const loadSession = async () => {
      if (user) {
        setLoading(false)
        return
      }

      try {
        const sessionInfo = await userApi.getSessionInfo()
        setSessionInfo(sessionInfo)

        const menus = await userApi.getMenuList()
        setMenus(menus)
      } catch {
        if (import.meta.env.DEV) {
          setSessionInfo(MOCK_SESSION_INFO)
          try {
            const menus = await userApi.getMenuList()
            setMenus(menus)
          } catch (menuError) {
            console.error('Failed to load menu:', menuError)
          }
        } else {
          navigate('/login')
        }
      } finally {
        setLoading(false)
      }
    }

    loadSession()
  }, [user, setSessionInfo, setMenus, setLoading, navigate])

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <MenuBar />
      <div className={`flex-1 overflow-auto ${LAYOUT_MIN_WIDTH_CLASS}`}>
        <Outlet />
      </div>
    </div>
  )
}
