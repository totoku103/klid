import { useState, useEffect, useCallback, useMemo } from 'react'
import { globalAlert } from '@/utils/alert'
import { SubPageLayout, PageToolbar, ToolbarButton } from '@/components/templates'
import { useUserStore } from '@/stores/userStore'
import { rptApi } from '@/services/api/rptApi'
import type { InciLocalReport } from '@/types'

function getDefaultDates(): { date1: string; date2: string } {
  const today = new Date()
  const monthAgo = new Date()
  monthAgo.setMonth(monthAgo.getMonth() - 1)
  const format = (d: Date) => d.toISOString().slice(0, 10)
  return { date1: format(monthAgo), date2: format(today) }
}

export function ReportInciLocalPage() {
  const { user } = useUserStore()
  const defaultDates = useMemo(() => getDefaultDates(), [])

  const [dateInputs, setDateInputs] = useState({
    date1: defaultDates.date1,
    date2: defaultDates.date2,
    time: '06',
  })

  const [data, setData] = useState<InciLocalReport[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = {
        date1: dateInputs.date1.replace(/-/g, '') + dateInputs.time + '0000',
        date2: dateInputs.date2.replace(/-/g, '') + '235959',
        sInstCd: user?.instCd,
        sAuthMain: user?.authMain,
      }
      const result = await rptApi.getInciLocalList(params)
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

  const totalCnt = data.reduce((sum, item) => sum + item.cnt, 0)

  return (
    <SubPageLayout locationPath={['보고서', '지역별 통계']}>
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
        <label className="text-sm">기준시간:</label>
        <select
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={dateInputs.time}
          onChange={(e) => setDateInputs((prev) => ({ ...prev, time: e.target.value }))}
        >
          {Array.from({ length: 24 }, (_, i) => (
            <option key={i} value={String(i).padStart(2, '0')}>
              {String(i).padStart(2, '0')}
            </option>
          ))}
        </select>
      </div>

      <PageToolbar>
        <ToolbarButton icon="search" onClick={() => loadData()} title="검색" />
        <ToolbarButton
          icon="excel"
          onClick={() => globalAlert.info('HWP 내보내기 기능은 추후 구현 예정입니다.')}
          title="HWP"
        />
      </PageToolbar>

      <div className="h-[calc(100%-130px)] overflow-auto rounded border border-gray-300">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="border-b border-gray-300 p-2 text-center">NO</th>
              <th className="border-b border-gray-300 p-2 text-center">지역</th>
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
                  <tr key={item.localCd} className="hover:bg-gray-50">
                    <td className="border-b border-gray-200 p-2 text-center">{idx + 1}</td>
                    <td className="border-b border-gray-200 p-2 text-center">
                      {item.localName}
                    </td>
                    <td className="border-b border-gray-200 p-2 text-right">
                      {item.cnt.toLocaleString()}
                    </td>
                    <td className="border-b border-gray-200 p-2 text-right">
                      {item.ratio.toFixed(1)}%
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-bold">
                  <td colSpan={2} className="border-b border-gray-300 p-2 text-center">
                    합계
                  </td>
                  <td className="border-b border-gray-300 p-2 text-right">
                    {totalCnt.toLocaleString()}
                  </td>
                  <td className="border-b border-gray-300 p-2 text-right">100%</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </SubPageLayout>
  )
}
