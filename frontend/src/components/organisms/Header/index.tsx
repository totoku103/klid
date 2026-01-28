import { useCallback } from 'react'
import { useUserStore } from '@/stores/userStore'
import { userApi } from '@/services/api/userApi'
import { cn } from '@/lib/utils'
import { LAYOUT_MIN_WIDTH_CLASS } from '@/constants/layout'

export interface HeaderProps {
  className?: string
  onUserClick?: () => void
}

export function Header({ className, onUserClick }: HeaderProps) {
  const { user } = useUserStore()

  const handleLogout = useCallback(async () => {
    try {
      await userApi.logout()
      window.location.href = '/login'
    } catch {
      window.location.href = '/login'
    }
  }, [])

  const showCityLogo =
    user?.localCd !== '1' &&
    user?.localCd !== '-1' &&
    user?.authMain === 'AUTH_MAIN_3'

  return (
    <div id="app-header" className={cn('w-full', LAYOUT_MIN_WIDTH_CLASS, className)}>
      <div className="flex h-[60px] items-center justify-between bg-white px-4">
        <a
          href="/main"
          className="flex items-center gap-3 text-gray-900 no-underline hover:no-underline"
        >
          {showCityLogo && (
            <img
              src={`/img/city-logo/${user.localCd}_cityLogo.png`}
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
