import { useState, useEffect, useCallback, useMemo } from 'react'
import { globalAlert } from '@/utils/alert'
import { globalConfirm } from '@/utils/confirm'
import {
  ActionBar,
  ActionButton,
  FilterPanel,
  SearchBar,
  SearchRow,
  SearchSelect,
  SearchMultiSelect,
  SearchInput,
  SearchPeriodRange,
  SearchCheckbox,
  SearchField,
} from '@/components/organisms'
import { useUserStore } from '@/stores/userStore'
import { accApi } from '@/services/api/accApi'
import type { Incident, IncidentSearchParams, CodeItem } from '@/types'
import {
  DataGrid,
  useDataGrid,
  type GridColumn,
} from '@/components/atoms'
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
  { label: '최근 24시간', value: '1' },
  { label: '최근 1주일', value: '7' },
  { label: '최근 1개월', value: '30' },
  { label: '최근 1년', value: '365' },
  { label: '사용자 설정', value: '-1' },
]

const gridColumns: GridColumn[] = [
  {
    text: 'NO', datafield: 'rowNum', width: 50, cellsrenderer: (_row, _col, _val, data) => {
      return `<div style="text-align:center">${data.rowNum || ''}</div>`
    }
  },
  {
    text: '사고일자', datafield: 'inciDt', width: 90, cellsrenderer: (_row, _col, val) => {
      const dateStr = String(val || '')
      const formatted = dateStr.length === 8
        ? `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`
        : dateStr
      return `<div style="text-align:center">${formatted}</div>`
    }
  },
  { text: '접수날짜', datafield: 'inciAcpnDt', width: 130, align: 'center', cellsalign: 'center' },
  { text: '접수번호', datafield: 'inciNo', width: 130, align: 'center', cellsalign: 'center' },
  { text: '망구분', datafield: 'netDivName', width: 60, align: 'center', cellsalign: 'center' },
  { text: '신고기관', datafield: 'dclInstName', width: 100, align: 'center', cellsalign: 'center' },
  { text: '접수기관', datafield: 'dmgInstName', width: 100, align: 'center', cellsalign: 'center' },
  {
    text: '제목(탐지명)', datafield: 'inciTtl', cellsrenderer: (_row, _col, _val, data) => {
      return `<div style="text-align:left">${data.inciTtlDtt || data.inciTtl || ''}</div>`
    }
  },
  { text: '사고유형', datafield: 'accdTypName', width: 80, align: 'center', cellsalign: 'center' },
  { text: '접수방법', datafield: 'acpnMthdName', width: 70, align: 'center', cellsalign: 'center' },
  {
    text: '지원센터', datafield: 'inciPrcsStat', width: 60, cellsrenderer: (_row, _col, val) => {
      return `<div style="text-align:center"><img src="/img/codeImg/code_${val || '0'}.png" style="width:52px;height:18px" /></div>`
    }
  },
  {
    text: '시도', datafield: 'transInciPrcsStat', width: 60, cellsrenderer: (_row, _col, val) => {
      return `<div style="text-align:center"><img src="/img/codeImg/code_${val || '0'}.png" style="width:52px;height:18px" /></div>`
    }
  },
  {
    text: '시군구', datafield: 'transSidoPrcsStat', width: 60, cellsrenderer: (_row, _col, val) => {
      return `<div style="text-align:center"><img src="/img/codeImg/code_${val || '0'}.png" style="width:52px;height:18px" /></div>`
    }
  },
  { text: '담당자', datafield: 'dclCrgr', width: 80, align: 'center', cellsalign: 'center' },
  {
    text: '우선순위', datafield: 'inciPrty', width: 60, cellsrenderer: (_row, _col, val) => {
      return `<div style="text-align:center"><img src="/img/codeImg/code_${val || '0'}.png" style="width:52px;height:18px" /></div>`
    }
  },
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

  const timeOptions = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        label: String(i).padStart(2, '0'),
        value: String(i).padStart(2, '0'),
      })),
    []
  )

  const accidentTypeOptions = useMemo(
    () =>
      codes.accidentType.map((code) => ({
        label: code.codeName,
        value: code.comCode2,
      })),
    [codes.accidentType]
  )

  const priorityOptions = useMemo(
    () =>
      codes.priority.map((code) => ({
        label: code.codeName,
        value: `00${code.comCode2}`,
      })),
    [codes.priority]
  )

  const processStatusOptions = useMemo(
    () =>
      codes.processStatus.map((code) => ({
        label: code.codeName,
        value: code.comCode2,
      })),
    [codes.processStatus]
  )

  const receptionMethodOptions = useMemo(
    () =>
      codes.receptionMethod.map((code) => ({
        label: code.codeName,
        value: code.comCode2,
      })),
    [codes.receptionMethod]
  )

  return (
    <div className="flex flex-col h-full">
      <FilterPanel>
        <SearchBar>
          <SearchRow>
            <SearchSelect
              options={DATE_TYPE_OPTIONS}
              value={searchParams.srchDateType}
              onChange={(e) =>
                setSearchParams((prev) => ({ ...prev, srchDateType: e.target.value }))
              }
            />

            <SearchPeriodRange
              periodOptions={PERIOD_OPTIONS}
              periodValue={selectedPeriod}
              onPeriodChange={handlePeriodChange}
              startDate={dateInputs.date1}
              endDate={dateInputs.date2}
              onStartDateChange={(value) =>
                setDateInputs((prev) => ({ ...prev, date1: value }))
              }
              onEndDateChange={(value) =>
                setDateInputs((prev) => ({ ...prev, date2: value }))
              }
            />

            <SearchField label="기준시간:">
              <SearchSelect
                options={timeOptions}
                value={dateInputs.time}
                onChange={(e) =>
                  setDateInputs((prev) => ({ ...prev, time: e.target.value }))
                }
              />
            </SearchField>

            <SearchField label="통합:">
              <SearchInput
                type="text"
                placeholder="통합검색"
                disabled={showAdvancedSearch}
                value={searchParams.totalTitle ?? ''}
                onChange={(e) =>
                  setSearchParams((prev) => ({ ...prev, totalTitle: e.target.value }))
                }
              />
            </SearchField>

            <SearchCheckbox
              label="상세검색"
              checked={showAdvancedSearch}
              onChange={(e) => setShowAdvancedSearch(e.target.checked)}
            />
          </SearchRow>

          {showAdvancedSearch && (
            <>
              <SearchRow>
                <SearchField label="제목:">
                  <SearchInput
                    type="text"
                    value={searchParams.inciTtl ?? ''}
                    onChange={(e) =>
                      setSearchParams((prev) => ({ ...prev, inciTtl: e.target.value }))
                    }
                  />
                </SearchField>

                <SearchField label="접수번호:">
                  <SearchInput
                    type="text"
                    value={searchParams.inciNo ?? ''}
                    onChange={(e) =>
                      setSearchParams((prev) => ({ ...prev, inciNo: e.target.value }))
                    }
                  />
                </SearchField>

                <SearchField label="신고기관명:">
                  <SearchInput
                    type="text"
                    value={searchParams.dclInstName ?? ''}
                    onChange={(e) =>
                      setSearchParams((prev) => ({ ...prev, dclInstName: e.target.value }))
                    }
                  />
                </SearchField>

                <SearchField label="피해기관명:">
                  <SearchInput
                    type="text"
                    value={searchParams.dmgInstName ?? ''}
                    onChange={(e) =>
                      setSearchParams((prev) => ({ ...prev, dmgInstName: e.target.value }))
                    }
                  />
                </SearchField>
              </SearchRow>

              <SearchRow>
                <SearchField label="사고유형:">
                  <SearchSelect
                    options={accidentTypeOptions}
                    placeholder="전체"
                    value={searchParams.accdTypCd ?? ''}
                    onChange={(e) =>
                      setSearchParams((prev) => ({ ...prev, accdTypCd: e.target.value }))
                    }
                  />
                </SearchField>

                <SearchField label="우선순위:">
                  <SearchSelect
                    options={priorityOptions}
                    placeholder="전체"
                    value={searchParams.inciPrtyCd ?? ''}
                    onChange={(e) =>
                      setSearchParams((prev) => ({ ...prev, inciPrtyCd: e.target.value }))
                    }
                  />
                </SearchField>

                <SearchField label="망구분:">
                  <SearchSelect
                    options={NET_DIV_OPTIONS}
                    value={searchParams.netDiv ?? ''}
                    onChange={(e) =>
                      setSearchParams((prev) => ({ ...prev, netDiv: e.target.value }))
                    }
                  />
                </SearchField>

                <SearchField label="공격IP:">
                  <SearchInput
                    type="text"
                    value={searchParams.attIp ?? ''}
                    onChange={(e) =>
                      setSearchParams((prev) => ({ ...prev, attIp: e.target.value }))
                    }
                  />
                </SearchField>

                <SearchField label="사고IP:">
                  <SearchInput
                    type="text"
                    value={searchParams.dmgIp ?? ''}
                    onChange={(e) =>
                      setSearchParams((prev) => ({ ...prev, dmgIp: e.target.value }))
                    }
                  />
                </SearchField>

                <SearchField label="예외처리:">
                  <SearchSelect
                    options={EXCEPTION_OPTIONS}
                    value={searchParams.srchException ?? ''}
                    onChange={(e) =>
                      setSearchParams((prev) => ({
                        ...prev,
                        srchException: e.target.value,
                      }))
                    }
                  />
                </SearchField>

                <SearchField label="접수방법:">
                  <SearchSelect
                    options={EXCEPTION_OPTIONS}
                    value={searchParams.srchException ?? ''}
                    onChange={(e) =>
                      setSearchParams((prev) => ({
                        ...prev,
                        srchException: e.target.value,
                      }))
                    }
                  />
                </SearchField>
              </SearchRow>

              <SearchRow>
                <SearchField label="지원센터처리상태:">
                  <SearchSelect
                    options={processStatusOptions}
                    placeholder="전체"
                    value={searchParams.inciPrcsStatCd ?? ''}
                    onChange={(e) =>
                      setSearchParams((prev) => ({
                        ...prev,
                        inciPrcsStatCd: e.target.value,
                      }))
                    }
                  />
                </SearchField>

                <SearchField label="시도처리상태:">
                  <SearchSelect
                    options={processStatusOptions}
                    placeholder="전체"
                    value={searchParams.transInciPrcsStatCd ?? ''}
                    onChange={(e) =>
                      setSearchParams((prev) => ({
                        ...prev,
                        transInciPrcsStatCd: e.target.value,
                      }))
                    }
                  />
                </SearchField>

                <SearchField label="시군구처리상태:">
                  <SearchSelect
                    options={processStatusOptions}
                    placeholder="전체"
                    value={searchParams.transSidoPrcsStatCd ?? ''}
                    onChange={(e) =>
                      setSearchParams((prev) => ({
                        ...prev,
                        transSidoPrcsStatCd: e.target.value,
                      }))
                    }
                  />
                </SearchField>
              </SearchRow>

              <SearchRow>
                <SearchField label="사고내용:">
                  <SearchInput
                    type="text"
                    inputSize="lg"
                    value={searchParams.inciDclCont ?? ''}
                    onChange={(e) =>
                      setSearchParams((prev) => ({
                        ...prev,
                        inciDclCont: e.target.value,
                      }))
                    }
                  />
                </SearchField>

                <SearchField label="조사내용:">
                  <SearchInput
                    type="text"
                    inputSize="lg"
                    value={searchParams.inciInvsCont ?? ''}
                    onChange={(e) =>
                      setSearchParams((prev) => ({
                        ...prev,
                        inciInvsCont: e.target.value,
                      }))
                    }
                  />
                </SearchField>

                <SearchField label="시도의견:">
                  <SearchInput
                    type="text"
                    inputSize="lg"
                    value={searchParams.inciBelowCont ?? ''}
                    onChange={(e) =>
                      setSearchParams((prev) => ({
                        ...prev,
                        inciBelowCont: e.target.value,
                      }))
                    }
                  />
                </SearchField>
              </SearchRow>
            </>
          )}
        </SearchBar>

        <ActionBar>
          <ActionButton icon="search" onClick={handleSearch} title="조회" />
          {canAdd && <ActionButton icon="add" onClick={handleAdd} title="사고신고" />}
          <ActionButton icon="edit" onClick={handleEdit} title="사고수정" />
          <ActionButton icon="delete" onClick={handleDelete} title="삭제" />
          <ActionButton icon="change" onClick={handleExportExcel} title="변경" />
          <ActionButton icon="excel" onClick={handleExportExcel} title="엑셀" />
          {canCopy && <ActionButton icon="refresh" onClick={handleCopy} title="사고복사" />}
        </ActionBar>
      </FilterPanel>

      <div id="data-panel" className="flex-1 min-h-0">
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
    </div>
  )
}
