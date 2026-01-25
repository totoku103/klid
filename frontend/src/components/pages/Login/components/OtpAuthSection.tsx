import { useState } from 'react'
import { Smartphone } from 'lucide-react'
import { InputWithIcon } from '@/components/molecules'
import { Button } from '@/components/atoms'

interface OtpAuthSectionProps {
  otpSecretKey?: string | null
  onConfirm: (code: string) => void
  isLoading?: boolean
}

export function OtpAuthSection({
  otpSecretKey,
  onConfirm,
  isLoading,
}: OtpAuthSectionProps) {
  const [code, setCode] = useState('')

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    if (value.length <= 6) {
      setCode(value)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && code.length === 6) {
      onConfirm(code)
    }
  }

  return (
    <div className="mt-5 flex flex-col items-center gap-2 border-t border-[#2f4d80] pt-5">
      {otpSecretKey && (
        <div className="mb-2 flex items-center gap-3 text-lg font-semibold">
          <span className="font-medium text-[#9db6e3]">OTP CODE:</span>
          <span className="font-mono tracking-widest text-[#62b2ff]">
            {otpSecretKey}
          </span>
        </div>
      )}

      <div className="flex w-full gap-2">
        <InputWithIcon
          icon={Smartphone}
          placeholder="6자리 OTP 코드"
          value={code}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
          maxLength={6}
          inputMode="numeric"
          className="h-[52px] flex-1 border-[#2f4d80] bg-[#132a56] text-[#dae6ff] placeholder:text-[#9db6e3] focus:border-[#62b2ff]"
        />
        <Button
          onClick={() => onConfirm(code)}
          disabled={isLoading || code.length !== 6}
          className="h-[52px] shrink-0 bg-[#1f6fe5] px-6 font-semibold hover:bg-[#2d82ff] disabled:bg-[#1a2942] disabled:text-[#4a5c7a]"
        >
          OTP 확인
        </Button>
      </div>
    </div>
  )
}
