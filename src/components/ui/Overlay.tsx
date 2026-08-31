import { useEffect, useRef, useState, createContext, useContext, useCallback } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X, CheckCircle2, Info, AlertTriangle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { IconButton } from './Button'

function useLockBody(open: boolean) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])
}

function useEscape(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, onClose])
}

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = 'md',
  icon,
}: {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: ReactNode
}) {
  useLockBody(open)
  useEscape(open, onClose)
  if (!open) return null
  const widths = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl', xl: 'max-w-5xl' }
  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-start justify-center p-4 sm:p-6 overflow-y-auto scroll-thin">
      <div className="fixed inset-0 bg-forest-950/45 backdrop-blur-[2px] animate-fade-in" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'relative w-full my-auto bg-surface rounded-3xl shadow-pop animate-scale-in',
          widths[size],
        )}
      >
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-line">
          <div className="flex items-start gap-3 min-w-0">
            {icon && (
              <span className="h-9 w-9 rounded-full bg-lime-100 text-forest-800 inline-flex items-center justify-center shrink-0">
                {icon}
              </span>
            )}
            <div className="min-w-0">
              <h2 className="font-display text-base font-semibold text-ink leading-tight">{title}</h2>
              {subtitle && <p className="text-2xs text-ink-3 mt-1">{subtitle}</p>}
            </div>
          </div>
          <IconButton label="Close" size="sm" onClick={onClose}>
            <X size={16} />
          </IconButton>
        </div>
        <div className="px-5 py-5 max-h-[65vh] overflow-y-auto scroll-thin">{children}</div>
        {footer && (
          <div className="px-5 py-3.5 border-t border-line bg-surface-muted rounded-b-3xl flex items-center justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}

export function Drawer({
  open,
  onClose,
  title,
  subtitle,
  badge,
  children,
  footer,
  width = 'md',
  header,
}: {
  open: boolean
  onClose: () => void
  title?: string
  subtitle?: ReactNode
  badge?: ReactNode
  children: ReactNode
  footer?: ReactNode
  width?: 'sm' | 'md' | 'lg' | 'xl'
  header?: ReactNode
}) {
  useLockBody(open)
  useEscape(open, onClose)
  if (!open) return null
  const widths = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl', xl: 'max-w-5xl' }
  return createPortal(
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-forest-950/40 backdrop-blur-[2px] animate-fade-in" onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        className={cn(
          'absolute right-0 top-0 h-full w-full bg-surface shadow-pop border-l border-line flex flex-col animate-slide-left',
          widths[width],
        )}
      >
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-line shrink-0">
          {header ?? (
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display text-lg font-semibold text-ink leading-tight truncate">{title}</h2>
                {badge}
              </div>
              {subtitle && <div className="text-[13px] text-ink-2 mt-1">{subtitle}</div>}
            </div>
          )}
          <IconButton label="Close panel" size="sm" onClick={onClose}>
            <X size={16} />
          </IconButton>
        </div>
        <div className="flex-1 overflow-y-auto scroll-thin">{children}</div>
        {footer && (
          <div className="px-5 py-3.5 border-t border-line bg-surface-muted flex items-center gap-2 shrink-0">
            {footer}
          </div>
        )}
      </aside>
    </div>,
    document.body,
  )
}

export function Dropdown({
  trigger,
  children,
  align = 'right',
  className,
  width = 'w-56',
}: {
  trigger: (p: { open: boolean; toggle: () => void }) => ReactNode
  children: ReactNode | ((close: () => void) => ReactNode)
  align?: 'left' | 'right'
  className?: string
  width?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const close = useCallback(() => setOpen(false), [])
  useEffect(() => {
    if (!open) return
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', h)
    document.addEventListener('keydown', k)
    return () => {
      document.removeEventListener('mousedown', h)
      document.removeEventListener('keydown', k)
    }
  }, [open])
  return (
    <div ref={ref} className={cn('relative', className)}>
      {trigger({ open, toggle: () => setOpen((v) => !v) })}
      {open && (
        <div
          className={cn(
            'absolute top-[calc(100%+8px)] z-50 bg-surface ring-1 ring-[color:var(--ring-hairline)] rounded-2xl shadow-pop py-1.5 animate-slide-down',
            align === 'right' ? 'right-0' : 'left-0',
            width,
          )}
        >
          {typeof children === 'function' ? children(close) : children}
        </div>
      )}
    </div>
  )
}

export function MenuItem({
  children,
  icon,
  onClick,
  danger,
  shortcut,
  active,
}: {
  children: ReactNode
  icon?: ReactNode
  onClick?: () => void
  danger?: boolean
  shortcut?: string
  active?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2.5 px-3 py-1.5 text-[13px] text-left transition-colors',
        danger ? 'text-danger hover:bg-danger-soft' : 'text-ink-2 hover:bg-surface-sunken hover:text-ink',
        active && 'text-forest-900 bg-lime-100 font-semibold',
      )}
    >
      {icon && <span className="text-ink-3 shrink-0">{icon}</span>}
      <span className="flex-1 truncate">{children}</span>
      {shortcut && <span className="text-2xs text-ink-3 num">{shortcut}</span>}
    </button>
  )
}

export function MenuLabel({ children }: { children: ReactNode }) {
  return <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-3">{children}</div>
}

export function MenuDivider() {
  return <div className="my-1.5 border-t border-line" />
}

export function Tooltip({
  label,
  children,
  side = 'right',
}: {
  label: string
  children: ReactNode
  side?: 'right' | 'top' | 'bottom'
}) {
  const pos = {
    right: 'left-[calc(100%+8px)] top-1/2 -translate-y-1/2',
    top: 'bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2',
    bottom: 'top-[calc(100%+8px)] left-1/2 -translate-x-1/2',
  }
  return (
    <span className="relative group/tt inline-flex">
      {children}
      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute z-[90] whitespace-nowrap rounded-lg bg-forest-950 px-2.5 py-1.5 text-[11px] font-medium text-white shadow-lg',
          'opacity-0 group-hover/tt:opacity-100 transition-opacity duration-150 shadow-md',
          pos[side],
        )}
      >
        {label}
      </span>
    </span>
  )
}

/* ---------------- Toasts ---------------- */

type ToastKind = 'success' | 'info' | 'warning' | 'error'
type ToastItem = { id: number; title: string; description?: string; kind: ToastKind }

const ToastCtx = createContext<{ toast: (t: Omit<ToastItem, 'id'>) => void; demo: (label?: string) => void }>({
  toast: () => {},
  demo: () => {},
})

export const useToast = () => useContext(ToastCtx)

const TOAST_ICON: Record<ToastKind, ReactNode> = {
  success: <CheckCircle2 size={16} className="text-success" />,
  info: <Info size={16} className="text-info" />,
  warning: <AlertTriangle size={16} className="text-warning" />,
  error: <XCircle size={16} className="text-danger" />,
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const idRef = useRef(0)

  const toast = useCallback((t: Omit<ToastItem, 'id'>) => {
    const id = ++idRef.current
    setItems((v) => [...v, { ...t, id }])
    setTimeout(() => setItems((v) => v.filter((x) => x.id !== id)), 4200)
  }, [])

  const demo = useCallback(
    (label?: string) => {
      toast({
        kind: 'info',
        title: label ?? 'Demo action',
        description: 'Backend integration will be connected in production.',
      })
    },
    [toast],
  )

  return (
    <ToastCtx.Provider value={{ toast, demo }}>
      {children}
      {createPortal(
        <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2.5 w-[360px] max-w-[calc(100vw-2.5rem)]">
          {items.map((t) => (
            <div
              key={t.id}
              className="bg-surface ring-1 ring-[color:var(--ring-hairline)] rounded-2xl shadow-pop px-4 py-3 flex items-start gap-3 animate-toast-in"
            >
              <span className="mt-0.5 shrink-0">{TOAST_ICON[t.kind]}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink leading-snug">{t.title}</p>
                {t.description && <p className="text-2xs text-ink-2 mt-0.5 leading-relaxed">{t.description}</p>}
              </div>
              <button
                aria-label="Dismiss notification"
                onClick={() => setItems((v) => v.filter((x) => x.id !== t.id))}
                className="text-ink-3 hover:text-ink transition-colors shrink-0"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>,
        document.body,
      )}
    </ToastCtx.Provider>
  )
}
