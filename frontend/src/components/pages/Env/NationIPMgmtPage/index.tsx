import { useState, useEffect, useCallback } from 'react'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { envApi } from '@/services/api/envApi'
import type { NationIP } from '@/types'
import { cn } from '@/lib/utils'

const NATION_LIST = [
  { code: 'KR', name: '대한민국' },
  { code: 'US', name: '미국' },
  { code: 'CN', name: '중국' },
  { code: 'JP', name: '일본' },
  { code: 'RU', name: '러시아' },
  { code: 'DE', name: '독일' },
  { code: 'GB', name: '영국' },
  { code: 'FR', name: '프랑스' },
  { code: 'BR', name: '브라질' },
  { code: 'IN', name: '인도' },
]

export function NationIPMgmtPage() {
  const [ipList, setIPList] = useState<NationIP[]>([])
  const [selectedNationCd, setSelectedNationCd] = useState<string>('')
  const [selectedIP, setSelectedIP] = useState<NationIP | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadIPList = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await envApi.getNationIPList(selectedNationCd || undefined)
      setIPList(data)
    } catch (err) {
      console.error('Failed to load nation IP list:', err)
    } finally {
      setIsLoading(false)
    }
  }, [selectedNationCd])

  useEffect(() => {
    loadIPList()
  }, [loadIPList])

  const handleSearch = useCallback(() => {
    loadIPList()
  }, [loadIPList])

  return (
    <>
      <div className="mb-2 flex items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2">
        <label className="text-sm">국가:</label>
        <select
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={selectedNationCd}
          onChange={(e) => setSelectedNationCd(e.target.value)}
        >
          <option value="">전체</option>
          {NATION_LIST.map((nation) => (
            <option key={nation.code} value={nation.code}>
              {nation.name}
            </option>
          ))}
        </select>
      </div>

      <PageToolbar>
        <ToolbarButton icon="search" onClick={handleSearch} title="검색" />
      </PageToolbar>

      <div className="h-[calc(100%-110px)] overflow-auto rounded border border-gray-300">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="border-b border-gray-300 p-2 text-center">NO</th>
              <th className="border-b border-gray-300 p-2 text-center">국가코드</th>
              <th className="border-b border-gray-300 p-2 text-center">국가명</th>
              <th className="border-b border-gray-300 p-2 text-center">시작 IP</th>
              <th className="border-b border-gray-300 p-2 text-center">종료 IP</th>
              <th className="border-b border-gray-300 p-2 text-center">등록일</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  로딩 중...
                </td>
              </tr>
            ) : ipList.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              ipList.map((ip, idx) => (
                <tr
                  key={ip.ipSeq}
                  onClick={() => setSelectedIP(ip)}
                  className={cn(
                    'cursor-pointer hover:bg-gray-50',
                    selectedIP?.ipSeq === ip.ipSeq && 'bg-blue-100'
                  )}
                >
                  <td className="border-b border-gray-200 p-2 text-center">
                    {ipList.length - idx}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">{ip.nationCd}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{ip.nationNm}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{ip.ipStart}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{ip.ipEnd}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{ip.regDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
