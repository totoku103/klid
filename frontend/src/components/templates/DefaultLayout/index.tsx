import { useEffect, useMemo } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router'
import { Header, MenuBar } from '@/components/organisms'
import { PageNav } from '@/components/molecules'
import { useUserStore } from '@/stores/userStore'
import { useMenuStore } from '@/stores/menuStore'
import { useNavigationStore } from '@/stores/navigationStore'
import { userApi } from '@/services/api/userApi'
import type { SessionInfo, MenuItem } from '@/types'
import type { BreadcrumbItem } from '@/components/molecules'

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

function findMenuByPath(menus: MenuItem[], path: string): { menu: MenuItem; parents: MenuItem[] } | null {
  for (const menu of menus) {
    if (menu.url === path) {
      return { menu, parents: [] }
    }
    if (menu.children && menu.children.length > 0) {
      const result = findMenuByPath(menu.children, path)
      if (result) {
        return { menu: result.menu, parents: [menu, ...result.parents] }
      }
    }
  }
  return null
}

export function DefaultLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, setSessionInfo, setLoading, isLoading } = useUserStore()
  const { menus, setMenus } = useMenuStore()
  const { addToHistory } = useNavigationStore()

  useEffect(() => {
    const loadSession = async () => {
      if (user) {
        setLoading(false)
        return
      }

      try {
        const sessionInfo = await userApi.getSessionInfo()
        setSessionInfo(sessionInfo)

        const menuList = await userApi.getMenuList()
        setMenus(menuList)
      } catch {
        if (import.meta.env.DEV) {
          setSessionInfo(MOCK_SESSION_INFO)
          try {
            const menuList = await userApi.getMenuList()
            setMenus(menuList)
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

  const { title, breadcrumb } = useMemo(() => {
    const result = findMenuByPath(menus, location.pathname)

    if (!result) {
      return {
        title: '',
        breadcrumb: [{ label: '홈', isHome: true }] as BreadcrumbItem[],
      }
    }

    const { menu, parents } = result
    const breadcrumbItems: BreadcrumbItem[] = [
      { label: '홈', isHome: true },
      ...parents.map((p) => ({ label: p.name })),
      { label: menu.name, isCurrent: true },
    ]

    return {
      title: menu.name,
      breadcrumb: breadcrumbItems,
    }
  }, [menus, location.pathname])

  // 페이지 변경 시 네비게이션 히스토리에 추가
  useEffect(() => {
    if (title && location.pathname) {
      addToHistory({ path: location.pathname, title })
    }
  }, [title, location.pathname, addToHistory])

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
      {title && <PageNav title={title} breadcrumb={breadcrumb} />}
      <div id="main-content" className="flex-1 overflow-auto min-w-[1500px] p-2">
        <Outlet />
      </div>
    </div>
  )
}
