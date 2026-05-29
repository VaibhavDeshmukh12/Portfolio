'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Palette } from 'lucide-react'
import { useAccent, AccentTheme } from '@/components/providers/AccentProvider'
import { cn } from '@/lib/utils'

const themes: { id: AccentTheme; label: string; color: string }[] = [
  { id: 'blue', label: 'Ocean Blue', color: 'bg-blue-500' },
  { id: 'purple', label: 'Electric Purple', color: 'bg-purple-500' },
  { id: 'cyan', label: 'Neon Cyan', color: 'bg-cyan-500' },
  { id: 'green', label: 'Matrix Green', color: 'bg-emerald-500' },
  { id: 'rose', label: 'Hot Rose', color: 'bg-rose-500' },
]

export function AccentSwitcher() {
  const { accent, setAccent } = useAccent()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="absolute bottom-16 right-0 p-3 rounded-2xl bg-navy-800/90 backdrop-blur-xl border border-white/[0.1] shadow-2xl"
          >
            <p className="text-[10px] uppercase tracking-widest text-white/30 font-mono mb-2 px-1">Accent</p>
            <div className="flex flex-col gap-1.5">
              {themes.map((theme) => (
                <motion.button
                  key={theme.id}
                  onClick={() => {
                    setAccent(theme.id)
                    setIsOpen(false)
                  }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-xl transition-colors duration-200',
                    accent === theme.id ? 'bg-white/[0.08]' : 'hover:bg-white/[0.04]'
                  )}
                >
                  <div className={cn('w-4 h-4 rounded-full', theme.color)} />
                  <span className="text-xs text-white/70 whitespace-nowrap">{theme.label}</span>
                  {accent === theme.id && (
                    <motion.div
                      layoutId="accentCheck"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center',
          'bg-white/[0.05] backdrop-blur-xl border border-white/[0.1]',
          'hover:border-white/[0.2] hover:bg-white/[0.08] transition-all duration-300',
          'shadow-lg shadow-black/20'
        )}
        aria-label="Change accent color"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Palette size={18} className="text-white/60" />
        </motion.div>
      </motion.button>
    </div>
  )
}
