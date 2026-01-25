import type { ThreatLevel } from '@/types'

export interface AlarmStepWidgetProps {
  threatLevel: ThreatLevel
}

const LEVELS = [
  { level: 1, name: '관심', color: '#488bb7' },
  { level: 2, name: '주의', color: '#f3c529' },
  { level: 3, name: '경계', color: '#f86a0b' },
  { level: 4, name: '심각', color: '#e11313' },
] as const

const GAUGE_SEGMENTS = [
  { path: 'M 30 110 A 70 70 0 0 1 40 55', color: '#488bb7', labelX: 20, labelY: 95, name: '관심', cap: 'round' },
  { path: 'M 45 50 A 70 70 0 0 1 90 20', color: '#f3c529', labelX: 55, labelY: 30, name: '주의', cap: 'butt' },
  { path: 'M 95 20 A 70 70 0 0 1 140 55', color: '#f86a0b', labelX: 115, labelY: 30, name: '경계', cap: 'butt' },
  { path: 'M 145 60 A 70 70 0 0 1 150 110', color: '#e11313', labelX: 150, labelY: 95, name: '심각', cap: 'round' },
] as const

export function AlarmStepWidget({ threatLevel }: AlarmStepWidgetProps) {
  const currentLevel = LEVELS.find((l) => l.level === threatLevel) || LEVELS[0]

  return (
    <div className="h-full rounded border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-2.5">
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
        <span className="text-sm font-bold text-gray-800">예·경보 발령단계</span>
      </div>

      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex flex-col gap-2">
          {LEVELS.map((level) => (
            <div key={level.level} className="flex items-center gap-2">
              <span
                className="h-3 w-4"
                style={{ backgroundColor: level.color }}
              />
              <span className="text-xs text-gray-700">{level.name}</span>
            </div>
          ))}
        </div>

        <div className="relative">
          <svg width="180" height="140" viewBox="0 0 180 140">
            {GAUGE_SEGMENTS.map((segment) => (
              <path
                key={segment.name}
                d={segment.path}
                fill="none"
                stroke={segment.color}
                strokeWidth="25"
                strokeLinecap={segment.cap as 'round' | 'butt'}
              />
            ))}

            {GAUGE_SEGMENTS.map((segment) => (
              <text
                key={`label-${segment.name}`}
                x={segment.labelX}
                y={segment.labelY}
                fontSize="11"
                fill={segment.color}
                fontWeight="bold"
              >
                {segment.name}
              </text>
            ))}

            <circle cx="90" cy="90" r="40" fill={currentLevel.color} />
            <text
              x="90"
              y="82"
              textAnchor="middle"
              fontSize="24"
              fill="white"
              fontWeight="bold"
            >
              {currentLevel.level}
            </text>
            <text
              x="90"
              y="102"
              textAnchor="middle"
              fontSize="14"
              fill="white"
              fontWeight="bold"
            >
              {currentLevel.name}
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}
