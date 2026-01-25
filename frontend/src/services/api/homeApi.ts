import api from './axios'
import type {
  HealthCheckUrl,
  HealthCheckUrlSearchParams,
  HealthCheckStat,
  HealthCheckStatSearchParams,
  HealthCheckHist,
  HealthCheckHistSearchParams,
  ForgeryUrl,
  ForgeryUrlSearchParams,
  ForgeryUrlHist,
  ForgeryUrlHistSearchParams,
} from '@/types'

interface ListResponse<T> {
  resultData: T[]
}

export const homeApi = {
  getHealthCheckUrlList: async (
    params: HealthCheckUrlSearchParams
  ): Promise<HealthCheckUrl[]> => {
    const response = await api.get<ListResponse<HealthCheckUrl>>(
      '/main/home/healthCheckUrl/getHealthCheckUrl.do',
      { params }
    )
    return response.data.resultData
  },

  addHealthCheckUrl: async (data: {
    url: string
    instCd: number
    useYn: string
    moisYn: string
  }): Promise<void> => {
    await api.post('/main/home/healthCheckUrl/addHealthCheckUrl.do', data)
  },

  updateHealthCheckUrl: async (data: {
    seqNo: number
    url: string
    useYn: string
    moisYn: string
  }): Promise<void> => {
    await api.post('/main/home/healthCheckUrl/editHealthCheckUrl.do', data)
  },

  deleteHealthCheckUrl: async (list: number[]): Promise<void> => {
    await api.post('/main/home/healthCheckUrl/delHealthCheckUrl.do', { list })
  },

  watchOnHealthCheckUrl: async (
    list: number[],
    sAuthMain: string
  ): Promise<void> => {
    await api.post('/main/home/healthCheckUrl/editWatchOn.do', {
      list,
      sAuthMain,
    })
  },

  watchOffHealthCheckUrl: async (
    list: number[],
    sAuthMain: string
  ): Promise<void> => {
    await api.post('/main/home/healthCheckUrl/editWatchOff.do', {
      list,
      sAuthMain,
    })
  },

  exportHealthCheckUrl: async (
    params: HealthCheckUrlSearchParams
  ): Promise<void> => {
    const response = await api.get('/main/home/healthCheckUrl/export.do', {
      params,
      responseType: 'blob',
    })
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'healthCheckUrl.xlsx')
    document.body.appendChild(link)
    link.click()
    link.remove()
  },

  getHealthCheckStatList: async (
    params: HealthCheckStatSearchParams
  ): Promise<HealthCheckStat[]> => {
    const response = await api.get<ListResponse<HealthCheckStat>>(
      '/main/home/healthCheckUrl/getHealthCheckStat.do',
      { params }
    )
    return response.data.resultData
  },

  getHealthCheckHistList: async (
    params: HealthCheckHistSearchParams
  ): Promise<HealthCheckHist[]> => {
    const response = await api.get<ListResponse<HealthCheckHist>>(
      '/main/home/healthCheckUrl/getHealthCheckHist.do',
      { params }
    )
    return response.data.resultData
  },

  getForgeryUrlList: async (
    params: ForgeryUrlSearchParams
  ): Promise<ForgeryUrl[]> => {
    const response = await api.get<ListResponse<ForgeryUrl>>(
      '/main/home/forgeryUrl/getForgeryUrl.do',
      { params }
    )
    return response.data.resultData
  },

  getInstNmByInstCd: async (instCd: string): Promise<{ instNm: string }> => {
    const response = await api.post<{ instNm: string }>(
      '/main/home/forgeryUrl/getByInstNm.do',
      { instCd }
    )
    return response.data
  },

  getForgeryUrlHistList: async (
    params: ForgeryUrlHistSearchParams
  ): Promise<ForgeryUrlHist[]> => {
    const response = await api.get<ListResponse<ForgeryUrlHist>>(
      '/main/home/forgeryUrl/getForgeryUrlHist.do',
      { params }
    )
    return response.data.resultData
  },

  getResponseCodeList: async (): Promise<
    { comCode2: string; codeName: string }[]
  > => {
    const response = await api.get<{
      resultData: { comCode2: string; codeName: string }[]
    }>('/code/getCommonCode.do', {
      params: { comCode1: '4017', codeLvl: '2' },
    })
    return response.data.resultData
  },
}
