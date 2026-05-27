'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

export function TextReveal({ children, className, delay = 0, as: Component = 'span' }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const words = children.split(' ')

  return (
    <Component className={cn('inline-block', className)}>
      <span ref={ref} className="inline-flex flex-wrap">
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block mr-[0.25em]">
            <motion.span
              className="inline-block"
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: delay + i * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Component>
  )
}
