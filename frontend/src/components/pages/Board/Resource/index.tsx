import { useState, useEffect, useCallback, useMemo } from 'react'
import { Input } from '@/components/atoms/Input'
import { boardApi } from '@/services/api/boardApi'
import type { ResourceItem, BoardCategory } from '@/types'
import { BoardTable, SearchBox, SearchField } from '../components'
import type { BoardColumn } from '../components'

function formatDate(dateStr: string): string {
  if (!dateStr || dateStr.length < 8) return dateStr
  const y = dateStr.substring(0, 4)
  const m = dateStr.substring(4, 6)
  const d = dateStr.substring(6, 8)
  return `${y}-${m}-${d}`
}

export function ResourceBoardPage() {
  const [list, setList] = useState<ResourceItem[]>([])
  const [categories, setCategories] = useState<BoardCategory[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRow, setSelectedRow] = useState<ResourceItem | null>(null)

  const [searchParams, setSearchParams] = useState({
    cateNo: '',
    title: '',
    bultnCont: '',
  })

  const loadCategories = useCallback(async () => {
    try {
      const data = await boardApi.getResourceCategoryList()
      setCategories(data)
    } catch (err) {
      console.error('Failed to load categories:', err)
    }
  }, [])

  const loadList = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await boardApi.getResourceList(searchParams)
      setList(data)
    } catch (err) {
      console.error('Failed to load resource list:', err)
    } finally {
      setIsLoading(false)
    }
  }, [searchParams])

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
      '/main/board/pResourceBoardWrite',
      'pResourceBoardWrite',
      'width=1000,height=650'
    )
  }, [])

  const handleRowClick = useCallback((row: ResourceItem) => {
    setSelectedRow(row)
  }, [])

  const handleRowDoubleClick = useCallback((row: ResourceItem) => {
    window.open(
      `/main/board/pResourceBoardContents?boardNo=${row.bultnNo}`,
      'pResourceBoardContents',
      'width=1000,height=650'
    )
  }, [])

  const handleParamChange = useCallback(
    (field: string) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearchParams((prev) => ({ ...prev, [field]: e.target.value }))
      },
    []
  )

  const columns: BoardColumn<ResourceItem>[] = useMemo(
    () => [
      { key: 'index', header: 'NO', width: '5%', align: 'center' },
      { key: 'cateName', header: '분류', width: '10%', align: 'center' },
      { key: 'bultnTitle', header: '제목', width: '45%' },
      { key: 'instNm', header: '기관명', width: '12%', align: 'center' },
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
        width: '4%',
        align: 'center',
        render: (value) => Number(value).toLocaleString(),
      },
    ],
    []
  )

  return (
    <>
      <SearchBox onSearch={handleSearch} onWrite={handleWrite}>
        <SearchField label="분류">
          <select
            value={searchParams.cateNo}
            onChange={handleParamChange('cateNo')}
            className="h-8 rounded border border-gray-300 px-2 text-sm"
          >
            <option value="">전체</option>
            {categories.map((c) => (
              <option key={c.cateNo} value={c.cateNo}>
                {c.cateName}
              </option>
            ))}
          </select>
        </SearchField>
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
