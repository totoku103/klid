import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { SubPageLayout, PageToolbar, ToolbarButton } from '@/components/templates'
import { engineerApi } from '@/services/api/engineerApi'
import type { AuthGroup, MenuAuthConfig } from '@/types'

export function MenuGrpMgmtPage() {
  const [authGroups, setAuthGroups] = useState<AuthGroup[]>([])
  const [menuGroups, setMenuGroups] = useState<MenuAuthConfig[]>([])
  const [selectedAuthGroup, setSelectedAuthGroup] = useState<AuthGroup | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadAuthGroups = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await engineerApi.getAuthGrpList()
      setAuthGroups(result)
    } catch (err) {
      console.error('Failed to load auth groups:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadMenuGroups = useCallback(async (authGrpCd: string) => {
    try {
      const result = await engineerApi.getMenuGrpList(authGrpCd)
      setMenuGroups(result)
    } catch (err) {
      console.error('Failed to load menu groups:', err)
    }
  }, [])

  useEffect(() => {
    loadAuthGroups()
  }, [loadAuthGroups])

  const handleSelectAuthGroup = (group: AuthGroup) => {
    setSelectedAuthGroup(group)
    loadMenuGroups(group.authGrpCd)
  }

  const handleMenuGroupChange = (
    index: number,
    field: 'readYn' | 'writeYn' | 'delYn',
    value: string
  ) => {
    setMenuGroups((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    )
  }

  const handleSave = async () => {
    if (!selectedAuthGroup) {
      globalAlert.warning('권한그룹을 선택하세요.')
      return
    }
    try {
      await engineerApi.saveMenuGrp(menuGroups)
      globalAlert.success('저장되었습니다.')
    } catch (err) {
      console.error('Failed to save:', err)
      globalAlert.error('저장 중 오류가 발생했습니다.')
    }
  }

  return (
    <SubPageLayout locationPath={['엔지니어', '메뉴그룹 관리']}>
      <div className="mb-2 flex items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2">
        <span className="font-bold text-red-500">※ 권한별 메뉴 설정 ※</span>
      </div>

      <PageToolbar>
        <ToolbarButton icon="save" onClick={handleSave} title="저장" />
      </PageToolbar>

      <div className="flex h-[calc(100%-100px)] gap-4">
        <div className="w-1/3 overflow-auto rounded border border-gray-300">
          <div className="border-b border-gray-300 bg-gray-100 p-2 font-semibold">
            권한그룹
          </div>
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 bg-gray-50">
              <tr>
                <th className="border-b border-gray-300 p-2 text-center">그룹코드</th>
                <th className="border-b border-gray-300 p-2 text-center">그룹명</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={2} className="p-4 text-center text-gray-500">
                    로딩 중...
                  </td>
                </tr>
              ) : authGroups.length === 0 ? (
                <tr>
                  <td colSpan={2} className="p-4 text-center text-gray-500">
                    데이터가 없습니다
                  </td>
                </tr>
              ) : (
                authGroups.map((group) => (
                  <tr
                    key={group.authGrpCd}
                    className={`cursor-pointer hover:bg-gray-50 ${
                      selectedAuthGroup?.authGrpCd === group.authGrpCd
                        ? 'bg-blue-50'
                        : ''
                    }`}
                    onClick={() => handleSelectAuthGroup(group)}
                  >
                    <td className="border-b border-gray-200 p-2 text-center">
                      {group.authGrpCd}
                    </td>
                    <td className="border-b border-gray-200 p-2 text-center">
                      {group.authGrpNm}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="w-2/3 overflow-auto rounded border border-gray-300">
          <div className="border-b border-gray-300 bg-gray-100 p-2 font-semibold">
            메뉴 권한 설정
          </div>
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 bg-gray-50">
              <tr>
                <th className="border-b border-gray-300 p-2 text-center">메뉴코드</th>
                <th className="border-b border-gray-300 p-2 text-center">메뉴명</th>
                <th className="border-b border-gray-300 p-2 text-center w-24">읽기</th>
                <th className="border-b border-gray-300 p-2 text-center w-24">쓰기</th>
                <th className="border-b border-gray-300 p-2 text-center w-24">삭제</th>
              </tr>
            </thead>
            <tbody>
              {menuGroups.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    {selectedAuthGroup
                      ? '데이터가 없습니다'
                      : '권한그룹을 선택하세요'}
                  </td>
                </tr>
              ) : (
                menuGroups.map((item, index) => (
                  <tr key={item.menuCd} className="hover:bg-gray-50">
                    <td className="border-b border-gray-200 p-2 text-center">
                      {item.menuCd}
                    </td>
                    <td className="border-b border-gray-200 p-2 text-center">
                      {item.menuNm}
                    </td>
                    <td className="border-b border-gray-200 p-2 text-center">
                      <input
                        type="checkbox"
                        checked={item.readYn === 'Y'}
                        onChange={(e) =>
                          handleMenuGroupChange(
                            index,
                            'readYn',
                            e.target.checked ? 'Y' : 'N'
                          )
                        }
                      />
                    </td>
                    <td className="border-b border-gray-200 p-2 text-center">
                      <input
                        type="checkbox"
                        checked={item.writeYn === 'Y'}
                        onChange={(e) =>
                          handleMenuGroupChange(
                            index,
                            'writeYn',
                            e.target.checked ? 'Y' : 'N'
                          )
                        }
                      />
                    </td>
                    <td className="border-b border-gray-200 p-2 text-center">
                      <input
                        type="checkbox"
                        checked={item.delYn === 'Y'}
                        onChange={(e) =>
                          handleMenuGroupChange(
                            index,
                            'delYn',
                            e.target.checked ? 'Y' : 'N'
                          )
                        }
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </SubPageLayout>
  )
}
