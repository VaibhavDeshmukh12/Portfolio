'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function SectionDivider({ variant = 'wave' }: { variant?: 'wave' | 'dots' | 'line' }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scaleX = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  if (variant === 'dots') {
    return (
      <div ref={ref} className="relative py-12 flex items-center justify-center gap-3">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/20"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 0.4, type: 'spring' }}
            viewport={{ once: false, margin: '-50px' }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'line') {
    return (
      <div ref={ref} className="relative py-16 flex items-center justify-center">
        <motion.div
          className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ scaleX, opacity }}
        />
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-electric-blue/60"
          style={{ opacity }}
          animate={{ boxShadow: ['0 0 8px rgba(59,130,246,0.4)', '0 0 16px rgba(59,130,246,0.6)', '0 0 8px rgba(59,130,246,0.4)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    )
  }

  // Wave variant
  return (
    <div ref={ref} className="relative py-8 overflow-hidden">
      <motion.svg
        viewBox="0 0 1200 60"
        className="w-full h-12"
        style={{ opacity }}
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,30 C200,10 400,50 600,30 C800,10 1000,50 1200,30"
          fill="none"
          stroke="url(#dividerGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          viewport={{ once: false, margin: '-50px' }}
        />
        <defs>
          <linearGradient id="dividerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
            <stop offset="30%" stopColor="rgba(59, 130, 246, 0.4)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.5)" />
            <stop offset="70%" stopColor="rgba(6, 182, 212, 0.4)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  )
}
