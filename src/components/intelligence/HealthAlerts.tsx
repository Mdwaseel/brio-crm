import { useNavigate } from 'react-router-dom'
import { AlertOctagon, AlertTriangle, Eye, CheckCircle2, ArrowRight, Clock } from 'lucide-react'
import type { Severity, Alert as AlertType } from '@/types'
import { cn, relTime } from '@/lib/utils'
import { alerts } from '@/data/analytics'
import { Badge, useToast } from '@/components/ui'

const SEVERITY = {
  critical: {
    label: 'Critical', icon: AlertOctagon, tone: 'danger' as const,
    bar: 'bg-danger', chip: 'bg-danger-soft text-danger-ink border-danger/20', ring: 'hover:border-danger/40',
  },
  warning: {
    label: 'Warning', icon: AlertTriangle, tone: 'warning' as const,
    bar: 'bg-warning', chip: 'bg-warning-soft text-warning-ink border-warning/20', ring: 'hover:border-warning/40',
  },
  monitor: {
    label: 'Monitor', icon: Eye, tone: 'info' as const,
    bar: 'bg-info', chip: 'bg-info-soft text-info-ink border-info/20', ring: 'hover:border-info/40',
  },
  healthy: {
    label: 'Healthy', icon: CheckCircle2, tone: 'success' as const,
    bar: 'bg-success', chip: 'bg-success-soft text-success-ink border-success/20', ring: 'hover:border-success/40',
  },
} satisfies Record<Severity, unknown> as Record<Severity, {
  label: string; icon: typeof AlertOctagon; tone: 'danger' | 'warning' | 'info' | 'success'
  bar: string; chip: string; ring: string
}>

const MODULE_ROUTE: Record<string, string> = {
  Service: '/service', Employees: '/employees', Projects: '/projects',
  Customers: '/customers', Inventory: '/inventory', Feedback: '/feedback',
}

export function AlertCard({ alert }: { alert: AlertType }) {
  const meta = SEVERITY[alert.severity]
  const Icon = meta.icon
  const { demo } = useToast()
  const navigate = useNavigate()

  return (
    <article
      className={cn(
        'relative bg-surface ring-1 ring-black/[0.04] rounded-2xl overflow-hidden shadow-xs flex flex-col',
        'transition-[box-shadow,transform] duration-200 hover:shadow-lift hover:-translate-y-0.5',
      )}
    >
      <span className={cn('absolute left-0 inset-y-0 w-1', meta.bar)} aria-hidden />
      <div className="p-4 pl-5 flex-1">
        <div className="flex items-center justify-between gap-3">
          <span className={cn('inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider border rounded-full px-2 py-0.5', meta.chip)}>
            <Icon size={11} />
            {meta.label}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-ink-3 num">
            <Clock size={10} />
            {relTime(alert.time)}
          </span>
        </div>

        <h3 className="font-display text-[15px] font-semibold text-ink mt-3 leading-snug">{alert.title}</h3>
        <p className="text-[13px] text-ink-2 mt-1.5 leading-relaxed">{alert.description}</p>

        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <Badge tone="neutral">{alert.module}</Badge>
          <span className="text-2xs text-ink-3">
            {alert.metric}: <span className="font-semibold text-ink num">{alert.metricValue}</span>
          </span>
        </div>
      </div>

      <div className="px-4 pl-5 py-3 border-t border-line/70 flex items-center justify-between gap-3">
        <button
          onClick={() => demo(alert.action)}
          className="inline-flex items-center gap-1.5 text-2xs font-semibold text-forest-800 hover:gap-2 transition-all"
        >
          {alert.action}
          <ArrowRight size={12} />
        </button>
        <button
          onClick={() => navigate(MODULE_ROUTE[alert.module] ?? '/dashboard')}
          className="text-2xs text-ink-3 hover:text-ink transition-colors"
        >
          Open module
        </button>
      </div>
    </article>
  )
}

export function HealthAlertGrid({ limit }: { limit?: number }) {
  const list = limit ? alerts.slice(0, limit) : alerts
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {list.map((a) => (
        <AlertCard key={a.id} alert={a} />
      ))}
    </div>
  )
}

export const SEVERITY_META = SEVERITY
