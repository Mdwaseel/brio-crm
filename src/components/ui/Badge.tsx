import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'bronze' | 'slate'

const TONES: Record<Tone, string> = {
  neutral: 'bg-surface-sunken text-ink-2 border-line',
  slate: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-400/15 dark:text-slate-200 dark:border-slate-400/30',
  brand: 'bg-forest-50 text-forest-800 border-forest-100',
  bronze: 'bg-lime-100 text-lime-800 border-lime-200',
  success: 'bg-success-soft text-success-ink border-success/15',
  warning: 'bg-warning-soft text-warning-ink border-warning/15',
  danger: 'bg-danger-soft text-danger-ink border-danger/15',
  info: 'bg-info-soft text-info-ink border-info/15',
}

const DOTS: Record<Tone, string> = {
  neutral: 'bg-ink-3', slate: 'bg-slate-400', brand: 'bg-forest-700', bronze: 'bg-lime-500',
  success: 'bg-success', warning: 'bg-warning', danger: 'bg-danger', info: 'bg-info',
}

export function Badge({
  tone = 'neutral', dot, children, className, size = 'sm',
}: { tone?: Tone; dot?: boolean; children: ReactNode; className?: string; size?: 'xs' | 'sm' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border rounded-full font-medium whitespace-nowrap',
        size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-[3px] text-2xs',
        TONES[tone], className,
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', DOTS[tone])} />}
      {children}
    </span>
  )
}

export function Pill({ tone = 'neutral', children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 border rounded-full px-2.5 py-[3px] text-2xs font-medium', TONES[tone], className)}>
      {children}
    </span>
  )
}

const STATUS_TONES: Record<string, Tone> = {
  // generic
  active: 'success', healthy: 'success', completed: 'success', won: 'success', accepted: 'success',
  resolved: 'success', 'on track': 'success', approved: 'success', paid: 'success', positive: 'success',
  qualified: 'info', new: 'info', sent: 'info', 'in progress': 'info', open: 'info', viewed: 'info',
  monitor: 'warning', 'at risk': 'warning', 'low stock': 'warning', warning: 'warning', pending: 'warning',
  waiting: 'warning', negotiation: 'warning', proposal: 'warning', due: 'warning', hot: 'warning',
  critical: 'danger', delayed: 'danger', escalated: 'danger', lost: 'danger', rejected: 'danger',
  breached: 'danger', overdue: 'danger', 'critical stock': 'danger', churn: 'danger', negative: 'danger',
  draft: 'neutral', expired: 'neutral', inactive: 'neutral', closed: 'neutral', archived: 'neutral',
  cold: 'neutral', contacted: 'brand', renewal: 'bronze', amc: 'bronze',
}

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const tone = STATUS_TONES[status.toLowerCase()] ?? 'neutral'
  return <Badge tone={tone} dot className={className}>{status}</Badge>
}

export function Trend({ value, suffix = '%', invert = false }: { value: number; suffix?: string; invert?: boolean }) {
  const up = value >= 0
  const good = invert ? !up : up
  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full px-1.5 py-[2px] text-[10px] font-semibold num',
        good ? 'bg-lime-100 text-lime-800' : 'bg-danger-soft text-danger-ink',
      )}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden
        className={up ? '' : 'rotate-180'}>
        <path d="m5 15 7-7 7 7" />
      </svg>
      {Math.abs(value)}{suffix}
    </span>
  )
}
