import api from './axios'
import type {
  SmsGroup,
  CustUser,
  BoardSetting,
  CodeLv1,
  CodeLv2,
  CodeLv3,
  RiskMgmt,
  RiskHistory,
  WeekDay,
} from '@/types'

interface ListResponse<T> {
  resultData: T[]
}

export const sysApi = {
  getSmsGroupList: async (): Promise<SmsGroup[]> => {
    const response = await api.get<SmsGroup[]>('/main/sys/getSmsGroupList.do')
    return response.data
  },

  addSmsGroup: async (data: { smsNm: string; parentGrpNo?: number }): Promise<void> => {
    await api.post('/main/sys/addSmsGroup.do', data)
  },

  updateSmsGroup: async (data: { grpNo: number; smsNm: string }): Promise<void> => {
    await api.post('/main/sys/updateSmsGroup.do', data)
  },

  deleteSmsGroup: async (grpNo: number): Promise<void> => {
    await api.post('/main/sys/deleteSmsGroup.do', { grpNo })
  },

  getCustUserList: async (params: {
    userId: string
    smsGroupSeq?: number
  }): Promise<CustUser[]> => {
    const response = await api.get<ListResponse<CustUser>>(
      '/main/sys/getCustUserList.do',
      { params }
    )
    return response.data.resultData
  },

  addCustUser: async (data: Omit<CustUser, 'custSeq'>): Promise<void> => {
    await api.post('/main/sys/addCustUser.do', data)
  },

  updateCustUser: async (data: CustUser): Promise<void> => {
    await api.post('/main/sys/updateCustUser.do', data)
  },

  deleteCustUser: async (custSeq: number): Promise<void> => {
    await api.post('/main/sys/delCustUser.do', { custSeq })
  },

  getBoardMgmtList: async (): Promise<BoardSetting[]> => {
    const response = await api.get<BoardSetting[]>(
      '/main/sys/getBoardMgmtList.do'
    )
    return response.data
  },

  updateBoardMgmt: async (data: BoardSetting): Promise<void> => {
    await api.post('/main/sys/updateBoardMgmt.do', data)
  },

  getCodeLv1List: async (): Promise<CodeLv1[]> => {
    const response = await api.get<CodeLv1[]>('/main/sys/getCodeLv1List.do')
    return response.data
  },

  addCodeLv1: async (data: Omit<CodeLv1, 'sortOrder'>): Promise<void> => {
    await api.post('/main/sys/addCodeLv1.do', data)
  },

  updateCodeLv1: async (data: CodeLv1): Promise<void> => {
    await api.post('/main/sys/updateCodeLv1.do', data)
  },

  getCodeLv2List: async (parentCode: string): Promise<CodeLv2[]> => {
    const response = await api.get<CodeLv2[]>('/main/sys/getCodeLv2List.do', {
      params: { parentCode },
    })
    return response.data
  },

  addCodeLv2: async (data: Omit<CodeLv2, 'sortOrder'>): Promise<void> => {
    await api.post('/main/sys/addCodeLv2.do', data)
  },

  updateCodeLv2: async (data: CodeLv2): Promise<void> => {
    await api.post('/main/sys/updateCodeLv2.do', data)
  },

  getCodeLv3List: async (parentCode: string): Promise<CodeLv3[]> => {
    const response = await api.get<CodeLv3[]>('/main/sys/getCodeLv3List.do', {
      params: { parentCode },
    })
    return response.data
  },

  addCodeLv3: async (data: Omit<CodeLv3, 'sortOrder'>): Promise<void> => {
    await api.post('/main/sys/addCodeLv3.do', data)
  },

  updateCodeLv3: async (data: CodeLv3): Promise<void> => {
    await api.post('/main/sys/updateCodeLv3.do', data)
  },

  sendSms: async (data: {
    message: string
    recipients: string[]
  }): Promise<void> => {
    await api.post('/main/sys/sendSms.do', data)
  },

  getRiskMgmt: async (): Promise<RiskMgmt> => {
    const response = await api.post<{ resultData: RiskMgmt }>('/main/sys/getRiskMgmt.do')
    return response.data.resultData
  },

  updateRiskMgmt: async (data: RiskMgmt): Promise<void> => {
    await api.post('/main/sys/updateRiskMgmt.do', data)
  },

  getRiskHistory: async (step: number): Promise<RiskHistory[]> => {
    const response = await api.get<ListResponse<RiskHistory>>(
      '/main/sys/getRiskHistory.do',
      { params: { step } }
    )
    return response.data.resultData
  },

  addRiskHistory: async (data: { step: number; contents: string }): Promise<void> => {
    await api.post('/main/sys/addRiskHistory.do', data)
  },

  deleteRiskHistory: async (logSeq: number): Promise<void> => {
    await api.post('/main/sys/delRiskHistory.do', { logSeq })
  },

  getWeekDayList: async (): Promise<WeekDay[]> => {
    const response = await api.get<ListResponse<WeekDay>>(
      '/main/sys/getCodeList.do',
      { params: { comCode1: 4005, codeLvl: 2 } }
    )
    return response.data.resultData
  },

  addWeekDay: async (data: {
    comCode1: number
    comCode2: string
    codeName: string
    codeLvl: number
    useYn: string
    weekYn: number
  }): Promise<void> => {
    await api.post('/main/sys/addWeekDay.do', data)
  },

  deleteWeekDay: async (data: {
    comCode1: number
    comCode2: string
    codeName: string
    codeLvl: number
    useYn: string
    weekYn: number
  }): Promise<void> => {
    await api.post('/main/sys/delWeekDay.do', data)
  },
}
