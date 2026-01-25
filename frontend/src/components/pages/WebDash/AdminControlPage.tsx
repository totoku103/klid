import { useState, useEffect, useCallback, useRef } from 'react'
import { webdashApi } from '@/services/api/webdashApi'
import type {
  IncidentStatus,
  InciTypeCnt,
  LocalStatus,
  UrlStatus,
  LocalInciCnt,
} from '@/types'

const REFRESH_INTERVAL = 60000

export function AdminControlPage() {
  const [incidentStatus, setIncidentStatus] = useState<IncidentStatus[]>([])
  const [inciTypeCnt, setInciTypeCnt] = useState<InciTypeCnt[]>([])
  const [localStatus, setLocalStatus] = useState<LocalStatus[]>([])
  const [urlStatus, setUrlStatus] = useState<UrlStatus[]>([])
  const [localInciCnt, setLocalInciCnt] = useState<LocalInciCnt[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [noticeText, setNoticeText] = useState('')
  const timerRef = useRef<number | null>(null)

  const loadData = useCallback(async () => {
    try {
      const [incident, inciType, local, url, localInci, notice] =
        await Promise.all([
          webdashApi.getIncidentStatus(),
          webdashApi.getInciCnt({}),
          webdashApi.getLocalStatus(),
          webdashApi.getUrlStatus(),
          webdashApi.getLocalInciCnt({}),
          webdashApi.getDashTextCode({ comCode1: 4020, comCode2: 1 }),
        ])
      setIncidentStatus(incident)
      setInciTypeCnt(inciType.slice(0, 5))
      setLocalStatus(local)
      setUrlStatus(url)
      setLocalInciCnt(localInci)
      if (notice.length > 0) {
        setNoticeText(notice[0].codeCont)
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
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

  const totalIncident = incidentStatus[0] || {
    receiptCnt: 0,
    processCnt: 0,
    completeCnt: 0,
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-gray-900 text-white">
      <header className="flex items-center justify-between bg-gray-800 px-6 py-3">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">관제 대시보드</h1>
          <div className="h-6 w-px bg-gray-600" />
          <span className="text-sm text-gray-400">{noticeText}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">{formatDate(currentTime)}</span>
          <button
            type="button"
            className="rounded bg-blue-600 px-3 py-1 text-sm hover:bg-blue-700"
            onClick={loadData}
          >
            새로고침
          </button>
        </div>
      </header>

      <div className="flex flex-1 gap-4 p-4">
        <div className="flex w-1/4 flex-col gap-4">
          <div className="rounded-lg bg-gray-800 p-4">
            <h2 className="mb-4 text-lg font-semibold">침해사고 현황</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">
                  {totalIncident.receiptCnt}
                </div>
                <div className="text-sm text-gray-400">접수</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">
                  {totalIncident.processCnt}
                </div>
                <div className="text-sm text-gray-400">처리중</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {totalIncident.completeCnt}
                </div>
                <div className="text-sm text-gray-400">완료</div>
              </div>
            </div>
          </div>

          <div className="flex-1 rounded-lg bg-gray-800 p-4">
            <h2 className="mb-4 text-lg font-semibold">위협이벤트 TOP5</h2>
            <div className="space-y-2">
              {inciTypeCnt.map((item, idx) => (
                <div
                  key={item.inciType}
                  className="flex items-center justify-between rounded bg-gray-700 px-3 py-2"
                >
                  <span className="text-sm">
                    {idx + 1}. {item.inciTypeNm}
                  </span>
                  <span className="font-bold text-cyan-400">{item.evtCnt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-1/2 flex-col gap-4">
          <div className="flex-1 rounded-lg bg-gray-800 p-4">
            <h2 className="mb-4 text-lg font-semibold">지역별 현황</h2>
            <div className="grid grid-cols-4 gap-2">
              {localStatus.map((item) => (
                <div
                  key={item.localCd}
                  className={`rounded p-3 text-center ${
                    item.forgeryYn === 'Y' || item.hcYn === 'N'
                      ? 'bg-red-900'
                      : 'bg-gray-700'
                  }`}
                >
                  <div className="text-sm font-medium">{item.localNm}</div>
                  <div className="text-lg font-bold">{item.evtCnt}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h2 className="mb-4 text-lg font-semibold">기관별 탐지현황</h2>
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-2 text-left">지역</th>
                    <th className="p-2 text-center">유형1</th>
                    <th className="p-2 text-center">유형2</th>
                    <th className="p-2 text-center">유형3</th>
                    <th className="p-2 text-center">유형4</th>
                    <th className="p-2 text-center">유형5</th>
                  </tr>
                </thead>
                <tbody>
                  {localInciCnt.slice(0, 5).map((item) => (
                    <tr key={item.localCd} className="border-b border-gray-700">
                      <td className="p-2">{item.localNm}</td>
                      <td className="p-2 text-center">{item.cnt1}</td>
                      <td className="p-2 text-center">{item.cnt2}</td>
                      <td className="p-2 text-center">{item.cnt3}</td>
                      <td className="p-2 text-center">{item.cnt4}</td>
                      <td className="p-2 text-center">{item.cnt5}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex w-1/4 flex-col gap-4">
          <div className="rounded-lg bg-gray-800 p-4">
            <h2 className="mb-4 text-lg font-semibold">홈페이지 위변조 현황</h2>
            <div className="space-y-2">
              {urlStatus.slice(0, 5).map((item) => (
                <div
                  key={item.instCd}
                  className="flex items-center justify-between rounded bg-gray-700 px-3 py-2"
                >
                  <span className="truncate text-sm">{item.instNm}</span>
                  <span
                    className={`text-sm ${
                      item.checkStatus === 'Y'
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {item.checkStatus === 'Y' ? '정상' : '이상'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 rounded-lg bg-gray-800 p-4">
            <h2 className="mb-4 text-lg font-semibold">시스템 현황</h2>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 21 }, (_, i) => (
                <div
                  key={i}
                  className="rounded bg-green-900 p-2 text-center text-xs"
                >
                  {i < 20 ? `LM${i + 1}` : 'GM'}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
