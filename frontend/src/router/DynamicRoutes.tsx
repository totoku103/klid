import { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { SimpleLayout, DefaultLayout } from '@/components/templates'
import { useMenuStore } from '@/stores/menuStore'
import { getComponentByGuid, PlaceholderPage } from './componentMap'
import type { MenuItem } from '@/types'

// 메뉴에서 모든 leaf 아이템(실제 페이지)을 추출
function extractRoutes(menus: MenuItem[]): Array<{ guid: string; path: string }> {
  const routes: Array<{ guid: string; path: string }> = []

  function traverse(items: MenuItem[]) {
    for (const item of items) {
      if (item.url && !item.children?.length) {
        routes.push({ guid: item.id, path: item.url })
      }
      if (item.children) {
        traverse(item.children)
      }
    }
  }

  traverse(menus)
  return routes
}

interface LoadingFallbackProps {
  message?: string
}

function LoadingFallback({ message = '로딩 중...' }: LoadingFallbackProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}

export function DynamicRoutes() {
  const { menus } = useMenuStore()
  const routes = extractRoutes(menus)

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* SimpleLayout: 대시보드만 (Main 페이지) */}
        <Route element={<SimpleLayout />}>
          <Route path="/main" element={
            <Suspense fallback={<LoadingFallback />}>
              {(() => {
                const Component = getComponentByGuid('616D8144-FAF1-4BAE-9BB6-0B8F5F381130')
                return <Component />
              })()}
            </Suspense>
          } />
        </Route>

        {/* DefaultLayout: 나머지 모든 페이지 */}
        <Route element={<DefaultLayout />}>
          {routes
            .filter(route => route.path !== '/main')
            .map(route => {
              const Component = getComponentByGuid(route.guid)
              return (
                <Route
                  key={route.guid}
                  path={route.path}
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Component />
                    </Suspense>
                  }
                />
              )
            })}
          {/* 알 수 없는 /main/* 경로에 대한 fallback */}
          <Route path="/main/*" element={
            <Suspense fallback={<LoadingFallback />}>
              <PlaceholderPage />
            </Suspense>
          } />
        </Route>

        {/* 기본 리다이렉트 */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  )
}
