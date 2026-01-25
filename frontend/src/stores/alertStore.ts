import { create } from 'zustand'

export type AlertType = 'success' | 'error' | 'warning' | 'info'

interface AlertState {
  isOpen: boolean
  type: AlertType
  title: string
  message: string
  onConfirm?: () => void
}

interface AlertStore {
  alert: AlertState
  showAlert: (params: {
    type?: AlertType
    title?: string
    message: string
    onConfirm?: () => void
  }) => void
  hideAlert: () => void
}

const initialState: AlertState = {
  isOpen: false,
  type: 'info',
  title: '',
  message: '',
  onConfirm: undefined,
}

export const useAlertStore = create<AlertStore>((set) => ({
  alert: initialState,

  showAlert: ({ type = 'info', title = '', message, onConfirm }) => {
    set({
      alert: {
        isOpen: true,
        type,
        title,
        message,
        onConfirm,
      },
    })
  },

  hideAlert: () => {
    set({ alert: initialState })
  },
}))
