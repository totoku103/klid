import { useState, useEffect, useCallback, useMemo } from 'react'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { useUserStore } from '@/stores/userStore'
import { logsApi } from '@/services/api/logsApi'
import type { UserActionLogDaily } from '@/types'

function getDefaultDate(): string {
  return new Date().toISOString().slice(0, 10)
}

export function UserActionLogDailyPage() {
  const { user } = useUserStore()
  const defaultDate = useMemo(() => getDefaultDate(), [])

  const [searchDate, setSearchDate] = useState(defaultDate)
  const [data, setData] = useState<UserActionLogDaily[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = {
        date1: searchDate.replace(/-/g, ''),
        sInstCd: user?.instCd?.toString(),
        sAuthMain: user?.authRole.main,
      }
      const result = await logsApi.getUserActionLogDaily(params)
      setData(result)
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [searchDate, user])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <>
      <div className="mb-2 flex flex-wrap items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2">
        <label className="text-sm">조회일:</label>
        <input
          type="date"
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
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
              <th className="border-b border-gray-300 p-2 text-center">시간대</th>
              <th className="border-b border-gray-300 p-2 text-center">활동건수</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  로딩 중...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border-b border-gray-200 p-2 text-center">{idx + 1}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.timeSlot}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.actionCnt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
