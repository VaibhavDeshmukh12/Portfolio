'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

export function MagneticButton({ children, className, onClick, href }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current!.getBoundingClientRect()
    const x = (clientX - left - width / 2) * 0.3
    const y = (clientY - top - height / 2) * 0.3
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className={cn(
        'relative inline-flex items-center justify-center px-6 py-3 rounded-full',
        'bg-white/5 border border-white/10 backdrop-blur-sm',
        'hover:bg-white/10 hover:border-white/20',
        'transition-colors duration-300 cursor-pointer',
        'group',
        className
      )}
      onClick={onClick}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-electric-blue/20 via-electric-purple/20 to-electric-cyan/20 blur-xl" />
      <span className="relative z-10 font-medium text-sm">{children}</span>
    </motion.div>
  )

  if (href) {
    return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>{content}</a>
  }

  return content
}
