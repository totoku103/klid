import api from './axios'
import type { HistSearchParams, UserInoutHist, SmsEmailHist, UserActHist } from '@/types'

interface ListResponse<T> {
  resultData: T[]
}

export const histApi = {
  getUserInoutHistList: async (params: HistSearchParams): Promise<UserInoutHist[]> => {
    const response = await api.get<ListResponse<UserInoutHist>>(
      '/main/hist/userInoutHist/getList.do',
      { params }
    )
    return response.data.resultData
  },

  getSmsEmailHistList: async (params: HistSearchParams): Promise<SmsEmailHist[]> => {
    const response = await api.get<ListResponse<SmsEmailHist>>(
      '/main/hist/smsEmailHist/getList.do',
      { params }
    )
    return response.data.resultData
  },

  getUserActHistList: async (params: HistSearchParams): Promise<UserActHist[]> => {
    const response = await api.get<ListResponse<UserActHist>>(
      '/main/hist/userActHist/getList.do',
      { params }
    )
    return response.data.resultData
  },

  exportExcel: async (histType: string, params: HistSearchParams): Promise<Blob> => {
    const response = await api.get(`/main/hist/${histType}/exportExcel.do`, {
      params,
      responseType: 'blob',
    })
    return response.data
  },
}
