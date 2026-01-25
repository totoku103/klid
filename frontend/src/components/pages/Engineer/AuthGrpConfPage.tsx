import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { SubPageLayout, PageToolbar, ToolbarButton } from '@/components/templates'
import { engineerApi } from '@/services/api/engineerApi'
import type { AuthGroup } from '@/types'

const emptyAuthGroup: Partial<AuthGroup> = {
  authGrpCd: '',
  authGrpNm: '',
  authGrpDesc: '',
  useYn: 'Y',
}

export function AuthGrpConfPage() {
  const [authGroups, setAuthGroups] = useState<AuthGroup[]>([])
  const [newGroups, setNewGroups] = useState<Partial<AuthGroup>[]>([])
  const [selectedGroup, setSelectedGroup] = useState<AuthGroup | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await engineerApi.getAuthGrpList()
      setAuthGroups(result)
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleSelectGroup = (group: AuthGroup) => {
    setSelectedGroup(group)
  }

  const handleAddNewRow = () => {
    setNewGroups((prev) => [...prev, { ...emptyAuthGroup }])
  }

  const handleNewGroupChange = (
    index: number,
    field: keyof AuthGroup,
    value: string
  ) => {
    setNewGroups((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    )
  }

  const handleRemoveNewRow = (index: number) => {
    setNewGroups((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    try {
      for (const group of newGroups) {
        if (group.authGrpCd && group.authGrpNm) {
          await engineerApi.addAuthGrp(group)
        }
      }
      globalAlert.success('저장되었습니다.')
      setNewGroups([])
      loadData()
    } catch (err) {
      console.error('Failed to save:', err)
      globalAlert.error('저장 중 오류가 발생했습니다.')
    }
  }

  return (
    <SubPageLayout locationPath={['엔지니어', '권한그룹 관리']}>
      <div className="mb-2 flex items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2">
        <span className="font-bold text-red-500">
          ※ 다중등록시 그룹명 중복체크를 하지 않습니다. ※
        </span>
      </div>

      <PageToolbar>
        <ToolbarButton icon="save" onClick={handleSave} title="저장" />
      </PageToolbar>

      <div className="flex h-[calc(100%-100px)] gap-4">
        <div className="w-1/2 overflow-auto rounded border border-gray-300">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <th className="border-b border-gray-300 p-2 text-center">그룹코드</th>
                <th className="border-b border-gray-300 p-2 text-center">그룹명</th>
                <th className="border-b border-gray-300 p-2 text-center">설명</th>
                <th className="border-b border-gray-300 p-2 text-center">사용여부</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    로딩 중...
                  </td>
                </tr>
              ) : authGroups.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    데이터가 없습니다
                  </td>
                </tr>
              ) : (
                authGroups.map((group) => (
                  <tr
                    key={group.authGrpCd}
                    className={`cursor-pointer hover:bg-gray-50 ${
                      selectedGroup?.authGrpCd === group.authGrpCd
                        ? 'bg-blue-50'
                        : ''
                    }`}
                    onClick={() => handleSelectGroup(group)}
                  >
                    <td className="border-b border-gray-200 p-2 text-center">
                      {group.authGrpCd}
                    </td>
                    <td className="border-b border-gray-200 p-2 text-center">
                      {group.authGrpNm}
                    </td>
                    <td className="border-b border-gray-200 p-2 text-center">
                      {group.authGrpDesc}
                    </td>
                    <td className="border-b border-gray-200 p-2 text-center">
                      {group.useYn === 'Y' ? '사용' : '미사용'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="w-1/2 overflow-auto rounded border border-gray-300">
          <div className="flex items-center justify-between border-b border-gray-300 bg-gray-100 p-2">
            <span className="font-semibold">신규 등록</span>
            <button
              type="button"
              className="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
              onClick={handleAddNewRow}
            >
              + 행 추가
            </button>
          </div>
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-b border-gray-300 p-2 text-center">그룹코드</th>
                <th className="border-b border-gray-300 p-2 text-center">그룹명</th>
                <th className="border-b border-gray-300 p-2 text-center">설명</th>
                <th className="border-b border-gray-300 p-2 text-center">사용여부</th>
                <th className="border-b border-gray-300 p-2 text-center w-16">삭제</th>
              </tr>
            </thead>
            <tbody>
              {newGroups.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    행 추가 버튼을 클릭하여 새 그룹을 추가하세요
                  </td>
                </tr>
              ) : (
                newGroups.map((group, index) => (
                  <tr key={index}>
                    <td className="border-b border-gray-200 p-2">
                      <input
                        type="text"
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                        value={group.authGrpCd || ''}
                        onChange={(e) =>
                          handleNewGroupChange(index, 'authGrpCd', e.target.value)
                        }
                      />
                    </td>
                    <td className="border-b border-gray-200 p-2">
                      <input
                        type="text"
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                        value={group.authGrpNm || ''}
                        onChange={(e) =>
                          handleNewGroupChange(index, 'authGrpNm', e.target.value)
                        }
                      />
                    </td>
                    <td className="border-b border-gray-200 p-2">
                      <input
                        type="text"
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                        value={group.authGrpDesc || ''}
                        onChange={(e) =>
                          handleNewGroupChange(index, 'authGrpDesc', e.target.value)
                        }
                      />
                    </td>
                    <td className="border-b border-gray-200 p-2">
                      <select
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                        value={group.useYn || 'Y'}
                        onChange={(e) =>
                          handleNewGroupChange(index, 'useYn', e.target.value)
                        }
                      >
                        <option value="Y">사용</option>
                        <option value="N">미사용</option>
                      </select>
                    </td>
                    <td className="border-b border-gray-200 p-2 text-center">
                      <button
                        type="button"
                        className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                        onClick={() => handleRemoveNewRow(index)}
                      >
                        삭제
                      </button>
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
