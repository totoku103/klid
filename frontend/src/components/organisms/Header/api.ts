import api from '@/config/axios'
import type { SessionInfo, User } from '@/types'

export const sessionApi = {
  getSessionInfo: async (): Promise<SessionInfo> => {
    // API는 User 객체를 직접 반환하므로 SessionInfo 형태로 래핑
    const response = await api.get<User>('/api/user/information')
    return {
      user: response.data,
      webSiteName: '사이버 침해대응시스템',
      ncscUrl: 'https://www.ncsc.go.kr',
      uploadSize: 10485760,
    }
  },

  logout: async (): Promise<void> => {
    await api.post('/api/auth/logout.do')
  },
}
