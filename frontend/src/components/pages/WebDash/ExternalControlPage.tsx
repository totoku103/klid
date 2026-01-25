import { useState, useEffect, useCallback, useRef } from 'react'
import { webdashApi } from '@/services/api/webdashApi'
import type {
  IncidentStatus,
  InciTypeCnt,
  CyberAlert,
  NoticeBoard,
  SecurityBoard,
  AttNationTop5,
  TypeChartData,
} from '@/types'

const REFRESH_INTERVAL = 60000

export function ExternalControlPage() {
  const [incidentStatus, setIncidentStatus] = useState<IncidentStatus[]>([])
  const [inciTypeCnt, setInciTypeCnt] = useState<InciTypeCnt[]>([])
  const [cyberAlert, setCyberAlert] = useState<CyberAlert | null>(null)
  const [noticeList, setNoticeList] = useState<NoticeBoard[]>([])
  const [secuList, setSecuList] = useState<SecurityBoard[]>([])
  const [attNationTop5, setAttNationTop5] = useState<AttNationTop5[]>([])
  const [typeChart, setTypeChart] = useState<TypeChartData[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [noticeText, setNoticeText] = useState('')
  const timerRef = useRef<number | null>(null)

  const loadData = useCallback(async () => {
    try {
      const [incident, inciType, threat, notice, secu, nation, chart, dashNotice] =
        await Promise.all([
          webdashApi.getIncidentStatus(),
          webdashApi.getInciCnt({}),
          webdashApi.getThreatNow(),
          webdashApi.getNoticeList({ listSize: '3' }),
          webdashApi.getSecuList({ listSize: '3' }),
          webdashApi.getAttNationTop5(),
          webdashApi.getTypeChart({}),
          webdashApi.getDashTextCode({ comCode1: 4020, comCode2: 4 }),
        ])
      setIncidentStatus(incident)
      setInciTypeCnt(inciType)
      if (threat.length > 0) {
        setCyberAlert(threat[0])
      }
      setNoticeList(notice)
      setSecuList(secu)
      setAttNationTop5(nation)
      setTypeChart(chart)
      if (dashNotice.length > 0) {
        setNoticeText(dashNotice[0].codeCont)
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

  const getThreatLevelColor = (level: number) => {
    const colors = ['', 'text-blue-400', 'text-green-400', 'text-yellow-400', 'text-orange-400', 'text-red-400']
    return colors[level] || 'text-gray-400'
  }

  const getThreatLevelName = (level: number) => {
    const names = ['', '정상', '관심', '주의', '경계', '심각']
    return names[level] || '-'
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
          <h1 className="text-xl font-bold">외부 대시보드</h1>
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
            <h2 className="mb-4 text-lg font-semibold">사이버 위기경보</h2>
            {cyberAlert && (
              <div className="text-center">
                <div className={`text-4xl font-bold ${getThreatLevelColor(cyberAlert.nowThreat)}`}>
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
        </div>

        <div className="flex w-1/2 flex-col gap-4">
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
            <h2 className="mb-4 text-lg font-semibold">유형별 현황</h2>
            <div className="grid grid-cols-2 gap-4">
              {typeChart.slice(0, 6).map((item) => (
                <div
                  key={item.inciType}
                  className="flex items-center justify-between rounded bg-gray-700 px-4 py-3"
                >
                  <span className="text-sm">{item.inciTypeNm}</span>
                  <span className="text-lg font-bold text-cyan-400">
                    {item.cnt}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-gray-800 p-4">
            <h2 className="mb-4 text-lg font-semibold">위협이벤트</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {inciTypeCnt.reduce((sum, item) => sum + item.evtCnt, 0)}
                </div>
                <div className="text-sm text-gray-400">위협이벤트</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">0</div>
                <div className="text-sm text-gray-400">고위협 공격시도</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-1/4 flex-col gap-4">
          <div className="flex-1 rounded-lg bg-gray-800 p-4">
            <h2 className="mb-4 text-lg font-semibold">공격국가 TOP5</h2>
            <div className="space-y-2">
              {attNationTop5.map((item) => (
                <div
                  key={item.nationCd}
                  className="flex items-center justify-between rounded bg-gray-700 px-3 py-2"
                >
                  <span className="text-sm">
                    {item.rank}. {item.nationNm}
                  </span>
                  <span className="font-bold text-red-400">{item.evtCnt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
