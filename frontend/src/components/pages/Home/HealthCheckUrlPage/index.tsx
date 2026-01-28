import { useState, useEffect, useCallback } from 'react'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { useUserStore } from '@/stores/userStore'
import { homeApi } from '@/services/api/homeApi'
import { globalAlert } from '@/utils/alert'
import { globalConfirm } from '@/utils/confirm'
import { globalPrompt } from '@/utils/prompt'
import type { HealthCheckUrl, HealthCheckUrlSearchParams } from '@/types'
import { cn } from '@/lib/utils'

export function HealthCheckUrlPage() {
  const { user } = useUserStore()
  const [data, setData] = useState<HealthCheckUrl[]>([])
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedInstCd, _setSelectedInstCd] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useState<HealthCheckUrlSearchParams>({
    srchInstNm: '',
    srchDomain: '',
    srchLastRes: '',
    srchMoisYn: '',
    srchUseYn: '',
    srchCheckYn: '',
  })

  // TODO: 기관 선택 로직 추가 필요
  // _setSelectedInstCd를 사용하여 기관 선택 시 상태 업데이트
  void _setSelectedInstCd

  const isAdmin = user?.authMain === 'AUTH_MAIN_2'

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await homeApi.getHealthCheckUrlList({
        ...searchParams,
        srchInstCd: user?.instCd,
        sAuthMain: user?.authMain,
      })
      setData(result)
      setSelectedRows([])
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [searchParams, user?.instCd, user?.authMain])

  useEffect(() => {
    loadData()
  }, [loadData])


  const handleSearch = useCallback(() => {
    loadData()
  }, [loadData])

  const handleRowSelect = useCallback((seqNo: number, ctrlKey: boolean) => {
    setSelectedRows((prev) => {
      if (ctrlKey) {
        return prev.includes(seqNo)
          ? prev.filter((id) => id !== seqNo)
          : [...prev, seqNo]
      }
      return [seqNo]
    })
  }, [])

  const handleAdd = useCallback(async () => {
    const url = await globalPrompt('URL을 입력하세요:')
    if (!url) return

    try {
      await homeApi.addHealthCheckUrl({
        url,
        instCd: Number(selectedInstCd ?? user?.instCd),
        useYn: '1',
        moisYn: '0',
      })
      globalAlert.success('등록되었습니다.')
      loadData()
    } catch {
      globalAlert.error('등록에 실패했습니다.')
    }
  }, [selectedInstCd, user?.instCd, loadData])

  const handleDelete = useCallback(async () => {
    if (selectedRows.length === 0) {
      globalAlert.warning('데이터를 선택해주세요.')
      return
    }
    if (!await globalConfirm('선택된 데이터를 삭제하시겠습니까?')) return

    try {
      await homeApi.deleteHealthCheckUrl(selectedRows)
      globalAlert.success('삭제되었습니다.')
      loadData()
    } catch {
      globalAlert.error('삭제에 실패했습니다.')
    }
  }, [selectedRows, loadData])

  const handleWatchOn = useCallback(async () => {
    if (selectedRows.length === 0) {
      globalAlert.warning('데이터를 선택해주세요.')
      return
    }
    if (!await globalConfirm('집중관리 등록 하시겠습니까?')) return

    try {
      await homeApi.watchOnHealthCheckUrl(selectedRows, user?.authMain ?? '')
      globalAlert.success('등록되었습니다.')
      loadData()
    } catch {
      globalAlert.error('등록에 실패했습니다.')
    }
  }, [selectedRows, user?.authMain, loadData])

  const handleWatchOff = useCallback(async () => {
    if (selectedRows.length === 0) {
      globalAlert.warning('데이터를 선택해주세요.')
      return
    }
    if (!await globalConfirm('집중관리 해제 하시겠습니까?')) return

    try {
      await homeApi.watchOffHealthCheckUrl(selectedRows, user?.authMain ?? '')
      globalAlert.success('해제되었습니다.')
      loadData()
    } catch {
      globalAlert.error('해제에 실패했습니다.')
    }
  }, [selectedRows, user?.authMain, loadData])

  const handleExcel = useCallback(async () => {
    try {
      await homeApi.exportHealthCheckUrl({
        ...searchParams,
        srchInstCd: selectedInstCd ?? user?.instCd,
        sAuthMain: user?.authMain,
      })
    } catch {
      globalAlert.error('엑셀 다운로드에 실패했습니다.')
    }
  }, [searchParams, selectedInstCd, user?.instCd, user?.authMain])

  const getLastResText = (lastRes: number) => (lastRes === 200 ? '정상' : '장애')
  const getMoisYnText = (moisYn: string) => (moisYn === '1' ? '중앙부처' : '지자체')
  const getUseYnText = (useYn: string) => (useYn === '1' ? '예' : '아니오')
  const getCheckYnText = (checkYn: number) => (checkYn === 1 ? '예' : '아니오')
  return (
    <>
      <div className="mb-2 flex flex-wrap items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2">
        <label className="text-sm">홈페이지명:</label>
        <input
          type="text"
          className="w-28 rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchParams.srchInstNm ?? ''}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, srchInstNm: e.target.value }))
          }
        />
        <label className="text-sm">URL:</label>
        <input
          type="text"
          className="w-28 rounded border border-gray-300 px-2 py-1 text-sm"
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
        <label className="text-sm">구분:</label>
        <select
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchParams.srchMoisYn ?? ''}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, srchMoisYn: e.target.value }))
          }
        >
          <option value="">전체</option>
          <option value="1">중앙부처</option>
          <option value="0">지자체</option>
        </select>
        <label className="text-sm">사용여부:</label>
        <select
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchParams.srchUseYn ?? ''}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, srchUseYn: e.target.value }))
          }
        >
          <option value="">전체</option>
          <option value="1">예</option>
          <option value="0">아니오</option>
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
        <ToolbarButton icon="excel" onClick={handleExcel} title="엑셀" />
        {isAdmin && (
          <>
            <ToolbarButton icon="add" onClick={handleAdd} title="추가" />
            <ToolbarButton icon="delete" onClick={handleDelete} title="삭제" />
          </>
        )}
        <button
          onClick={handleWatchOn}
          className="rounded border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-100"
          type="button"
        >
          집중감시 등록
        </button>
        <button
          onClick={handleWatchOff}
          className="rounded border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-100"
          type="button"
        >
          집중감시 해제
        </button>
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
              <th className="border-b border-gray-300 p-2 text-center">장애여부</th>
              <th className="border-b border-gray-300 p-2 text-center">구분</th>
              <th className="border-b border-gray-300 p-2 text-center">사용여부</th>
              <th className="border-b border-gray-300 p-2 text-center">집중감시</th>
              <th className="border-b border-gray-300 p-2 text-center">등록시간</th>
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
                  key={item.seqNo}
                  onClick={(e) => handleRowSelect(item.seqNo, e.ctrlKey || e.metaKey)}
                  className={cn(
                    'cursor-pointer hover:bg-gray-50',
                    selectedRows.includes(item.seqNo) && 'bg-blue-100'
                  )}
                >
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
                    {getLastResText(item.lastRes)}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {getMoisYnText(item.moisYn)}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {getUseYnText(item.useYn)}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {isAdmin
                      ? getCheckYnText(item.checkYn)
                      : getCheckYnText(item.checkSidoYn)}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.updtime}
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
