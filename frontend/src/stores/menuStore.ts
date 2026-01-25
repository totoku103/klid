import { create } from 'zustand'
import type { MenuItem } from '@/types'

interface MenuState {
  menus: MenuItem[]
  activeMenuId: string | null
  setMenus: (menus: MenuItem[]) => void
  setActiveMenu: (menuId: string | null) => void
}

export const useMenuStore = create<MenuState>((set) => ({
  menus: [],
  activeMenuId: null,
  setMenus: (menus) => set({ menus }),
  setActiveMenu: (activeMenuId) => set({ activeMenuId }),
}))
