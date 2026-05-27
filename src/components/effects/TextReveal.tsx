'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// Character-by-character text reveal with stagger
export function TextReveal({
  text,
  className = '',
  delay = 0,
  once = false,
}: {
  text: string
  className?: string
  delay?: number
  once?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })

  const words = text.split(' ')

  return (
    <span ref={ref} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          {word.split('').map((char, charIndex) => {
            const globalIndex = words.slice(0, wordIndex).join(' ').length + charIndex
            return (
              <motion.span
                key={charIndex}
                className="inline-block"
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={isInView
                  ? { opacity: 1, y: 0, rotateX: 0 }
                  : { opacity: 0, y: 40, rotateX: -90 }
                }
                transition={{
                  duration: 0.4,
                  delay: delay + globalIndex * 0.025,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              >
                {char}
              </motion.span>
            )
          })}
        </span>
      ))}
    </span>
  )
}

// Word-by-word sliding reveal
export function WordReveal({
  text,
  className = '',
  delay = 0,
  once = false,
}: {
  text: string
  className?: string
  delay?: number
  once?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })

  const words = text.split(' ')

  return (
    <span ref={ref} className={`${className} overflow-hidden inline-flex flex-wrap`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: 8 }}
            animate={isInView ? { y: '0%', rotate: 0 } : { y: '110%', rotate: 8 }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.08,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// Line reveal with clip-path mask
export function LineReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = false,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  once?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })

  const clipPaths = {
    up: { hidden: 'inset(100% 0 0 0)', visible: 'inset(0 0 0 0)' },
    down: { hidden: 'inset(0 0 100% 0)', visible: 'inset(0 0 0 0)' },
    left: { hidden: 'inset(0 100% 0 0)', visible: 'inset(0 0 0 0)' },
    right: { hidden: 'inset(0 0 0 100%)', visible: 'inset(0 0 0 0)' },
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ clipPath: clipPaths[direction].hidden, opacity: 0 }}
        animate={isInView
          ? { clipPath: clipPaths[direction].visible, opacity: 1 }
          : { clipPath: clipPaths[direction].hidden, opacity: 0 }
        }
        transition={{ duration: 0.8, delay, ease: [0.77, 0, 0.175, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
