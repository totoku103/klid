import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { useUserStore } from '@/stores/userStore'
import { homeApi } from '@/services/api/homeApi'
import type { ForgeryUrl, ForgeryUrlSearchParams } from '@/types'
import { cn } from '@/lib/utils'

export function ForgeryUrlPage() {
  const { user } = useUserStore()
  const [data, setData] = useState<ForgeryUrl[]>([])
  const [selectedRow, setSelectedRow] = useState<ForgeryUrl | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams, setSearchParams] = useState<ForgeryUrlSearchParams>({
    srchWsisIp: '',
    srchDomain: '',
    srchLastRes: '',
    srchDelYn: '',
    srchCheckYn: '',
  })

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await homeApi.getForgeryUrlList({
        ...searchParams,
        srchInstCd: user?.instCd,
      })
      setData(result)
      setSelectedRow(null)
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

  const handleSms = useCallback(() => {
    if (!selectedRow) {
      globalAlert.warning('데이터를 선택해주세요.')
      return
    }

    const errorCode = selectedRow.lastRes
    if (errorCode !== 4 && errorCode !== 5) {
      globalAlert.info('정상 URL 입니다.')
      return
    }

    const domain = selectedRow.domain
    const message = `[LCSC]${domain} 위변조 점검 요망. 확인 부탁 드립니다.`
    globalAlert.info(`SMS 전송 (기능 미구현)\n내용: ${message}`)
  }, [selectedRow])

  const getLastResText = (lastRes: number) =>
    lastRes === 4 || lastRes === 5 ? '장애' : '정상'
  const getDelYnText = (delYn: string) => (delYn === 'Y' ? '예' : '아니오')
  const getExcpYnText = (excpYn: string) => (excpYn === 'Y' ? '예' : '아니오')
  const getCheckYnText = (checkYn?: string) => (checkYn === 'Y' ? '예' : '아니오')
  return (
    <>
      <div className="mb-2 flex flex-wrap items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2">
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
        <label className="text-sm">장애여부:</label>
        <select
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchParams.srchLastRes ?? ''}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, srchLastRes: e.target.value }))
          }
        >
          <option value="">전체</option>
          <option value="200">정상</option>
          <option value="-1">장애</option>
        </select>
        <label className="text-sm">삭제여부:</label>
        <select
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchParams.srchDelYn ?? ''}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, srchDelYn: e.target.value }))
          }
        >
          <option value="">전체</option>
          <option value="Y">예</option>
          <option value="N">아니오</option>
        </select>
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
        <ToolbarButton icon="sms" onClick={handleSms} title="SMS 전송" />
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
              <th className="border-b border-gray-300 p-2 text-center">장애여부</th>
              <th className="border-b border-gray-300 p-2 text-center">DEPTH</th>
              <th className="border-b border-gray-300 p-2 text-center">삭제여부</th>
              <th className="border-b border-gray-300 p-2 text-center">집중여부</th>
              <th className="border-b border-gray-300 p-2 text-center">예외여부</th>
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
                <tr
                  key={item.forgerySeq}
                  onClick={() => setSelectedRow(item)}
                  className={cn(
                    'cursor-pointer hover:bg-gray-50',
                    selectedRow?.forgerySeq === item.forgerySeq && 'bg-blue-100'
                  )}
                >
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
                    {getLastResText(item.lastRes)}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.depth}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {getDelYnText(item.delYn)}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {getCheckYnText(item.checkYn)}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {getExcpYnText(item.excpYn)}
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
