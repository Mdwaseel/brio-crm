import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ScrollText, ChevronRight, Download, ShieldCheck, Filter, Clock } from 'lucide-react'
import {
  PageHeader, Card, Button, Input, Select, Badge, Avatar, DataTable, CellPrimary, useToast,
  Alert, MiniKpi,
} from '@/components/ui'
import { auditLogs } from '@/data/analytics'
import { fmtDateTime, relTime } from '@/lib/utils'

const EXTENDED = [
  ...auditLogs,
  { id: 'AU-9', actor: 'Kiran Das', action: 'Updated ticket status', target: 'TKT-1052 — Skyline Group', module: 'Service', ip: '49.207.11.240', time: '2026-08-21T11:15:00+05:30' },
  { id: 'AU-10', actor: 'Anita Roy', action: 'Created quotation', target: 'QT-3044 — Metro Living', module: 'Quotations', ip: '117.216.9.32', time: '2026-08-20T14:22:00+05:30' },
  { id: 'AU-11', actor: 'Venkatesh Jagabathina', action: 'Signed in', target: 'Web · Chrome on Windows', module: 'Security', ip: '103.21.58.14', time: '2026-08-20T08:55:00+05:30' },
  { id: 'AU-12', actor: 'System', action: 'Executed workflow', target: 'WF-06 — Employee feedback pulse', module: 'Automation', ip: '—', time: '2026-08-15T10:00:00+05:30' },
  { id: 'AU-13', actor: 'Meera Nair', action: 'Reassigned engineer', target: 'TKT-1049 — Vertex Infra', module: 'Service', ip: '117.96.44.9', time: '2026-08-21T12:40:00+05:30' },
  { id: 'AU-14', actor: 'Tanvi Desai', action: 'Adjusted stock', target: 'ESC-HDC-02 — Handrail drive chain', module: 'Inventory', ip: '106.51.77.19', time: '2026-08-21T09:05:00+05:30' },
]

export function AuditLogs() {
  const { demo } = useToast()
  const [query, setQuery] = useState('')
  const [module, setModule] = useState('all')
  const [actor, setActor] = useState('all')

  const modules = Array.from(new Set(EXTENDED.map((l) => l.module)))
  const actors = Array.from(new Set(EXTENDED.map((l) => l.actor)))

  const filtered = useMemo(
    () =>
      EXTENDED.filter((l) => {
        const q = query.trim().toLowerCase()
        return (
          (!q || (l.actor + l.action + l.target).toLowerCase().includes(q)) &&
          (module === 'all' || l.module === module) &&
          (actor === 'all' || l.actor === actor)
        )
      }),
    [query, module, actor],
  )

  return (
    <>
      <PageHeader
        breadcrumb={
          <nav className="flex items-center gap-1.5 text-2xs text-ink-3" aria-label="Breadcrumb">
            <Link to="/settings" className="hover:text-brand-700 transition-colors">Settings</Link>
            <ChevronRight size={12} />
            <span className="text-ink-2 font-medium">Audit Logs</span>
          </nav>
        }
        title="Audit Logs"
        subtitle="An immutable record of every change made in this workspace."
        actions={
          <>
            <Button size="md" variant="secondary" icon={<Filter size={14} />} onClick={() => demo('Advanced filters')}>Advanced filters</Button>
            <Button size="md" variant="primary" icon={<Download size={14} />} onClick={() => demo('Exporting audit trail')}>Export</Button>
          </>
        }
      />

      <div className="grid gap-3.5 grid-cols-2 lg:grid-cols-4">
        <MiniKpi label="Events today" value="248" icon={<ScrollText size={13} />} sub="Across 13 modules" />
        <MiniKpi label="Sign-ins" value="41" tone="success" icon={<ShieldCheck size={13} />} sub="No failed attempts" />
        <MiniKpi label="Setting changes" value="6" tone="warning" icon={<Filter size={13} />} sub="All by Super Admin" />
        <MiniKpi label="Retention" value="7 years" icon={<Clock size={13} />} sub="Immutable storage" />
      </div>

      <div className="mt-5">
        <Alert tone="info" icon={<ShieldCheck size={16} />} title="Audit logs cannot be edited or deleted">
          Entries are written append-only and retained for the full retention period, independent of record
          deletion. Exports are watermarked with the requesting user and timestamp.
        </Alert>
      </div>

      <Card className="mt-5 overflow-hidden">
        <div className="p-3.5 border-b border-line flex flex-wrap items-center gap-2.5">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} icon={<Search size={15} />}
            placeholder="Search actions, records or users…" aria-label="Search audit logs" className="w-full sm:w-72" />
          <Select value={module} onChange={(e) => setModule(e.target.value)} aria-label="Filter by module" className="w-auto min-w-[140px]">
            <option value="all">All modules</option>
            {modules.map((m) => <option key={m}>{m}</option>)}
          </Select>
          <Select value={actor} onChange={(e) => setActor(e.target.value)} aria-label="Filter by user" className="w-auto min-w-[150px]">
            <option value="all">All users</option>
            {actors.map((a) => <option key={a}>{a}</option>)}
          </Select>
          <span className="ml-auto text-2xs text-ink-3 num">{filtered.length} events</span>
        </div>

        <DataTable
          rows={filtered}
          pageSize={10}
          onRowClick={() => demo('Opening event detail')}
          emptyTitle="No audit events match your filters"
          emptyDescription="Try a different module or clear the user filter."
          columns={[
            { key: 'actor', header: 'User', sortBy: (r) => r.actor, render: (r) => (
              <CellPrimary
                icon={
                  r.actor === 'System'
                    ? <span className="h-8 w-8 rounded-lg bg-brand-50 text-brand-700 inline-flex items-center justify-center shrink-0"><ScrollText size={14} /></span>
                    : <Avatar name={r.actor} size="md" />
                }
                title={r.actor}
                sub={<span className="num">{r.ip}</span>}
              />
            ) },
            { key: 'action', header: 'Action', sortBy: (r) => r.action, render: (r) => <span className="text-[13px] font-medium text-ink">{r.action}</span> },
            { key: 'target', header: 'Record', hideBelow: 'md', render: (r) => <span className="text-[13px] text-ink-2">{r.target}</span> },
            { key: 'module', header: 'Module', hideBelow: 'lg', sortBy: (r) => r.module, render: (r) => <Badge tone="neutral">{r.module}</Badge> },
            { key: 'time', header: 'Timestamp', align: 'right', sortBy: (r) => r.time, render: (r) => (
              <div className="text-right">
                <p className="text-[13px] num text-ink-2">{fmtDateTime(r.time)}</p>
                <p className="text-2xs text-ink-3 num">{relTime(r.time)}</p>
              </div>
            ) },
          ]}
        />
      </Card>
    </>
  )
}
