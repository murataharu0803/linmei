import { useCallback, useEffect, useRef, useState } from 'react'

const useLongPress = (callback: CallableFunction, { threshold = 500 } = {}) => {
  const timeoutRef = useRef<number | null>(null)
  const targetRef = useRef<HTMLDivElement | null>(null)
  const [isActive, setIsActive] = useState(false)

  const start = useCallback(() => {
    setIsActive(true)
    timeoutRef.current = setTimeout(() => {
      setIsActive(false)
      callback()
    }, threshold)
  }, [callback, threshold])

  const clear = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsActive(false)
  }, [])

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    target.addEventListener('mousedown', start)
    target.addEventListener('mouseup', clear)
    target.addEventListener('mouseleave', clear) // Clear if mouse leaves element
    target.addEventListener('touchstart', start)
    target.addEventListener('touchend', clear)
    target.addEventListener('touchcancel', clear) // Clear if touch is interrupted

    return () => {
      target.removeEventListener('mousedown', start)
      target.removeEventListener('mouseup', clear)
      target.removeEventListener('mouseleave', clear)
      target.removeEventListener('touchstart', start)
      target.removeEventListener('touchend', clear)
      target.removeEventListener('touchcancel', clear)
    }
  }, [start, clear])

  return { ref: targetRef, isActive }
}

export default useLongPress
