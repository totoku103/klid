import { useState, useEffect, useCallback } from 'react'
import { formatTimer } from '@/utils/formatters'
import { cn } from '@/lib/utils'

export interface TimerProps {
  initialSeconds: number
  onExpire?: () => void
  autoStart?: boolean
  className?: string
}

export function Timer({
  initialSeconds,
  onExpire,
  autoStart = true,
  className,
}: TimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(autoStart)

  useEffect(() => {
    if (!isRunning || seconds <= 0) return

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          onExpire?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, seconds, onExpire])

  const isWarning = seconds <= 60
  const isExpired = seconds <= 0

  return (
    <span
      className={cn(
        'font-semibold tabular-nums',
        isExpired && 'text-[var(--color-error)]',
        isWarning && !isExpired && 'text-[var(--color-warning)]',
        className
      )}
    >
      {formatTimer(seconds)}
    </span>
  )
}

export function useTimer(initialSeconds: number, onExpire?: () => void) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)

  const start = useCallback(() => setIsRunning(true), [])
  const stop = useCallback(() => setIsRunning(false), [])
  const reset = useCallback(() => {
    setSeconds(initialSeconds)
    setIsRunning(true)
  }, [initialSeconds])

  useEffect(() => {
    if (!isRunning || seconds <= 0) return

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          onExpire?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, seconds, onExpire])

  return {
    seconds,
    isRunning,
    isExpired: seconds <= 0,
    formatted: formatTimer(seconds),
    start,
    stop,
    reset,
  }
}
