import { usePromptStore, setPromptResolver } from '@/stores/promptStore'

interface PromptOptions {
  title?: string
  placeholder?: string
  confirmText?: string
  cancelText?: string
}

export function globalPrompt(
  message: string,
  defaultValue?: string,
  options?: PromptOptions
): Promise<string | null> {
  return new Promise((resolve) => {
    setPromptResolver(resolve)
    usePromptStore.getState().showPrompt({
      message,
      defaultValue: defaultValue ?? '',
      title: options?.title,
      placeholder: options?.placeholder,
      confirmText: options?.confirmText,
      cancelText: options?.cancelText,
    })
  })
}
