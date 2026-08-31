import { useNavigate } from 'react-router-dom'
import {
  ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
} from 'recharts'
import {
  GitBranch, Wallet, Target, ArrowRight, ArrowUpRight, Plus, Sparkles, Gauge, MoreHorizontal,
  ChevronDown, Calendar, Download, Mic, Paperclip, RefreshCw, FileText, ShieldAlert,
} from 'lucide-react'
import {
  PageHeader, SectionTitle, Button, Badge, Card, CardHeader, StatTile,
  Progress, useToast, Dropdown, MenuItem, MenuLabel, ScoreRing, IconButton,
} from '@/components/ui'
import { AiBriefPanel } from '@/components/intelligence/AiBrief'
import { HealthAlertGrid } from '@/components/intelligence/HealthAlerts'
import { CHART, AXIS_PROPS, ChartTooltip, Legend, CURSOR_FILL } from '@/components/charts/primitives'
import { inr, num, initials, fmtDateShort } from '@/lib/utils'
import {
  revenueSeries, customerHealth, employeeHealthSeries, dailyBrief,
} from '@/data/analytics'
import { deals } from '@/data/crm'
import { DEPARTMENTS } from '@/data/people'

const ASSISTANT_PROMPTS = [
  'Where is revenue at risk?',
  'Which deals slip this month?',
  'Summarise SLA breaches',
  'Draft the renewal plan',
  'Who is overloaded?',
]

const RENEWAL_BUCKETS = [
  { window: 'Within 30 days', value: 620000, accounts: 2 },
  { window: '31 – 60 days', value: 880000, accounts: 2 },
  { window: '61 – 90 days', value: 980000, accounts: 2 },
]

const HEALTH_TOTAL = customerHealth.reduce((sum, c) => sum + c.value, 0)

/** Deals closest to their expected close date — the dashboard's "what's moving" list. */
const RECENT_DEALS = [...deals]
  .filter((d) => d.stage !== 'Lost')
  .sort((a, b) => a.expectedClose.localeCompare(b.expectedClose))
  .slice(0, 6)

const STAGE_TONE: Record<string, 'success' | 'bronze' | 'brand' | 'warning' | 'neutral'> = {
  Won: 'success',
  Negotiation: 'bronze',
  Proposal: 'brand',
  Qualified: 'warning',
  New: 'neutral',
}

export function Dashboard() {
  const { demo } = useToast()
  const navigate = useNavigate()

  const totalRevenue = revenueSeries.reduce((sum, r) => sum + r.revenue, 0)
  const renewalTotal = RENEWAL_BUCKETS.reduce((sum, b) => sum + b.value, 0)

  return (
    <>
      <PageHeader
        title="Executive Dashboard"
        subtitle="Track revenue, risk and delivery across every department — with Brio surfacing what needs you first."
        meta={
          <div className="flex items-center gap-2 flex-wrap">
            <Badge tone="bronze" dot>Live workspace · Brio India</Badge>
            <Badge tone="neutral">Refreshed 09:12 IST</Badge>
            <Badge tone="brand">Super Admin · all departments</Badge>
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
            <Button size="md" variant="primary" icon={<Sparkles size={14} />} iconRight={<ArrowUpRight size={14} />} onClick={() => navigate('/assistant')}>
              Ask Brio
            </Button>
          </>
        }
      />

      {/* ---------- Row A · hero, performance, health score ---------- */}
      <div className="grid gap-4 xl:grid-cols-12">
        {/* Revenue hero */}
        <div className="xl:col-span-4 relative overflow-hidden rounded-3xl hero-green p-6 flex flex-col min-h-[218px] shadow-lime-glow">
          <span
            className="absolute -bottom-16 -left-10 h-52 w-52 rounded-full animate-drift"
            style={{ background: 'radial-gradient(circle, rgba(18,53,42,.20) 0%, transparent 66%)' }}
            aria-hidden
          />
          <div className="relative flex items-start justify-between gap-3">
            <div>
              <p className="text-[13px] font-medium text-forest-950/70">Revenue this month</p>
              <div className="mt-2.5 flex items-end gap-2">
                <span className="font-display text-[38px] leading-none font-extrabold text-forest-950 num tracking-tight">₹48.6L</span>
                <span className="text-[13px] font-semibold text-forest-950/60 pb-1">INR</span>
              </div>
              <p className="mt-2.5 text-[12px] font-medium text-forest-950/70">
                97% of the ₹50L target · <span className="font-bold text-forest-950">+12.8%</span> on last month
              </p>
            </div>
            <button
              onClick={() => demo('Add a revenue widget')}
              aria-label="Add widget"
              className="h-9 w-9 shrink-0 rounded-full bg-white/35 text-forest-950 inline-flex items-center justify-center hover:bg-white/55 transition-colors backdrop-blur-sm"
            >
              <Plus size={17} />
            </button>
          </div>

          <div className="relative mt-auto pt-6 flex items-center gap-2.5">
            <button
              onClick={() => navigate('/quotations')}
              className="flex-1 h-11 rounded-full bg-white text-forest-950 text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-white/90 transition-colors shadow-sm"
            >
              New quote <FileText size={14} />
            </button>
            <button
              onClick={() => navigate('/leads')}
              className="flex-1 h-11 rounded-full bg-forest-900 text-white text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-forest-950 transition-colors shadow-sm"
            >
              Add lead <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Performance tiles */}
        <Card className="xl:col-span-5 flex flex-col">
          <CardHeader
            title="Commercial Performance"
            action={
              <Button size="xs" variant="subtle" icon={<Plus size={12} />} onClick={() => demo('Add a metric')}>
                Add metric
              </Button>
            }
          />
          <div className="px-5 pb-5 pt-1 grid gap-3 sm:grid-cols-3 flex-1">
            <StatTile label="Open pipeline" value="₹1.82Cr" delta={8.4} icon={<GitBranch size={13} />} onClick={() => navigate('/pipeline')} />
            <StatTile label="Collections" value="₹41.2L" delta={6.1} icon={<Wallet size={13} />} onClick={() => navigate('/reports')} />
            <StatTile label="Win rate" value="41%" delta={3.2} icon={<Target size={13} />} onClick={() => navigate('/pipeline')} />
          </div>
        </Card>

        {/* Business health score */}
        <Card className="xl:col-span-3 flex flex-col">
          <CardHeader
            title="Business Health"
            action={<IconButton label="Health options" size="sm" onClick={() => demo('Health score settings')}><MoreHorizontal size={16} /></IconButton>}
          />
          <div className="px-5 pb-5 pt-1 flex-1 flex flex-col justify-center">
            <p className="text-2xs text-ink-3">Overall quality</p>
            <div className="mt-1.5 flex items-end justify-between gap-3">
              <span className="font-display text-[26px] leading-none font-bold text-ink tracking-tight">Attention</span>
              <span className="font-display text-[26px] leading-none font-bold text-ink num">82%</span>
            </div>
            {/* Two-tone meter: filled score against the remaining headroom */}
            <div className="mt-4 flex items-center gap-1.5" role="img" aria-label="Business health 82 out of 100">
              <span className="h-3 shrink-0 rounded-full bg-forest-900" style={{ width: "82%" }} />
              <span className="h-3 flex-1 rounded-full bg-lime-400" />
            </div>
            <p className="mt-3.5 text-2xs text-ink-3 leading-relaxed">
              Down 2.4 points — service backlog and two delayed projects are the drag.
            </p>
            <button
              onClick={() => navigate('/intelligence')}
              className="mt-3 text-2xs font-semibold text-accent hover:underline inline-flex items-center gap-1 self-start"
            >
              See what changed <ArrowRight size={11} />
            </button>
          </div>
        </Card>
      </div>

      {/* ---------- Row B · revenue chart + assistant ---------- */}
      <div className="grid gap-4 xl:grid-cols-12 mt-4">
        <Card className="xl:col-span-8 flex flex-col">
          <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-1 flex-wrap">
            <div>
              <h3 className="font-display text-[15px] font-semibold text-ink">Revenue vs Target</h3>
              <p className="text-2xs text-ink-3 mt-1">Last six months, billed revenue against plan</p>
              <div className="mt-3.5">
                <p className="text-2xs text-ink-3">Total billed</p>
                <p className="font-display text-[28px] leading-none font-bold text-ink num tracking-tight mt-1.5">
                  {inr(totalRevenue)}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <Dropdown
                width="w-44"
                trigger={({ toggle }) => (
                  <Button size="sm" variant="secondary" iconRight={<ChevronDown size={13} />} onClick={toggle}>
                    This year
                  </Button>
                )}
              >
                {(close) => (
                  <>
                    <MenuLabel>Range</MenuLabel>
                    {['This year', 'Last year', 'Last 6 months', 'Last quarter'].map((r) => (
                      <MenuItem key={r} active={r === 'This year'} onClick={() => { close(); demo(`Range set to ${r}`) }}>{r}</MenuItem>
                    ))}
                  </>
                )}
              </Dropdown>
              <Legend items={[
                { label: 'Revenue', color: CHART.brand },
                { label: 'Target', color: CHART.lime },
              ]} />
            </div>
          </div>

          <div className="px-3 pb-3 pt-2 flex-1">
            <ResponsiveContainer width="100%" height={286}>
              <BarChart data={revenueSeries} margin={{ top: 8, right: 8, left: -6, bottom: 0 }} barGap={6}>
                <CartesianGrid stroke={CHART.grid} vertical={false} />
                <XAxis dataKey="month" {...AXIS_PROPS} dy={6} />
                <YAxis {...AXIS_PROPS} tickFormatter={(v) => inr(v, { decimals: 0 })} width={54} />
                <RTooltip content={<ChartTooltip formatter={(v) => inr(v)} />} cursor={{ fill: CURSOR_FILL }} />
                <Bar dataKey="revenue" name="Revenue" fill={CHART.brand} radius={[8, 8, 8, 8]} barSize={22} />
                <Bar dataKey="target" name="Target" fill={CHART.lime} radius={[8, 8, 8, 8]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="px-5 py-3.5 border-t border-line/70 flex items-center justify-between gap-4 flex-wrap">
            <span className="text-2xs text-ink-2">
              August billed <span className="font-semibold text-ink num">₹48.6L</span> — the narrowest gap to target in six months.
            </span>
            <button onClick={() => navigate('/reports')} className="text-2xs font-semibold text-accent hover:underline inline-flex items-center gap-1">
              Revenue report <ArrowRight size={11} />
            </button>
          </div>
        </Card>

        {/* Brio assistant */}
        <Card className="xl:col-span-4 flex flex-col overflow-hidden">
          <CardHeader
            title="Brio Assistant"
            action={<IconButton label="Assistant options" size="sm" onClick={() => demo('Assistant settings')}><MoreHorizontal size={16} /></IconButton>}
          />
          <div className="px-5 pb-5 pt-1 flex-1 flex flex-col items-center text-center">
            {/* Living orb */}
            <div className="relative h-[92px] w-[92px] shrink-0">
              <span
                className="absolute inset-0 rounded-full animate-orb-spin"
                style={{ background: 'conic-gradient(from 0deg, #12352a, #8fd13f, #c2ec7e, #236e4c, #12352a)' }}
                aria-hidden
              />
              <span className="absolute inset-[7px] rounded-full bg-surface" aria-hidden />
              <span
                className="absolute inset-[14px] rounded-full"
                style={{ background: 'radial-gradient(circle at 34% 30%, #c2ec7e 0%, #8fd13f 42%, #236e4c 100%)' }}
                aria-hidden
              />
              <Sparkles size={22} className="absolute inset-0 m-auto text-white/90" />
            </div>

            <p className="mt-4 font-display text-[16px] font-bold text-ink">What can I help with?</p>

            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5">
              {ASSISTANT_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => navigate('/assistant')}
                  className="rounded-full bg-surface-muted px-3 py-1.5 text-[11px] font-medium text-ink-2 hover:bg-lime-100 hover:text-forest-800 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Composer */}
            <div className="mt-auto pt-5 w-full">
              <div className="rounded-2xl bg-surface-muted p-2.5 text-left">
                <button
                  onClick={() => navigate('/assistant')}
                  className="w-full flex items-center gap-2 px-1.5 py-1.5 text-[13px] text-ink-3 hover:text-ink-2 transition-colors"
                >
                  <Sparkles size={14} className="shrink-0 text-lime-600" />
                  Ask anything about your business…
                </button>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <IconButton label="Voice input" size="sm" onClick={() => demo('Voice input')}><Mic size={15} /></IconButton>
                    <IconButton label="Attach file" size="sm" onClick={() => demo('Attach a file')}><Paperclip size={15} /></IconButton>
                  </div>
                  <Button size="sm" variant="accent" iconRight={<ArrowUpRight size={13} />} onClick={() => navigate('/assistant')}>
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* ---------- Row C · deals, health mix, renewals ---------- */}
      <div className="grid gap-4 xl:grid-cols-12 mt-4">
        {/* Deals closing next */}
        <Card className="xl:col-span-6 flex flex-col">
          <CardHeader
            title="Closing Next"
            subtitle="Open opportunities by expected close date"
            action={
              <Button size="xs" variant="subtle" iconRight={<ArrowRight size={12} />} onClick={() => navigate('/pipeline')}>
                Pipeline
              </Button>
            }
          />
          <div className="px-2 pb-2 pt-1 flex-1 overflow-x-auto scroll-thin">
            <table className="w-full min-w-[520px]">
              <thead>
                <tr className="text-left">
                  {['Opportunity', 'Owner', 'Closes', 'Value', 'Stage'].map((h) => (
                    <th key={h} className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_DEALS.map((d) => (
                  <tr
                    key={d.id}
                    onClick={() => navigate('/pipeline')}
                    className="cursor-pointer group"
                  >
                    <td className="px-3 py-2.5 rounded-l-xl group-hover:bg-surface-muted transition-colors">
                      <p className="text-[13px] font-semibold text-ink leading-tight truncate max-w-[190px]">{d.title}</p>
                      <p className="text-2xs text-ink-3 mt-0.5 truncate max-w-[190px]">{d.customer}</p>
                    </td>
                    <td className="px-3 py-2.5 group-hover:bg-surface-muted transition-colors">
                      <span className="inline-flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-forest-100 text-forest-800 text-[9px] font-bold inline-flex items-center justify-center shrink-0">
                          {initials(d.owner)}
                        </span>
                        <span className="text-2xs text-ink-2 truncate max-w-[84px]">{d.owner}</span>
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-2xs text-ink-2 num whitespace-nowrap group-hover:bg-surface-muted transition-colors">
                      {fmtDateShort(d.expectedClose)}
                    </td>
                    <td className="px-3 py-2.5 text-[13px] font-semibold text-ink num whitespace-nowrap group-hover:bg-surface-muted transition-colors">
                      {inr(d.value)}
                    </td>
                    <td className="px-3 py-2.5 rounded-r-xl group-hover:bg-surface-muted transition-colors">
                      <Badge tone={STAGE_TONE[d.stage] ?? 'neutral'} size="xs">{d.stage}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Customer health mix */}
        <Card className="xl:col-span-3 flex flex-col">
          <CardHeader title="Customer Health" subtitle={`${num(HEALTH_TOTAL)} active accounts`} />
          <div className="px-3 pt-0 pb-1">
            <ResponsiveContainer width="100%" height={168}>
              <PieChart>
                <Pie
                  data={customerHealth}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={52}
                  outerRadius={76}
                  paddingAngle={3}
                  stroke="#fff"
                  strokeWidth={3}
                  cornerRadius={6}
                >
                  {customerHealth.map((c) => (
                    <Cell key={c.name} fill={c.fill} />
                  ))}
                </Pie>
                <RTooltip content={<ChartTooltip formatter={(v) => `${num(v)} accounts`} />} />
                <text x="50%" y="46%" textAnchor="middle" className="fill-ink font-display" style={{ fontSize: 22, fontWeight: 700 }}>
                  63%
                </text>
                <text x="50%" y="60%" textAnchor="middle" className="fill-ink-3" style={{ fontSize: 10 }}>
                  healthy
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="px-5 pb-5 pt-1 space-y-2">
            {customerHealth.map((c) => (
              <li key={c.name} className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: c.fill }} />
                <span className="text-2xs text-ink-2 flex-1 truncate">{c.name}</span>
                <span className="text-2xs font-semibold text-ink num">{num(c.value)}</span>
                <span className="text-[10px] font-semibold text-ink-3 num w-9 text-right">
                  {Math.round((c.value / HEALTH_TOTAL) * 100)}%
                </span>
              </li>
            ))}
          </ul>
        </Card>

        {/* AMC renewals */}
        <Card className="xl:col-span-3 flex flex-col">
          <CardHeader
            title="AMC Renewals"
            action={<Badge tone="warning" size="xs">90 days</Badge>}
          />
          <div className="px-5 pb-5 pt-1 flex-1 flex flex-col">
            <div className="rounded-2xl bg-forest-900 p-4 relative overflow-hidden">
              <span
                className="absolute -top-8 -right-6 h-24 w-24 rounded-full animate-drift"
                style={{ background: 'radial-gradient(circle, rgba(168,224,90,.34) 0%, transparent 68%)' }}
                aria-hidden
              />
              <p className="relative text-2xs text-white/60">Contract value at renewal</p>
              <p className="relative mt-2 font-display text-[26px] leading-none font-bold text-white num tracking-tight">
                {inr(renewalTotal)}
              </p>
              <p className="relative mt-2 text-2xs text-lime-300 font-medium">6 accounts · 3 with open escalations</p>
            </div>

            <ul className="mt-4 space-y-2.5 flex-1">
              {RENEWAL_BUCKETS.map((b) => (
                <li key={b.window} className="flex items-center justify-between gap-3">
                  <span className="min-w-0">
                    <span className="block text-2xs font-medium text-ink truncate">{b.window}</span>
                    <span className="block text-[10px] text-ink-3">{b.accounts} accounts</span>
                  </span>
                  <span className="text-[13px] font-semibold text-ink num shrink-0">{inr(b.value)}</span>
                </li>
              ))}
            </ul>

            <Button
              block
              size="md"
              variant="accent"
              className="mt-4"
              icon={<RefreshCw size={14} />}
              onClick={() => navigate('/customers')}
            >
              Start renewal plays
            </Button>
          </div>
        </Card>
      </div>

      {/* ---------- AI brief ---------- */}
      <div className="mt-8">
        <AiBriefPanel />
      </div>

      {/* ---------- Business health & alerts ---------- */}
      <section className="mt-8">
        <SectionTitle
          title="Business Health & Alerts"
          subtitle="Risks detected across service, delivery, commercial and people signals"
          icon={<ShieldAlert size={18} />}
          action={
            <Button size="sm" variant="secondary" onClick={() => navigate('/intelligence')} iconRight={<ArrowRight size={13} />}>
              Management intelligence
            </Button>
          }
        />
        <HealthAlertGrid />
      </section>

      {/* ---------- Employee health + daily brief ---------- */}
      <div className="grid gap-4 xl:grid-cols-12 mt-8">
        <Card className="xl:col-span-8 flex flex-col">
          <CardHeader
            title="Employee Health"
            subtitle="Health index, engagement and workload trend"
            action={<Legend items={[
              { label: 'Health', color: CHART.brand },
              { label: 'Engagement', color: CHART.lime },
              { label: 'Workload', color: CHART.warning },
            ]} />}
          />
          <div className="px-3 pb-2 pt-1 flex-1">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={employeeHealthSeries} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="healthFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART.brand} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={CHART.brand} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={CHART.grid} vertical={false} />
                <XAxis dataKey="month" {...AXIS_PROPS} dy={6} />
                <YAxis {...AXIS_PROPS} domain={[60, 100]} width={40} />
                <RTooltip content={<ChartTooltip />} cursor={{ stroke: CHART.brandFaint }} />
                <Area type="monotone" dataKey="health" name="Health" stroke={CHART.brand} strokeWidth={2.5} fill="url(#healthFill)" />
                <Line type="monotone" dataKey="engagement" name="Engagement" stroke={CHART.lime} strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="workload" name="Workload" stroke={CHART.warning} strokeWidth={2} strokeDasharray="4 3" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="px-5 py-3.5 border-t border-line/70 flex items-center justify-between gap-4 flex-wrap">
            <span className="text-2xs text-ink-2">
              Workload has risen for four consecutive months — engagement is holding but health gains are flattening.
            </span>
            <button onClick={() => navigate('/feedback')} className="text-2xs font-semibold text-accent hover:underline inline-flex items-center gap-1 shrink-0">
              Feedback intelligence <ArrowRight size={11} />
            </button>
          </div>
        </Card>

        <Card className="xl:col-span-4 flex flex-col">
          <CardHeader
            title="Daily Management Brief"
            subtitle="Friday, 22 August 2026"
            action={<Badge tone="bronze" size="xs">6 items</Badge>}
          />
          <ul className="px-3 pb-1 pt-1 flex-1 space-y-0.5">
            {dailyBrief.map((d) => {
              const dot = {
                info: 'bg-info', danger: 'bg-danger', warning: 'bg-warning', success: 'bg-lime-500',
              }[d.tone]
              return (
                <li key={d.id}>
                  <button
                    onClick={() => navigate(d.module)}
                    className="w-full flex items-start gap-2.5 rounded-xl px-2.5 py-2.5 text-left hover:bg-surface-muted transition-colors group"
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
          <div className="p-4 pt-2">
            <Button block size="md" variant="secondary" onClick={() => navigate('/brief')} iconRight={<ArrowRight size={13} />}>
              View all actions
            </Button>
          </div>
        </Card>
      </div>

      {/* ---------- Department scorecards ---------- */}
      <section className="mt-8">
        <SectionTitle
          title="Department Scorecards"
          subtitle="Performance, workload and risk posture across the organisation"
          icon={<Gauge size={18} />}
          action={
            <Button size="sm" variant="secondary" onClick={() => navigate('/intelligence')} iconRight={<ArrowRight size={13} />}>
              Full breakdown
            </Button>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {DEPARTMENTS.map((d) => (
            <Card key={d.name} className="p-5 hover:shadow-lift hover:-translate-y-0.5 transition-[box-shadow,transform] duration-200">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display text-[15px] font-semibold text-ink">{d.name}</p>
                  <p className="text-2xs text-ink-3 mt-0.5 truncate">{d.head} · {d.headcount} people</p>
                </div>
                <ScoreRing value={d.performance} size={48} />
              </div>
              <div className="mt-4 space-y-3">
                <Progress label="Workload" value={d.workload} showValue tone={d.workload > 90 ? 'danger' : d.workload > 80 ? 'warning' : 'brand'} size="sm" />
                <Progress label="Engagement" value={d.engagement} showValue tone="auto" size="sm" />
              </div>
              <div className="mt-4 pt-3.5 border-t border-line/70 flex items-center justify-between">
                <span className="text-2xs text-ink-3">Risk</span>
                <Badge tone={d.risk === 'High' ? 'danger' : d.risk === 'Medium' ? 'warning' : 'success'} dot size="xs">
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
