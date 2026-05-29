'use client'

import { cn } from '@/lib/utils'

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export function GlowCard({ children, className, glowColor }: GlowCardProps) {
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
          background: glowColor
            ? `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`
            : `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(var(--accent-primary), 0.15), transparent 40%)`,
        }}
      />
      {/* Top gradient line */}
      <div
        className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(to right, transparent, rgba(var(--accent-primary), 0.5), transparent)' }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
