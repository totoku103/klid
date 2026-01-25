import { create } from 'zustand'

interface PromptState {
  isOpen: boolean
  title: string
  message: string
  defaultValue: string
  placeholder: string
  confirmText: string
  cancelText: string
}

interface PromptStore {
  prompt: PromptState
  showPrompt: (params: {
    title?: string
    message: string
    defaultValue?: string
    placeholder?: string
    confirmText?: string
    cancelText?: string
  }) => void
  hidePrompt: () => void
  resolvePrompt: (result: string | null) => void
}

const initialState: PromptState = {
  isOpen: false,
  title: '',
  message: '',
  defaultValue: '',
  placeholder: '',
  confirmText: '확인',
  cancelText: '취소',
}

let resolvePromise: ((value: string | null) => void) | null = null

export const usePromptStore = create<PromptStore>((set) => ({
  prompt: initialState,

  showPrompt: ({
    title = '',
    message,
    defaultValue = '',
    placeholder = '',
    confirmText = '확인',
    cancelText = '취소',
  }) => {
    set({
      prompt: {
        isOpen: true,
        title,
        message,
        defaultValue,
        placeholder,
        confirmText,
        cancelText,
      },
    })
  },

  hidePrompt: () => {
    set({ prompt: initialState })
  },

  resolvePrompt: (result: string | null) => {
    if (resolvePromise) {
      resolvePromise(result)
      resolvePromise = null
    }
    set({ prompt: initialState })
  },
}))

export const setPromptResolver = (resolver: (value: string | null) => void) => {
  resolvePromise = resolver
}
