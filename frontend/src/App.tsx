import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { GlobalAlertModal, GlobalConfirmModal, GlobalPromptModal, ErrorBoundary } from '@/components/organisms'
import { SimpleLayout, DefaultLayout } from '@/components/templates'

// 레이아웃 없는 페이지들
const LoginPage = lazy(() => import('@/components/pages/Login').then(m => ({ default: m.LoginPage })))
const PrivacyPolicyPage = lazy(() => import('@/components/pages/Login/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicyPage })))
const HistoryPolicyPage = lazy(() => import('@/components/pages/Login/PrivacyPolicy').then(m => ({ default: m.HistoryPolicyPage })))
const ComparePolicyPage = lazy(() => import('@/components/pages/Login/PrivacyPolicy').then(m => ({ default: m.ComparePolicyPage })))

// SimpleLayout 사용 페이지 (Header + MenuBar + Outlet)
const MainPage = lazy(() => import('@/components/pages/Main').then(m => ({ default: m.MainPage })))

// Acc 페이지 (침해사고)
const AccidentApplyListPage = lazy(() => import('@/components/pages/Acc').then(m => ({ default: m.AccidentApplyListPage })))

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
              {/* 침해사고 */}
              <Route path="/main/acc/accidentApplyList" element={<AccidentApplyListPage />} />
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
