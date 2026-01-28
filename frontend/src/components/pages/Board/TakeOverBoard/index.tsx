import { useState, useEffect, useCallback, useMemo } from 'react'
import { Input } from '@/components/atoms/Input'
import { useUserStore } from '@/stores/userStore'
import { boardApi } from '@/services/api/boardApi'
import type { TakeOverBoardItem } from '@/types'
import { BoardTable, SearchBox, SearchField } from '../components'
import type { BoardColumn } from '../components'

function formatDate(dateStr: string): string {
  if (!dateStr || dateStr.length < 8) return dateStr
  const y = dateStr.substring(0, 4)
  const m = dateStr.substring(4, 6)
  const d = dateStr.substring(6, 8)
  return `${y}-${m}-${d}`
}

function getDefaultDates(): { date1: string; date2: string } {
  const today = new Date()
  const monthAgo = new Date(today)
  monthAgo.setMonth(monthAgo.getMonth() - 1)
  const format = (d: Date) => d.toISOString().slice(0, 10)
  return { date1: format(monthAgo), date2: format(today) }
}

export function TakeOverBoardPage() {
  const { user } = useUserStore()
  const defaultDates = useMemo(() => getDefaultDates(), [])

  const [list, setList] = useState<TakeOverBoardItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRow, setSelectedRow] = useState<TakeOverBoardItem | null>(null)

  const [dateInputs, setDateInputs] = useState(defaultDates)
  const [searchParams, setSearchParams] = useState({
    title: '',
    bultnCont: '',
    readFlag: -1,
    isCloseFlag: -1,
  })

  const loadList = useCallback(async () => {
    if (!user) return
    setIsLoading(true)
    try {
      const data = await boardApi.getTakeOverBoardList({
        ...searchParams,
        date1: dateInputs.date1.replace(/-/g, ''),
        date2: dateInputs.date2.replace(/-/g, ''),
        sInstCd: user.instCd.toString(),
        sPntInstCd: '', // pntInstCd removed from User type
        sAuthMain: user.authRole.main,
      })
      setList(data)
    } catch (err) {
      console.error('Failed to load take over board list:', err)
    } finally {
      setIsLoading(false)
    }
  }, [user, searchParams, dateInputs])

  useEffect(() => {
    loadList()
  }, [loadList])

  const handleSearch = useCallback(() => {
    loadList()
  }, [loadList])

  const handleWrite = useCallback(() => {
    window.open('/main/board/pTakeOverBoardWrite', 'pTakeOverBoardWrite', 'width=1000,height=750')
  }, [])

  const handleRowClick = useCallback((row: TakeOverBoardItem) => {
    setSelectedRow(row)
  }, [])

  const handleRowDoubleClick = useCallback((row: TakeOverBoardItem) => {
    window.open(
      `/main/board/pTakeOverBoardContents?boardNo=${row.bultnNo}`,
      'pTakeOverBoardContents',
      'width=1000,height=750'
    )
  }, [])

  const handleParamChange = useCallback(
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParams((prev) => ({ ...prev, [field]: e.target.value }))
    },
    []
  )

  const columns: BoardColumn<TakeOverBoardItem>[] = useMemo(
    () => [
      { key: 'index', header: 'NO', width: '5%', align: 'center' },
      { key: 'bultnTitle', header: '제목', width: 'auto' },
      { key: 'instNm', header: '소속', width: '10%', align: 'center' },
      { key: 'userName', header: '게시자', width: '10%', align: 'center' },
      {
        key: 'regDate',
        header: '등록일',
        width: '10%',
        align: 'center',
        render: (value) => formatDate(String(value)),
      },
      {
        key: 'fileCount',
        header: '첨부',
        width: '3%',
        align: 'center',
        render: (value) =>
          Number(value) > 0 ? <span className="text-blue-600">📎</span> : null,
      },
      {
        key: 'readFlag',
        header: '확인',
        width: '5%',
        align: 'center',
        render: (value) => (Number(value) === 1 ? '확인' : '미확인'),
      },
      {
        key: 'isCloseFlag',
        header: '종결',
        width: '5%',
        align: 'center',
        render: (value) => (Number(value) === 1 ? '종결' : '미종결'),
      },
      {
        key: 'readCnt',
        header: '조회수',
        width: '5%',
        align: 'center',
        render: (value) => Number(value).toLocaleString(),
      },
    ],
    []
  )

  return (
    <>
      <SearchBox onSearch={handleSearch} onWrite={handleWrite}>
        <SearchField label="기간">
          <input
            type="date"
            className="h-8 rounded border border-gray-300 px-2 text-sm"
            value={dateInputs.date1}
            onChange={(e) => setDateInputs((prev) => ({ ...prev, date1: e.target.value }))}
          />
          <span className="mx-1">~</span>
          <input
            type="date"
            className="h-8 rounded border border-gray-300 px-2 text-sm"
            value={dateInputs.date2}
            onChange={(e) => setDateInputs((prev) => ({ ...prev, date2: e.target.value }))}
          />
        </SearchField>
        <SearchField label="제목">
          <Input
            value={searchParams.title}
            onChange={handleParamChange('title')}
            className="h-8 w-40"
          />
        </SearchField>
        <SearchField label="내용">
          <Input
            value={searchParams.bultnCont}
            onChange={handleParamChange('bultnCont')}
            className="h-8 w-40"
          />
        </SearchField>
      </SearchBox>

      <div className="mb-2 flex items-center gap-4 rounded border border-gray-300 bg-gray-50 p-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">확인:</span>
          {[
            { value: -1, label: '전체' },
            { value: 1, label: '확인' },
            { value: 0, label: '미확인' },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                name="readFlag"
                checked={searchParams.readFlag === opt.value}
                onChange={() =>
                  setSearchParams((prev) => ({ ...prev, readFlag: opt.value }))
                }
              />
              {opt.label}
            </label>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">종결:</span>
          {[
            { value: -1, label: '전체' },
            { value: 1, label: '종결' },
            { value: 0, label: '미종결' },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                name="isCloseFlag"
                checked={searchParams.isCloseFlag === opt.value}
                onChange={() =>
                  setSearchParams((prev) => ({ ...prev, isCloseFlag: opt.value }))
                }
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div className="h-[calc(100%-150px)]">
        <BoardTable
          columns={columns}
          data={list}
          totalCount={list.length}
          isLoading={isLoading}
          selectedRow={selectedRow}
          rowKey="bultnNo"
          onRowClick={handleRowClick}
          onRowDoubleClick={handleRowDoubleClick}
        />
      </div>
    </>
  )
}
