'use client'

export function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[120px]" style={{ background: 'rgba(var(--accent-primary), 0.05)' }} />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: 'rgba(var(--accent-secondary), 0.05)' }} />
    </div>
  )
}
