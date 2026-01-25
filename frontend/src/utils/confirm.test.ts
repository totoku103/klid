import { describe, it, expect, beforeEach } from 'vitest'
import { globalConfirm } from './confirm'
import { useConfirmStore } from '@/stores/confirmStore'

describe('globalConfirm', () => {
  beforeEach(() => {
    useConfirmStore.getState().hideConfirm()
  })

  it('should show confirm dialog', async () => {
    const promise = globalConfirm('확인하시겠습니까?')
    
    const state = useConfirmStore.getState()
    expect(state.confirm.isOpen).toBe(true)
    expect(state.confirm.message).toBe('확인하시겠습니까?')
    
    state.resolveConfirm(true)
    const result = await promise
    expect(result).toBe(true)
  })

  it('should return false on cancel', async () => {
    const promise = globalConfirm('취소 테스트')
    
    const state = useConfirmStore.getState()
    expect(state.confirm.isOpen).toBe(true)
    
    state.resolveConfirm(false)
    const result = await promise
    expect(result).toBe(false)
  })

  it('should close dialog after resolve', async () => {
    const promise = globalConfirm('테스트')
    
    useConfirmStore.getState().resolveConfirm(true)
    await promise
    
    expect(useConfirmStore.getState().confirm.isOpen).toBe(false)
  })
})
