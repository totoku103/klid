export interface Incident {
  inciNo: string
  inciDt: string
  inciTtl: string
  inciDttNm: string
  inciPrty: string
  inciPrtyName: string
  netDiv: string
  netDivName: string
  acpnMthd: string
  acpnMthdName: string
  riskLevel: string
  riskLevelName: string
  remarks: string
  remarksName: string
  
  // 신고기관 정보
  dclInstCd: string
  dclInstName: string
  dclCrgr: string
  dclTelNo: string
  dclEmail: string
  dclHpNo: string
  
  // 피해기관/시스템 정보
  dmgInstCd: string
  dmgInstName: string
  dmgCrgr: string
  dmgDept: string
  dmgTelNo: string
  dmgEmail: string
  dmgSvrUsrNm: string
  dmgNatnCd: string
  dmgNatnNm: string
  dmgIp: string
  dmgIpList: string[]
  osNm: string
  dmgHpNo: string
  
  // 사고유형 정보
  accdTypCd: string
  accdTypName: string
  accdTypCdSub: string
  accdTypCdSubName: string
  
  // 공격시스템 정보
  attNatnCd: string
  attNatnNm: string
  attIp: string
  attIpList: string[]
  attRemarks: string
  
  // 사고/조사 내용
  inciDclCont: string
  inciInvsCont: string
  inciBelowCont: string
  
  // 처리상태
  inciPrcsStat: string
  inciPrcsStatName: string
  transInciPrcsStat: string
  transInciPrcsStatName: string
  transSidoPrcsStat: string
  transSidoPrcsStatName: string
  
  // 기타
  inciAcpnDt: string
  inciUpdDt: string
  siEndDt: string
  weekYn: string
  inciTtlDtt: string
  tranSigunName: string
  
  // 비고 관련 (해킹/취약점탐지)
  inciTarget: string
  hackAttType: string
  hackAttTypeName: string
  hackNetDiv: string
  hackDomainNm: string
  hackCont: string
  attackTypeCd: string
  attackTypeName: string
  homepvCont: string
  
  // 히스토리
  historyList?: IncidentHistory[]
  
  // 첨부파일
  attachFileList?: AttachFile[]
}

export interface IncidentSearchParams {
  grpNo?: number
  sInstCd?: string
  sAuthMain?: string
  netDiv?: string
  inciPrcsStatCd?: string
  transInciPrcsStatCd?: string
  transSidoPrcsStatCd?: string
  accdTypCd?: string
  inciPrtyCd?: string
  dclInstName?: string
  dmgInstName?: string
  inciTtl?: string
  inciNo?: string
  date1?: string
  date2?: string
  inciDclCont?: string
  inciInvsCont?: string
  inciBelowCont?: string
  attIp?: string
  dmgIp?: string
  srchAcpnMthd?: string
  srchDateType?: string
  srchException?: string
  totalTitle?: string
}

export interface IncidentAddParams {
  instCd?: string
  inciDt?: string
  inciTtl: string
  inciDttNm?: string
  netDiv: string
  dclInstCd?: string
  dmgInstCd?: string
  accdTypCd: string
  inciPrty: string
  inciPrcsStat?: string
  riskLevel?: string
  inciDclCont: string
  inciInvsCont?: string
  inciBelowCont?: string
  remarks?: string
  dclCrgr?: string
  dclEmail?: string
  dclTelNo?: string
  dmgCrgr?: string
  dmgDept?: string
  dmgSvrUsrNm?: string
  dmgEmail?: string
  dmgTelNo?: string
  dmgNatnCd?: number
  osNm?: string
  acpnMthd?: string
  attNatnCd?: string
  attRemarks?: string
  dmgIpList?: string[]
  attIpList?: string[]
  transInciPrcsStat?: number
}

export interface CodeItem {
  comCode1: string
  comCode2: string
  codeName: string
  codeDesc?: string
}

export interface IncidentHistory {
  histNo: string
  inciNo: string
  histDt: string
  histTyp: string
  histTypName: string
  histCont: string
  regUserId: string
  regUserName: string
}

export interface AttachFile {
  fileNo: string
  fileNm: string
  filePath: string
  fileSize: number
}
