import { useState, useCallback } from 'react'
import api from '@/config/axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'

interface UseApiState<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (config?: AxiosRequestConfig) => Promise<T>
  reset: () => void
}

export function useApi<T>(
  url: string,
  options?: AxiosRequestConfig
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
  })

  const execute = useCallback(
    async (config?: AxiosRequestConfig): Promise<T> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      try {
        const response = await api.request<T>({
          url,
          ...options,
          ...config,
        })
        setState({ data: response.data, error: null, isLoading: false })
        return response.data
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('Unknown error occurred')
        setState({ data: null, error, isLoading: false })
        throw error
      }
    },
    [url, options]
  )

  const reset = useCallback(() => {
    setState({ data: null, error: null, isLoading: false })
  }, [])

  return { ...state, execute, reset }
}

export function useApiError(error: AxiosError | null): string | null {
  if (!error) return null

  if (error.response) {
    const data = error.response.data as { message?: string }
    return data?.message || `Error: ${error.response.status}`
  }

  if (error.request) {
    return '서버에 연결할 수 없습니다.'
  }

  return error.message
}
