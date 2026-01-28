import api from '@/config/axios'
import type { MenuItem, MenuApiResponse } from '@/types'
import { transformMenuApiResponse } from '@/types/menu'

export const menuApi = {
  getMenuList: async (): Promise<MenuItem[]> => {
    const response = await api.get<MenuApiResponse>('/api/menu')
    return transformMenuApiResponse(response.data)
  },
}
