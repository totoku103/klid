import { useState, useEffect, useCallback, useMemo } from 'react'
import { globalAlert } from '@/utils/alert'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { useUserStore } from '@/stores/userStore'
import { rptApi } from '@/services/api/rptApi'
import type { DailyReport, DailyTotReport, TypeAccidentReport } from '@/types'

function getDefaultDates(): { date1: string; date2: string } {
  const today = new Date()
  const yearStart = new Date(today.getFullYear(), 0, 1)
  const format = (d: Date) => d.toISOString().slice(0, 10)
  return { date1: format(yearStart), date2: format(today) }
}

export function ReportDailyStatePage() {
  const { user } = useUserStore()
  const defaultDates = useMemo(() => getDefaultDates(), [])

  const [dateInputs, setDateInputs] = useState({
    date1: defaultDates.date1,
    date2: defaultDates.date2,
    time: '06',
  })

  const [dailyData, setDailyData] = useState<DailyReport[]>([])
  const [dailyTotData, setDailyTotData] = useState<DailyTotReport[]>([])
  const [typeAccidentData, setTypeAccidentData] = useState<TypeAccidentReport[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = {
        date1: dateInputs.date1.replace(/-/g, '') + dateInputs.time + '0000',
        date2: dateInputs.date2.replace(/-/g, '') + '235959',
        sInstCd: user?.instCd.toString(),
        sAuthMain: user?.authRole.main,
        grpNo: 1,
      }

      const [daily, dailyTot, typeAccident] = await Promise.all([
        rptApi.getDailyList(params),
        rptApi.getDailyTotList(params),
        rptApi.getTypeAccidentList(params),
      ])

      setDailyData(daily)
      setDailyTotData(dailyTot)
      setTypeAccidentData(typeAccident)
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

  const canExport = user?.authRole.main !== 'AUTH_MAIN_4'

  return (
    <>
      <div className="mb-2 flex flex-wrap items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2">
        <label className="text-sm">검색일자:</label>
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
        <label className="text-sm">누계일자:</label>
        <input
          type="date"
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={dateInputs.date1}
          onChange={(e) => setDateInputs((prev) => ({ ...prev, date1: e.target.value }))}
        />
      </div>

      <PageToolbar>
        <ToolbarButton icon="search" onClick={handleSearch} title="검색" />
        {canExport && <ToolbarButton icon="excel" onClick={handleExport} title="HWP" />}
      </PageToolbar>

      {isLoading ? (
        <div className="p-4 text-center text-gray-500">로딩 중...</div>
      ) : (
        <div className="grid h-[calc(100%-130px)] grid-cols-2 gap-4">
          <div className="col-span-2 overflow-auto rounded border border-gray-300">
            <div className="bg-[#22516d] px-4 py-2 text-sm font-bold text-white">
              유형별 사고내역
            </div>
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b border-gray-300 p-2 text-center">사고유형</th>
                  <th className="border-b border-gray-300 p-2 text-center">건수</th>
                  <th className="border-b border-gray-300 p-2 text-center">비율(%)</th>
                </tr>
              </thead>
              <tbody>
                {typeAccidentData.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500">
                      데이터가 없습니다
                    </td>
                  </tr>
                ) : (
                  typeAccidentData.map((item) => (
                    <tr key={item.accdTypCd} className="hover:bg-gray-50">
                      <td className="border-b border-gray-200 p-2 text-center">
                        {item.accdTypName}
                      </td>
                      <td className="border-b border-gray-200 p-2 text-right">
                        {item.cnt.toLocaleString()}
                      </td>
                      <td className="border-b border-gray-200 p-2 text-right">
                        {item.ratio.toFixed(1)}%
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="overflow-auto rounded border border-gray-300">
            <div className="bg-[#22516d] px-4 py-2 text-sm font-bold text-white">
              일일사고처리
            </div>
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b border-gray-300 p-2 text-center">등록</th>
                  <th className="border-b border-gray-300 p-2 text-center">처리완료</th>
                  <th className="border-b border-gray-300 p-2 text-center">처리중</th>
                </tr>
              </thead>
              <tbody>
                {dailyData.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500">
                      데이터가 없습니다
                    </td>
                  </tr>
                ) : (
                  dailyData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="border-b border-gray-200 p-2 text-right">
                        {item.total_cnt.toLocaleString()}
                      </td>
                      <td className="border-b border-gray-200 p-2 text-right">
                        {item.end_cnt.toLocaleString()}({item.t_end_cnt})
                      </td>
                      <td className="border-b border-gray-200 p-2 text-right">
                        {item.ing_cnt.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="overflow-auto rounded border border-gray-300">
            <div className="bg-[#22516d] px-4 py-2 text-sm font-bold text-white">
              사고처리누계
            </div>
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b border-gray-300 p-2 text-center">등록</th>
                  <th className="border-b border-gray-300 p-2 text-center">처리완료</th>
                  <th className="border-b border-gray-300 p-2 text-center">처리중</th>
                </tr>
              </thead>
              <tbody>
                {dailyTotData.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500">
                      데이터가 없습니다
                    </td>
                  </tr>
                ) : (
                  dailyTotData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="border-b border-gray-200 p-2 text-right">
                        {item.total_cnt.toLocaleString()}
                      </td>
                      <td className="border-b border-gray-200 p-2 text-right">
                        {item.end_cnt.toLocaleString()}({item.t_end_cnt})
                      </td>
                      <td className="border-b border-gray-200 p-2 text-right">
                        {item.ing_cnt.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}
