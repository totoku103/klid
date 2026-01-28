import { useState, useEffect, useCallback, useMemo } from 'react'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { envApi } from '@/services/api/envApi'
import type { UserMgmtHistory } from '@/types'
import { cn } from '@/lib/utils'

const REQUEST_TYPES = [
  { value: '', label: '전체' },
  { value: 'REGISTRATION_REQUEST', label: '등록 요청' },
  { value: 'DELETION_REQUEST', label: '삭제 요청' },
  { value: 'MODIFICATION_REQUEST', label: '수정 요청' },
  { value: 'PASSWORD_RESET_REQUEST', label: '비밀번호 초기화 요청' },
  { value: 'OTP_SECRET_KEY_RESET_REQUEST', label: 'OTP 초기화 요청' },
  { value: 'GPKI_SERIAL_NO_RESET_REQUEST', label: '인증서 초기화 요청' },
  { value: 'ACCOUNT_LOCK_RESET_REQUEST', label: '계정 잠김 초기화 요청' },
  { value: 'INACTIVE_RESET_REQUEST', label: '장기 미접속자 초기화 요청' },
]

const PROCESS_STATES = [
  { value: '', label: '전체' },
  { value: 'REQUEST', label: '요청' },
  { value: 'CANCELLATION_REQUEST', label: '요청 취소' },
  { value: 'REVIEWING', label: '검토' },
  { value: 'APPROVAL', label: '승인' },
  { value: 'REJECTION', label: '반려' },
]

function getDefaultDates(): { date1: string; date2: string } {
  const today = new Date()
  const weekAgo = new Date(today)
  weekAgo.setDate(weekAgo.getDate() - 7)
  const format = (d: Date) => d.toISOString().slice(0, 10)
  return { date1: format(weekAgo), date2: format(today) }
}

function formatDatetime(dateStr: string): string {
  if (!dateStr || dateStr.length < 14) return dateStr
  const y = dateStr.substring(0, 4)
  const m = dateStr.substring(4, 6)
  const d = dateStr.substring(6, 8)
  const hh = dateStr.substring(8, 10)
  const mm = dateStr.substring(10, 12)
  const ss = dateStr.substring(12, 14)
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

export function UserMgmtHistoryPage() {
  const defaultDates = useMemo(() => getDefaultDates(), [])

  const [dateInputs, setDateInputs] = useState(defaultDates)
  const [searchParams, setSearchParams] = useState({
    userName: '',
    requestType: '',
    processState: '',
  })
  const [data, setData] = useState<UserMgmtHistory[]>([])
  const [selectedRow, setSelectedRow] = useState<UserMgmtHistory | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await envApi.getUserMgmtHistoryList({
        searchUserName: searchParams.userName,
        searchDateFrom: dateInputs.date1,
        searchDateTo: dateInputs.date2,
        searchRequestType: searchParams.requestType,
        searchProcessState: searchParams.processState,
      })
      setData(result || [])
    } catch (err) {
      console.error('Failed to load data:', err)
      setData([])
    } finally {
      setIsLoading(false)
    }
  }, [dateInputs, searchParams])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleSearch = useCallback(() => {
    loadData()
  }, [loadData])

  return (
    <>
      <div className="mb-2 flex flex-wrap items-center gap-2 rounded border border-gray-300 bg-gray-50 p-2">
        <label className="text-sm">요청 일자:</label>
        <input
          type="date"
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={dateInputs.date1}
          onChange={(e) => setDateInputs((prev) => ({ ...prev, date1: e.target.value }))}
        />
        <span>~</span>
        <input
          type="date"
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={dateInputs.date2}
          onChange={(e) => setDateInputs((prev) => ({ ...prev, date2: e.target.value }))}
        />
        <label className="ml-4 text-sm">처리 상태:</label>
        <select
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchParams.processState}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, processState: e.target.value }))
          }
        >
          {PROCESS_STATES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <label className="ml-4 text-sm">요청 유형:</label>
        <select
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchParams.requestType}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, requestType: e.target.value }))
          }
        >
          {REQUEST_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <label className="ml-4 text-sm">사용자 이름:</label>
        <input
          type="text"
          className="w-32 rounded border border-gray-300 px-2 py-1 text-sm"
          value={searchParams.userName}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, userName: e.target.value }))
          }
          placeholder="이름 입력"
        />
      </div>

      <PageToolbar>
        <ToolbarButton icon="search" onClick={handleSearch} title="조회" />
      </PageToolbar>

      <div className="h-[calc(100%-130px)] overflow-auto rounded border border-gray-300">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th colSpan={4} className="border border-gray-300 bg-gray-200 p-1 text-center">
                요청
              </th>
              <th colSpan={3} className="border border-gray-300 bg-gray-200 p-1 text-center">
                사용자
              </th>
              <th colSpan={2} className="border border-gray-300 bg-gray-200 p-1 text-center">
                요청자
              </th>
              <th colSpan={4} className="border border-gray-300 bg-gray-200 p-1 text-center">
                승인자
              </th>
            </tr>
            <tr>
              <th className="border border-gray-300 p-2 text-center">변경 요청 일자</th>
              <th className="border border-gray-300 p-2 text-center">처리 상태</th>
              <th className="border border-gray-300 p-2 text-center">유형</th>
              <th className="border border-gray-300 p-2 text-center">사유</th>
              <th className="border border-gray-300 p-2 text-center">ID</th>
              <th className="border border-gray-300 p-2 text-center">이름</th>
              <th className="border border-gray-300 p-2 text-center">기관명</th>
              <th className="border border-gray-300 p-2 text-center">이름</th>
              <th className="border border-gray-300 p-2 text-center">기관명</th>
              <th className="border border-gray-300 p-2 text-center">이름</th>
              <th className="border border-gray-300 p-2 text-center">기관명</th>
              <th className="border border-gray-300 p-2 text-center">사유</th>
              <th className="border border-gray-300 p-2 text-center">일시</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={13} className="p-4 text-center text-gray-500">
                  로딩 중...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={13} className="p-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.commUserRequestSeq}
                  onClick={() => setSelectedRow(item)}
                  className={cn(
                    'cursor-pointer hover:bg-gray-50',
                    selectedRow?.commUserRequestSeq === item.commUserRequestSeq && 'bg-blue-100'
                  )}
                >
                  <td className="border-b border-gray-200 p-2 text-center">
                    {formatDatetime(item.requestRegDt)}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.processStateMessage}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {item.requestTypeMessage}
                  </td>
                  <td className="border-b border-gray-200 p-2">{item.requestReason}</td>
                  <td className="border-b border-gray-200 p-2">{item.originUserId}</td>
                  <td className="border-b border-gray-200 p-2">{item.originUserName}</td>
                  <td className="border-b border-gray-200 p-2">{item.originUserInstName}</td>
                  <td className="border-b border-gray-200 p-2">{item.requestUserName}</td>
                  <td className="border-b border-gray-200 p-2">{item.requestUserInstName}</td>
                  <td className="border-b border-gray-200 p-2">{item.approveUserName}</td>
                  <td className="border-b border-gray-200 p-2">{item.approveUserInstName}</td>
                  <td className="border-b border-gray-200 p-2">{item.approveReason}</td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {formatDatetime(item.approveRegDt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
