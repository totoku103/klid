import api from './axios'
import type {
  LogSearchParams,
  UserConnectLogDaily,
  UserConnectLogPeriod,
  UserConnectLogInstitution,
  UserConnectLogSummary,
  UserActionLogDaily,
  UserActionLogPeriod,
  UserActionLogInstitution,
  UserActionLogSummary,
} from '@/types'

interface ListResponse<T> {
  resultData: T[]
}

export const logsApi = {
  getUserConnectLogDaily: async (params: LogSearchParams): Promise<UserConnectLogDaily[]> => {
    const response = await api.get<ListResponse<UserConnectLogDaily>>(
      '/main/logs/userConnectLog/getDailyList.do',
      { params }
    )
    return response.data.resultData
  },

  getUserConnectLogPeriod: async (params: LogSearchParams): Promise<UserConnectLogPeriod[]> => {
    const response = await api.get<ListResponse<UserConnectLogPeriod>>(
      '/main/logs/userConnectLog/getPeriodList.do',
      { params }
    )
    return response.data.resultData
  },

  getUserConnectLogInstitution: async (
    params: LogSearchParams
  ): Promise<UserConnectLogInstitution[]> => {
    const response = await api.get<ListResponse<UserConnectLogInstitution>>(
      '/main/logs/userConnectLog/getInstitutionList.do',
      { params }
    )
    return response.data.resultData
  },

  getUserConnectLogSummary: async (
    params: LogSearchParams
  ): Promise<UserConnectLogSummary[]> => {
    const response = await api.get<ListResponse<UserConnectLogSummary>>(
      '/main/logs/userConnectLog/getSummaryList.do',
      { params }
    )
    return response.data.resultData
  },

  getUserActionLogDaily: async (params: LogSearchParams): Promise<UserActionLogDaily[]> => {
    const response = await api.get<ListResponse<UserActionLogDaily>>(
      '/main/logs/userActionLog/getDailyList.do',
      { params }
    )
    return response.data.resultData
  },

  getUserActionLogPeriod: async (params: LogSearchParams): Promise<UserActionLogPeriod[]> => {
    const response = await api.get<ListResponse<UserActionLogPeriod>>(
      '/main/logs/userActionLog/getPeriodList.do',
      { params }
    )
    return response.data.resultData
  },

  getUserActionLogInstitution: async (
    params: LogSearchParams
  ): Promise<UserActionLogInstitution[]> => {
    const response = await api.get<ListResponse<UserActionLogInstitution>>(
      '/main/logs/userActionLog/getInstitutionList.do',
      { params }
    )
    return response.data.resultData
  },

  getUserActionLogSummary: async (
    params: LogSearchParams
  ): Promise<UserActionLogSummary[]> => {
    const response = await api.get<ListResponse<UserActionLogSummary>>(
      '/main/logs/userActionLog/getSummaryList.do',
      { params }
    )
    return response.data.resultData
  },

  exportCsv: async (logType: string, params: LogSearchParams): Promise<Blob> => {
    const response = await api.get(`/main/logs/${logType}/exportCsv.do`, {
      params,
      responseType: 'blob',
    })
    return response.data
  },
}
