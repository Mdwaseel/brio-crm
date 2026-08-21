import { useNavigate } from 'react-router-dom'
import {
  CalendarCheck, ArrowRight, UserPlus, Headphones, HardHat, RefreshCw, HeartPulse, Users,
  Download, Send, CheckCircle2, Clock,
} from 'lucide-react'
import {
  PageHeader, Card, CardHeader, Button, Badge, Avatar, useToast, SectionTitle, Timeline, Progress,
} from '@/components/ui'
import { AiBriefPanel } from '@/components/intelligence/AiBrief'
import { dailyBrief } from '@/data/analytics'
import { cn } from '@/lib/utils'

const ICONS = {
  'DB-1': UserPlus, 'DB-2': Headphones, 'DB-3': HardHat,
  'DB-4': RefreshCw, 'DB-5': HeartPulse, 'DB-6': Users,
} as Record<string, typeof UserPlus>

const TONES = {
  info: { chip: 'bg-info-soft text-info border-info/20', bar: 'bg-info' },
  danger: { chip: 'bg-danger-soft text-danger border-danger/20', bar: 'bg-danger' },
  warning: { chip: 'bg-warning-soft text-warning border-warning/20', bar: 'bg-warning' },
  success: { chip: 'bg-success-soft text-success border-success/20', bar: 'bg-success' },
}

const PRIORITY_ACTIONS = [
  { id: 'PA-1', title: 'Reassign 3 SLA-risk tickets', owner: 'Meera Nair', due: 'Today, 14:00', module: '/service', impact: 'Protects 94.2% SLA compliance' },
  { id: 'PA-2', title: 'Recovery review — Metro Tower', owner: 'Vikram Rao', due: 'Today, 16:00', module: '/projects', impact: '₹1.28Cr delivery value' },
  { id: 'PA-3', title: 'Raise PO for 3 critical SKUs', owner: 'Deepak Iyer', due: 'Today, 17:00', module: '/inventory', impact: 'Unblocks 2 open tickets' },
  { id: 'PA-4', title: 'Follow up — Prime Estates contract', owner: 'Priya Sharma', due: 'Tomorrow, 11:00', module: '/pipeline', impact: '₹42L opportunity' },
  { id: 'PA-5', title: '1:1 with two overloaded engineers', owner: 'Meera Nair', due: 'This week', module: '/employees', impact: 'Reduces attrition risk' },
]

export function DailyBrief() {
  const navigate = useNavigate()
  const { demo } = useToast()

  return (
    <>
      <PageHeader
        title="Daily Management Brief"
        subtitle="Friday, 22 August 2026 — what changed overnight and what needs a decision today."
        meta={
          <div className="flex items-center gap-2 flex-wrap">
            <Badge tone="brand" dot>Generated 09:00 IST</Badge>
            <Badge tone="neutral">Arjun Mehta · Super Admin</Badge>
          </div>
        }
        actions={
          <>
            <Button size="md" variant="secondary" icon={<Download size={14} />} onClick={() => demo('Exporting brief')}>Export</Button>
            <Button size="md" variant="secondary" icon={<Send size={14} />} onClick={() => demo('Brief shared with leadership')}>Share</Button>
            <Button size="md" variant="primary" icon={<ArrowRight size={14} />} onClick={() => navigate('/intelligence')}>Management intelligence</Button>
          </>
        }
      />

      {/* Today's signals */}
      <section>
        <SectionTitle title="Today" subtitle="Six signals worth your attention this morning" icon={<CalendarCheck size={18} />} />
        <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
          {dailyBrief.map((d) => {
            const Icon = ICONS[d.id] ?? UserPlus
            const tone = TONES[d.tone]
            return (
              <button
                key={d.id}
                onClick={() => navigate(d.module)}
                className="relative text-left bg-surface border border-line rounded-xl overflow-hidden hover:shadow-md hover:border-line-strong hover:-translate-y-px transition-all duration-200 group"
              >
                <span className={cn('absolute left-0 inset-y-0 w-[3px]', tone.bar)} aria-hidden />
                <div className="p-4 pl-5">
                  <span className={cn('h-8 w-8 rounded-lg inline-flex items-center justify-center border', tone.chip)}>
                    <Icon size={15} />
                  </span>
                  <p className="font-display text-[15px] font-semibold text-ink mt-3 leading-snug">{d.label}</p>
                  <p className="text-[13px] text-ink-2 mt-1.5 leading-relaxed">{d.detail}</p>
                  <span className="inline-flex items-center gap-1.5 text-2xs font-semibold text-brand-700 mt-3.5 group-hover:gap-2.5 transition-all">
                    Open module <ArrowRight size={12} />
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* AI brief */}
      <div className="mt-7">
        <AiBriefPanel />
      </div>

      {/* Priority actions + timeline */}
      <div className="grid gap-3.5 xl:grid-cols-3 mt-7">
        <Card className="xl:col-span-2">
          <CardHeader
            title="Priority Actions"
            subtitle="Assigned, owned and time-boxed — clear these to keep the health score stable"
            action={<Badge tone="warning">{PRIORITY_ACTIONS.length} open</Badge>}
          />
          <ul className="p-3">
            {PRIORITY_ACTIONS.map((a, i) => (
              <li key={a.id}>
                <div className="flex items-start gap-3.5 rounded-lg px-2.5 py-3 hover:bg-surface-muted transition-colors">
                  <span className="h-6 w-6 rounded-md bg-brand-50 text-brand-700 text-[11px] font-bold inline-flex items-center justify-center shrink-0 num mt-0.5">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-ink leading-snug">{a.title}</p>
                    <div className="flex items-center gap-3 flex-wrap mt-1.5">
                      <span className="inline-flex items-center gap-1.5 text-2xs text-ink-3">
                        <Avatar name={a.owner} size="xs" />{a.owner}
                      </span>
                      <span className="inline-flex items-center gap-1 text-2xs text-ink-3 num"><Clock size={10} />{a.due}</span>
                      <span className="text-2xs text-bronze-600 font-medium">{a.impact}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button size="xs" variant="ghost" onClick={() => navigate(a.module)}>Open</Button>
                    <Button size="xs" variant="secondary" icon={<CheckCircle2 size={11} />} onClick={() => demo('Action marked complete')}>Done</Button>
                  </div>
                </div>
                {i < PRIORITY_ACTIONS.length - 1 && <div className="border-b border-line mx-2.5" />}
              </li>
            ))}
          </ul>
          <div className="px-4 py-3 border-t border-line">
            <Button block size="sm" variant="secondary" onClick={() => demo('Opening full action queue')} iconRight={<ArrowRight size={13} />}>
              View all actions
            </Button>
          </div>
        </Card>

        <div className="space-y-3.5">
          <Card>
            <CardHeader title="Overnight Movement" subtitle="Since yesterday, 18:00 IST" />
            <div className="p-5 space-y-3">
              {[
                { l: 'Revenue booked', v: '₹3.2L', t: 'success' },
                { l: 'New leads', v: '18', t: 'info' },
                { l: 'Tickets created', v: '11', t: 'warning' },
                { l: 'Tickets resolved', v: '14', t: 'success' },
                { l: 'Quotations sent', v: '3', t: 'info' },
              ].map((m) => (
                <div key={m.l} className="flex items-center justify-between py-1.5 border-b border-line last:border-0">
                  <span className="text-[13px] text-ink-2">{m.l}</span>
                  <span className={cn('text-[13px] font-semibold num',
                    m.t === 'success' ? 'text-success' : m.t === 'warning' ? 'text-warning' : 'text-ink')}>
                    {m.v}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Health Movement" subtitle="Day-on-day change" />
            <div className="p-5 space-y-3.5">
              <Progress label="Business health" value={82} showValue tone="warning" size="sm" />
              <Progress label="Customer health" value={78} showValue tone="brand" size="sm" />
              <Progress label="Employee health" value={86} showValue tone="success" size="sm" />
              <Progress label="Delivery health" value={74} showValue tone="warning" size="sm" />
            </div>
          </Card>

          <Card>
            <CardHeader title="Escalation Log" subtitle="Last 24 hours" />
            <div className="p-5">
              <Timeline
                dense
                items={[
                  { id: 'x1', title: 'TKT-1048 escalated', description: 'Crescent Mall handrail fault — third occurrence.', time: '13:05', tone: 'danger' },
                  { id: 'x2', title: 'TKT-1059 escalated', description: 'Orion Works gate interlock — spare unavailable.', time: '09:30', tone: 'danger' },
                  { id: 'x3', title: 'PRJ-201 flagged At Risk', description: 'Shaft installation milestone overdue by 3 days.', time: '08:05', tone: 'warning' },
                ]}
              />
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
