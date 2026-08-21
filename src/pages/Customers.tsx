import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus, Search, Building2, HeartPulse, IndianRupee, RefreshCw, AlertTriangle, Download, LayoutGrid, Table2,
} from 'lucide-react'
import type { Customer } from '@/types'
import {
  PageHeader, KpiCard, Card, Button, Input, Select, Badge, StatusBadge, Avatar, DataTable,
  CellPrimary, Segmented, Progress, useToast, ScoreRing,
} from '@/components/ui'
import type { Column } from '@/components/ui'
import { customers, OWNERS } from '@/data/crm'
import { cn, inr, fmtDate } from '@/lib/utils'

export function Customers() {
  const { demo } = useToast()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [segment, setSegment] = useState('all')
  const [owner, setOwner] = useState('all')
  const [view, setView] = useState('table')

  const filtered = useMemo(
    () =>
      customers.filter((c) => {
        const q = query.trim().toLowerCase()
        return (
          (!q || (c.name + c.industry + c.city + c.id).toLowerCase().includes(q)) &&
          (status === 'all' || c.status === status) &&
          (segment === 'all' || c.segment === segment) &&
          (owner === 'all' || c.owner === owner)
        )
      }),
    [query, status, segment, owner],
  )

  const totalRevenue = customers.reduce((s, c) => s + c.revenue, 0)
  const totalAmc = customers.reduce((s, c) => s + c.amcValue, 0)
  const atRisk = customers.filter((c) => c.status === 'At Risk').length

  const columns: Column<Customer>[] = [
    {
      key: 'name', header: 'Customer', width: '24%', sortBy: (r) => r.name,
      render: (r) => (
        <CellPrimary
          icon={<Avatar name={r.name} size="md" />}
          title={r.name}
          sub={`${r.industry} · ${r.city}`}
        />
      ),
    },
    { key: 'segment', header: 'Segment', hideBelow: 'lg', sortBy: (r) => r.segment, render: (r) => <Badge tone="neutral">{r.segment}</Badge> },
    {
      key: 'owner', header: 'Account Owner', hideBelow: 'md', sortBy: (r) => r.owner,
      render: (r) => (
        <span className="inline-flex items-center gap-2">
          <Avatar name={r.owner} size="sm" />
          <span className="text-[13px] text-ink-2">{r.owner}</span>
        </span>
      ),
    },
    {
      key: 'health', header: 'Health', sortBy: (r) => r.health,
      render: (r) => (
        <div className="flex items-center gap-2">
          <div className="w-14"><Progress value={r.health} size="xs" tone="auto" /></div>
          <span className={cn('text-[13px] font-bold num',
            r.health >= 80 ? 'text-success' : r.health >= 65 ? 'text-brand-700' : 'text-danger')}>
            {r.health}
          </span>
        </div>
      ),
    },
    { key: 'revenue', header: 'Revenue', align: 'right', sortBy: (r) => r.revenue, render: (r) => <span className="text-[13px] font-semibold text-ink num">{inr(r.revenue)}</span> },
    { key: 'deals', header: 'Open Deals', align: 'right', hideBelow: 'xl', sortBy: (r) => r.openDealValue, render: (r) => <span className="text-[13px] num text-ink-2">{r.openDeals} · {inr(r.openDealValue)}</span> },
    { key: 'tickets', header: 'Tickets', align: 'right', hideBelow: 'lg', sortBy: (r) => r.openTickets, render: (r) => (
      <span className={cn('text-[13px] font-medium num', r.openTickets >= 5 ? 'text-danger' : 'text-ink-2')}>{r.openTickets}</span>
    ) },
    { key: 'amc', header: 'AMC Renewal', align: 'right', hideBelow: 'xl', sortBy: (r) => r.amcRenewal, render: (r) => (
      <div className="text-right">
        <p className="text-[13px] num text-ink">{inr(r.amcValue)}</p>
        <p className="text-2xs text-ink-3 num">{fmtDate(r.amcRenewal)}</p>
      </div>
    ) },
    { key: 'status', header: 'Status', sortBy: (r) => r.status, render: (r) => <StatusBadge status={r.status} /> },
  ]

  return (
    <>
      <PageHeader
        title="Customers"
        subtitle="Every account, contract and relationship signal in one register."
        actions={
          <>
            <Button size="md" variant="secondary" icon={<Download size={14} />} onClick={() => demo('Exporting customer list')}>Export</Button>
            <Button size="md" variant="primary" icon={<Plus size={14} />} onClick={() => demo('New customer')}>New Customer</Button>
          </>
        }
      />

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Active Customers" value="1,284" delta={5.6} icon={<Building2 size={15} />} hint="10 key accounts shown below" />
        <KpiCard label="Portfolio Revenue" value={inr(totalRevenue)} delta={11.2} icon={<IndianRupee size={15} />} hint="Trailing twelve months" />
        <KpiCard label="AMC Under Contract" value={inr(totalAmc)} delta={6.8} icon={<RefreshCw size={15} />} accent="bronze" hint="₹24.8L renewing within 90 days" />
        <KpiCard label="Accounts At Risk" value={String(atRisk)} delta={-1.2} invertDelta icon={<AlertTriangle size={15} />} accent="danger" hint="Health below 60 or 5+ open tickets" />
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="p-3.5 border-b border-line flex flex-wrap items-center gap-2.5">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} icon={<Search size={15} />}
            placeholder="Search customers…" aria-label="Search customers" className="w-full sm:w-64" />
          <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status" className="w-auto min-w-[130px]">
            <option value="all">All statuses</option>
            {['Active', 'Monitor', 'At Risk'].map((s) => <option key={s}>{s}</option>)}
          </Select>
          <Select value={segment} onChange={(e) => setSegment(e.target.value)} aria-label="Filter by segment" className="w-auto min-w-[130px]">
            <option value="all">All segments</option>
            {['Enterprise', 'Mid-Market', 'SMB'].map((s) => <option key={s}>{s}</option>)}
          </Select>
          <Select value={owner} onChange={(e) => setOwner(e.target.value)} aria-label="Filter by owner" className="w-auto min-w-[140px]">
            <option value="all">All owners</option>
            {OWNERS.map((o) => <option key={o}>{o}</option>)}
          </Select>
          <div className="ml-auto flex items-center gap-2.5">
            <span className="text-2xs text-ink-3 num">{filtered.length} accounts</span>
            <Segmented
              value={view}
              onChange={setView}
              options={[
                { id: 'table', label: 'Table', icon: <Table2 size={13} /> },
                { id: 'cards', label: 'Cards', icon: <LayoutGrid size={13} /> },
              ]}
            />
          </div>
        </div>

        {view === 'table' ? (
          <DataTable
            columns={columns}
            rows={filtered}
            onRowClick={(r) => navigate(`/customers/${r.id}`)}
            selectable
            pageSize={8}
            emptyTitle="No customers match your filters"
            emptyDescription="Try clearing the segment or owner filter to see more accounts."
          />
        ) : (
          <div className="p-4 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => navigate(`/customers/${c.id}`)}
                className="text-left bg-surface border border-line rounded-xl p-4 hover:shadow-md hover:border-line-strong hover:-translate-y-px transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <Avatar name={c.name} size="lg" />
                    <div className="min-w-0">
                      <p className="font-display text-[15px] font-semibold text-ink truncate">{c.name}</p>
                      <p className="text-2xs text-ink-3 mt-0.5">{c.industry} · {c.city}</p>
                      <div className="mt-2"><StatusBadge status={c.status} /></div>
                    </div>
                  </div>
                  <ScoreRing value={c.health} size={48} />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 pt-3 border-t border-line">
                  <div>
                    <p className="text-2xs text-ink-3">Revenue</p>
                    <p className="text-[13px] font-semibold text-ink num mt-0.5">{inr(c.revenue)}</p>
                  </div>
                  <div>
                    <p className="text-2xs text-ink-3">Open deals</p>
                    <p className="text-[13px] font-semibold text-ink num mt-0.5">{c.openDeals}</p>
                  </div>
                  <div>
                    <p className="text-2xs text-ink-3">Tickets</p>
                    <p className={cn('text-[13px] font-semibold num mt-0.5', c.openTickets >= 5 ? 'text-danger' : 'text-ink')}>{c.openTickets}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </Card>

      <div className="mt-6 flex items-center gap-2 text-2xs text-ink-3">
        <HeartPulse size={13} className="text-bronze-500" />
        Health is computed from revenue trend, ticket load, SLA performance, CSAT and renewal exposure.
      </div>
    </>
  )
}
