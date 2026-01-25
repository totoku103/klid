import { useState, useEffect, useCallback } from 'react'
import { SubPageLayout, PageToolbar, ToolbarButton } from '@/components/templates'
import { useUserStore } from '@/stores/userStore'
import { homeApi } from '@/services/api/homeApi'
import { envApi } from '@/services/api/envApi'
import type { HealthCheckHist, HealthCheckHistSearchParams, Institution } from '@/types'
import { cn } from '@/lib/utils'

interface InstTreeProps {
  institutions: Institution[]
  selectedInstCd: string | null
  onSelect: (inst: Institution) => void
}

function InstTree({ institutions, selectedInstCd, onSelect }: InstTreeProps) {
  const renderTree = (nodes: Institution[], level = 0) => {
    return nodes.map((node) => (
      <div key={node.instCd}>
        <div
          className={cn(
            'cursor-pointer px-2 py-1 text-sm hover:bg-gray-100',
            selectedInstCd === node.instCd && 'bg-blue-100 font-medium'
          )}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => onSelect(node)}
        >
          {node.instNm}
        </div>
        {node.children && node.children.length > 0 && renderTree(node.children, level + 1)}
      </div>
    ))
  }

  return <div className="h-full overflow-auto">{renderTree(institutions)}</div>
}

function getDefaultDates() {
  const today = new Date()
  const date2 = today.toISOString().split('T')[0]
  const weekAgo = new Date(today)
  weekAgo.setDate(weekAgo.getDate() - 7)
  const date1 = weekAgo.toISOString().split('T')[0]
  return { date1, date2 }
}

export function HealthCheckHistPage() {
  const { user } = useUserStore()
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [data, setData] = useState<HealthCheckHist[]>([])
  const [selectedInstCd, setSelectedInstCd] = useState<string | null>(null)
  const [responseCodes, setResponseCodes] = useState<{ comCode2: string; codeName: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { date1: defaultDate1, date2: defaultDate2 } = getDefaultDates()
  const [searchParams, setSearchParams] = useState<HealthCheckHistSearchParams>({
    srchUrl: '',
    srchResCd: '',
    period: 'week',
    date1: defaultDate1,
    date2: defaultDate2,
  })

  const loadInstitutions = useCallback(async () => {
    try {
      const result = await envApi.getInstTree()
      setInstitutions(result)
    } catch (err) {
      console.error('Failed to load institutions:', err)
    }
  }, [])

  const loadResponseCodes = useCallback(async () => {
    try {
      const result = await homeApi.getResponseCodeList()
      setResponseCodes(result)
    } catch (err) {
      console.error('Failed to load response codes:', err)
    }
  }, [])

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await homeApi.getHealthCheckHistList({
        ...searchParams,
        srchInstCd: selectedInstCd ?? user?.instCd,
      })
      setData(result)
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [searchParams, selectedInstCd, user?.instCd])

  useEffect(() => {
    loadInstitutions()
    loadResponseCodes()
  }, [loadInstitutions, loadResponseCodes])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleInstSelect = useCallback((inst: Institution) => {
    setSelectedInstCd(inst.instCd)
  }, [])

  const handleSearch = useCallback(() => {
    if (searchParams.date1 && searchParams.date2 && searchParams.date1 > searchParams.date2) {
      setSearchParams((prev) => ({
        ...prev,
        date1: prev.date2,
        date2: prev.date1,
      }))
    }
    loadData()
  }, [loadData, searchParams.date1, searchParams.date2])

  const getMoisYnText = (moisYn: string) => (moisYn === '1' ? '행안부' : '기타')

  const leftPanel = (
    <InstTree
      institutions={institutions}
      selectedInstCd={selectedInstCd}
      onSelect={handleInstSelect}
    />
  )

  return (
    <SubPageLayout
      leftPanel={leftPanel}
      leftPanelTitle="기관정보"
      leftPanelWidth={250}
      locationPath={['메인', '헬스체크 이력']}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2">
        <label className="text-sm">장애일시:</label>
        <select
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchParams.period ?? 'week'}
          onChange={(e) => {
            const period = e.target.value
            setSearchParams((prev) => ({ ...prev, period }))
            const today = new Date()
            let date1 = new Date()
            switch (period) {
              case 'today':
                break
              case 'week':
                date1.setDate(today.getDate() - 7)
                break
              case 'month':
                date1.setMonth(today.getMonth() - 1)
                break
              case '3month':
                date1.setMonth(today.getMonth() - 3)
                break
              default:
                date1.setDate(today.getDate() - 7)
            }
            setSearchParams((prev) => ({
              ...prev,
              period,
              date1: date1.toISOString().split('T')[0],
              date2: today.toISOString().split('T')[0],
            }))
          }}
        >
          <option value="today">오늘</option>
          <option value="week">일주일</option>
          <option value="month">한달</option>
          <option value="3month">세달</option>
          <option value="custom">직접입력</option>
        </select>
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
        <label className="text-sm">URL:</label>
        <input
          type="text"
          className="w-48 rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchParams.srchUrl ?? ''}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, srchUrl: e.target.value }))
          }
        />
        <label className="text-sm">응답코드:</label>
        <select
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchParams.srchResCd ?? ''}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, srchResCd: e.target.value }))
          }
        >
          <option value="">전체</option>
          {responseCodes.map((code) => (
            <option key={code.comCode2} value={code.comCode2}>
              {code.codeName}
            </option>
          ))}
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
              <th className="border-b border-gray-300 p-2 text-center">홈페이지명</th>
              <th className="border-b border-gray-300 p-2 text-center">URL</th>
              <th className="border-b border-gray-300 p-2 text-center">응답코드</th>
              <th className="border-b border-gray-300 p-2 text-center">장애시간</th>
              <th className="border-b border-gray-300 p-2 text-center">행안부</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-500">
                  로딩 중...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr key={`${item.seqNo}-${item.errTime}`} className="hover:bg-gray-50">
                  <td className="border-b border-gray-200 p-2 text-center">
                    {data.length - idx}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.parentName}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.instNm}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.instCenterNm}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.url}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.resNm}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.errTime}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {getMoisYnText(item.moisYn)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </SubPageLayout>
  )
}
