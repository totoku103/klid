import { useState, useEffect, useCallback, useMemo } from 'react'
import { globalAlert } from '@/utils/alert'
import { Input } from '@/components/atoms/Input'
import { useUserStore } from '@/stores/userStore'
import { boardApi } from '@/services/api/boardApi'
import type { QnaItem } from '@/types'
import { BoardTable, SearchBox, SearchField } from '../components'
import type { BoardColumn } from '../components'

function formatDate(dateStr: string): string {
  if (!dateStr || dateStr.length < 8) return dateStr
  const y = dateStr.substring(0, 4)
  const m = dateStr.substring(4, 6)
  const d = dateStr.substring(6, 8)
  return `${y}-${m}-${d}`
}

export function QnaBoardPage() {
  const { user } = useUserStore()
  const [list, setList] = useState<QnaItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRow, setSelectedRow] = useState<QnaItem | null>(null)

  const [searchParams, setSearchParams] = useState({
    title: '',
    bultnCont: '',
  })

  const loadList = useCallback(async () => {
    if (!user) return
    setIsLoading(true)
    try {
      const data = await boardApi.getQnaList({
        ...searchParams,
        sInstCd: user.instCd.toString(),
      })
      setList(data)
    } catch (err) {
      console.error('Failed to load QnA list:', err)
    } finally {
      setIsLoading(false)
    }
  }, [user, searchParams])

  useEffect(() => {
    loadList()
  }, [loadList])

  const handleSearch = useCallback(() => {
    loadList()
  }, [loadList])

  const handleWrite = useCallback(() => {
    window.open(
      '/main/board/pQnaBoardWrite',
      'pQnaBoardWrite',
      'width=1000,height=650'
    )
  }, [])

  const handleRowClick = useCallback((row: QnaItem) => {
    setSelectedRow(row)
  }, [])

  const handleRowDoubleClick = useCallback(
    (row: QnaItem) => {
      if (row.isSecret === 'Y') {
        if (user?.authRole.main !== 'AUTH_MAIN_1' && row.userId !== user?.userId) {
          globalAlert.info('비밀글입니다.')
          return
        }
      }
      window.open(
        `/main/board/pQnaBoardContents?boardNo=${row.bultnNo}`,
        'pQnaBoardContents',
        'width=1000,height=650'
      )
    },
    [user]
  )

  const handleParamChange = useCallback(
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParams((prev) => ({ ...prev, [field]: e.target.value }))
    },
    []
  )

  const columns: BoardColumn<QnaItem>[] = useMemo(
    () => [
      { key: 'index', header: 'NO', width: '5%', align: 'center' },
      {
        key: 'bultnTitle',
        header: '제목',
        width: '50%',
        render: (value, row) => (
          <span style={{ paddingLeft: (row.level || 0) * 20 }}>
            {row.isSecret === 'Y' && <span className="mr-1 text-red-500">🔒</span>}
            {row.level && row.level > 0 && (
              <span className="mr-1 text-gray-400">↳</span>
            )}
            {String(value)}
          </span>
        ),
      },
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
