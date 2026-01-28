import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { GlobalAlertModal, GlobalConfirmModal, GlobalPromptModal, ErrorBoundary } from '@/components/organisms'
import { DynamicRoutes } from '@/router'

// 레이아웃 없는 페이지들 (로그인, 팝업 등)
const LoginPage = lazy(() => import('@/components/pages/Login').then(m => ({ default: m.LoginPage })))
const PrivacyPolicyPage = lazy(() => import('@/components/pages/Login/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicyPage })))
const HistoryPolicyPage = lazy(() => import('@/components/pages/Login/PrivacyPolicy').then(m => ({ default: m.HistoryPolicyPage })))
const ComparePolicyPage = lazy(() => import('@/components/pages/Login/PrivacyPolicy').then(m => ({ default: m.ComparePolicyPage })))

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

            {/* 동적 라우트 (인증 필요한 페이지들) */}
            <Route path="/*" element={<DynamicRoutes />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
