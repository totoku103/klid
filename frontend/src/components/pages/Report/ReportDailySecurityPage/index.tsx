import { useState, useEffect, useCallback, useMemo } from 'react'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { useUserStore } from '@/stores/userStore'
import { rptApi } from '@/services/api/rptApi'
import type { DailySecurityReport } from '@/types'

function getDefaultDates(): { date1: string; date2: string } {
  const today = new Date()
  const format = (d: Date) => d.toISOString().slice(0, 10)
  return { date1: format(today), date2: format(today) }
}

export function ReportDailySecurityPage() {
  const { user } = useUserStore()
  const defaultDates = useMemo(() => getDefaultDates(), [])

  const [dateInputs, setDateInputs] = useState(defaultDates)
  const [time, setTime] = useState('09')
  const [data, setData] = useState<DailySecurityReport[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = {
        date1: dateInputs.date1.replace(/-/g, ''),
        date2: dateInputs.date2.replace(/-/g, ''),
        time,
        sInstCd: user?.instCd.toString(),
        sAuthMain: user?.authRole.main,
      }
      const result = await rptApi.getDailySecurityReport(params)
      setData(result)
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [dateInputs, time, user])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <>
      <div className="mb-2 flex flex-wrap items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2">
        <label className="text-sm">누계일자:</label>
        <input
          type="date"
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={dateInputs.date1}
          onChange={(e) => setDateInputs((prev) => ({ ...prev, date1: e.target.value }))}
        />
        <label className="text-sm">검색일자:</label>
        <input
          type="date"
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={dateInputs.date2}
          onChange={(e) => setDateInputs((prev) => ({ ...prev, date2: e.target.value }))}
        />
        <label className="text-sm">시간:</label>
        <select
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          {Array.from({ length: 24 }, (_, i) => (
            <option key={i} value={String(i).padStart(2, '0')}>
              {String(i).padStart(2, '0')}시
            </option>
          ))}
        </select>
      </div>

      <PageToolbar>
        <ToolbarButton icon="search" onClick={loadData} title="검색" />
      </PageToolbar>

      <div className="h-[calc(100%-130px)] overflow-auto rounded border border-gray-300">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="border-b border-gray-300 p-2 text-center">유형</th>
              <th className="border-b border-gray-300 p-2 text-center">금일건수</th>
              <th className="border-b border-gray-300 p-2 text-center">누계건수</th>
              <th className="border-b border-gray-300 p-2 text-center">완료</th>
              <th className="border-b border-gray-300 p-2 text-center">처리중</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  로딩 중...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border-b border-gray-200 p-2 text-center">{item.typeName}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.todayCnt}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.totalCnt}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.endCnt}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.ingCnt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
