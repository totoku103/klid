import { useState, useEffect, useCallback, useRef } from 'react'
import { webdashApi } from '@/services/api/webdashApi'
import type { DashConfigItem, DashChartSum } from '@/types'

const REFRESH_INTERVAL = 60000

function formatDateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function Mois4DashboardPage() {
  const [configData, setConfigData] = useState<DashConfigItem[]>([])
  const [chartData, setChartData] = useState<DashChartSum[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const timerRef = useRef<number | null>(null)

  const loadData = useCallback(async () => {
    try {
      const today = new Date()
      const weekAgo = new Date(today)
      weekAgo.setDate(weekAgo.getDate() - 7)
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)

      const [config, chart] = await Promise.all([
        webdashApi.getDashConfigList(formatDateString(today)),
        webdashApi.getDashChartSum(formatDateString(weekAgo), formatDateString(yesterday)),
      ])
      setConfigData(config)
      setChartData(chart)
    } catch (err) {
      console.error('Failed to load data:', err)
    }
  }, [])

  useEffect(() => {
    loadData()

    timerRef.current = window.setInterval(() => {
      setCurrentTime(new Date())
      loadData()
    }, REFRESH_INTERVAL)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [loadData])

  const formatDate = (date: Date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토']
    const ampm = date.getHours() < 12 ? '오전' : '오후'
    const hour = date.getHours() % 12 || 12
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${days[date.getDay()]}) ${ampm} ${hour}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
  }

  const chartTotal = chartData.reduce(
    (acc, item) => ({
      totalCnt: acc.totalCnt + item.totalCnt,
      autoCnt: acc.autoCnt + item.autoCnt,
      manualCnt: acc.manualCnt + item.manualCnt,
    }),
    { totalCnt: 0, autoCnt: 0, manualCnt: 0 }
  )

  const maxTotal = Math.max(...chartData.map((d) => d.totalCnt), 1)

  return (
    <div className="flex h-screen w-screen flex-col bg-[#0a1628] text-white">
      <header className="bg-[#1a2a44] px-6 py-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">전자정부 사이버보안 종합현황</h1>
          <div className="mt-1 text-sm text-gray-400">{formatDate(currentTime)}</div>
        </div>
      </header>

      <div className="flex flex-1 gap-4 p-4">
        <div className="flex w-1/2 flex-col gap-4">
          <div className="flex-1 rounded-lg bg-[#1a2a44] p-4">
            <h3 className="mb-4 text-lg font-semibold">주요 현황</h3>
            <div className="space-y-4">
              {configData.length > 0 ? (
                configData.map((item) => (
                  <div key={item.seq} className="rounded bg-[#0a1628] p-4">
                    <div className="mb-2 font-semibold">{item.title}</div>
                    <div className="text-sm text-gray-400">{item.content}</div>
                    <div className="mt-3 grid grid-cols-4 gap-2 text-center text-sm">
                      <div>
                        <div className="font-bold text-blue-400">{item.cnt1}</div>
                        <div className="text-xs text-gray-500">항목1</div>
                      </div>
                      <div>
                        <div className="font-bold text-green-400">{item.cnt2}</div>
                        <div className="text-xs text-gray-500">항목2</div>
                      </div>
                      <div>
                        <div className="font-bold text-yellow-400">{item.cnt3}</div>
                        <div className="text-xs text-gray-500">항목3</div>
                      </div>
                      <div>
                        <div className="font-bold text-red-400">{item.cnt4}</div>
                        <div className="text-xs text-gray-500">항목4</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded bg-[#0a1628] p-4 text-center text-gray-500">
                  데이터가 없습니다
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex w-1/2 flex-col gap-4">
          <div className="rounded-lg bg-[#1a2a44] p-4">
            <h3 className="mb-4 text-lg font-semibold">주간 통계</h3>
            <div className="mb-4 grid grid-cols-3 gap-4 text-center">
              <div className="rounded bg-[#0a1628] p-3">
                <div className="text-2xl font-bold text-blue-400">
                  {chartTotal.totalCnt.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">전체</div>
              </div>
              <div className="rounded bg-[#0a1628] p-3">
                <div className="text-2xl font-bold text-cyan-400">
                  {chartTotal.autoCnt.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">자동</div>
              </div>
              <div className="rounded bg-[#0a1628] p-3">
                <div className="text-2xl font-bold text-orange-400">
                  {chartTotal.manualCnt.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">수동</div>
              </div>
            </div>
          </div>

          <div className="flex-1 rounded-lg bg-[#1a2a44] p-4">
            <h3 className="mb-4 text-lg font-semibold">일별 추이 (최근 7일)</h3>
            <div className="flex h-64 items-end gap-2">
              {chartData.map((item, idx) => (
                <div key={idx} className="flex flex-1 flex-col items-center">
                  <div className="relative mb-2 w-full">
                    <div
                      className="w-full rounded-t bg-blue-500"
                      style={{
                        height: `${(item.totalCnt / maxTotal) * 200}px`,
                        minHeight: '4px',
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-400">
                    {item.datTime?.slice(5) || '-'}
                  </div>
                  <div className="text-xs font-bold">{item.totalCnt}</div>
                </div>
              ))}
              {chartData.length === 0 && (
                <div className="flex w-full items-center justify-center text-gray-500">
                  데이터가 없습니다
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
