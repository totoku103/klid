import { useState, useEffect, useCallback } from 'react'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { useUserStore } from '@/stores/userStore'
import { homeApi } from '@/services/api/homeApi'
import type { HealthCheckStat } from '@/types'
import { cn } from '@/lib/utils'

const HOUR_COLUMNS = [
  'DT0000', 'DT0100', 'DT0200', 'DT0300', 'DT0400', 'DT0500',
  'DT0600', 'DT0700', 'DT0800', 'DT0900', 'DT1000', 'DT1100',
  'DT1200', 'DT1300', 'DT1400', 'DT1500', 'DT1600', 'DT1700',
  'DT1800', 'DT1900', 'DT2000', 'DT2100', 'DT2200', 'DT2300',
] as const

type HourColumn = typeof HOUR_COLUMNS[number]

function getCurrentTime(): string {
  const now = new Date()
  const hour = String(now.getHours()).padStart(2, '0')
  const min = String(now.getMinutes()).padStart(2, '0')
  return hour + min
}

function StatusCell({ value, isFuture }: { value: string; isFuture: boolean }) {
  if (isFuture) {
    return (
      <div className="flex justify-center">
        <div className="h-3 w-3 rounded-full bg-gray-300" />
      </div>
    )
  }
  
  const isError = value !== '0' && value !== ''
  return (
    <div className="flex justify-center">
      <div
        className={cn(
          'h-3 w-3 rounded-full',
          isError ? 'bg-red-500' : 'bg-blue-500'
        )}
      />
    </div>
  )
}

export function HealthCheckStatPage() {
  const { user } = useUserStore()
  const [data, setData] = useState<HealthCheckStat[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [curTime, setCurTime] = useState(getCurrentTime())

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await homeApi.getHealthCheckStatList({
        instCd: user?.instCd,
        sAuthMain: user?.authMain,
      })
      setData(result)
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [user?.instCd, user?.authMain])

  useEffect(() => {
    loadData()
    const interval = setInterval(() => {
      setCurTime(getCurrentTime())
      loadData()
    }, 1000 * 60 * 15)

    return () => clearInterval(interval)
  }, [loadData])

  const handleSearch = useCallback(() => {
    setCurTime(getCurrentTime())
    loadData()
  }, [loadData])

  const isFutureHour = (column: HourColumn): boolean => {
    const hourStr = column.substring(2, 6)
    return hourStr > curTime
  }

  return (
    <>
      <PageToolbar>
        <ToolbarButton icon="search" onClick={handleSearch} title="검색" />
      </PageToolbar>

      <div className="h-[calc(100%-60px)] overflow-auto rounded border border-gray-300">
        <table className="w-full border-collapse text-xs">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="border-b border-gray-300 p-1 text-center">순번</th>
              <th className="border-b border-gray-300 p-1 text-center">홈페이지명</th>
              <th className="border-b border-gray-300 p-1 text-center">URL</th>
              <th className="border-b border-gray-300 p-1 text-center">현재</th>
              {HOUR_COLUMNS.map((col) => (
                <th key={col} className="border-b border-gray-300 p-1 text-center">
                  {col.substring(2, 4)}:00
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={28} className="p-4 text-center text-gray-500">
                  로딩 중...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={28} className="p-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr key={item.SEQ_NO} className="hover:bg-gray-50">
                  <td className="border-b border-gray-200 p-1 text-center">
                    {idx + 1}
                  </td>
                  <td className="border-b border-gray-200 p-1 text-center">
                    {item.INST_NM}
                  </td>
                  <td className="border-b border-gray-200 p-1 text-center">
                    {item.URL}
                  </td>
                  <td className="border-b border-gray-200 p-1 text-center">
                    <StatusCell value={item.DTNOW} isFuture={false} />
                  </td>
                  {HOUR_COLUMNS.map((col) => (
                    <td key={col} className="border-b border-gray-200 p-1 text-center">
                      <StatusCell
                        value={item[col]}
                        isFuture={isFutureHour(col)}
                      />
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
