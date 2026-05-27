'use client'

import { cn } from '@/lib/utils'

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export function GlowCard({ children, className, glowColor = 'rgba(59, 130, 246, 0.15)' }: GlowCardProps) {
  return (
    <div
      className={cn(
        'relative group rounded-2xl overflow-hidden',
        'bg-white/[0.03] border border-white/[0.08]',
        'hover:border-white/[0.15] transition-all duration-500',
        className
      )}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`,
        }}
      />
      {/* Top gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-electric-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
