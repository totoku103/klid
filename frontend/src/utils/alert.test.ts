import { describe, it, expect, beforeEach } from 'vitest'
import { globalAlert } from './alert'
import { useAlertStore } from '@/stores/alertStore'

describe('globalAlert', () => {
  beforeEach(() => {
    useAlertStore.getState().hideAlert()
  })

  it('should show success alert', () => {
    globalAlert.success('테스트 메시지')
    
    const state = useAlertStore.getState()
    expect(state.alert.isOpen).toBe(true)
    expect(state.alert.type).toBe('success')
    expect(state.alert.message).toBe('테스트 메시지')
  })

  it('should show error alert', () => {
    globalAlert.error('에러 메시지')
    
    const state = useAlertStore.getState()
    expect(state.alert.isOpen).toBe(true)
    expect(state.alert.type).toBe('error')
    expect(state.alert.message).toBe('에러 메시지')
  })

  it('should show warning alert', () => {
    globalAlert.warning('경고 메시지')
    
    const state = useAlertStore.getState()
    expect(state.alert.isOpen).toBe(true)
    expect(state.alert.type).toBe('warning')
    expect(state.alert.message).toBe('경고 메시지')
  })

  it('should show info alert', () => {
    globalAlert.info('안내 메시지')
    
    const state = useAlertStore.getState()
    expect(state.alert.isOpen).toBe(true)
    expect(state.alert.type).toBe('info')
    expect(state.alert.message).toBe('안내 메시지')
  })

  it('should hide alert', () => {
    globalAlert.success('테스트')
    expect(useAlertStore.getState().alert.isOpen).toBe(true)
    
    useAlertStore.getState().hideAlert()
    expect(useAlertStore.getState().alert.isOpen).toBe(false)
  })
})
