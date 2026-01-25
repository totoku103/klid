import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { globalConfirm } from '@/utils/confirm'
import { SubPageLayout, PageToolbar, ToolbarButton } from '@/components/templates'
import { engineerApi } from '@/services/api/engineerApi'
import type { EncrySync } from '@/types'

export function EncrySyncPage() {
  const [data, setData] = useState<EncrySync[]>([])
  const [checkText, setCheckText] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await engineerApi.getEncrySyncList(checkText || undefined)
      setData(result)
      setSelectedUsers(new Set())
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [checkText])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(userId)) {
        newSet.delete(userId)
      } else {
        newSet.add(userId)
      }
      return newSet
    })
  }

  const handleSelectAll = () => {
    if (selectedUsers.size === data.length) {
      setSelectedUsers(new Set())
    } else {
      setSelectedUsers(new Set(data.map((item) => item.userId)))
    }
  }

  const handleSync = async () => {
    if (selectedUsers.size === 0) {
      globalAlert.warning('동기화할 사용자를 선택하세요.')
      return
    }
    if (!await globalConfirm('선택한 사용자의 암호화를 동기화하시겠습니까?')) {
      return
    }
    try {
      await engineerApi.syncEncryption(Array.from(selectedUsers))
      globalAlert.success('동기화되었습니다.')
      loadData()
    } catch (err) {
      console.error('Failed to sync:', err)
      globalAlert.error('동기화 중 오류가 발생했습니다.')
    }
  }

  const handleApply = async () => {
    if (selectedUsers.size === 0) {
      globalAlert.warning('적용할 사용자를 선택하세요.')
      return
    }
    if (!await globalConfirm('선택한 사용자에게 암호화를 적용하시겠습니까?')) {
      return
    }
    try {
      await engineerApi.applyEncryption(Array.from(selectedUsers))
      globalAlert.success('적용되었습니다.')
      loadData()
    } catch (err) {
      console.error('Failed to apply:', err)
      globalAlert.error('적용 중 오류가 발생했습니다.')
    }
  }

  return (
    <SubPageLayout locationPath={['엔지니어', '암호화 동기화']}>
      <div className="mb-2 flex items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2">
        <label className="text-sm">암호화 확인값:</label>
        <input
          type="text"
          className="w-48 rounded border border-gray-300 px-2 py-1 text-sm"
          value={checkText}
          onChange={(e) => setCheckText(e.target.value)}
        />
      </div>

      <PageToolbar>
        <ToolbarButton icon="search" onClick={loadData} title="검색" />
        <ToolbarButton icon="sync" onClick={handleSync} title="동기화" />
        <ToolbarButton icon="apply" onClick={handleApply} title="적용" />
      </PageToolbar>

      <div className="h-[calc(100%-100px)] overflow-auto rounded border border-gray-300">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="border-b border-gray-300 p-2 text-center w-12">
                <input
                  type="checkbox"
                  checked={data.length > 0 && selectedUsers.size === data.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="border-b border-gray-300 p-2 text-center">NO</th>
              <th className="border-b border-gray-300 p-2 text-center">사용자ID</th>
              <th className="border-b border-gray-300 p-2 text-center">사용자명</th>
              <th className="border-b border-gray-300 p-2 text-center">기관명</th>
              <th className="border-b border-gray-300 p-2 text-center">암호화상태</th>
              <th className="border-b border-gray-300 p-2 text-center">확인값</th>
              <th className="border-b border-gray-300 p-2 text-center">동기화일시</th>
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
                <tr key={item.userId} className="hover:bg-gray-50">
                  <td className="border-b border-gray-200 p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedUsers.has(item.userId)}
                      onChange={() => handleSelectUser(item.userId)}
                    />
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">{idx + 1}</td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.userId}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.userName}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.instNm}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.encryStatus}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.checkValue}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.syncDate}
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
