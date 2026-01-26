import { create } from 'zustand'

export interface NavigationHistoryItem {
  path: string
  title: string
}

interface NavigationState {
  history: NavigationHistoryItem[]
  maxHistorySize: number
  addToHistory: (item: NavigationHistoryItem) => void
  removeFromHistory: (path: string) => void
  clearHistory: () => void
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  history: [],
  maxHistorySize: 10,
  addToHistory: (item) => {
    const { history, maxHistorySize } = get()
    const existingIndex = history.findIndex((h) => h.path === item.path)

    if (existingIndex !== -1) {
      // 이미 존재하면 맨 앞으로 이동
      const newHistory = [...history]
      newHistory.splice(existingIndex, 1)
      newHistory.unshift(item)
      set({ history: newHistory })
    } else {
      // 새로 추가
      const newHistory = [item, ...history].slice(0, maxHistorySize)
      set({ history: newHistory })
    }
  },
  removeFromHistory: (path) => {
    set((state) => ({
      history: state.history.filter((h) => h.path !== path),
    }))
  },
  clearHistory: () => set({ history: [] }),
}))
