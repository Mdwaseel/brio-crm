import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/* ---------------- Page header ---------------- */

export function PageHeader({
  title,
  subtitle,
  actions,
  breadcrumb,
  meta,
}: {
  title: string
  subtitle?: string
  actions?: ReactNode
  breadcrumb?: ReactNode
  meta?: ReactNode
}) {
  return (
    <header className="mb-6">
      {breadcrumb && <div className="mb-2">{breadcrumb}</div>}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-[30px] leading-tight font-bold text-ink tracking-tight">{title}</h1>
          {subtitle && <p className="text-[14px] text-ink-2 mt-2 max-w-3xl leading-relaxed">{subtitle}</p>}
          {meta && <div className="mt-3">{meta}</div>}
        </div>
        {actions && <div className="flex items-center gap-2 flex-wrap shrink-0">{actions}</div>}
      </div>
    </header>
  )
}

export function SectionTitle({
  title,
  subtitle,
  action,
  icon,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
  icon?: ReactNode
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-3.5">
      <div className="flex items-start gap-2.5 min-w-0">
        {icon && <span className="h-9 w-9 rounded-full bg-lime-100 text-forest-800 inline-flex items-center justify-center shrink-0">{icon}</span>}
        <div className="min-w-0">
          <h2 className="font-display text-[19px] font-bold text-ink leading-tight tracking-tight">{title}</h2>
          {subtitle && <p className="text-[13px] text-ink-2 mt-1">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

/* ---------------- Tabs ---------------- */

export function Tabs({
  tabs,
  value,
  onChange,
  className,
  variant = 'underline',
}: {
  tabs: { id: string; label: string; count?: number; icon?: ReactNode }[]
  value: string
  onChange: (id: string) => void
  className?: string
  variant?: 'underline' | 'pill'
}) {
  if (variant === 'pill') {
    return (
      <div className={cn('inline-flex items-center gap-1 p-1 bg-surface-sunken rounded-full', className)}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            aria-current={value === t.id}
            className={cn(
              'inline-flex items-center gap-1.5 px-3.5 h-8 rounded-full text-[13px] font-medium transition-all duration-150',
              value === t.id ? 'bg-surface text-ink shadow-sm' : 'text-ink-2 hover:text-ink',
            )}
          >
            {t.icon}
            {t.label}
            {t.count !== undefined && <span className="text-2xs text-ink-3 num">{t.count}</span>}
          </button>
        ))}
      </div>
    )
  }
  return (
    <div className={cn('border-b border-line overflow-x-auto scroll-thin', className)}>
      <div className="flex items-center gap-1 min-w-max" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={value === t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              'relative inline-flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-medium transition-colors duration-150',
              value === t.id ? 'text-forest-900' : 'text-ink-2 hover:text-ink',
            )}
          >
            {t.icon}
            {t.label}
            {t.count !== undefined && (
              <span
                className={cn(
                  'num text-[10px] px-1.5 py-px rounded-full font-semibold',
                  value === t.id ? 'bg-lime-200 text-forest-900' : 'bg-surface-sunken text-ink-3',
                )}
              >
                {t.count}
              </span>
            )}
            {value === t.id && <span className="absolute inset-x-2 -bottom-px h-[2.5px] bg-lime-500 rounded-full" />}
          </button>
        ))}
      </div>
    </div>
  )
}

export function Segmented({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string; icon?: ReactNode }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="inline-flex items-center p-1 bg-surface-sunken rounded-full">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          title={o.label}
          className={cn(
            'inline-flex items-center gap-1.5 h-7 px-3 rounded-full text-[12px] font-medium transition-all duration-150',
            value === o.id ? 'bg-surface text-ink shadow-sm' : 'text-ink-2 hover:text-ink',
          )}
        >
          {o.icon}
          <span className="hidden sm:inline">{o.label}</span>
        </button>
      ))}
    </div>
  )
}

/* ---------------- Progress ---------------- */

export function Progress({
  value,
  tone = 'brand',
  size = 'md',
  showValue,
  label,
}: {
  value: number
  tone?: 'brand' | 'success' | 'warning' | 'danger' | 'bronze' | 'auto'
  size?: 'xs' | 'sm' | 'md'
  showValue?: boolean
  label?: string
}) {
  const resolved =
    tone === 'auto' ? (value >= 75 ? 'success' : value >= 50 ? 'brand' : value >= 30 ? 'warning' : 'danger') : tone
  const bars = {
    brand: 'bg-forest-800 dark:bg-lime-500',
    success: 'bg-lime-500',
    warning: 'bg-warning',
    danger: 'bg-danger',
    bronze: 'bg-lime-400',
  }
  const heights = { xs: 'h-1', sm: 'h-1.5', md: 'h-2' }
  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-2xs text-ink-2 font-medium">{label}</span>}
          {showValue && <span className="text-2xs font-semibold text-ink num">{value}%</span>}
        </div>
      )}
      <div
        className={cn('w-full bg-surface-sunken rounded-full overflow-hidden', heights[size])}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn('h-full rounded-full transition-[width] duration-700 ease-out', bars[resolved])}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  )
}

export function ScoreRing({
  value,
  size = 64,
  label,
  tone,
}: {
  value: number
  size?: number
  label?: string
  tone?: 'brand' | 'success' | 'warning' | 'danger'
}) {
  const resolved = tone ?? (value >= 80 ? 'success' : value >= 60 ? 'brand' : value >= 40 ? 'warning' : 'danger')
  const colors = { brand: '#184533', success: '#8fd13f', warning: '#b4770a', danger: '#d63f3f' }
  const stroke = size >= 60 ? 6 : 5
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div className="relative inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgb(var(--surface-sunken))" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={colors[resolved]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * Math.min(100, value)) / 100}
          style={{ transition: 'stroke-dashoffset .9s cubic-bezier(.22,1,.36,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-bold text-ink num leading-none" style={{ fontSize: size / 3.4 }}>
          {value}
        </span>
        {label && <span className="text-[9px] text-ink-3 mt-0.5 uppercase tracking-wide">{label}</span>}
      </div>
    </div>
  )
}

/* ---------------- Empty state ---------------- */

export function EmptyState({
  icon,
  title,
  description,
  action,
  compact,
}: {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  compact?: boolean
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center', compact ? 'py-10 px-6' : 'py-16 px-6')}>
      {icon && (
        <div className="h-12 w-12 rounded-2xl bg-surface-sunken flex items-center justify-center text-ink-3 mb-3.5">
          {icon}
        </div>
      )}
      <p className="font-display text-[15px] font-semibold text-ink">{title}</p>
      {description && <p className="text-[13px] text-ink-2 mt-1.5 max-w-sm leading-relaxed">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

/* ---------------- Timeline ---------------- */

export type TimelineItem = {
  id: string
  title: string
  description?: string
  time: string
  tone?: 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'bronze'
  icon?: ReactNode
  actor?: string
}

export function Timeline({ items, dense }: { items: TimelineItem[]; dense?: boolean }) {
  const dots = {
    brand: 'bg-forest-800 text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    danger: 'bg-danger text-white',
    info: 'bg-info text-white',
    bronze: 'bg-lime-500 text-forest-950',
    neutral: 'bg-surface-sunken text-ink-3 border border-line',
  }
  return (
    <ol className="relative">
      {items.map((it, i) => (
        <li key={it.id} className="relative flex gap-3">
          <div className="flex flex-col items-center shrink-0">
            <span
              className={cn(
                'h-6 w-6 rounded-full flex items-center justify-center shrink-0 shadow-xs',
                dots[it.tone ?? 'neutral'],
              )}
            >
              {it.icon ?? <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />}
            </span>
            {i < items.length - 1 && <span className="w-px flex-1 bg-line my-1" />}
          </div>
          <div className={cn('min-w-0 flex-1', dense ? 'pb-3.5' : 'pb-5')}>
            <div className="flex items-start justify-between gap-3">
              <p className="text-[13px] font-semibold text-ink leading-snug">{it.title}</p>
              <span className="text-2xs text-ink-3 whitespace-nowrap num shrink-0">{it.time}</span>
            </div>
            {it.description && <p className="text-[13px] text-ink-2 mt-1 leading-relaxed">{it.description}</p>}
            {it.actor && <p className="text-2xs text-ink-3 mt-1.5">by {it.actor}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}

/* ---------------- Alert ---------------- */

export function Alert({
  tone = 'info',
  title,
  children,
  icon,
  action,
}: {
  tone?: 'info' | 'success' | 'warning' | 'danger' | 'brand'
  title?: string
  children?: ReactNode
  icon?: ReactNode
  action?: ReactNode
}) {
  const tones = {
    info: 'bg-info-soft border-info/20 text-info-ink',
    success: 'bg-success-soft border-success/20 text-success-ink',
    warning: 'bg-warning-soft border-warning/20 text-warning-ink',
    danger: 'bg-danger-soft border-danger/20 text-danger-ink',
    brand: 'bg-lime-50 border-lime-200 text-forest-800',
  }
  return (
    <div className={cn('border rounded-xl px-4 py-3 flex items-start gap-3', tones[tone])}>
      {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
      <div className="min-w-0 flex-1">
        {title && <p className="text-[13px] font-semibold leading-snug">{title}</p>}
        {children && <div className="text-[13px] mt-1 leading-relaxed opacity-90">{children}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

/* ---------------- Description list ---------------- */

export function DescList({ items, cols = 2 }: { items: { label: string; value: ReactNode }[]; cols?: 1 | 2 | 3 }) {
  const grid = { 1: 'grid-cols-1', 2: 'grid-cols-1 sm:grid-cols-2', 3: 'grid-cols-1 sm:grid-cols-3' }
  return (
    <dl className={cn('grid gap-x-6 gap-y-4', grid[cols])}>
      {items.map((it) => (
        <div key={it.label} className="min-w-0">
          <dt className="text-2xs text-ink-3 font-medium uppercase tracking-wide">{it.label}</dt>
          <dd className="text-[13px] text-ink font-medium mt-1 truncate">{it.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function DrawerSection({
  title,
  action,
  children,
  className,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn('px-5 py-5 border-b border-line last:border-0', className)}>
      <div className="flex items-center justify-between gap-3 mb-3.5">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-ink-3">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  )
}
