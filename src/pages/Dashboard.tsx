import { useNavigate } from 'react-router-dom'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, ComposedChart,
} from 'recharts'
import {
  IndianRupee, GitBranch, Building2, Activity, Headphones, ShieldCheck, HardHat, RefreshCw,
  HeartHandshake, ArrowRight, Download, Calendar, ChevronDown, Sparkles, Gauge,
} from 'lucide-react'
import {
  PageHeader, KpiCard, MiniKpi, ChartCard, SectionTitle, Button, Badge, Card, CardHeader,
  Progress, useToast, Dropdown, MenuItem, MenuLabel, ScoreRing,
} from '@/components/ui'
import { AiBriefPanel } from '@/components/intelligence/AiBrief'
import { HealthAlertGrid } from '@/components/intelligence/HealthAlerts'
import { CHART, AXIS_PROPS, ChartTooltip, Legend } from '@/components/charts/primitives'
import { inr, num } from '@/lib/utils'
import {
  revenueSeries, pipelineStages, ticketSeries, departmentPerformance, customerHealth,
  employeeHealthSeries, dailyBrief,
} from '@/data/analytics'
import { DEPARTMENTS } from '@/data/people'

export function Dashboard() {
  const { demo } = useToast()
  const navigate = useNavigate()

  return (
    <>
      <PageHeader
        title="Executive Dashboard"
        subtitle="Here’s what’s happening across your business today."
        meta={
          <div className="flex items-center gap-2 flex-wrap">
            <Badge tone="brand" dot>Live workspace · Brio India</Badge>
            <Badge tone="neutral">Data refreshed 09:12 IST</Badge>
            <Badge tone="bronze">Super Admin view · all departments</Badge>
          </div>
        }
        actions={
          <>
            <Dropdown
              width="w-52"
              trigger={({ toggle }) => (
                <Button size="md" variant="secondary" icon={<Calendar size={14} />} iconRight={<ChevronDown size={13} />} onClick={toggle}>
                  Aug 2026
                </Button>
              )}
            >
              {(close) => (
                <>
                  <MenuLabel>Period</MenuLabel>
                  {['This month', 'Last month', 'This quarter', 'Last 6 months', 'Financial year'].map((p) => (
                    <MenuItem key={p} active={p === 'This month'} onClick={() => { close(); demo(`Period set to ${p}`) }}>{p}</MenuItem>
                  ))}
                </>
              )}
            </Dropdown>
            <Button size="md" variant="secondary" icon={<Download size={14} />} onClick={() => demo('Exporting dashboard')}>
              Export
            </Button>
            <Button size="md" variant="primary" icon={<Sparkles size={14} />} onClick={() => navigate('/assistant')}>
              Ask Brio
            </Button>
          </>
        }
      />

      {/* Primary KPIs */}
      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Revenue" value="₹48.6L" delta={12.8} icon={<IndianRupee size={15} />} accent="brand"
          hint="Against ₹50L monthly target" onClick={() => navigate('/reports')} />
        <KpiCard label="Open Pipeline" value="₹1.82Cr" delta={8.4} icon={<GitBranch size={15} />} accent="brand"
          hint="Weighted forecast ₹94.2L" onClick={() => navigate('/pipeline')} />
        <KpiCard label="Active Customers" value="1,284" delta={5.6} icon={<Building2 size={15} />} accent="brand"
          hint="812 healthy · 341 monitor · 131 at risk" onClick={() => navigate('/customers')} />
        <KpiCard
          label="Business Health" value="82/100" delta={-2.4} icon={<Activity size={15} />} accent="warning"
          hint="Attention — service and delivery pulling the score down"
          onClick={() => navigate('/intelligence')}
        />
      </div>

      {/* Secondary KPIs */}
      <div className="grid gap-3.5 grid-cols-2 lg:grid-cols-5 mt-3.5">
        <MiniKpi label="Open Tickets" value="86" tone="warning" icon={<Headphones size={13} />} sub="14 high priority" />
        <MiniKpi label="SLA Compliance" value="94.2%" tone="warning" icon={<ShieldCheck size={13} />} sub="Target 96%" />
        <MiniKpi label="Active Projects" value="42" icon={<HardHat size={13} />} sub="2 at risk · 1 delayed" />
        <MiniKpi label="AMC Renewals" value="₹24.8L" tone="warning" icon={<RefreshCw size={13} />} sub="Due within 90 days" />
        <MiniKpi label="Employee Engagement" value="91%" tone="success" icon={<HeartHandshake size={13} />} sub="+4.2 pts vs Q2" />
      </div>

      {/* AI brief */}
      <div className="mt-7">
        <AiBriefPanel />
      </div>

      {/* Charts row 1 */}
      <div className="grid gap-3.5 xl:grid-cols-3 mt-7">
        <ChartCard
          title="Revenue Performance"
          subtitle="Last 6 months · actual against target and prior year"
          className="xl:col-span-2"
          height={300}
          action={<Legend items={[
            { label: 'Revenue', color: CHART.brand },
            { label: 'Target', color: CHART.bronze },
            { label: 'Last year', color: CHART.brandFaint },
          ]} />}
          footer={
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <span className="text-2xs text-ink-2">
                Aug revenue <span className="font-semibold text-ink num">₹48.6L</span> · 97% of target
              </span>
              <button onClick={() => navigate('/reports')} className="text-2xs font-semibold text-brand-700 hover:underline inline-flex items-center gap-1">
                Revenue report <ArrowRight size={11} />
              </button>
            </div>
          }
        >
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={revenueSeries} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
              <defs>
                <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART.brand} stopOpacity={0.18} />
                  <stop offset="100%" stopColor={CHART.brand} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={CHART.grid} vertical={false} />
              <XAxis dataKey="month" {...AXIS_PROPS} />
              <YAxis {...AXIS_PROPS} tickFormatter={(v) => inr(v, { decimals: 0 })} width={54} />
              <RTooltip content={<ChartTooltip formatter={(v) => inr(v)} />} cursor={{ stroke: CHART.brandFaint, strokeWidth: 1 }} />
              <Area type="monotone" dataKey="revenue" stroke="none" fill="url(#revFill)" name="Revenue" legendType="none" />
              <Line type="monotone" dataKey="lastYear" name="Last year" stroke={CHART.brandFaint} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="target" name="Target" stroke={CHART.bronze} strokeWidth={2} strokeDasharray="5 4" dot={false} />
              <Line type="monotone" dataKey="revenue" name="Revenue" stroke={CHART.brand} strokeWidth={2.5}
                dot={{ r: 3, fill: '#fff', stroke: CHART.brand, strokeWidth: 2 }} activeDot={{ r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Sales Pipeline"
          subtitle="Value by stage · 53 open opportunities"
          height={300}
          footer={
            <button onClick={() => navigate('/pipeline')} className="text-2xs font-semibold text-brand-700 hover:underline inline-flex items-center gap-1">
              Open pipeline board <ArrowRight size={11} />
            </button>
          }
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={pipelineStages} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }} barSize={22}>
              <CartesianGrid stroke={CHART.grid} horizontal={false} />
              <XAxis type="number" {...AXIS_PROPS} tickFormatter={(v) => inr(v, { decimals: 0 })} />
              <YAxis type="category" dataKey="stage" {...AXIS_PROPS} width={78} />
              <RTooltip content={<ChartTooltip formatter={(v) => inr(v)} />} cursor={{ fill: 'rgba(35,74,103,.05)' }} />
              <Bar dataKey="value" name="Pipeline value" radius={[0, 4, 4, 0]}>
                {pipelineStages.map((s) => (
                  <Cell key={s.stage} fill={s.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts row 2 */}
      <div className="grid gap-3.5 xl:grid-cols-3 mt-3.5">
        <ChartCard
          title="Ticket Resolution"
          subtitle="Created vs resolved · backlog trend by week"
          height={260}
          action={<Legend items={[
            { label: 'Created', color: CHART.brandLight },
            { label: 'Resolved', color: CHART.success },
            { label: 'Backlog', color: CHART.danger },
          ]} />}
        >
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={ticketSeries} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke={CHART.grid} vertical={false} />
              <XAxis dataKey="week" {...AXIS_PROPS} />
              <YAxis {...AXIS_PROPS} width={40} />
              <RTooltip content={<ChartTooltip />} cursor={{ stroke: CHART.brandFaint }} />
              <Line type="monotone" dataKey="created" name="Created" stroke={CHART.brandLight} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="resolved" name="Resolved" stroke={CHART.success} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="backlog" name="Backlog" stroke={CHART.danger} strokeWidth={2} strokeDasharray="4 3" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Department Performance" subtitle="Score against departmental target" height={260}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={departmentPerformance} margin={{ top: 8, right: 8, left: -18, bottom: 0 }} barGap={4}>
              <CartesianGrid stroke={CHART.grid} vertical={false} />
              <XAxis dataKey="department" {...AXIS_PROPS} />
              <YAxis {...AXIS_PROPS} domain={[0, 100]} width={40} />
              <RTooltip content={<ChartTooltip formatter={(v) => `${v}%`} />} cursor={{ fill: 'rgba(35,74,103,.05)' }} />
              <Bar dataKey="performance" name="Performance" fill={CHART.brand} radius={[4, 4, 0, 0]} barSize={18} />
              <Bar dataKey="target" name="Target" fill={CHART.brandFaint} radius={[4, 4, 0, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Customer Health"
          subtitle="1,284 active accounts by health band"
          height={260}
          footer={
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <Legend items={customerHealth.map((c) => ({ label: c.name, color: c.fill, value: num(c.value) }))} />
            </div>
          }
        >
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={customerHealth}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={92}
                paddingAngle={2}
                stroke="#fff"
                strokeWidth={2}
              >
                {customerHealth.map((c) => (
                  <Cell key={c.name} fill={c.fill} />
                ))}
              </Pie>
              <RTooltip content={<ChartTooltip formatter={(v) => `${num(v)} accounts`} />} />
              <text x="50%" y="47%" textAnchor="middle" className="fill-ink font-display" style={{ fontSize: 24, fontWeight: 700 }}>
                63%
              </text>
              <text x="50%" y="58%" textAnchor="middle" className="fill-ink-3" style={{ fontSize: 11 }}>
                healthy
              </text>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Business health & alerts */}
      <section className="mt-8">
        <SectionTitle
          title="Business Health & Alerts"
          subtitle="Risks detected across service, delivery, commercial and people signals"
          icon={<Gauge size={18} />}
          action={
            <Button size="sm" variant="secondary" onClick={() => navigate('/intelligence')} iconRight={<ArrowRight size={13} />}>
              Management intelligence
            </Button>
          }
        />
        <HealthAlertGrid />
      </section>

      {/* Employee health + daily brief */}
      <div className="grid gap-3.5 xl:grid-cols-3 mt-8">
        <ChartCard
          title="Employee Health"
          subtitle="Health index, engagement and workload trend"
          className="xl:col-span-2"
          height={260}
          action={<Legend items={[
            { label: 'Health index', color: CHART.brand },
            { label: 'Engagement', color: CHART.success },
            { label: 'Workload', color: CHART.warning },
          ]} />}
          footer={
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <span className="text-2xs text-ink-2">
                Workload has risen for 4 consecutive months — engagement is holding but health gains are flattening.
              </span>
              <button onClick={() => navigate('/feedback')} className="text-2xs font-semibold text-brand-700 hover:underline inline-flex items-center gap-1 shrink-0">
                Feedback intelligence <ArrowRight size={11} />
              </button>
            </div>
          }
        >
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={employeeHealthSeries} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="healthFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART.brand} stopOpacity={0.22} />
                  <stop offset="100%" stopColor={CHART.brand} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={CHART.grid} vertical={false} />
              <XAxis dataKey="month" {...AXIS_PROPS} />
              <YAxis {...AXIS_PROPS} domain={[60, 100]} width={40} />
              <RTooltip content={<ChartTooltip formatter={(v) => `${v}`} />} cursor={{ stroke: CHART.brandFaint }} />
              <Area type="monotone" dataKey="health" name="Health index" stroke={CHART.brand} strokeWidth={2.5} fill="url(#healthFill)" />
              <Line type="monotone" dataKey="engagement" name="Engagement" stroke={CHART.success} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="workload" name="Workload" stroke={CHART.warning} strokeWidth={2} strokeDasharray="4 3" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <Card className="flex flex-col">
          <CardHeader
            title="Daily Management Brief"
            subtitle="Friday, 22 August 2026"
            action={<Badge tone="brand">6 items</Badge>}
          />
          <ul className="p-3 flex-1 space-y-0.5">
            {dailyBrief.map((d) => {
              const dot = {
                info: 'bg-info', danger: 'bg-danger', warning: 'bg-warning', success: 'bg-success',
              }[d.tone]
              return (
                <li key={d.id}>
                  <button
                    onClick={() => navigate(d.module)}
                    className="w-full flex items-start gap-2.5 rounded-lg px-2.5 py-2.5 text-left hover:bg-surface-muted transition-colors group"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full mt-1.5 shrink-0 ${dot}`} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-medium text-ink leading-snug">{d.label}</span>
                      <span className="block text-2xs text-ink-3 mt-0.5 leading-relaxed">{d.detail}</span>
                    </span>
                    <ArrowRight size={13} className="text-ink-3 opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="p-3 border-t border-line">
            <Button block size="sm" variant="secondary" onClick={() => navigate('/brief')} iconRight={<ArrowRight size={13} />}>
              View all actions
            </Button>
          </div>
        </Card>
      </div>

      {/* Department scorecards */}
      <section className="mt-8">
        <SectionTitle
          title="Department Scorecards"
          subtitle="Performance, workload and risk posture across the organisation"
          action={
            <Button size="sm" variant="secondary" onClick={() => navigate('/intelligence')} iconRight={<ArrowRight size={13} />}>
              Full breakdown
            </Button>
          }
        />
        <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-5">
          {DEPARTMENTS.map((d) => (
            <Card key={d.name} className="p-4 hover:shadow-md hover:border-line-strong transition-[box-shadow,border-color] duration-200">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display text-[15px] font-semibold text-ink">{d.name}</p>
                  <p className="text-2xs text-ink-3 mt-0.5 truncate">{d.head} · {d.headcount} people</p>
                </div>
                <ScoreRing value={d.performance} size={46} />
              </div>
              <div className="mt-4 space-y-2.5">
                <Progress label="Workload" value={d.workload} showValue tone={d.workload > 90 ? 'danger' : d.workload > 80 ? 'warning' : 'brand'} size="sm" />
                <Progress label="Engagement" value={d.engagement} showValue tone="auto" size="sm" />
              </div>
              <div className="mt-3.5 pt-3 border-t border-line flex items-center justify-between">
                <span className="text-2xs text-ink-3">Risk</span>
                <Badge tone={d.risk === 'High' ? 'danger' : d.risk === 'Medium' ? 'warning' : 'success'} dot>
                  {d.risk}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}
