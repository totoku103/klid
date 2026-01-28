import { useState, useEffect, useCallback } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { accApi } from '@/services/api/accApi'
import { useUserStore } from '@/stores/userStore'
import { globalAlert } from '@/utils/alert'
import type { CodeItem } from '@/types'

interface AccidentAddModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

interface AccidentFormData {
  inciDt: string
  inciDtHH: string
  inciDtMM: string
  inciTtl: string
  inciDttNm: string
  inciPrty: string
  netDiv: string
  acpnMthd: string
  riskLevel: string
  remarks: string
  dmgInstCd: string
  accdTypCd: string
  dmgCrgr: string
  dmgDept: string
  dmgSvrUsrNm: string
  dmgTelNo1: string
  dmgTelNo2: string
  dmgTelNo3: string
  dmgEmail: string
  osNm: string
  dmgIp: string
  attIp: string
  attRemarks: string
  inciDclCont: string
  inciInvsCont: string
}

const initialFormData: AccidentFormData = {
  inciDt: new Date().toISOString().split('T')[0],
  inciDtHH: String(new Date().getHours()).padStart(2, '0'),
  inciDtMM: String(new Date().getMinutes()).padStart(2, '0'),
  inciTtl: '',
  inciDttNm: '',
  inciPrty: '2',
  netDiv: '0',
  acpnMthd: '10',
  riskLevel: '1',
  remarks: '0',
  dmgInstCd: '',
  accdTypCd: '',
  dmgCrgr: '',
  dmgDept: '',
  dmgSvrUsrNm: '',
  dmgTelNo1: '02',
  dmgTelNo2: '',
  dmgTelNo3: '',
  dmgEmail: '',
  osNm: '',
  dmgIp: '',
  attIp: '',
  attRemarks: '',
  inciDclCont: '',
  inciInvsCont: '',
}

const AREA_CODES = ['02', '031', '032', '033', '041', '042', '043', '044', '051', '052', '053', '054', '055', '061', '062', '063', '064', '070']

export function AccidentAddModal({ open, onOpenChange, onSuccess }: AccidentAddModalProps) {
  const { user } = useUserStore()
  const [formData, setFormData] = useState<AccidentFormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [codes, setCodes] = useState<{
    priority: CodeItem[]
    netDiv: CodeItem[]
    acpnMthd: CodeItem[]
    riskLevel: CodeItem[]
    remarks: CodeItem[]
    accdTypCd: CodeItem[]
  }>({
    priority: [],
    netDiv: [],
    acpnMthd: [],
    riskLevel: [],
    remarks: [],
    accdTypCd: [],
  })

  const loadCodes = useCallback(async () => {
    try {
      const [priority, netDiv, acpnMthd, riskLevel, remarks, accdTypCd] = await Promise.all([
        accApi.getCommonCode('3006'),
        accApi.getCommonCode('4004'),
        accApi.getCommonCode('3004'),
        accApi.getCommonCode('2001'),
        accApi.getCommonCode('4006'),
        accApi.getCommonCode('3002'),
      ])
      setCodes({ priority, netDiv, acpnMthd, riskLevel, remarks, accdTypCd })
    } catch (err) {
      console.error('Failed to load codes:', err)
    }
  }, [])

  useEffect(() => {
    if (open) {
      loadCodes()
      setFormData({
        ...initialFormData,
        dmgCrgr: user?.userName || '',
        dmgEmail: '', // emailAddr removed from User type
      })
    }
  }, [open, loadCodes, user])

  const handleChange = (field: keyof AccidentFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  const validateForm = (): boolean => {
    if (!formData.inciTtl.trim()) {
      globalAlert.warning('사고제목을 입력해주세요.')
      return false
    }
    if (!formData.inciDttNm.trim()) {
      globalAlert.warning('탐지명을 입력해주세요.')
      return false
    }
    if (!formData.accdTypCd || formData.accdTypCd === '0') {
      globalAlert.warning('사고유형을 선택해주세요.')
      return false
    }
    if (!formData.dmgIp.trim()) {
      globalAlert.warning('피해 IP를 입력해주세요.')
      return false
    }
    if (!formData.attIp.trim()) {
      globalAlert.warning('공격 IP를 입력해주세요.')
      return false
    }
    if (!formData.inciDclCont.trim()) {
      globalAlert.warning('사고내용을 입력해주세요.')
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const inciDt = formData.inciDt.replace(/-/g, '') + formData.inciDtHH + formData.inciDtMM + '00'
      const dmgTelNo = formData.dmgTelNo2 && formData.dmgTelNo3
        ? `${formData.dmgTelNo1}-${formData.dmgTelNo2}-${formData.dmgTelNo3}`
        : ''

      const params = {
        instCd: user?.instCd?.toString(),
        inciDt,
        inciTtl: formData.inciTtl,
        inciDttNm: formData.inciDttNm,
        inciPrty: '00' + formData.inciPrty,
        netDiv: formData.netDiv,
        acpnMthd: '00' + formData.acpnMthd,
        riskLevel: formData.riskLevel,
        inciPrcsStat: '1',
        dclInstCd: user?.instCd?.toString(),
        dclCrgr: user?.userName,
        dclEmail: '', // emailAddr removed from User type
        dclTelNo: '', // offcTelNo removed from User type
        dmgInstCd: formData.dmgInstCd || user?.instCd?.toString(),
        dmgCrgr: formData.dmgCrgr,
        dmgDept: formData.dmgDept,
        dmgNatnCd: 1,
        accdTypCd: formData.accdTypCd,
        dmgSvrUsrNm: formData.dmgSvrUsrNm,
        osNm: formData.osNm,
        dmgEmail: formData.dmgEmail,
        dmgTelNo,
        attNatnCd: '',
        attRemarks: formData.attRemarks,
        remarks: formData.remarks,
        inciDclCont: formData.inciDclCont,
        inciInvsCont: formData.inciInvsCont,
        inciBelowCont: '',
        dmgIpList: [formData.dmgIp],
        attIpList: [formData.attIp],
        transInciPrcsStat: 0,
      }

      await accApi.addAccident(params)
      globalAlert.success('사고신고가 접수 되었습니다.')
      onSuccess()
      onOpenChange(false)
    } catch (err) {
      console.error('Failed to add accident:', err)
      globalAlert.error('사고 등록에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const sectionTitleClass = "flex items-center gap-2 font-medium text-sm mb-2 mt-4 first:mt-0"
  const tableClass = "w-full border-collapse border border-gray-400 text-sm"
  const thClass = "border border-gray-300 bg-gray-100 px-2 py-1.5 text-left font-medium w-[120px]"
  const tdClass = "border border-gray-300 px-2 py-1.5"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>침해사고 등록</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className={sectionTitleClass}>
            <img src="/img/MainImg/customer_bullet.png" alt="" className="w-3 h-3" />
            기본정보
          </div>
          <table className={tableClass}>
            <tbody>
              <tr>
                <th className={thClass}>사고일자(*)</th>
                <td className={tdClass}>
                  <div className="flex items-center gap-2">
                    <Input
                      type="date"
                      value={formData.inciDt}
                      onChange={handleChange('inciDt')}
                      className="w-36 h-8"
                    />
                    <select
                      value={formData.inciDtHH}
                      onChange={handleChange('inciDtHH')}
                      className="h-8 border rounded px-2"
                    >
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={String(i).padStart(2, '0')}>
                          {String(i).padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    <span>:</span>
                    <select
                      value={formData.inciDtMM}
                      onChange={handleChange('inciDtMM')}
                      className="h-8 border rounded px-2"
                    >
                      {Array.from({ length: 60 }, (_, i) => (
                        <option key={i} value={String(i).padStart(2, '0')}>
                          {String(i).padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
                <th className={thClass}>우선순위(*)</th>
                <td className={tdClass}>
                  <select
                    value={formData.inciPrty}
                    onChange={handleChange('inciPrty')}
                    className="w-full h-8 border rounded px-2"
                  >
                    {codes.priority.map(code => (
                      <option key={code.comCode2} value={code.comCode2}>{code.codeName}</option>
                    ))}
                  </select>
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
                <th className={thClass}>탐지명(*)</th>
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
                <th className={thClass}>망구분(*)</th>
                <td className={tdClass}>
                  <select
                    value={formData.netDiv}
                    onChange={handleChange('netDiv')}
                    className="w-full h-8 border rounded px-2"
                  >
                    {codes.netDiv.map(code => (
                      <option key={code.comCode2} value={code.comCode2}>{code.codeName}</option>
                    ))}
                  </select>
                </td>
                <th className={thClass}>접수방법(*)</th>
                <td className={tdClass}>
                  <select
                    value={formData.acpnMthd}
                    onChange={handleChange('acpnMthd')}
                    className="w-full h-8 border rounded px-2"
                  >
                    {codes.acpnMthd.map(code => (
                      <option key={code.comCode2} value={code.comCode2}>{code.codeName}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <th className={thClass}>침해등급(*)</th>
                <td className={tdClass}>
                  <select
                    value={formData.riskLevel}
                    onChange={handleChange('riskLevel')}
                    className="w-full h-8 border rounded px-2"
                  >
                    {codes.riskLevel.map(code => (
                      <option key={code.comCode2} value={code.comCode2}>{code.codeName}</option>
                    ))}
                  </select>
                </td>
                <th className={thClass}>비고</th>
                <td className={tdClass}>
                  <select
                    value={formData.remarks}
                    onChange={handleChange('remarks')}
                    className="w-full h-8 border rounded px-2"
                  >
                    {codes.remarks.map(code => (
                      <option key={code.comCode2} value={code.comCode2}>{code.codeName}</option>
                    ))}
                  </select>
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
                <th className={thClass}>사고유형(*)</th>
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
                  <Input value="한국" readOnly className="h-8 bg-gray-50" />
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
              </tr>
              <tr>
                <th className={thClass}>전화번호</th>
                <td className={tdClass}>
                  <div className="flex items-center gap-1">
                    <select
                      value={formData.dmgTelNo1}
                      onChange={handleChange('dmgTelNo1')}
                      className="h-8 border rounded px-2"
                    >
                      {AREA_CODES.map(code => (
                        <option key={code} value={code}>{code}</option>
                      ))}
                    </select>
                    <span>-</span>
                    <Input
                      value={formData.dmgTelNo2}
                      onChange={handleChange('dmgTelNo2')}
                      maxLength={4}
                      className="h-8 w-16"
                      placeholder="0000"
                    />
                    <span>-</span>
                    <Input
                      value={formData.dmgTelNo3}
                      onChange={handleChange('dmgTelNo3')}
                      maxLength={4}
                      className="h-8 w-16"
                      placeholder="0000"
                    />
                  </div>
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
              </tr>
              <tr>
                <th className={thClass}>호스트용도</th>
                <td className={tdClass}>
                  <Input
                    value={formData.dmgSvrUsrNm}
                    onChange={handleChange('dmgSvrUsrNm')}
                    placeholder="호스트용도를 입력해주세요"
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
                <th className={thClass}>피해IP주소(*)</th>
                <td colSpan={3} className={tdClass}>
                  <Input
                    value={formData.dmgIp}
                    onChange={handleChange('dmgIp')}
                    placeholder="000.000.000.000"
                    className="h-8 w-48"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className={sectionTitleClass}>
            <img src="/img/MainImg/customer_bullet.png" alt="" className="w-3 h-3" />
            공격시스템 정보
          </div>
          <table className={tableClass}>
            <tbody>
              <tr>
                <th className={thClass}>공격IP주소(*)</th>
                <td className={tdClass}>
                  <Input
                    value={formData.attIp}
                    onChange={handleChange('attIp')}
                    placeholder="000.000.000.000"
                    className="h-8 w-48"
                  />
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
            </tbody>
          </table>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? '저장 중...' : '저장'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
