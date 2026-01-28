import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { globalConfirm } from '@/utils/confirm'
import { globalPrompt } from '@/utils/prompt'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { envApi } from '@/services/api/envApi'
import type { InstIP } from '@/types'
import { cn } from '@/lib/utils'

export function InstIPMgmtPage() {
  const [ipList, setIPList] = useState<InstIP[]>([])
  const [selectedIP, setSelectedIP] = useState<InstIP | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedInstCd, _setSelectedInstCd] = useState<string | null>(null)
  const [selectedInstNm, _setSelectedInstNm] = useState<string | null>(null)

  // TODO: 기관 선택 로직 추가 필요
  // _setSelectedInstCd, _setSelectedInstNm 을 사용하여 기관 선택 시 상태 업데이트
  void _setSelectedInstCd
  void _setSelectedInstNm

  const loadIPList = useCallback(async () => {
    if (!selectedInstCd) {
      setIPList([])
      return
    }
    setIsLoading(true)
    try {
      const data = await envApi.getInstIPList(selectedInstCd)
      setIPList(data)
    } catch (err) {
      console.error('Failed to load IP list:', err)
    } finally {
      setIsLoading(false)
    }
  }, [selectedInstCd])

  useEffect(() => {
    loadIPList()
  }, [loadIPList])


  const handleIPAdd = useCallback(async () => {
    if (!selectedInstCd) {
      globalAlert.warning('기관을 먼저 선택해주세요.')
      return
    }

    const ipAddr = await globalPrompt('IP 주소를 입력하세요:')
    if (!ipAddr) return

    const ipDesc = await globalPrompt('IP 설명을 입력하세요:')

    try {
      await envApi.addInstIP({
        instCd: selectedInstCd,
        ipAddr,
        ipDesc: ipDesc ?? '',
        useYn: 'Y',
      })
      globalAlert.success('IP가 추가되었습니다.')
      loadIPList()
    } catch {
      globalAlert.error('IP 추가에 실패했습니다.')
    }
  }, [selectedInstCd, loadIPList])

  const handleIPEdit = useCallback(async () => {
    if (!selectedIP) {
      globalAlert.warning('IP를 선택해주세요.')
      return
    }

    const ipAddr = await globalPrompt('IP 주소를 입력하세요:', selectedIP.ipAddr)
    if (!ipAddr) return

    const ipDesc = await globalPrompt('IP 설명을 입력하세요:', selectedIP.ipDesc)

    try {
      await envApi.updateInstIP({
        ...selectedIP,
        ipAddr,
        ipDesc: ipDesc ?? '',
      })
      globalAlert.success('IP가 수정되었습니다.')
      loadIPList()
    } catch {
      globalAlert.error('IP 수정에 실패했습니다.')
    }
  }, [selectedIP, loadIPList])

  const handleIPDelete = useCallback(async () => {
    if (!selectedIP) {
      globalAlert.warning('IP를 선택해주세요.')
      return
    }
    if (!await globalConfirm('선택한 IP를 삭제하시겠습니까?')) return

    try {
      await envApi.deleteInstIP(selectedIP.ipSeq)
      globalAlert.success('삭제되었습니다.')
      setSelectedIP(null)
      loadIPList()
    } catch {
      globalAlert.error('삭제에 실패했습니다.')
    }
  }, [selectedIP, loadIPList])
  return (
    <>
      <div className="mb-2 rounded border border-gray-300 bg-gray-50 p-2">
        <span className="text-sm font-medium">
          선택된 기관: {selectedInstNm || '기관을 선택해주세요'}
        </span>
      </div>

      <PageToolbar>
        <ToolbarButton icon="add" onClick={handleIPAdd} title="추가" />
        <ToolbarButton icon="edit" onClick={handleIPEdit} title="수정" />
        <ToolbarButton icon="delete" onClick={handleIPDelete} title="삭제" />
      </PageToolbar>

      <div className="h-[calc(100%-110px)] overflow-auto rounded border border-gray-300">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="border-b border-gray-300 p-2 text-center">NO</th>
              <th className="border-b border-gray-300 p-2 text-center">기관명</th>
              <th className="border-b border-gray-300 p-2 text-center">IP 주소</th>
              <th className="border-b border-gray-300 p-2 text-center">설명</th>
              <th className="border-b border-gray-300 p-2 text-center">사용여부</th>
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
            ) : !selectedInstCd ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  기관을 선택해주세요
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
                  <td className="border-b border-gray-200 p-2 text-center">{ip.instNm}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{ip.ipAddr}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{ip.ipDesc}</td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {ip.useYn === 'Y' ? '사용' : '미사용'}
                  </td>
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
