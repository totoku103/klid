import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { accApi } from '@/services/api/accApi'
import type { Incident } from '@/types'

interface AccidentDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  inciNo: string
}

export function AccidentDetailModal({ open, onOpenChange, inciNo }: AccidentDetailModalProps) {
  const [incident, setIncident] = useState<Incident | null>(null)
  const [loading, setLoading] = useState(false)

  const loadDetail = useCallback(async () => {
    if (!inciNo) return
    setLoading(true)
    try {
      const data = await accApi.getAccidentDetail(inciNo)
      setIncident(data)
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

  const sectionTitleClass = "flex items-center gap-2 font-medium text-sm mb-2 mt-4 first:mt-0"
  const tableClass = "w-full border-collapse border border-gray-400 text-sm"
  const thClass = "border border-gray-300 bg-gray-100 px-2 py-1.5 text-left font-medium w-[120px]"
  const tdClass = "border border-gray-300 px-2 py-1.5"
  const readOnlyInputClass = "w-full bg-transparent border-none text-sm"

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

  const handleHwpDownload = useCallback(() => {
    globalAlert.info('한글 다운로드 기능은 추후 구현 예정입니다.')
  }, [])

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
          <DialogTitle>침해사고 상세정보</DialogTitle>
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
                  <span className={readOnlyInputClass}>{formatDate(incident.inciDt)}</span>
                </td>
                <th className={thClass}>접수번호</th>
                <td className={tdClass}>
                  <span className={readOnlyInputClass}>{incident.inciNo}</span>
                </td>
              </tr>
              <tr>
                <th className={thClass}>사고제목</th>
                <td className={tdClass}>
                  <span className={readOnlyInputClass}>{incident.inciTtl}</span>
                </td>
                <th className={thClass}>탐지명</th>
                <td className={tdClass}>
                  <span className={readOnlyInputClass}>{incident.inciDttNm}</span>
                </td>
              </tr>
              <tr>
                <th className={thClass}>접수방법</th>
                <td className={tdClass}>
                  <span className={readOnlyInputClass}>{incident.acpnMthdName}</span>
                </td>
                <th className={thClass}>침해등급</th>
                <td className={tdClass}>
                  <span className={readOnlyInputClass}>{incident.riskLevelName}</span>
                </td>
              </tr>
              <tr>
                <th className={thClass}>우선순위</th>
                <td colSpan={3} className={tdClass}>
                  <span className={readOnlyInputClass}>{incident.inciPrtyName}</span>
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
                  <span className={readOnlyInputClass}>{incident.dclInstName}</span>
                </td>
                <th className={thClass}>비고</th>
                <td className={tdClass}>
                  <span className={readOnlyInputClass}>{incident.remarksName}</span>
                </td>
              </tr>
              <tr>
                <th className={thClass}>담당자</th>
                <td className={tdClass}>
                  <span className={readOnlyInputClass}>{incident.dclCrgr}</span>
                </td>
                <th className={thClass}>전화번호</th>
                <td className={tdClass}>
                  <span className={readOnlyInputClass}>{incident.dclTelNo}</span>
                </td>
              </tr>
              <tr>
                <th className={thClass}>전자우편</th>
                <td colSpan={3} className={tdClass}>
                  <span className={readOnlyInputClass}>{incident.dclEmail}</span>
                </td>
              </tr>
            </tbody>
          </table>

          {(incident.remarks === '1' || incident.remarks === '2') && (
            <>
              <div className={sectionTitleClass}>
                <img src="/img/MainImg/customer_bullet.png" alt="" className="w-3 h-3" />
                비고
              </div>
              {incident.remarks === '1' && (
                <table className={tableClass}>
                  <tbody>
                    <tr>
                      <th className={thClass}>사고대상</th>
                      <td className={tdClass}>
                        <span className={readOnlyInputClass}>{incident.inciTarget}</span>
                      </td>
                      <th className={thClass}>공격유형</th>
                      <td className={tdClass}>
                        <span className={readOnlyInputClass}>{incident.hackAttTypeName}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>망구분</th>
                      <td className={tdClass}>
                        <span className={readOnlyInputClass}>{incident.hackNetDiv}</span>
                      </td>
                      <th className={thClass}>도메인</th>
                      <td className={tdClass}>
                        <span className={readOnlyInputClass}>{incident.hackDomainNm}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>해킹내용</th>
                      <td colSpan={3} className={tdClass}>
                        <div className="whitespace-pre-wrap min-h-[100px]">{incident.hackCont}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
              {incident.remarks === '2' && (
                <table className={tableClass}>
                  <tbody>
                    <tr>
                      <th className={thClass}>공격유형</th>
                      <td className={tdClass}>
                        <span className={readOnlyInputClass}>{incident.attackTypeName}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className={thClass}>조치사항</th>
                      <td className={tdClass}>
                        <div className="whitespace-pre-wrap min-h-[100px]">{incident.homepvCont}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </>
          )}

          <div className={sectionTitleClass}>
            <img src="/img/MainImg/customer_bullet.png" alt="" className="w-3 h-3" />
            사고(피해)시스템 정보
          </div>
          <table className={tableClass}>
            <tbody>
              <tr>
                <th className={thClass}>피해기관</th>
                <td className={tdClass}>
                  <span className={readOnlyInputClass}>{incident.dmgInstName}</span>
                </td>
                <th className={thClass}>사고유형</th>
                <td className={tdClass}>
                  <span className={readOnlyInputClass}>{incident.accdTypName}</span>
                </td>
                <th className={thClass}>피해국가</th>
                <td className={tdClass}>
                  <span className={readOnlyInputClass}>{incident.dmgNatnNm || '한국'}</span>
                </td>
              </tr>
              <tr>
                <th className={thClass}>담당자</th>
                <td className={tdClass}>
                  <span className={readOnlyInputClass}>{incident.dmgCrgr}</span>
                </td>
                <th className={thClass}>부서명</th>
                <td className={tdClass}>
                  <span className={readOnlyInputClass}>{incident.dmgDept}</span>
                </td>
                <th className={thClass}>호스트용도</th>
                <td className={tdClass}>
                  <span className={readOnlyInputClass}>{incident.dmgSvrUsrNm}</span>
                </td>
              </tr>
              <tr>
                <th className={thClass}>전화번호</th>
                <td className={tdClass}>
                  <span className={readOnlyInputClass}>{incident.dmgTelNo}</span>
                </td>
                <th className={thClass}>전자우편</th>
                <td className={tdClass}>
                  <span className={readOnlyInputClass}>{incident.dmgEmail}</span>
                </td>
                <th className={thClass}>운영체제명</th>
                <td className={tdClass}>
                  <span className={readOnlyInputClass}>{incident.osNm}</span>
                </td>
              </tr>
              <tr>
                <th className={thClass}>IP주소</th>
                <td colSpan={5} className={tdClass}>
                  <span className={readOnlyInputClass}>
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
                  <span className={readOnlyInputClass}>{incident.attNatnNm}</span>
                </td>
                <th className={thClass}>IP주소</th>
                <td className={tdClass}>
                  <span className={readOnlyInputClass}>
                    {incident.attIpList?.join(', ') || incident.attIp}
                  </span>
                </td>
                <th className={thClass}>비고</th>
                <td className={tdClass}>
                  <span className={readOnlyInputClass}>{incident.attRemarks}</span>
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
                <th className={thClass}>사고내용</th>
                <td className={tdClass}>
                  <div className="whitespace-pre-wrap min-h-[200px] max-h-[300px] overflow-y-auto p-2">
                    {incident.inciDclCont}
                  </div>
                </td>
              </tr>
              <tr>
                <th className={thClass}>조치내용</th>
                <td className={tdClass}>
                  <div className="whitespace-pre-wrap min-h-[200px] max-h-[300px] overflow-y-auto p-2">
                    {incident.inciInvsCont}
                  </div>
                </td>
              </tr>
              <tr>
                <th className={thClass}>시도의견</th>
                <td className={tdClass}>
                  <div className="whitespace-pre-wrap min-h-[200px] max-h-[300px] overflow-y-auto p-2">
                    {incident.inciBelowCont}
                  </div>
                </td>
              </tr>
              {incident.attachFileList && incident.attachFileList.length > 0 && (
                <tr>
                  <th className={thClass}>처리방안 첨부파일</th>
                  <td className={tdClass}>
                    <ul className="list-disc list-inside">
                      {incident.attachFileList.map((file) => (
                        <li key={file.fileNo}>
                          <a
                            href={`${import.meta.env.VITE_API_URL}/file/download.do?fileNo=${file.fileNo}`}
                            className="text-blue-600 hover:underline"
                          >
                            {file.fileNm}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {incident.historyList && incident.historyList.length > 0 && (
            <>
              <div className={sectionTitleClass}>
                <img src="/img/MainImg/customer_bullet.png" alt="" className="w-3 h-3" />
                히스토리
              </div>
              <div className="border border-gray-300 rounded max-h-[200px] overflow-y-auto">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="border-b border-gray-300 px-2 py-1 text-center">NO</th>
                      <th className="border-b border-gray-300 px-2 py-1 text-center">일시</th>
                      <th className="border-b border-gray-300 px-2 py-1 text-center">처리유형</th>
                      <th className="border-b border-gray-300 px-2 py-1 text-center">내용</th>
                      <th className="border-b border-gray-300 px-2 py-1 text-center">담당자</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incident.historyList.map((hist, idx) => (
                      <tr key={hist.histNo}>
                        <td className="border-b border-gray-200 px-2 py-1 text-center">
                          {incident.historyList!.length - idx}
                        </td>
                        <td className="border-b border-gray-200 px-2 py-1 text-center">
                          {formatDate(hist.histDt)}
                        </td>
                        <td className="border-b border-gray-200 px-2 py-1 text-center">
                          {hist.histTypName}
                        </td>
                        <td className="border-b border-gray-200 px-2 py-1 text-left">
                          {hist.histCont}
                        </td>
                        <td className="border-b border-gray-200 px-2 py-1 text-center">
                          {hist.regUserName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={handleHwpDownload}>
            한글 다운로드
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
