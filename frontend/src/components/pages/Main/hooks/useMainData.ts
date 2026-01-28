import { useState, useEffect, useCallback } from 'react'
import { useUserStore } from '@/stores/userStore'
import { mainApi } from '../api'
import type {
  ThreatLevel,
  AccidentStatus,
  YearStatus,
  PeriodSetting,
  PeriodStatus,
  Top5Item,
  DashboardNoticeItem,
  DashboardQnaItem,
  MonitoringCount,
  MonitoringItem,
} from '@/types'

function getDates(): number {
  const now = new Date()
  const hh = String(now.getHours()).padStart(2, '0')
  const mm = String(now.getMinutes()).padStart(2, '0')
  const ss = String(now.getSeconds()).padStart(2, '0')
  const hhmmss = `${hh}${mm}${ss}`
  return hhmmss >= '000000' && hhmmss <= '060000' ? 0 : 1
}

function formatDateTime(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')
  return `${year}${month}${day}${hh}${mm}${ss}`
}

export interface MainDashboardData {
  threatLevel: ThreatLevel
  accidentStatus: AccidentStatus | null
  yearStatus: YearStatus | null
  periodSetting: PeriodSetting | null
  periodStatus: PeriodStatus | null
  accdTypeTop5: Top5Item[]
  instTop5: Top5Item[]
  noticeList: DashboardNoticeItem[]
  qnaList: DashboardQnaItem[]
  monitoringCount: MonitoringCount | null
  monitoringList: MonitoringItem[]
}

export function useMainData() {
  const { user } = useUserStore()
  const [data, setData] = useState<MainDashboardData>({
    threatLevel: 1,
    accidentStatus: null,
    yearStatus: null,
    periodSetting: null,
    periodStatus: null,
    accdTypeTop5: [],
    instTop5: [],
    noticeList: [],
    qnaList: [],
    monitoringCount: null,
    monitoringList: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    if (!user) return

    setIsLoading(true)
    setError(null)

    try {
      const atype = getDates()
      const now = new Date()
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)

      const startDt = formatDateTime(weekAgo).slice(0, 8) + '000000'
      const endDt = formatDateTime(now).slice(0, 8) + '235959'

      const time1Dt = new Date()
      time1Dt.setMinutes(time1Dt.getMinutes() - 5)
      const time2Dt = new Date()
      time2Dt.setMinutes(time2Dt.getMinutes() + 5)

      const [
        threatResult,
        todayResult,
        yearResult,
        periodSettingResult,
        periodStatusResult,
        accdTypeResult,
        instResult,
        noticeResult,
        qnaResult,
        monitoringCountResult,
        monitoringListResult,
      ] = await Promise.allSettled([
        mainApi.getThreatNow(user.instCd.toString()),
        mainApi.getTodayStatus({
          sAuthMain: user.authRole.main,
          sInstCd: user.instCd.toString(),
          atype,
        }),
        mainApi.getYearStatus({
          sAuthMain: user.authRole.main,
          sInstCd: user.instCd.toString(),
          atype,
        }),
        mainApi.getPeriodNow(user.instCd.toString()),
        mainApi.getPeriodStatus({
          sAuthMain: user.authRole.main,
          sInstCd: user.instCd.toString(),
        }),
        mainApi.getAccdTypeTop5({
          atype,
          sAuthMain: user.authRole.main,
          instCd: user.instCd.toString(),
          dateType: 'inci_acpn_dt',
          startDt,
          endDt,
        }),
        mainApi.getInstTop5({
          atype,
          sAuthMain: user.authRole.main,
          instCd: user.instCd.toString(),
          dateType: 'inci_acpn_dt',
          startDt,
          endDt,
          topInstView: user.authRole.main === 'AUTH_MAIN_3' ? 'main' : undefined,
          sortType:
            user.authRole.main !== 'AUTH_MAIN_3' && user.authRole.main !== 'AUTH_MAIN_4'
              ? 'main'
              : undefined,
        }),
        mainApi.getNoticeList({
          listSize: '6',
          sAuthMain: user.authRole.main,
          sInstCd: user.instCd.toString(),
          sPntInstCd: '', // pntInstCd removed from User type
        }),
        mainApi.getQnaList({
          listSize: '6',
          sInstCd: user.instCd.toString(),
        }),
        mainApi.getMonitoringCount({
          sInstCd: user.instCd.toString(),
          sAuthMain: user.authRole.main,
        }),
        mainApi.getMonitoringList({
          sInstCd: user.instCd.toString(),
          time1: formatDateTime(time1Dt),
          time2: formatDateTime(time2Dt),
        }),
      ])

      setData({
        threatLevel:
          threatResult.status === 'fulfilled' && threatResult.value.length > 0
            ? threatResult.value[0].nowThreat
            : 1,
        accidentStatus:
          todayResult.status === 'fulfilled' && todayResult.value.length > 0
            ? todayResult.value[0]
            : null,
        yearStatus:
          yearResult.status === 'fulfilled' && yearResult.value.length > 0
            ? yearResult.value[0]
            : null,
        periodSetting:
          periodSettingResult.status === 'fulfilled' &&
          periodSettingResult.value.length > 0
            ? periodSettingResult.value[0]
            : null,
        periodStatus:
          periodStatusResult.status === 'fulfilled' &&
          periodStatusResult.value.length > 0
            ? periodStatusResult.value[0]
            : null,
        accdTypeTop5:
          accdTypeResult.status === 'fulfilled'
            ? accdTypeResult.value.slice(0, 5)
            : [],
        instTop5:
          instResult.status === 'fulfilled'
            ? instResult.value.slice(0, 5)
            : [],
        noticeList:
          noticeResult.status === 'fulfilled' ? noticeResult.value : [],
        qnaList: qnaResult.status === 'fulfilled' ? qnaResult.value : [],
        monitoringCount:
          monitoringCountResult.status === 'fulfilled'
            ? monitoringCountResult.value
            : null,
        monitoringList:
          monitoringListResult.status === 'fulfilled'
            ? monitoringListResult.value
            : [],
      })
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch data'))
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, isLoading, error, refetch: fetchData }
}
