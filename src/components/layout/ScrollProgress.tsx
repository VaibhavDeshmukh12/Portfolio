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
        background: 'linear-gradient(90deg, rgb(var(--accent-primary)), rgb(var(--accent-secondary)), rgb(var(--accent-tertiary)))',
      }}
    />
  )
}
