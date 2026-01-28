import { Outlet } from 'react-router'
import { Header, MenuBar } from '@/components/organisms'
import { useUserStore } from '@/stores/userStore'

export function SimpleLayout() {
  const { user, isLoading } = useUserStore()

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <MenuBar />
      {isLoading || !user ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-lg">로딩 중...</div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto min-w-[1500px]">
          <Outlet />
        </div>
      )}
    </div>
  )
}
