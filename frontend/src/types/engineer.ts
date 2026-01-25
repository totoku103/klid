// 시스템 설정
export interface SysConfig {
  siteName: string
  webSiteName: string
  dashPort: string
  pwdEncrUse: string
  topoAuthUse: string
  appNetisPopup: string
  uploadPath: string
  uploadSizeLimit: string
  evtLevel0: string
  evtLevel1: string
  evtLevel2: string
  evtLevel3: string
  evtLevel4: string
  evtLevel5: string
  evtLevel: string
}

// 수집기 설정
export interface CollectorConfig {
  codeId: string
  codeValue1: string // 수집기명
  codeValue2: string // 수집기 IP
  codeValue3: string // 수집기 PORT
  useFlag: string
}

// 권한그룹
export interface AuthGroup {
  authGrpCd: string
  authGrpNm: string
  authGrpDesc: string
  useYn: string
  regDate: string
  modDate: string
}

// 메뉴
export interface Menu {
  menuCd: string
  menuNm: string
  menuUrl: string
  menuOrder: number
  menuLevel: number
  pntMenuCd: string
  useYn: string
  menuIcon?: string
}

// 페이지
export interface Page {
  pageCd: string
  pageNm: string
  pageUrl: string
  pageOrder: number
  useYn: string
}

// 페이지 그룹
export interface PageGroup {
  pageGrpCd: string
  pageGrpNm: string
  pageOrder: number
  useYn: string
}

// 버전 관리
export interface Version {
  versionSeq: number
  versionType: string
  versionNo: string
  versionDesc: string
  releaseDate: string
  regDate: string
  useYn: string
}

// 에이전트 버전
export interface AgentVersion {
  agentSeq: number
  agentType: string
  agentVersion: string
  agentDesc: string
  filePath: string
  fileName: string
  regDate: string
  useYn: string
}

// 암호화 동기화
export interface EncrySync {
  userId: string
  userName: string
  instNm: string
  encryStatus: string
  checkValue: string
  syncDate: string
}

// 라이선스
export interface License {
  licenseType: string
  licenseKey: string
  expireDate: string
  maxUser: number
  regDate: string
}

// 기본 그룹
export interface DefaultGroup {
  grpCd: string
  grpNm: string
  grpType: string
  grpLevel: number
  pntGrpCd: string
  useYn: string
  children?: DefaultGroup[]
}

// 메뉴 권한 설정
export interface MenuAuthConfig {
  authGrpCd: string
  menuCd: string
  menuNm: string
  readYn: string
  writeYn: string
  delYn: string
}

// 비밀번호 리셋
export interface PassResetUser {
  userId: string
  userName: string
  instNm: string
  passResetYn: string
  regDate: string
}

// 콤보박스용 코드 아이템
export interface EngineerCodeItem {
  codeId: string
  codeNm: string
}
