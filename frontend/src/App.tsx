import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { GlobalAlertModal, GlobalConfirmModal, GlobalPromptModal, ErrorBoundary } from '@/components/organisms'
import { SimpleLayout, DefaultLayout } from '@/components/templates'

// 레이아웃 없는 페이지들
const LoginPage = lazy(() => import('@/components/pages/Login').then(m => ({ default: m.LoginPage })))
const PrivacyPolicyPage = lazy(() => import('@/components/pages/Popup').then(m => ({ default: m.PrivacyPolicyPage })))
const HistoryPolicyPage = lazy(() => import('@/components/pages/Popup').then(m => ({ default: m.HistoryPolicyPage })))
const ComparePolicyPage = lazy(() => import('@/components/pages/Popup').then(m => ({ default: m.ComparePolicyPage })))

// SimpleLayout 사용 페이지 (Header + MenuBar + Outlet)
const MainPage = lazy(() => import('@/components/pages/Main').then(m => ({ default: m.MainPage })))

// DefaultLayout 사용 페이지 (Header + MenuBar + PageNav + Outlet)
const CustUserMgmtPage = lazy(() => import('@/components/pages/System').then(m => ({ default: m.CustUserMgmtPage })))
const BoardMgmtPage = lazy(() => import('@/components/pages/System').then(m => ({ default: m.BoardMgmtPage })))
const CodeMgmtPage = lazy(() => import('@/components/pages/System').then(m => ({ default: m.CodeMgmtPage })))
const RiskMgmtPage = lazy(() => import('@/components/pages/System').then(m => ({ default: m.RiskMgmtPage })))
const WeekMgmtPage = lazy(() => import('@/components/pages/System').then(m => ({ default: m.WeekMgmtPage })))

const NoticeBoardPage = lazy(() => import('@/components/pages/Board').then(m => ({ default: m.NoticeBoardPage })))
const QnaBoardPage = lazy(() => import('@/components/pages/Board').then(m => ({ default: m.QnaBoardPage })))
const ShareBoardPage = lazy(() => import('@/components/pages/Board').then(m => ({ default: m.ShareBoardPage })))
const ResourceBoardPage = lazy(() => import('@/components/pages/Board').then(m => ({ default: m.ResourceBoardPage })))
const MoisBoardPage = lazy(() => import('@/components/pages/Board').then(m => ({ default: m.MoisBoardPage })))
const TakeOverBoardPage = lazy(() => import('@/components/pages/Board').then(m => ({ default: m.TakeOverBoardPage })))

const UserMgmtPage = lazy(() => import('@/components/pages/Env').then(m => ({ default: m.UserMgmtPage })))
const InstMgmtPage = lazy(() => import('@/components/pages/Env').then(m => ({ default: m.InstMgmtPage })))
const InstIPMgmtPage = lazy(() => import('@/components/pages/Env').then(m => ({ default: m.InstIPMgmtPage })))
const NationIPMgmtPage = lazy(() => import('@/components/pages/Env').then(m => ({ default: m.NationIPMgmtPage })))
const UserConfPage = lazy(() => import('@/components/pages/Env').then(m => ({ default: m.UserConfPage })))
const UserMgmtHistoryPage = lazy(() => import('@/components/pages/Env').then(m => ({ default: m.UserMgmtHistoryPage })))

const AccidentApplyListPage = lazy(() => import('@/components/pages/Acc').then(m => ({ default: m.AccidentApplyListPage })))

const ReportDailyStatePage = lazy(() => import('@/components/pages/Report').then(m => ({ default: m.ReportDailyStatePage })))
const ReportWeeklyStatePage = lazy(() => import('@/components/pages/Report').then(m => ({ default: m.ReportWeeklyStatePage })))
const ReportInciTypePage = lazy(() => import('@/components/pages/Report').then(m => ({ default: m.ReportInciTypePage })))
const ReportInciLocalPage = lazy(() => import('@/components/pages/Report').then(m => ({ default: m.ReportInciLocalPage })))
const ReportInciPrtyPage = lazy(() => import('@/components/pages/Report').then(m => ({ default: m.ReportInciPrtyPage })))
const ReportInciPrcsStatPage = lazy(() => import('@/components/pages/Report').then(m => ({ default: m.ReportInciPrcsStatPage })))
const ReportInciSidoPage = lazy(() => import('@/components/pages/Report').then(m => ({ default: m.ReportInciSidoPage })))
const ReportInciAttNatnPage = lazy(() => import('@/components/pages/Report').then(m => ({ default: m.ReportInciAttNatnPage })))
const ReportSecurityDataPage = lazy(() => import('@/components/pages/Report').then(m => ({ default: m.ReportSecurityDataPage })))
const ReportDailySecurityPage = lazy(() => import('@/components/pages/Report').then(m => ({ default: m.ReportDailySecurityPage })))
const ReportNoticePage = lazy(() => import('@/components/pages/Report').then(m => ({ default: m.ReportNoticePage })))
const ReportCtrsDailyStatePage = lazy(() => import('@/components/pages/Report').then(m => ({ default: m.ReportCtrsDailyStatePage })))
const ReportCtrsDailyDetailPage = lazy(() => import('@/components/pages/Report').then(m => ({ default: m.ReportCtrsDailyDetailPage })))
const ReportInciDetailPage = lazy(() => import('@/components/pages/Report').then(m => ({ default: m.ReportInciDetailPage })))
const ReportDailyInciStatePage = lazy(() => import('@/components/pages/Report').then(m => ({ default: m.ReportDailyInciStatePage })))
const ReportSecurityHackingPage = lazy(() => import('@/components/pages/Report').then(m => ({ default: m.ReportSecurityHackingPage })))
const ReportSecurityVulnerabilityPage = lazy(() => import('@/components/pages/Report').then(m => ({ default: m.ReportSecurityVulnerabilityPage })))
const ReportSecurityResultPage = lazy(() => import('@/components/pages/Report').then(m => ({ default: m.ReportSecurityResultPage })))

const UserConnectLogDailyPage = lazy(() => import('@/components/pages/Logs').then(m => ({ default: m.UserConnectLogDailyPage })))
const UserConnectLogPeriodPage = lazy(() => import('@/components/pages/Logs').then(m => ({ default: m.UserConnectLogPeriodPage })))
const UserConnectLogInstitutionPage = lazy(() => import('@/components/pages/Logs').then(m => ({ default: m.UserConnectLogInstitutionPage })))
const UserConnectLogSummaryPage = lazy(() => import('@/components/pages/Logs').then(m => ({ default: m.UserConnectLogSummaryPage })))
const UserActionLogDailyPage = lazy(() => import('@/components/pages/Logs').then(m => ({ default: m.UserActionLogDailyPage })))
const UserActionLogPeriodPage = lazy(() => import('@/components/pages/Logs').then(m => ({ default: m.UserActionLogPeriodPage })))
const UserActionLogInstitutionPage = lazy(() => import('@/components/pages/Logs').then(m => ({ default: m.UserActionLogInstitutionPage })))
const UserActionLogSummaryPage = lazy(() => import('@/components/pages/Logs').then(m => ({ default: m.UserActionLogSummaryPage })))

const UserInoutHistPage = lazy(() => import('@/components/pages/Hist').then(m => ({ default: m.UserInoutHistPage })))
const SmsEmailHistPage = lazy(() => import('@/components/pages/Hist').then(m => ({ default: m.SmsEmailHistPage })))
const UserActHistPage = lazy(() => import('@/components/pages/Hist').then(m => ({ default: m.UserActHistPage })))

const PassResetPage = lazy(() => import('@/components/pages/Engineer').then(m => ({ default: m.PassResetPage })))
const SysConfPage = lazy(() => import('@/components/pages/Engineer').then(m => ({ default: m.SysConfPage })))
const CollectorConfPage = lazy(() => import('@/components/pages/Engineer').then(m => ({ default: m.CollectorConfPage })))
const AuthGrpConfPage = lazy(() => import('@/components/pages/Engineer').then(m => ({ default: m.AuthGrpConfPage })))
const MenuMgmtPage = lazy(() => import('@/components/pages/Engineer').then(m => ({ default: m.MenuMgmtPage })))
const VersionMgmtPage = lazy(() => import('@/components/pages/Engineer').then(m => ({ default: m.VersionMgmtPage })))
const AgentVrsConfPage = lazy(() => import('@/components/pages/Engineer').then(m => ({ default: m.AgentVrsConfPage })))
const EncrySyncPage = lazy(() => import('@/components/pages/Engineer').then(m => ({ default: m.EncrySyncPage })))
const LicenseMgmtPage = lazy(() => import('@/components/pages/Engineer').then(m => ({ default: m.LicenseMgmtPage })))
const DefGrpConfPage = lazy(() => import('@/components/pages/Engineer').then(m => ({ default: m.DefGrpConfPage })))
const MenuGrpMgmtPage = lazy(() => import('@/components/pages/Engineer').then(m => ({ default: m.MenuGrpMgmtPage })))

const AdminControlPage = lazy(() => import('@/components/pages/WebDash').then(m => ({ default: m.AdminControlPage })))
const ExternalControlPage = lazy(() => import('@/components/pages/WebDash').then(m => ({ default: m.ExternalControlPage })))
const LocalDashboardPage = lazy(() => import('@/components/pages/WebDash').then(m => ({ default: m.LocalDashboardPage })))
const Mois1DashboardPage = lazy(() => import('@/components/pages/WebDash').then(m => ({ default: m.Mois1DashboardPage })))
const Mois2DashboardPage = lazy(() => import('@/components/pages/WebDash').then(m => ({ default: m.Mois2DashboardPage })))
const Mois3DashboardPage = lazy(() => import('@/components/pages/WebDash').then(m => ({ default: m.Mois3DashboardPage })))
const Mois4DashboardPage = lazy(() => import('@/components/pages/WebDash').then(m => ({ default: m.Mois4DashboardPage })))
const DashConfigPage = lazy(() => import('@/components/pages/WebDash').then(m => ({ default: m.DashConfigPage })))

const HealthCheckUrlPage = lazy(() => import('@/components/pages/Home').then(m => ({ default: m.HealthCheckUrlPage })))
const HealthCheckStatPage = lazy(() => import('@/components/pages/Home').then(m => ({ default: m.HealthCheckStatPage })))
const HealthCheckHistPage = lazy(() => import('@/components/pages/Home').then(m => ({ default: m.HealthCheckHistPage })))
const ForgeryUrlPage = lazy(() => import('@/components/pages/Home').then(m => ({ default: m.ForgeryUrlPage })))
const ForgeryUrlHistPage = lazy(() => import('@/components/pages/Home').then(m => ({ default: m.ForgeryUrlHistPage })))

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">로딩 중...</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <GlobalAlertModal />
        <GlobalConfirmModal />
        <GlobalPromptModal />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* 레이아웃 없는 페이지들 */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/popup/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/popup/history-policy/:version" element={<HistoryPolicyPage />} />
            <Route path="/popup/compare-policy/:version" element={<ComparePolicyPage />} />

            {/* SimpleLayout: Header + MenuBar + Outlet */}
            <Route element={<SimpleLayout />}>
              <Route path="/main" element={<MainPage />} />
            </Route>

            {/* DefaultLayout: Header + MenuBar + PageNav + Outlet */}
            <Route element={<DefaultLayout />}>
              {/* 시스템관리 */}
              <Route path="/main/sys/custUserMgmt" element={<CustUserMgmtPage />} />
              <Route path="/main/sys/boardMgmt" element={<BoardMgmtPage />} />
              <Route path="/main/sys/codeMgmtList" element={<CodeMgmtPage />} />
              <Route path="/main/sys/riskMgmt" element={<RiskMgmtPage />} />
              <Route path="/main/sys/weekMgmt" element={<WeekMgmtPage />} />

              {/* 게시판 */}
              <Route path="/main/sec/noticeBoardList" element={<NoticeBoardPage />} />
              <Route path="/main/sec/qnaBoardList" element={<QnaBoardPage />} />
              <Route path="/main/sec/shareBoardList" element={<ShareBoardPage />} />
              <Route path="/main/sec/resourceBoardList" element={<ResourceBoardPage />} />
              <Route path="/main/sec/moisBoardList" element={<MoisBoardPage />} />
              <Route path="/main/sec/takeOverBoardList" element={<TakeOverBoardPage />} />

              {/* 환경관리 */}
              <Route path="/main/env/userMgmtList" element={<UserMgmtPage />} />
              <Route path="/main/env/instMgmtList" element={<InstMgmtPage />} />
              <Route path="/main/env/instIPMgmtList" element={<InstIPMgmtPage />} />
              <Route path="/main/env/nationIPMgmtList" element={<NationIPMgmtPage />} />
              <Route path="/main/env/userConf" element={<UserConfPage />} />
              <Route path="/main/env/userManagementHistory" element={<UserMgmtHistoryPage />} />

              {/* 침해사고 */}
              <Route path="/main/acc/accidentApplyList" element={<AccidentApplyListPage />} />

              {/* 보고서 */}
              <Route path="/main/rpt/reportDailyState" element={<ReportDailyStatePage />} />
              <Route path="/main/rpt/reportWeeklyState" element={<ReportWeeklyStatePage />} />
              <Route path="/main/rpt/reportInciType" element={<ReportInciTypePage />} />
              <Route path="/main/rpt/reportInciLocal" element={<ReportInciLocalPage />} />
              <Route path="/main/rpt/reportInciPrty" element={<ReportInciPrtyPage />} />
              <Route path="/main/rpt/reportInciPrcsStat" element={<ReportInciPrcsStatPage />} />
              <Route path="/main/rpt/reportInciSido" element={<ReportInciSidoPage />} />
              <Route path="/main/rpt/reportInciAttNatn" element={<ReportInciAttNatnPage />} />
              <Route path="/main/rpt/reportSecurityData" element={<ReportSecurityDataPage />} />
              <Route path="/main/rpt/reportDailySecurity" element={<ReportDailySecurityPage />} />
              <Route path="/main/rpt/reportNotice" element={<ReportNoticePage />} />
              <Route path="/main/rpt/reportCtrsDailyState" element={<ReportCtrsDailyStatePage />} />
              <Route path="/main/rpt/reportCtrsDailyDetail" element={<ReportCtrsDailyDetailPage />} />
              <Route path="/main/rpt/reportInciDetail" element={<ReportInciDetailPage />} />
              <Route path="/main/rpt/reportDailyInciState" element={<ReportDailyInciStatePage />} />
              <Route path="/main/rpt/reportSecurityHacking" element={<ReportSecurityHackingPage />} />
              <Route path="/main/rpt/reportSecurityVulnerability" element={<ReportSecurityVulnerabilityPage />} />
              <Route path="/main/rpt/reportSecurityResult" element={<ReportSecurityResultPage />} />

              {/* 로그 */}
              <Route path="/main/logs/userConnectLogDaily" element={<UserConnectLogDailyPage />} />
              <Route path="/main/logs/userConnectLogPeriod" element={<UserConnectLogPeriodPage />} />
              <Route path="/main/logs/userConnectLogInstitution" element={<UserConnectLogInstitutionPage />} />
              <Route path="/main/logs/userConnectLogSummary" element={<UserConnectLogSummaryPage />} />
              <Route path="/main/logs/userActionLogDaily" element={<UserActionLogDailyPage />} />
              <Route path="/main/logs/userActionLogPeriod" element={<UserActionLogPeriodPage />} />
              <Route path="/main/logs/userActionLogInstitution" element={<UserActionLogInstitutionPage />} />
              <Route path="/main/logs/userActionLogSummary" element={<UserActionLogSummaryPage />} />

              {/* 이력관리 */}
              <Route path="/main/hist/userInoutHistMgmt" element={<UserInoutHistPage />} />
              <Route path="/main/hist/smsEmailHistMgmt" element={<SmsEmailHistPage />} />
              <Route path="/main/hist/userActHist" element={<UserActHistPage />} />

              {/* 엔지니어 */}
              <Route path="/main/engineer/passReset" element={<PassResetPage />} />
              <Route path="/main/engineer/sysConf" element={<SysConfPage />} />
              <Route path="/main/engineer/collectorConf" element={<CollectorConfPage />} />
              <Route path="/main/engineer/authGrpConf" element={<AuthGrpConfPage />} />
              <Route path="/main/engineer/menuMgmt" element={<MenuMgmtPage />} />
              <Route path="/main/engineer/versionMgmt" element={<VersionMgmtPage />} />
              <Route path="/main/engineer/agentVrsConf" element={<AgentVrsConfPage />} />
              <Route path="/main/engineer/encrySync" element={<EncrySyncPage />} />
              <Route path="/main/engineer/licenseMgmt" element={<LicenseMgmtPage />} />
              <Route path="/main/engineer/defGrpConf" element={<DefGrpConfPage />} />
              <Route path="/main/engineer/menuGrpMgmt" element={<MenuGrpMgmtPage />} />

              {/* 웹대시보드 */}
              <Route path="/webdash/adminControl" element={<AdminControlPage />} />
              <Route path="/webdash/externalControl" element={<ExternalControlPage />} />
              <Route path="/webdash/local" element={<LocalDashboardPage />} />
              <Route path="/webdash/mois1" element={<Mois1DashboardPage />} />
              <Route path="/webdash/mois2" element={<Mois2DashboardPage />} />
              <Route path="/webdash/mois3" element={<Mois3DashboardPage />} />
              <Route path="/webdash/mois4" element={<Mois4DashboardPage />} />
              <Route path="/main/mois/dashConfig" element={<DashConfigPage />} />

              {/* 홈페이지 관리 */}
              <Route path="/main/home/healthCheckUrl" element={<HealthCheckUrlPage />} />
              <Route path="/main/home/healthCheckStat" element={<HealthCheckStatPage />} />
              <Route path="/main/home/healthCheckHist" element={<HealthCheckHistPage />} />
              <Route path="/main/home/forgeryUrl" element={<ForgeryUrlPage />} />
              <Route path="/main/home/forgeryUrlHist" element={<ForgeryUrlHistPage />} />
            </Route>

            {/* 기본 리다이렉트 */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
