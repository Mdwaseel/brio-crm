import { useMemo, useState } from 'react'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, BarChart, Bar,
} from 'recharts'
import {
  Plus, Search, Headphones, ShieldCheck, Timer, Star, AlertOctagon, MessageSquare, Send,
  MapPin, Wrench, ArrowUpRight, CheckCircle2,
} from 'lucide-react'
import type { Ticket } from '@/types'
import {
  PageHeader, KpiCard, Card, CardHeader, ChartCard, Button, Input, Select, Badge, StatusBadge,
  Avatar, DataTable, CellPrimary, Drawer, DrawerSection, DescList, Timeline, Textarea, useToast, Alert, Progress,
} from '@/components/ui'
import type { Column } from '@/components/ui'
import { tickets } from '@/data/operations'
import { ticketSeries, slaSeries } from '@/data/analytics'
import { CHART, AXIS_PROPS, ChartTooltip, Legend } from '@/components/charts/primitives'
import { cn, relTime, fmtDateTime } from '@/lib/utils'

const ENGINEERS = ['Anita Roy', 'Kiran Das', 'Sahil Khan', 'Vikram Rao', 'Rahul Verma']

function slaState(t: Ticket) {
  if (t.status === 'Resolved') return { label: 'Met', tone: 'success' as const, pct: 100 }
  const pct = Math.max(0, Math.min(100, (t.slaHoursLeft / t.slaTotal) * 100))
  if (t.slaHoursLeft < 2) return { label: `${t.slaHoursLeft}h left`, tone: 'danger' as const, pct }
  if (t.slaHoursLeft < 6) return { label: `${t.slaHoursLeft}h left`, tone: 'warning' as const, pct }
  return { label: `${t.slaHoursLeft}h left`, tone: 'success' as const, pct }
}

export function Service() {
  const { demo } = useToast()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [priority, setPriority] = useState('all')
  const [engineer, setEngineer] = useState('all')
  const [selected, setSelected] = useState<Ticket | null>(null)
  const [comment, setComment] = useState('')

  const filtered = useMemo(
    () =>
      tickets.filter((t) => {
        const q = query.trim().toLowerCase()
        return (
          (!q || (t.id + t.customer + t.subject).toLowerCase().includes(q)) &&
          (status === 'all' || t.status === status) &&
          (priority === 'all' || t.priority === priority) &&
          (engineer === 'all' || t.engineer === engineer)
        )
      }),
    [query, status, priority, engineer],
  )

  const openCount = tickets.filter((t) => t.status !== 'Resolved').length
  const escalated = tickets.filter((t) => t.status === 'Escalated').length
  const atRisk = tickets.filter((t) => t.status !== 'Resolved' && t.slaHoursLeft < 2).length

  const columns: Column<Ticket>[] = [
    { key: 'id', header: 'Ticket', width: '26%', sortBy: (r) => r.id, render: (r) => (
      <CellPrimary
        icon={
          <span className={cn('h-8 w-8 rounded-lg inline-flex items-center justify-center shrink-0',
            r.priority === 'Critical' ? 'bg-danger-soft text-danger' : r.priority === 'High' ? 'bg-warning-soft text-warning' : 'bg-surface-sunken text-ink-3')}>
            <Wrench size={15} />
          </span>
        }
        title={r.subject}
        sub={<span className="num">{r.id} · {r.category}</span>}
      />
    ) },
    { key: 'customer', header: 'Customer', sortBy: (r) => r.customer, render: (r) => (
      <div>
        <p className="text-[13px] font-medium text-ink">{r.customer}</p>
        <p className="text-2xs text-ink-3 truncate max-w-[180px]">{r.site}</p>
      </div>
    ) },
    { key: 'priority', header: 'Priority', sortBy: (r) => ['Low', 'Medium', 'High', 'Critical'].indexOf(r.priority), render: (r) => <StatusBadge status={r.priority} /> },
    { key: 'engineer', header: 'Engineer', hideBelow: 'md', sortBy: (r) => r.engineer, render: (r) => (
      <span className="inline-flex items-center gap-2"><Avatar name={r.engineer} size="sm" /><span className="text-[13px] text-ink-2">{r.engineer}</span></span>
    ) },
    { key: 'sla', header: 'SLA', hideBelow: 'lg', sortBy: (r) => r.slaHoursLeft, render: (r) => {
      const s = slaState(r)
      return (
        <div className="flex items-center gap-2 w-28">
          <div className="flex-1">
            <Progress value={s.pct} size="xs" tone={s.tone === 'danger' ? 'danger' : s.tone === 'warning' ? 'warning' : 'success'} />
          </div>
          <span className={cn('text-2xs font-semibold num shrink-0',
            s.tone === 'danger' ? 'text-danger' : s.tone === 'warning' ? 'text-warning' : 'text-success')}>
            {s.label}
          </span>
        </div>
      )
    } },
    { key: 'status', header: 'Status', sortBy: (r) => r.status, render: (r) => <StatusBadge status={r.status} /> },
    { key: 'created', header: 'Created', align: 'right', hideBelow: 'xl', sortBy: (r) => r.created, render: (r) => <span className="num text-2xs text-ink-3">{relTime(r.created)}</span> },
  ]

  return (
    <>
      <PageHeader
        title="Service & Tickets"
        subtitle="Field service operations, SLA performance and escalation control."
        actions={
          <>
            <Button size="md" variant="secondary" icon={<ArrowUpRight size={14} />} onClick={() => demo('Opening escalation queue')}>
              Escalations ({escalated})
            </Button>
            <Button size="md" variant="primary" icon={<Plus size={14} />} onClick={() => demo('New ticket')}>New Ticket</Button>
          </>
        }
      />

      {atRisk > 0 && (
        <div className="mb-5">
          <Alert
            tone="danger"
            icon={<AlertOctagon size={16} />}
            title={`${atRisk} tickets are within 2 hours of SLA breach`}
            action={<Button size="sm" variant="danger" onClick={() => demo('Reassigning at-risk tickets')}>Reassign now</Button>}
          >
            Escalated tickets at Crescent Mall and Orion Works have no confirmed engineer on site. Spare availability is the blocking factor on both.
          </Alert>
        </div>
      )}

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard label="Open Tickets" value={String(openCount)} delta={17.2} invertDelta icon={<Headphones size={15} />} accent="warning" hint="Backlog up 17% this month" />
        <KpiCard label="SLA Compliance" value="94.2%" delta={-1.6} icon={<ShieldCheck size={15} />} accent="warning" hint="Target is 96%" />
        <KpiCard label="Avg Resolution" value="6.9h" delta={11.0} invertDelta icon={<Timer size={15} />} accent="danger" hint="Up from 6.2h last month" />
        <KpiCard label="CSAT" value="4.3" delta={6.4} icon={<Star size={15} />} accent="success" hint="Based on 218 responses" />
        <KpiCard label="Escalations" value={String(escalated)} delta={33.0} invertDelta icon={<AlertOctagon size={15} />} accent="danger" hint="Both are safety-category tickets" />
      </div>

      <div className="grid gap-3.5 xl:grid-cols-3 mt-6">
        <ChartCard
          title="Ticket Resolution"
          subtitle="Created, resolved and backlog by week"
          className="xl:col-span-2"
          height={250}
          action={<Legend items={[
            { label: 'Created', color: CHART.brandLight },
            { label: 'Resolved', color: CHART.success },
            { label: 'Backlog', color: CHART.danger },
          ]} />}
        >
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={ticketSeries} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke={CHART.grid} vertical={false} />
              <XAxis dataKey="week" {...AXIS_PROPS} />
              <YAxis {...AXIS_PROPS} width={40} />
              <RTooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="created" name="Created" stroke={CHART.brandLight} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="resolved" name="Resolved" stroke={CHART.success} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="backlog" name="Backlog" stroke={CHART.danger} strokeWidth={2} strokeDasharray="4 3" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="SLA Compliance" subtitle="Monthly compliance against 96% target" height={250}>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={slaSeries} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke={CHART.grid} vertical={false} />
              <XAxis dataKey="month" {...AXIS_PROPS} />
              <YAxis {...AXIS_PROPS} domain={[90, 100]} width={40} />
              <RTooltip content={<ChartTooltip formatter={(v) => `${v}%`} />} cursor={{ fill: 'rgba(18,53,42,.05)' }} />
              <Bar dataKey="compliance" name="SLA compliance" radius={[4, 4, 0, 0]} barSize={26} fill={CHART.brand} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <Card className="mt-6 overflow-hidden">
        <CardHeader title="Ticket Queue" subtitle={`${filtered.length} tickets in the current view`} dense />
        <div className="p-3.5 border-b border-line flex flex-wrap items-center gap-2.5">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} icon={<Search size={15} />}
            placeholder="Search tickets…" aria-label="Search tickets" className="w-full sm:w-64" />
          <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status" className="w-auto min-w-[130px]">
            <option value="all">All statuses</option>
            {['Open', 'In Progress', 'Waiting', 'Resolved', 'Escalated'].map((s) => <option key={s}>{s}</option>)}
          </Select>
          <Select value={priority} onChange={(e) => setPriority(e.target.value)} aria-label="Filter by priority" className="w-auto min-w-[120px]">
            <option value="all">All priorities</option>
            {['Low', 'Medium', 'High', 'Critical'].map((s) => <option key={s}>{s}</option>)}
          </Select>
          <Select value={engineer} onChange={(e) => setEngineer(e.target.value)} aria-label="Filter by engineer" className="w-auto min-w-[140px]">
            <option value="all">All engineers</option>
            {ENGINEERS.map((s) => <option key={s}>{s}</option>)}
          </Select>
        </div>

        <DataTable
          columns={columns}
          rows={filtered}
          onRowClick={setSelected}
          selectable
          pageSize={8}
          rowClassName={(r) => (r.status !== 'Resolved' && r.slaHoursLeft < 2 ? 'bg-danger-soft/40' : '')}
          emptyTitle="No tickets match your filters"
          emptyDescription="Clear the priority or engineer filter to see the wider queue."
          bulkActions={(rows, clear) => (
            <>
              <Button size="xs" variant="secondary" onClick={() => { demo(`Reassigning ${rows.length} tickets`); clear() }}>Reassign</Button>
              <Button size="xs" variant="secondary" onClick={() => { demo('Priority updated'); clear() }}>Change priority</Button>
              <Button size="xs" variant="danger" onClick={() => { demo('Escalated to service head'); clear() }}>Escalate</Button>
            </>
          )}
        />
      </Card>

      {/* Ticket drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        width="lg"
        title={selected?.subject}
        badge={selected && <StatusBadge status={selected.status} />}
        subtitle={selected && <span className="num">{selected.id} · {selected.customer}</span>}
        footer={
          <>
            <Button variant="primary" icon={<CheckCircle2 size={14} />} onClick={() => demo('Ticket resolved')}>Mark resolved</Button>
            <Button variant="secondary" onClick={() => demo('Reassigning ticket')}>Reassign</Button>
            <Button variant="danger" icon={<ArrowUpRight size={14} />} onClick={() => demo('Escalated')} className="ml-auto">Escalate</Button>
          </>
        }
      >
        {selected && (
          <>
            {selected.status !== 'Resolved' && selected.slaHoursLeft < 3 && (
              <div className="px-5 pt-5">
                <Alert tone="danger" icon={<AlertOctagon size={16} />} title={`SLA breach in ${selected.slaHoursLeft} hours`}>
                  This ticket is inside the escalation window. Confirm engineer attendance or reassign immediately.
                </Alert>
              </div>
            )}

            <DrawerSection title="SLA timer">
              <div className="flex items-center gap-5">
                <div className="flex-1">
                  <Progress
                    value={slaState(selected).pct}
                    tone={slaState(selected).tone === 'danger' ? 'danger' : slaState(selected).tone === 'warning' ? 'warning' : 'success'}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-2xs text-ink-3 num">Elapsed {(selected.slaTotal - selected.slaHoursLeft).toFixed(1)}h</span>
                    <span className="text-2xs text-ink-3 num">Total {selected.slaTotal}h</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className={cn('font-display text-[26px] font-bold num leading-none',
                    selected.slaHoursLeft < 2 ? 'text-danger' : selected.slaHoursLeft < 6 ? 'text-warning' : 'text-success')}>
                    {selected.status === 'Resolved' ? '✓' : `${selected.slaHoursLeft}h`}
                  </p>
                  <p className="text-2xs text-ink-3 mt-1.5">remaining</p>
                </div>
              </div>
            </DrawerSection>

            <DrawerSection title="Ticket information">
              <DescList
                items={[
                  { label: 'Customer', value: selected.customer },
                  { label: 'Priority', value: <StatusBadge status={selected.priority} /> },
                  { label: 'Engineer', value: <span className="inline-flex items-center gap-1.5"><Avatar name={selected.engineer} size="xs" />{selected.engineer}</span> },
                  { label: 'Category', value: <Badge tone="neutral">{selected.category}</Badge> },
                  { label: 'Created', value: <span className="num">{fmtDateTime(selected.created)}</span> },
                  { label: 'Site', value: <span className="inline-flex items-center gap-1.5"><MapPin size={13} className="text-ink-3" />{selected.site}</span> },
                ]}
              />
            </DrawerSection>

            <DrawerSection title="Issue description">
              <p className="text-[13px] text-ink-2 leading-relaxed">{selected.description}</p>
            </DrawerSection>

            <DrawerSection title={`Comments (${selected.comments.length})`}>
              {selected.comments.length === 0 ? (
                <p className="text-[13px] text-ink-3">No comments logged on this ticket yet.</p>
              ) : (
                <ul className="space-y-3">
                  {selected.comments.map((c) => (
                    <li key={c.id} className="flex gap-3">
                      <Avatar name={c.author} size="md" />
                      <div className="min-w-0 flex-1 rounded-lg border border-line bg-surface-muted px-3.5 py-2.5">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[13px] font-semibold text-ink">{c.author}</span>
                          <span className="text-2xs text-ink-3 num">{relTime(c.time)}</span>
                        </div>
                        <p className="text-[13px] text-ink-2 mt-1 leading-relaxed">{c.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-3.5 flex gap-2.5">
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add an update for the customer or the field team…"
                  aria-label="New comment"
                  className="min-h-[64px]"
                />
                <Button variant="primary" size="md" icon={<Send size={14} />} onClick={() => { setComment(''); demo('Comment posted') }}>
                  Post
                </Button>
              </div>
            </DrawerSection>

            <DrawerSection title="Activity timeline">
              <Timeline
                dense
                items={[
                  { id: 's1', title: `Status: ${selected.status}`, description: 'Latest status change recorded on this ticket.', time: relTime(selected.created), tone: selected.status === 'Escalated' ? 'danger' : 'brand' },
                  { id: 's2', title: `Assigned to ${selected.engineer}`, description: 'Routed by the SLA escalation ladder workflow.', time: '5h ago', tone: 'info', actor: 'System · WF-02' },
                  { id: 's3', title: 'Ticket created', description: `Logged under ${selected.category} for ${selected.site}.`, time: fmtDateTime(selected.created), tone: 'neutral' },
                ]}
              />
            </DrawerSection>

            <DrawerSection title="Resolution">
              {selected.status === 'Resolved' ? (
                <Alert tone="success" icon={<CheckCircle2 size={16} />} title="Resolved and signed off">
                  Work completed and customer sign-off captured on site. No repeat visit required.
                </Alert>
              ) : (
                <div className="rounded-lg border border-dashed border-line px-4 py-6 text-center">
                  <MessageSquare size={18} className="text-ink-3 mx-auto" />
                  <p className="text-[13px] text-ink-2 mt-2">Resolution notes will be captured when this ticket is closed.</p>
                </div>
              )}
            </DrawerSection>
          </>
        )}
      </Drawer>
    </>
  )
}
