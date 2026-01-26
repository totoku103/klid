export interface MenuItem {
  id: string
  name: string
  url?: string
  icon?: string
  children?: MenuItem[]
}

export interface MenuGroup {
  id: string
  name: string
  items: MenuItem[]
}

export interface MenuApiItem {
  readonly pageNo: number
  readonly pageGrpNo: number
  readonly menuNo: number
  readonly menuName: string
  readonly orderNo: number
  readonly guid: string
  readonly menuAuth: string
}

export interface MenuApiGroup {
  readonly pageNo: number
  readonly pageGrpNo: number
  readonly pageGrpName: string
  readonly orderNo: number
  readonly children: MenuApiItem[]
}

export interface MenuApiPage {
  readonly pageNo: number
  readonly pageName: string
  readonly orderNo: number
  readonly webIconClass: string
  readonly children: MenuApiGroup[]
}

export type MenuApiResponse = MenuApiPage[]

const MENU_ROUTE_MAP: Record<string, string> = {
  // 대시보드
  '616D8144-FAF1-4BAE-9BB6-0B8F5F381130': '/main',

  // 침해사고대응
  'A800930A-372D-41E2-BEDE-B40FFB5FDFAD': '/main/acc/accidentApplyList',

  // 보안정보 - 공지사항
  'B4529762-C067-4731-9129-B84FF840063A': '/main/sec/noticeBoardList',
  // 보안정보 - 보안자료실
  '35E56A6F-B4CF-4255-8300-A55BA44F7BA6': '/main/sec/resourceBoardList',
  // 보안정보 - 침해대응정보공유
  '11B3C551-A9E2-4361-AC5C-D45751AD5E64': '/main/sec/shareBoardList',

  // 보고서 - 일일보고서
  '28334395-B5A8-421C-AA8B-0A2993FE9E8A': '/main/rpt/reportDailyState',
  '5D96EB60-4789-4C89-A146-EF33B8D96510': '/main/rpt/reportWeeklyState',
  'AF77542E-119A-4DF1-97AB-6A46CD092FDD': '/main/rpt/reportDailyInciState',
  // 보고서 - 유형별보고서
  'A54369C9-AB15-4DC1-8181-2175E77E89C4': '/main/rpt/reportInciType',
  'EB56AED2-8197-4FA4-A5DA-E86E5476D7DB': '/main/rpt/reportInciAttNatn',
  '8747AA42-733A-441E-A3EA-AA18651774DD': '/main/rpt/reportInciPrty',
  'ABE1D475-7304-46D3-AE93-3559628E5B0F': '/main/rpt/reportInciPrcsStat',
  '0479E0D9-BBB2-4567-A827-E9173F0DBDC2': '/main/rpt/reportInciLocal',

  // 문의센터
  '270241B8-AA1C-4BBA-948F-B9AF8BBD74DD': '/main/sec/qnaBoardList',

  // 운영관리 - 사용자관리
  '37EFE475-2428-49B8-95CE-2AA78262631F': '/main/sys/custUserMgmt',
  'FA5CF53F-A3F9-466F-8533-3E62E94695C3': '/main/env/userManagementHistory',
  '1D26DA5D-C6DA-4FD1-8D0B-6B82CC84058A': '/main/env/userMgmtList',
  '8D6E391F-8DE2-4A57-B182-C34E901408CB': '/main/env/nationIPMgmtList',
  // 운영관리 - 기관관리
  '9413D8BE-B9C3-48C1-81AA-178523E09C03': '/main/env/instMgmtList',
  '2070E22A-A433-11E8-898A-408D5CF61E72': '/main/env/instIPMgmtList',
  // 운영관리 - 로그관리
  '98561932-0D0E-4312-A969-15FFCD40C09C': '/main/logs/userConnectLogSummary',
  '9B82E46D-BD6C-48FC-A4B1-08AB5A612423': '/main/logs/userConnectLogDaily',
  '1F64D749-0BA6-4765-80CA-B1E050B9223F': '/main/logs/userConnectLogPeriod',
  'ECD00E4F-2C5D-46B6-93BB-0A2156EC02AE': '/main/logs/userConnectLogInstitution',
  '365C0D93-B77E-43EF-90EE-CC709A9EFAEA': '/main/logs/userActionLogSummary',
  '0EF2C268-6946-4910-9C93-29F236B0646E': '/main/logs/userActionLogDaily',
  '83626AED-467A-438B-9A67-2F83FB32A01A': '/main/logs/userActionLogPeriod',
  '545E1470-DC0F-45C8-BA94-E068859A4694': '/main/logs/userActionLogInstitution',
  // 운영관리 - 인수인계
  '2DE754D9-7E3D-488B-B44D-4E8B5BC05CB2': '/main/sec/takeOverBoardList',

  // 홈페이지모니터링 - 위변조
  '050EC41F-9CE8-45FF-9E66-B96FAD9AD84F': '/main/home/forgeryUrl',
  '050EC41F-9CE8-45FF-9E66-B96FAD9AD27F': '/main/home/forgeryUrlHist',
  // 홈페이지모니터링 - URL 헬스체크
  '54A0FF75-4813-45AC-B4E9-7A5D8B5FCAFD': '/main/home/healthCheckUrl',
  '1213A8BC-7D38-45FF-B734-92EFCDA89A04': '/main/home/healthCheckHist',
  '6E13B83C-BC38-434F-BC34-22EAAD0E6504': '/main/home/healthCheckStat',
}

function getMenuUrl(guid: string): string {
  return MENU_ROUTE_MAP[guid] || `/menu/${guid}`
}

export function transformMenuApiResponse(apiResponse: MenuApiResponse): MenuItem[] {
  return apiResponse
    .sort((a, b) => a.orderNo - b.orderNo)
    .map((page): MenuItem => ({
      id: `page-${page.pageNo}`,
      name: page.pageName,
      icon: page.webIconClass,
      children: page.children
        .sort((a, b) => a.orderNo - b.orderNo)
        .map((group): MenuItem => ({
          id: `group-${group.pageGrpNo}`,
          name: group.pageGrpName,
          children: group.children
            .sort((a, b) => a.orderNo - b.orderNo)
            .map((menu): MenuItem => ({
              id: menu.guid,
              name: menu.menuName,
              url: getMenuUrl(menu.guid),
            })),
        })),
    }))
}
