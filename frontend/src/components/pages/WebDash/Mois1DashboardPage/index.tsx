import { useState, useEffect, useCallback, useRef } from 'react'
import { webdashApi } from '@/services/api/webdashApi'
import type { CyberAlert } from '@/types'

const REFRESH_INTERVAL = 60000

export function Mois1DashboardPage() {
  const [cyberAlert, setCyberAlert] = useState<CyberAlert | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const timerRef = useRef<number | null>(null)

  const loadData = useCallback(async () => {
    try {
      const threat = await webdashApi.getThreatNow()
      if (threat.length > 0) {
        setCyberAlert(threat[0])
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

  const getThreatLevelColor = (level: number) => {
    const colors: Record<number, string> = {
      1: 'bg-blue-500',
      2: 'bg-green-500',
      3: 'bg-yellow-500',
      4: 'bg-orange-500',
      5: 'bg-red-500',
    }
    return colors[level] || 'bg-gray-500'
  }

  const getThreatLevelName = (level: number) => {
    const names: Record<number, string> = {
      1: '정상',
      2: '관심',
      3: '주의',
      4: '경계',
      5: '심각',
    }
    return names[level] || '-'
  }

  const getThreatLevelTextColor = (level: number) => {
    const colors: Record<number, string> = {
      1: 'text-blue-400',
      2: 'text-green-400',
      3: 'text-yellow-400',
      4: 'text-orange-400',
      5: 'text-red-400',
    }
    return colors[level] || 'text-gray-400'
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-[#0a1628] text-white">
      <header className="bg-[#1a2a44] px-6 py-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">사이버 위기경보</h1>
          <div className="mt-1 text-sm text-gray-400">{formatDate(currentTime)}</div>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center p-8">
        <div className="flex flex-col items-center">
          {cyberAlert && (
            <>
              <div
                className={`flex h-64 w-64 items-center justify-center rounded-full ${getThreatLevelColor(cyberAlert.nowThreat)}`}
              >
                <div className="text-center">
                  <div className="text-5xl font-bold">{getThreatLevelName(cyberAlert.nowThreat)}</div>
                </div>
              </div>

              <div className="mt-8 rounded-lg bg-[#1a2a44] p-6">
                <table className="text-sm">
                  <tbody>
                    <tr>
                      <td className="pr-4 text-gray-400">현재 경보:</td>
                      <td className={`font-bold ${getThreatLevelTextColor(cyberAlert.nowThreat)}`}>
                        {getThreatLevelName(cyberAlert.nowThreat)}
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-4 text-gray-400">이전 경보:</td>
                      <td className={`font-bold ${getThreatLevelTextColor(cyberAlert.pastThreat)}`}>
                        {getThreatLevelName(cyberAlert.pastThreat)}
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-4 text-gray-400">변경일시:</td>
                      <td>{cyberAlert.modDt || '-'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex gap-4">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`flex h-12 w-20 items-center justify-center rounded ${getThreatLevelColor(level)} ${cyberAlert.nowThreat === level ? 'ring-2 ring-white' : 'opacity-50'}`}
                  >
                    <span className="text-sm font-semibold">{getThreatLevelName(level)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
