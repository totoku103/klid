export interface CategoryRole {
  role01: string // Y/N
  role02: string
  role03: string
  role04: string
  role05: string
  role06: string
}

export interface BoardRole {
  tbz: CategoryRole // 사고신고/침해사고
  notice: CategoryRole // 공지사항
  resource: CategoryRole // 자료실
  share: CategoryRole // 정보공유
  qna: CategoryRole // Q&A
}

export interface AuthRole {
  main: string // 메인 권한
  sub: string // 서브 권한
  grpNo: number // 권한 그룹 번호
  grpName: string // 권한 그룹 이름
}

export interface User {
  userId: string
  userName: string
  instCd: number
  instNm: string
  boardRole: BoardRole
  authRole: AuthRole
}

export interface SessionInfo {
  user: User
  webSiteName: string
  ncscUrl: string
  uploadSize: number
}
