import api from './axios'
import type {
  IncidentStatus,
  InciTypeCnt,
  TbzledgeCnt,
  LocalStatus,
  UrlStatus,
  SysErrorStatus,
  LocalInciCnt,
  CyberAlert,
  NoticeBoard,
  SecurityBoard,
  AttNationTop5,
  TypeChartData,
  RegionStatusManual,
  SidoItem,
  ForgeryCheck,
  HcCheck,
  ProcessItem,
  HmHcUrlCenter,
  HmHcUrlRegion,
  ForgeryRegion,
  RegionStatus,
  RegionStatusAuto,
  DashConfigItem,
  DashChartSum,
} from '@/types'



export const webdashApi = {
  getIncidentStatus: async (): Promise<IncidentStatus[]> => {
    const response = await api.get<IncidentStatus[]>(
      '/webdash/adminControl/getIncidentStatus.do'
    )
    return response.data
  },

  getInciCnt: async (params: {
    sAuthMain?: string
    sInstCd?: string
  }): Promise<InciTypeCnt[]> => {
    const response = await api.get<InciTypeCnt[]>(
      '/webdash/adminControl/getInciCnt.do',
      { params }
    )
    return response.data
  },

  getTbzledgeCnt: async (): Promise<TbzledgeCnt[]> => {
    const response = await api.get<TbzledgeCnt[]>(
      '/webdash/adminControl/getTbzledgeCnt.do'
    )
    return response.data
  },

  getLocalStatus: async (): Promise<LocalStatus[]> => {
    const response = await api.get<LocalStatus[]>(
      '/webdash/adminControl/getLocalStatus.do'
    )
    return response.data
  },

  getUrlStatus: async (): Promise<UrlStatus[]> => {
    const response = await api.get<UrlStatus[]>(
      '/webdash/adminControl/getUrlStatus.do'
    )
    return response.data
  },

  getSysErrorStatus: async (hostNm: string): Promise<SysErrorStatus[]> => {
    const response = await api.get<SysErrorStatus[]>(
      '/webdash/adminControl/getSysErrorStatus.do',
      { params: { hostNm } }
    )
    return response.data
  },

  getLocalInciCnt: async (params: {
    sAuthMain?: string
    sInstCd?: string
  }): Promise<LocalInciCnt[]> => {
    const response = await api.get<LocalInciCnt[]>(
      '/webdash/adminControl/getLocalInciCnt.do',
      { params }
    )
    return response.data
  },

  getInciTypeCnt: async (): Promise<InciTypeCnt[]> => {
    const response = await api.get<InciTypeCnt[]>(
      '/webdash/adminControl/getInciTypeCnt.do'
    )
    return response.data
  },

  getThreatNow: async (instCd?: string): Promise<CyberAlert[]> => {
    const response = await api.get<CyberAlert[]>(
      '/webdash/mois/webDashMois/getThreatNow.do',
      { params: { instCd } }
    )
    return response.data
  },

  getNoticeList: async (params: {
    listSize: string
    sInstCd?: string
    sAuthMain?: string
    sPntInstCd?: string
  }): Promise<NoticeBoard[]> => {
    const response = await api.get<NoticeBoard[]>(
      '/webdash/sido/webDashSido/getNoticeList.do',
      { params }
    )
    return response.data
  },

  getSecuList: async (params: {
    listSize: string
    sInstCd?: string
    sAuthMain?: string
  }): Promise<SecurityBoard[]> => {
    const response = await api.get<SecurityBoard[]>(
      '/webdash/sido/webDashSido/getSecuList.do',
      { params }
    )
    return response.data
  },

  getAttNationTop5: async (): Promise<AttNationTop5[]> => {
    const response = await api.get<AttNationTop5[]>(
      '/webdash/center/webDashCenter/getAttNationTop5.do'
    )
    return response.data
  },

  getTypeChart: async (params: {
    sAuthMain?: string
    sInstCd?: string
  }): Promise<TypeChartData[]> => {
    const response = await api.get<TypeChartData[]>(
      '/webdash/center/webDashCenter/getTypeChart.do',
      { params }
    )
    return response.data
  },

  getRegionStatusManual: async (params: {
    localCd: string
    atype: number
  }): Promise<RegionStatusManual[]> => {
    const response = await api.get<RegionStatusManual[]>(
      '/webdash/sido/webDashSido/getRegionStatusManual.do',
      { params }
    )
    return response.data
  },

  getSidoList: async (instCd: string): Promise<SidoItem[]> => {
    const response = await api.get<SidoItem[]>(
      '/webdash/sido/webDashSido/getSidoList.do',
      { params: { instCd } }
    )
    return response.data
  },

  getForgeryCheck: async (localCd: string): Promise<ForgeryCheck[]> => {
    const response = await api.get<ForgeryCheck[]>(
      '/webdash/sido/webDashSido/getForgeryCheck.do',
      { params: { localCd } }
    )
    return response.data
  },

  getHcCheck: async (localCd: string): Promise<HcCheck[]> => {
    const response = await api.get<HcCheck[]>(
      '/webdash/sido/webDashSido/getHcCheck.do',
      { params: { localCd } }
    )
    return response.data
  },

  getProcess: async (params: {
    localCd: string
    rnum1: number
    rnum2: number
    atype: number
  }): Promise<ProcessItem[]> => {
    const response = await api.get<ProcessItem[]>(
      '/webdash/sido/webDashSido/getProcess.do',
      { params }
    )
    return response.data
  },

  getDashTextCode: async (params: {
    comCode1: number
    comCode2: number
  }): Promise<{ codeCont: string }[]> => {
    const response = await api.get<{ codeCont: string }[]>(
      '/code/getDashTextCode.do',
      { params }
    )
    return response.data
  },

  getHmHcUrlCenter: async (): Promise<HmHcUrlCenter[]> => {
    const response = await api.get<HmHcUrlCenter[]>(
      '/webdash/mois/webDashMois/getHmHcUrlCenter.do'
    )
    return response.data
  },

  getHmHcUrlRegion: async (): Promise<HmHcUrlRegion[]> => {
    const response = await api.get<HmHcUrlRegion[]>(
      '/webdash/mois/webDashMois/getHmHcUrlRegion.do'
    )
    return response.data
  },

  getForgeryRegion: async (): Promise<ForgeryRegion[]> => {
    const response = await api.get<ForgeryRegion[]>(
      '/webdash/mois/webDashMois/getForgeryRegion.do'
    )
    return response.data
  },

  getRegionStatus: async (): Promise<RegionStatus[]> => {
    const response = await api.get<RegionStatus[]>(
      '/webdash/mois/webDashMois/getRegionStatus.do'
    )
    return response.data
  },

  getRegionStatusAuto: async (): Promise<RegionStatusAuto[]> => {
    const response = await api.get<RegionStatusAuto[]>(
      '/webdash/mois/webDashMois/getRegionStatusAuto.do'
    )
    return response.data
  },

  getDashConfigList: async (datTime: string): Promise<DashConfigItem[]> => {
    const response = await api.get<DashConfigItem[]>(
      '/webdash/mois/webDashMois/getDashConfigList.do',
      { params: { datTime } }
    )
    return response.data
  },

  getDashChartSum: async (datTime1: string, datTime2: string): Promise<DashChartSum[]> => {
    const response = await api.get<DashChartSum[]>(
      '/webdash/mois/webDashMois/getDashChartSum.do',
      { params: { datTime1, datTime2 } }
    )
    return response.data
  },
}
