export interface ReportSearchParams {
  date1: string
  date2: string
  time?: string
  sInstCd?: string
  sAuthMain?: string
  grpNo?: number
}

export interface DailyReport {
  total_cnt: number
  end_cnt: number
  ing_cnt: number
  t_end_cnt: number
}

export interface DailyTotReport {
  total_cnt: number
  end_cnt: number
  ing_cnt: number
  t_end_cnt: number
}

export interface TypeAccidentReport {
  accdTypName: string
  accdTypCd: string
  cnt: number
  ratio: number
}

export interface InciTypeReport {
  typeName: string
  typeCode: string
  cnt: number
  ratio: number
}

export interface InciLocalReport {
  localName: string
  localCd: string
  cnt: number
  ratio: number
}

export interface InciPrtyReport {
  prtyName: string
  prtyCd: string
  cnt: number
  ratio: number
}

export interface InciPrcsStatReport {
  statName: string
  statCd: string
  cnt: number
  ratio: number
}

export interface InciSidoReport {
  sidoName: string
  sidoCd: string
  cnt: number
  ratio: number
}

export interface InciAttNatnReport {
  nationName: string
  nationCd: string
  cnt: number
  ratio: number
}

export interface WeeklyStateReport {
  weekNo: number
  startDate: string
  endDate: string
  totalCnt: number
  endCnt: number
  ingCnt: number
}

export interface SecurityDataReport {
  dataName: string
  dataType: string
  cnt: number
  regDate: string
}

export interface SecurityHackingReport {
  hackingType: string
  cnt: number
  ratio: number
}

export interface SecurityVulnerabilityReport {
  vulnName: string
  vulnLevel: string
  cnt: number
  regDate: string
}

export interface NoticeReport {
  seq: number
  title: string
  regDt: string
  viewCnt: number
  instNm: string
}

export interface CtrsDailyStateReport {
  inciNo: string
  inciTtl: string
  dmgInstName: string
  accdTypName: string
  inciPrcsStatName: string
  inciDt: string
  termDays: number
}

export interface DailySecurityReport {
  typeName: string
  todayCnt: number
  totalCnt: number
  endCnt: number
  ingCnt: number
}

export interface InciDetailReport {
  inciNo: string
  inciTtl: string
  dmgInstName: string
  dclInstName: string
  accdTypName: string
  inciPrcsStatName: string
  inciPrty: string
  inciDt: string
  inciDclCont: string
}

export interface SecurityResultReport {
  resultType: string
  resultName: string
  cnt: number
  ratio: number
}
