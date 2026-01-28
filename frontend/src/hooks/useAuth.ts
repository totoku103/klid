import { useCallback } from 'react'
import { useUserStore } from '@/stores/userStore'
import api from '@/services/api/axios'

export function useAuth() {
  const { user, isAuthenticated, isLoading, setUser, setLoading, clear } =
    useUserStore()

  const checkSession = useCallback(async () => {
    try {
      setLoading(true)
      const response = await api.get('/api/user/session-info.do')
      setUser(response.data)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [setUser, setLoading])

  const handleLogout = useCallback(async () => {
    try {
      await api.post('/api/auth/logout.do')
    } finally {
      clear()
      window.location.href = '/login'
    }
  }, [clear])

  return {
    user,
    isAuthenticated,
    isLoading,
    checkSession,
    logout: handleLogout,
  }
}
