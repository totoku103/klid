export const SYSTEM_TYPE = {
  CTRS: 'CTRS',
  VMS: 'VMS',
  CTSS: 'CTSS',
} as const

export type SystemType = (typeof SYSTEM_TYPE)[keyof typeof SYSTEM_TYPE]

export const AUTH_METHOD = {
  OTP: 'OTP',
  GPKI: 'GPKI',
  EMAIL: 'EMAIL',
} as const

export type AuthMethod = (typeof AUTH_METHOD)[keyof typeof AUTH_METHOD]

export const ROUTES = {
  LOGIN: '/login',
  MAIN: '/',
  BOARD: '/board',
  SYSTEM: '/system',
  ENVIRONMENT: '/environment',
  REPORT: '/report',
  LOG: '/log',
  HISTORY: '/history',
  ACCIDENT: '/accident',
  WEBDASH: '/webdash',
  ENGINEER: '/engineer',
} as const
