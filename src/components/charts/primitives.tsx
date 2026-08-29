import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export const CHART = {
  /* Deep forest carries the primary series; spring lime carries the comparison. */
  brand: '#12352a',
  brandLight: '#358a61',
  brandFaint: '#bbdfc8',
  lime: '#8fd13f',
  limeLight: '#c2ec7e',
  /* Kept as aliases so existing series keep their key names. */
  bronze: '#8fd13f',
  bronzeLight: '#c2ec7e',
  success: '#1f8f5f',
  warning: '#b4770a',
  danger: '#d63f3f',
  info: '#2b7fb8',
  grid: '#eaeee7',
  axis: '#86948b',
}

/** Shared hover-band fill for bar and composed charts. */
export const CURSOR_FILL = 'rgba(18,53,42,.05)'

export const AXIS_PROPS = {
  tick: { fill: '#86948b', fontSize: 11 },
  tickLine: false,
  axisLine: false,
} as const

export function ChartTooltip({
  active,
  payload,
  label,
  formatter,
  labelSuffix,
}: {
  active?: boolean
  payload?: any[]
  label?: string
  formatter?: (value: number, name: string) => ReactNode
  labelSuffix?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-surface rounded-xl shadow-lg ring-1 ring-black/[0.06] px-3.5 py-3 min-w-[158px]">
      {label !== undefined && (
        <p className="text-2xs font-semibold text-ink-3 uppercase tracking-wide mb-1.5">
          {label}
          {labelSuffix}
        </p>
      )}
      <div className="space-y-1">
        {payload.map((p, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-2xs text-ink-2">
              <span className="h-2 w-2 rounded-full shrink-0" style={{ background: p.color ?? p.fill }} />
              {p.name}
            </span>
            <span className="text-2xs font-semibold text-ink num">
              {formatter ? formatter(p.value, p.name) : p.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Legend({ items, className }: { items: { label: string; color: string; value?: string }[]; className?: string }) {
  return (
    <div className={cn('flex items-center gap-4 flex-wrap', className)}>
      {items.map((it) => (
        <span key={it.label} className="inline-flex items-center gap-1.5 text-2xs text-ink-2">
          <span className="h-2 w-2 rounded-full shrink-0" style={{ background: it.color }} />
          {it.label}
          {it.value && <span className="font-semibold text-ink num">{it.value}</span>}
        </span>
      ))}
    </div>
  )
}
