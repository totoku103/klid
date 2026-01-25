import { useState, useEffect, useRef } from 'react'
import { globalAlert } from '@/utils/alert'

interface PasswordChangeModalProps {
  isOpen: boolean
  onClose: () => void
  message?: string
  onSuccess?: () => void
}

const PASSWORD_MIN_LENGTH = 8
const PASSWORD_PATTERNS = {
  NUMBER: /[0-9]/,
  LETTER: /[a-zA-Z]/,
  SPECIAL: /[~!@#$%^&*()_+|<>?:{}]/,
}

type StrengthLevel = 'weak' | 'medium' | 'strong'

function validatePasswordPolicy(password: string) {
  const hasNumber = PASSWORD_PATTERNS.NUMBER.test(password)
  const hasLetter = PASSWORD_PATTERNS.LETTER.test(password)
  const hasSpecial = PASSWORD_PATTERNS.SPECIAL.test(password)
  const hasMinLength = password.length >= PASSWORD_MIN_LENGTH
  const isValid = hasNumber && hasLetter && hasSpecial && hasMinLength

  return { hasNumber, hasLetter, hasSpecial, hasMinLength, isValid }
}

function calculatePasswordStrength(password: string): StrengthLevel {
  const validation = validatePasswordPolicy(password)

  let strength = 0
  if (validation.hasMinLength) strength++
  if (validation.hasNumber) strength++
  if (validation.hasLetter) strength++
  if (validation.hasSpecial) strength++

  if (validation.isValid) return 'strong'
  if (strength >= 2) return 'medium'
  return 'weak'
}

export function PasswordChangeModal({
  isOpen,
  onClose,
  message,
  onSuccess,
}: PasswordChangeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [strengthLevel, setStrengthLevel] = useState<StrengthLevel | null>(null)

  useEffect(() => {
    if (isOpen && message) {
      globalAlert.warning(message)
    }
  }, [isOpen, message])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (newPassword.length > 0) {
      setStrengthLevel(calculatePasswordStrength(newPassword))
    } else {
      setStrengthLevel(null)
    }
  }, [newPassword])

  const resetForm = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setErrors({})
    setStrengthLevel(null)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!currentPassword) {
      newErrors.currentPassword = '기존 비밀번호를 입력해주세요.'
    }

    if (!newPassword) {
      newErrors.newPassword = '새 비밀번호를 입력해주세요.'
    } else {
      const validation = validatePasswordPolicy(newPassword)
      if (!validation.isValid) {
        newErrors.newPassword = '비밀번호는 영/숫자/특문 포함 8자 이상입니다.'
      }
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = '새 비밀번호를 다시 입력해주세요.'
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const response = await fetch('/main/env/userConf/expire/passwordCheck.do', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          prePassword: currentPassword,
          password: newPassword,
        }),
      })

      const data = await response.json()

      if (data.hasError) {
        throw new Error(data.errorInfo?.message || '비밀번호 변경에 실패했습니다.')
      }

      globalAlert.success(data.resultData || '비밀번호가 변경되었습니다.')
      onSuccess?.()
      handleClose()
    } catch (err) {
      globalAlert.error(err instanceof Error ? err.message : '비밀번호 변경에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  const strengthBarColor = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500',
  }

  const strengthBarWidth = {
    weak: 'w-1/3',
    medium: 'w-2/3',
    strong: 'w-full',
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        ref={modalRef}
        className="w-[450px] rounded-lg bg-white p-10 shadow-xl"
      >
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">
          비밀번호 변경
        </h2>
        <p className="mb-6 text-center text-sm text-gray-600">
          새로운 비밀번호를 입력해주세요.
        </p>

        <hr className="mb-6 border-gray-200" />

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <div className="flex h-11 items-center rounded border border-gray-300 px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <LockIcon />
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="기존 비밀번호"
                className="ml-3 flex-1 border-none bg-transparent text-sm outline-none"
                autoComplete="current-password"
              />
            </div>
            {errors.currentPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.currentPassword}</p>
            )}
          </div>

          <div className="mb-5">
            <div className="flex h-11 items-center rounded border border-gray-300 px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <LockIcon />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호"
                className="ml-3 flex-1 border-none bg-transparent text-sm outline-none"
                autoComplete="new-password"
              />
            </div>
            {strengthLevel && (
              <div className="mt-1 h-1 overflow-hidden rounded bg-gray-200">
                <div
                  className={`h-full transition-all ${strengthBarColor[strengthLevel]} ${strengthBarWidth[strengthLevel]}`}
                />
              </div>
            )}
            {errors.newPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.newPassword}</p>
            )}
          </div>

          <div className="mb-6">
            <div className="flex h-11 items-center rounded border border-gray-300 px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <LockIcon />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="새 비밀번호 확인"
                className="ml-3 flex-1 border-none bg-transparent text-sm outline-none"
                autoComplete="new-password"
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <hr className="mb-6 border-gray-200" />

          <div className="flex justify-center gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="min-w-[100px] rounded bg-[#005e9e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#357abd] disabled:opacity-50"
            >
              {isLoading ? '처리중...' : '확인'}
            </button>
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="min-w-[100px] rounded bg-gray-200 px-6 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-300 disabled:opacity-50"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function LockIcon() {
  return (
    <svg
      className="h-5 w-5 flex-shrink-0 text-gray-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
