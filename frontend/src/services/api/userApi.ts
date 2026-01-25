import api from './axios'
import type { SessionInfo, MenuItem, MenuApiResponse } from '@/types'
import { transformMenuApiResponse } from '@/types/menu'

export const userApi = {
  getSessionInfo: async (): Promise<SessionInfo> => {
    const response = await api.get<SessionInfo>('/api/user/session-info.do')
    return response.data
  },

  getMenuList: async (): Promise<MenuItem[]> => {
    if (import.meta.env.DEV) {
      const response = await fetch('/data/menu.json')
      const data: MenuApiResponse = await response.json()
      return transformMenuApiResponse(data)
    }
    const response = await api.get<MenuItem[]>('/api/menu/list.do')
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.post('/api/auth/logout.do')
  },
}
