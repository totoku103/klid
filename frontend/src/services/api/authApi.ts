import api from './axios'
import type { SystemType } from '@/utils/constants'

export interface PrimaryAuthRequest {
  systemType: SystemType
  id: string
  password: string
}

export interface PrimaryAuthResponse {
  hasError: boolean
  errorInfo?: {
    code: string
    message: string
  }
  resultData?: {
    code: 'OK' | 'EXPIRE' | 'RESET'
    message: string
    otpSecretKey?: string
  }
}

export interface SecondaryAuthRequest {
  userCode: string
}

export interface SecondaryAuthResponse {
  hasError: boolean
  errorInfo?: {
    code: string
    message: string
  }
  resultData?: {
    isPass: boolean
    message?: string
  }
}

export interface EmailSendResponse {
  hasError: boolean
  errorInfo?: {
    code: string
    message: string
  }
  resultData?: {
    expiredTimestamp: number
    message: string
  }
}

const AUTH_ENDPOINTS = {
  CTRS: {
    primary: '/login/ctrs/authenticate/primary.do',
    otp: '/login/ctrs/authenticate/second/otp.do',
    emailSend: '/login/ctrs/authenticate/second/email/send.do',
    emailValidate: '/login/ctrs/authenticate/second/email/validate.do',
  },
  VMS: {
    primary: '/login/vms/authenticate/primary.do',
    otp: '/login/vms/authenticate/second/otp.do',
    emailSend: '/login/vms/authenticate/second/email/send.do',
    emailValidate: '/login/vms/authenticate/second/email/validate.do',
  },
  CTSS: {
    primary: '/login/ctss/authenticate/primary.do',
    otp: '/login/ctss/authenticate/second/otp.do',
    emailSend: '/login/ctss/authenticate/second/email/send.do',
    emailValidate: '/login/ctss/authenticate/second/email/validate.do',
  },
} as const

export const authApi = {
  primaryAuth: async (
    data: PrimaryAuthRequest
  ): Promise<PrimaryAuthResponse> => {
    const endpoint = AUTH_ENDPOINTS[data.systemType].primary
    const response = await api.post<PrimaryAuthResponse>(endpoint, data)
    return response.data
  },

  otpAuth: async (
    systemType: SystemType,
    data: SecondaryAuthRequest
  ): Promise<SecondaryAuthResponse> => {
    const endpoint = AUTH_ENDPOINTS[systemType].otp
    const response = await api.post<SecondaryAuthResponse>(endpoint, data)
    return response.data
  },

  emailSend: async (systemType: SystemType): Promise<EmailSendResponse> => {
    const endpoint = AUTH_ENDPOINTS[systemType].emailSend
    const response = await api.post<EmailSendResponse>(endpoint)
    return response.data
  },

  emailValidate: async (
    systemType: SystemType,
    data: SecondaryAuthRequest
  ): Promise<SecondaryAuthResponse> => {
    const endpoint = AUTH_ENDPOINTS[systemType].emailValidate
    const response = await api.post<SecondaryAuthResponse>(endpoint, data)
    return response.data
  },
}
