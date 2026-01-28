import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { accApi } from '../api'
import type { CodeItem } from '@/types'

export type ProcessType = 
  | 'assign'
  | 'moveReq'
  | 'moveApp'
  | 'disuse'
  | 'disuseApp'
  | 'conclusion'
  | 'conclusionApp'
  | 'reject'
  | 'miss'
  | 'missApp'
  | 'caution'
  | 'cautionApp'
  | 'sidoCont'

interface AccidentProcessModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  inciNo: string
  processType: ProcessType
  onSuccess: () => void
}

const PROCESS_TITLES: Record<ProcessType, string> = {
  assign: '담당자 할당',
  moveReq: '이관승인요청',
  moveApp: '이관승인',
  disuse: '폐기승인요청',
  disuseApp: '폐기종결',
  conclusion: '종결',
  conclusionApp: '종결승인',
  reject: '반려',
  miss: '오탐승인요청',
  missApp: '오탐종결',
  caution: '주의관제승인요청',
  cautionApp: '주의관제종결',
  sidoCont: '시도의견',
}

export function AccidentProcessModal({ 
  open, 
  onOpenChange, 
  inciNo, 
  processType, 
  onSuccess 
}: AccidentProcessModalProps) {
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [assignMember, setAssignMember] = useState('')
  const [conclusionType, setConclusionType] = useState('')
  const [members, setMembers] = useState<CodeItem[]>([])
  const [conclusionTypes, setConclusionTypes] = useState<CodeItem[]>([])

  const loadCodes = useCallback(async () => {
    try {
      if (processType === 'assign') {
        const memberList = await accApi.getCommonCode('9999')
        setMembers(memberList)
      }
      if (processType === 'conclusion') {
        const types = await accApi.getCommonCode('3005')
        setConclusionTypes(types)
      }
    } catch (err) {
      console.error('Failed to load codes:', err)
    }
  }, [processType])

  useEffect(() => {
    if (open) {
      setContent('')
      setAssignMember('')
      setConclusionType('')
      loadCodes()
    }
  }, [open, loadCodes])

  const validateForm = (): boolean => {
    if (processType === 'assign' && !assignMember) {
      globalAlert.warning('담당자를 선택해주세요.')
      return false
    }
    if (processType === 'conclusion' && !conclusionType) {
      globalAlert.warning('처리방법을 선택해주세요.')
      return false
    }
    if (!content.trim()) {
      const contentLabels: Record<ProcessType, string> = {
        assign: '할당사유',
        moveReq: '이관사유',
        moveApp: '이관승인사유',
        disuse: '폐기사유',
        disuseApp: '폐기사유',
        conclusion: '종결사유',
        conclusionApp: '종결승인사유',
        reject: '반려사유',
        miss: '오탐사유',
        missApp: '오탐사유',
        caution: '주의관제사유',
        cautionApp: '주의관제사유',
        sidoCont: '시도의견',
      }
      globalAlert.warning(`${contentLabels[processType]}을(를) 입력해주세요.`)
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const params: Record<string, string> = {
        inciNo,
        processType,
        content,
      }
      if (processType === 'assign') {
        params.assignMember = assignMember
      }
      if (processType === 'conclusion') {
        params.conclusionType = conclusionType
      }

      await accApi.processAccident(params)
      globalAlert.success('처리되었습니다.')
      onSuccess()
      onOpenChange(false)
    } catch (err) {
      console.error('Failed to process accident:', err)
      globalAlert.error('처리에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const tableClass = "w-full border-collapse border border-gray-400 text-sm"
  const thClass = "border border-gray-300 bg-gray-100 px-2 py-1.5 text-left font-medium w-[120px]"
  const tdClass = "border border-gray-300 px-2 py-1.5"

  const getContentLabel = (): string => {
    switch (processType) {
      case 'assign': return '할당사유'
      case 'moveReq':
      case 'moveApp': return '이관사유'
      case 'disuse':
      case 'disuseApp': return '폐기사유'
      case 'conclusion':
      case 'conclusionApp': return '종결사유'
      case 'reject': return '반려사유'
      case 'miss':
      case 'missApp': return '오탐사유'
      case 'caution':
      case 'cautionApp': return '주의관제사유'
      case 'sidoCont': return '내용'
      default: return '내용'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{PROCESS_TITLES[processType]}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <table className={tableClass}>
            <tbody>
              {processType === 'assign' && (
                <tr>
                  <th className={thClass}>담당자</th>
                  <td className={tdClass}>
                    <select
                      value={assignMember}
                      onChange={(e) => setAssignMember(e.target.value)}
                      className="w-full h-8 border rounded px-2"
                    >
                      <option value="">선택</option>
                      {members.map(member => (
                        <option key={member.comCode2} value={member.comCode2}>
                          {member.codeName}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              )}

              {(processType === 'disuse' || processType === 'disuseApp') && (
                <tr>
                  <th className={thClass}>처리방법</th>
                  <td className={tdClass}>
                    <Input value="폐기" readOnly className="h-8 bg-gray-50" />
                  </td>
                </tr>
              )}

              {processType === 'conclusion' && (
                <tr>
                  <th className={thClass}>처리방법</th>
                  <td className={tdClass}>
                    <select
                      value={conclusionType}
                      onChange={(e) => setConclusionType(e.target.value)}
                      className="w-full h-8 border rounded px-2"
                    >
                      <option value="">선택</option>
                      {conclusionTypes.map(type => (
                        <option key={type.comCode2} value={type.comCode2}>
                          {type.codeName}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              )}

              <tr>
                <th className={thClass}>{getContentLabel()}</th>
                <td className={tdClass}>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={`${getContentLabel()}을(를) 입력해주세요`}
                    className={`w-full border rounded px-2 py-1 resize-none ${
                      processType === 'sidoCont' ? 'h-60' : 'h-24'
                    }`}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? '처리 중...' : '저장'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
