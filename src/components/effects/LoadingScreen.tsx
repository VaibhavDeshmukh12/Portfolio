'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const loadingLines = [
  { text: '> Initializing portfolio...', delay: 0 },
  { text: '> Loading assets [████████████] 100%', delay: 400 },
  { text: '> Compiling experiences...', delay: 800 },
  { text: '> Rendering UI components...', delay: 1100 },
  { text: '> System ready.', delay: 1500 },
]

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [visibleLines, setVisibleLines] = useState<number[]>([])

  useEffect(() => {
    loadingLines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i])
      }, line.delay)
    })
    const timer = setTimeout(() => setIsLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <div className="relative flex flex-col items-center">
            {/* Animated rings */}
            <div className="relative w-20 h-20">
              <motion.div
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: 'rgba(var(--accent-primary), 0.3)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border-2"
                style={{ borderColor: 'rgba(var(--accent-secondary), 0.3)' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border-2"
                style={{ borderColor: 'rgba(var(--accent-tertiary), 0.3)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
              {/* Center dot */}
              <motion.div
                className="absolute inset-0 m-auto w-3 h-3 rounded-full"
                style={{ background: 'rgb(var(--accent-primary))' }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>

            {/* Terminal-style loading text */}
            <div className="mt-8 font-mono text-xs space-y-1 min-w-[280px]">
              {loadingLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={visibleLines.includes(i) ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className={i === loadingLines.length - 1 ? 'text-green-400' : 'text-white/40'}
                >
                  {line.text}
                </motion.p>
              ))}
            </div>

            {/* Loading bar */}
            <div className="mt-6 w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-electric-blue via-electric-purple to-electric-cyan"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
