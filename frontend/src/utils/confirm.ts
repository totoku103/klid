import { useConfirmStore, setConfirmResolver } from '@/stores/confirmStore'

interface ConfirmOptions {
  title?: string
  confirmText?: string
  cancelText?: string
}

/**
 * 전역 confirm 다이얼로그를 표시합니다.
 * Promise를 반환하여 async/await로 사용할 수 있습니다.
 *
 * @example
 * const confirmed = await globalConfirm('삭제하시겠습니까?')
 * if (!confirmed) return
 *
 * @example
 * const confirmed = await globalConfirm('정말 삭제하시겠습니까?', {
 *   title: '삭제 확인',
 *   confirmText: '삭제',
 *   cancelText: '취소'
 * })
 */
export function globalConfirm(message: string, options?: ConfirmOptions): Promise<boolean> {
  return new Promise((resolve) => {
    setConfirmResolver(resolve)
    useConfirmStore.getState().showConfirm({
      message,
      title: options?.title,
      confirmText: options?.confirmText,
      cancelText: options?.cancelText,
    })
  })
}
