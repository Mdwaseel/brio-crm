import { useMemo, useState } from 'react'
import {
  Plus, Search, HardHat, TrendingUp, AlertTriangle, IndianRupee, LayoutGrid, Table2, Columns3,
  GanttChartSquare, CalendarDays, Users2, Flag, CircleDot, CheckCircle2, ArrowRight, FileText,
} from 'lucide-react'
import type { Project } from '@/types'
import {
  PageHeader, KpiCard, Card, Button, Input, Select, Badge, StatusBadge, Avatar,
  AvatarGroup, DataTable, CellPrimary, Segmented, Progress, Drawer, DrawerSection, DescList,
  Tabs, EmptyState, useToast, Alert,
} from '@/components/ui'
import type { Column } from '@/components/ui'
import { projects } from '@/data/operations'
import { cn, inr, fmtDate, fmtDateShort } from '@/lib/utils'

const VIEWS = [
  { id: 'cards', label: 'Cards', icon: <LayoutGrid size={13} /> },
  { id: 'table', label: 'Table', icon: <Table2 size={13} /> },
  { id: 'kanban', label: 'Kanban', icon: <Columns3 size={13} /> },
  { id: 'timeline', label: 'Timeline', icon: <GanttChartSquare size={13} /> },
]

const KANBAN_STAGES = ['On Track', 'At Risk', 'Delayed', 'Completed'] as const

function riskTone(risk: Project['risk']) {
  return risk === 'High' ? 'danger' : risk === 'Medium' ? 'warning' : 'success'
}

export function Projects() {
  const { demo } = useToast()
  const [view, setView] = useState('cards')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [manager, setManager] = useState('all')
  const [selected, setSelected] = useState<Project | null>(null)
  const [tab, setTab] = useState('overview')

  const managers = Array.from(new Set(projects.map((p) => p.manager)))

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const q = query.trim().toLowerCase()
        return (
          (!q || (p.name + p.customer + p.id).toLowerCase().includes(q)) &&
          (status === 'all' || p.status === status) &&
          (manager === 'all' || p.manager === manager)
        )
      }),
    [query, status, manager],
  )

  const budget = projects.reduce((s, p) => s + p.budget, 0)
  const atRisk = projects.filter((p) => p.status === 'At Risk' || p.status === 'Delayed').length
  const avgProgress = Math.round(projects.reduce((s, p) => s + p.progress, 0) / projects.length)

  const columns: Column<Project>[] = [
    { key: 'name', header: 'Project', width: '24%', sortBy: (r) => r.name, render: (r) => (
      <CellPrimary
        icon={<span className="h-8 w-8 rounded-lg bg-brand-50 text-brand-700 inline-flex items-center justify-center shrink-0"><HardHat size={15} /></span>}
        title={r.name}
        sub={<span className="num">{r.id} · {r.phase}</span>}
      />
    ) },
    { key: 'customer', header: 'Customer', sortBy: (r) => r.customer, render: (r) => <span className="text-[13px] font-medium text-ink">{r.customer}</span> },
    { key: 'manager', header: 'Manager', hideBelow: 'md', sortBy: (r) => r.manager, render: (r) => (
      <span className="inline-flex items-center gap-2"><Avatar name={r.manager} size="sm" /><span className="text-[13px] text-ink-2">{r.manager}</span></span>
    ) },
    { key: 'progress', header: 'Progress', sortBy: (r) => r.progress, render: (r) => (
      <div className="flex items-center gap-2 w-32">
        <div className="flex-1"><Progress value={r.progress} size="xs" tone="auto" /></div>
        <span className="text-2xs font-semibold text-ink num shrink-0">{r.progress}%</span>
      </div>
    ) },
    { key: 'budget', header: 'Budget', align: 'right', hideBelow: 'lg', sortBy: (r) => r.budget, render: (r) => (
      <div className="text-right">
        <p className="text-[13px] font-semibold text-ink num">{inr(r.budget)}</p>
        <p className="text-2xs text-ink-3 num">{Math.round((r.spent / r.budget) * 100)}% spent</p>
      </div>
    ) },
    { key: 'end', header: 'End Date', align: 'right', hideBelow: 'xl', sortBy: (r) => r.end, render: (r) => <span className="num text-2xs text-ink-2">{fmtDate(r.end)}</span> },
    { key: 'status', header: 'Status', sortBy: (r) => r.status, render: (r) => <StatusBadge status={r.status} /> },
    { key: 'risk', header: 'Risk', align: 'right', sortBy: (r) => r.risk, render: (r) => <Badge tone={riskTone(r.risk)} dot>{r.risk}</Badge> },
  ]

  const timelineStart = new Date('2026-01-01').getTime()
  const timelineEnd = new Date('2027-06-30').getTime()
  const span = timelineEnd - timelineStart
  const pos = (d: string) => ((new Date(d).getTime() - timelineStart) / span) * 100

  return (
    <>
      <PageHeader
        title="Projects & Installations"
        subtitle="Delivery portfolio, milestone health and budget consumption in one view."
        actions={
          <>
            <Button size="md" variant="secondary" icon={<CalendarDays size={14} />} onClick={() => demo('Opening delivery calendar')}>Calendar</Button>
            <Button size="md" variant="primary" icon={<Plus size={14} />} onClick={() => demo('New project')}>New Project</Button>
          </>
        }
      />

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Active Projects" value={String(projects.filter((p) => p.status !== 'Completed').length)} delta={7.1} icon={<HardHat size={15} />} hint="42 across all regions" />
        <KpiCard label="Portfolio Budget" value={inr(budget)} delta={12.4} icon={<IndianRupee size={15} />} hint="Committed delivery value" />
        <KpiCard label="Average Progress" value={`${avgProgress}%`} delta={4.6} icon={<TrendingUp size={15} />} accent="success" hint="Weighted by project value" />
        <KpiCard label="At Risk / Delayed" value={String(atRisk)} delta={33.3} invertDelta icon={<AlertTriangle size={15} />} accent="danger" hint="Both blocked on supplier commitments" />
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="p-3.5 border-b border-line flex flex-wrap items-center gap-2.5">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} icon={<Search size={15} />}
            placeholder="Search projects…" aria-label="Search projects" className="w-full sm:w-64" />
          <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status" className="w-auto min-w-[130px]">
            <option value="all">All statuses</option>
            {KANBAN_STAGES.map((s) => <option key={s}>{s}</option>)}
          </Select>
          <Select value={manager} onChange={(e) => setManager(e.target.value)} aria-label="Filter by manager" className="w-auto min-w-[150px]">
            <option value="all">All managers</option>
            {managers.map((m) => <option key={m}>{m}</option>)}
          </Select>
          <div className="ml-auto flex items-center gap-2.5">
            <span className="text-2xs text-ink-3 num">{filtered.length} projects</span>
            <Segmented value={view} onChange={setView} options={VIEWS} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={<HardHat size={20} />}
            title="No projects match your filters"
            description="Create your first project to start tracking delivery, or widen the filters above."
            action={<Button variant="secondary" size="sm" onClick={() => { setQuery(''); setStatus('all'); setManager('all') }}>Clear filters</Button>}
          />
        ) : view === 'table' ? (
          <DataTable columns={columns} rows={filtered} onRowClick={(r) => { setSelected(r); setTab('overview') }} selectable pageSize={8} />
        ) : view === 'cards' ? (
          <div className="p-4 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => { setSelected(p); setTab('overview') }}
                className="text-left bg-surface border border-line rounded-xl p-4 hover:shadow-md hover:border-line-strong hover:-translate-y-px transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display text-[15px] font-semibold text-ink leading-snug">{p.name}</p>
                    <p className="text-2xs text-ink-3 mt-1">{p.customer} · <span className="num">{p.id}</span></p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>

                <div className="mt-4">
                  <Progress label={p.phase} value={p.progress} showValue tone="auto" />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-2xs text-ink-3">Budget</p>
                    <p className="text-[13px] font-semibold text-ink num mt-0.5">{inr(p.budget)}</p>
                    <p className="text-[10px] text-ink-3 num">{Math.round((p.spent / p.budget) * 100)}% consumed</p>
                  </div>
                  <div>
                    <p className="text-2xs text-ink-3">Timeline</p>
                    <p className="text-[13px] font-semibold text-ink num mt-0.5">{fmtDateShort(p.end)}</p>
                    <p className="text-[10px] text-ink-3">from {fmtDateShort(p.start)}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-line flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 min-w-0">
                    <Avatar name={p.manager} size="sm" />
                    <span className="text-2xs text-ink-2 truncate">{p.manager}</span>
                  </span>
                  <span className="flex items-center gap-2 shrink-0">
                    <AvatarGroup names={p.team} max={3} size="xs" />
                    <Badge tone={riskTone(p.risk)} size="xs">{p.risk} risk</Badge>
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : view === 'kanban' ? (
          <div className="p-4 overflow-x-auto scroll-thin">
            <div className="flex gap-3.5 min-w-max">
              {KANBAN_STAGES.map((stage) => {
                const items = filtered.filter((p) => p.status === stage)
                return (
                  <section key={stage} className="w-[280px] shrink-0 rounded-xl bg-surface-sunken/70 border border-line">
                    <div className="px-3.5 py-2.5 border-b border-line flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-ink">{stage}</span>
                      <span className="text-2xs text-ink-3 num">{items.length}</span>
                    </div>
                    <div className="p-2.5 space-y-2.5 min-h-[140px]">
                      {items.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => { setSelected(p); setTab('overview') }}
                          className="w-full text-left bg-surface border border-line rounded-xl p-3.5 hover:shadow-md hover:-translate-y-px transition-all duration-150"
                        >
                          <p className="text-[13px] font-semibold text-ink leading-snug">{p.name}</p>
                          <p className="text-2xs text-ink-3 mt-0.5">{p.customer}</p>
                          <div className="mt-2.5"><Progress value={p.progress} size="xs" tone="auto" /></div>
                          <div className="mt-2.5 flex items-center justify-between">
                            <Avatar name={p.manager} size="xs" />
                            <span className="text-2xs text-ink-3 num">{fmtDateShort(p.end)}</span>
                          </div>
                        </button>
                      ))}
                      {items.length === 0 && (
                        <div className="border border-dashed border-line rounded-xl py-6 text-center">
                          <p className="text-2xs text-ink-3">Nothing here</p>
                        </div>
                      )}
                    </div>
                  </section>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="p-5">
            <div className="flex items-center justify-between text-2xs text-ink-3 mb-3 px-1">
              {['Jan 26', 'Apr 26', 'Jul 26', 'Oct 26', 'Jan 27', 'Apr 27'].map((m) => <span key={m}>{m}</span>)}
            </div>
            <div className="space-y-2.5">
              {filtered.map((p) => {
                const left = pos(p.start)
                const width = Math.max(4, pos(p.end) - left)
                const bar =
                  p.status === 'Delayed' ? 'bg-danger' : p.status === 'At Risk' ? 'bg-warning'
                    : p.status === 'Completed' ? 'bg-success' : 'bg-brand-600'
                return (
                  <button
                    key={p.id}
                    onClick={() => { setSelected(p); setTab('overview') }}
                    className="w-full grid grid-cols-[180px_1fr] gap-4 items-center group"
                  >
                    <span className="text-left min-w-0">
                      <span className="block text-[13px] font-medium text-ink truncate group-hover:text-brand-700 transition-colors">{p.name}</span>
                      <span className="block text-2xs text-ink-3 truncate">{p.customer}</span>
                    </span>
                    <span className="relative h-8 rounded-lg bg-surface-sunken overflow-hidden">
                      <span
                        className={cn('absolute inset-y-1 rounded-md flex items-center px-2', bar)}
                        style={{ left: `${left}%`, width: `${width}%` }}
                      >
                        <span className="text-[10px] font-semibold text-white num truncate">{p.progress}%</span>
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="mt-5 pt-4 border-t border-line flex items-center gap-4 flex-wrap">
              {[
                { l: 'On Track', c: 'bg-brand-600' }, { l: 'At Risk', c: 'bg-warning' },
                { l: 'Delayed', c: 'bg-danger' }, { l: 'Completed', c: 'bg-success' },
              ].map((i) => (
                <span key={i.l} className="inline-flex items-center gap-1.5 text-2xs text-ink-2">
                  <span className={cn('h-2 w-2 rounded-sm', i.c)} />{i.l}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Project drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        width="lg"
        title={selected?.name}
        badge={selected && <StatusBadge status={selected.status} />}
        subtitle={selected && <span>{selected.customer} · <span className="num">{selected.id}</span></span>}
        footer={
          <>
            <Button variant="primary" onClick={() => demo('Updating project status')}>Update status</Button>
            <Button variant="secondary" onClick={() => demo('Opening recovery plan')}>Recovery plan</Button>
            <Button variant="ghost" className="ml-auto" icon={<ArrowRight size={14} />} onClick={() => demo('Opening full project workspace')}>
              Open workspace
            </Button>
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
                  { id: 'overview', label: 'Overview' },
                  { id: 'milestones', label: 'Milestones', count: selected.milestones.length },
                  { id: 'team', label: 'Team', count: selected.team.length },
                  { id: 'issues', label: 'Issues', count: selected.issues.length },
                  { id: 'documents', label: 'Documents', count: 4 },
                ]}
              />
            </div>

            {tab === 'overview' && (
              <>
                {selected.issues.some((i) => i.severity === 'critical') && (
                  <div className="px-5 pt-5">
                    <Alert tone="danger" icon={<AlertTriangle size={16} />} title="Critical issue blocking this project">
                      {selected.issues.find((i) => i.severity === 'critical')?.title}. Owner: {selected.issues[0].owner}.
                    </Alert>
                  </div>
                )}

                <DrawerSection title="Delivery progress">
                  <Progress label={selected.phase} value={selected.progress} showValue tone="auto" />
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-2xs text-ink-3">Budget</p>
                      <p className="text-[15px] font-semibold text-ink num mt-1">{inr(selected.budget)}</p>
                    </div>
                    <div>
                      <p className="text-2xs text-ink-3">Spent</p>
                      <p className="text-[15px] font-semibold text-ink num mt-1">{inr(selected.spent)}</p>
                    </div>
                    <div>
                      <p className="text-2xs text-ink-3">Consumed</p>
                      <p className={cn('text-[15px] font-semibold num mt-1',
                        selected.spent / selected.budget > selected.progress / 100 ? 'text-warning' : 'text-success')}>
                        {Math.round((selected.spent / selected.budget) * 100)}%
                      </p>
                    </div>
                  </div>
                </DrawerSection>

                <DrawerSection title="Project information">
                  <DescList
                    items={[
                      { label: 'Manager', value: <span className="inline-flex items-center gap-1.5"><Avatar name={selected.manager} size="xs" />{selected.manager}</span> },
                      { label: 'Customer', value: selected.customer },
                      { label: 'Start date', value: <span className="num">{fmtDate(selected.start)}</span> },
                      { label: 'End date', value: <span className="num">{fmtDate(selected.end)}</span> },
                      { label: 'Current phase', value: selected.phase },
                      { label: 'Risk level', value: <Badge tone={riskTone(selected.risk)} dot>{selected.risk}</Badge> },
                    ]}
                  />
                </DrawerSection>
              </>
            )}

            {tab === 'milestones' && (
              <DrawerSection title="Milestones">
                <ul className="space-y-2.5">
                  {selected.milestones.map((m) => {
                    const overdue = !m.done && m.due < '2026-08-22'
                    return (
                      <li key={m.id} className={cn('flex items-start gap-3 rounded-lg border px-3.5 py-3',
                        overdue ? 'border-danger/25 bg-danger-soft/40' : 'border-line')}>
                        {m.done
                          ? <CheckCircle2 size={16} className="text-success mt-0.5 shrink-0" />
                          : <CircleDot size={16} className={cn('mt-0.5 shrink-0', overdue ? 'text-danger' : 'text-ink-3')} />}
                        <div className="min-w-0 flex-1">
                          <p className={cn('text-[13px] font-medium leading-snug', m.done ? 'text-ink-3 line-through' : 'text-ink')}>{m.name}</p>
                          <p className="text-2xs text-ink-3 mt-1 num">Due {fmtDate(m.due)} · {m.owner}</p>
                        </div>
                        {m.done ? <Badge tone="success">Done</Badge> : overdue ? <Badge tone="danger">Overdue</Badge> : <Badge tone="neutral">Open</Badge>}
                      </li>
                    )
                  })}
                </ul>
              </DrawerSection>
            )}

            {tab === 'team' && (
              <DrawerSection title="Project team">
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <div className="rounded-lg border border-brand-200 bg-brand-50 px-3.5 py-3 flex items-center gap-3">
                    <Avatar name={selected.manager} size="md" />
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-brand-800 truncate">{selected.manager}</p>
                      <p className="text-2xs text-brand-700/80">Project manager</p>
                    </div>
                  </div>
                  {selected.team.map((t) => (
                    <div key={t} className="rounded-lg border border-line px-3.5 py-3 flex items-center gap-3">
                      <Avatar name={t} size="md" />
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium text-ink truncate">{t}</p>
                        <p className="text-2xs text-ink-3">Delivery team</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3.5 flex items-center gap-2 text-2xs text-ink-3">
                  <Users2 size={13} />
                  {selected.team.length + 1} people allocated to this project
                </div>
              </DrawerSection>
            )}

            {tab === 'issues' && (
              <DrawerSection title="Open issues">
                {selected.issues.length === 0 ? (
                  <EmptyState compact icon={<Flag size={18} />} title="No open issues"
                    description="This project has no logged blockers or risks." />
                ) : (
                  <ul className="space-y-2.5">
                    {selected.issues.map((i) => (
                      <li key={i.id} className="flex items-start gap-3 rounded-lg border border-line px-3.5 py-3">
                        <Flag size={15} className={cn('mt-0.5 shrink-0',
                          i.severity === 'critical' ? 'text-danger' : i.severity === 'warning' ? 'text-warning' : 'text-info')} />
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-medium text-ink leading-snug">{i.title}</p>
                          <p className="text-2xs text-ink-3 mt-1">Owner: {i.owner}</p>
                        </div>
                        <Badge tone={i.severity === 'critical' ? 'danger' : i.severity === 'warning' ? 'warning' : 'info'}>
                          {i.severity}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </DrawerSection>
            )}

            {tab === 'documents' && (
              <DrawerSection title="Project documents">
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {['Contract & scope.pdf', 'Site survey report.pdf', 'Installation drawings.dwg', 'Progress photos — Aug.zip'].map((d) => (
                    <button key={d} onClick={() => demo('Opening document')}
                      className="flex items-center gap-2.5 rounded-lg border border-line px-3.5 py-3 text-left hover:border-line-strong transition-colors">
                      <span className="h-8 w-8 rounded-lg bg-surface-sunken text-ink-3 inline-flex items-center justify-center shrink-0">
                        <FileText size={15} />
                      </span>
                      <span className="text-[13px] text-ink truncate">{d}</span>
                    </button>
                  ))}
                </div>
              </DrawerSection>
            )}
          </>
        )}
      </Drawer>
    </>
  )
}
