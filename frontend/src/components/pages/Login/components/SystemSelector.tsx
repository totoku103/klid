import { RadioGroup } from '@/components/molecules'
import { SYSTEM_TYPE, type SystemType } from '@/utils/constants'

const SYSTEM_OPTIONS = [
  { value: SYSTEM_TYPE.CTRS, label: '사이버침해대응시스템' },
  { value: SYSTEM_TYPE.VMS, label: '보안취약점 진단시스템' },
  { value: SYSTEM_TYPE.CTSS, label: '주요정보통신기반시설 업무지원시스템' },
]

interface SystemSelectorProps {
  value: SystemType
  onChange: (value: SystemType) => void
  disabled?: boolean
}

export function SystemSelector({
  value,
  onChange,
  disabled,
}: SystemSelectorProps) {
  return (
    <div className="mb-7 border-b border-[#2f4d80] pb-5">
      <RadioGroup
        name="system-type"
        options={SYSTEM_OPTIONS}
        value={value}
        onChange={(v) => onChange(v as SystemType)}
        disabled={disabled}
        className="justify-center text-[#dae6ff]"
      />
    </div>
  )
}
