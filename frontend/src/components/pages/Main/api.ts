import api from '@/config/axios'
import type {
  ThreatInfo,
  AccidentStatus,
  YearStatus,
  PeriodSetting,
  PeriodStatus,
  Top5Item,
  DashboardNoticeItem,
  DashboardQnaItem,
  MonitoringCount,
  MonitoringItem,
} from '@/types'

interface ListResponse<T> {
  resultData: T[]
}

interface ContentResponse<T> {
  resultData: {
    contents: T
  }
}

export const mainApi = {
  getThreatNow: async (instCd: string): Promise<ThreatInfo[]> => {
    const response = await api.get<ThreatInfo[]>('/main/sys/getThreatNow.do', {
      params: { instCd },
    })
    return response.data
  },

  getTodayStatus: async (params: {
    sAuthMain: string
    sInstCd: string
    atype: number
  }): Promise<AccidentStatus[]> => {
    const response = await api.get<AccidentStatus[]>(
      '/main/acc/accidentApply/getTodayStatus.do',
      { params }
    )
    return response.data
  },

  getYearStatus: async (params: {
    sAuthMain: string
    sInstCd: string
    atype: number
  }): Promise<YearStatus[]> => {
    const response = await api.get<YearStatus[]>(
      '/main/acc/accidentApply/getYearStatus.do',
      { params }
    )
    return response.data
  },

  getPeriodNow: async (instCd: string): Promise<PeriodSetting[]> => {
    const response = await api.get<PeriodSetting[]>(
      '/main/sys/getPeriodNow.do',
      { params: { instCd } }
    )
    return response.data
  },

  getPeriodStatus: async (params: {
    sAuthMain: string
    sInstCd: string
  }): Promise<PeriodStatus[]> => {
    const response = await api.get<PeriodStatus[]>(
      '/main/acc/accidentApply/getPeriodStatus.do',
      { params }
    )
    return response.data
  },

  getAccdTypeTop5: async (params: {
    atype: number
    sAuthMain: string
    instCd: string
    dateType: string
    startDt: string
    endDt: string
  }): Promise<Top5Item[]> => {
    const response = await api.get<Top5Item[]>(
      '/main/rpt/reportInciType/getTypeList.do',
      { params }
    )
    return response.data
  },

  getInstTop5: async (params: {
    atype: number
    sAuthMain: string
    instCd: string
    dateType: string
    startDt: string
    endDt: string
    topInstView?: string
    sortType?: string
  }): Promise<Top5Item[]> => {
    const url =
      params.sAuthMain === 'AUTH_MAIN_3' || params.sAuthMain === 'AUTH_MAIN_4'
        ? '/main/rpt/reportInciLocal/getInciSidoList.do'
        : '/main/rpt/reportInciLocal/getLocalList.do'

    const response = await api.get<Top5Item[]>(url, { params })
    return response.data
  },

  getNoticeList: async (params: {
    listSize: string
    sAuthMain: string
    sInstCd: string
    sPntInstCd: string
  }): Promise<DashboardNoticeItem[]> => {
    const response = await api.post<ListResponse<DashboardNoticeItem>>(
      '/main/sec/noticeBoard/getMainNoticeList.do',
      null,
      { params }
    )
    return response.data.resultData
  },

  getQnaList: async (params: {
    listSize: string
    sInstCd: string
  }): Promise<DashboardQnaItem[]> => {
    const response = await api.post<ListResponse<DashboardQnaItem>>(
      '/main/sec/qnaBoard/getMainQnaList.do',
      null,
      { params }
    )
    return response.data.resultData
  },

  getMonitoringCount: async (params: {
    sInstCd: string
    sAuthMain: string
  }): Promise<MonitoringCount | null> => {
    const response = await api.post<ContentResponse<MonitoringCount>>(
      '/main/home/forgeryUrl/getMainForgeryCnt.do',
      null,
      { params }
    )
    return response.data.resultData.contents
  },

  getMonitoringList: async (params: {
    sInstCd: string
    time1: string
    time2: string
  }): Promise<MonitoringItem[]> => {
    const response = await api.post<ListResponse<MonitoringItem>>(
      '/main/home/forgeryUrl/getMainForgeryHm.do',
      null,
      { params }
    )
    return response.data.resultData
  },
}
