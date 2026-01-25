export interface BoardCategory {
  cateNo: string
  cateName: string
}

export interface NoticeItem {
  bultnNo: string
  groupType: string
  noticeType: string
  bultnTitle: string
  bultnCont: string
  controlStr: string
  instNm: string
  userName: string
  regDate: string
  fileCount: number
  readCnt: number
}

export interface QnaItem {
  bultnNo: string
  bultnTitle: string
  bultnCont: string
  userName: string
  instNm: string
  regDate: string
  isSecret: 'Y' | 'N'
  userId: string
  fileCount: number
  readCnt: number
  parentNo?: string
  level?: number
  children?: QnaItem[]
}

export interface ShareItem {
  bultnNo: string
  bultnTitle: string
  bultnCont: string
  userName: string
  instNm: string
  regDate: string
  fileCount: number
  readCnt: number
}

export interface ResourceItem {
  bultnNo: string
  bultnTitle: string
  bultnCont: string
  userName: string
  instNm: string
  regDate: string
  fileCount: number
  readCnt: number
  cateNo: string
  cateName: string
}

export interface BoardFile {
  fileSeq: number
  fileName: string
  fileSize: number
  filePath: string
}

export interface BoardDetail {
  bultnNo: string
  bultnTitle: string
  bultnCont: string
  userName: string
  instNm: string
  regDate: string
  readCnt: number
  files: BoardFile[]
}

export interface NoticeSearchParams {
  groupType?: string
  noticeType?: string
  title?: string
  bultnCont?: string
  instNm?: string
  sInstCd: string
  sPntInstCd: string
  sAuthMain: string
  sControl?: string
  startDate: string
  endDate: string
}

export interface QnaSearchParams {
  title?: string
  bultnCont?: string
  sInstCd: string
}

export interface MoisBoardItem {
  bultnNo: string
  bultnTitle: string
  bultnCont: string
  userName: string
  instNm: string
  regDate: string
  fileCount: number
  readCnt: number
}

export interface TakeOverBoardItem {
  bultnNo: string
  bultnTitle: string
  bultnCont: string
  userName: string
  instNm: string
  regDate: string
  fileCount: number
  readCnt: number
  readFlag: number
  isCloseFlag: number
}
