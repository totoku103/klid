import { useState, useEffect, useCallback, useMemo } from 'react'
import { SubPageLayout, PageToolbar, ToolbarButton } from '@/components/templates'
import { useUserStore } from '@/stores/userStore'
import { rptApi } from '@/services/api/rptApi'
import type { SecurityResultReport } from '@/types'

function getDefaultDates(): { date1: string; date2: string } {
  const today = new Date()
  const monthAgo = new Date(today)
  monthAgo.setMonth(monthAgo.getMonth() - 1)
  const format = (d: Date) => d.toISOString().slice(0, 10)
  return { date1: format(monthAgo), date2: format(today) }
}

export function ReportSecurityResultPage() {
  const { user } = useUserStore()
  const defaultDates = useMemo(() => getDefaultDates(), [])

  const [dateInputs, setDateInputs] = useState(defaultDates)
  const [data, setData] = useState<SecurityResultReport[]>([])
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
      const result = await rptApi.getSecurityResultList(params)
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

  const totalCnt = data.reduce((sum, item) => sum + item.cnt, 0)

  return (
    <SubPageLayout locationPath={['보고서', '보안결과']}>
      <div className="mb-2 flex flex-wrap items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2">
        <label className="text-sm">시작일:</label>
        <input
          type="date"
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={dateInputs.date1}
          onChange={(e) => setDateInputs((prev) => ({ ...prev, date1: e.target.value }))}
        />
        <label className="text-sm">종료일:</label>
        <input
          type="date"
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={dateInputs.date2}
          onChange={(e) => setDateInputs((prev) => ({ ...prev, date2: e.target.value }))}
        />
      </div>

      <PageToolbar>
        <ToolbarButton icon="search" onClick={loadData} title="검색" />
      </PageToolbar>

      <div className="h-[calc(100%-130px)] overflow-auto rounded border border-gray-300">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="border-b border-gray-300 p-2 text-center">결과유형</th>
              <th className="border-b border-gray-300 p-2 text-center">결과명</th>
              <th className="border-b border-gray-300 p-2 text-center">건수</th>
              <th className="border-b border-gray-300 p-2 text-center">비율(%)</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  로딩 중...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              <>
                {data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border-b border-gray-200 p-2 text-center">{item.resultType}</td>
                    <td className="border-b border-gray-200 p-2">{item.resultName}</td>
                    <td className="border-b border-gray-200 p-2 text-center">{item.cnt}</td>
                    <td className="border-b border-gray-200 p-2 text-center">{item.ratio.toFixed(1)}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-semibold">
                  <td colSpan={2} className="border-b border-gray-300 p-2 text-center">합계</td>
                  <td className="border-b border-gray-300 p-2 text-center">{totalCnt}</td>
                  <td className="border-b border-gray-300 p-2 text-center">100.0</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </SubPageLayout>
  )
}
