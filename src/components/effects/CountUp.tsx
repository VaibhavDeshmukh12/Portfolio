'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export function CountUp({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  once = false,
}: {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  once?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })
  const [count, setCount] = useState(0)
  const animationRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    if (!isInView) {
      setCount(0)
      return
    }

    startTimeRef.current = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      // Easing: easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(eased * end)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isInView, end, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  )
}
