'use client'

import { useScrollProgress } from '@/hooks/useScrollProgress'
import { motion } from 'framer-motion'

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
      style={{
        scaleX: progress,
        background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)',
      }}
    />
  )
}
