import { useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'react-router'
import { webdashApi } from '@/services/api/webdashApi'
import type {
  CyberAlert,
  RegionStatusManual,
  NoticeBoard,
  SecurityBoard,
  ProcessItem,
} from '@/types'

const REFRESH_INTERVAL = 60000

const LOCAL_CODES: Record<string, { name: string; instCd: string }> = {
  '10': { name: '서울', instCd: '6110000' },
  '20': { name: '부산', instCd: '6260000' },
  '30': { name: '대구', instCd: '6270000' },
  '40': { name: '인천', instCd: '6280000' },
  '50': { name: '광주', instCd: '6290000' },
  '60': { name: '대전', instCd: '6300000' },
  '70': { name: '울산', instCd: '6310000' },
  '80': { name: '경기', instCd: '6410000' },
  '90': { name: '강원', instCd: '6420000' },
  '100': { name: '충북', instCd: '6430000' },
  '110': { name: '충남', instCd: '6440000' },
  '120': { name: '전북', instCd: '6450000' },
  '130': { name: '전남', instCd: '6460000' },
  '140': { name: '경북', instCd: '6470000' },
  '150': { name: '경남', instCd: '6480000' },
  '160': { name: '제주', instCd: '6500000' },
  '170': { name: '세종', instCd: '5690000' },
}

export function LocalDashboardPage() {
  const [searchParams] = useSearchParams()
  const localCd = searchParams.get('localCd') || '10'
  const localInfo = LOCAL_CODES[localCd] || LOCAL_CODES['10']

  const [cyberAlert, setCyberAlert] = useState<CyberAlert | null>(null)
  const [regionStatus, setRegionStatus] = useState<RegionStatusManual | null>(
    null
  )
  const [noticeList, setNoticeList] = useState<NoticeBoard[]>([])
  const [secuList, setSecuList] = useState<SecurityBoard[]>([])
  const [processList, setProcessList] = useState<ProcessItem[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const timerRef = useRef<number | null>(null)

  const getAtype = () => {
    const now = new Date()
    const hhmmss =
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0') +
      String(now.getSeconds()).padStart(2, '0')
    return hhmmss >= '000000' && hhmmss <= '060000' ? 0 : 1
  }

  const loadData = useCallback(async () => {
    try {
      const atype = getAtype()
      const [threat, region, notice, secu, process] = await Promise.all([
        webdashApi.getThreatNow(localInfo.instCd),
        webdashApi.getRegionStatusManual({ localCd, atype }),
        webdashApi.getNoticeList({
          listSize: '5',
          sInstCd: localInfo.instCd,
          sAuthMain: 'AUTH_MAIN_3',
        }),
        webdashApi.getSecuList({
          listSize: '5',
          sInstCd: localInfo.instCd,
        }),
        webdashApi.getProcess({ localCd, rnum1: 1, rnum2: 5, atype }),
      ])
      if (threat.length > 0) {
        setCyberAlert(threat[0])
      }
      if (region.length > 0) {
        setRegionStatus(region[0])
      }
      setNoticeList(notice)
      setSecuList(secu)
      setProcessList(process)
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
    }
  }, [localCd, localInfo.instCd])

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

  const getThreatLevelColor = (level: number) => {
    const colors = [
      '',
      'text-blue-400',
      'text-green-400',
      'text-yellow-400',
      'text-orange-400',
      'text-red-400',
    ]
    return colors[level] || 'text-gray-400'
  }

  const getThreatLevelName = (level: number) => {
    const names = ['', '정상', '관심', '주의', '경계', '심각']
    return names[level] || '-'
  }

  const status = regionStatus || {
    receiptCnt: 0,
    processCnt: 0,
    completeCnt: 0,
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-gray-900 text-white">
      <header className="flex items-center justify-between bg-gray-800 px-6 py-3">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">{localInfo.name} 대시보드</h1>
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
            <h2 className="mb-4 text-lg font-semibold">사이버 위기경보</h2>
            {cyberAlert && (
              <div className="text-center">
                <div
                  className={`text-4xl font-bold ${getThreatLevelColor(cyberAlert.nowThreat)}`}
                >
                  {getThreatLevelName(cyberAlert.nowThreat)}
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  이전: {getThreatLevelName(cyberAlert.pastThreat)}
                </div>
                <div className="text-xs text-gray-500">{cyberAlert.modDt}</div>
              </div>
            )}
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h2 className="mb-4 text-lg font-semibold">침해사고 현황</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">
                  {status.receiptCnt}
                </div>
                <div className="text-sm text-gray-400">접수</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">
                  {status.processCnt}
                </div>
                <div className="text-sm text-gray-400">처리중</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {status.completeCnt}
                </div>
                <div className="text-sm text-gray-400">완료</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-1/2 flex-col gap-4">
          <div className="flex-1 rounded-lg bg-gray-800 p-4">
            <h2 className="mb-4 text-lg font-semibold">{localInfo.name} 지도</h2>
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="mb-2 text-6xl">🗺️</div>
                <div>{localInfo.name} 지역 지도</div>
                <div className="text-sm">지도 컴포넌트 영역</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-1/4 flex-col gap-4">
          <div className="rounded-lg bg-gray-800 p-4">
            <h2 className="mb-4 text-lg font-semibold">공지사항</h2>
            <div className="space-y-2">
              {noticeList.map((item) => (
                <div
                  key={item.seq}
                  className="flex items-center justify-between rounded bg-gray-700 px-3 py-2"
                >
                  <span className="truncate text-sm">{item.title}</span>
                  <span className="text-xs text-gray-400">{item.regDt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h2 className="mb-4 text-lg font-semibold">보안자료실</h2>
            <div className="space-y-2">
              {secuList.map((item) => (
                <div
                  key={item.seq}
                  className="flex items-center justify-between rounded bg-gray-700 px-3 py-2"
                >
                  <span className="truncate text-sm">{item.title}</span>
                  <span className="text-xs text-gray-400">{item.regDt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 rounded-lg bg-gray-800 p-4">
            <h2 className="mb-4 text-lg font-semibold">기관별 상세현황</h2>
            <div className="space-y-2">
              {processList.map((item) => (
                <div
                  key={item.seq}
                  className="flex items-center justify-between rounded bg-gray-700 px-3 py-2"
                >
                  <span className="truncate text-sm">{item.instNm}</span>
                  <span
                    className={`text-xs ${
                      item.status === '완료'
                        ? 'text-green-400'
                        : 'text-orange-400'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
