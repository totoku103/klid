// 헬스체크 URL 관리
export interface HealthCheckUrl {
  seqNo: number
  url: string
  instCd: number
  instNm: string
  instCenterNm: string
  updtime: string
  useYn: string
  lastRes: number
  moisYn: string
  resNm: string
  checkYn: number
  checkSidoYn: number
  parentName: string
}

export interface HealthCheckUrlSearchParams {
  srchInstCd?: string
  srchInstNm?: string
  srchDomain?: string
  srchMoisYn?: string
  srchUseYn?: string
  srchCheckYn?: string
  srchLastRes?: string
  sAuthMain?: string
}

// 헬스체크 통계
export interface HealthCheckStat {
  SEQ_NO: number
  INST_NM: string
  URL: string
  INST_CD: string
  DTNOW: string
  DT0000: string
  DT0100: string
  DT0200: string
  DT0300: string
  DT0400: string
  DT0500: string
  DT0600: string
  DT0700: string
  DT0800: string
  DT0900: string
  DT1000: string
  DT1100: string
  DT1200: string
  DT1300: string
  DT1400: string
  DT1500: string
  DT1600: string
  DT1700: string
  DT1800: string
  DT1900: string
  DT2000: string
  DT2100: string
  DT2200: string
  DT2300: string
}

export interface HealthCheckStatSearchParams {
  instCd?: string
  sAuthMain?: string
}

// 헬스체크 이력
export interface HealthCheckHist {
  seqNo: number
  url: string
  instCd: number
  instNm: string
  instCenterNm: string
  moisYn: string
  resCd: string
  resNm: string
  errTime: string
  parentName: string
}

export interface HealthCheckHistSearchParams {
  srchInstCd?: string
  srchUrl?: string
  srchResCd?: string
  period?: string
  date1?: string
  date2?: string
}

// 위변조 URL 관리
export interface ForgeryUrl {
  forgerySeq: number
  pLocalNm: string
  instNm: string
  domain: string
  url: string
  depth: number
  delYn: string
  excpYn: string
  lastRes: number
  checkYn?: string
}

export interface ForgeryUrlSearchParams {
  srchInstCd?: string
  srchWsisIp?: string
  srchDomain?: string
  srchLastRes?: string
  srchDelYn?: string
  srchCheckYn?: string
}

// 위변조 이력
export interface ForgeryUrlHist {
  forgerySeq: number
  pLocalNm: string
  instNm: string
  domain: string
  url: string
  depth: number
  delYn: string
  excpYn: string
  detectTime: string
  evtName: string
  depthRes: string
  lastRes?: number
  checkYn?: string
}

export interface ForgeryUrlHistSearchParams {
  srchInstCd?: string
  srchWsisIp?: string
  srchDomain?: string
  srchCheckYn?: string
  date1?: string
  time1?: string
  date2?: string
  time2?: string
}
