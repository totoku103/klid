import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { authApi } from '@/services/api/authApi'
import { SYSTEM_TYPE, type SystemType, type AuthMethod } from '@/utils/constants'
import { useUserStore } from '@/stores/userStore'
import type { SessionInfo } from '@/types'

const MOCK_SESSION_INFO: SessionInfo = {
  user: {
    userId: 'test',
    userName: '테스트 사용자',
    instCd: 'TEST001',
    instNm: '테스트 기관',
    instLevel: '1',
    localCd: '11',
    pntInstCd: '',
    roleCtrs: 'ROLE_USER',
    authMain: 'AUTH_MAIN_1',
    authSub: '',
  },
  webSiteName: '사이버 침해대응시스템',
  ncscUrl: 'https://www.ncsc.go.kr',
  uploadSize: 10485760,
}

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
        // [MOCK] 테스트용 Mock 인증 - id: test, pwd: test
        if (id === 'test' && password === 'test') {
          setOtpSecretKey(null)
          setStep('secondary')
          setIsInputDisabled(true)
          return
        }
        // [MOCK] Mock 인증 실패
        throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.')

        /* [주석 처리됨] 실제 서버 통신 코드
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
        */
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
        // [MOCK] 테스트용 Mock OTP 인증 - otp: 860207
        if (code === '860207') {
          setSessionInfo(MOCK_SESSION_INFO)
          goToMainPage()
          return
        }
        // [MOCK] Mock OTP 인증 실패
        throw new Error('OTP 코드가 올바르지 않습니다.')

        /* [주석 처리됨] 실제 서버 통신 코드
        const response = await authApi.otpAuth(systemType, { userCode: code })

        if (response.hasError) {
          throw new Error(
            response.errorInfo?.message || 'OTP 인증에 실패했습니다.'
          )
        }

        if (response.resultData?.isPass) {
          goToMainPage()
        } else {
          setError('OTP 인증에 실패했습니다.')
        }
        */
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
    [systemType, goToMainPage]
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
