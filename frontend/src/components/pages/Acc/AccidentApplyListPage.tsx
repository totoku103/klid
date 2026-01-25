import { useState, useEffect, useCallback, useMemo } from 'react'
import { globalAlert } from '@/utils/alert'
import { globalConfirm } from '@/utils/confirm'
import { SubPageLayout, PageToolbar, ToolbarButton } from '@/components/templates'
import { useUserStore } from '@/stores/userStore'
import { accApi } from '@/services/api/accApi'
import type { Incident, IncidentSearchParams, CodeItem } from '@/types'
import { cn } from '@/lib/utils'
import { AccidentAddModal } from './components/AccidentAddModal'
import { AccidentDetailModal } from './components/AccidentDetailModal'
import { AccidentEditModal } from './components/AccidentEditModal'

const DATE_TYPE_OPTIONS = [
  { label: '접수일시', value: 'inciAcpnDt' },
  { label: '완료일시', value: 'inciUpdDt' },
  { label: '종결일시', value: 'siEndDt' },
]

const NET_DIV_OPTIONS = [
  { label: '전체', value: '' },
  { label: '외부', value: '0' },
  { label: '내부', value: '1' },
]

const EXCEPTION_OPTIONS = [
  { label: '전체', value: '' },
  { label: '예외처리', value: '0' },
  { label: '예외제외', value: '1' },
]

function getProcessStatusImage(value: string): string {
  const code = value || '0'
  return `/img/codeImg/code_${code}.png`
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  if (dateStr.length === 8) {
    return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`
  }
  return dateStr
}

function getDefaultDateRange(): { date1: string; date2: string } {
  const today = new Date()
  const monthAgo = new Date()
  monthAgo.setMonth(monthAgo.getMonth() - 1)

  const format = (d: Date) => d.toISOString().slice(0, 10)
  return { date1: format(monthAgo), date2: format(today) }
}

export function AccidentApplyListPage() {
  const { user } = useUserStore()
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const defaultDates = useMemo(() => getDefaultDateRange(), [])
  const [searchParams, setSearchParams] = useState<IncidentSearchParams>({
    date1: defaultDates.date1.replace(/-/g, '') + '000000',
    date2: defaultDates.date2.replace(/-/g, '') + '235959',
    srchDateType: 'inciAcpnDt',
    grpNo: 1,
  })

  const [dateInputs, setDateInputs] = useState({
    date1: defaultDates.date1,
    date2: defaultDates.date2,
    time: '06',
  })

  const [codes, setCodes] = useState<{
    processStatus: CodeItem[]
    accidentType: CodeItem[]
    priority: CodeItem[]
    receptionMethod: CodeItem[]
  }>({
    processStatus: [],
    accidentType: [],
    priority: [],
    receptionMethod: [],
  })

  const loadCodes = useCallback(async () => {
    try {
      const [processStatus, accidentType, priority, receptionMethod] =
        await Promise.all([
          accApi.getCommonCode('3001'),
          accApi.getCommonCode('3002'),
          accApi.getCommonCode('3006'),
          accApi.getCommonCode('3004'),
        ])
      setCodes({ processStatus, accidentType, priority, receptionMethod })
    } catch (err) {
      console.error('Failed to load codes:', err)
    }
  }, [])

  const loadIncidents = useCallback(async () => {
    setIsLoading(true)
    try {
      const params: IncidentSearchParams = {
        ...searchParams,
        sInstCd: user?.instCd,
        sAuthMain: user?.authMain,
      }
      const data = await accApi.getAccidentList(params)
      setIncidents(data)
    } catch (err) {
      console.error('Failed to load incidents:', err)
    } finally {
      setIsLoading(false)
    }
  }, [searchParams, user])

  useEffect(() => {
    loadCodes()
  }, [loadCodes])

  useEffect(() => {
    loadIncidents()
  }, [loadIncidents])

  const handleSearch = useCallback(() => {
    const d1 = dateInputs.date1.replace(/-/g, '')
    const d2 = dateInputs.date2.replace(/-/g, '')
    setSearchParams((prev) => ({
      ...prev,
      date1: d1 + dateInputs.time + '0000',
      date2: d2 + '235959',
    }))
  }, [dateInputs])

  const handleAdd = useCallback(() => {
    setIsAddModalOpen(true)
  }, [])

  const handleEdit = useCallback(() => {
    if (!selectedIncident) {
      globalAlert.warning('데이터를 선택해주세요.')
      return
    }

    const { inciPrcsStat, transInciPrcsStat, transSidoPrcsStat } = selectedIncident
    if (
      inciPrcsStat === '13' ||
      transInciPrcsStat === '13' ||
      transSidoPrcsStat === '13'
    ) {
      globalAlert.info('종결된 사고는 수정이 불가능 합니다.')
      return
    }

    setIsEditModalOpen(true)
  }, [selectedIncident])

  const handleDelete = useCallback(async () => {
    if (!selectedIncident) {
      globalAlert.warning('데이터를 선택해주세요.')
      return
    }
    if (!await globalConfirm('선택한 침해사고를 삭제하시겠습니까?')) return

    try {
      await accApi.deleteAccident(selectedIncident.inciNo)
      globalAlert.success('삭제되었습니다.')
      setSelectedIncident(null)
      loadIncidents()
    } catch {
      globalAlert.error('삭제에 실패했습니다.')
    }
  }, [selectedIncident, loadIncidents])

  const handleExportExcel = useCallback(() => {
    globalAlert.info('엑셀 내보내기 기능은 추후 구현 예정입니다.')
  }, [])

  const handleCopy = useCallback(() => {
    if (!selectedIncident) {
      globalAlert.warning('데이터를 선택해주세요.')
      return
    }
    globalAlert.info('침해사고 복사 팝업 - 추후 구현 예정')
  }, [selectedIncident])

  const handleRowDoubleClick = useCallback((incident: Incident) => {
    setSelectedIncident(incident)
    setIsDetailModalOpen(true)
  }, [])

  const canAdd = user?.authMain !== 'AUTH_MAIN_1'
  const canCopy = user?.authMain !== 'AUTH_MAIN_1'

  return (
    <SubPageLayout locationPath={['침해사고', '침해사고접수']}>
      <div className="mb-2 space-y-2 rounded border border-gray-300 bg-gray-50 p-2">
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="rounded border border-gray-300 px-2 py-1 text-sm"
            value={searchParams.srchDateType}
            onChange={(e) =>
              setSearchParams((prev) => ({ ...prev, srchDateType: e.target.value }))
            }
          >
            {DATE_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="rounded border border-gray-300 px-2 py-1 text-sm"
            value={dateInputs.date1}
            onChange={(e) =>
              setDateInputs((prev) => ({ ...prev, date1: e.target.value }))
            }
          />
          <span className="text-sm">~</span>
          <input
            type="date"
            className="rounded border border-gray-300 px-2 py-1 text-sm"
            value={dateInputs.date2}
            onChange={(e) =>
              setDateInputs((prev) => ({ ...prev, date2: e.target.value }))
            }
          />

          <label className="text-sm">기준시간:</label>
          <select
            className="rounded border border-gray-300 px-2 py-1 text-sm"
            value={dateInputs.time}
            onChange={(e) =>
              setDateInputs((prev) => ({ ...prev, time: e.target.value }))
            }
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={String(i).padStart(2, '0')}>
                {String(i).padStart(2, '0')}
              </option>
            ))}
          </select>

          <label className="text-sm">통합:</label>
          <input
            type="text"
            className="w-32 rounded border border-gray-300 px-2 py-1 text-sm"
            placeholder="통합검색"
            disabled={showAdvancedSearch}
            value={searchParams.totalTitle ?? ''}
            onChange={(e) =>
              setSearchParams((prev) => ({ ...prev, totalTitle: e.target.value }))
            }
          />

          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={showAdvancedSearch}
              onChange={(e) => setShowAdvancedSearch(e.target.checked)}
            />
            상세검색
          </label>
        </div>

        {showAdvancedSearch && (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <label className="text-sm">제목:</label>
              <input
                type="text"
                className="w-32 rounded border border-gray-300 px-2 py-1 text-sm"
                value={searchParams.inciTtl ?? ''}
                onChange={(e) =>
                  setSearchParams((prev) => ({ ...prev, inciTtl: e.target.value }))
                }
              />

              <label className="text-sm">접수번호:</label>
              <input
                type="text"
                className="w-24 rounded border border-gray-300 px-2 py-1 text-sm"
                value={searchParams.inciNo ?? ''}
                onChange={(e) =>
                  setSearchParams((prev) => ({ ...prev, inciNo: e.target.value }))
                }
              />

              <label className="text-sm">신고기관명:</label>
              <input
                type="text"
                className="w-24 rounded border border-gray-300 px-2 py-1 text-sm"
                value={searchParams.dclInstName ?? ''}
                onChange={(e) =>
                  setSearchParams((prev) => ({ ...prev, dclInstName: e.target.value }))
                }
              />

              <label className="text-sm">피해기관명:</label>
              <input
                type="text"
                className="w-24 rounded border border-gray-300 px-2 py-1 text-sm"
                value={searchParams.dmgInstName ?? ''}
                onChange={(e) =>
                  setSearchParams((prev) => ({ ...prev, dmgInstName: e.target.value }))
                }
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="text-sm">사고유형:</label>
              <select
                className="rounded border border-gray-300 px-2 py-1 text-sm"
                value={searchParams.accdTypCd ?? ''}
                onChange={(e) =>
                  setSearchParams((prev) => ({ ...prev, accdTypCd: e.target.value }))
                }
              >
                <option value="">전체</option>
                {codes.accidentType.map((code) => (
                  <option key={code.comCode2} value={code.comCode2}>
                    {code.codeName}
                  </option>
                ))}
              </select>

              <label className="text-sm">우선순위:</label>
              <select
                className="rounded border border-gray-300 px-2 py-1 text-sm"
                value={searchParams.inciPrtyCd ?? ''}
                onChange={(e) =>
                  setSearchParams((prev) => ({ ...prev, inciPrtyCd: e.target.value }))
                }
              >
                <option value="">전체</option>
                {codes.priority.map((code) => (
                  <option key={code.comCode2} value={`00${code.comCode2}`}>
                    {code.codeName}
                  </option>
                ))}
              </select>

              <label className="text-sm">망구분:</label>
              <select
                className="rounded border border-gray-300 px-2 py-1 text-sm"
                value={searchParams.netDiv ?? ''}
                onChange={(e) =>
                  setSearchParams((prev) => ({ ...prev, netDiv: e.target.value }))
                }
              >
                {NET_DIV_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <label className="text-sm">공격IP:</label>
              <input
                type="text"
                className="w-24 rounded border border-gray-300 px-2 py-1 text-sm"
                value={searchParams.attIp ?? ''}
                onChange={(e) =>
                  setSearchParams((prev) => ({ ...prev, attIp: e.target.value }))
                }
              />

              <label className="text-sm">사고IP:</label>
              <input
                type="text"
                className="w-24 rounded border border-gray-300 px-2 py-1 text-sm"
                value={searchParams.dmgIp ?? ''}
                onChange={(e) =>
                  setSearchParams((prev) => ({ ...prev, dmgIp: e.target.value }))
                }
              />

              <label className="text-sm">예외처리:</label>
              <select
                className="rounded border border-gray-300 px-2 py-1 text-sm"
                value={searchParams.srchException ?? ''}
                onChange={(e) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    srchException: e.target.value,
                  }))
                }
              >
                {EXCEPTION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="text-sm">지원센터처리상태:</label>
              <select
                className="rounded border border-gray-300 px-2 py-1 text-sm"
                value={searchParams.inciPrcsStatCd ?? ''}
                onChange={(e) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    inciPrcsStatCd: e.target.value,
                  }))
                }
              >
                <option value="">전체</option>
                {codes.processStatus.map((code) => (
                  <option key={code.comCode2} value={code.comCode2}>
                    {code.codeName}
                  </option>
                ))}
              </select>

              <label className="text-sm">시도처리상태:</label>
              <select
                className="rounded border border-gray-300 px-2 py-1 text-sm"
                value={searchParams.transInciPrcsStatCd ?? ''}
                onChange={(e) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    transInciPrcsStatCd: e.target.value,
                  }))
                }
              >
                <option value="">전체</option>
                {codes.processStatus.map((code) => (
                  <option key={code.comCode2} value={code.comCode2}>
                    {code.codeName}
                  </option>
                ))}
              </select>

              <label className="text-sm">시군구처리상태:</label>
              <select
                className="rounded border border-gray-300 px-2 py-1 text-sm"
                value={searchParams.transSidoPrcsStatCd ?? ''}
                onChange={(e) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    transSidoPrcsStatCd: e.target.value,
                  }))
                }
              >
                <option value="">전체</option>
                {codes.processStatus.map((code) => (
                  <option key={code.comCode2} value={code.comCode2}>
                    {code.codeName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="text-sm">사고내용:</label>
              <input
                type="text"
                className="w-40 rounded border border-gray-300 px-2 py-1 text-sm"
                value={searchParams.inciDclCont ?? ''}
                onChange={(e) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    inciDclCont: e.target.value,
                  }))
                }
              />

              <label className="text-sm">조사내용:</label>
              <input
                type="text"
                className="w-40 rounded border border-gray-300 px-2 py-1 text-sm"
                value={searchParams.inciInvsCont ?? ''}
                onChange={(e) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    inciInvsCont: e.target.value,
                  }))
                }
              />

              <label className="text-sm">시도의견:</label>
              <input
                type="text"
                className="w-40 rounded border border-gray-300 px-2 py-1 text-sm"
                value={searchParams.inciBelowCont ?? ''}
                onChange={(e) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    inciBelowCont: e.target.value,
                  }))
                }
              />
            </div>
          </>
        )}
      </div>

      <PageToolbar>
        <ToolbarButton icon="search" onClick={handleSearch} title="검색" />
        {canAdd && <ToolbarButton icon="add" onClick={handleAdd} title="등록" />}
        <ToolbarButton icon="edit" onClick={handleEdit} title="수정" />
        <ToolbarButton icon="delete" onClick={handleDelete} title="삭제" />
        <ToolbarButton icon="excel" onClick={handleExportExcel} title="엑셀" />
        {canCopy && <ToolbarButton icon="refresh" onClick={handleCopy} title="복사" />}
      </PageToolbar>

      <div className="h-[calc(100%-180px)] overflow-auto rounded border border-gray-300">
        <table className="w-full border-collapse text-xs">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="border-b border-gray-300 p-1 text-center">NO</th>
              <th className="border-b border-gray-300 p-1 text-center">사고일자</th>
              <th className="border-b border-gray-300 p-1 text-center">접수날짜</th>
              <th className="border-b border-gray-300 p-1 text-center">접수번호</th>
              <th className="border-b border-gray-300 p-1 text-center">망구분</th>
              <th className="border-b border-gray-300 p-1 text-center">신고기관</th>
              <th className="border-b border-gray-300 p-1 text-center">접수기관</th>
              <th className="min-w-[200px] border-b border-gray-300 p-1 text-center">
                제목(탐지명)
              </th>
              <th className="border-b border-gray-300 p-1 text-center">사고유형</th>
              <th className="border-b border-gray-300 p-1 text-center">접수방법</th>
              <th className="border-b border-gray-300 p-1 text-center">지원센터</th>
              <th className="border-b border-gray-300 p-1 text-center">시도</th>
              <th className="border-b border-gray-300 p-1 text-center">시군구</th>
              <th className="border-b border-gray-300 p-1 text-center">담당자</th>
              <th className="border-b border-gray-300 p-1 text-center">우선순위</th>
              <th className="border-b border-gray-300 p-1 text-center">이관기관</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={16} className="p-4 text-center text-gray-500">
                  로딩 중...
                </td>
              </tr>
            ) : incidents.length === 0 ? (
              <tr>
                <td colSpan={16} className="p-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              incidents.map((incident, idx) => (
                <tr
                  key={incident.inciNo}
                  onClick={() => setSelectedIncident(incident)}
                  onDoubleClick={() => handleRowDoubleClick(incident)}
                  className={cn(
                    'cursor-pointer hover:bg-gray-50',
                    selectedIncident?.inciNo === incident.inciNo && 'bg-blue-100'
                  )}
                >
                  <td className="border-b border-gray-200 p-1 text-center">
                    {incidents.length - idx}
                  </td>
                  <td className="border-b border-gray-200 p-1 text-center">
                    {formatDate(incident.inciDt)}
                  </td>
                  <td className="border-b border-gray-200 p-1 text-center">
                    {incident.inciAcpnDt}
                  </td>
                  <td className="border-b border-gray-200 p-1 text-center">
                    {incident.inciNo}
                  </td>
                  <td className="border-b border-gray-200 p-1 text-center">
                    {incident.netDivName}
                  </td>
                  <td className="border-b border-gray-200 p-1 text-center">
                    {incident.dclInstName}
                  </td>
                  <td className="border-b border-gray-200 p-1 text-center">
                    {incident.dmgInstName}
                  </td>
                  <td className="border-b border-gray-200 p-1 text-left">
                    {incident.inciTtlDtt || incident.inciTtl}
                  </td>
                  <td className="border-b border-gray-200 p-1 text-center">
                    {incident.accdTypName}
                  </td>
                  <td className="border-b border-gray-200 p-1 text-center">
                    {incident.acpnMthdName}
                  </td>
                  <td className="border-b border-gray-200 p-1 text-center">
                    <img
                      src={getProcessStatusImage(incident.inciPrcsStat)}
                      alt={incident.inciPrcsStatName}
                      className="mx-auto h-[18px] w-[52px]"
                    />
                  </td>
                  <td className="border-b border-gray-200 p-1 text-center">
                    <img
                      src={getProcessStatusImage(incident.transInciPrcsStat)}
                      alt={incident.transInciPrcsStatName}
                      className="mx-auto h-[18px] w-[52px]"
                    />
                  </td>
                  <td className="border-b border-gray-200 p-1 text-center">
                    <img
                      src={getProcessStatusImage(incident.transSidoPrcsStat)}
                      alt={incident.transSidoPrcsStatName}
                      className="mx-auto h-[18px] w-[52px]"
                    />
                  </td>
                  <td className="border-b border-gray-200 p-1 text-center">
                    {incident.dclCrgr}
                  </td>
                  <td className="border-b border-gray-200 p-1 text-center">
                    <img
                      src={getProcessStatusImage(incident.inciPrty)}
                      alt={incident.inciPrtyName}
                      className="mx-auto h-[18px] w-[52px]"
                    />
                  </td>
                  <td className="border-b border-gray-200 p-1 text-center">
                    {incident.tranSigunName}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AccidentAddModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSuccess={loadIncidents}
      />

      {selectedIncident && (
        <>
          <AccidentDetailModal
            open={isDetailModalOpen}
            onOpenChange={setIsDetailModalOpen}
            inciNo={selectedIncident.inciNo}
          />

          <AccidentEditModal
            open={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
            inciNo={selectedIncident.inciNo}
            onSuccess={loadIncidents}
          />
        </>
      )}
    </SubPageLayout>
  )
}
