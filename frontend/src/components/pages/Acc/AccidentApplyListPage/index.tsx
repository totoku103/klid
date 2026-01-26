import { useState, useEffect, useCallback, useMemo } from 'react'
import { globalAlert } from '@/utils/alert'
import { globalConfirm } from '@/utils/confirm'
import { SubPageLayout, PageToolbar, ToolbarButton } from '@/components/templates'
import { useUserStore } from '@/stores/userStore'
import { accApi } from '@/services/api/accApi'
import type { Incident, IncidentSearchParams, CodeItem } from '@/types'
import { DataGrid, useDataGrid, type GridColumn } from '@/components/organisms/DataGrid'
import { AccidentAddModal } from '../components/AccidentAddModal'
import { AccidentDetailModal } from '../components/AccidentDetailModal'
import { AccidentEditModal } from '../components/AccidentEditModal'

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

const PERIOD_OPTIONS = [
  { label: '선택', value: '' },
  { label: '오늘', value: 'today' },
  { label: '최근 7일', value: 'week' },
  { label: '최근 1개월', value: 'month' },
  { label: '최근 3개월', value: '3months' },
  { label: '최근 6개월', value: '6months' },
  { label: '최근 1년', value: 'year' },
]

const gridColumns: GridColumn[] = [
  { text: 'NO', datafield: 'rowNum', width: 50, cellsrenderer: (_row, _col, _val, data) => {
    return `<div style="text-align:center">${data.rowNum || ''}</div>`
  }},
  { text: '사고일자', datafield: 'inciDt', width: 90, cellsrenderer: (_row, _col, val) => {
    const dateStr = String(val || '')
    const formatted = dateStr.length === 8
      ? `${dateStr.slice(0,4)}-${dateStr.slice(4,6)}-${dateStr.slice(6,8)}`
      : dateStr
    return `<div style="text-align:center">${formatted}</div>`
  }},
  { text: '접수날짜', datafield: 'inciAcpnDt', width: 130, align: 'center', cellsalign: 'center' },
  { text: '접수번호', datafield: 'inciNo', width: 130, align: 'center', cellsalign: 'center' },
  { text: '망구분', datafield: 'netDivName', width: 60, align: 'center', cellsalign: 'center' },
  { text: '신고기관', datafield: 'dclInstName', width: 100, align: 'center', cellsalign: 'center' },
  { text: '접수기관', datafield: 'dmgInstName', width: 100, align: 'center', cellsalign: 'center' },
  { text: '제목(탐지명)', datafield: 'inciTtl', width: 200, cellsrenderer: (_row, _col, _val, data) => {
    return `<div style="text-align:left">${data.inciTtlDtt || data.inciTtl || ''}</div>`
  }},
  { text: '사고유형', datafield: 'accdTypName', width: 80, align: 'center', cellsalign: 'center' },
  { text: '접수방법', datafield: 'acpnMthdName', width: 70, align: 'center', cellsalign: 'center' },
  { text: '지원센터', datafield: 'inciPrcsStat', width: 60, cellsrenderer: (_row, _col, val) => {
    return `<div style="text-align:center"><img src="/img/codeImg/code_${val || '0'}.png" style="width:52px;height:18px" /></div>`
  }},
  { text: '시도', datafield: 'transInciPrcsStat', width: 60, cellsrenderer: (_row, _col, val) => {
    return `<div style="text-align:center"><img src="/img/codeImg/code_${val || '0'}.png" style="width:52px;height:18px" /></div>`
  }},
  { text: '시군구', datafield: 'transSidoPrcsStat', width: 60, cellsrenderer: (_row, _col, val) => {
    return `<div style="text-align:center"><img src="/img/codeImg/code_${val || '0'}.png" style="width:52px;height:18px" /></div>`
  }},
  { text: '담당자', datafield: 'dclCrgr', width: 80, align: 'center', cellsalign: 'center' },
  { text: '우선순위', datafield: 'inciPrty', width: 60, cellsrenderer: (_row, _col, val) => {
    return `<div style="text-align:center"><img src="/img/codeImg/code_${val || '0'}.png" style="width:52px;height:18px" /></div>`
  }},
  { text: '이관기관', datafield: 'tranSigunName', width: 100, align: 'center', cellsalign: 'center' },
]

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
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState<string>('')
  const [selectedAcpnMthds, setSelectedAcpnMthds] = useState<string[]>([])

  const { exportToExcel } = useDataGrid('accidentApplyGrid')

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
    }
  }, [searchParams, user])

  useEffect(() => {
    loadCodes()
  }, [loadCodes])

  useEffect(() => {
    loadIncidents()
  }, [loadIncidents])

  // Reset search fields when toggling between basic and advanced search
  useEffect(() => {
    if (showAdvancedSearch) {
      // Switching TO advanced search - clear totalTitle
      setSearchParams(prev => ({ ...prev, totalTitle: '' }))
    } else {
      // Switching TO basic search - clear all advanced fields
      setSearchParams(prev => ({
        ...prev,
        inciTtl: '',
        inciNo: '',
        dclInstName: '',
        dmgInstName: '',
        accdTypCd: '',
        inciPrtyCd: '',
        netDiv: '',
        attIp: '',
        dmgIp: '',
        srchException: '',
        inciPrcsStatCd: '',
        transInciPrcsStatCd: '',
        transSidoPrcsStatCd: '',
        inciDclCont: '',
        inciInvsCont: '',
        inciBelowCont: '',
        srchAcpnMthd: undefined,
      }))
      setSelectedAcpnMthds([])
    }
  }, [showAdvancedSearch])

  const handlePeriodChange = useCallback((period: string) => {
    setSelectedPeriod(period)
    const today = new Date()
    const format = (d: Date) => d.toISOString().slice(0, 10)

    let newDate1 = dateInputs.date1
    const newDate2 = format(today)

    switch (period) {
      case 'today':
        newDate1 = format(today)
        break
      case 'week': {
        const weekAgo = new Date()
        weekAgo.setDate(today.getDate() - 7)
        newDate1 = format(weekAgo)
        break
      }
      case 'month': {
        const monthAgo = new Date()
        monthAgo.setMonth(today.getMonth() - 1)
        newDate1 = format(monthAgo)
        break
      }
      case '3months': {
        const threeMonthsAgo = new Date()
        threeMonthsAgo.setMonth(today.getMonth() - 3)
        newDate1 = format(threeMonthsAgo)
        break
      }
      case '6months': {
        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(today.getMonth() - 6)
        newDate1 = format(sixMonthsAgo)
        break
      }
      case 'year': {
        const yearAgo = new Date()
        yearAgo.setFullYear(today.getFullYear() - 1)
        newDate1 = format(yearAgo)
        break
      }
    }

    if (period) {
      setDateInputs(prev => ({ ...prev, date1: newDate1, date2: newDate2 }))
    }
  }, [dateInputs.date1])

  const handleSearch = useCallback(() => {
    const d1 = dateInputs.date1.replace(/-/g, '')
    const d2 = dateInputs.date2.replace(/-/g, '')
    const time = parseInt(dateInputs.time, 10)

    // Start time: date1 + time + 0000
    const startDt = d1 + dateInputs.time + '0000'

    // End time: date2 + (time-1) + 5959, rolling to next day if needed
    let endTime = time - 1
    const endDate = d2

    if (endTime < 0) {
      endTime = 23
      // date2 stays the same (effectively ends at 23:59:59 of date2)
    }

    const endDt = endDate + String(endTime).padStart(2, '0') + '5959'

    setSearchParams((prev) => ({
      ...prev,
      date1: startDt,
      date2: endDt,
      srchAcpnMthd: selectedAcpnMthds.length > 0 ? selectedAcpnMthds.join(',') : undefined,
    }))
  }, [dateInputs, selectedAcpnMthds])

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
    exportToExcel('침해사고접수목록')
  }, [exportToExcel])

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

          <select
            className="rounded border border-gray-300 px-2 py-1 text-sm"
            value={selectedPeriod}
            onChange={(e) => handlePeriodChange(e.target.value)}
          >
            {PERIOD_OPTIONS.map((opt) => (
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

              <label className="text-sm">접수방법:</label>
              <select
                multiple
                className="h-16 w-28 rounded border border-gray-300 px-1 py-1 text-sm"
                value={selectedAcpnMthds}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, opt => opt.value)
                  setSelectedAcpnMthds(selected)
                }}
              >
                {codes.receptionMethod.map((code) => (
                  <option key={code.comCode2} value={code.comCode2}>
                    {code.codeName}
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

      <div className="h-[calc(100%-180px)]">
        <DataGrid
          id="accidentApplyGrid"
          columns={gridColumns}
          source={{
            datatype: 'json',
            datafields: [
              { name: 'inciNo', type: 'string' },
              { name: 'inciDt', type: 'string' },
              { name: 'inciAcpnDt', type: 'string' },
              { name: 'netDivName', type: 'string' },
              { name: 'dclInstName', type: 'string' },
              { name: 'dmgInstName', type: 'string' },
              { name: 'inciTtl', type: 'string' },
              { name: 'inciTtlDtt', type: 'string' },
              { name: 'accdTypName', type: 'string' },
              { name: 'acpnMthdName', type: 'string' },
              { name: 'inciPrcsStat', type: 'string' },
              { name: 'transInciPrcsStat', type: 'string' },
              { name: 'transSidoPrcsStat', type: 'string' },
              { name: 'dclCrgr', type: 'string' },
              { name: 'inciPrty', type: 'string' },
              { name: 'tranSigunName', type: 'string' },
              { name: 'rowNum', type: 'number' },
            ],
            localdata: incidents.map((item, idx) => ({ ...item, rowNum: incidents.length - idx })),
            id: 'inciNo',
          }}
          width="100%"
          height="100%"
          pageable={true}
          pageSize={50}
          pageSizeOptions={[50, 100, 500, 1000]}
          sortable={true}
          selectionMode="singlerow"
          onRowSelect={(rowData) => setSelectedIncident(rowData as unknown as Incident)}
          onRowDoubleClick={(rowData) => handleRowDoubleClick(rowData as unknown as Incident)}
        />
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
