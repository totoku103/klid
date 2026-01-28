import { useState, useEffect, useCallback, useMemo } from 'react'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { useUserStore } from '@/stores/userStore'
import { logsApi } from '@/services/api/logsApi'
import type { UserConnectLogSummary } from '@/types'

function getDefaultDates(): { date1: string; date2: string } {
  const today = new Date()
  const monthAgo = new Date()
  monthAgo.setMonth(monthAgo.getMonth() - 1)
  const format = (d: Date) => d.toISOString().slice(0, 10)
  return { date1: format(monthAgo), date2: format(today) }
}

export function UserConnectLogSummaryPage() {
  const { user } = useUserStore()
  const defaultDates = useMemo(() => getDefaultDates(), [])

  const [dateInputs, setDateInputs] = useState(defaultDates)
  const [data, setData] = useState<UserConnectLogSummary[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = {
        date1: dateInputs.date1.replace(/-/g, ''),
        date2: dateInputs.date2.replace(/-/g, ''),
        sInstCd: user?.instCd,
        sAuthMain: user?.authMain,
      }
      const result = await logsApi.getUserConnectLogSummary(params)
      setData(result)
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [dateInputs, user])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <>
      <div className="mb-2 flex flex-wrap items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2">
        <label className="text-sm">기간:</label>
        <input
          type="date"
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={dateInputs.date1}
          onChange={(e) => setDateInputs((prev) => ({ ...prev, date1: e.target.value }))}
        />
        <span className="text-sm">~</span>
        <input
          type="date"
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={dateInputs.date2}
          onChange={(e) => setDateInputs((prev) => ({ ...prev, date2: e.target.value }))}
        />
      </div>

      <PageToolbar>
        <ToolbarButton icon="search" onClick={() => loadData()} title="검색" />
      </PageToolbar>

      <div className="h-[calc(100%-130px)] overflow-auto rounded border border-gray-300">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="border-b border-gray-300 p-2 text-center">NO</th>
              <th className="border-b border-gray-300 p-2 text-center">요약유형</th>
              <th className="border-b border-gray-300 p-2 text-center">총건수</th>
              <th className="border-b border-gray-300 p-2 text-center">평균건수</th>
              <th className="border-b border-gray-300 p-2 text-center">최대건수</th>
              <th className="border-b border-gray-300 p-2 text-center">최소건수</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  로딩 중...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border-b border-gray-200 p-2 text-center">{idx + 1}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.summaryType}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.totalCnt}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.avgCnt}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.maxCnt}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.minCnt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
