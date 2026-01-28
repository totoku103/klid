import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { globalConfirm } from '@/utils/confirm'
import { globalPrompt } from '@/utils/prompt'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { useUserStore } from '@/stores/userStore'
import { envApi } from '@/services/api/envApi'
import type { UserInfo, UserSearchParams } from '@/types'
import { cn } from '@/lib/utils'

export function UserMgmtPage() {
  const { user } = useUserStore()
  const [users, setUsers] = useState<UserInfo[]>([])
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedInstCd, _setSelectedInstCd] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useState<UserSearchParams>({
    srchUserName: '',
    srchUserId: '',
    srchUseYn: '',
    inactiveUser: false,
  })

  // TODO: 기관 선택 로직 추가 필요
  // _setSelectedInstCd를 사용하여 기관 선택 시 상태 업데이트
  void _setSelectedInstCd

  const loadUsers = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await envApi.getUserList({
        ...searchParams,
        srchInstCd: selectedInstCd ?? undefined,
      })
      setUsers(data)
    } catch (err) {
      console.error('Failed to load users:', err)
    } finally {
      setIsLoading(false)
    }
  }, [searchParams, selectedInstCd])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])


  const handleSearch = useCallback(() => {
    loadUsers()
  }, [loadUsers])

  const handleUserAdd = useCallback(async () => {
    const userName = await globalPrompt('사용자 이름을 입력하세요:')
    if (!userName) return

    const userId = await globalPrompt('사용자 ID를 입력하세요:')
    if (!userId) return

    const userEmail = await globalPrompt('이메일을 입력하세요:')
    if (!userEmail) return

    try {
      await envApi.addUser({
        userName,
        userId,
        userEmail,
        instCd: selectedInstCd ?? '',
        useYn: 'Y',
      })
      globalAlert.success('사용자가 추가되었습니다.')
      loadUsers()
    } catch {
      globalAlert.error('사용자 추가에 실패했습니다.')
    }
  }, [selectedInstCd, loadUsers])

  const handleUserDelete = useCallback(async () => {
    if (!selectedUser) {
      globalAlert.warning('사용자를 선택해주세요.')
      return
    }
    if (!await globalConfirm('선택한 사용자를 삭제하시겠습니까?')) return

    try {
      await envApi.deleteUser(selectedUser.userId)
      globalAlert.success('삭제되었습니다.')
      setSelectedUser(null)
      loadUsers()
    } catch {
      globalAlert.error('삭제에 실패했습니다.')
    }
  }, [selectedUser, loadUsers])

  const isAdmin =
    user?.authRole.main === 'AUTH_MAIN_2' && user?.authRole.sub === 'AUTH_SUB_3'
  return (
    <>
      <div className="mb-2 flex items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2">
        <label className="text-sm">이름:</label>
        <input
          type="text"
          className="w-24 rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchParams.srchUserName}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, srchUserName: e.target.value }))
          }
        />
        <label className="text-sm">아이디:</label>
        <input
          type="text"
          className="w-24 rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchParams.srchUserId}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, srchUserId: e.target.value }))
          }
        />
        <label className="text-sm">사용여부:</label>
        <select
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchParams.srchUseYn}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, srchUseYn: e.target.value }))
          }
        >
          <option value="">전체</option>
          <option value="Y">사용</option>
          <option value="N">미사용</option>
        </select>
        <label className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={searchParams.inactiveUser}
            onChange={(e) =>
              setSearchParams((prev) => ({ ...prev, inactiveUser: e.target.checked }))
            }
          />
          장기 미접속자
        </label>
      </div>

      <PageToolbar>
        <ToolbarButton icon="search" onClick={handleSearch} title="검색" />
        {isAdmin && (
          <>
            <ToolbarButton icon="add" onClick={handleUserAdd} title="추가" />
            <ToolbarButton icon="delete" onClick={handleUserDelete} title="삭제" />
          </>
        )}
      </PageToolbar>

      <div className="h-[calc(100%-110px)] overflow-auto rounded border border-gray-300">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="border-b border-gray-300 p-2 text-center">NO</th>
              <th className="border-b border-gray-300 p-2 text-center">기관명</th>
              <th className="border-b border-gray-300 p-2 text-center">아이디</th>
              <th className="border-b border-gray-300 p-2 text-center">이름</th>
              <th className="border-b border-gray-300 p-2 text-center">이메일</th>
              <th className="border-b border-gray-300 p-2 text-center">전화번호</th>
              <th className="border-b border-gray-300 p-2 text-center">사용여부</th>
              <th className="border-b border-gray-300 p-2 text-center">등록일</th>
              <th className="border-b border-gray-300 p-2 text-center">최종접속</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9} className="p-4 text-center text-gray-500">
                  로딩 중...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              users.map((u, idx) => (
                <tr
                  key={u.userId}
                  onClick={() => setSelectedUser(u)}
                  className={cn(
                    'cursor-pointer hover:bg-gray-50',
                    selectedUser?.userId === u.userId && 'bg-blue-100'
                  )}
                >
                  <td className="border-b border-gray-200 p-2 text-center">
                    {users.length - idx}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">{u.instNm}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{u.userId}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{u.userName}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{u.userEmail}</td>
                  <td className="border-b border-gray-200 p-2 text-center">{u.userTel}</td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {u.useYn === 'Y' ? '사용' : '미사용'}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">{u.regDate}</td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {u.lastLoginDate ?? '-'}
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
