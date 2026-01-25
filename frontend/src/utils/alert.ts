import { useAlertStore } from '@/stores/alertStore'

const { showAlert } = useAlertStore.getState()

export const globalAlert = {
  show: (message: string, onConfirm?: () => void) => {
    showAlert({ type: 'info', message, onConfirm })
  },

  success: (message: string, onConfirm?: () => void) => {
    showAlert({ type: 'success', title: '성공', message, onConfirm })
  },

  error: (message: string, onConfirm?: () => void) => {
    showAlert({ type: 'error', title: '오류', message, onConfirm })
  },

  warning: (message: string, onConfirm?: () => void) => {
    showAlert({ type: 'warning', title: '경고', message, onConfirm })
  },

  info: (message: string, onConfirm?: () => void) => {
    showAlert({ type: 'info', title: '안내', message, onConfirm })
  },
}
