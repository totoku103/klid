import { useState, useCallback } from 'react'
import type { SmsGroup } from '@/types'
import { cn } from '@/lib/utils'

export interface SmsGroupTreeProps {
  groups: SmsGroup[]
  selectedGroupNo: number | null
  onSelect: (group: SmsGroup) => void
  onAdd: () => void
  onEdit: (group: SmsGroup) => void
}

interface TreeNodeProps {
  group: SmsGroup
  level: number
  selectedGroupNo: number | null
  onSelect: (group: SmsGroup) => void
}

function TreeNode({ group, level, selectedGroupNo, onSelect }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const hasChildren = group.children && group.children.length > 0
  const isSelected = selectedGroupNo === group.grpNo

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded((prev) => !prev)
  }, [])

  const handleSelect = useCallback(() => {
    onSelect(group)
  }, [group, onSelect])

  return (
    <div>
      <div
        className={cn(
          'flex cursor-pointer items-center gap-1 px-2 py-1.5 hover:bg-gray-100',
          isSelected && 'bg-blue-100 font-semibold'
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleSelect}
      >
        {hasChildren ? (
          <button
            onClick={handleToggle}
            className="flex h-4 w-4 items-center justify-center text-xs text-gray-500"
            type="button"
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        ) : (
          <span className="h-4 w-4" />
        )}
        <span className="text-sm">{group.smsNm}</span>
      </div>
      {hasChildren && isExpanded && (
        <div>
          {group.children!.map((child) => (
            <TreeNode
              key={child.grpNo}
              group={child}
              level={level + 1}
              selectedGroupNo={selectedGroupNo}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function SmsGroupTree({
  groups,
  selectedGroupNo,
  onSelect,
  onAdd,
  onEdit,
}: SmsGroupTreeProps) {
  const selectedGroup = findGroupByNo(groups, selectedGroupNo)

  const handleEdit = useCallback(() => {
    if (selectedGroup) {
      onEdit(selectedGroup)
    }
  }, [selectedGroup, onEdit])

  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-end gap-1 border-b border-gray-200 p-2">
        <button
          onClick={onAdd}
          className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 bg-white text-sm hover:bg-gray-100"
          title="그룹 추가"
          type="button"
        >
          +
        </button>
        <button
          onClick={handleEdit}
          disabled={!selectedGroup || selectedGroup.grpNo === 1}
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded border border-gray-300 bg-white text-sm',
            !selectedGroup || selectedGroup.grpNo === 1
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-gray-100'
          )}
          title="그룹 수정"
          type="button"
        >
          ✎
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        {groups.map((group) => (
          <TreeNode
            key={group.grpNo}
            group={group}
            level={0}
            selectedGroupNo={selectedGroupNo}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}

function findGroupByNo(
  groups: SmsGroup[],
  grpNo: number | null
): SmsGroup | null {
  if (grpNo === null) return null

  for (const group of groups) {
    if (group.grpNo === grpNo) return group
    if (group.children) {
      const found = findGroupByNo(group.children, grpNo)
      if (found) return found
    }
  }
  return null
}
