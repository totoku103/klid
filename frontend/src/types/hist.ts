export interface HistSearchParams {
  date1?: string
  date2?: string
  userId?: string
  userName?: string
  sInstCd?: string
  sAuthMain?: string
}

export interface UserInoutHist {
  histSeq: number
  userId: string
  userName: string
  instNm: string
  inoutType: string
  inoutDt: string
  ipAddr: string
  browser: string
}

export interface SmsEmailHist {
  histSeq: number
  sendType: string
  sender: string
  receiver: string
  title: string
  content: string
  sendDt: string
  sendResult: string
}

export interface UserActHist {
  histSeq: number
  userId: string
  userName: string
  instNm: string
  actType: string
  actDesc: string
  actDt: string
  ipAddr: string
}
