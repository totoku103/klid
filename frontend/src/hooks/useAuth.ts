import { useCallback } from 'react'
import { useUserStore } from '@/stores/userStore'
import { sessionApi } from '@/components/organisms/Header/api'

export function useAuth() {
  const { user, isAuthenticated, isLoading, setUser, setLoading, clear } =
    useUserStore()

  const checkSession = useCallback(async () => {
    try {
      setLoading(true)
      const sessionInfo = await sessionApi.getSessionInfo()
      setUser(sessionInfo.user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [setUser, setLoading])

  const handleLogout = useCallback(async () => {
    try {
      await sessionApi.logout()
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
