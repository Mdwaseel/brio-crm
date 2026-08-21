import { useState } from 'react'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  BarChart, Bar, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from 'recharts'
import {
  MessageSquareHeart, HeartHandshake, Users, Smile, ShieldCheck, Send, Lock, Star,
  TrendingUp, TrendingDown, Building2, Download,
} from 'lucide-react'
import {
  PageHeader, KpiCard, Card, CardHeader, ChartCard, Button, Badge, Avatar, Tabs, Progress,
  DataTable, useToast, Alert, StatusBadge, SectionTitle,
} from '@/components/ui'
import { CHART, AXIS_PROPS, ChartTooltip, Legend } from '@/components/charts/primitives'
import {
  feedbackThemes, pulseSurveys, anonymousFeedback, feedbackMatrix, customerFeedback,
} from '@/data/people'
import { satisfactionTrend, workloadBalance } from '@/data/analytics'
import { cn, fmtDate } from '@/lib/utils'

const TABS = [
  { id: 'pulse', label: 'Pulse Surveys' },
  { id: '360', label: '360 Feedback' },
  { id: 'anon', label: 'Anonymous Feedback' },
  { id: 'customer', label: 'Customer Feedback' },
  { id: 'insights', label: 'Insights' },
]

export function Feedback() {
  const { demo } = useToast()
  const [tab, setTab] = useState('pulse')

  const themeRadar = feedbackThemes.map((t) => ({ axis: t.theme, value: t.score }))

  return (
    <>
      <PageHeader
        title="Feedback Intelligence"
        subtitle="What your people are telling you — measured, themed and tracked over time."
        actions={
          <>
            <Button size="md" variant="secondary" icon={<Download size={14} />} onClick={() => demo('Exporting feedback report')}>Export</Button>
            <Button size="md" variant="primary" icon={<Send size={14} />} onClick={() => demo('Pulse survey scheduled')}>Send Pulse Survey</Button>
          </>
        }
      />

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Employee Health Index" value="86" delta={4.2} deltaSuffix=" pts" icon={<HeartHandshake size={15} />} accent="success" hint="Composite of 6 themes" />
        <KpiCard label="Engagement" value="91%" delta={4.2} icon={<Users size={15} />} accent="success" hint="August pulse survey" />
        <KpiCard label="Pulse Response" value="92%" delta={2.8} icon={<MessageSquareHeart size={15} />} hint="124 of 135 invited" />
        <KpiCard label="Overall Sentiment" value="Positive" delta={3.6} icon={<Smile size={15} />} accent="success" hint="72% positive · 19% neutral · 9% negative" />
      </div>

      <div className="grid gap-3.5 xl:grid-cols-3 mt-6">
        <ChartCard
          title="Employee Satisfaction Trend"
          subtitle="Six-month movement across the core feedback dimensions"
          className="xl:col-span-2"
          height={280}
          action={<Legend items={[
            { label: 'Satisfaction', color: CHART.brand },
            { label: 'Manager support', color: CHART.success },
            { label: 'Collaboration', color: CHART.bronze },
            { label: 'Growth', color: CHART.warning },
          ]} />}
        >
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={satisfactionTrend} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke={CHART.grid} vertical={false} />
              <XAxis dataKey="month" {...AXIS_PROPS} />
              <YAxis {...AXIS_PROPS} domain={[70, 95]} width={40} />
              <RTooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="satisfaction" name="Satisfaction" stroke={CHART.brand} strokeWidth={2.5} dot={{ r: 3, fill: '#fff', stroke: CHART.brand, strokeWidth: 2 }} />
              <Line type="monotone" dataKey="managerSupport" name="Manager support" stroke={CHART.success} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="collaboration" name="Collaboration" stroke={CHART.bronze} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="growth" name="Growth" stroke={CHART.warning} strokeWidth={2} strokeDasharray="4 3" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Theme Profile" subtitle="Current score across all six themes" height={280}>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={themeRadar} outerRadius="70%">
              <PolarGrid stroke={CHART.grid} />
              <PolarAngleAxis dataKey="axis" tick={{ fill: '#7c8b99', fontSize: 10 }} />
              <Radar name="Score" dataKey="value" stroke={CHART.brand} fill={CHART.brand} fillOpacity={0.18} strokeWidth={2} />
              <RTooltip content={<ChartTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Feedback themes */}
      <section className="mt-8">
        <SectionTitle
          title="Feedback Themes"
          subtitle="Where sentiment is strongest — and where it is deteriorating"
          icon={<MessageSquareHeart size={18} />}
        />
        <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
          {feedbackThemes.map((t) => (
            <Card key={t.theme} className="p-4 hover:border-line-strong transition-colors">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[14px] font-semibold text-ink">{t.theme}</p>
                <span className={cn('inline-flex items-center gap-1 text-2xs font-semibold num',
                  t.delta >= 0 ? 'text-success' : 'text-danger')}>
                  {t.delta >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {Math.abs(t.delta)} pts
                </span>
              </div>
              <div className="mt-3 flex items-end gap-2">
                <span className={cn('font-display text-[30px] font-bold leading-none num',
                  t.score >= 85 ? 'text-success' : t.score >= 75 ? 'text-brand-700' : 'text-warning')}>
                  {t.score}
                </span>
                <span className="text-2xs text-ink-3 pb-1">/ 100</span>
              </div>
              <div className="mt-3">
                <Progress value={t.score} tone={t.tone === 'danger' ? 'danger' : t.tone === 'warning' ? 'warning' : 'success'} size="sm" />
              </div>
              <p className="text-2xs text-ink-3 mt-2.5 num">{t.responses} responses this cycle</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <Card className="mt-8 overflow-hidden">
        <div className="px-4 pt-1">
          <Tabs value={tab} onChange={setTab} tabs={TABS} />
        </div>

        {tab === 'pulse' && (
          <>
            <div className="p-5 border-b border-line">
              <ChartCardless />
            </div>
            <DataTable
              rows={pulseSurveys}
              pageSize={8}
              onRowClick={() => demo('Opening survey results')}
              emptyTitle="No pulse surveys yet"
              emptyDescription="Schedule a pulse survey to start measuring employee sentiment."
              columns={[
                { key: 'name', header: 'Survey', sortBy: (r) => r.name, render: (r) => (
                  <div>
                    <p className="text-[13px] font-semibold text-ink">{r.name}</p>
                    <p className="text-2xs text-ink-3 num">{r.id} · sent {fmtDate(r.sent)}</p>
                  </div>
                ) },
                { key: 'responses', header: 'Responses', align: 'right', sortBy: (r) => r.responses, render: (r) => (
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 hidden sm:block"><Progress value={(r.responses / r.invited) * 100} size="xs" tone="brand" /></div>
                    <span className="text-[13px] num text-ink-2">{r.responses}/{r.invited}</span>
                  </div>
                ) },
                { key: 'score', header: 'Score', align: 'right', sortBy: (r) => r.score, render: (r) => (
                  <span className={cn('text-[13px] font-bold num', r.score >= 85 ? 'text-success' : 'text-brand-700')}>{r.score}</span>
                ) },
                { key: 'status', header: 'Status', align: 'right', render: (r) => (
                  <Badge tone={r.status === 'Active' ? 'info' : 'neutral'} dot>{r.status}</Badge>
                ) },
              ]}
            />
          </>
        )}

        {tab === '360' && (
          <>
            <div className="p-5 border-b border-line">
              <Alert tone="brand" icon={<ShieldCheck size={16} />} title="360 feedback matrix">
                Ratings are aggregated from self assessment, manager review, peer input, customer surveys and
                company-wide signals. Individual peer responses are never attributed.
              </Alert>
            </div>
            <div className="overflow-x-auto scroll-thin">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="bg-surface-muted border-b border-line">
                    {['Employee', 'Self', 'Manager', 'Peers', 'Customers', 'Company'].map((h, i) => (
                      <th key={h} className={cn('px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-ink-3', i === 0 ? 'text-left' : 'text-center')}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {feedbackMatrix.map((r) => (
                    <tr key={r.employee} className="border-b border-line last:border-0 hover:bg-brand-50/40 transition-colors">
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-2.5">
                          <Avatar name={r.employee} size="sm" />
                          <span className="text-[13px] font-medium text-ink">{r.employee}</span>
                        </span>
                      </td>
                      {(['self', 'manager', 'peers', 'customers', 'company'] as const).map((k) => (
                        <td key={k} className="px-4 py-3 text-center">
                          <span className={cn(
                            'inline-flex items-center justify-center h-7 w-10 rounded-md text-[13px] font-bold num',
                            r[k] >= 85 ? 'bg-success-soft text-success-ink'
                              : r[k] >= 75 ? 'bg-brand-50 text-brand-700'
                              : 'bg-warning-soft text-warning-ink',
                          )}>
                            {r[k]}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'anon' && (
          <>
            <div className="p-5 border-b border-line">
              <Alert tone="info" icon={<Lock size={16} />} title="Individual responses are protected">
                Anonymous feedback is aggregated at department level. Responses are never linked to an
                individual, and departments with fewer than five responses are suppressed entirely.
              </Alert>
            </div>
            <ul className="p-4 grid gap-3 sm:grid-cols-2">
              {anonymousFeedback.map((f) => (
                <li key={f.id} className="rounded-xl border border-line p-4 hover:border-line-strong transition-colors">
                  <div className="flex items-center justify-between gap-3">
                    <Badge tone="neutral">{f.department}</Badge>
                    <Badge tone={f.sentiment === 'Positive' ? 'success' : f.sentiment === 'Negative' ? 'danger' : 'neutral'} dot>
                      {f.sentiment}
                    </Badge>
                  </div>
                  <p className="text-[13px] text-ink-2 mt-3 leading-relaxed">“{f.text}”</p>
                  <div className="mt-3 pt-3 border-t border-line flex items-center justify-between">
                    <span className="text-2xs text-ink-3">Theme: <span className="font-medium text-ink-2">{f.theme}</span></span>
                    <span className="text-2xs text-ink-3 num">{fmtDate(f.time)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {tab === 'customer' && (
          <DataTable
            rows={customerFeedback}
            pageSize={8}
            onRowClick={() => demo('Opening feedback detail')}
            emptyTitle="No customer feedback recorded"
            emptyDescription="Survey responses from customers will appear here."
            columns={[
              { key: 'customer', header: 'Customer', sortBy: (r) => r.customer, render: (r) => (
                <span className="inline-flex items-center gap-2.5">
                  <span className="h-8 w-8 rounded-lg bg-brand-50 text-brand-700 inline-flex items-center justify-center shrink-0"><Building2 size={15} /></span>
                  <span>
                    <span className="block text-[13px] font-semibold text-ink">{r.customer}</span>
                    <span className="block text-2xs text-ink-3">{r.contact}</span>
                  </span>
                </span>
              ) },
              { key: 'module', header: 'Module', hideBelow: 'md', render: (r) => <Badge tone="neutral">{r.module}</Badge> },
              { key: 'score', header: 'Rating', sortBy: (r) => r.score, render: (r) => (
                <span className="inline-flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className={i < r.score ? 'text-bronze-500 fill-bronze-500' : 'text-line-strong'} />
                  ))}
                </span>
              ) },
              { key: 'text', header: 'Comment', hideBelow: 'lg', render: (r) => (
                <span className="text-[13px] text-ink-2 line-clamp-1">“{r.text}”</span>
              ) },
              { key: 'sentiment', header: 'Sentiment', align: 'right', render: (r) => <StatusBadge status={r.sentiment} /> },
              { key: 'time', header: 'Date', align: 'right', hideBelow: 'xl', sortBy: (r) => r.time, render: (r) => <span className="num text-2xs text-ink-3">{fmtDate(r.time)}</span> },
            ]}
          />
        )}

        {tab === 'insights' && (
          <div className="p-5 grid gap-3.5 lg:grid-cols-2">
            <Card>
              <CardHeader title="Workload Balance" subtitle="The single largest driver of the current sentiment decline" />
              <div className="p-4 pt-5">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={workloadBalance} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
                    <CartesianGrid stroke={CHART.grid} horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} {...AXIS_PROPS} />
                    <YAxis type="category" dataKey="name" {...AXIS_PROPS} width={92}
                      tickFormatter={(v: string) => v.split(' ')[0]} />
                    <RTooltip content={<ChartTooltip formatter={(v) => `${v}% capacity`} />} cursor={{ fill: 'rgba(35,74,103,.05)' }} />
                    <Bar dataKey="workload" name="Workload" radius={[0, 4, 4, 0]} barSize={16}>
                      {workloadBalance.map((w) => (
                        <Cell key={w.name} fill={w.workload >= 90 ? CHART.danger : w.workload >= 80 ? CHART.warning : CHART.brand} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <CardHeader title="What the data suggests" subtitle="Generated from the last three feedback cycles" />
              <div className="p-5 space-y-3">
                {[
                  { tone: 'danger' as const, t: 'Workload balance has fallen 5.6 points', d: 'Service engineers account for 68% of the negative responses on this theme. Three of them are above 90% capacity.' },
                  { tone: 'warning' as const, t: 'Growth opportunities slipping', d: 'Field and project engineers both cite unclear progression criteria. Score down 1.4 points.' },
                  { tone: 'success' as const, t: 'Manager support at an all-time high', d: 'Up 3.2 points following the shift to structured weekly reviews.' },
                  { tone: 'success' as const, t: 'Response rate is healthy', d: '92% participation gives high statistical confidence in these results.' },
                ].map((i) => (
                  <div key={i.t} className={cn('rounded-xl border px-4 py-3',
                    i.tone === 'danger' ? 'border-danger/20 bg-danger-soft'
                      : i.tone === 'warning' ? 'border-warning/20 bg-warning-soft'
                      : 'border-success/20 bg-success-soft')}>
                    <p className={cn('text-[13px] font-semibold',
                      i.tone === 'danger' ? 'text-danger-ink' : i.tone === 'warning' ? 'text-warning-ink' : 'text-success-ink')}>
                      {i.t}
                    </p>
                    <p className="text-2xs mt-1 leading-relaxed opacity-90 text-ink-2">{i.d}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </Card>
    </>
  )
}

function ChartCardless() {
  return (
    <div className="grid gap-3.5 sm:grid-cols-3">
      {[
        { l: 'Active survey', v: 'August Pulse', s: 'Closes 29 Aug 2026' },
        { l: 'Response rate', v: '92%', s: '124 of 135 invited' },
        { l: 'Average score', v: '86', s: '+2 points vs July' },
      ].map((i) => (
        <div key={i.l} className="rounded-xl border border-line px-4 py-3.5">
          <p className="text-2xs text-ink-3 uppercase tracking-wide font-medium">{i.l}</p>
          <p className="font-display text-lg font-bold text-ink mt-1.5 num">{i.v}</p>
          <p className="text-2xs text-ink-3 mt-0.5">{i.s}</p>
        </div>
      ))}
    </div>
  )
}
