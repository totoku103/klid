import { useState, useEffect, useCallback } from 'react'
import { Mail } from 'lucide-react'
import { InputWithIcon } from '@/components/molecules'
import { Button } from '@/components/atoms'
import { formatTimer } from '@/utils/formatters'

interface EmailAuthSectionProps {
  onSend: () => Promise<number | null>
  onValidate: (code: string) => void
  isLoading?: boolean
}

export function EmailAuthSection({
  onSend,
  onValidate,
  isLoading,
}: EmailAuthSectionProps) {
  const [code, setCode] = useState('')
  const [expireTime, setExpireTime] = useState<number | null>(null)
  const [remainingSeconds, setRemainingSeconds] = useState(0)
  const [isSent, setIsSent] = useState(false)

  useEffect(() => {
    if (!expireTime) return

    const interval = setInterval(() => {
      const now = Date.now()
      const remaining = Math.max(0, Math.floor((expireTime - now) / 1000))
      setRemainingSeconds(remaining)

      if (remaining <= 0) {
        clearInterval(interval)
        setIsSent(false)
        setExpireTime(null)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [expireTime])

  const handleSend = useCallback(async () => {
    const timestamp = await onSend()
    if (timestamp) {
      setExpireTime(timestamp)
      setIsSent(true)
      setCode('')
    }
  }, [onSend])

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    if (value.length <= 6) {
      setCode(value)
      if (value.length === 6) {
        onValidate(value)
      }
    }
  }

  return (
    <div className="mt-5 flex flex-col items-center gap-2 border-t border-[#2f4d80] pt-5">
      <div className="mb-2 text-lg font-semibold text-[#dae6ff]">
        {formatTimer(remainingSeconds)}
      </div>

      <div className="flex w-full gap-2">
        <InputWithIcon
          icon={Mail}
          placeholder="6자리 이메일 인증 코드"
          value={code}
          onChange={handleCodeChange}
          maxLength={6}
          inputMode="numeric"
          disabled={!isSent}
          className="h-[52px] flex-1 border-[#2f4d80] bg-[#132a56] text-[#dae6ff] placeholder:text-[#9db6e3] focus:border-[#62b2ff] disabled:cursor-not-allowed disabled:bg-[#0d1a2e] disabled:text-[#4a5c7a]"
        />
        <Button
          onClick={handleSend}
          disabled={isLoading || isSent}
          className="h-[52px] shrink-0 bg-[#1f6fe5] px-6 font-semibold hover:bg-[#2d82ff] disabled:bg-[#1a2942] disabled:text-[#4a5c7a]"
        >
          발송
        </Button>
      </div>
    </div>
  )
}
