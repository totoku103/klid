export interface LogSearchParams {
  date1?: string
  date2?: string
  systemCd?: string
  sInstCd?: string
  sAuthMain?: string
}

export interface UserConnectLogDaily {
  timeSlot: string
  connectCnt: number
}

export interface UserConnectLogPeriod {
  logDate: string
  connectCnt: number
}

export interface UserConnectLogInstitution {
  instCd: string
  instNm: string
  connectCnt: number
}

export interface UserConnectLogSummary {
  summaryType: string
  totalCnt: number
  avgCnt: number
  maxCnt: number
  minCnt: number
}

export interface UserActionLogDaily {
  timeSlot: string
  actionCnt: number
}

export interface UserActionLogPeriod {
  logDate: string
  actionCnt: number
}

export interface UserActionLogInstitution {
  instCd: string
  instNm: string
  actionCnt: number
}

export interface UserActionLogSummary {
  actionType: string
  totalCnt: number
  avgCnt: number
}
