import { useState, useEffect, useCallback, useMemo } from 'react'
import { globalAlert } from '@/utils/alert'
import { globalConfirm } from '@/utils/confirm'
import { SubPageLayout, PageToolbar, ToolbarButton } from '@/components/templates'
import { sysApi } from '@/services/api/sysApi'
import { cn } from '@/lib/utils'

const WEEKDAY_NAMES = ['일', '월', '화', '수', '목', '금', '토']

function formatDateToCode(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}${month}${day}`
}

function formatDateDisplay(date: Date): string {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${WEEKDAY_NAMES[date.getDay()]})`
}

export function WeekMgmtPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [holidays, setHolidays] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadHolidays = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await sysApi.getWeekDayList()
      setHolidays(data.map((d) => d.comCode2))
    } catch (err) {
      console.error('Failed to load holidays:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadHolidays()
  }, [loadHolidays])

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startOffset = firstDay.getDay()

    const days: (Date | null)[] = []

    for (let i = 0; i < startOffset; i++) {
      days.push(null)
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }, [currentDate])

  const handlePrevMonth = useCallback(() => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }, [])

  const handleNextMonth = useCallback(() => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }, [])

  const handleDateClick = useCallback((date: Date) => {
    setSelectedDate(date)
  }, [])

  const isHoliday = useCallback(
    (date: Date) => {
      return holidays.includes(formatDateToCode(date))
    },
    [holidays]
  )

  const isWeekend = useCallback((date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }, [])

  const canAddHoliday = useMemo(() => {
    if (!selectedDate) return false
    if (isWeekend(selectedDate)) return false
    if (isHoliday(selectedDate)) return false
    return true
  }, [selectedDate, isWeekend, isHoliday])

  const canDeleteHoliday = useMemo(() => {
    if (!selectedDate) return false
    return isHoliday(selectedDate)
  }, [selectedDate, isHoliday])

  const handleAddHoliday = useCallback(async () => {
    if (!selectedDate) return
    if (!await globalConfirm('공휴일로 추가하시겠습니까?\n\n※추가하시면 해당 일에 해당하는 사고가 주중에서 공휴일로 모두 변경됩니다.'))
      return

    const dateCode = formatDateToCode(selectedDate)
    try {
      await sysApi.addWeekDay({
        comCode1: 4005,
        comCode2: dateCode,
        codeName: `공휴일${dateCode}`,
        codeLvl: 2,
        useYn: 'Y',
        weekYn: 1,
      })
      globalAlert.success('추가되었습니다.')
      loadHolidays()
    } catch {
      globalAlert.error('추가에 실패했습니다.')
    }
  }, [selectedDate, loadHolidays])

  const handleDeleteHoliday = useCallback(async () => {
    if (!selectedDate) return
    if (!await globalConfirm('설정된 공휴일을 삭제하시겠습니까?\n\n※삭제하시면 해당 일에 해당하는 사고가 공휴일에서 주중으로 모두 변경됩니다.'))
      return

    const dateCode = formatDateToCode(selectedDate)
    try {
      await sysApi.deleteWeekDay({
        comCode1: 4005,
        comCode2: dateCode,
        codeName: `공휴일${dateCode}`,
        codeLvl: 2,
        useYn: 'Y',
        weekYn: 0,
      })
      globalAlert.success('삭제되었습니다.')
      loadHolidays()
    } catch {
      globalAlert.error('삭제에 실패했습니다.')
    }
  }, [selectedDate, loadHolidays])

  return (
    <SubPageLayout locationPath={['시스템관리', '공휴일관리']}>
      <PageToolbar>
        {canAddHoliday && <ToolbarButton icon="add" onClick={handleAddHoliday} title="공휴일 추가" />}
        {canDeleteHoliday && <ToolbarButton icon="delete" onClick={handleDeleteHoliday} title="공휴일 삭제" />}
      </PageToolbar>

      <div className="flex gap-4">
        <div className="flex-1 rounded border border-gray-300 p-4">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="rounded px-3 py-1 hover:bg-gray-100"
            >
              ◀
            </button>
            <h3 className="text-lg font-semibold">
              {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
            </h3>
            <button
              type="button"
              onClick={handleNextMonth}
              className="rounded px-3 py-1 hover:bg-gray-100"
            >
              ▶
            </button>
          </div>

          {isLoading ? (
            <div className="py-8 text-center text-gray-500">로딩 중...</div>
          ) : (
            <>
              <div className="mb-2 grid grid-cols-7 text-center text-sm font-semibold">
                {WEEKDAY_NAMES.map((name, idx) => (
                  <div
                    key={name}
                    className={cn(
                      'py-2',
                      idx === 0 && 'text-red-500',
                      idx === 6 && 'text-blue-500'
                    )}
                  >
                    {name}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, idx) => {
                  if (!date) {
                    return <div key={`empty-${idx}`} className="h-12" />
                  }

                  const isSelected =
                    selectedDate &&
                    date.getDate() === selectedDate.getDate() &&
                    date.getMonth() === selectedDate.getMonth() &&
                    date.getFullYear() === selectedDate.getFullYear()

                  const isHolidayDate = isHoliday(date)
                  const isWeekendDate = isWeekend(date)
                  const dayOfWeek = date.getDay()

                  return (
                    <div
                      key={date.toISOString()}
                      onClick={() => handleDateClick(date)}
                      className={cn(
                        'flex h-12 cursor-pointer flex-col items-center justify-center rounded border text-sm transition-colors',
                        isSelected && 'ring-2 ring-blue-500',
                        isHolidayDate && 'bg-red-100 text-red-600',
                        isWeekendDate && !isHolidayDate && 'bg-gray-100',
                        dayOfWeek === 0 && !isHolidayDate && 'text-red-500',
                        dayOfWeek === 6 && !isHolidayDate && 'text-blue-500',
                        !isSelected && !isHolidayDate && !isWeekendDate && 'hover:bg-gray-50'
                      )}
                    >
                      <span>{date.getDate()}</span>
                      {isHolidayDate && <span className="text-xs">공휴일</span>}
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>

        <div className="w-80 rounded border border-gray-300 p-4">
          <h3 className="mb-4 font-semibold">선택된 날짜</h3>
          {selectedDate ? (
            <div>
              <p className="mb-2 text-lg">{formatDateDisplay(selectedDate)}</p>
              <p
                className={cn(
                  'font-semibold',
                  isHoliday(selectedDate)
                    ? 'text-red-600'
                    : isWeekend(selectedDate)
                      ? 'text-blue-600'
                      : 'text-gray-600'
                )}
              >
                {isHoliday(selectedDate)
                  ? '공휴일'
                  : isWeekend(selectedDate)
                    ? '주말'
                    : '평일 (주중)'}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">날짜를 선택해주세요</p>
          )}

          <div className="mt-6">
            <h4 className="mb-2 font-semibold">범례</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-red-100 border"></div>
                <span>지정된 공휴일</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-gray-100 border"></div>
                <span>주말 (토/일)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-white border"></div>
                <span>평일</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
