'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

export function TextScramble({
  text,
  className = '',
  delay = 0,
  speed = 30,
  once = false,
}: {
  text: string
  className?: string
  delay?: number
  speed?: number
  once?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })
  const [displayText, setDisplayText] = useState('')
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isInView) {
      setDisplayText(text.replace(/./g, ' '))
      return
    }

    let iteration = 0

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' '
              if (index < iteration) return text[index]
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join('')
        )

        iteration += 1 / 3

        if (iteration >= text.length) {
          setDisplayText(text)
          if (intervalRef.current) clearInterval(intervalRef.current)
        }
      }, speed)
    }, delay * 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [isInView, text, delay, speed])

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  )
}
