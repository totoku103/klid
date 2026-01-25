import api from './axios'
import type {
  ReportSearchParams,
  DailyReport,
  DailyTotReport,
  TypeAccidentReport,
  InciTypeReport,
  InciLocalReport,
  InciPrtyReport,
  InciPrcsStatReport,
  InciSidoReport,
  InciAttNatnReport,
  WeeklyStateReport,
  SecurityDataReport,
  SecurityHackingReport,
  SecurityVulnerabilityReport,
  NoticeReport,
  CtrsDailyStateReport,
  DailySecurityReport,
  InciDetailReport,
  SecurityResultReport,
} from '@/types'

interface ListResponse<T> {
  resultData: T[]
}

export const rptApi = {
  getDailyList: async (params: ReportSearchParams): Promise<DailyReport[]> => {
    const response = await api.get<ListResponse<DailyReport>>(
      '/main/rpt/reportDailyState/getDailyList.do',
      { params }
    )
    return response.data.resultData
  },

  getDailyTotList: async (params: ReportSearchParams): Promise<DailyTotReport[]> => {
    const response = await api.get<ListResponse<DailyTotReport>>(
      '/main/rpt/reportDailyState/getDailyTotList.do',
      { params }
    )
    return response.data.resultData
  },

  getTypeAccidentList: async (params: ReportSearchParams): Promise<TypeAccidentReport[]> => {
    const response = await api.get<ListResponse<TypeAccidentReport>>(
      '/main/rpt/reportDailyState/getTypeAccidentList.do',
      { params }
    )
    return response.data.resultData
  },

  getWeeklyStateList: async (params: ReportSearchParams): Promise<WeeklyStateReport[]> => {
    const response = await api.get<ListResponse<WeeklyStateReport>>(
      '/main/rpt/reportWeeklyState/getWeeklyStateList.do',
      { params }
    )
    return response.data.resultData
  },

  getInciTypeList: async (params: ReportSearchParams): Promise<InciTypeReport[]> => {
    const response = await api.get<ListResponse<InciTypeReport>>(
      '/main/rpt/reportInciType/getInciTypeList.do',
      { params }
    )
    return response.data.resultData
  },

  getInciLocalList: async (params: ReportSearchParams): Promise<InciLocalReport[]> => {
    const response = await api.get<ListResponse<InciLocalReport>>(
      '/main/rpt/reportInciLocal/getInciLocalList.do',
      { params }
    )
    return response.data.resultData
  },

  getInciPrtyList: async (params: ReportSearchParams): Promise<InciPrtyReport[]> => {
    const response = await api.get<ListResponse<InciPrtyReport>>(
      '/main/rpt/reportInciPrty/getInciPrtyList.do',
      { params }
    )
    return response.data.resultData
  },

  getInciPrcsStatList: async (params: ReportSearchParams): Promise<InciPrcsStatReport[]> => {
    const response = await api.get<ListResponse<InciPrcsStatReport>>(
      '/main/rpt/reportInciPrcsStat/getInciPrcsStatList.do',
      { params }
    )
    return response.data.resultData
  },

  getInciSidoList: async (params: ReportSearchParams): Promise<InciSidoReport[]> => {
    const response = await api.get<ListResponse<InciSidoReport>>(
      '/main/rpt/reportInciSido/getInciSidoList.do',
      { params }
    )
    return response.data.resultData
  },

  getInciAttNatnList: async (params: ReportSearchParams): Promise<InciAttNatnReport[]> => {
    const response = await api.get<ListResponse<InciAttNatnReport>>(
      '/main/rpt/reportInciAttNatn/getInciAttNatnList.do',
      { params }
    )
    return response.data.resultData
  },

  getSecurityDataList: async (params: ReportSearchParams): Promise<SecurityDataReport[]> => {
    const response = await api.get<ListResponse<SecurityDataReport>>(
      '/main/rpt/reportSecurityData/getSecurityDataList.do',
      { params }
    )
    return response.data.resultData
  },

  getSecurityHackingList: async (
    params: ReportSearchParams
  ): Promise<SecurityHackingReport[]> => {
    const response = await api.get<ListResponse<SecurityHackingReport>>(
      '/main/rpt/reportSecurityHacking/getSecurityHackingList.do',
      { params }
    )
    return response.data.resultData
  },

  getSecurityVulnerabilityList: async (
    params: ReportSearchParams
  ): Promise<SecurityVulnerabilityReport[]> => {
    const response = await api.get<ListResponse<SecurityVulnerabilityReport>>(
      '/main/rpt/reportSecurityVulnerability/getSecurityVulnerabilityList.do',
      { params }
    )
    return response.data.resultData
  },

  exportHwp: async (reportType: string, params: ReportSearchParams): Promise<Blob> => {
    const response = await api.get(`/main/rpt/${reportType}/exportHwp.do`, {
      params,
      responseType: 'blob',
    })
    return response.data
  },

  getNoticeReportList: async (params: ReportSearchParams): Promise<NoticeReport[]> => {
    const response = await api.get<ListResponse<NoticeReport>>(
      '/main/rpt/reportNotice/getNoticeReportList.do',
      { params }
    )
    return response.data.resultData
  },

  getCtrsDailyStateList: async (params: ReportSearchParams): Promise<CtrsDailyStateReport[]> => {
    const response = await api.get<ListResponse<CtrsDailyStateReport>>(
      '/main/rpt/reportCtrsDailyState/getCtrsDailyStateList.do',
      { params }
    )
    return response.data.resultData
  },

  getCtrsDailyDetailList: async (params: ReportSearchParams): Promise<CtrsDailyStateReport[]> => {
    const response = await api.get<ListResponse<CtrsDailyStateReport>>(
      '/main/rpt/reportCtrsDailyDetail/getCtrsDailyDetailList.do',
      { params }
    )
    return response.data.resultData
  },

  getDailySecurityReport: async (params: ReportSearchParams): Promise<DailySecurityReport[]> => {
    const response = await api.get<ListResponse<DailySecurityReport>>(
      '/main/rpt/reportDailySecurity/getDailySecurityReport.do',
      { params }
    )
    return response.data.resultData
  },

  getInciDetailList: async (params: ReportSearchParams): Promise<InciDetailReport[]> => {
    const response = await api.get<ListResponse<InciDetailReport>>(
      '/main/rpt/reportInciDetail/getInciDetailList.do',
      { params }
    )
    return response.data.resultData
  },

  getDailyInciStateList: async (params: ReportSearchParams): Promise<DailySecurityReport[]> => {
    const response = await api.get<ListResponse<DailySecurityReport>>(
      '/main/rpt/reportDailyInciState/getDailyInciStateList.do',
      { params }
    )
    return response.data.resultData
  },

  getSecurityResultList: async (params: ReportSearchParams): Promise<SecurityResultReport[]> => {
    const response = await api.get<ListResponse<SecurityResultReport>>(
      '/main/rpt/reportSecurityResult/getSecurityResultList.do',
      { params }
    )
    return response.data.resultData
  },
}
