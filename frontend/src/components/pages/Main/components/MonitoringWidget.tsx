import type { MonitoringCount, MonitoringItem } from '@/types'

export interface MonitoringWidgetProps {
  monitoringCount: MonitoringCount | null
  monitoringList: MonitoringItem[]
  onMoreClick?: () => void
  onHealthClick?: (instCd: string) => void
  onForgeryClick?: (instCd: string) => void
}

function formatNumber(num: number | undefined | null): string {
  if (num == null) return '0'
  return num.toLocaleString()
}

function StatusDot({
  isError,
  onClick,
}: {
  isError: boolean
  onClick?: () => void
}) {
  const color = isError ? 'bg-red-600' : 'bg-[#1e88e5]'
  return (
    <span
      className={`inline-block h-3 w-3 rounded-full ${color} ${onClick ? 'cursor-pointer hover:opacity-80' : ''}`}
      onClick={onClick}
    />
  )
}

export function MonitoringWidget({
  monitoringCount,
  monitoringList,
  onMoreClick,
  onHealthClick,
  onForgeryClick,
}: MonitoringWidgetProps) {
  const healthTotal =
    (monitoringCount?.healthNormalCnt ?? 0) +
    (monitoringCount?.healthErrCnt ?? 0)
  const urlTotal =
    (monitoringCount?.urlNormalCnt ?? 0) + (monitoringCount?.urlErrCnt ?? 0)

  const half = Math.ceil(monitoringList.length / 2)
  const leftList = monitoringList.slice(0, half)
  const rightList = monitoringList.slice(half)

  return (
    <div className="rounded border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center border-b border-gray-200 px-4 py-2.5">
        <span className="bg-[#22516d] px-3 py-1 text-sm font-bold text-white">홈페이지 모니터링</span>
        
        <div className="ml-6 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-medium text-gray-600">헬스체크</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="rounded bg-[#00bcd4] px-2 py-0.5 text-xs font-medium text-white">총 개수</span>
              <span className="text-sm font-bold">{formatNumber(healthTotal)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="rounded bg-red-600 px-2 py-0.5 text-xs font-medium text-white">장애 개수</span>
              <span className="text-sm font-bold text-red-600">{formatNumber(monitoringCount?.healthErrCnt)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-xs font-medium text-gray-600">위변조</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="rounded bg-[#00bcd4] px-2 py-0.5 text-xs font-medium text-white">총 개수</span>
              <span className="text-sm font-bold">{formatNumber(urlTotal)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="rounded bg-red-600 px-2 py-0.5 text-xs font-medium text-white">장애 개수</span>
              <span className="text-sm font-bold text-red-600">{formatNumber(monitoringCount?.urlErrCnt)}</span>
            </div>
          </div>
        </div>

        <div className="ml-auto">
          {onMoreClick && (
            <button
              onClick={onMoreClick}
              className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-gray-100 text-gray-500 hover:bg-gray-200"
              type="button"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex">
        <MonitoringTable
          items={leftList}
          onHealthClick={onHealthClick}
          onForgeryClick={onForgeryClick}
        />
        <div className="w-px bg-gray-200" />
        <MonitoringTable
          items={rightList}
          onHealthClick={onHealthClick}
          onForgeryClick={onForgeryClick}
        />
      </div>
    </div>
  )
}

function MonitoringTable({
  items,
  onHealthClick,
  onForgeryClick,
}: {
  items: MonitoringItem[]
  onHealthClick?: (instCd: string) => void
  onForgeryClick?: (instCd: string) => void
}) {
  return (
    <div className="flex-1 overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-b border-r border-gray-200 px-3 py-2 text-center font-medium text-gray-600">자치단체명</th>
            <th className="border-b border-r border-gray-200 px-3 py-2 text-center font-medium text-gray-600">전체시스템</th>
            <th className="border-b border-r border-gray-200 px-3 py-2 text-center font-medium text-gray-600">장애시스템</th>
            <th className="border-b border-gray-200 px-3 py-2 text-center font-medium text-gray-600">위·변조시스템</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => {
              const hasHealthErr = item.hmCnt === '1'
              const hasForgeryErr = item.foCnt === '1'
              const hasAnyError = hasHealthErr || hasForgeryErr

              return (
                <tr key={item.instCd} className="hover:bg-gray-50">
                  <td className="border-b border-r border-gray-100 px-3 py-2 text-center text-gray-700">
                    {item.instNm}
                  </td>
                  <td className="border-b border-r border-gray-100 px-3 py-2 text-center">
                    <StatusDot isError={hasAnyError} />
                  </td>
                  <td className="border-b border-r border-gray-100 px-3 py-2 text-center">
                    <StatusDot
                      isError={hasHealthErr}
                      onClick={
                        hasHealthErr
                          ? () => onHealthClick?.(item.instCd)
                          : undefined
                      }
                    />
                  </td>
                  <td className="border-b border-gray-100 px-3 py-2 text-center">
                    <StatusDot
                      isError={hasForgeryErr}
                      onClick={
                        hasForgeryErr
                          ? () => onForgeryClick?.(item.instCd)
                          : undefined
                      }
                    />
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td
                colSpan={4}
                className="border-b border-gray-100 px-3 py-4 text-center text-gray-400"
              >
                데이터가 없습니다
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
