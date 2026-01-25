import { create } from 'zustand'
import type { User, SessionInfo } from '@/types'

interface UserState {
  user: User | null
  webSiteName: string
  ncscUrl: string
  uploadSize: number
  isLoading: boolean
  setSessionInfo: (info: SessionInfo) => void
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  clear: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  webSiteName: '',
  ncscUrl: '',
  uploadSize: 0,
  isLoading: true,
  setSessionInfo: (info) =>
    set({
      user: info.user,
      webSiteName: info.webSiteName,
      ncscUrl: info.ncscUrl,
      uploadSize: info.uploadSize,
      isLoading: false,
    }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  clear: () =>
    set({
      user: null,
      webSiteName: '',
      ncscUrl: '',
      uploadSize: 0,
    }),
}))
