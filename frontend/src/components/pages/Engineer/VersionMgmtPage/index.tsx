import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { SubPageLayout, PageToolbar, ToolbarButton } from '@/components/templates'
import { engineerApi } from '@/services/api/engineerApi'
import type { Version } from '@/types'

export function VersionMgmtPage() {
  const [versions, setVersions] = useState<Version[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await engineerApi.getVersionList()
      setVersions(result)
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleAdd = () => {
    globalAlert.info('버전 추가 팝업 - 추후 구현')
  }

  return (
    <SubPageLayout locationPath={['엔지니어', '버전 관리']}>
      <PageToolbar>
        <ToolbarButton icon="search" onClick={loadData} title="검색" />
        <ToolbarButton icon="add" onClick={handleAdd} title="추가" />
      </PageToolbar>

      <div className="h-[calc(100%-60px)] overflow-auto rounded border border-gray-300">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="border-b border-gray-300 p-2 text-center">NO</th>
              <th className="border-b border-gray-300 p-2 text-center">버전유형</th>
              <th className="border-b border-gray-300 p-2 text-center">버전번호</th>
              <th className="border-b border-gray-300 p-2 text-center">설명</th>
              <th className="border-b border-gray-300 p-2 text-center">릴리즈일</th>
              <th className="border-b border-gray-300 p-2 text-center">등록일</th>
              <th className="border-b border-gray-300 p-2 text-center">사용여부</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  로딩 중...
                </td>
              </tr>
            ) : versions.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              versions.map((item, idx) => (
                <tr key={item.versionSeq} className="hover:bg-gray-50">
                  <td className="border-b border-gray-200 p-2 text-center">{idx + 1}</td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.versionType}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.versionNo}
                  </td>
                  <td className="border-b border-gray-200 p-2">{item.versionDesc}</td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.releaseDate}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.regDate}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.useYn === 'Y' ? '사용' : '미사용'}
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
