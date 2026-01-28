import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, SessionInfo } from '@/types'

interface UserState {
  user: User | null
  webSiteName: string
  ncscUrl: string
  uploadSize: number
  isLoading: boolean
  isAuthenticated: boolean
  setSessionInfo: (info: SessionInfo) => void
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  hasAuthMain: (auth: string) => boolean
  hasAuthSub: (auth: string) => boolean
  hasBoardRole: (
    board: 'tbz' | 'notice' | 'resource' | 'share' | 'qna',
    roleNum: 1 | 2 | 3 | 4 | 5 | 6
  ) => boolean
  clear: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      webSiteName: '',
      ncscUrl: '',
      uploadSize: 0,
      isLoading: true,
      isAuthenticated: false,
      setSessionInfo: (info) =>
        set({
          user: info.user,
          webSiteName: info.webSiteName,
          ncscUrl: info.ncscUrl,
          uploadSize: info.uploadSize,
          isLoading: false,
          isAuthenticated: true,
        }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      hasAuthMain: (auth) => {
        const { user } = get()
        return user?.authRole.main === auth
      },
      hasAuthSub: (auth) => {
        const { user } = get()
        if (!user?.authRole.sub) return false
        return user.authRole.sub.includes(auth)
      },
      hasBoardRole: (board, roleNum) => {
        const { user } = get()
        if (!user?.boardRole) return false
        const roleKey = `role${String(roleNum).padStart(2, '0')}` as keyof typeof user.boardRole.tbz
        return user.boardRole[board][roleKey] === 'Y'
      },
      clear: () =>
        set({
          user: null,
          webSiteName: '',
          ncscUrl: '',
          uploadSize: 0,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'user-storage',
      storage: {
        getItem: (name) => {
          const value = sessionStorage.getItem(name)
          return value ? JSON.parse(value) : null
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name)
        },
      },
    }
  )
)
