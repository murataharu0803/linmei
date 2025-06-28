import { useEffect, useRef } from 'react'

const useIntersectionObserver = (
  callback: () => void,
  options?: IntersectionObserverInit,
): React.RefObject<HTMLDivElement | null> => {
  const ref = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!ref.current) return

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting)
        callback()

    }, options)

    observerRef.current.observe(ref.current)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [callback, options])

  return ref
}

export default useIntersectionObserver
