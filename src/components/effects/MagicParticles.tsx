'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface MagicParticle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

export function MagicParticles({
  count = 15,
  color = 'rgba(59, 130, 246, 0.4)',
  className = '',
}: {
  count?: number
  color?: string
  className?: string
}) {
  const [particles, setParticles] = useState<MagicParticle[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1.5,
        duration: Math.random() * 10 + 6,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.4 + 0.1,
      }))
    )
  }, [count])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: color,
          }}
          animate={{
            y: [0, -40, 10, -20, 0],
            x: [0, 20, -10, 15, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity * 0.3, p.opacity * 1.5, p.opacity],
            scale: [1, 1.5, 0.7, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
