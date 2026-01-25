export interface Institution {
  instCd: string
  instNm: string
  instLevel: string
  localCd: string
  pntInstCd?: string
  useYn: string
  children?: Institution[]
}

export interface UserInfo {
  userId: string
  userName: string
  userEmail: string
  userTel: string
  instCd: string
  instNm: string
  authMain: string
  authSub: string
  useYn: string
  regDate: string
  lastLoginDate?: string
}

export interface UserSearchParams {
  srchInstCd?: string
  srchUserName?: string
  srchUserId?: string
  srchUseYn?: string
  inactiveUser?: boolean
}

export interface InstSearchParams {
  pntInstCd?: string
  sInstNm?: string
}

export interface InstIP {
  ipSeq: number
  instCd: string
  instNm: string
  ipAddr: string
  ipDesc: string
  useYn: string
  regDate: string
}

export interface NationIP {
  ipSeq: number
  nationCd: string
  nationNm: string
  ipStart: string
  ipEnd: string
  regDate: string
}

export interface UserAddress {
  addrSeq: number
  userId: string
  addrName: string
  addrEmail: string
  addrTel: string
  addrMemo: string
}

export interface UserMgmtHistory {
  commUserRequestSeq: number
  requestRegDt: string
  processStateMessage: string
  requestTypeMessage: string
  requestReason: string
  originUserId: string
  originUserName: string
  originUserInstName: string
  requestUserName: string
  requestUserInstName: string
  approveUserName: string
  approveUserInstName: string
  approveReason: string
  approveRegDt: string
}
