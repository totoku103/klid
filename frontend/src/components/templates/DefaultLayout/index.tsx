import { useEffect, useMemo } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Header, MenuBar } from '@/components/organisms'
import { PageNav } from '@/components/molecules'
import { useUserStore } from '@/stores/userStore'
import { useMenuStore } from '@/stores/menuStore'
import { useNavigationStore } from '@/stores/navigationStore'
import type { MenuItem } from '@/types'
import type { BreadcrumbItem } from '@/components/molecules'

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
  const location = useLocation()
  const { user, isLoading } = useUserStore()
  const { menus } = useMenuStore()
  const { addToHistory } = useNavigationStore()

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

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <MenuBar />
      {isLoading || !user ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-lg">로딩 중...</div>
        </div>
      ) : (
        <>
          {title && <PageNav title={title} breadcrumb={breadcrumb} />}
          <div id="main-content" className="flex-1 overflow-auto min-w-[1500px] p-2">
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}
