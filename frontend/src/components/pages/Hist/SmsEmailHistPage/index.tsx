import { useState, useEffect, useCallback, useMemo } from 'react'
import { globalAlert } from '@/utils/alert'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { useUserStore } from '@/stores/userStore'
import { histApi } from '@/services/api/histApi'
import type { SmsEmailHist } from '@/types'

function getDefaultDates(): { date1: string; date2: string } {
  const today = new Date()
  const monthAgo = new Date()
  monthAgo.setMonth(monthAgo.getMonth() - 1)
  const format = (d: Date) => d.toISOString().slice(0, 10)
  return { date1: format(monthAgo), date2: format(today) }
}

export function SmsEmailHistPage() {
  const { user } = useUserStore()
  const defaultDates = useMemo(() => getDefaultDates(), [])

  const [dateInputs, setDateInputs] = useState(defaultDates)
  const [data, setData] = useState<SmsEmailHist[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = {
        date1: dateInputs.date1.replace(/-/g, ''),
        date2: dateInputs.date2.replace(/-/g, ''),
        sInstCd: user?.instCd?.toString(),
        sAuthMain: user?.authRole.main,
      }
      const result = await histApi.getSmsEmailHistList(params)
      setData(result)
    } catch (err) {
      console.error('Failed to load history data:', err)
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
        <ToolbarButton
          icon="excel"
          onClick={() => globalAlert.info('엑셀 다운로드 기능은 추후 구현 예정입니다.')}
          title="엑셀"
        />
      </PageToolbar>

      <div className="h-[calc(100%-130px)] overflow-auto rounded border border-gray-300">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="border-b border-gray-300 p-2 text-center">NO</th>
              <th className="border-b border-gray-300 p-2 text-center">구분</th>
              <th className="border-b border-gray-300 p-2 text-center">발신자</th>
              <th className="border-b border-gray-300 p-2 text-center">수신자</th>
              <th className="border-b border-gray-300 p-2 text-center">제목</th>
              <th className="border-b border-gray-300 p-2 text-center">발송일시</th>
              <th className="border-b border-gray-300 p-2 text-center">결과</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  로딩 중...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr key={item.histSeq} className="hover:bg-gray-50">
                  <td className="border-b border-gray-200 p-2 text-center">{idx + 1}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.sendType}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.sender}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.receiver}</td>
                  <td className="border-b border-gray-200 p-2 text-left">{item.title}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.sendDt}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.sendResult}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
