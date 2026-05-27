'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
  target: number
  suffix?: string
  label: string
  className?: string
}

export function AnimatedCounter({ target, suffix = '', label, className }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 2000
    const startTime = Date.now()

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(easedProgress * target)

      setCount(current)

      if (progress >= 1) {
        setCount(target)
        clearInterval(timer)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={cn('text-center', className)}
    >
      <div className="text-3xl md:text-4xl font-bold font-display gradient-text">
        {count}{suffix}
      </div>
      <p className="text-sm text-white/50 mt-2">{label}</p>
    </motion.div>
  )
}
