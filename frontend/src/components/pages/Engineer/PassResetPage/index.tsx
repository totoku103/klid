import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { globalConfirm } from '@/utils/confirm'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { engineerApi } from '@/services/api/engineerApi'
import type { PassResetUser } from '@/types'

export function PassResetPage() {
  const [data, setData] = useState<PassResetUser[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await engineerApi.getPassResetUserList()
      setData(result)
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleResetAllPass = async () => {
    if (!await globalConfirm('사용자 비밀번호 일괄 초기화: 비밀번호 → 사용자ID\nPASS_RESET_YN → Y\n\n진행하시겠습니까?')) {
      return
    }
    try {
      await engineerApi.resetAllUserPass()
      globalAlert.success('처리되었습니다.')
      loadData()
    } catch (err) {
      console.error('Failed to reset passwords:', err)
      globalAlert.error('처리 중 오류가 발생했습니다.')
    }
  }

  return (
    <>
      <div className="mb-2 flex items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2">
        <span className="font-bold text-red-500">COMM_USER 전체 비밀번호 리셋</span>
      </div>

      <PageToolbar>
        <ToolbarButton icon="apply" onClick={handleResetAllPass} title="적용" />
      </PageToolbar>

      <div className="h-[calc(100%-100px)] overflow-auto rounded border border-gray-300">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="border-b border-gray-300 p-2 text-center">NO</th>
              <th className="border-b border-gray-300 p-2 text-center">사용자ID</th>
              <th className="border-b border-gray-300 p-2 text-center">사용자명</th>
              <th className="border-b border-gray-300 p-2 text-center">기관명</th>
              <th className="border-b border-gray-300 p-2 text-center">초기화여부</th>
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
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr key={item.userId} className="hover:bg-gray-50">
                  <td className="border-b border-gray-200 p-2 text-center">{idx + 1}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.userId}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.userName}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.instNm}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.passResetYn}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{item.regDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
