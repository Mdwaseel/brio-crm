import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
} from 'recharts'
import {
  ChevronRight, Building2, Globe, MapPin, Users2, Calendar, Mail, Phone, Star, Download,
  Plus, MessageSquare, FileText, HardHat, Headphones, RefreshCw, Receipt, Activity, Paperclip,
  ArrowLeft, Sparkles, TrendingUp,
} from 'lucide-react'
import {
  PageHeader, Card, CardHeader, Button, Badge, StatusBadge, Avatar, Tabs, Progress, ScoreRing,
  Timeline, DataTable, CellPrimary, EmptyState, useToast, DescList, Alert, MiniKpi,
} from '@/components/ui'
import type { TimelineItem } from '@/components/ui'
import { customers, deals, quotations } from '@/data/crm'
import { tickets, projects } from '@/data/operations'
import { invoices } from '@/data/analytics'
import { CHART, AXIS_PROPS, ChartTooltip } from '@/components/charts/primitives'
import { cn, inr, inrFull, fmtDate, relTime } from '@/lib/utils'

const TABS = [
  { id: 'overview', label: 'Overview', icon: <Activity size={14} /> },
  { id: 'contacts', label: 'Contacts', icon: <Users2 size={14} /> },
  { id: 'deals', label: 'Deals', icon: <TrendingUp size={14} /> },
  { id: 'quotations', label: 'Quotations', icon: <FileText size={14} /> },
  { id: 'projects', label: 'Projects', icon: <HardHat size={14} /> },
  { id: 'tickets', label: 'Tickets', icon: <Headphones size={14} /> },
  { id: 'amc', label: 'AMC', icon: <RefreshCw size={14} /> },
  { id: 'invoices', label: 'Invoices', icon: <Receipt size={14} /> },
  { id: 'activities', label: 'Activities', icon: <MessageSquare size={14} /> },
  { id: 'documents', label: 'Documents', icon: <Paperclip size={14} /> },
]

const ACCOUNT_TIMELINE: TimelineItem[] = [
  { id: 'a1', title: 'Follow-up completed', description: 'Quarterly business review held with the facilities and finance teams.', time: '21 Aug', tone: 'success', actor: 'Priya Sharma' },
  { id: 'a2', title: 'Payment received', description: 'Invoice INV-9021 settled in full — ₹18,50,000.', time: '18 Aug', tone: 'success', actor: 'Finance' },
  { id: 'a3', title: 'Service ticket opened', description: 'TKT-1051 — AMC quarterly inspection scheduled for 6 units.', time: '20 Aug', tone: 'warning', actor: 'Rahul Verma' },
  { id: 'a4', title: 'Project started', description: 'PRJ-208 Apex House Modernisation moved into the control panel replacement phase.', time: '12 Aug', tone: 'brand', actor: 'Priya Sharma' },
  { id: 'a5', title: 'Quotation sent', description: 'QT-3041 shared for the 14-unit modernisation package — ₹18,00,000.', time: '12 Aug', tone: 'info', actor: 'Priya Sharma' },
  { id: 'a6', title: 'Deal created', description: 'DL-501 Tower A modernisation added to the pipeline at proposal stage.', time: '12 Jul', tone: 'brand', actor: 'Priya Sharma' },
  { id: 'a7', title: 'Lead created', description: 'Inbound website enquiry from Rohan Kapoor, Head of Facilities.', time: '04 Jul', tone: 'neutral', actor: 'System' },
]

const revenueTrend = [
  { month: 'Mar', revenue: 620000 },
  { month: 'Apr', revenue: 740000 },
  { month: 'May', revenue: 680000 },
  { month: 'Jun', revenue: 910000 },
  { month: 'Jul', revenue: 860000 },
  { month: 'Aug', revenue: 1180000 },
]

export function Customer360() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { demo } = useToast()
  const [tab, setTab] = useState('overview')

  const customer = customers.find((c) => c.id === id)

  if (!customer) {
    return (
      <EmptyState
        icon={<Building2 size={20} />}
        title="Customer not found"
        description="This account may have been merged or archived."
        action={<Button variant="primary" onClick={() => navigate('/customers')}>Back to customers</Button>}
      />
    )
  }

  const custDeals = deals.filter((d) => d.customer === customer.name)
  const custQuotes = quotations.filter((q) => q.customer === customer.name)
  const custTickets = tickets.filter((t) => t.customer === customer.name)
  const custProjects = projects.filter((p) => p.customer === customer.name)
  const custInvoices = invoices.filter((i) => i.customer === customer.name)

  const counts: Record<string, number> = {
    contacts: customer.contacts.length,
    deals: custDeals.length,
    quotations: custQuotes.length,
    projects: custProjects.length,
    tickets: custTickets.length,
    invoices: custInvoices.length,
  }

  return (
    <>
      <PageHeader
        breadcrumb={
          <nav className="flex items-center gap-1.5 text-2xs text-ink-3" aria-label="Breadcrumb">
            <Link to="/customers" className="hover:text-brand-700 transition-colors">Customers</Link>
            <ChevronRight size={12} />
            <span className="text-ink-2 font-medium">{customer.name}</span>
          </nav>
        }
        title={customer.name}
        actions={
          <>
            <Button size="md" variant="ghost" icon={<ArrowLeft size={14} />} onClick={() => navigate('/customers')}>Back</Button>
            <Button size="md" variant="secondary" icon={<Download size={14} />} onClick={() => demo('Exporting account summary')}>Export</Button>
            <Button size="md" variant="secondary" icon={<MessageSquare size={14} />} onClick={() => demo('Logging activity')}>Log activity</Button>
            <Button size="md" variant="primary" icon={<Plus size={14} />} onClick={() => demo('New deal')}>New Deal</Button>
          </>
        }
      />

      {/* Account header card */}
      <Card className="overflow-hidden">
        <div className="p-5 flex flex-wrap items-start gap-6">
          <div className="flex items-start gap-4 min-w-0 flex-1">
            <Avatar name={customer.name} size="xl" />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display text-xl font-bold text-ink">{customer.name}</h2>
                <StatusBadge status={customer.status} />
                <Badge tone="neutral">{customer.segment}</Badge>
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-2xs text-ink-2">
                <span className="inline-flex items-center gap-1.5"><Building2 size={12} className="text-ink-3" />{customer.industry}</span>
                <span className="inline-flex items-center gap-1.5"><MapPin size={12} className="text-ink-3" />{customer.city}</span>
                <span className="inline-flex items-center gap-1.5"><Users2 size={12} className="text-ink-3" />{customer.employees} employees</span>
                <span className="inline-flex items-center gap-1.5"><Globe size={12} className="text-ink-3" />{customer.website}</span>
                <span className="inline-flex items-center gap-1.5"><Calendar size={12} className="text-ink-3" />Customer since {fmtDate(customer.since)}</span>
              </div>
              <div className="mt-3.5 flex items-center gap-2.5">
                <Avatar name={customer.owner} size="sm" />
                <div>
                  <p className="text-2xs text-ink-3">Account owner</p>
                  <p className="text-[13px] font-medium text-ink">{customer.owner}</p>
                </div>
                <span className="w-px h-8 bg-line mx-2" />
                <div>
                  <p className="text-2xs text-ink-3">CSAT</p>
                  <p className="text-[13px] font-medium text-ink num inline-flex items-center gap-1">
                    <Star size={12} className="text-bronze-500 fill-bronze-500" />{customer.csat} / 5
                  </p>
                </div>
                <span className="w-px h-8 bg-line mx-2" />
                <div>
                  <p className="text-2xs text-ink-3">GSTIN</p>
                  <p className="text-[13px] font-medium text-ink num">{customer.gstin}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 shrink-0">
            <div className="text-center">
              <ScoreRing value={customer.health} size={78} label="Health" />
              <p className="text-2xs text-ink-3 mt-2">Account health</p>
            </div>
          </div>
        </div>

        <div className="px-5">
          <Tabs
            value={tab}
            onChange={setTab}
            tabs={TABS.map((t) => ({ ...t, count: counts[t.id] }))}
          />
        </div>
      </Card>

      {/* Tab content */}
      <div className="mt-5">
        {tab === 'overview' && (
          <>
            <div className="grid gap-3.5 grid-cols-2 lg:grid-cols-6">
              <MiniKpi label="Health" value={`${customer.health}%`} tone={customer.health >= 80 ? 'success' : 'warning'} sub="+3.2 pts this quarter" />
              <MiniKpi label="Revenue" value={inr(customer.revenue)} sub="Trailing 12 months" />
              <MiniKpi label="Open Deals" value={`${customer.openDeals}`} sub={inr(customer.openDealValue)} />
              <MiniKpi label="Open Tickets" value={`${customer.openTickets}`} tone={customer.openTickets >= 5 ? 'danger' : 'neutral'} sub="2 high priority" />
              <MiniKpi label="AMC Value" value={inr(customer.amcValue)} tone="warning" sub={`Renews ${fmtDate(customer.amcRenewal)}`} />
              <MiniKpi label="Last Activity" value={relTime(customer.lastActivity)} sub="Quarterly business review" />
            </div>

            <div className="grid gap-3.5 xl:grid-cols-3 mt-3.5">
              <Card className="xl:col-span-2 flex flex-col">
                <CardHeader title="Revenue Trend" subtitle="Billed revenue over the last six months" />
                <div className="p-4 pt-5 flex-1">
                  <ResponsiveContainer width="100%" height={230}>
                    <AreaChart data={revenueTrend} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                      <defs>
                        <linearGradient id="c360" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={CHART.brand} stopOpacity={0.2} />
                          <stop offset="100%" stopColor={CHART.brand} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke={CHART.grid} vertical={false} />
                      <XAxis dataKey="month" {...AXIS_PROPS} />
                      <YAxis {...AXIS_PROPS} tickFormatter={(v) => inr(v, { decimals: 0 })} width={52} />
                      <RTooltip content={<ChartTooltip formatter={(v) => inr(v)} />} />
                      <Area type="monotone" dataKey="revenue" name="Revenue" stroke={CHART.brand} strokeWidth={2.5} fill="url(#c360)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card>
                <CardHeader title="Account Summary" icon={<Sparkles size={15} />} />
                <div className="p-5">
                  <Alert tone="brand" title="Relationship is strong and expanding">
                    Revenue is up 37% year on year and the modernisation programme adds ₹18L of committed value.
                    Two open service tickets are within SLA. Renewal exposure of {inr(customer.amcValue)} falls due in{' '}
                    {fmtDate(customer.amcRenewal)} — start the renewal play 60 days ahead.
                  </Alert>
                  <div className="mt-4">
                    <DescList
                      cols={2}
                      items={[
                        { label: 'Segment', value: customer.segment },
                        { label: 'Industry', value: customer.industry },
                        { label: 'Open deal value', value: <span className="num">{inr(customer.openDealValue)}</span> },
                        { label: 'AMC value', value: <span className="num">{inr(customer.amcValue)}</span> },
                        { label: 'Lifetime revenue', value: <span className="num">{inrFull(customer.revenue)}</span> },
                        { label: 'Primary contact', value: customer.contacts[0]?.name ?? '—' },
                      ]}
                    />
                  </div>
                </div>
              </Card>
            </div>

            <Card className="mt-3.5">
              <CardHeader
                title="Account Timeline"
                subtitle="Every commercial, delivery and service event on this account"
                action={<Button size="xs" variant="secondary" onClick={() => demo('Loading full history')}>Full history</Button>}
              />
              <div className="p-5">
                <Timeline items={ACCOUNT_TIMELINE} />
              </div>
            </Card>
          </>
        )}

        {tab === 'contacts' && (
          <Card>
            <CardHeader
              title="Contacts"
              subtitle={`${customer.contacts.length} people mapped on this account`}
              action={<Button size="sm" variant="secondary" icon={<Plus size={13} />} onClick={() => demo('New contact')}>Add contact</Button>}
            />
            <div className="p-4 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
              {customer.contacts.map((c) => (
                <div key={c.id} className="border border-line rounded-xl p-4 hover:border-line-strong hover:shadow-xs transition-all">
                  <div className="flex items-start gap-3">
                    <Avatar name={c.name} size="lg" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] font-semibold text-ink truncate">{c.name}</p>
                        {c.primary && <Badge tone="brand" size="xs">Primary</Badge>}
                      </div>
                      <p className="text-2xs text-ink-3 mt-0.5">{c.role}</p>
                    </div>
                  </div>
                  <div className="mt-3.5 space-y-2">
                    <a href={`mailto:${c.email}`} className="flex items-center gap-2 text-2xs text-ink-2 hover:text-brand-700 transition-colors">
                      <Mail size={12} className="text-ink-3" /><span className="truncate">{c.email}</span>
                    </a>
                    <span className="flex items-center gap-2 text-2xs text-ink-2">
                      <Phone size={12} className="text-ink-3" />{c.phone}
                    </span>
                  </div>
                  <div className="mt-3.5 pt-3 border-t border-line flex gap-2">
                    <Button size="xs" variant="secondary" block onClick={() => demo('Composing email')}>Email</Button>
                    <Button size="xs" variant="ghost" block onClick={() => demo('Logging call')}>Log call</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {tab === 'deals' && (
          <Card className="overflow-hidden">
            <CardHeader title="Deals" subtitle={`${custDeals.length} opportunities linked to this account`} />
            <DataTable
              rows={custDeals}
              onRowClick={() => navigate('/pipeline')}
              pageSize={8}
              emptyTitle="No deals on this account"
              emptyDescription="Create an opportunity to start tracking commercial progress."
              columns={[
                { key: 'title', header: 'Deal', sortBy: (r) => r.title, render: (r) => <CellPrimary title={r.title} sub={r.id} /> },
                { key: 'value', header: 'Value', align: 'right', sortBy: (r) => r.value, render: (r) => <span className="num font-semibold text-ink">{inr(r.value)}</span> },
                { key: 'stage', header: 'Stage', sortBy: (r) => r.stage, render: (r) => <StatusBadge status={r.stage} /> },
                { key: 'prob', header: 'Probability', align: 'right', hideBelow: 'md', sortBy: (r) => r.probability, render: (r) => <span className="num text-ink-2">{r.probability}%</span> },
                { key: 'owner', header: 'Owner', hideBelow: 'lg', render: (r) => <span className="inline-flex items-center gap-2"><Avatar name={r.owner} size="sm" /><span className="text-[13px]">{r.owner}</span></span> },
                { key: 'close', header: 'Expected Close', align: 'right', sortBy: (r) => r.expectedClose, render: (r) => <span className="num text-2xs text-ink-2">{fmtDate(r.expectedClose)}</span> },
              ]}
            />
          </Card>
        )}

        {tab === 'quotations' && (
          <Card className="overflow-hidden">
            <CardHeader title="Quotations" subtitle={`${custQuotes.length} quotations raised`} />
            <DataTable
              rows={custQuotes}
              onRowClick={() => navigate('/quotations')}
              pageSize={8}
              emptyTitle="No quotations yet"
              emptyDescription="Quotations raised for this account will appear here."
              columns={[
                { key: 'id', header: 'Quote ID', sortBy: (r) => r.id, render: (r) => <span className="num font-semibold text-brand-700">{r.id}</span> },
                { key: 'amount', header: 'Amount', align: 'right', sortBy: (r) => r.amount, render: (r) => <span className="num font-semibold text-ink">{inr(r.amount)}</span> },
                { key: 'owner', header: 'Owner', hideBelow: 'md', render: (r) => <span className="text-[13px]">{r.owner}</span> },
                { key: 'created', header: 'Created', hideBelow: 'lg', sortBy: (r) => r.created, render: (r) => <span className="num text-2xs text-ink-2">{fmtDate(r.created)}</span> },
                { key: 'valid', header: 'Valid Until', hideBelow: 'lg', sortBy: (r) => r.validUntil, render: (r) => <span className="num text-2xs text-ink-2">{fmtDate(r.validUntil)}</span> },
                { key: 'status', header: 'Status', align: 'right', sortBy: (r) => r.status, render: (r) => <StatusBadge status={r.status} /> },
              ]}
            />
          </Card>
        )}

        {tab === 'projects' && (
          <div className="grid gap-3.5 lg:grid-cols-2">
            {custProjects.length === 0 && (
              <Card className="lg:col-span-2">
                <EmptyState icon={<HardHat size={20} />} title="No projects for this account"
                  description="Delivery projects created from won deals will be listed here." compact />
              </Card>
            )}
            {custProjects.map((p) => (
              <Card key={p.id} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display text-[15px] font-semibold text-ink">{p.name}</p>
                    <p className="text-2xs text-ink-3 mt-0.5 num">{p.id} · {p.phase}</p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
                <div className="mt-4">
                  <Progress label="Progress" value={p.progress} showValue tone="auto" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 pt-3.5 border-t border-line">
                  <div><p className="text-2xs text-ink-3">Manager</p><p className="text-[13px] font-medium text-ink mt-0.5">{p.manager}</p></div>
                  <div><p className="text-2xs text-ink-3">Budget</p><p className="text-[13px] font-medium text-ink num mt-0.5">{inr(p.budget)}</p></div>
                  <div><p className="text-2xs text-ink-3">Due</p><p className="text-[13px] font-medium text-ink num mt-0.5">{fmtDate(p.end)}</p></div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === 'tickets' && (
          <Card className="overflow-hidden">
            <CardHeader title="Service Tickets" subtitle={`${custTickets.length} tickets logged against this account`} />
            <DataTable
              rows={custTickets}
              onRowClick={() => navigate('/service')}
              pageSize={8}
              emptyTitle="No service tickets"
              emptyDescription="This account has no logged service activity in the selected period."
              columns={[
                { key: 'id', header: 'Ticket', sortBy: (r) => r.id, render: (r) => <CellPrimary title={r.subject} sub={r.id} /> },
                { key: 'priority', header: 'Priority', sortBy: (r) => r.priority, render: (r) => <StatusBadge status={r.priority} /> },
                { key: 'eng', header: 'Engineer', hideBelow: 'md', render: (r) => <span className="inline-flex items-center gap-2"><Avatar name={r.engineer} size="sm" /><span className="text-[13px]">{r.engineer}</span></span> },
                { key: 'sla', header: 'SLA', align: 'right', hideBelow: 'lg', sortBy: (r) => r.slaHoursLeft, render: (r) => (
                  <span className={cn('num text-2xs font-semibold', r.slaHoursLeft < 2 ? 'text-danger' : r.slaHoursLeft < 6 ? 'text-warning' : 'text-ink-2')}>
                    {r.status === 'Resolved' ? '—' : `${r.slaHoursLeft}h left`}
                  </span>
                ) },
                { key: 'status', header: 'Status', align: 'right', sortBy: (r) => r.status, render: (r) => <StatusBadge status={r.status} /> },
              ]}
            />
          </Card>
        )}

        {tab === 'amc' && (
          <div className="grid gap-3.5 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader title="Annual Maintenance Contract" subtitle="Coverage, entitlements and renewal exposure" />
              <div className="p-5">
                <DescList
                  cols={3}
                  items={[
                    { label: 'Contract tier', value: 'Platinum' },
                    { label: 'Contract value', value: <span className="num">{inrFull(customer.amcValue)}</span> },
                    { label: 'Renewal date', value: <span className="num">{fmtDate(customer.amcRenewal)}</span> },
                    { label: 'Units covered', value: '14 units across 2 sites' },
                    { label: 'Response SLA', value: '4 hours (critical)' },
                    { label: 'Preventive visits', value: 'Quarterly · 4 per year' },
                    { label: 'Billing cycle', value: 'Quarterly in advance' },
                    { label: 'Contract owner', value: customer.owner },
                    { label: 'Auto-renewal', value: 'Disabled — manual approval' },
                  ]}
                />
                <div className="mt-5 pt-5 border-t border-line">
                  <p className="text-[13px] font-semibold text-ink mb-3">Entitlement consumption</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Progress label="Preventive visits" value={75} showValue tone="brand" />
                    <Progress label="Breakdown calls" value={42} showValue tone="success" />
                    <Progress label="Spare allowance" value={88} showValue tone="warning" />
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <CardHeader title="Renewal Play" icon={<RefreshCw size={15} />} />
              <div className="p-5 space-y-4">
                <Alert tone="warning" title="Renewal due in 84 days">
                  Start the renewal conversation now. Two open tickets should be closed before the commercial discussion.
                </Alert>
                <div className="space-y-2.5">
                  {['Close open service escalations', 'Prepare renewal quotation', 'Schedule commercial review', 'Confirm tier and unit count'].map((s, i) => (
                    <div key={s} className="flex items-center gap-2.5 rounded-lg border border-line px-3 py-2.5">
                      <span className="h-5 w-5 rounded-md bg-brand-50 text-brand-700 text-[10px] font-bold inline-flex items-center justify-center num">{i + 1}</span>
                      <span className="text-[13px] text-ink-2 flex-1">{s}</span>
                    </div>
                  ))}
                </div>
                <Button block variant="primary" onClick={() => demo('Renewal play started')}>Start renewal play</Button>
              </div>
            </Card>
          </div>
        )}

        {tab === 'invoices' && (
          <Card className="overflow-hidden">
            <CardHeader title="Invoices" subtitle="Billing and collection status" />
            <DataTable
              rows={custInvoices}
              pageSize={8}
              emptyTitle="No invoices raised"
              emptyDescription="Invoices generated for this account will appear here."
              columns={[
                { key: 'id', header: 'Invoice', render: (r) => <span className="num font-semibold text-brand-700">{r.id}</span> },
                { key: 'amount', header: 'Amount', align: 'right', sortBy: (r) => r.amount, render: (r) => <span className="num font-semibold text-ink">{inrFull(r.amount)}</span> },
                { key: 'issued', header: 'Issued', hideBelow: 'md', sortBy: (r) => r.issued, render: (r) => <span className="num text-2xs text-ink-2">{fmtDate(r.issued)}</span> },
                { key: 'due', header: 'Due', hideBelow: 'md', sortBy: (r) => r.due, render: (r) => <span className="num text-2xs text-ink-2">{fmtDate(r.due)}</span> },
                { key: 'status', header: 'Status', align: 'right', sortBy: (r) => r.status, render: (r) => <StatusBadge status={r.status} /> },
              ]}
            />
          </Card>
        )}

        {tab === 'activities' && (
          <Card>
            <CardHeader
              title="Activities"
              subtitle="Calls, meetings, emails and system events"
              action={<Button size="sm" variant="secondary" icon={<Plus size={13} />} onClick={() => demo('Logging activity')}>Log activity</Button>}
            />
            <div className="p-5">
              <Timeline items={ACCOUNT_TIMELINE} />
            </div>
          </Card>
        )}

        {tab === 'documents' && (
          <Card>
            <CardHeader
              title="Documents"
              subtitle="Contracts, drawings, certificates and correspondence"
              action={<Button size="sm" variant="secondary" icon={<Plus size={13} />} onClick={() => demo('Upload document')}>Upload</Button>}
            />
            <div className="p-4 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
              {[
                { name: 'AMC Agreement — Platinum 2026.pdf', size: '842 KB', date: '2026-07-28', kind: 'Contract' },
                { name: 'Shaft drawings — Tower A.dwg', size: '4.2 MB', date: '2026-08-18', kind: 'Drawing' },
                { name: 'Load test certificate 2026.pdf', size: '318 KB', date: '2026-06-14', kind: 'Certificate' },
                { name: 'Quotation QT-3041.pdf', size: '412 KB', date: '2026-08-12', kind: 'Commercial' },
                { name: 'Site survey report.pdf', size: '1.1 MB', date: '2026-08-18', kind: 'Report' },
                { name: 'Handover checklist — Tower B.xlsx', size: '96 KB', date: '2026-05-30', kind: 'Delivery' },
              ].map((d) => (
                <button
                  key={d.name}
                  onClick={() => demo('Opening document')}
                  className="flex items-start gap-3 border border-line rounded-xl p-3.5 text-left hover:border-line-strong hover:shadow-xs transition-all"
                >
                  <span className="h-9 w-9 rounded-lg bg-brand-50 text-brand-700 inline-flex items-center justify-center shrink-0">
                    <FileText size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-medium text-ink truncate">{d.name}</span>
                    <span className="block text-2xs text-ink-3 mt-0.5 num">{d.kind} · {d.size} · {fmtDate(d.date)}</span>
                  </span>
                </button>
              ))}
            </div>
          </Card>
        )}
      </div>
    </>
  )
}
