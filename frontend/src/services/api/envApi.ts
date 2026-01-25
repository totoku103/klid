import api from './axios'
import type {
  Institution,
  UserInfo,
  UserSearchParams,
  InstSearchParams,
  InstIP,
  NationIP,
  UserAddress,
  UserMgmtHistory,
} from '@/types'

interface ListResponse<T> {
  resultData: T[]
}

export const envApi = {
  getInstTree: async (): Promise<Institution[]> => {
    const response = await api.get<Institution[]>('/main/env/getInstTree.do')
    return response.data
  },

  getInstList: async (params: InstSearchParams): Promise<Institution[]> => {
    const response = await api.get<ListResponse<Institution>>(
      '/main/env/getInstList.do',
      { params }
    )
    return response.data.resultData
  },

  addInst: async (data: Partial<Institution>): Promise<void> => {
    await api.post('/main/env/addInst.do', data)
  },

  updateInst: async (data: Institution): Promise<void> => {
    await api.post('/main/env/updateInst.do', data)
  },

  deleteInst: async (instCd: string): Promise<void> => {
    await api.post('/main/env/deleteInst.do', { instCd })
  },

  getUserList: async (params: UserSearchParams): Promise<UserInfo[]> => {
    const response = await api.get<ListResponse<UserInfo>>(
      '/main/env/getUserList.do',
      { params }
    )
    return response.data.resultData
  },

  getUserDetail: async (userId: string): Promise<UserInfo> => {
    const response = await api.get<UserInfo>('/main/env/getUserDetail.do', {
      params: { userId },
    })
    return response.data
  },

  addUser: async (data: Partial<UserInfo>): Promise<void> => {
    await api.post('/main/env/addUser.do', data)
  },

  updateUser: async (data: UserInfo): Promise<void> => {
    await api.post('/main/env/updateUser.do', data)
  },

  deleteUser: async (userId: string): Promise<void> => {
    await api.post('/main/env/deleteUser.do', { userId })
  },

  getInstIPList: async (instCd?: string): Promise<InstIP[]> => {
    const response = await api.get<ListResponse<InstIP>>(
      '/main/env/getInstIPList.do',
      { params: { instCd } }
    )
    return response.data.resultData
  },

  addInstIP: async (data: Partial<InstIP>): Promise<void> => {
    await api.post('/main/env/addInstIP.do', data)
  },

  updateInstIP: async (data: InstIP): Promise<void> => {
    await api.post('/main/env/updateInstIP.do', data)
  },

  deleteInstIP: async (ipSeq: number): Promise<void> => {
    await api.post('/main/env/deleteInstIP.do', { ipSeq })
  },

  getNationIPList: async (nationCd?: string): Promise<NationIP[]> => {
    const response = await api.get<ListResponse<NationIP>>(
      '/main/env/getNationIPList.do',
      { params: { nationCd } }
    )
    return response.data.resultData
  },

  getUserAddressList: async (userId: string): Promise<UserAddress[]> => {
    const response = await api.get<ListResponse<UserAddress>>(
      '/main/env/getUserAddressList.do',
      { params: { userId } }
    )
    return response.data.resultData
  },

  addUserAddress: async (data: Partial<UserAddress>): Promise<void> => {
    await api.post('/main/env/addUserAddress.do', data)
  },

  updateUserAddress: async (data: UserAddress): Promise<void> => {
    await api.post('/main/env/updateUserAddress.do', data)
  },

  deleteUserAddress: async (addrSeq: number): Promise<void> => {
    await api.post('/main/env/deleteUserAddress.do', { addrSeq })
  },

  getUserMgmtHistoryList: async (params: {
    searchInstitutionCode?: number
    searchUserName?: string
    searchDateFrom?: string
    searchDateTo?: string
    searchRequestType?: string
    searchProcessState?: string
  }): Promise<UserMgmtHistory[]> => {
    const response = await api.post<UserMgmtHistory[]>(
      '/main/env/user-management/history/grid.do',
      params
    )
    return response.data
  },
}
