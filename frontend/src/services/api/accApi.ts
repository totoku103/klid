import api from './axios'
import type { Incident, IncidentSearchParams, IncidentAddParams, CodeItem } from '@/types'

interface ListResponse<T> {
  resultData: T[]
}

export const accApi = {
  getAccidentList: async (params: IncidentSearchParams): Promise<Incident[]> => {
    const response = await api.get<ListResponse<Incident>>(
      '/main/acc/accidentApply/getAccidentList.do',
      { params }
    )
    return response.data.resultData
  },

  getAccidentDetail: async (inciNo: string): Promise<Incident> => {
    const response = await api.get<Incident>(
      '/main/acc/accidentApply/getAccidentDetail.do',
      { params: { inciNo } }
    )
    return response.data
  },

  addAccident: async (data: IncidentAddParams): Promise<void> => {
    await api.post('/main/acc/accidentApply/addAccidentApply.do', data)
  },

  updateAccident: async (data: Partial<Incident>): Promise<void> => {
    await api.post('/main/acc/accidentApply/updateAccidentApply.do', data)
  },

  deleteAccident: async (inciNo: string): Promise<void> => {
    await api.post('/main/acc/accidentApply/deleteAccidentApply.do', { inciNo })
  },

  copyAccident: async (inciNo: string): Promise<void> => {
    await api.post('/main/acc/accidentApply/copyAccidentApply.do', { inciNo })
  },

  getCommonCode: async (comCode1: string, codeLvl: string = '2'): Promise<CodeItem[]> => {
    const response = await api.get<ListResponse<CodeItem>>(
      '/code/getCommonCode.do',
      { params: { comCode1, codeLvl } }
    )
    return response.data.resultData
  },

  exportExcel: async (params: IncidentSearchParams): Promise<Blob> => {
    const response = await api.get('/main/acc/accidentApply/exportExcel.do', {
      params,
      responseType: 'blob',
    })
    return response.data
  },

  processAccident: async (params: Record<string, string>): Promise<void> => {
    await api.post('/main/acc/accidentApply/processAccident.do', params)
  },

  getAccidentHistory: async (inciNo: string): Promise<unknown[]> => {
    const response = await api.get<ListResponse<unknown>>(
      '/main/acc/accidentApply/getAccidentHistory.do',
      { params: { inciNo } }
    )
    return response.data.resultData
  },
}
