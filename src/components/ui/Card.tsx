import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Trend } from './Badge'

export function Card({ children, className, as: As = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'section' }) {
  return <As className={cn('bg-surface border border-line rounded-xl shadow-xs', className)}>{children}</As>
}

export function CardHeader({
  title, subtitle, action, icon, className, dense,
}: { title: ReactNode; subtitle?: ReactNode; action?: ReactNode; icon?: ReactNode; className?: string; dense?: boolean }) {
  return (
    <div className={cn('flex items-start justify-between gap-4 border-b border-line', dense ? 'px-4 py-3' : 'px-5 py-4', className)}>
      <div className="flex items-start gap-2.5 min-w-0">
        {icon && <span className="mt-0.5 text-brand-600 shrink-0">{icon}</span>}
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
  return <div className={cn('p-5', className)}>{children}</div>
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
      <div className="p-4 pt-5 flex-1" style={{ minHeight: height }}>{children}</div>
      {footer && <div className="px-5 py-3 border-t border-line bg-surface-muted/60 rounded-b-xl">{footer}</div>}
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
    brand: 'text-brand-700 bg-brand-50', bronze: 'text-bronze-600 bg-bronze-50',
    success: 'text-success bg-success-soft', warning: 'text-warning bg-warning-soft', danger: 'text-danger bg-danger-soft',
  }
  const Wrapper: any = onClick ? 'button' : 'div'
  return (
    <Wrapper
      onClick={onClick}
      className={cn(
        'bg-surface border border-line rounded-xl p-4 text-left w-full shadow-xs',
        'transition-[box-shadow,border-color,transform] duration-200',
        onClick && 'hover:shadow-md hover:border-line-strong hover:-translate-y-px cursor-pointer',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-[13px] font-medium text-ink-2 leading-tight">{label}</span>
        {icon && (
          <span className={cn('h-7 w-7 rounded-lg inline-flex items-center justify-center shrink-0', accents[accent ?? 'brand'])}>
            {icon}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-end gap-2.5 flex-wrap">
        <span className="font-display text-[28px] leading-none font-bold text-ink num tracking-tight">{value}</span>
        {delta !== undefined && <span className="pb-0.5"><Trend value={delta} suffix={deltaSuffix} invert={invertDelta} /></span>}
      </div>
      {hint && <p className="mt-2 text-2xs text-ink-3">{hint}</p>}
      {footer && <div className="mt-3 pt-3 border-t border-line">{footer}</div>}
    </Wrapper>
  )
}

export function MiniKpi({
  label, value, tone = 'neutral', icon, sub,
}: { label: string; value: string; tone?: 'neutral' | 'success' | 'warning' | 'danger'; icon?: ReactNode; sub?: string }) {
  const tones = { neutral: 'text-ink', success: 'text-success', warning: 'text-warning', danger: 'text-danger' }
  return (
    <div className="bg-surface border border-line rounded-xl px-4 py-3.5 hover:border-line-strong transition-colors">
      <div className="flex items-center gap-2 text-ink-3">
        {icon}
        <span className="text-2xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className={cn('mt-2 font-display text-xl font-bold num', tones[tone])}>{value}</div>
      {sub && <div className="text-2xs text-ink-3 mt-0.5">{sub}</div>}
    </div>
  )
}

export function StatRow({ label, value, tone }: { label: string; value: ReactNode; tone?: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-line last:border-0">
      <span className="text-[13px] text-ink-2">{label}</span>
      <span className={cn('text-[13px] font-semibold num', tone ?? 'text-ink')}>{value}</span>
    </div>
  )
}
