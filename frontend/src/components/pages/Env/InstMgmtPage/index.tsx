import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { globalConfirm } from '@/utils/confirm'
import { globalPrompt } from '@/utils/prompt'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { envApi } from '@/services/api/envApi'
import type { Institution, InstSearchParams } from '@/types'
import { cn } from '@/lib/utils'

export function InstMgmtPage() {
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [selectedInst, setSelectedInst] = useState<Institution | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedParentCd, _setSelectedParentCd] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useState<InstSearchParams>({
    sInstNm: '',
  })

  // TODO: 상위 기관 선택 로직 추가 필요
  // _setSelectedParentCd를 사용하여 상위 기관 선택 시 상태 업데이트
  void _setSelectedParentCd

  const loadInstitutions = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await envApi.getInstList(searchParams)
      setInstitutions(data)
    } catch (err) {
      console.error('Failed to load institutions:', err)
    } finally {
      setIsLoading(false)
    }
  }, [searchParams])

  useEffect(() => {
    loadInstitutions()
  }, [loadInstitutions])


  const handleSearch = useCallback(() => {
    loadInstitutions()
  }, [loadInstitutions])

  const handleInstAdd = useCallback(async () => {
    const instNm = await globalPrompt('기관명을 입력하세요:')
    if (!instNm) return

    const instCd = await globalPrompt('기관코드를 입력하세요:')
    if (!instCd) return

    try {
      await envApi.addInst({
        instCd,
        instNm,
        pntInstCd: selectedParentCd ?? undefined,
        useYn: 'Y',
      })
      globalAlert.success('기관이 추가되었습니다.')
      loadInstitutions()
    } catch {
      globalAlert.error('기관 추가에 실패했습니다.')
    }
  }, [selectedParentCd, loadInstitutions])

  const handleInstEdit = useCallback(async () => {
    if (!selectedInst) {
      globalAlert.warning('기관을 선택해주세요.')
      return
    }

    const instNm = await globalPrompt('기관명을 입력하세요:', selectedInst.instNm)
    if (!instNm || instNm === selectedInst.instNm) return

    try {
      await envApi.updateInst({ ...selectedInst, instNm })
      globalAlert.success('기관이 수정되었습니다.')
      loadInstitutions()
    } catch {
      globalAlert.error('기관 수정에 실패했습니다.')
    }
  }, [selectedInst, loadInstitutions])

  const handleInstDelete = useCallback(async () => {
    if (!selectedInst) {
      globalAlert.warning('기관을 선택해주세요.')
      return
    }
    if (!await globalConfirm('선택한 기관을 삭제하시겠습니까?')) return

    try {
      await envApi.deleteInst(selectedInst.instCd)
      globalAlert.success('삭제되었습니다.')
      setSelectedInst(null)
      loadInstitutions()
    } catch {
      globalAlert.error('삭제에 실패했습니다.')
    }
  }, [selectedInst, loadInstitutions])

  const handleExportExcel = useCallback(() => {
    globalAlert.info('엑셀 내보내기 기능은 추후 구현 예정입니다.')
  }, [])
  return (
    <>
      <div className="mb-2 flex items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2">
        <label className="text-sm">기관명:</label>
        <input
          type="text"
          className="w-40 rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchParams.sInstNm}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, sInstNm: e.target.value }))
          }
        />
      </div>

      <PageToolbar>
        <ToolbarButton icon="search" onClick={handleSearch} title="검색" />
        <ToolbarButton icon="add" onClick={handleInstAdd} title="추가" />
        <ToolbarButton icon="edit" onClick={handleInstEdit} title="수정" />
        <ToolbarButton icon="delete" onClick={handleInstDelete} title="삭제" />
        <ToolbarButton icon="excel" onClick={handleExportExcel} title="엑셀" />
      </PageToolbar>

      <div className="h-[calc(100%-110px)] overflow-auto rounded border border-gray-300">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="border-b border-gray-300 p-2 text-center">NO</th>
              <th className="border-b border-gray-300 p-2 text-center">기관코드</th>
              <th className="border-b border-gray-300 p-2 text-center">기관명</th>
              <th className="border-b border-gray-300 p-2 text-center">기관레벨</th>
              <th className="border-b border-gray-300 p-2 text-center">지역코드</th>
              <th className="border-b border-gray-300 p-2 text-center">상위기관</th>
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
            ) : institutions.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              institutions.map((inst, idx) => (
                <tr
                  key={inst.instCd}
                  onClick={() => setSelectedInst(inst)}
                  className={cn(
                    'cursor-pointer hover:bg-gray-50',
                    selectedInst?.instCd === inst.instCd && 'bg-blue-100'
                  )}
                >
                  <td className="border-b border-gray-200 p-2 text-center">
                    {institutions.length - idx}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">{inst.instCd}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{inst.instNm}</td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {inst.instLevel}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {inst.localCd}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {inst.pntInstCd ?? '-'}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {inst.useYn === 'Y' ? '사용' : '미사용'}
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
