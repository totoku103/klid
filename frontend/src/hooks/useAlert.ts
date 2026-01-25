import { useCallback } from 'react'
import { useAlertStore, type AlertType } from '@/stores/alertStore'

export function useAlert() {
  const { showAlert, hideAlert } = useAlertStore()

  const alert = useCallback(
    (message: string, onConfirm?: () => void) => {
      showAlert({ type: 'info', message, onConfirm })
    },
    [showAlert]
  )

  const success = useCallback(
    (message: string, onConfirm?: () => void) => {
      showAlert({ type: 'success', title: '성공', message, onConfirm })
    },
    [showAlert]
  )

  const error = useCallback(
    (message: string, onConfirm?: () => void) => {
      showAlert({ type: 'error', title: '오류', message, onConfirm })
    },
    [showAlert]
  )

  const warning = useCallback(
    (message: string, onConfirm?: () => void) => {
      showAlert({ type: 'warning', title: '경고', message, onConfirm })
    },
    [showAlert]
  )

  const info = useCallback(
    (message: string, onConfirm?: () => void) => {
      showAlert({ type: 'info', title: '안내', message, onConfirm })
    },
    [showAlert]
  )

  const custom = useCallback(
    (params: { type?: AlertType; title?: string; message: string; onConfirm?: () => void }) => {
      showAlert(params)
    },
    [showAlert]
  )

  return {
    alert,
    success,
    error,
    warning,
    info,
    custom,
    close: hideAlert,
  }
}
