import { useState, useEffect, useCallback, useMemo } from 'react'
import { globalAlert } from '@/utils/alert'
import { SubPageLayout, PageToolbar, ToolbarButton } from '@/components/templates'
import { useUserStore } from '@/stores/userStore'
import { histApi } from '@/services/api/histApi'
import type { UserActHist } from '@/types'

function getDefaultDates(): { date1: string; date2: string } {
  const today = new Date()
  const monthAgo = new Date()
  monthAgo.setMonth(monthAgo.getMonth() - 1)
  const format = (d: Date) => d.toISOString().slice(0, 10)
  return { date1: format(monthAgo), date2: format(today) }
}

export function UserActHistPage() {
  const { user } = useUserStore()
  const defaultDates = useMemo(() => getDefaultDates(), [])

  const [dateInputs, setDateInputs] = useState(defaultDates)
  const [searchUserId, setSearchUserId] = useState('')
  const [searchUserName, setSearchUserName] = useState('')
  const [data, setData] = useState<UserActHist[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = {
        date1: dateInputs.date1.replace(/-/g, ''),
        date2: dateInputs.date2.replace(/-/g, ''),
        userId: searchUserId || undefined,
        userName: searchUserName || undefined,
        sInstCd: user?.instCd,
        sAuthMain: user?.authMain,
      }
      const result = await histApi.getUserActHistList(params)
      setData(result)
    } catch (err) {
      console.error('Failed to load history data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [dateInputs, searchUserId, searchUserName, user])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <SubPageLayout locationPath={['이력관리', '사용자 행위이력']}>
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
        <label className="text-sm">사용자ID:</label>
        <input
          type="text"
          className="w-24 rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchUserId}
          onChange={(e) => setSearchUserId(e.target.value)}
        />
        <label className="text-sm">사용자명:</label>
        <input
          type="text"
          className="w-24 rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchUserName}
          onChange={(e) => setSearchUserName(e.target.value)}
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
              <th className="border-b border-gray-300 p-2 text-center">사용자ID</th>
              <th className="border-b border-gray-300 p-2 text-center">사용자명</th>
              <th className="border-b border-gray-300 p-2 text-center">기관명</th>
              <th className="border-b border-gray-300 p-2 text-center">행위유형</th>
              <th className="border-b border-gray-300 p-2 text-center">상세내용</th>
              <th className="border-b border-gray-300 p-2 text-center">일시</th>
              <th className="border-b border-gray-300 p-2 text-center">IP</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-500">
                  로딩 중...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr key={item.histSeq} className="hover:bg-gray-50">
                  <td className="border-b border-gray-200 p-2 text-center">{idx + 1}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.userId}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.userName}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.instNm}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.actType}</td>
                  <td className="border-b border-gray-200 p-2 text-left">{item.actDesc}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.actDt}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.ipAddr}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </SubPageLayout>
  )
}
