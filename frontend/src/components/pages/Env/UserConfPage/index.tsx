import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { globalConfirm } from '@/utils/confirm'
import { globalPrompt } from '@/utils/prompt'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { useUserStore } from '@/stores/userStore'
import { envApi } from '@/services/api/envApi'
import type { UserAddress } from '@/types'
import { cn } from '@/lib/utils'

export function UserConfPage() {
  const { user } = useUserStore()
  const [activeTab, setActiveTab] = useState<'password' | 'address'>('password')
  const [addresses, setAddresses] = useState<UserAddress[]>([])
  const [selectedAddr, setSelectedAddr] = useState<UserAddress | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const loadAddresses = useCallback(async () => {
    if (!user) return
    setIsLoading(true)
    try {
      const data = await envApi.getUserAddressList(user.userId)
      setAddresses(data)
    } catch (err) {
      console.error('Failed to load addresses:', err)
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (activeTab === 'address') {
      loadAddresses()
    }
  }, [activeTab, loadAddresses])

  const handlePasswordChange = useCallback(() => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      globalAlert.warning('모든 필드를 입력해주세요.')
      return
    }
    if (newPassword !== confirmPassword) {
      globalAlert.warning('새 비밀번호가 일치하지 않습니다.')
      return
    }
    if (newPassword.length < 8) {
      globalAlert.warning('비밀번호는 8자 이상이어야 합니다.')
      return
    }
    // TODO: API call
    globalAlert.info('비밀번호 변경 기능은 추후 구현 예정입니다.')
  }, [currentPassword, newPassword, confirmPassword])

  const handleAddrAdd = useCallback(async () => {
    if (!user) return

    const addrName = await globalPrompt('이름을 입력하세요:')
    if (!addrName) return

    const addrEmail = await globalPrompt('이메일을 입력하세요:')
    if (!addrEmail) return

    const addrTel = await globalPrompt('전화번호를 입력하세요:')

    try {
      await envApi.addUserAddress({
        userId: user.userId,
        addrName,
        addrEmail,
        addrTel: addrTel ?? '',
        addrMemo: '',
      })
      globalAlert.success('주소가 추가되었습니다.')
      loadAddresses()
    } catch {
      globalAlert.error('주소 추가에 실패했습니다.')
    }
  }, [user, loadAddresses])

  const handleAddrEdit = useCallback(async () => {
    if (!selectedAddr) {
      globalAlert.warning('주소를 선택해주세요.')
      return
    }

    const addrName = await globalPrompt('이름을 입력하세요:', selectedAddr.addrName)
    if (!addrName) return

    const addrEmail = await globalPrompt('이메일을 입력하세요:', selectedAddr.addrEmail)
    if (!addrEmail) return

    const addrTel = await globalPrompt('전화번호를 입력하세요:', selectedAddr.addrTel)

    try {
      await envApi.updateUserAddress({
        ...selectedAddr,
        addrName,
        addrEmail,
        addrTel: addrTel ?? '',
      })
      globalAlert.success('주소가 수정되었습니다.')
      loadAddresses()
    } catch {
      globalAlert.error('주소 수정에 실패했습니다.')
    }
  }, [selectedAddr, loadAddresses])

  const handleAddrDelete = useCallback(async () => {
    if (!selectedAddr) {
      globalAlert.warning('주소를 선택해주세요.')
      return
    }
    if (!await globalConfirm('선택한 주소를 삭제하시겠습니까?')) return

    try {
      await envApi.deleteUserAddress(selectedAddr.addrSeq)
      globalAlert.success('삭제되었습니다.')
      setSelectedAddr(null)
      loadAddresses()
    } catch {
      globalAlert.error('삭제에 실패했습니다.')
    }
  }, [selectedAddr, loadAddresses])

  return (
    <>
      <div className="mb-4 flex border-b border-gray-300">
        <button
          className={cn(
            'px-4 py-2 text-sm',
            activeTab === 'password'
              ? 'border-b-2 border-blue-500 font-medium text-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          )}
          onClick={() => setActiveTab('password')}
        >
          비밀번호 변경
        </button>
        <button
          className={cn(
            'px-4 py-2 text-sm',
            activeTab === 'address'
              ? 'border-b-2 border-blue-500 font-medium text-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          )}
          onClick={() => setActiveTab('address')}
        >
          주소록 관리
        </button>
      </div>

      {activeTab === 'password' && (
        <div className="mx-auto max-w-md rounded border border-gray-300 bg-white p-6">
          <h3 className="mb-4 text-lg font-medium">비밀번호 변경</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">현재 비밀번호</label>
              <input
                type="password"
                className="w-full rounded border border-gray-300 px-3 py-2"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">새 비밀번호</label>
              <input
                type="password"
                className="w-full rounded border border-gray-300 px-3 py-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">8자 이상 입력해주세요</p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">새 비밀번호 확인</label>
              <input
                type="password"
                className="w-full rounded border border-gray-300 px-3 py-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
              onClick={handlePasswordChange}
            >
              비밀번호 변경
            </button>
          </div>
        </div>
      )}

      {activeTab === 'address' && (
        <>
          <PageToolbar>
            <ToolbarButton icon="add" onClick={handleAddrAdd} title="추가" />
            <ToolbarButton icon="edit" onClick={handleAddrEdit} title="수정" />
            <ToolbarButton icon="delete" onClick={handleAddrDelete} title="삭제" />
          </PageToolbar>

          <div className="h-[calc(100%-130px)] overflow-auto rounded border border-gray-300">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  <th className="border-b border-gray-300 p-2 text-center">NO</th>
                  <th className="border-b border-gray-300 p-2 text-center">이름</th>
                  <th className="border-b border-gray-300 p-2 text-center">이메일</th>
                  <th className="border-b border-gray-300 p-2 text-center">전화번호</th>
                  <th className="border-b border-gray-300 p-2 text-center">메모</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-500">
                      로딩 중...
                    </td>
                  </tr>
                ) : addresses.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-500">
                      데이터가 없습니다
                    </td>
                  </tr>
                ) : (
                  addresses.map((addr, idx) => (
                    <tr
                      key={addr.addrSeq}
                      onClick={() => setSelectedAddr(addr)}
                      className={cn(
                        'cursor-pointer hover:bg-gray-50',
                        selectedAddr?.addrSeq === addr.addrSeq && 'bg-blue-100'
                      )}
                    >
                      <td className="border-b border-gray-200 p-2 text-center">
                        {addresses.length - idx}
                      </td>
                      <td className="border-b border-gray-200 p-2 text-center">
                        {addr.addrName}
                      </td>
                      <td className="border-b border-gray-200 p-2 text-center">
                        {addr.addrEmail}
                      </td>
                      <td className="border-b border-gray-200 p-2 text-center">
                        {addr.addrTel}
                      </td>
                      <td className="border-b border-gray-200 p-2 text-center">
                        {addr.addrMemo || '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}
