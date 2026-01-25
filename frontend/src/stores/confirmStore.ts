import { create } from 'zustand'

interface ConfirmState {
  isOpen: boolean
  title: string
  message: string
  confirmText: string
  cancelText: string
  onConfirm: (() => void) | null
  onCancel: (() => void) | null
}

interface ConfirmStore {
  confirm: ConfirmState
  showConfirm: (params: {
    title?: string
    message: string
    confirmText?: string
    cancelText?: string
    onConfirm?: () => void
    onCancel?: () => void
  }) => void
  hideConfirm: () => void
  resolveConfirm: (result: boolean) => void
}

const initialState: ConfirmState = {
  isOpen: false,
  title: '',
  message: '',
  confirmText: '확인',
  cancelText: '취소',
  onConfirm: null,
  onCancel: null,
}

let resolvePromise: ((value: boolean) => void) | null = null

export const useConfirmStore = create<ConfirmStore>((set, get) => ({
  confirm: initialState,

  showConfirm: ({
    title = '확인',
    message,
    confirmText = '확인',
    cancelText = '취소',
    onConfirm,
    onCancel,
  }) => {
    set({
      confirm: {
        isOpen: true,
        title,
        message,
        confirmText,
        cancelText,
        onConfirm: onConfirm ?? null,
        onCancel: onCancel ?? null,
      },
    })
  },

  hideConfirm: () => {
    set({ confirm: initialState })
  },

  resolveConfirm: (result: boolean) => {
    const { confirm } = get()
    if (result) {
      confirm.onConfirm?.()
    } else {
      confirm.onCancel?.()
    }
    if (resolvePromise) {
      resolvePromise(result)
      resolvePromise = null
    }
    set({ confirm: initialState })
  },
}))

export const setConfirmResolver = (resolver: (value: boolean) => void) => {
  resolvePromise = resolver
}
