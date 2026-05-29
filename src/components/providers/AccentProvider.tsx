'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type AccentTheme = 'blue' | 'purple' | 'cyan' | 'green' | 'rose'

interface AccentColors {
  primary: string
  secondary: string
  tertiary: string
}

const accentThemes: Record<AccentTheme, AccentColors> = {
  blue: { primary: '59, 130, 246', secondary: '139, 92, 246', tertiary: '6, 182, 212' },
  purple: { primary: '139, 92, 246', secondary: '236, 72, 153', tertiary: '99, 102, 241' },
  cyan: { primary: '6, 182, 212', secondary: '59, 130, 246', tertiary: '16, 185, 129' },
  green: { primary: '16, 185, 129', secondary: '6, 182, 212', tertiary: '34, 197, 94' },
  rose: { primary: '244, 63, 94', secondary: '236, 72, 153', tertiary: '251, 113, 133' },
}

interface AccentContextType {
  accent: AccentTheme
  setAccent: (theme: AccentTheme) => void
  colors: AccentColors
}

const AccentContext = createContext<AccentContextType>({
  accent: 'blue',
  setAccent: () => {},
  colors: accentThemes.blue,
})

export function AccentProvider({ children }: { children: ReactNode }) {
  const [accent, setAccent] = useState<AccentTheme>('blue')

  useEffect(() => {
    const saved = localStorage.getItem('accent-theme') as AccentTheme | null
    if (saved && accentThemes[saved]) {
      setAccent(saved)
    }
  }, [])

  useEffect(() => {
    const colors = accentThemes[accent]
    const root = document.documentElement

    root.style.setProperty('--accent-primary', colors.primary)
    root.style.setProperty('--accent-secondary', colors.secondary)
    root.style.setProperty('--accent-tertiary', colors.tertiary)

    localStorage.setItem('accent-theme', accent)
  }, [accent])

  return (
    <AccentContext.Provider value={{ accent, setAccent, colors: accentThemes[accent] }}>
      {children}
    </AccentContext.Provider>
  )
}

export function useAccent() {
  return useContext(AccentContext)
}
