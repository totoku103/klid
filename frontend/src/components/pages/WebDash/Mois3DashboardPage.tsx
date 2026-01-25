import { useState, useEffect, useCallback, useRef } from 'react'
import { webdashApi } from '@/services/api/webdashApi'
import type { RegionStatus, RegionStatusAuto, RegionStatusManual } from '@/types'

const REFRESH_INTERVAL = 600000

const REGION_POSITIONS: Record<string, { x: number; y: number }> = {
  '10': { x: 150, y: 100 },
  '20': { x: 280, y: 320 },
  '30': { x: 240, y: 250 },
  '40': { x: 110, y: 130 },
  '50': { x: 100, y: 320 },
  '60': { x: 140, y: 200 },
  '70': { x: 300, y: 290 },
  '80': { x: 140, y: 140 },
  '90': { x: 220, y: 80 },
  '100': { x: 180, y: 180 },
  '110': { x: 120, y: 220 },
  '120': { x: 120, y: 290 },
  '130': { x: 80, y: 350 },
  '140': { x: 250, y: 200 },
  '150': { x: 220, y: 310 },
  '160': { x: 100, y: 450 },
  '170': { x: 160, y: 200 },
}

export function Mois3DashboardPage() {
  const [regionStatus, setRegionStatus] = useState<RegionStatus[]>([])
  const [autoStatus, setAutoStatus] = useState<RegionStatusAuto[]>([])
  const [manualStatus, setManualStatus] = useState<RegionStatusManual | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const timerRef = useRef<number | null>(null)

  const loadData = useCallback(async () => {
    try {
      const [region, auto, manual] = await Promise.all([
        webdashApi.getRegionStatus(),
        webdashApi.getRegionStatusAuto(),
        webdashApi.getRegionStatusManual({ localCd: '', atype: 1 }),
      ])
      setRegionStatus(region)
      setAutoStatus(auto)
      if (manual.length > 0) {
        setManualStatus(manual[0])
      }
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

  const autoTotal = autoStatus.reduce((sum, item) => sum + item.totalCnt, 0)
  const manual = manualStatus || { receiptCnt: 0, processCnt: 0, completeCnt: 0 }

  return (
    <div className="flex h-screen w-screen flex-col bg-[#0a1628] text-white">
      <header className="bg-[#1a2a44] px-6 py-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">지방자치단체 사이버위협 대응 현황</h1>
          <div className="mt-1 text-sm text-gray-400">{formatDate(currentTime)}</div>
        </div>
      </header>

      <div className="flex flex-1 gap-4 p-4">
        <div className="relative w-2/3 rounded-lg bg-[#1a2a44] p-4">
          <div className="absolute left-4 top-4 text-sm">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
              <span>정상 (0건)</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
              <span>주의 (1~5건)</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-orange-500"></span>
              <span>경계 (6~10건)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500"></span>
              <span>심각 (10건 이상)</span>
            </div>
          </div>

          <div className="relative mx-auto h-[500px] w-[400px]">
            <svg viewBox="0 0 400 500" className="h-full w-full">
              {regionStatus.map((region) => {
                const pos = REGION_POSITIONS[region.localCd] || { x: 200, y: 250 }
                const total = region.receiptCnt + region.processCnt
                let color = '#22c55e'
                if (total > 10) color = '#ef4444'
                else if (total > 5) color = '#f97316'
                else if (total > 0) color = '#eab308'

                return (
                  <g key={region.localCd}>
                    <circle cx={pos.x} cy={pos.y} r="20" fill={color} opacity="0.8" />
                    <text x={pos.x} y={pos.y - 25} textAnchor="middle" fill="white" fontSize="12">
                      {region.localNm}
                    </text>
                    <text x={pos.x} y={pos.y + 5} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                      {total}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
        </div>

        <div className="flex w-1/3 flex-col gap-4">
          <div className="rounded-lg bg-[#1a2a44] p-4">
            <h3 className="mb-4 text-center text-lg font-semibold">자동차단</h3>
            <div className="mb-4 text-center">
              <div className="text-4xl font-bold text-cyan-400">{autoTotal.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total</div>
            </div>
            <div className="max-h-48 overflow-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-[#0a1628]">
                  <tr>
                    <th className="p-2 text-left">지역</th>
                    <th className="p-2 text-right">건수</th>
                  </tr>
                </thead>
                <tbody>
                  {autoStatus.map((item, idx) => (
                    <tr key={idx} className="border-t border-gray-700">
                      <td className="p-2">{item.localNm}</td>
                      <td className="p-2 text-right text-cyan-400">{item.totalCnt.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg bg-[#1a2a44] p-4">
            <h3 className="mb-4 text-center text-lg font-semibold">수동차단</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded bg-[#0a1628] p-4">
                <div className="text-3xl font-bold text-yellow-400">{manual.receiptCnt}</div>
                <div className="text-sm text-gray-400">접수</div>
              </div>
              <div className="rounded bg-[#0a1628] p-4">
                <div className="text-3xl font-bold text-orange-400">{manual.processCnt}</div>
                <div className="text-sm text-gray-400">처리중</div>
              </div>
              <div className="rounded bg-[#0a1628] p-4">
                <div className="text-3xl font-bold text-green-400">{manual.completeCnt}</div>
                <div className="text-sm text-gray-400">완료</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
