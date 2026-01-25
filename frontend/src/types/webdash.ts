export interface IncidentStatus {
  receiptCnt: number
  processCnt: number
  completeCnt: number
}

export interface InciTypeCnt {
  inciType: string
  inciTypeNm: string
  evtCnt: number
}

export interface TbzledgeCnt {
  evtCnt: number
  diffCnt: number
}

export interface LocalStatus {
  localCd: string
  localNm: string
  forgeryYn: string
  hcYn: string
  evtCnt: number
}

export interface UrlStatus {
  instCd: string
  instNm: string
  urlAddr: string
  checkStatus: string
  checkDt: string
}

export interface SysErrorStatus {
  id: string
  name: string
  originNameCnt: string
}

export interface LocalInciCnt {
  localCd: string
  localNm: string
  cnt1: number
  cnt2: number
  cnt3: number
  cnt4: number
  cnt5: number
}

export interface CyberAlert {
  threatLevel: number
  threatNm: string
  pastThreat: number
  nowThreat: number
  modDt: string
}

export interface NoticeBoard {
  seq: number
  title: string
  regDt: string
  viewCnt: number
}

export interface SecurityBoard {
  seq: number
  title: string
  regDt: string
  viewCnt: number
}

export interface AttNationTop5 {
  nationCd: string
  nationNm: string
  evtCnt: number
  rank: number
}

export interface TypeChartData {
  inciType: string
  inciTypeNm: string
  cnt: number
}

export interface RegionStatusManual {
  localCd: string
  receiptCnt: number
  processCnt: number
  completeCnt: number
}

export interface SidoItem {
  instCd: string
  instNm: string
  sidoCd: string
  sidoNm: string
  evtCnt: number
}

export interface ForgeryCheck {
  instCd: string
  instNm: string
  forgeryYn: string
  checkDt: string
}

export interface HcCheck {
  instCd: string
  instNm: string
  hcYn: string
  checkDt: string
}

export interface ProcessItem {
  seq: number
  instNm: string
  inciType: string
  status: string
  regDt: string
  dataCnt: number
}

export interface DashboardConfig {
  refreshTime: number
  stageW: number
  stageH: number
}

export interface HmHcUrlCenter {
  instCd: string
  instNm: string
  urlCnt: number
  errorCnt: number
  normalCnt: number
}

export interface HmHcUrlRegion {
  localCd: string
  localNm: string
  urlCnt: number
  errorCnt: number
  normalCnt: number
}

export interface ForgeryRegion {
  localCd: string
  localNm: string
  forgeryCnt: number
  normalCnt: number
}

export interface RegionStatus {
  localCd: string
  localNm: string
  receiptCnt: number
  processCnt: number
  completeCnt: number
}

export interface RegionStatusAuto {
  localCd: string
  localNm: string
  totalCnt: number
  autoCnt: number
}

export interface DashConfigItem {
  seq: number
  datTime: string
  title: string
  content: string
  cnt1: number
  cnt2: number
  cnt3: number
  cnt4: number
}

export interface DashChartSum {
  datTime: string
  totalCnt: number
  autoCnt: number
  manualCnt: number
}
