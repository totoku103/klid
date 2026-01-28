import { lazy, type ComponentType } from 'react'

// 각 페이지 컴포넌트를 lazy load
const MainPage = lazy(() => import('@/components/pages/Main').then(m => ({ default: m.MainPage })))
const AccidentApplyListPage = lazy(() => import('@/components/pages/Acc').then(m => ({ default: m.AccidentApplyListPage })))

// guid별 컴포넌트 맵핑
// 현재 존재하는 컴포넌트만 맵핑하고, 나머지는 PlaceholderPage로 처리
export const COMPONENT_MAP: Record<string, ComponentType<any>> = {
  '616D8144-FAF1-4BAE-9BB6-0B8F5F381130': MainPage, // 대시보드
  'A800930A-372D-41E2-BEDE-B40FFB5FDFAD': AccidentApplyListPage, // 사고신고 처리현황
  // 나머지는 PlaceholderPage
}

// 개발중인 페이지용 Placeholder
function PlaceholderComponent() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center text-gray-500">
        <p className="text-xl">페이지 준비중</p>
        <p className="text-sm mt-2">이 페이지는 개발 중입니다.</p>
      </div>
    </div>
  )
}

export const PlaceholderPage = lazy(() => Promise.resolve({
  default: PlaceholderComponent
}))

export function getComponentByGuid(guid: string): ComponentType<any> {
  return COMPONENT_MAP[guid] || PlaceholderPage
}
