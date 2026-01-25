import { useEffect, useState } from 'react'
import { useMenuStore } from '@/stores/menuStore'
import { transformMenuApiResponse, type MenuApiResponse } from '@/types/menu'

export function useMenu() {
  const { menus, setMenus } = useMenuStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (menus.length > 0) return

    const loadMenuData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('/data/menu.json')
        if (!response.ok) {
          throw new Error(`Failed to load menu data: ${response.status}`)
        }
        const data: MenuApiResponse = await response.json()
        const transformedMenus = transformMenuApiResponse(data)
        setMenus(transformedMenus)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setIsLoading(false)
      }
    }

    loadMenuData()
  }, [menus.length, setMenus])

  return { menus, isLoading, error }
}
