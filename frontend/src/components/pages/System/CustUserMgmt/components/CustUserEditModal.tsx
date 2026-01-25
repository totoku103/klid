import { useState, useCallback, useEffect } from 'react'
import { globalAlert } from '@/utils/alert'
import { Modal } from '@/components/organisms'
import { Input } from '@/components/atoms/Input'
import { Label } from '@/components/atoms/Label'
import { Button } from '@/components/ui/button'
import type { CustUser, SmsGroup } from '@/types'

export interface CustUserEditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: CustUser) => void
  user: CustUser | null
  groups: SmsGroup[]
}

const handleOpenChange = (onClose: () => void) => (open: boolean) => {
  if (!open) onClose()
}

export function CustUserEditModal({
  isOpen,
  onClose,
  onSave,
  user,
  groups,
}: CustUserEditModalProps) {
  const [formData, setFormData] = useState<CustUser | null>(null)

  useEffect(() => {
    if (user) {
      setFormData({ ...user })
    }
  }, [user])

  const handleChange = useCallback(
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (!formData) return
      setFormData((prev) =>
        prev
          ? {
              ...prev,
              [field]:
                field === 'smsGroupSeq' ? Number(e.target.value) : e.target.value,
            }
          : null
      )
    },
    [formData]
  )

  const handleSave = useCallback(() => {
    if (!formData) return
    if (!formData.custNm.trim()) {
      globalAlert.warning('이름을 입력해주세요.')
      return
    }
    if (!formData.custCellNo.trim()) {
      globalAlert.warning('전화번호를 입력해주세요.')
      return
    }
    onSave(formData)
  }, [formData, onSave])

  const flattenGroups = (items: SmsGroup[]): { grpNo: number; smsNm: string }[] => {
    const result: { grpNo: number; smsNm: string }[] = []
    const flatten = (list: SmsGroup[], prefix = '') => {
      for (const item of list) {
        result.push({ grpNo: item.grpNo, smsNm: prefix + item.smsNm })
        if (item.children) {
          flatten(item.children, prefix + '  ')
        }
      }
    }
    flatten(items)
    return result
  }

  const flatGroups = flattenGroups(groups)

  if (!formData) return null

  return (
    <Modal open={isOpen} onOpenChange={handleOpenChange(onClose)} title="사용자 수정" size="sm">
      <div className="space-y-4">
        <div>
          <Label>그룹</Label>
          <select
            value={formData.smsGroupSeq}
            onChange={handleChange('smsGroupSeq')}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
          >
            {flatGroups.map((g) => (
              <option key={g.grpNo} value={g.grpNo}>
                {g.smsNm}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label>이름</Label>
          <Input
            value={formData.custNm}
            onChange={handleChange('custNm')}
            placeholder="이름을 입력하세요"
            className="mt-1"
          />
        </div>
        <div>
          <Label>전화번호</Label>
          <Input
            value={formData.custCellNo}
            onChange={handleChange('custCellNo')}
            placeholder="010-0000-0000"
            className="mt-1"
          />
        </div>
        <div>
          <Label>이메일</Label>
          <Input
            value={formData.custMailAddr}
            onChange={handleChange('custMailAddr')}
            placeholder="email@example.com"
            className="mt-1"
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button onClick={handleSave}>저장</Button>
        </div>
      </div>
    </Modal>
  )
}
