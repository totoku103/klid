export type ThreatLevel = 1 | 2 | 3 | 4

export interface ThreatInfo {
  nowThreat: ThreatLevel
}

export interface AccidentStatus {
  ing: number
  end: number
}

export interface YearStatus {
  end: number
}

export interface PeriodSetting {
  period1: number
  period2: number
  period3: number
}

export interface PeriodStatus {
  cnt1: number
  cnt2: number
  cnt3: number
}

export interface Top5Item {
  name: string
  y: number
}

export interface DashboardNoticeItem {
  bultnNo: string
  bultnTitle: string
  regDate: string
}

export interface DashboardQnaItem {
  bultnNo: string
  bultnTitle: string
  regDate: string
  isSecret: 'Y' | 'N'
  userId: string
}

export interface MonitoringCount {
  healthNormalCnt: number
  healthErrCnt: number
  urlNormalCnt: number
  urlErrCnt: number
}

export interface MonitoringItem {
  instCd: string
  instNm: string
  hmCnt: string
  foCnt: string
}
