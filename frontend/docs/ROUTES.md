# KLID CTRS Web - 라우트 및 페이지 목록

> 최종 업데이트: 2026-01-25

## 개요

이 문서는 프로젝트의 모든 접근 가능한 페이지와 라우팅 주소를 정리합니다.

- **총 라우트 수**: 68개
- **레이아웃 없는 페이지**: 4개
- **AppLayout 적용 페이지**: 63개
- **리다이렉트**: 1개

---

## 1. 레이아웃 없는 페이지 (4개)

인증이나 팝업 등 독립적으로 동작하는 페이지입니다.

| # | 라우트 | 페이지명 | 컴포넌트 | 파일 경로 |
|---|--------|----------|----------|-----------|
| 1 | `/login` | 로그인 | LoginPage | `src/components/pages/Login/index.tsx` |
| 2 | `/popup/privacy-policy` | 개인정보처리방침 | PrivacyPolicyPage | `src/components/pages/Popup/PrivacyPolicyPage.tsx` |
| 3 | `/popup/history-policy/:version` | 정책 이력 | HistoryPolicyPage | `src/components/pages/Popup/HistoryPolicyPage.tsx` |
| 4 | `/popup/compare-policy/:version` | 정책 비교 | ComparePolicyPage | `src/components/pages/Popup/ComparePolicyPage.tsx` |

---

## 2. 메인 페이지

| # | 라우트 | 페이지명 | 컴포넌트 | 파일 경로 |
|---|--------|----------|----------|-----------|
| 1 | `/main` | 대시보드 (메인) | MainPage | `src/components/pages/Main/index.tsx` |

---

## 3. 시스템관리 (5개)

| # | 라우트 | 페이지명 | 컴포넌트 | 파일 경로 |
|---|--------|----------|----------|-----------|
| 1 | `/main/sys/custUserMgmt` | SMS외부사용자관리 | CustUserMgmtPage | `src/components/pages/System/CustUserMgmt/index.tsx` |
| 2 | `/main/sys/boardMgmt` | 게시판관리 | BoardMgmtPage | `src/components/pages/System/BoardMgmt/index.tsx` |
| 3 | `/main/sys/codeMgmtList` | 코드관리 | CodeMgmtPage | `src/components/pages/System/CodeMgmt/index.tsx` |
| 4 | `/main/sys/riskMgmt` | 위험도관리 | RiskMgmtPage | `src/components/pages/System/RiskMgmt/index.tsx` |
| 5 | `/main/sys/weekMgmt` | 주간관리 | WeekMgmtPage | `src/components/pages/System/WeekMgmt/index.tsx` |

---

## 4. 게시판 (6개)

| # | 라우트 | 페이지명 | 컴포넌트 | 파일 경로 |
|---|--------|----------|----------|-----------|
| 1 | `/main/sec/noticeBoardList` | 공지사항 | NoticeBoardPage | `src/components/pages/Board/Notice/index.tsx` |
| 2 | `/main/sec/qnaBoardList` | 문의/의견 | QnaBoardPage | `src/components/pages/Board/Qna/index.tsx` |
| 3 | `/main/sec/shareBoardList` | 침해대응정보공유 | ShareBoardPage | `src/components/pages/Board/Share/index.tsx` |
| 4 | `/main/sec/resourceBoardList` | 보안자료실 | ResourceBoardPage | `src/components/pages/Board/Resource/index.tsx` |
| 5 | `/main/sec/moisBoardList` | 행안부 게시판 | MoisBoardPage | `src/components/pages/Board/MoisBoard/index.tsx` |
| 6 | `/main/sec/takeOverBoardList` | 인수인계 | TakeOverBoardPage | `src/components/pages/Board/TakeOverBoard/index.tsx` |

---

## 5. 환경관리 (6개)

| # | 라우트 | 페이지명 | 컴포넌트 | 파일 경로 |
|---|--------|----------|----------|-----------|
| 1 | `/main/env/userMgmtList` | 사용자관리 | UserMgmtPage | `src/components/pages/Env/UserMgmtPage.tsx` |
| 2 | `/main/env/instMgmtList` | 기관관리 | InstMgmtPage | `src/components/pages/Env/InstMgmtPage.tsx` |
| 3 | `/main/env/instIPMgmtList` | 기관별IP대역관리 | InstIPMgmtPage | `src/components/pages/Env/InstIPMgmtPage.tsx` |
| 4 | `/main/env/nationIPMgmtList` | 국가별IP관리 | NationIPMgmtPage | `src/components/pages/Env/NationIPMgmtPage.tsx` |
| 5 | `/main/env/userConf` | 사용자설정 | UserConfPage | `src/components/pages/Env/UserConfPage.tsx` |
| 6 | `/main/env/userManagementHistory` | 사용자변경이력 | UserMgmtHistoryPage | `src/components/pages/Env/UserMgmtHistoryPage.tsx` |

---

## 6. 침해사고대응 (1개)

| # | 라우트 | 페이지명 | 컴포넌트 | 파일 경로 |
|---|--------|----------|----------|-----------|
| 1 | `/main/acc/accidentApplyList` | 사고신고 처리현황 | AccidentApplyListPage | `src/components/pages/Acc/AccidentApplyListPage.tsx` |

---

## 7. 보고서 (18개)

### 7.1 일일/주간 보고서

| # | 라우트 | 페이지명 | 컴포넌트 | 파일 경로 |
|---|--------|----------|----------|-----------|
| 1 | `/main/rpt/reportDailyState` | 일일실적보고서 | ReportDailyStatePage | `src/components/pages/Report/ReportDailyStatePage.tsx` |
| 2 | `/main/rpt/reportWeeklyState` | 주간실적보고서 | ReportWeeklyStatePage | `src/components/pages/Report/ReportWeeklyStatePage.tsx` |
| 3 | `/main/rpt/reportDailyInciState` | 시도별일일사고처리 | ReportDailyInciStatePage | `src/components/pages/Report/ReportDailyInciStatePage.tsx` |

### 7.2 유형별 보고서

| # | 라우트 | 페이지명 | 컴포넌트 | 파일 경로 |
|---|--------|----------|----------|-----------|
| 4 | `/main/rpt/reportInciType` | 사고유형조회 | ReportInciTypePage | `src/components/pages/Report/ReportInciTypePage.tsx` |
| 5 | `/main/rpt/reportInciLocal` | 공격국가조회 | ReportInciLocalPage | `src/components/pages/Report/ReportInciLocalPage.tsx` |
| 6 | `/main/rpt/reportInciPrty` | 우선순위조회 | ReportInciPrtyPage | `src/components/pages/Report/ReportInciPrtyPage.tsx` |
| 7 | `/main/rpt/reportInciPrcsStat` | 처리상태조회 | ReportInciPrcsStatPage | `src/components/pages/Report/ReportInciPrcsStatPage.tsx` |
| 8 | `/main/rpt/reportInciSido` | 시군구조회 | ReportInciSidoPage | `src/components/pages/Report/ReportInciSidoPage.tsx` |
| 9 | `/main/rpt/reportInciAttNatn` | 공격국가조회 | ReportInciAttNatnPage | `src/components/pages/Report/ReportInciAttNatnPage.tsx` |
| 10 | `/main/rpt/reportInciDetail` | 사고상세조회 | ReportInciDetailPage | `src/components/pages/Report/ReportInciDetailPage.tsx` |

### 7.3 보안 보고서

| # | 라우트 | 페이지명 | 컴포넌트 | 파일 경로 |
|---|--------|----------|----------|-----------|
| 11 | `/main/rpt/reportSecurityData` | 보안자료 | ReportSecurityDataPage | `src/components/pages/Report/ReportSecurityDataPage.tsx` |
| 12 | `/main/rpt/reportDailySecurity` | 일일보안 | ReportDailySecurityPage | `src/components/pages/Report/ReportDailySecurityPage.tsx` |
| 13 | `/main/rpt/reportSecurityHacking` | 해킹보고서 | ReportSecurityHackingPage | `src/components/pages/Report/ReportSecurityHackingPage.tsx` |
| 14 | `/main/rpt/reportSecurityVulnerability` | 취약점보고서 | ReportSecurityVulnerabilityPage | `src/components/pages/Report/ReportSecurityVulnerabilityPage.tsx` |
| 15 | `/main/rpt/reportSecurityResult` | 보안결과 | ReportSecurityResultPage | `src/components/pages/Report/ReportSecurityResultPage.tsx` |

### 7.4 CTRS 보고서

| # | 라우트 | 페이지명 | 컴포넌트 | 파일 경로 |
|---|--------|----------|----------|-----------|
| 16 | `/main/rpt/reportNotice` | 공지보고서 | ReportNoticePage | `src/components/pages/Report/ReportNoticePage.tsx` |
| 17 | `/main/rpt/reportCtrsDailyState` | CTRS 일일현황 | ReportCtrsDailyStatePage | `src/components/pages/Report/ReportCtrsDailyStatePage.tsx` |
| 18 | `/main/rpt/reportCtrsDailyDetail` | CTRS 일일상세 | ReportCtrsDailyDetailPage | `src/components/pages/Report/ReportCtrsDailyDetailPage.tsx` |

---

## 8. 로그관리 (8개)

### 8.1 사용자 접속 로그

| # | 라우트 | 페이지명 | 컴포넌트 | 파일 경로 |
|---|--------|----------|----------|-----------|
| 1 | `/main/logs/userConnectLogSummary` | 접속로그(요약) | UserConnectLogSummaryPage | `src/components/pages/Logs/UserConnectLogSummaryPage.tsx` |
| 2 | `/main/logs/userConnectLogDaily` | 접속로그(일별) | UserConnectLogDailyPage | `src/components/pages/Logs/UserConnectLogDailyPage.tsx` |
| 3 | `/main/logs/userConnectLogPeriod` | 접속로그(기간별) | UserConnectLogPeriodPage | `src/components/pages/Logs/UserConnectLogPeriodPage.tsx` |
| 4 | `/main/logs/userConnectLogInstitution` | 접속로그(기관별) | UserConnectLogInstitutionPage | `src/components/pages/Logs/UserConnectLogInstitutionPage.tsx` |

### 8.2 사용자 행위 로그

| # | 라우트 | 페이지명 | 컴포넌트 | 파일 경로 |
|---|--------|----------|----------|-----------|
| 5 | `/main/logs/userActionLogSummary` | 행위로그(요약) | UserActionLogSummaryPage | `src/components/pages/Logs/UserActionLogSummaryPage.tsx` |
| 6 | `/main/logs/userActionLogDaily` | 행위로그(일별) | UserActionLogDailyPage | `src/components/pages/Logs/UserActionLogDailyPage.tsx` |
| 7 | `/main/logs/userActionLogPeriod` | 행위로그(기간별) | UserActionLogPeriodPage | `src/components/pages/Logs/UserActionLogPeriodPage.tsx` |
| 8 | `/main/logs/userActionLogInstitution` | 행위로그(기관별) | UserActionLogInstitutionPage | `src/components/pages/Logs/UserActionLogInstitutionPage.tsx` |

---

## 9. 이력관리 (3개)

| # | 라우트 | 페이지명 | 컴포넌트 | 파일 경로 |
|---|--------|----------|----------|-----------|
| 1 | `/main/hist/userInoutHistMgmt` | 사용자 입출이력 | UserInoutHistPage | `src/components/pages/Hist/UserInoutHistPage.tsx` |
| 2 | `/main/hist/smsEmailHistMgmt` | SMS/이메일 이력 | SmsEmailHistPage | `src/components/pages/Hist/SmsEmailHistPage.tsx` |
| 3 | `/main/hist/userActHist` | 사용자 행위이력 | UserActHistPage | `src/components/pages/Hist/UserActHistPage.tsx` |

---

## 10. 엔지니어 (11개)

| # | 라우트 | 페이지명 | 컴포넌트 | 파일 경로 |
|---|--------|----------|----------|-----------|
| 1 | `/main/engineer/passReset` | 비밀번호 초기화 | PassResetPage | `src/components/pages/Engineer/PassResetPage.tsx` |
| 2 | `/main/engineer/sysConf` | 시스템설정 | SysConfPage | `src/components/pages/Engineer/SysConfPage.tsx` |
| 3 | `/main/engineer/collectorConf` | 수집기설정 | CollectorConfPage | `src/components/pages/Engineer/CollectorConfPage.tsx` |
| 4 | `/main/engineer/authGrpConf` | 권한그룹설정 | AuthGrpConfPage | `src/components/pages/Engineer/AuthGrpConfPage.tsx` |
| 5 | `/main/engineer/menuMgmt` | 메뉴관리 | MenuMgmtPage | `src/components/pages/Engineer/MenuMgmtPage.tsx` |
| 6 | `/main/engineer/versionMgmt` | 버전관리 | VersionMgmtPage | `src/components/pages/Engineer/VersionMgmtPage.tsx` |
| 7 | `/main/engineer/agentVrsConf` | 에이전트버전설정 | AgentVrsConfPage | `src/components/pages/Engineer/AgentVrsConfPage.tsx` |
| 8 | `/main/engineer/encrySync` | 암호화동기화 | EncrySyncPage | `src/components/pages/Engineer/EncrySyncPage.tsx` |
| 9 | `/main/engineer/licenseMgmt` | 라이선스관리 | LicenseMgmtPage | `src/components/pages/Engineer/LicenseMgmtPage.tsx` |
| 10 | `/main/engineer/defGrpConf` | 기본그룹설정 | DefGrpConfPage | `src/components/pages/Engineer/DefGrpConfPage.tsx` |
| 11 | `/main/engineer/menuGrpMgmt` | 메뉴그룹관리 | MenuGrpMgmtPage | `src/components/pages/Engineer/MenuGrpMgmtPage.tsx` |

---

## 11. 웹대시보드 (8개)

| # | 라우트 | 페이지명 | 컴포넌트 | 파일 경로 |
|---|--------|----------|----------|-----------|
| 1 | `/webdash/adminControl` | 관리자 대시보드 | AdminControlPage | `src/components/pages/WebDash/AdminControlPage.tsx` |
| 2 | `/webdash/externalControl` | 외부 대시보드 | ExternalControlPage | `src/components/pages/WebDash/ExternalControlPage.tsx` |
| 3 | `/webdash/local` | 지역 대시보드 | LocalDashboardPage | `src/components/pages/WebDash/LocalDashboardPage.tsx` |
| 4 | `/webdash/mois1` | 행안부 대시보드 1 | Mois1DashboardPage | `src/components/pages/WebDash/Mois1DashboardPage.tsx` |
| 5 | `/webdash/mois2` | 행안부 대시보드 2 | Mois2DashboardPage | `src/components/pages/WebDash/Mois2DashboardPage.tsx` |
| 6 | `/webdash/mois3` | 행안부 대시보드 3 | Mois3DashboardPage | `src/components/pages/WebDash/Mois3DashboardPage.tsx` |
| 7 | `/webdash/mois4` | 행안부 대시보드 4 | Mois4DashboardPage | `src/components/pages/WebDash/Mois4DashboardPage.tsx` |
| 8 | `/main/mois/dashConfig` | 대시보드 설정 | DashConfigPage | `src/components/pages/WebDash/DashConfigPage.tsx` |

---

## 12. 홈페이지 모니터링 (5개)

| # | 라우트 | 페이지명 | 컴포넌트 | 파일 경로 |
|---|--------|----------|----------|-----------|
| 1 | `/main/home/healthCheckUrl` | 헬스체크 URL관리 | HealthCheckUrlPage | `src/components/pages/Home/HealthCheckUrlPage.tsx` |
| 2 | `/main/home/healthCheckStat` | 일일 헬스체크 현황 | HealthCheckStatPage | `src/components/pages/Home/HealthCheckStatPage.tsx` |
| 3 | `/main/home/healthCheckHist` | 헬스체크 장애이력 | HealthCheckHistPage | `src/components/pages/Home/HealthCheckHistPage.tsx` |
| 4 | `/main/home/forgeryUrl` | 위변조 URL 현황 | ForgeryUrlPage | `src/components/pages/Home/ForgeryUrlPage.tsx` |
| 5 | `/main/home/forgeryUrlHist` | 위변조 URL 이력 | ForgeryUrlHistPage | `src/components/pages/Home/ForgeryUrlHistPage.tsx` |

---

## 13. 리다이렉트

| 원본 경로 | 대상 경로 | 설명 |
|-----------|-----------|------|
| `/` | `/login` | 루트 접속 시 로그인 페이지로 리다이렉트 |

---

## 라우트 구조 요약

```
/
├── login                          # 로그인
├── popup/
│   ├── privacy-policy             # 개인정보처리방침
│   ├── history-policy/:version    # 정책 이력
│   └── compare-policy/:version    # 정책 비교
├── main                           # 대시보드
│   ├── sys/                       # 시스템관리 (5)
│   ├── sec/                       # 게시판 (6)
│   ├── env/                       # 환경관리 (6)
│   ├── acc/                       # 침해사고 (1)
│   ├── rpt/                       # 보고서 (18)
│   ├── logs/                      # 로그관리 (8)
│   ├── hist/                      # 이력관리 (3)
│   ├── engineer/                  # 엔지니어 (11)
│   ├── mois/                      # 대시보드설정 (1)
│   └── home/                      # 홈페이지모니터링 (5)
└── webdash/                       # 웹대시보드 (7)
    ├── adminControl
    ├── externalControl
    ├── local
    ├── mois1~4
```

---

## 페이지 분류별 요약

| 분류 | 라우트 수 | 비고 |
|------|----------|------|
| 인증/팝업 | 4 | 레이아웃 없음 |
| 메인 | 1 | 대시보드 |
| 시스템관리 | 5 | /main/sys/* |
| 게시판 | 6 | /main/sec/* |
| 환경관리 | 6 | /main/env/* |
| 침해사고 | 1 | /main/acc/* |
| 보고서 | 18 | /main/rpt/* |
| 로그관리 | 8 | /main/logs/* |
| 이력관리 | 3 | /main/hist/* |
| 엔지니어 | 11 | /main/engineer/* |
| 웹대시보드 | 8 | /webdash/*, /main/mois/* |
| 홈페이지모니터링 | 5 | /main/home/* |
| **합계** | **76** | (리다이렉트 1개 포함) |
