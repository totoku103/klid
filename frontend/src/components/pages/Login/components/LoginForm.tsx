import { useState } from 'react'
import { User, Lock } from 'lucide-react'
import { InputWithIcon } from '@/components/molecules'
import { Button } from '@/components/atoms'

interface LoginFormProps {
  onSubmit: (id: string, password: string) => void
  onSignUp?: () => void
  disabled?: boolean
  isLoading?: boolean
  showSignUp?: boolean
}

export function LoginForm({
  onSubmit,
  onSignUp,
  disabled,
  isLoading,
  showSignUp,
}: LoginFormProps) {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(id, password)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit(id, password)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <InputWithIcon
        icon={User}
        placeholder="사용자 ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        disabled={disabled}
        className="h-[52px] border-[#2f4d80] bg-[#132a56] text-[#dae6ff] placeholder:text-[#9db6e3] focus:border-[#62b2ff]"
      />

      <InputWithIcon
        icon={Lock}
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        autoComplete="current-password"
        className="h-[52px] border-[#2f4d80] bg-[#132a56] text-[#dae6ff] placeholder:text-[#9db6e3] focus:border-[#62b2ff]"
      />

      <div className="mt-2 flex justify-center gap-3">
        <Button
          type="submit"
          disabled={disabled || isLoading}
          className="h-[52px] w-[40%] bg-[#1f6fe5] text-lg font-semibold hover:bg-[#2d82ff] disabled:bg-[#1a2942] disabled:text-[#4a5c7a]"
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </Button>

        {showSignUp && (
          <Button
            type="button"
            onClick={onSignUp}
            disabled={disabled}
            className="h-[52px] w-[40%] bg-[#1f6fe5] text-lg font-semibold hover:bg-[#2d82ff] disabled:bg-[#1a2942] disabled:text-[#4a5c7a]"
          >
            회원가입
          </Button>
        )}
      </div>
    </form>
  )
}
