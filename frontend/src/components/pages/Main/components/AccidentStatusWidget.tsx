import type { AccidentStatus, YearStatus, PeriodSetting, PeriodStatus } from '@/types'

export interface AccidentStatusWidgetProps {
  accidentStatus: AccidentStatus | null
  yearStatus: YearStatus | null
  periodSetting: PeriodSetting | null
  periodStatus: PeriodStatus | null
}

function formatNumber(num: number | undefined | null): string {
  if (num == null) return '0'
  return num.toLocaleString()
}

function ComputerMonitorSvg() {
  return (
    <svg width="120" height="100" viewBox="0 0 120 100">
      <rect x="10" y="5" width="100" height="70" rx="3" fill="#1a365d" stroke="#2d4a6f" strokeWidth="2" />
      <rect x="15" y="10" width="90" height="55" rx="2" fill="#2d4a6f" />
      <rect x="20" y="15" width="80" height="45" fill="#4a90a4" />
      <rect x="25" y="20" width="30" height="8" fill="#6ab7c8" />
      <rect x="60" y="20" width="35" height="8" fill="#87ceeb" />
      <rect x="25" y="32" width="70" height="3" fill="#e0e0e0" />
      <rect x="25" y="38" width="55" height="3" fill="#e0e0e0" />
      <rect x="25" y="44" width="65" height="3" fill="#e0e0e0" />
      <rect x="25" y="50" width="40" height="3" fill="#e0e0e0" />
      <rect x="50" y="75" width="20" height="8" fill="#2d4a6f" />
      <rect x="35" y="83" width="50" height="6" rx="1" fill="#1a365d" />
      <rect x="38" y="87" width="44" height="3" rx="1" fill="#0f2a47" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 10h10m0 0l-4-4m4 4l-4 4" stroke="#d4a845" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function AccidentStatusWidget({
  accidentStatus,
  yearStatus,
  periodSetting,
  periodStatus,
}: AccidentStatusWidgetProps) {
  const ing = accidentStatus?.ing ?? 0
  const end = accidentStatus?.end ?? 0
  const total = ing + end
  const yearEnd = yearStatus?.end ?? 0
  const currentYear = new Date().getFullYear()

  const period1 = periodSetting?.period1 ?? 15
  const period2 = periodSetting?.period2 ?? 24
  const period3 = periodSetting?.period3 ?? 30

  return (
    <div className="h-full rounded border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <svg
            className="h-4 w-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="text-sm font-bold text-gray-800">침해사고 / 기간별 미처리현황</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600" type="button">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      </div>

      <div className="flex gap-4 p-4">
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-1">
            <span className="text-xs font-semibold text-gray-600">▶</span>
            <span className="text-xs font-semibold text-gray-700">침해사고현황</span>
          </div>

          <div className="mb-4 flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded bg-[#3b6b7c] px-3 py-1.5">
              <span className="text-xs text-white">사고접수</span>
              <span className="text-sm font-bold text-yellow-300">{formatNumber(total)}</span>
            </div>
            <ArrowIcon />
            <div className="flex items-center gap-1.5 rounded bg-[#3b6b7c] px-3 py-1.5">
              <span className="text-xs text-white">처리중</span>
              <span className="text-sm font-bold text-yellow-300">{formatNumber(ing)}</span>
            </div>
            <ArrowIcon />
            <div className="flex items-center gap-1.5 rounded bg-[#3b6b7c] px-3 py-1.5">
              <span className="text-xs text-white">처리완료</span>
              <span className="text-sm font-bold text-yellow-300">{formatNumber(end)}</span>
            </div>

            <div className="ml-2 flex flex-col items-center rounded border border-gray-300 bg-[#fffde7] px-4 py-1.5">
              <span className="text-xs font-semibold text-gray-700">{currentYear}년 처리완료</span>
              <span className="text-lg font-bold text-gray-800">{formatNumber(yearEnd)}</span>
            </div>
          </div>

          <div className="mb-2 flex items-center gap-1">
            <span className="text-xs font-semibold text-gray-600">▶</span>
            <span className="text-xs font-semibold text-gray-700">기간별 미처리현황</span>
          </div>

          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="border border-gray-300 bg-[#3b6b7c] px-3 py-2 text-white">기간별</th>
                <th className="border border-gray-300 bg-[#4a8fa8] px-3 py-2 text-white">{period1}일 이내</th>
                <th className="border border-gray-300 bg-[#4a8fa8] px-3 py-2 text-white">{period1}~{period2}일</th>
                <th className="border border-gray-300 bg-[#4a8fa8] px-3 py-2 text-white">{period3}일 이상</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 bg-gray-50 px-3 py-2 text-center font-medium">
                  미처리 현황
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                  {formatNumber(periodStatus?.cnt1)}건
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                  {formatNumber(periodStatus?.cnt2)}건
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                  {formatNumber(periodStatus?.cnt3)}건
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center">
          <ComputerMonitorSvg />
        </div>
      </div>
    </div>
  )
}
