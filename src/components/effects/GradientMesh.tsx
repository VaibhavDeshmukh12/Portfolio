'use client'

import { motion } from 'framer-motion'

export function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(var(--accent-primary), 0.08) 0%, transparent 60%)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(var(--accent-secondary), 0.08) 0%, transparent 60%)',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute top-1/4 right-1/4 w-[60%] h-[60%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(var(--accent-tertiary), 0.05) 0%, transparent 60%)',
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}
