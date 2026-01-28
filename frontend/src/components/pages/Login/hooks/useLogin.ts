import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { authApi } from '../api'
import api from '@/config/axios'
import { SYSTEM_TYPE, type SystemType, type AuthMethod } from '@/utils/constants'
import { useUserStore } from '@/stores/userStore'
// SessionInfo type not used in this file

export type LoginStep = 'primary' | 'secondary'

interface PasswordChangeModalState {
  isOpen: boolean
  message: string
}

interface UseLoginReturn {
  systemType: SystemType
  setSystemType: (type: SystemType) => void
  authMethod: AuthMethod
  setAuthMethod: (method: AuthMethod) => void
  step: LoginStep
  otpSecretKey: string | null
  isLoading: boolean
  error: string | null
  isInputDisabled: boolean
  handlePrimaryAuth: (id: string, password: string) => Promise<void>
  handleOtpAuth: (code: string) => Promise<void>
  handleEmailSend: () => Promise<number | null>
  handleEmailValidate: (code: string) => Promise<void>
  showSignUpButton: boolean
  passwordChangeModal: PasswordChangeModalState
  closePasswordChangeModal: () => void
}

export function useLogin(): UseLoginReturn {
  const navigate = useNavigate()
  const { setSessionInfo } = useUserStore()

  const [systemType, setSystemType] = useState<SystemType>(SYSTEM_TYPE.CTRS)
  const [authMethod, setAuthMethod] = useState<AuthMethod>('OTP')
  const [step, setStep] = useState<LoginStep>('primary')
  const [otpSecretKey, setOtpSecretKey] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isInputDisabled, setIsInputDisabled] = useState(false)
  const [passwordChangeModal, setPasswordChangeModal] = useState<PasswordChangeModalState>({
    isOpen: false,
    message: '',
  })

  const showSignUpButton =
    systemType === SYSTEM_TYPE.VMS || systemType === SYSTEM_TYPE.CTSS

  const goToMainPage = useCallback(() => {
    switch (systemType) {
      case SYSTEM_TYPE.CTRS:
        navigate('/main')
        break
      case SYSTEM_TYPE.VMS:
        window.location.href = '/vms/main'
        break
      case SYSTEM_TYPE.CTSS:
        window.location.href = '/ctss/main'
        break
    }
  }, [systemType, navigate])

  const handlePrimaryAuth = useCallback(
    async (id: string, password: string) => {
      if (!id) {
        setError('ID를 입력해주세요.')
        return
      }
      if (!password) {
        setError('비밀번호를 입력해주세요.')
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await authApi.primaryAuth({
          systemType,
          id,
          password,
        })

        if (response.hasError) {
          throw new Error(
            response.errorInfo?.message || '로그인에 실패했습니다.'
          )
        }

        const { code, message, otpSecretKey: secretKey } = response.resultData!

        if (code === 'EXPIRE' || code === 'RESET') {
          setPasswordChangeModal({ isOpen: true, message })
          return
        }

        if (code !== 'OK') {
          throw new Error(message)
        }

        setOtpSecretKey(secretKey || null)
        setStep('secondary')
        setIsInputDisabled(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : '로그인에 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    },
    [systemType]
  )

  const handleOtpAuth = useCallback(
    async (code: string) => {
      if (!code || code.length !== 6) {
        setError('6자리 OTP 코드를 입력해주세요.')
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await authApi.otpAuth(systemType, { userCode: code })

        if (response.hasError) {
          throw new Error(
            response.errorInfo?.message || 'OTP 인증에 실패했습니다.'
          )
        }

        if (response.resultData?.isPass) {
          // 사용자 정보 조회
          const userResponse = await api.get('/api/user/information')
          setSessionInfo({
            user: userResponse.data,
            webSiteName: '',
            ncscUrl: '',
            uploadSize: 0,
          })
          goToMainPage()
        } else {
          setError('OTP 인증에 실패했습니다.')
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'OTP 인증에 실패했습니다.'
        )
      } finally {
        setIsLoading(false)
      }
    },
    [systemType, goToMainPage, setSessionInfo]
  )

  const handleEmailSend = useCallback(async (): Promise<number | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authApi.emailSend(systemType)

      if (response.hasError) {
        throw new Error(
          response.errorInfo?.message || '이메일 전송에 실패했습니다.'
        )
      }

      return response.resultData?.expiredTimestamp || null
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '이메일 전송에 실패했습니다.'
      )
      return null
    } finally {
      setIsLoading(false)
    }
  }, [systemType])

  const handleEmailValidate = useCallback(
    async (code: string) => {
      if (!code || code.length !== 6) {
        setError('6자리 인증 코드를 입력해주세요.')
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await authApi.emailValidate(systemType, {
          userCode: code,
        })

        if (response.hasError) {
          throw new Error(
            response.errorInfo?.message || '이메일 인증에 실패했습니다.'
          )
        }

        if (response.resultData?.isPass) {
          // 사용자 정보 조회
          const userResponse = await api.get('/api/user/information')
          setSessionInfo({
            user: userResponse.data,
            webSiteName: '',
            ncscUrl: '',
            uploadSize: 0,
          })
          goToMainPage()
        } else {
          setError('이메일 인증에 실패했습니다.')
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '이메일 인증에 실패했습니다.'
        )
      } finally {
        setIsLoading(false)
      }
    },
    [systemType, goToMainPage, setSessionInfo]
  )

  const handleSystemTypeChange = useCallback((type: SystemType) => {
    setSystemType(type)
    setStep('primary')
    setIsInputDisabled(false)
    setOtpSecretKey(null)
    setError(null)
  }, [])

  const closePasswordChangeModal = useCallback(() => {
    setPasswordChangeModal({ isOpen: false, message: '' })
  }, [])

  return {
    systemType,
    setSystemType: handleSystemTypeChange,
    authMethod,
    setAuthMethod,
    step,
    otpSecretKey,
    isLoading,
    error,
    isInputDisabled,
    handlePrimaryAuth,
    handleOtpAuth,
    handleEmailSend,
    handleEmailValidate,
    showSignUpButton,
    passwordChangeModal,
    closePasswordChangeModal,
  }
}
