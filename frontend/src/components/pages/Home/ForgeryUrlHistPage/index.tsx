import { useState, useEffect, useCallback } from 'react'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { useUserStore } from '@/stores/userStore'
import { homeApi } from '@/services/api/homeApi'
import type { ForgeryUrlHist, ForgeryUrlHistSearchParams } from '@/types'

function getDefaultDates() {
  const today = new Date()
  const date2 = today.toISOString().split('T')[0]
  return { date1: date2, date2 }
}

export function ForgeryUrlHistPage() {
  const { user } = useUserStore()
  const [data, setData] = useState<ForgeryUrlHist[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { date1: defaultDate1, date2: defaultDate2 } = getDefaultDates()
  const [searchParams, setSearchParams] = useState<ForgeryUrlHistSearchParams>({
    srchWsisIp: '',
    srchDomain: '',
    srchCheckYn: '',
    date1: defaultDate1,
    date2: defaultDate2,
  })

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await homeApi.getForgeryUrlHistList({
        ...searchParams,
        srchInstCd: user?.instCd,
      })
      setData(result)
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [searchParams, user?.instCd])

  useEffect(() => {
    loadData()
  }, [loadData])


  const handleSearch = useCallback(() => {
    loadData()
  }, [loadData])

  const getExcpYnText = (excpYn: string) => (excpYn === 'Y' ? '예' : '아니오')
  const getCheckYnText = (checkYn?: string) => (checkYn === 'Y' ? '예' : '아니오')
  return (
    <>
      <div className="mb-2 flex flex-wrap items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2">
        <label className="text-sm">검색기간:</label>
        <input
          type="date"
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchParams.date1 ?? ''}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, date1: e.target.value }))
          }
        />
        <span className="text-sm">~</span>
        <input
          type="date"
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchParams.date2 ?? ''}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, date2: e.target.value }))
          }
        />
        <label className="text-sm">WSIS_Ip:</label>
        <input
          type="text"
          className="w-48 rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchParams.srchWsisIp ?? ''}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, srchWsisIp: e.target.value }))
          }
        />
        <label className="text-sm">도메인:</label>
        <input
          type="text"
          className="w-48 rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchParams.srchDomain ?? ''}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, srchDomain: e.target.value }))
          }
        />
        <label className="text-sm">집중감시여부:</label>
        <select
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchParams.srchCheckYn ?? ''}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, srchCheckYn: e.target.value }))
          }
        >
          <option value="">전체</option>
          <option value="1">예</option>
          <option value="0">아니오</option>
        </select>
      </div>

      <PageToolbar>
        <ToolbarButton icon="search" onClick={handleSearch} title="검색" />
      </PageToolbar>

      <div className="h-[calc(100%-130px)] overflow-auto rounded border border-gray-300">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="border-b border-gray-300 p-2 text-center">No</th>
              <th className="border-b border-gray-300 p-2 text-center">시도</th>
              <th className="border-b border-gray-300 p-2 text-center">시군구</th>
              <th className="border-b border-gray-300 p-2 text-center">도메인</th>
              <th className="border-b border-gray-300 p-2 text-center">URL</th>
              <th className="border-b border-gray-300 p-2 text-center">집중감시여부</th>
              <th className="border-b border-gray-300 p-2 text-center">예외여부</th>
              <th className="border-b border-gray-300 p-2 text-center">탐지시간</th>
              <th className="border-b border-gray-300 p-2 text-center">탐지결과</th>
              <th className="border-b border-gray-300 p-2 text-center">상세</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={10} className="p-4 text-center text-gray-500">
                  로딩 중...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={10} className="p-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr key={`${item.forgerySeq}-${item.detectTime}`} className="hover:bg-gray-50">
                  <td className="border-b border-gray-200 p-2 text-center">
                    {data.length - idx}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.pLocalNm}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.instNm}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.domain}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-left">
                    {item.url}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {getCheckYnText(item.checkYn)}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {getExcpYnText(item.excpYn)}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.detectTime}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.evtName}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-left">
                    {item.depthRes}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
