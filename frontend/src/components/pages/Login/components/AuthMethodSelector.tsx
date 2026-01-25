import { RadioGroup } from '@/components/molecules'
import { AUTH_METHOD, type AuthMethod } from '@/utils/constants'

const AUTH_OPTIONS = [
  { value: AUTH_METHOD.OTP, label: 'OTP 인증' },
  { value: AUTH_METHOD.GPKI, label: 'GPKI 인증' },
  { value: AUTH_METHOD.EMAIL, label: 'E-MAIL 인증' },
]

interface AuthMethodSelectorProps {
  value: AuthMethod
  onChange: (value: AuthMethod) => void
  disabled?: boolean
}

export function AuthMethodSelector({
  value,
  onChange,
  disabled,
}: AuthMethodSelectorProps) {
  return (
    <div className="mb-4 border-b border-[#2f4d80] pb-4">
      <p className="mb-3 text-center text-lg text-[#dae6ff]">
        Help Desk: 02-2031-5049
      </p>
      <RadioGroup
        name="auth-method"
        options={AUTH_OPTIONS}
        value={value}
        onChange={(v) => onChange(v as AuthMethod)}
        disabled={disabled}
        className="justify-center text-[#dae6ff]"
      />
    </div>
  )
}
