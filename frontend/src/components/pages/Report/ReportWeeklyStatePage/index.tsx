import { useState, useEffect, useCallback, useMemo } from 'react'
import { globalAlert } from '@/utils/alert'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { useUserStore } from '@/stores/userStore'
import { rptApi } from '@/services/api/rptApi'
import type { WeeklyStateReport } from '@/types'

function getDefaultDates(): { date1: string; date2: string } {
  const today = new Date()
  const monthAgo = new Date()
  monthAgo.setMonth(monthAgo.getMonth() - 1)
  const format = (d: Date) => d.toISOString().slice(0, 10)
  return { date1: format(monthAgo), date2: format(today) }
}

export function ReportWeeklyStatePage() {
  const { user } = useUserStore()
  const defaultDates = useMemo(() => getDefaultDates(), [])

  const [dateInputs, setDateInputs] = useState({
    date1: defaultDates.date1,
    date2: defaultDates.date2,
  })

  const [data, setData] = useState<WeeklyStateReport[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = {
        date1: dateInputs.date1.replace(/-/g, '') + '000000',
        date2: dateInputs.date2.replace(/-/g, '') + '235959',
        sInstCd: user?.instCd.toString(),
        sAuthMain: user?.authRole.main,
      }
      const result = await rptApi.getWeeklyStateList(params)
      setData(result)
    } catch (err) {
      console.error('Failed to load report data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [dateInputs, user])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleSearch = useCallback(() => {
    loadData()
  }, [loadData])

  const handleExport = useCallback(() => {
    globalAlert.info('HWP 내보내기 기능은 추후 구현 예정입니다.')
  }, [])

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
        <ToolbarButton icon="search" onClick={handleSearch} title="검색" />
        <ToolbarButton icon="excel" onClick={handleExport} title="HWP" />
      </PageToolbar>

      <div className="h-[calc(100%-130px)] overflow-auto rounded border border-gray-300">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="border-b border-gray-300 p-2 text-center">주차</th>
              <th className="border-b border-gray-300 p-2 text-center">시작일</th>
              <th className="border-b border-gray-300 p-2 text-center">종료일</th>
              <th className="border-b border-gray-300 p-2 text-center">총 건수</th>
              <th className="border-b border-gray-300 p-2 text-center">완료</th>
              <th className="border-b border-gray-300 p-2 text-center">처리중</th>
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
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.weekNo}주차
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.startDate}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.endDate}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-right">
                    {item.totalCnt.toLocaleString()}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-right">
                    {item.endCnt.toLocaleString()}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-right">
                    {item.ingCnt.toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
