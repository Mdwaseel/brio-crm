import { useMemo, useState } from 'react'
import {
  Search, BarChart3, Download, Star, Clock, Filter, Calendar, ChevronDown, FileText,
  TrendingUp, Users, Building2, Headphones, HardHat, Package, IndianRupee, Gauge, Table2, PieChart,
} from 'lucide-react'
import {
  PageHeader, Card, CardHeader, Button, Input, Select, Badge, useToast, Dropdown, MenuItem,
  MenuLabel, EmptyState, Tabs, MiniKpi,
} from '@/components/ui'
import { reports, REPORT_CATEGORIES } from '@/data/analytics'
import { cn, fmtDate, num } from '@/lib/utils'

const CATEGORY_ICON: Record<string, typeof BarChart3> = {
  Sales: TrendingUp, Customers: Building2, Service: Headphones, Projects: HardHat,
  Inventory: Package, Employees: Users, Finance: IndianRupee, Management: Gauge,
}

const FORMAT_ICON: Record<string, typeof FileText> = {
  'Chart + Table': BarChart3, Table: Table2, Chart: PieChart, Scorecard: Gauge, Funnel: Filter,
}

export function Reports() {
  const { demo } = useToast()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [owner, setOwner] = useState('all')
  const [tab, setTab] = useState('all')

  const owners = Array.from(new Set(reports.map((r) => r.owner)))

  const filtered = useMemo(
    () =>
      reports.filter((r) => {
        const q = query.trim().toLowerCase()
        return (
          (!q || (r.name + r.description + r.category).toLowerCase().includes(q)) &&
          (category === 'all' || r.category === category) &&
          (owner === 'all' || r.owner === owner) &&
          (tab === 'all' || (tab === 'popular' ? r.views > 150 : r.updated >= '2026-08-20'))
        )
      }),
    [query, category, owner, tab],
  )

  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="Standard and management reporting across every part of the business."
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
                  <MenuLabel>Reporting period</MenuLabel>
                  {['This month', 'Last month', 'This quarter', 'Last 6 months', 'Financial year 26–27'].map((p) => (
                    <MenuItem key={p} active={p === 'This month'} onClick={() => { close(); demo(`Period set to ${p}`) }}>{p}</MenuItem>
                  ))}
                </>
              )}
            </Dropdown>
            <Button size="md" variant="secondary" icon={<Download size={14} />} onClick={() => demo('Exporting report pack')}>Export pack</Button>
            <Button size="md" variant="primary" icon={<BarChart3 size={14} />} onClick={() => demo('Report builder')}>Build Report</Button>
          </>
        }
      />

      <div className="grid gap-3.5 grid-cols-2 lg:grid-cols-4">
        <MiniKpi label="Reports available" value={String(reports.length)} icon={<FileText size={13} />} sub="Across 8 categories" />
        <MiniKpi label="Views this month" value={num(reports.reduce((s, r) => s + r.views, 0))} tone="success" icon={<Star size={13} />} sub="+18% vs July" />
        <MiniKpi label="Scheduled deliveries" value="9" icon={<Clock size={13} />} sub="Weekly and monthly cadence" />
        <MiniKpi label="Last refresh" value="09:12" icon={<Calendar size={13} />} sub="Today, automatic nightly build" />
      </div>

      {/* Category strip */}
      <div className="mt-6 flex gap-2.5 overflow-x-auto scroll-thin pb-1">
        <button
          onClick={() => setCategory('all')}
          className={cn(
            'shrink-0 inline-flex items-center gap-2 h-9 px-3.5 rounded-lg border text-[13px] font-medium transition-colors',
            category === 'all' ? 'bg-brand-700 text-white border-brand-700' : 'bg-surface border-line text-ink-2 hover:border-line-strong',
          )}
        >
          All categories
          <span className="text-2xs num opacity-70">{reports.length}</span>
        </button>
        {REPORT_CATEGORIES.map((c) => {
          const Icon = CATEGORY_ICON[c]
          const count = reports.filter((r) => r.category === c).length
          return (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                'shrink-0 inline-flex items-center gap-2 h-9 px-3.5 rounded-lg border text-[13px] font-medium transition-colors',
                category === c ? 'bg-brand-700 text-white border-brand-700' : 'bg-surface border-line text-ink-2 hover:border-line-strong',
              )}
            >
              <Icon size={14} />
              {c}
              <span className="text-2xs num opacity-70">{count}</span>
            </button>
          )
        })}
      </div>

      <Card className="mt-4 overflow-hidden">
        <div className="px-4 pt-1">
          <Tabs
            value={tab}
            onChange={setTab}
            tabs={[
              { id: 'all', label: 'All reports', count: reports.length },
              { id: 'popular', label: 'Most viewed' },
              { id: 'recent', label: 'Recently updated' },
            ]}
          />
        </div>

        <div className="p-3.5 border-b border-line flex flex-wrap items-center gap-2.5">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} icon={<Search size={15} />}
            placeholder="Search reports…" aria-label="Search reports" className="w-full sm:w-72" />
          <Select value={owner} onChange={(e) => setOwner(e.target.value)} aria-label="Filter by owner" className="w-auto min-w-[150px]">
            <option value="all">All owners</option>
            {owners.map((o) => <option key={o}>{o}</option>)}
          </Select>
          <Button size="md" variant="ghost" icon={<Filter size={14} />} onClick={() => demo('Advanced filters')}>More filters</Button>
          <span className="ml-auto text-2xs text-ink-3 num">{filtered.length} reports</span>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={<BarChart3 size={20} />}
            title="No reports match your filters"
            description="Try a different category, or clear the search to see the full catalogue."
            action={<Button size="sm" variant="secondary" onClick={() => { setQuery(''); setCategory('all'); setOwner('all'); setTab('all') }}>Clear filters</Button>}
          />
        ) : (
          <div className="p-4 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((r) => {
              const Icon = CATEGORY_ICON[r.category] ?? BarChart3
              const FIcon = FORMAT_ICON[r.format] ?? FileText
              return (
                <article
                  key={r.id}
                  className="border border-line rounded-xl overflow-hidden flex flex-col hover:shadow-md hover:border-line-strong hover:-translate-y-px transition-all duration-200"
                >
                  <div className="p-4 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <span className="h-9 w-9 rounded-lg bg-brand-50 text-brand-700 inline-flex items-center justify-center shrink-0">
                        <Icon size={16} />
                      </span>
                      <Badge tone="neutral">{r.category}</Badge>
                    </div>
                    <h3 className="font-display text-[15px] font-semibold text-ink mt-3.5 leading-snug">{r.name}</h3>
                    <p className="text-[13px] text-ink-2 mt-1.5 leading-relaxed">{r.description}</p>
                    <div className="mt-3.5 flex items-center gap-3 flex-wrap text-2xs text-ink-3">
                      <span className="inline-flex items-center gap-1"><FIcon size={11} />{r.format}</span>
                      <span className="inline-flex items-center gap-1 num"><Star size={11} />{r.views} views</span>
                      <span className="inline-flex items-center gap-1 num"><Clock size={11} />{fmtDate(r.updated)}</span>
                    </div>
                  </div>
                  <div className="px-4 py-2.5 border-t border-line bg-surface-muted/60 flex items-center justify-between gap-3">
                    <span className="text-2xs text-ink-3 truncate">Owner: {r.owner}</span>
                    <span className="flex items-center gap-2 shrink-0">
                      <button onClick={() => demo(`Exporting ${r.name}`)} aria-label={`Download ${r.name}`}
                        className="h-7 w-7 rounded-md inline-flex items-center justify-center text-ink-3 hover:text-ink hover:bg-surface-sunken transition-colors">
                        <Download size={13} />
                      </button>
                      <Button size="xs" variant="secondary" onClick={() => demo(`Opening ${r.name}`)}>Open</Button>
                    </span>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </Card>

      <Card className="mt-6">
        <CardHeader
          title="Scheduled Deliveries"
          subtitle="Reports automatically distributed by the automation engine"
          action={<Button size="sm" variant="secondary" onClick={() => demo('Managing schedules')}>Manage schedules</Button>}
        />
        <div className="p-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {[
            { n: 'Company Health Scorecard', c: 'Every Monday, 08:00 IST', r: 'Leadership group · 6 recipients' },
            { n: 'SLA Report', c: 'Every Monday, 08:00 IST', r: 'Service managers · 4 recipients' },
            { n: 'Pipeline Report', c: 'Every Friday, 17:00 IST', r: 'Sales team · 11 recipients' },
            { n: 'Receivables Ageing', c: '1st of each month', r: 'Finance · 3 recipients' },
            { n: 'Inventory Health', c: 'Every Wednesday, 09:00 IST', r: 'Supply chain · 5 recipients' },
            { n: 'Feedback Insights', c: 'Monthly, after pulse close', r: 'Department heads · 5 recipients' },
          ].map((s) => (
            <div key={s.n} className="rounded-xl border border-line px-4 py-3.5 hover:border-line-strong transition-colors">
              <p className="text-[13px] font-semibold text-ink">{s.n}</p>
              <p className="text-2xs text-ink-3 mt-1.5 inline-flex items-center gap-1.5"><Clock size={11} />{s.c}</p>
              <p className="text-2xs text-ink-3 mt-1">{s.r}</p>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}
