import { useState, useEffect, useCallback, useMemo } from 'react'
import { Input } from '@/components/atoms/Input'
import { useUserStore } from '@/stores/userStore'
import { boardApi } from '@/services/api/boardApi'
import type { NoticeItem, BoardCategory } from '@/types'
import {
  BoardTable,
  SearchBox,
  SearchField,
  NoticeTypeBadge,
} from '../components'
import type { BoardColumn } from '../components'

function formatDate(dateStr: string): string {
  if (!dateStr || dateStr.length < 8) return dateStr
  const y = dateStr.substring(0, 4)
  const m = dateStr.substring(4, 6)
  const d = dateStr.substring(6, 8)
  return `${y}-${m}-${d}`
}

function getDateRange(): { startDate: string; endDate: string } {
  const now = new Date()
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)

  const format = (d: Date) =>
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`

  return {
    startDate: format(weekAgo) + '000000',
    endDate: format(now) + '235959',
  }
}

export function NoticeBoardPage() {
  const { user } = useUserStore()
  const [list, setList] = useState<NoticeItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRow, setSelectedRow] = useState<NoticeItem | null>(null)

  const [groupTypes, setGroupTypes] = useState<BoardCategory[]>([])
  const [noticeTypes, setNoticeTypes] = useState<BoardCategory[]>([])
  const [srcTypes, setSrcTypes] = useState<{ comCode2: string; codeName: string }[]>([])

  const [searchParams, setSearchParams] = useState({
    groupType: '',
    noticeType: '',
    title: '',
    bultnCont: '',
    instNm: '',
    sControl: '',
  })

  const loadCategories = useCallback(async () => {
    try {
      const [groups, notices, srcs] = await Promise.all([
        boardApi.getBoardTypeList('group'),
        boardApi.getBoardTypeList('notice'),
        boardApi.getNoticeSrcType(),
      ])
      setGroupTypes(groups)
      setNoticeTypes(notices)
      setSrcTypes(srcs)
    } catch (err) {
      console.error('Failed to load categories:', err)
    }
  }, [])

  const loadList = useCallback(async () => {
    if (!user) return
    setIsLoading(true)
    try {
      const { startDate, endDate } = getDateRange()
      const data = await boardApi.getNoticeList({
        ...searchParams,
        sInstCd: user.instCd,
        sPntInstCd: user.pntInstCd,
        sAuthMain: user.authMain,
        startDate,
        endDate,
      })
      setList(data)
    } catch (err) {
      console.error('Failed to load notice list:', err)
    } finally {
      setIsLoading(false)
    }
  }, [user, searchParams])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  useEffect(() => {
    loadList()
  }, [loadList])

  const handleSearch = useCallback(() => {
    loadList()
  }, [loadList])

  const handleWrite = useCallback(() => {
    window.open(
      '/main/board/pNoticeBoardWrite',
      'pNoticeBoardWrite',
      'width=1000,height=750'
    )
  }, [])

  const handleRowClick = useCallback((row: NoticeItem) => {
    setSelectedRow(row)
  }, [])

  const handleRowDoubleClick = useCallback((row: NoticeItem) => {
    window.open(
      `/main/board/pNoticeBoardContents?boardNo=${row.bultnNo}`,
      'pNoticeBoardContents',
      'width=1000,height=750'
    )
  }, [])

  const handleParamChange = useCallback(
    (field: string) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearchParams((prev) => ({ ...prev, [field]: e.target.value }))
      },
    []
  )

  const columns: BoardColumn<NoticeItem>[] = useMemo(
    () => [
      { key: 'index', header: 'NO', width: '5%', align: 'center' },
      { key: 'groupType', header: '그룹', width: '5%', align: 'center' },
      {
        key: 'noticeType',
        header: '분류',
        width: '6%',
        align: 'center',
        render: (value) => <NoticeTypeBadge type={String(value)} />,
      },
      { key: 'bultnTitle', header: '제목', width: '40%' },
      { key: 'controlStr', header: '제공기관', width: '6%', align: 'center' },
      { key: 'instNm', header: '기관명', width: '8%', align: 'center' },
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
        width: '4%',
        align: 'center',
        render: (value) =>
          Number(value) > 0 ? (
            <span className="text-blue-600">📎</span>
          ) : null,
      },
      {
        key: 'readCnt',
        header: '조회수',
        width: '6%',
        align: 'center',
        render: (value) => Number(value).toLocaleString(),
      },
    ],
    []
  )

  return (
    <>
      <SearchBox onSearch={handleSearch} onWrite={handleWrite}>
        <SearchField label="그룹분류">
          <select
            value={searchParams.groupType}
            onChange={handleParamChange('groupType')}
            className="h-8 rounded border border-gray-300 px-2 text-sm"
          >
            <option value="">전체</option>
            {groupTypes.map((g) => (
              <option key={g.cateNo} value={g.cateNo}>
                {g.cateName}
              </option>
            ))}
          </select>
        </SearchField>
        <SearchField label="공지분류">
          <select
            value={searchParams.noticeType}
            onChange={handleParamChange('noticeType')}
            className="h-8 rounded border border-gray-300 px-2 text-sm"
          >
            <option value="">전체</option>
            {noticeTypes.map((n) => (
              <option key={n.cateNo} value={n.cateNo}>
                {n.cateName}
              </option>
            ))}
          </select>
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
        <SearchField label="기관명">
          <Input
            value={searchParams.instNm}
            onChange={handleParamChange('instNm')}
            className="h-8 w-40"
          />
        </SearchField>
        <SearchField label="제공기관">
          <select
            value={searchParams.sControl}
            onChange={handleParamChange('sControl')}
            className="h-8 rounded border border-gray-300 px-2 text-sm"
          >
            <option value="">모두</option>
            {srcTypes.map((s) => (
              <option key={s.comCode2} value={s.comCode2}>
                {s.codeName}
              </option>
            ))}
          </select>
        </SearchField>
      </SearchBox>

      <div className="h-[calc(100%-100px)]">
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
