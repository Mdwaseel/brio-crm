import { useMemo, useState } from 'react'
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip as RTooltip, ReferenceLine, Cell,
} from 'recharts'
import {
  Plus, Search, Users, Gauge, HeartHandshake, AlertTriangle, Mail, Phone, MapPin, CalendarDays,
  Target, Star, MessageSquareHeart, Activity, ClipboardList, Download,
} from 'lucide-react'
import type { Employee } from '@/types'
import {
  PageHeader, KpiCard, Card, CardHeader, Button, Input, Select, Badge, StatusBadge, Avatar,
  DataTable, CellPrimary, Progress, ScoreRing, Drawer, DrawerSection, DescList, Tabs, useToast,
  Alert, Timeline, MiniKpi,
} from '@/components/ui'
import type { Column } from '@/components/ui'
import { employees } from '@/data/people'
import { workloadBalance } from '@/data/analytics'
import { CHART, AXIS_PROPS, ChartTooltip } from '@/components/charts/primitives'
import { cn, fmtDate } from '@/lib/utils'

const DEPTS = ['Sales', 'Service', 'Projects', 'Operations', 'Finance']

export function Employees() {
  const { demo } = useToast()
  const [query, setQuery] = useState('')
  const [dept, setDept] = useState('all')
  const [status, setStatus] = useState('all')
  const [selected, setSelected] = useState<Employee | null>(null)
  const [tab, setTab] = useState('profile')

  const filtered = useMemo(
    () =>
      employees.filter((e) => {
        const q = query.trim().toLowerCase()
        return (
          (!q || (e.name + e.role + e.department).toLowerCase().includes(q)) &&
          (dept === 'all' || e.department === dept) &&
          (status === 'all' || e.status === status)
        )
      }),
    [query, dept, status],
  )

  const avgPerf = Math.round(employees.reduce((s, e) => s + e.performance, 0) / employees.length)
  const avgEng = Math.round(employees.reduce((s, e) => s + e.engagement, 0) / employees.length)
  const overloaded = employees.filter((e) => e.workload >= 90).length

  const columns: Column<Employee>[] = [
    { key: 'name', header: 'Employee', width: '22%', sortBy: (r) => r.name, render: (r) => (
      <CellPrimary icon={<Avatar name={r.name} size="md" />} title={r.name} sub={<span className="num">{r.id} · {r.location}</span>} />
    ) },
    { key: 'dept', header: 'Department', sortBy: (r) => r.department, render: (r) => <Badge tone="neutral">{r.department}</Badge> },
    { key: 'role', header: 'Role', hideBelow: 'lg', sortBy: (r) => r.role, render: (r) => <span className="text-[13px] text-ink-2">{r.role}</span> },
    { key: 'manager', header: 'Manager', hideBelow: 'xl', sortBy: (r) => r.manager, render: (r) => (
      <span className="inline-flex items-center gap-2"><Avatar name={r.manager} size="sm" /><span className="text-[13px] text-ink-2">{r.manager}</span></span>
    ) },
    { key: 'goal', header: 'Goal Progress', sortBy: (r) => r.goalProgress, render: (r) => (
      <div className="flex items-center gap-2 w-28">
        <div className="flex-1"><Progress value={r.goalProgress} size="xs" tone="auto" /></div>
        <span className="text-2xs font-semibold text-ink num shrink-0">{r.goalProgress}%</span>
      </div>
    ) },
    { key: 'perf', header: 'Performance', align: 'right', sortBy: (r) => r.performance, render: (r) => (
      <span className={cn('text-[13px] font-bold num', r.performance >= 85 ? 'text-success' : r.performance >= 75 ? 'text-brand-700' : 'text-warning')}>
        {r.performance}
      </span>
    ) },
    { key: 'health', header: 'Health', align: 'right', hideBelow: 'md', sortBy: (r) => r.health, render: (r) => (
      <span className={cn('text-[13px] font-bold num', r.health >= 80 ? 'text-success' : r.health >= 65 ? 'text-warning' : 'text-danger')}>
        {r.health}
      </span>
    ) },
    { key: 'workload', header: 'Workload', align: 'right', hideBelow: 'lg', sortBy: (r) => r.workload, render: (r) => (
      <Badge tone={r.workload >= 90 ? 'danger' : r.workload >= 80 ? 'warning' : 'success'} dot>{r.workload}%</Badge>
    ) },
    { key: 'status', header: 'Status', align: 'right', sortBy: (r) => r.status, render: (r) => <StatusBadge status={r.status} /> },
  ]

  const radarData = selected
    ? [
        { axis: 'Performance', value: selected.performance },
        { axis: 'Goals', value: selected.goalProgress },
        { axis: 'Engagement', value: selected.engagement },
        { axis: 'Health', value: selected.health },
        { axis: 'CSAT', value: Math.round(selected.csat * 20) },
        { axis: 'Capacity', value: 100 - selected.workload },
      ]
    : []

  return (
    <>
      <PageHeader
        title="Employees"
        subtitle="Performance, workload and wellbeing across every department."
        actions={
          <>
            <Button size="md" variant="secondary" icon={<Download size={14} />} onClick={() => demo('Exporting directory')}>Export</Button>
            <Button size="md" variant="primary" icon={<Plus size={14} />} onClick={() => demo('Add employee')}>Add Employee</Button>
          </>
        }
      />

      {overloaded > 0 && (
        <div className="mb-5">
          <Alert
            tone="warning"
            icon={<AlertTriangle size={16} />}
            title={`${overloaded} employees are above the 90% workload threshold`}
            action={<Button size="sm" variant="secondary" onClick={() => demo('Opening workload rebalancer')}>Rebalance</Button>}
          >
            Concentrated in the service function. Two of them also show engagement scores that have fallen more than 8 points this quarter.
          </Alert>
        </div>
      )}

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Employees" value="132" delta={4.8} icon={<Users size={15} />} hint="Across 5 departments" />
        <KpiCard label="Average Performance" value={`${avgPerf}`} delta={2.6} icon={<Gauge size={15} />} accent="success" hint="Rolling 90-day score" />
        <KpiCard label="Engagement" value={`${avgEng}%`} delta={4.2} icon={<HeartHandshake size={15} />} accent="success" hint="August pulse survey" />
        <KpiCard label="At-Risk Workload" value={String(overloaded)} delta={40} invertDelta icon={<AlertTriangle size={15} />} accent="danger" hint="Sustained above 90% capacity" />
      </div>

      <Card className="mt-6">
        <CardHeader title="Workload Distribution" subtitle="Capacity consumption by individual — 90% is the intervention threshold" />
        <div className="p-4 pt-5">
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={workloadBalance} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke={CHART.grid} vertical={false} />
              <XAxis dataKey="name" {...AXIS_PROPS} tickFormatter={(v: string) => v.split(' ')[0]} />
              <YAxis {...AXIS_PROPS} domain={[0, 100]} width={40} />
              <RTooltip content={<ChartTooltip formatter={(v) => `${v}% of capacity`} />} cursor={{ fill: 'rgba(18,53,42,.05)' }} />
              <ReferenceLine y={90} stroke={CHART.danger} strokeDasharray="4 3" />
              <Bar dataKey="workload" name="Workload" radius={[4, 4, 0, 0]} barSize={30}>
                {workloadBalance.map((w) => (
                  <Cell key={w.name} fill={w.workload >= 90 ? CHART.danger : w.workload >= 80 ? CHART.warning : CHART.brand} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="mt-3.5 overflow-hidden">
        <div className="p-3.5 border-b border-line flex flex-wrap items-center gap-2.5">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} icon={<Search size={15} />}
            placeholder="Search employees…" aria-label="Search employees" className="w-full sm:w-64" />
          <Select value={dept} onChange={(e) => setDept(e.target.value)} aria-label="Filter by department" className="w-auto min-w-[140px]">
            <option value="all">All departments</option>
            {DEPTS.map((d) => <option key={d}>{d}</option>)}
          </Select>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status" className="w-auto min-w-[130px]">
            <option value="all">All statuses</option>
            {['Active', 'On Leave', 'Notice'].map((s) => <option key={s}>{s}</option>)}
          </Select>
          <span className="ml-auto text-2xs text-ink-3 num">{filtered.length} employees</span>
        </div>

        <DataTable
          columns={columns}
          rows={filtered}
          onRowClick={(r) => { setSelected(r); setTab('profile') }}
          selectable
          pageSize={10}
          rowClassName={(r) => (r.workload >= 95 ? 'bg-danger-soft/30' : '')}
          emptyTitle="No employees match your filters"
          emptyDescription="Try a different department or clear the status filter."
          bulkActions={(rows, clear) => (
            <>
              <Button size="xs" variant="secondary" onClick={() => { demo(`Pulse survey queued for ${rows.length}`); clear() }}>Send pulse</Button>
              <Button size="xs" variant="secondary" onClick={() => { demo('Review scheduled'); clear() }}>Schedule review</Button>
            </>
          )}
        />
      </Card>

      {/* Employee 360 drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        width="lg"
        header={
          selected && (
            <div className="flex items-start gap-3.5 min-w-0">
              <Avatar name={selected.name} size="xl" />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-display text-lg font-semibold text-ink leading-tight">{selected.name}</h2>
                  <StatusBadge status={selected.status} />
                </div>
                <p className="text-[13px] text-ink-2 mt-0.5">{selected.role} · {selected.department}</p>
                <p className="text-2xs text-ink-3 mt-1 num">{selected.id} · reports to {selected.manager}</p>
              </div>
            </div>
          )
        }
        footer={
          <>
            <Button variant="primary" onClick={() => demo('Scheduling 1:1')}>Schedule 1:1</Button>
            <Button variant="secondary" onClick={() => demo('Requesting feedback')}>Request feedback</Button>
            <Button variant="ghost" className="ml-auto" onClick={() => demo('Rebalancing workload')}>Rebalance workload</Button>
          </>
        }
      >
        {selected && (
          <>
            <div className="px-5 pt-4">
              <Tabs
                value={tab}
                onChange={setTab}
                tabs={[
                  { id: 'profile', label: 'Profile' },
                  { id: 'goals', label: 'Goals', count: selected.goals.length },
                  { id: 'performance', label: 'Performance' },
                  { id: 'feedback', label: 'Feedback' },
                  { id: 'workload', label: 'Workload' },
                  { id: 'activity', label: 'Activity' },
                ]}
              />
            </div>

            {tab === 'profile' && (
              <>
                <DrawerSection title="Snapshot">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    <div className="flex flex-col items-center rounded-xl border border-line py-4">
                      <ScoreRing value={selected.performance} size={58} />
                      <p className="text-2xs text-ink-3 mt-2">Performance</p>
                    </div>
                    <div className="flex flex-col items-center rounded-xl border border-line py-4">
                      <ScoreRing value={selected.health} size={58} />
                      <p className="text-2xs text-ink-3 mt-2">Health</p>
                    </div>
                    <div className="flex flex-col items-center rounded-xl border border-line py-4">
                      <ScoreRing value={selected.engagement} size={58} />
                      <p className="text-2xs text-ink-3 mt-2">Engagement</p>
                    </div>
                    <div className="flex flex-col items-center rounded-xl border border-line py-4">
                      <ScoreRing value={selected.workload} size={58} tone={selected.workload >= 90 ? 'danger' : 'warning'} />
                      <p className="text-2xs text-ink-3 mt-2">Workload</p>
                    </div>
                  </div>
                </DrawerSection>

                <DrawerSection title="Profile">
                  <DescList
                    items={[
                      { label: 'Email', value: <span className="inline-flex items-center gap-1.5"><Mail size={13} className="text-ink-3" />{selected.email}</span> },
                      { label: 'Phone', value: <span className="inline-flex items-center gap-1.5"><Phone size={13} className="text-ink-3" />{selected.phone}</span> },
                      { label: 'Location', value: <span className="inline-flex items-center gap-1.5"><MapPin size={13} className="text-ink-3" />{selected.location}</span> },
                      { label: 'Joined', value: <span className="inline-flex items-center gap-1.5 num"><CalendarDays size={13} className="text-ink-3" />{fmtDate(selected.joined)}</span> },
                      { label: 'Department', value: selected.department },
                      { label: 'Manager', value: selected.manager },
                    ]}
                  />
                </DrawerSection>
              </>
            )}

            {tab === 'goals' && (
              <DrawerSection title="Goals & objectives">
                <ul className="space-y-3">
                  {selected.goals.map((g) => (
                    <li key={g.id} className="rounded-xl border border-line p-3.5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <Target size={15} className="text-brand-600 mt-0.5 shrink-0" />
                          <p className="text-[13px] font-medium text-ink leading-snug">{g.title}</p>
                        </div>
                        <span className="text-2xs text-ink-3 num shrink-0">Due {fmtDate(g.due)}</span>
                      </div>
                      <div className="mt-3"><Progress value={g.progress} showValue tone="auto" size="sm" /></div>
                    </li>
                  ))}
                </ul>
                <div className="mt-3.5">
                  <MiniKpi label="Overall goal attainment" value={`${selected.goalProgress}%`}
                    tone={selected.goalProgress >= 75 ? 'success' : 'warning'} sub="Weighted across active objectives" />
                </div>
              </DrawerSection>
            )}

            {tab === 'performance' && (
              <DrawerSection title="Performance profile">
                <div className="rounded-xl border border-line p-3">
                  <ResponsiveContainer width="100%" height={260}>
                    <RadarChart data={radarData} outerRadius="72%">
                      <PolarGrid stroke={CHART.grid} />
                      <PolarAngleAxis dataKey="axis" tick={{ fill: '#86948b', fontSize: 11 }} />
                      <Radar name={selected.name} dataKey="value" stroke={CHART.brand} fill={CHART.brand} fillOpacity={0.18} strokeWidth={2} />
                      <RTooltip content={<ChartTooltip />} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3.5 grid grid-cols-2 gap-3.5">
                  <MiniKpi label="Customer CSAT" value={`${selected.csat} / 5`} tone="success" icon={<Star size={13} />} />
                  <MiniKpi label="Open tasks" value={String(selected.openTasks)} tone={selected.openTasks > 24 ? 'danger' : 'neutral'} icon={<ClipboardList size={13} />} />
                </div>
              </DrawerSection>
            )}

            {tab === 'feedback' && (
              <>
                <DrawerSection title="360 feedback summary">
                  <div className="space-y-3">
                    {[
                      { label: 'Manager rating', v: selected.performance },
                      { label: 'Peer rating', v: Math.max(60, selected.performance - 4) },
                      { label: 'Customer rating', v: Math.round(selected.csat * 20) },
                      { label: 'Self assessment', v: Math.min(100, selected.performance + 2) },
                    ].map((f) => <Progress key={f.label} label={f.label} value={f.v} showValue tone="auto" size="sm" />)}
                  </div>
                </DrawerSection>
                <DrawerSection title="Recent comments">
                  <ul className="space-y-2.5">
                    {[
                      { t: 'Consistently strong technical judgement under pressure. Handles escalations calmly.', s: 'Manager', tone: 'success' },
                      { t: 'Very responsive when the team needs support on site, even outside working hours.', s: 'Peer', tone: 'success' },
                      { t: 'Would benefit from delegating routine follow-ups to free up capacity.', s: 'Manager', tone: 'warning' },
                    ].map((c) => (
                      <li key={c.t} className="rounded-lg border border-line px-3.5 py-3">
                        <div className="flex items-start gap-2.5">
                          <MessageSquareHeart size={14} className={cn('mt-0.5 shrink-0', c.tone === 'success' ? 'text-success' : 'text-warning')} />
                          <div>
                            <p className="text-[13px] text-ink-2 leading-relaxed">{c.t}</p>
                            <p className="text-2xs text-ink-3 mt-1.5">{c.s} · anonymised</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </DrawerSection>
              </>
            )}

            {tab === 'workload' && (
              <DrawerSection title="Workload analysis">
                {selected.workload >= 90 && (
                  <div className="mb-4">
                    <Alert tone="danger" icon={<AlertTriangle size={16} />} title="Sustained above capacity threshold">
                      {selected.name.split(' ')[0]} has been above 90% capacity for 6 consecutive weeks. Redistribute open work before the next review cycle.
                    </Alert>
                  </div>
                )}
                <div className="space-y-3">
                  <Progress label="Current capacity consumption" value={selected.workload} showValue
                    tone={selected.workload >= 90 ? 'danger' : selected.workload >= 80 ? 'warning' : 'success'} />
                  <Progress label="Team average" value={78} showValue tone="brand" size="sm" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3.5">
                  <MiniKpi label="Open tasks" value={String(selected.openTasks)} tone={selected.openTasks > 24 ? 'danger' : 'neutral'} />
                  <MiniKpi label="Overdue" value={selected.workload >= 90 ? '6' : '1'} tone={selected.workload >= 90 ? 'danger' : 'neutral'} />
                  <MiniKpi label="This week" value={`${Math.round(selected.workload / 2)}h`} sub="Logged effort" />
                </div>
              </DrawerSection>
            )}

            {tab === 'activity' && (
              <DrawerSection title="Recent activity">
                <Timeline
                  items={[
                    { id: 'e1', title: 'Closed service ticket TKT-1044', description: 'Door operator belt replacement completed with customer sign-off.', time: '2d ago', tone: 'success' },
                    { id: 'e2', title: 'Goal progress updated', description: 'First-time fix rate objective moved from 68% to 72%.', time: '4d ago', tone: 'brand' },
                    { id: 'e3', title: 'Pulse survey submitted', description: 'August workload and support pulse response recorded.', time: '1w ago', tone: 'info' },
                    { id: 'e4', title: 'Assigned to project', description: 'Added to the Metro Tower Installation delivery team.', time: '2w ago', tone: 'bronze' },
                    { id: 'e5', title: 'Safety refresher completed', description: 'Annual certification renewed and logged against the compliance register.', time: '3w ago', tone: 'success' },
                  ]}
                />
                <div className="mt-4 flex items-center gap-2 text-2xs text-ink-3">
                  <Activity size={13} />
                  Activity is aggregated across CRM, service, projects and people modules.
                </div>
              </DrawerSection>
            )}
          </>
        )}
      </Drawer>
    </>
  )
}
