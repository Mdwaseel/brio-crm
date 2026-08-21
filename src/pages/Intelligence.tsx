import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip as RTooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell,
} from 'recharts'
import {
  Gauge, TrendingDown, ArrowRight, Building2, ShieldAlert, Sparkles, Users, Target,
  Download, ChevronRight,
} from 'lucide-react'
import {
  PageHeader, Card, CardHeader, Button, Badge, Progress, ScoreRing, SectionTitle, Tabs,
  useToast, Alert, MiniKpi,
} from '@/components/ui'
import { AiBriefPanel } from '@/components/intelligence/AiBrief'
import { HealthAlertGrid } from '@/components/intelligence/HealthAlerts'
import { CHART, AXIS_PROPS, ChartTooltip } from '@/components/charts/primitives'
import { DEPARTMENTS, IMPROVEMENT_AREAS, employees } from '@/data/people'
import { departmentPerformance } from '@/data/analytics'
import { cn, inr } from '@/lib/utils'

const COMPANY_AXES = [
  { axis: 'Revenue', value: 88 },
  { axis: 'Delivery', value: 74 },
  { axis: 'Service', value: 71 },
  { axis: 'People', value: 86 },
  { axis: 'Operations', value: 84 },
  { axis: 'Finance', value: 91 },
]

const SEVERITY_TONE = {
  critical: { badge: 'danger' as const, bar: 'bg-danger', text: 'text-danger' },
  warning: { badge: 'warning' as const, bar: 'bg-warning', text: 'text-warning' },
  monitor: { badge: 'info' as const, bar: 'bg-info', text: 'text-info' },
  healthy: { badge: 'success' as const, bar: 'bg-success', text: 'text-success' },
}

export function Intelligence() {
  const { demo } = useToast()
  const navigate = useNavigate()
  const [scope, setScope] = useState('company')

  const teamRows = employees
    .slice()
    .sort((a, b) => b.workload - a.workload)
    .slice(0, 8)

  return (
    <>
      <PageHeader
        title="Management Intelligence"
        subtitle="Company, department and team health — with the risks and actions behind each score."
        meta={
          <div className="flex items-center gap-2 flex-wrap">
            <Badge tone="brand" dot>Super Admin view</Badge>
            <Badge tone="neutral">All 5 departments · 132 employees</Badge>
          </div>
        }
        actions={
          <>
            <Button size="md" variant="secondary" icon={<Download size={14} />} onClick={() => demo('Exporting scorecard')}>Export</Button>
            <Button size="md" variant="primary" icon={<Sparkles size={14} />} onClick={() => navigate('/assistant')}>Ask Brio</Button>
          </>
        }
      />

      <AiBriefPanel />

      {/* Health scope */}
      <div className="mt-7">
        <SectionTitle
          title="Health Scorecard"
          subtitle="Composite health across the organisation, its departments and its teams"
          icon={<Gauge size={18} />}
          action={
            <Tabs
              variant="pill"
              value={scope}
              onChange={setScope}
              tabs={[
                { id: 'company', label: 'Company' },
                { id: 'department', label: 'Department' },
                { id: 'team', label: 'Team' },
              ]}
            />
          }
        />

        {scope === 'company' && (
          <div className="grid gap-3.5 xl:grid-cols-3">
            <Card className="xl:col-span-1">
              <CardHeader title="Company Health" subtitle="Weighted composite index" />
              <div className="p-5 flex flex-col items-center">
                <ScoreRing value={82} size={132} label="/ 100" />
                <Badge tone="warning" dot className="mt-4">Attention required</Badge>
                <p className="text-[13px] text-ink-2 text-center mt-3.5 leading-relaxed">
                  Down 2.4 points this month. Service and delivery are the two dimensions dragging the
                  composite score below the 85 target.
                </p>
                <div className="w-full mt-5 space-y-2.5">
                  <Progress label="Commercial" value={88} showValue size="sm" tone="success" />
                  <Progress label="Delivery" value={74} showValue size="sm" tone="warning" />
                  <Progress label="Service" value={71} showValue size="sm" tone="danger" />
                  <Progress label="People" value={86} showValue size="sm" tone="success" />
                </div>
              </div>
            </Card>

            <Card className="xl:col-span-2">
              <CardHeader title="Health Dimensions" subtitle="Balance across the six operating dimensions" />
              <div className="p-4 pt-5">
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={COMPANY_AXES} outerRadius="75%">
                    <PolarGrid stroke={CHART.grid} />
                    <PolarAngleAxis dataKey="axis" tick={{ fill: '#7c8b99', fontSize: 11 }} />
                    <Radar name="Health" dataKey="value" stroke={CHART.brand} fill={CHART.brand} fillOpacity={0.18} strokeWidth={2} />
                    <RTooltip content={<ChartTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        )}

        {scope === 'department' && (
          <>
            <Card className="mb-3.5">
              <CardHeader title="Department Performance" subtitle="Score against departmental target" />
              <div className="p-4 pt-5">
                <ResponsiveContainer width="100%" height={230}>
                  <BarChart data={departmentPerformance} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                    <CartesianGrid stroke={CHART.grid} vertical={false} />
                    <XAxis dataKey="department" {...AXIS_PROPS} />
                    <YAxis {...AXIS_PROPS} domain={[0, 100]} width={40} />
                    <RTooltip content={<ChartTooltip formatter={(v) => `${v}`} />} cursor={{ fill: 'rgba(35,74,103,.05)' }} />
                    <Bar dataKey="performance" name="Performance" radius={[4, 4, 0, 0]} barSize={34}>
                      {departmentPerformance.map((d) => (
                        <Cell key={d.department} fill={d.performance >= d.target ? CHART.success : d.performance >= d.target - 8 ? CHART.warning : CHART.danger} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid gap-3.5 lg:grid-cols-2 xl:grid-cols-3">
              {DEPARTMENTS.map((d) => (
                <Card key={d.name} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-4 flex items-start justify-between gap-3 border-b border-line">
                    <div className="min-w-0">
                      <p className="font-display text-[16px] font-semibold text-ink">{d.name}</p>
                      <p className="text-2xs text-ink-3 mt-0.5">{d.head} · {d.headcount} people</p>
                      {d.revenue > 0 && <p className="text-2xs text-ink-3 mt-1 num">Revenue contribution {inr(d.revenue)}</p>}
                    </div>
                    <ScoreRing value={d.performance} size={54} />
                  </div>
                  <div className="p-4 space-y-2.5">
                    <Progress label="Performance" value={d.performance} showValue size="xs" tone="auto" />
                    <Progress label="Workload" value={d.workload} showValue size="xs"
                      tone={d.workload >= 90 ? 'danger' : d.workload >= 80 ? 'warning' : 'brand'} />
                    <Progress label="Engagement" value={d.engagement} showValue size="xs" tone="auto" />
                    {d.sla > 0 && <Progress label="SLA compliance" value={d.sla} showValue size="xs" tone="auto" />}
                  </div>
                  <div className="px-4 pb-4">
                    <div className="rounded-lg bg-surface-muted border border-line px-3 py-2.5">
                      <p className="text-2xs text-ink-2 leading-relaxed">{d.note}</p>
                    </div>
                  </div>
                  <div className="px-4 py-2.5 border-t border-line bg-surface-muted/60 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-2xs text-ink-3">
                      CSAT <span className="font-semibold text-ink num">{d.csat}</span>
                    </span>
                    <Badge tone={d.risk === 'High' ? 'danger' : d.risk === 'Medium' ? 'warning' : 'success'} dot>
                      {d.risk} risk
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {scope === 'team' && (
          <Card className="overflow-hidden">
            <CardHeader title="Team Health" subtitle="Individual contribution, capacity and wellbeing — sorted by workload" />
            <div className="p-4 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
              <MiniKpi label="Above threshold" value="7" tone="danger" sub="Workload over 90%" />
              <MiniKpi label="Balanced" value="98" tone="success" sub="Between 60% and 85%" />
              <MiniKpi label="Under-utilised" value="27" tone="warning" sub="Below 60% capacity" />
              <MiniKpi label="Avg engagement" value="91%" tone="success" sub="+4.2 pts vs Q2" />
            </div>
            <div className="px-4 pb-4 space-y-2.5">
              {teamRows.map((e) => (
                <button
                  key={e.id}
                  onClick={() => navigate('/employees')}
                  className="w-full grid grid-cols-[1fr_auto] sm:grid-cols-[220px_1fr_auto] gap-4 items-center rounded-xl border border-line px-4 py-3 text-left hover:border-line-strong hover:bg-surface-muted transition-colors group"
                >
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold text-ink truncate">{e.name}</span>
                    <span className="block text-2xs text-ink-3 truncate">{e.role} · {e.department}</span>
                  </span>
                  <span className="hidden sm:grid grid-cols-3 gap-4">
                    <Progress label="Workload" value={e.workload} showValue size="xs"
                      tone={e.workload >= 90 ? 'danger' : e.workload >= 80 ? 'warning' : 'success'} />
                    <Progress label="Performance" value={e.performance} showValue size="xs" tone="auto" />
                    <Progress label="Health" value={e.health} showValue size="xs" tone="auto" />
                  </span>
                  <ChevronRight size={15} className="text-ink-3 group-hover:text-brand-700 transition-colors" />
                </button>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Business health alerts */}
      <section className="mt-8">
        <SectionTitle title="Business Health & Alerts" subtitle="Live risk register across every module" icon={<ShieldAlert size={18} />} />
        <HealthAlertGrid />
      </section>

      {/* Improvement areas */}
      <section className="mt-8">
        <SectionTitle
          title="Areas of Improvement"
          subtitle="Where intervention will move the company health score fastest"
          icon={<Target size={18} />}
          action={<Button size="sm" variant="secondary" onClick={() => demo('Creating action plan')}>Create action plan</Button>}
        />
        <div className="space-y-3.5">
          {IMPROVEMENT_AREAS.map((a) => {
            const tone = SEVERITY_TONE[a.severity]
            return (
              <Card key={a.id} className="overflow-hidden">
                <div className="flex">
                  <span className={cn('w-1 shrink-0', tone.bar)} aria-hidden />
                  <div className="flex-1 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display text-[16px] font-semibold text-ink">{a.title}</h3>
                          <Badge tone={tone.badge} dot>{a.severity}</Badge>
                          <Badge tone="neutral">{a.department}</Badge>
                        </div>
                        <p className="text-[13px] text-ink-2 mt-2 leading-relaxed max-w-3xl">{a.detail}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={cn('inline-flex items-center gap-1 text-[15px] font-bold num', tone.text)}>
                          <TrendingDown size={15} />
                          {Math.abs(a.trend)}%
                        </span>
                        <p className="text-2xs text-ink-3 mt-1">vs previous period</p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3.5 lg:grid-cols-[1fr_auto] items-center">
                      <div className="rounded-lg bg-brand-50 border border-brand-200 px-4 py-3">
                        <p className="text-2xs font-semibold uppercase tracking-wider text-brand-700">Recommended action</p>
                        <p className="text-[13px] text-brand-900 mt-1.5 leading-relaxed">{a.recommendation}</p>
                      </div>
                      <div className="flex items-center gap-2.5 shrink-0">
                        <div className="text-right">
                          <p className="text-2xs text-ink-3">Impact</p>
                          <p className="text-[13px] font-semibold text-ink">{a.impact}</p>
                        </div>
                        <Button size="sm" variant="primary" iconRight={<ArrowRight size={13} />} onClick={() => demo('Assigning owner')}>
                          Assign
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      <div className="mt-8">
        <Alert tone="brand" icon={<Users size={16} />} title="How these scores are built">
          Brio combines operational data (revenue, pipeline, SLA, milestones, stock), people data (workload,
          goals, engagement) and voice-of-customer signals into a single weighted index. Every score on this
          page can be traced back to the underlying records — nothing is a black box.
        </Alert>
      </div>

      <div className="mt-4 flex items-center gap-2 text-2xs text-ink-3">
        <Building2 size={13} />
        Scores refresh nightly. Department heads receive their scorecard every Monday at 08:00 IST via workflow WF-05.
      </div>
    </>
  )
}
