import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { accApi } from '@/services/api/accApi'
import type { Incident, CodeItem } from '@/types'

interface AccidentEditModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  inciNo: string
  onSuccess: () => void
}

export function AccidentEditModal({ open, onOpenChange, inciNo, onSuccess }: AccidentEditModalProps) {
  const [incident, setIncident] = useState<Incident | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    inciTtl: '',
    inciDttNm: '',
    dmgCrgr: '',
    dmgDept: '',
    dmgSvrUsrNm: '',
    dmgEmail: '',
    osNm: '',
    attRemarks: '',
    inciDclCont: '',
    inciInvsCont: '',
    accdTypCd: '',
  })
  const [codes, setCodes] = useState<{
    accdTypCd: CodeItem[]
  }>({
    accdTypCd: [],
  })

  const loadDetail = useCallback(async () => {
    if (!inciNo) return
    setLoading(true)
    try {
      const [data, accdTypCd] = await Promise.all([
        accApi.getAccidentDetail(inciNo),
        accApi.getCommonCode('3002'),
      ])
      setIncident(data)
      setCodes({ accdTypCd })
      setFormData({
        inciTtl: data.inciTtl || '',
        inciDttNm: data.inciDttNm || '',
        dmgCrgr: data.dmgCrgr || '',
        dmgDept: data.dmgDept || '',
        dmgSvrUsrNm: data.dmgSvrUsrNm || '',
        dmgEmail: data.dmgEmail || '',
        osNm: data.osNm || '',
        attRemarks: data.attRemarks || '',
        inciDclCont: data.inciDclCont || '',
        inciInvsCont: data.inciInvsCont || '',
        accdTypCd: data.accdTypCd || '',
      })
    } catch (err) {
      console.error('Failed to load incident detail:', err)
      globalAlert.error('침해사고 상세정보를 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }, [inciNo])

  useEffect(() => {
    if (open && inciNo) {
      loadDetail()
    }
  }, [open, inciNo, loadDetail])

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  const validateForm = (): boolean => {
    if (!formData.inciTtl.trim()) {
      globalAlert.warning('사고제목을 입력해주세요.')
      return false
    }
    if (!formData.inciDclCont.trim()) {
      globalAlert.warning('사고내용을 입력해주세요.')
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!validateForm() || !incident) return

    setSaving(true)
    try {
      await accApi.updateAccident({
        inciNo: incident.inciNo,
        ...formData,
      })
      globalAlert.success('수정되었습니다.')
      onSuccess()
      onOpenChange(false)
    } catch (err) {
      console.error('Failed to update accident:', err)
      globalAlert.error('수정에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return ''
    if (dateStr.length >= 14) {
      return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)} ${dateStr.slice(8, 10)}:${dateStr.slice(10, 12)}`
    }
    if (dateStr.length === 8) {
      return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`
    }
    return dateStr
  }

  const sectionTitleClass = "flex items-center gap-2 font-medium text-sm mb-2 mt-4 first:mt-0"
  const tableClass = "w-full border-collapse border border-gray-400 text-sm"
  const thClass = "border border-gray-300 bg-gray-100 px-2 py-1.5 text-left font-medium w-[120px]"
  const tdClass = "border border-gray-300 px-2 py-1.5"
  const readOnlyClass = "w-full bg-transparent border-none text-sm"

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl">
          <div className="flex items-center justify-center py-8">로딩 중...</div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!incident) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>침해사고 수정</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className={sectionTitleClass}>
            <img src="/img/MainImg/customer_bullet.png" alt="" className="w-3 h-3" />
            기본정보
          </div>
          <table className={tableClass}>
            <tbody>
              <tr>
                <th className={thClass}>사고일자</th>
                <td className={tdClass}>
                  <span className={readOnlyClass}>{formatDate(incident.inciDt)}</span>
                </td>
                <th className={thClass}>접수번호</th>
                <td className={tdClass}>
                  <span className={readOnlyClass}>{incident.inciNo}</span>
                </td>
              </tr>
              <tr>
                <th className={thClass}>사고제목(*)</th>
                <td className={tdClass}>
                  <Input
                    value={formData.inciTtl}
                    onChange={handleChange('inciTtl')}
                    placeholder="사고제목을 입력해주세요"
                    className="h-8"
                    maxLength={100}
                  />
                </td>
                <th className={thClass}>탐지명</th>
                <td className={tdClass}>
                  <Input
                    value={formData.inciDttNm}
                    onChange={handleChange('inciDttNm')}
                    placeholder="탐지명을 입력해주세요"
                    className="h-8"
                    maxLength={100}
                  />
                </td>
              </tr>
              <tr>
                <th className={thClass}>접수방법</th>
                <td className={tdClass}>
                  <span className={readOnlyClass}>{incident.acpnMthdName}</span>
                </td>
                <th className={thClass}>침해등급</th>
                <td className={tdClass}>
                  <span className={readOnlyClass}>{incident.riskLevelName}</span>
                </td>
              </tr>
              <tr>
                <th className={thClass}>우선순위</th>
                <td colSpan={3} className={tdClass}>
                  <span className={readOnlyClass}>{incident.inciPrtyName}</span>
                </td>
              </tr>
            </tbody>
          </table>

          <div className={sectionTitleClass}>
            <img src="/img/MainImg/customer_bullet.png" alt="" className="w-3 h-3" />
            신고기관 정보
          </div>
          <table className={tableClass}>
            <tbody>
              <tr>
                <th className={thClass}>신고기관</th>
                <td className={tdClass}>
                  <span className={readOnlyClass}>{incident.dclInstName}</span>
                </td>
                <th className={thClass}>비고</th>
                <td className={tdClass}>
                  <span className={readOnlyClass}>{incident.remarksName}</span>
                </td>
              </tr>
              <tr>
                <th className={thClass}>담당자</th>
                <td className={tdClass}>
                  <span className={readOnlyClass}>{incident.dclCrgr}</span>
                </td>
                <th className={thClass}>전화번호</th>
                <td className={tdClass}>
                  <span className={readOnlyClass}>{incident.dclTelNo}</span>
                </td>
              </tr>
              <tr>
                <th className={thClass}>전자우편</th>
                <td colSpan={3} className={tdClass}>
                  <span className={readOnlyClass}>{incident.dclEmail}</span>
                </td>
              </tr>
            </tbody>
          </table>

          <div className={sectionTitleClass}>
            <img src="/img/MainImg/customer_bullet.png" alt="" className="w-3 h-3" />
            사고(피해)시스템 정보
          </div>
          <table className={tableClass}>
            <tbody>
              <tr>
                <th className={thClass}>피해기관</th>
                <td className={tdClass}>
                  <span className={readOnlyClass}>{incident.dmgInstName}</span>
                </td>
                <th className={thClass}>사고유형</th>
                <td className={tdClass}>
                  <select
                    value={formData.accdTypCd}
                    onChange={handleChange('accdTypCd')}
                    className="w-full h-8 border rounded px-2"
                  >
                    <option value="">선택</option>
                    {codes.accdTypCd.map(code => (
                      <option key={code.comCode2} value={code.comCode2}>{code.codeName}</option>
                    ))}
                  </select>
                </td>
                <th className={thClass}>피해국가</th>
                <td className={tdClass}>
                  <span className={readOnlyClass}>{incident.dmgNatnNm || '한국'}</span>
                </td>
              </tr>
              <tr>
                <th className={thClass}>담당자</th>
                <td className={tdClass}>
                  <Input
                    value={formData.dmgCrgr}
                    onChange={handleChange('dmgCrgr')}
                    placeholder="담당자를 입력해주세요"
                    className="h-8"
                  />
                </td>
                <th className={thClass}>부서명</th>
                <td className={tdClass}>
                  <Input
                    value={formData.dmgDept}
                    onChange={handleChange('dmgDept')}
                    placeholder="부서명을 입력해주세요"
                    className="h-8"
                  />
                </td>
                <th className={thClass}>호스트용도</th>
                <td className={tdClass}>
                  <Input
                    value={formData.dmgSvrUsrNm}
                    onChange={handleChange('dmgSvrUsrNm')}
                    placeholder="호스트용도를 입력해주세요"
                    className="h-8"
                  />
                </td>
              </tr>
              <tr>
                <th className={thClass}>전화번호</th>
                <td className={tdClass}>
                  <span className={readOnlyClass}>{incident.dmgTelNo}</span>
                </td>
                <th className={thClass}>전자우편</th>
                <td className={tdClass}>
                  <Input
                    value={formData.dmgEmail}
                    onChange={handleChange('dmgEmail')}
                    placeholder="이메일주소를 입력해주세요"
                    className="h-8"
                  />
                </td>
                <th className={thClass}>운영체제명</th>
                <td className={tdClass}>
                  <Input
                    value={formData.osNm}
                    onChange={handleChange('osNm')}
                    placeholder="OS 종류를 입력해 주세요"
                    className="h-8"
                  />
                </td>
              </tr>
              <tr>
                <th className={thClass}>IP주소</th>
                <td colSpan={5} className={tdClass}>
                  <span className={readOnlyClass}>
                    {incident.dmgIpList?.join(', ') || incident.dmgIp}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <div className={sectionTitleClass}>
            <img src="/img/MainImg/customer_bullet.png" alt="" className="w-3 h-3" />
            공격시스템정보
          </div>
          <table className={tableClass}>
            <tbody>
              <tr>
                <th className={thClass}>공격국가</th>
                <td className={tdClass}>
                  <span className={readOnlyClass}>{incident.attNatnNm}</span>
                </td>
                <th className={thClass}>IP주소</th>
                <td className={tdClass}>
                  <span className={readOnlyClass}>
                    {incident.attIpList?.join(', ') || incident.attIp}
                  </span>
                </td>
                <th className={thClass}>비고</th>
                <td className={tdClass}>
                  <Input
                    value={formData.attRemarks}
                    onChange={handleChange('attRemarks')}
                    placeholder="기타정보를 입력해주세요"
                    className="h-8"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className={sectionTitleClass}>
            <img src="/img/MainImg/customer_bullet.png" alt="" className="w-3 h-3" />
            사고/조사 내용
          </div>
          <table className={tableClass}>
            <tbody>
              <tr>
                <th className={thClass}>사고내용(*)</th>
                <td className={tdClass}>
                  <textarea
                    value={formData.inciDclCont}
                    onChange={handleChange('inciDclCont')}
                    placeholder="피해시간, 피해현황, 사고원인, 자료유출 여부, 개인정보 보유여부 등 시스템 피해현황을 입력해주세요"
                    className="w-full h-40 border rounded px-2 py-1 resize-none"
                  />
                </td>
              </tr>
              <tr>
                <th className={thClass}>조치내용</th>
                <td className={tdClass}>
                  <textarea
                    value={formData.inciInvsCont}
                    onChange={handleChange('inciInvsCont')}
                    placeholder="방화벽차단 여부(시간), 네트워크 격리여부(시간), 시스템 분석 결과 등 조치사항을 입력해주세요"
                    className="w-full h-40 border rounded px-2 py-1 resize-none"
                  />
                </td>
              </tr>
              <tr>
                <th className={thClass}>시도의견</th>
                <td className={tdClass}>
                  <div className="whitespace-pre-wrap min-h-[100px] p-2 bg-gray-50 rounded">
                    {incident.inciBelowCont || '(입력된 의견 없음)'}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? '저장 중...' : '저장'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
