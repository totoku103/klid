export interface SmsGroup {
  grpNo: number
  smsNm: string
  parentGrpNo?: number
  children?: SmsGroup[]
}

export interface CustUser {
  custSeq: number
  smsGroupSeq: number
  smsGroupName: string
  custNm: string
  custCellNo: string
  custMailAddr: string
  userId: string
}

export interface BoardSetting {
  guid: string
  menuName: string
  fileExt: string
  fileSize: number
}

export interface CodeLv1 {
  code: string
  codeName: string
  useYn: string
  sortOrder: number
}

export interface CodeLv2 {
  code: string
  codeName: string
  parentCode: string
  useYn: string
  sortOrder: number
}

export interface CodeLv3 {
  code: string
  codeName: string
  parentCode: string
  useYn: string
  sortOrder: number
}

export interface RiskMgmt {
  basis1: number
  basis2: number
  basis3: number
  basis4: number
  basis5: number
}

export interface RiskHistory {
  logSeq: number
  step: number
  contents: string
  usrName: string
  usrId: string
  regDt: string
}

export interface WeekDay {
  comCode1: number
  comCode2: string
  codeName: string
  codeLvl: number
  useYn: string
}
