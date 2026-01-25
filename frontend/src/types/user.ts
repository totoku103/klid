export type AuthMain =
  | 'AUTH_MAIN_1'
  | 'AUTH_MAIN_2'
  | 'AUTH_MAIN_3'
  | 'AUTH_MAIN_4'

export interface User {
  userId: string
  userName: string
  instCd: string
  instNm: string
  instLevel: string
  localCd: string
  pntInstCd: string
  roleCtrs: string
  authMain: AuthMain
  authSub: string
  emailAddr?: string
  offcTelNo?: string
}

export interface SessionInfo {
  user: User
  webSiteName: string
  ncscUrl: string
  uploadSize: number
}
