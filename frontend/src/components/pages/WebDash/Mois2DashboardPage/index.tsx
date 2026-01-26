import { useState, useEffect, useCallback, useRef } from 'react'
import { webdashApi } from '@/services/api/webdashApi'
import type { HmHcUrlCenter, HmHcUrlRegion, ForgeryRegion } from '@/types'

const REFRESH_INTERVAL = 60000

export function Mois2DashboardPage() {
  const [centerData, setCenterData] = useState<HmHcUrlCenter[]>([])
  const [regionData, setRegionData] = useState<HmHcUrlRegion[]>([])
  const [forgeryData, setForgeryData] = useState<ForgeryRegion[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const timerRef = useRef<number | null>(null)

  const loadData = useCallback(async () => {
    try {
      const [center, region, forgery] = await Promise.all([
        webdashApi.getHmHcUrlCenter(),
        webdashApi.getHmHcUrlRegion(),
        webdashApi.getForgeryRegion(),
      ])
      setCenterData(center)
      setRegionData(region)
      setForgeryData(forgery)
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

  const mergedRegionData = regionData.map((region) => {
    const forgery = forgeryData.find((f) => f.localCd === region.localCd)
    return {
      ...region,
      forgeryCnt: forgery?.forgeryCnt || 0,
    }
  })

  const centerTotal = centerData.reduce(
    (acc, item) => ({
      urlCnt: acc.urlCnt + item.urlCnt,
      errorCnt: acc.errorCnt + item.errorCnt,
      normalCnt: acc.normalCnt + item.normalCnt,
    }),
    { urlCnt: 0, errorCnt: 0, normalCnt: 0 }
  )

  const regionTotal = mergedRegionData.reduce(
    (acc, item) => ({
      urlCnt: acc.urlCnt + item.urlCnt,
      errorCnt: acc.errorCnt + item.errorCnt,
      normalCnt: acc.normalCnt + item.normalCnt,
      forgeryCnt: acc.forgeryCnt + item.forgeryCnt,
    }),
    { urlCnt: 0, errorCnt: 0, normalCnt: 0, forgeryCnt: 0 }
  )

  return (
    <div className="flex h-screen w-screen flex-col bg-[#0a1628] text-white">
      <header className="bg-[#1a2a44] px-6 py-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">홈페이지 위변조 및 모니터링 현황</h1>
          <div className="mt-1 text-sm text-gray-400">{formatDate(currentTime)}</div>
        </div>
      </header>

      <div className="flex flex-1 gap-4 p-4">
        <div className="flex w-1/2 flex-col rounded-lg bg-[#1a2a44] p-4">
          <h2 className="mb-4 text-center text-xl font-semibold">중앙행정기관</h2>
          <div className="mb-4 grid grid-cols-3 gap-4 text-center">
            <div className="rounded bg-[#0a1628] p-3">
              <div className="text-2xl font-bold text-blue-400">{centerTotal.urlCnt}</div>
              <div className="text-sm text-gray-400">전체</div>
            </div>
            <div className="rounded bg-[#0a1628] p-3">
              <div className="text-2xl font-bold text-green-400">{centerTotal.normalCnt}</div>
              <div className="text-sm text-gray-400">정상</div>
            </div>
            <div className="rounded bg-[#0a1628] p-3">
              <div className="text-2xl font-bold text-red-400">{centerTotal.errorCnt}</div>
              <div className="text-sm text-gray-400">오류</div>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-[#0a1628]">
                <tr>
                  <th className="p-2 text-left">기관명</th>
                  <th className="p-2 text-center">전체</th>
                  <th className="p-2 text-center">정상</th>
                  <th className="p-2 text-center">오류</th>
                </tr>
              </thead>
              <tbody>
                {centerData.map((item, idx) => (
                  <tr key={idx} className="border-t border-gray-700">
                    <td className="p-2">{item.instNm}</td>
                    <td className="p-2 text-center">{item.urlCnt}</td>
                    <td className="p-2 text-center text-green-400">{item.normalCnt}</td>
                    <td className="p-2 text-center text-red-400">{item.errorCnt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-center text-sm text-gray-400">
            &lt;국가정보자원관리원 입주기관&gt;
          </div>
        </div>

        <div className="flex w-1/2 flex-col rounded-lg bg-[#1a2a44] p-4">
          <h2 className="mb-4 text-center text-xl font-semibold">지방자치단체</h2>
          <div className="mb-4 grid grid-cols-4 gap-4 text-center">
            <div className="rounded bg-[#0a1628] p-3">
              <div className="text-2xl font-bold text-blue-400">{regionTotal.urlCnt}</div>
              <div className="text-sm text-gray-400">전체</div>
            </div>
            <div className="rounded bg-[#0a1628] p-3">
              <div className="text-2xl font-bold text-green-400">{regionTotal.normalCnt}</div>
              <div className="text-sm text-gray-400">정상</div>
            </div>
            <div className="rounded bg-[#0a1628] p-3">
              <div className="text-2xl font-bold text-red-400">{regionTotal.errorCnt}</div>
              <div className="text-sm text-gray-400">오류</div>
            </div>
            <div className="rounded bg-[#0a1628] p-3">
              <div className="text-2xl font-bold text-orange-400">{regionTotal.forgeryCnt}</div>
              <div className="text-sm text-gray-400">위변조</div>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-[#0a1628]">
                <tr>
                  <th className="p-2 text-left">지역</th>
                  <th className="p-2 text-center">전체</th>
                  <th className="p-2 text-center">정상</th>
                  <th className="p-2 text-center">오류</th>
                  <th className="p-2 text-center">위변조</th>
                </tr>
              </thead>
              <tbody>
                {mergedRegionData.map((item, idx) => (
                  <tr key={idx} className="border-t border-gray-700">
                    <td className="p-2">{item.localNm}</td>
                    <td className="p-2 text-center">{item.urlCnt}</td>
                    <td className="p-2 text-center text-green-400">{item.normalCnt}</td>
                    <td className="p-2 text-center text-red-400">{item.errorCnt}</td>
                    <td className="p-2 text-center text-orange-400">{item.forgeryCnt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
