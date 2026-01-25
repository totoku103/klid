import { useCallback } from 'react'
import { useAuthStore } from '@/stores/authStore'
import api from '@/services/api/axios'

export function useAuth() {
  const { user, isAuthenticated, isLoading, setUser, setLoading, logout } =
    useAuthStore()

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
      logout()
      window.location.href = '/login'
    }
  }, [logout])

  return {
    user,
    isAuthenticated,
    isLoading,
    checkSession,
    logout: handleLogout,
  }
}
