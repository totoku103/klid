import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { engineerApi } from '@/services/api/engineerApi'
import type { DefaultGroup } from '@/types'

const emptyGroup: Partial<DefaultGroup> = {
  grpCd: '',
  grpNm: '',
  grpType: '',
  grpLevel: 1,
  pntGrpCd: '',
  useYn: 'Y',
}

export function DefGrpConfPage() {
  const [treeData, setTreeData] = useState<DefaultGroup[]>([])
  const [newGroups, setNewGroups] = useState<Partial<DefaultGroup>[]>([])
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [selectedGroup, setSelectedGroup] = useState<DefaultGroup | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await engineerApi.getDefGrpTree()
      setTreeData(result)
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const toggleNode = (grpCd: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(grpCd)) {
        newSet.delete(grpCd)
      } else {
        newSet.add(grpCd)
      }
      return newSet
    })
  }

  const renderTreeNode = (node: DefaultGroup, level: number = 0): React.ReactNode => {
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = expandedNodes.has(node.grpCd)
    const isSelected = selectedGroup?.grpCd === node.grpCd

    return (
      <div key={node.grpCd}>
        <div
          className={`flex cursor-pointer items-center gap-1 py-1 hover:bg-gray-100 ${
            isSelected ? 'bg-blue-100' : ''
          }`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => setSelectedGroup(node)}
        >
          {hasChildren ? (
            <button
              type="button"
              className="h-4 w-4 text-xs"
              onClick={(e) => {
                e.stopPropagation()
                toggleNode(node.grpCd)
              }}
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          ) : (
            <span className="h-4 w-4" />
          )}
          <span className="text-sm">{node.grpNm}</span>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map((child) => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const handleAddNewRow = () => {
    setNewGroups((prev) => [
      ...prev,
      { ...emptyGroup, pntGrpCd: selectedGroup?.grpCd || '' },
    ])
  }

  const handleNewGroupChange = (
    index: number,
    field: keyof DefaultGroup,
    value: string | number
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
        if (group.grpCd && group.grpNm) {
          await engineerApi.addDefGrp(group)
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
    <>
      <div className="mb-2 flex items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2">
        <span className="font-bold text-red-500">
          ※ 다중등록시 그룹명 중복체크를 하지 않습니다. ※
        </span>
      </div>

      <PageToolbar>
        <ToolbarButton icon="save" onClick={handleSave} title="저장" />
      </PageToolbar>

      <div className="flex h-[calc(100%-100px)] gap-4">
        <div className="w-1/3 overflow-auto rounded border border-gray-300">
          <div className="border-b border-gray-300 bg-gray-100 p-2 font-semibold">
            그룹 트리
          </div>
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">로딩 중...</div>
          ) : treeData.length === 0 ? (
            <div className="p-4 text-center text-gray-500">데이터가 없습니다</div>
          ) : (
            <div className="p-2">{treeData.map((node) => renderTreeNode(node))}</div>
          )}
        </div>

        <div className="w-2/3 overflow-auto rounded border border-gray-300">
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
                <th className="border-b border-gray-300 p-2 text-center">그룹유형</th>
                <th className="border-b border-gray-300 p-2 text-center">레벨</th>
                <th className="border-b border-gray-300 p-2 text-center">상위그룹</th>
                <th className="border-b border-gray-300 p-2 text-center">사용여부</th>
                <th className="border-b border-gray-300 p-2 text-center w-16">삭제</th>
              </tr>
            </thead>
            <tbody>
              {newGroups.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
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
                        value={group.grpCd || ''}
                        onChange={(e) =>
                          handleNewGroupChange(index, 'grpCd', e.target.value)
                        }
                      />
                    </td>
                    <td className="border-b border-gray-200 p-2">
                      <input
                        type="text"
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                        value={group.grpNm || ''}
                        onChange={(e) =>
                          handleNewGroupChange(index, 'grpNm', e.target.value)
                        }
                      />
                    </td>
                    <td className="border-b border-gray-200 p-2">
                      <input
                        type="text"
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                        value={group.grpType || ''}
                        onChange={(e) =>
                          handleNewGroupChange(index, 'grpType', e.target.value)
                        }
                      />
                    </td>
                    <td className="border-b border-gray-200 p-2">
                      <input
                        type="number"
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                        value={group.grpLevel || 1}
                        onChange={(e) =>
                          handleNewGroupChange(
                            index,
                            'grpLevel',
                            parseInt(e.target.value, 10) || 1
                          )
                        }
                      />
                    </td>
                    <td className="border-b border-gray-200 p-2">
                      <input
                        type="text"
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                        value={group.pntGrpCd || ''}
                        onChange={(e) =>
                          handleNewGroupChange(index, 'pntGrpCd', e.target.value)
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
    </>
  )
}
