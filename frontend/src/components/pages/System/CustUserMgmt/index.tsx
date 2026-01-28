import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { globalConfirm } from '@/utils/confirm'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { useUserStore } from '@/stores/userStore'
import { sysApi } from '@/services/api/sysApi'
import type { SmsGroup, CustUser } from '@/types'
import { CustUserAddModal, CustUserEditModal } from './components'
import { cn } from '@/lib/utils'

export function CustUserMgmtPage() {
  const { user } = useUserStore()
  const [groups, setGroups] = useState<SmsGroup[]>([])
  const [users, setUsers] = useState<CustUser[]>([])
  const [selectedUser, setSelectedUser] = useState<CustUser | null>(null)
  const selectedGroupNo = 1
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const loadGroups = useCallback(async () => {
    try {
      const data = await sysApi.getSmsGroupList()
      setGroups(data)
    } catch (err) {
      console.error('Failed to load SMS groups:', err)
    }
  }, [])

  const loadUsers = useCallback(async () => {
    if (!user) return
    setIsLoading(true)
    try {
      const data = await sysApi.getCustUserList({
        userId: user.userId,
        smsGroupSeq: selectedGroupNo ?? undefined,
      })
      setUsers(data)
    } catch (err) {
      console.error('Failed to load users:', err)
    } finally {
      setIsLoading(false)
    }
  }, [user, selectedGroupNo])

  useEffect(() => {
    loadGroups()
  }, [loadGroups])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const handleRowClick = useCallback((u: CustUser) => {
    setSelectedUser(u)
  }, [])

  const handleUserAdd = useCallback(async (data: {
    smsGroupSeq: number
    custNm: string
    custCellNo: string
    custMailAddr: string
  }) => {
    try {
      await sysApi.addCustUser({
        ...data,
        smsGroupName: '',
        userId: user?.userId ?? '',
      })
      globalAlert.success('추가되었습니다.')
      setIsAddModalOpen(false)
      loadUsers()
    } catch {
      globalAlert.error('추가에 실패했습니다.')
    }
  }, [user?.userId, loadUsers])

  const handleUserEdit = useCallback(async (data: Partial<CustUser>) => {
    if (!selectedUser) return
    try {
      await sysApi.updateCustUser({
        ...selectedUser,
        ...data,
      })
      globalAlert.success('수정되었습니다.')
      setIsEditModalOpen(false)
      loadUsers()
    } catch {
      globalAlert.error('수정에 실패했습니다.')
    }
  }, [selectedUser, loadUsers])

  const handleUserDelete = useCallback(async () => {
    if (!selectedUser) {
      globalAlert.warning('데이터를 선택해주세요.')
      return
    }
    if (!await globalConfirm('선택한 데이터를 삭제하시겠습니까?')) return

    try {
      await sysApi.deleteCustUser(selectedUser.custSeq)
      globalAlert.success('삭제되었습니다.')
      setSelectedUser(null)
      loadUsers()
    } catch {
      globalAlert.error('삭제에 실패했습니다.')
    }
  }, [selectedUser, loadUsers])

  const handleEditClick = useCallback(() => {
    if (!selectedUser) {
      globalAlert.warning('데이터를 선택해주세요.')
      return
    }
    setIsEditModalOpen(true)
  }, [selectedUser])
  return (
    <>
      <PageToolbar>
        <ToolbarButton icon="add" onClick={() => setIsAddModalOpen(true)} title="추가" />
        <ToolbarButton icon="edit" onClick={handleEditClick} title="수정" />
        <ToolbarButton icon="delete" onClick={handleUserDelete} title="삭제" />
      </PageToolbar>

      <div className="h-[calc(100%-60px)] overflow-auto rounded border border-gray-300">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="border-b border-gray-300 p-2 text-center">NO</th>
              <th className="border-b border-gray-300 p-2 text-center">그룹</th>
              <th className="border-b border-gray-300 p-2 text-center">이름</th>
              <th className="border-b border-gray-300 p-2 text-center">전화번호</th>
              <th className="border-b border-gray-300 p-2 text-center">이메일</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  로딩 중...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              users.map((u, idx) => (
                <tr
                  key={u.custSeq}
                  onClick={() => handleRowClick(u)}
                  className={cn(
                    'cursor-pointer hover:bg-gray-50',
                    selectedUser?.custSeq === u.custSeq && 'bg-blue-100'
                  )}
                >
                  <td className="border-b border-gray-200 p-2 text-center">
                    {users.length - idx}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {u.smsGroupName}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {u.custNm}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {u.custCellNo}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {u.custMailAddr}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <CustUserAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleUserAdd}
        groups={groups}
        selectedGroupNo={selectedGroupNo}
      />

      <CustUserEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUserEdit}
        user={selectedUser}
        groups={groups}
      />
    </>
  )
}
