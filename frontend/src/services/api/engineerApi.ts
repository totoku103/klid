import api from './axios'
import type {
  SysConfig,
  CollectorConfig,
  AuthGroup,
  Menu,
  Page,
  PageGroup,
  Version,
  AgentVersion,
  EncrySync,
  License,
  DefaultGroup,
  MenuAuthConfig,
  PassResetUser,
  EngineerCodeItem,
} from '@/types'

interface ListResponse<T> {
  resultData: T[]
}

export const engineerApi = {
  resetAllUserPass: async (): Promise<void> => {
    await api.post('/main/env/userConf/getAllUserPassReset.do')
  },

  getPassResetUserList: async (): Promise<PassResetUser[]> => {
    const response = await api.get<ListResponse<PassResetUser>>(
      '/main/engineer/getPassResetUserList.do'
    )
    return response.data.resultData
  },

  getSysConfig: async (): Promise<SysConfig> => {
    const response = await api.get<SysConfig>('/main/engineer/getSysConfig.do')
    return response.data
  },

  saveSysConfig: async (data: SysConfig): Promise<void> => {
    await api.post('/main/engineer/saveSysConfig.do', data)
  },

  getCollectorList: async (): Promise<CollectorConfig[]> => {
    const response = await api.get<ListResponse<CollectorConfig>>(
      '/main/engineer/getCollectorList.do'
    )
    return response.data.resultData
  },

  saveCollector: async (data: CollectorConfig[]): Promise<void> => {
    await api.post('/main/engineer/saveCollector.do', { collectorList: data })
  },

  getAuthGrpList: async (): Promise<AuthGroup[]> => {
    const response = await api.get<ListResponse<AuthGroup>>(
      '/main/engineer/getAuthGrpList.do'
    )
    return response.data.resultData
  },

  addAuthGrp: async (data: Partial<AuthGroup>): Promise<void> => {
    await api.post('/main/engineer/addAuthGrp.do', data)
  },

  updateAuthGrp: async (data: AuthGroup): Promise<void> => {
    await api.post('/main/engineer/updateAuthGrp.do', data)
  },

  deleteAuthGrp: async (authGrpCd: string): Promise<void> => {
    await api.post('/main/engineer/deleteAuthGrp.do', { authGrpCd })
  },

  getPageList: async (): Promise<Page[]> => {
    const response = await api.get<ListResponse<Page>>(
      '/main/engineer/getPageList.do'
    )
    return response.data.resultData
  },

  addPage: async (data: Partial<Page>): Promise<void> => {
    await api.post('/main/engineer/addPage.do', data)
  },

  updatePage: async (data: Page): Promise<void> => {
    await api.post('/main/engineer/updatePage.do', data)
  },

  deletePage: async (pageCd: string): Promise<void> => {
    await api.post('/main/engineer/deletePage.do', { pageCd })
  },

  getPageGrpList: async (pageCd: string): Promise<PageGroup[]> => {
    const response = await api.get<ListResponse<PageGroup>>(
      '/main/engineer/getPageGrpList.do',
      { params: { pageCd } }
    )
    return response.data.resultData
  },

  addPageGrp: async (data: Partial<PageGroup>): Promise<void> => {
    await api.post('/main/engineer/addPageGrp.do', data)
  },

  updatePageGrp: async (data: PageGroup): Promise<void> => {
    await api.post('/main/engineer/updatePageGrp.do', data)
  },

  deletePageGrp: async (pageGrpCd: string): Promise<void> => {
    await api.post('/main/engineer/deletePageGrp.do', { pageGrpCd })
  },

  getMenuList: async (pageGrpCd: string): Promise<Menu[]> => {
    const response = await api.get<ListResponse<Menu>>(
      '/main/engineer/getMenuList.do',
      { params: { pageGrpCd } }
    )
    return response.data.resultData
  },

  addMenu: async (data: Partial<Menu>): Promise<void> => {
    await api.post('/main/engineer/addMenu.do', data)
  },

  updateMenu: async (data: Menu): Promise<void> => {
    await api.post('/main/engineer/updateMenu.do', data)
  },

  deleteMenu: async (menuCd: string): Promise<void> => {
    await api.post('/main/engineer/deleteMenu.do', { menuCd })
  },

  savePageOrder: async (pages: Page[]): Promise<void> => {
    await api.post('/main/engineer/savePageOrder.do', { pageList: pages })
  },

  savePageGrpOrder: async (pageGroups: PageGroup[]): Promise<void> => {
    await api.post('/main/engineer/savePageGrpOrder.do', {
      pageGrpList: pageGroups,
    })
  },

  saveMenuOrder: async (menus: Menu[]): Promise<void> => {
    await api.post('/main/engineer/saveMenuOrder.do', { menuList: menus })
  },

  getVersionList: async (): Promise<Version[]> => {
    const response = await api.get<ListResponse<Version>>(
      '/main/engineer/getVersionList.do'
    )
    return response.data.resultData
  },

  addVersion: async (data: Partial<Version>): Promise<void> => {
    await api.post('/main/engineer/addVersion.do', data)
  },

  updateVersion: async (data: Version): Promise<void> => {
    await api.post('/main/engineer/updateVersion.do', data)
  },

  deleteVersion: async (versionSeq: number): Promise<void> => {
    await api.post('/main/engineer/deleteVersion.do', { versionSeq })
  },

  getAgentVersionList: async (): Promise<AgentVersion[]> => {
    const response = await api.get<ListResponse<AgentVersion>>(
      '/main/engineer/getAgentVersionList.do'
    )
    return response.data.resultData
  },

  addAgentVersion: async (data: FormData): Promise<void> => {
    await api.post('/main/engineer/addAgentVersion.do', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  updateAgentVersion: async (data: AgentVersion): Promise<void> => {
    await api.post('/main/engineer/updateAgentVersion.do', data)
  },

  deleteAgentVersion: async (agentSeq: number): Promise<void> => {
    await api.post('/main/engineer/deleteAgentVersion.do', { agentSeq })
  },

  getEncrySyncList: async (checkText?: string): Promise<EncrySync[]> => {
    const response = await api.get<ListResponse<EncrySync>>(
      '/main/engineer/getEncrySyncList.do',
      { params: { checkText } }
    )
    return response.data.resultData
  },

  syncEncryption: async (userIds: string[]): Promise<void> => {
    await api.post('/main/engineer/syncEncryption.do', { userIds })
  },

  applyEncryption: async (userIds: string[]): Promise<void> => {
    await api.post('/main/engineer/applyEncryption.do', { userIds })
  },

  getLicenseInfo: async (licenseType: string): Promise<License> => {
    const response = await api.get<License>('/main/engineer/getLicenseInfo.do', {
      params: { licenseType },
    })
    return response.data
  },

  saveLicense: async (data: License): Promise<void> => {
    await api.post('/main/engineer/saveLicense.do', data)
  },

  getDefGrpTree: async (): Promise<DefaultGroup[]> => {
    const response = await api.get<DefaultGroup[]>(
      '/main/engineer/getDefGrpTree.do'
    )
    return response.data
  },

  addDefGrp: async (data: Partial<DefaultGroup>): Promise<void> => {
    await api.post('/main/engineer/addDefGrp.do', data)
  },

  updateDefGrp: async (data: DefaultGroup): Promise<void> => {
    await api.post('/main/engineer/updateDefGrp.do', data)
  },

  deleteDefGrp: async (grpCd: string): Promise<void> => {
    await api.post('/main/engineer/deleteDefGrp.do', { grpCd })
  },

  getMenuGrpList: async (authGrpCd: string): Promise<MenuAuthConfig[]> => {
    const response = await api.get<ListResponse<MenuAuthConfig>>(
      '/main/engineer/getMenuGrpList.do',
      { params: { authGrpCd } }
    )
    return response.data.resultData
  },

  saveMenuGrp: async (data: MenuAuthConfig[]): Promise<void> => {
    await api.post('/main/engineer/saveMenuGrp.do', { menuGrpList: data })
  },

  getCodeList: async (codeType: string): Promise<EngineerCodeItem[]> => {
    const response = await api.get<ListResponse<EngineerCodeItem>>(
      '/main/common/getCodeList.do',
      { params: { codeType } }
    )
    return response.data.resultData
  },
}
