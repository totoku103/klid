import { useState, useEffect, useCallback, useMemo } from 'react'
import { Input } from '@/components/atoms/Input'
import { boardApi } from '@/services/api/boardApi'
import type { ShareItem } from '@/types'
import { BoardTable, SearchBox, SearchField } from '../components'
import type { BoardColumn } from '../components'

function formatDate(dateStr: string): string {
  if (!dateStr || dateStr.length < 8) return dateStr
  const y = dateStr.substring(0, 4)
  const m = dateStr.substring(4, 6)
  const d = dateStr.substring(6, 8)
  return `${y}-${m}-${d}`
}

export function ShareBoardPage() {
  const [list, setList] = useState<ShareItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRow, setSelectedRow] = useState<ShareItem | null>(null)

  const [searchParams, setSearchParams] = useState({
    title: '',
    bultnCont: '',
  })

  const loadList = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await boardApi.getShareList(searchParams)
      setList(data)
    } catch (err) {
      console.error('Failed to load share list:', err)
    } finally {
      setIsLoading(false)
    }
  }, [searchParams])

  useEffect(() => {
    loadList()
  }, [loadList])

  const handleSearch = useCallback(() => {
    loadList()
  }, [loadList])

  const handleWrite = useCallback(() => {
    window.open(
      '/main/board/pShareBoardWrite',
      'pShareBoardWrite',
      'width=1000,height=650'
    )
  }, [])

  const handleRowClick = useCallback((row: ShareItem) => {
    setSelectedRow(row)
  }, [])

  const handleRowDoubleClick = useCallback((row: ShareItem) => {
    window.open(
      `/main/board/pShareBoardContents?boardNo=${row.bultnNo}`,
      'pShareBoardContents',
      'width=1000,height=650'
    )
  }, [])

  const handleParamChange = useCallback(
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParams((prev) => ({ ...prev, [field]: e.target.value }))
    },
    []
  )

  const columns: BoardColumn<ShareItem>[] = useMemo(
    () => [
      { key: 'index', header: 'NO', width: '5%', align: 'center' },
      { key: 'bultnTitle', header: '제목', width: '50%' },
      { key: 'instNm', header: '기관명', width: '15%', align: 'center' },
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
        width: '5%',
        align: 'center',
        render: (value) =>
          Number(value) > 0 ? (
            <span className="text-blue-600">📎</span>
          ) : null,
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
        <SearchField label="제목">
          <Input
            value={searchParams.title}
            onChange={handleParamChange('title')}
            className="h-8 w-48"
          />
        </SearchField>
        <SearchField label="내용">
          <Input
            value={searchParams.bultnCont}
            onChange={handleParamChange('bultnCont')}
            className="h-8 w-48"
          />
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
