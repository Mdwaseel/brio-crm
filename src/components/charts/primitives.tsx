import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export const CHART = {
  brand: '#2e5a79',
  brandLight: '#5f8fae',
  brandFaint: '#c3d6e4',
  bronze: '#a47d57',
  bronzeLight: '#d2b491',
  success: '#12805c',
  warning: '#b46a06',
  danger: '#c02b26',
  info: '#1e6fbf',
  grid: '#e9eef3',
  axis: '#849aa8',
}

export const AXIS_PROPS = {
  tick: { fill: '#7c8b99', fontSize: 11 },
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
    <div className="bg-surface border border-line rounded-lg shadow-lg px-3 py-2.5 min-w-[150px]">
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
              <span className="h-2 w-2 rounded-sm shrink-0" style={{ background: p.color ?? p.fill }} />
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
          <span className="h-2 w-2 rounded-sm shrink-0" style={{ background: it.color }} />
          {it.label}
          {it.value && <span className="font-semibold text-ink num">{it.value}</span>}
        </span>
      ))}
    </div>
  )
}
