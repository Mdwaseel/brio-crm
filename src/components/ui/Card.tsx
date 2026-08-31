import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Trend } from './Badge'

/** Base surface: soft 20px radius, hairline ring instead of a hard border. */
export function Card({ children, className, as: As = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'section' }) {
  return <As className={cn('bg-surface rounded-2xl shadow-xs ring-1 ring-[color:var(--ring-hairline)]', className)}>{children}</As>
}

export function CardHeader({
  title, subtitle, action, icon, className, dense,
}: { title: ReactNode; subtitle?: ReactNode; action?: ReactNode; icon?: ReactNode; className?: string; dense?: boolean }) {
  return (
    <div className={cn('flex items-start justify-between gap-4', dense ? 'px-4 pt-4 pb-2' : 'px-5 pt-5 pb-3', className)}>
      <div className="flex items-start gap-2.5 min-w-0">
        {icon && <span className="mt-0.5 text-forest-700 shrink-0">{icon}</span>}
        <div className="min-w-0">
          <h3 className="font-display text-[15px] font-semibold text-ink leading-tight truncate">{title}</h3>
          {subtitle && <p className="text-2xs text-ink-3 mt-1 leading-snug">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="shrink-0 flex items-center gap-1.5">{action}</div>}
    </div>
  )
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('p-5 pt-2', className)}>{children}</div>
}

export function ChartCard({
  title, subtitle, action, children, className, footer, height = 260,
}: {
  title: string; subtitle?: string; action?: ReactNode; children: ReactNode
  className?: string; footer?: ReactNode; height?: number
}) {
  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader title={title} subtitle={subtitle} action={action} />
      <div className="px-3 pb-2 pt-1 flex-1" style={{ minHeight: height }}>{children}</div>
      {footer && <div className="px-5 py-3.5 border-t border-line/70">{footer}</div>}
    </Card>
  )
}

export function KpiCard({
  label, value, delta, deltaSuffix = '%', hint, icon, accent, invertDelta, footer, onClick,
}: {
  label: string; value: string; delta?: number; deltaSuffix?: string; hint?: string
  icon?: ReactNode; accent?: 'brand' | 'bronze' | 'success' | 'warning' | 'danger'
  invertDelta?: boolean; footer?: ReactNode; onClick?: () => void
}) {
  const accents = {
    brand: 'text-forest-800 bg-forest-100', bronze: 'text-forest-900 bg-lime-200',
    success: 'text-success bg-success-soft', warning: 'text-warning bg-warning-soft', danger: 'text-danger bg-danger-soft',
  }
  const Wrapper: any = onClick ? 'button' : 'div'
  return (
    <Wrapper
      onClick={onClick}
      className={cn(
        'bg-surface rounded-2xl p-5 text-left w-full shadow-xs ring-1 ring-[color:var(--ring-hairline)]',
        'transition-[box-shadow,transform] duration-200',
        onClick && 'hover:shadow-lift hover:-translate-y-0.5 cursor-pointer',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-[13px] font-medium text-ink-2 leading-tight">{label}</span>
        {icon && (
          <span className={cn('h-8 w-8 rounded-full inline-flex items-center justify-center shrink-0', accents[accent ?? 'brand'])}>
            {icon}
          </span>
        )}
      </div>
      <div className="mt-3.5 flex items-end gap-2.5 flex-wrap">
        <span className="font-display text-[30px] leading-none font-bold text-ink num tracking-tight">{value}</span>
        {delta !== undefined && <span className="pb-0.5"><Trend value={delta} suffix={deltaSuffix} invert={invertDelta} /></span>}
      </div>
      {hint && <p className="mt-2.5 text-2xs text-ink-3 leading-relaxed">{hint}</p>}
      {footer && <div className="mt-3.5 pt-3.5 border-t border-line/70">{footer}</div>}
    </Wrapper>
  )
}

export function MiniKpi({
  label, value, tone = 'neutral', icon, sub,
}: { label: string; value: string; tone?: 'neutral' | 'success' | 'warning' | 'danger'; icon?: ReactNode; sub?: string }) {
  const tones = { neutral: 'text-ink', success: 'text-success', warning: 'text-warning', danger: 'text-danger' }
  return (
    <div className="bg-surface rounded-2xl px-4 py-4 shadow-xs ring-1 ring-[color:var(--ring-hairline)] hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-2 text-ink-3">
        {icon && <span className="h-6 w-6 rounded-full bg-forest-50 text-forest-700 inline-flex items-center justify-center shrink-0">{icon}</span>}
        <span className="text-2xs font-medium">{label}</span>
      </div>
      <div className={cn('mt-2.5 font-display text-[22px] leading-none font-bold num', tones[tone])}>{value}</div>
      {sub && <div className="text-2xs text-ink-3 mt-1.5">{sub}</div>}
    </div>
  )
}

/**
 * Small stat inside a grouped panel — the "Income / Expense / Savings"
 * pattern from the reference, adapted to CRM measures.
 */
export function StatTile({
  label, value, delta, icon, onClick,
}: { label: string; value: string; delta?: number; icon?: ReactNode; onClick?: () => void }) {
  const Wrapper: any = onClick ? 'button' : 'div'
  return (
    <Wrapper
      onClick={onClick}
      className={cn(
        'rounded-xl bg-surface-muted/70 ring-1 ring-[color:var(--ring-hairline)] px-3.5 py-3.5 text-left w-full',
        onClick && 'hover:bg-lime-50 hover:ring-lime-200 dark:hover:bg-lime-400/10 dark:hover:ring-lime-400/30 transition-colors cursor-pointer',
      )}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <span className="h-6 w-6 rounded-lg bg-surface ring-1 ring-[color:var(--ring-hairline)] text-forest-700 inline-flex items-center justify-center shrink-0">
            {icon}
          </span>
        )}
        <span className="text-2xs font-medium text-ink-2 truncate">{label}</span>
      </div>
      <div className="mt-2.5 flex items-end gap-2 flex-wrap">
        <span className="font-display text-[19px] leading-none font-bold text-ink num tracking-tight">{value}</span>
        {delta !== undefined && <Trend value={delta} />}
      </div>
    </Wrapper>
  )
}

export function StatRow({ label, value, tone }: { label: string; value: ReactNode; tone?: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-line/70 last:border-0">
      <span className="text-[13px] text-ink-2">{label}</span>
      <span className={cn('text-[13px] font-semibold num', tone ?? 'text-ink')}>{value}</span>
    </div>
  )
}
