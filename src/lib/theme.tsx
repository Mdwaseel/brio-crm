import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Sun, Moon, MonitorSmartphone } from 'lucide-react'

export type ThemePreference = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

export const THEME_KEY = 'brio.theme'

/** Shared by the topbar control and the Settings appearance panel. */
export const THEME_OPTIONS = [
  { id: 'light' as const, label: 'Light', icon: Sun, hint: 'Always the light palette' },
  { id: 'dark' as const, label: 'Dark', icon: Moon, hint: 'Always the dark palette' },
  { id: 'system' as const, label: 'Match system', icon: MonitorSmartphone, hint: 'Follow your device setting' },
]

type ThemeContextValue = {
  /** What the user chose — including "follow the OS". */
  preference: ThemePreference
  /** What is actually painted right now. */
  theme: ResolvedTheme
  setPreference: (p: ThemePreference) => void
  /** Flip between light and dark, leaving "system" behind. */
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function systemTheme(): ResolvedTheme {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  } catch {
    /* storage unavailable — fall back to following the OS */
  }
  return 'system'
}

function apply(theme: ResolvedTheme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  // Keeps form controls, scrollbars and the browser chrome in step.
  root.style.colorScheme = theme
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(readPreference)
  const [system, setSystem] = useState<ResolvedTheme>(systemTheme)

  // Track the OS setting so "system" stays live rather than sampled once.
  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => setSystem(e.matches ? 'dark' : 'light')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const theme: ResolvedTheme = preference === 'system' ? system : preference

  useEffect(() => {
    apply(theme)
  }, [theme])

  const setPreference = useCallback((p: ThemePreference) => {
    setPreferenceState(p)
    try {
      localStorage.setItem(THEME_KEY, p)
    } catch {
      /* storage unavailable — the choice lasts for this session only */
    }
  }, [])

  const toggle = useCallback(() => {
    setPreference(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setPreference])

  const value = useMemo(
    () => ({ preference, theme, setPreference, toggle }),
    [preference, theme, setPreference, toggle],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
