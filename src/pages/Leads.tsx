import { useMemo, useState } from 'react'
import {
  Plus, Upload, Search, SlidersHorizontal, Flame, Target, Timer, TrendingUp, UserPlus,
  Mail, Phone, MapPin, Building2, CalendarClock, StickyNote, CheckSquare, ArrowRight, Trash2, UserCheck,
} from 'lucide-react'
import type { Lead } from '@/types'
import {
  PageHeader, KpiCard, Card, Button, Input, Select, Badge, StatusBadge, Avatar, DataTable,
  CellPrimary, Drawer, DrawerSection, DescList, Timeline, Modal, Label, Textarea, useToast, Progress, Tabs,
} from '@/components/ui'
import type { Column, TimelineItem } from '@/components/ui'
import { leads, OWNERS } from '@/data/crm'
import { cn, inr, fmtDate, relTime } from '@/lib/utils'

const SOURCES = ['Website', 'Facebook Ads', 'Google Ads', 'Referral', 'Trade Show', 'Cold Outreach', 'IndiaMART', 'Partner']

function scoreTone(score: number) {
  if (score >= 85) return 'text-success'
  if (score >= 70) return 'text-brand-700'
  if (score >= 55) return 'text-warning'
  return 'text-ink-3'
}

const LEAD_TIMELINE: TimelineItem[] = [
  { id: 't1', title: 'Proposal shared', description: 'Commercial proposal for 14-unit modernisation sent for review.', time: '21 Aug', tone: 'brand', actor: 'Priya Sharma' },
  { id: 't2', title: 'Site survey completed', description: 'Technical team captured shaft dimensions across both towers.', time: '18 Aug', tone: 'success', actor: 'Sahil Khan' },
  { id: 't3', title: 'Discovery call', description: '45-minute call covering scope, budget range and decision timeline.', time: '12 Aug', tone: 'info', actor: 'Priya Sharma' },
  { id: 't4', title: 'Lead qualified', description: 'Score moved from 61 to 92 after budget confirmation from the CFO.', time: '08 Aug', tone: 'bronze', actor: 'System · WF-01' },
  { id: 't5', title: 'Lead captured', description: 'Inbound enquiry from the website contact form.', time: '04 Aug', tone: 'neutral', actor: 'System' },
]

export function Leads() {
  const { demo } = useToast()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [source, setSource] = useState('all')
  const [owner, setOwner] = useState('all')
  const [selected, setSelected] = useState<Lead | null>(null)
  const [drawerTab, setDrawerTab] = useState('overview')
  const [newOpen, setNewOpen] = useState(false)

  const filtered = useMemo(
    () =>
      leads.filter((l) => {
        const q = query.trim().toLowerCase()
        const matchQ = !q || (l.name + l.company + l.email + l.id).toLowerCase().includes(q)
        return (
          matchQ &&
          (status === 'all' || l.status === status) &&
          (source === 'all' || l.source === source) &&
          (owner === 'all' || l.owner === owner)
        )
      }),
    [query, status, source, owner],
  )

  const columns: Column<Lead>[] = [
    {
      key: 'lead', header: 'Lead', width: '22%', sortBy: (r) => r.name,
      render: (r) => <CellPrimary icon={<Avatar name={r.name} size="md" />} title={r.name} sub={r.title} />,
    },
    {
      key: 'company', header: 'Company', sortBy: (r) => r.company,
      render: (r) => (
        <div>
          <p className="text-[13px] font-medium text-ink">{r.company}</p>
          <p className="text-2xs text-ink-3">{r.city} · {inr(r.value)}</p>
        </div>
      ),
    },
    { key: 'source', header: 'Source', hideBelow: 'lg', sortBy: (r) => r.source, render: (r) => <Badge tone="neutral">{r.source}</Badge> },
    {
      key: 'owner', header: 'Owner', hideBelow: 'md', sortBy: (r) => r.owner,
      render: (r) => (
        <span className="inline-flex items-center gap-2">
          <Avatar name={r.owner} size="sm" />
          <span className="text-[13px] text-ink-2">{r.owner}</span>
        </span>
      ),
    },
    {
      key: 'score', header: 'Score', align: 'right', sortBy: (r) => r.score,
      render: (r) => (
        <div className="flex items-center justify-end gap-2">
          <div className="w-12 hidden sm:block">
            <Progress value={r.score} size="xs" tone="auto" />
          </div>
          <span className={cn('text-[13px] font-bold num', scoreTone(r.score))}>{r.score}</span>
        </div>
      ),
    },
    { key: 'status', header: 'Status', sortBy: (r) => r.status, render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'last', header: 'Last Activity', hideBelow: 'xl', sortBy: (r) => r.lastActivity,
      render: (r) => <span className="text-2xs text-ink-3 num">{relTime(r.lastActivity)}</span>,
    },
    {
      key: 'next', header: 'Next Follow-up', hideBelow: 'lg', align: 'right', sortBy: (r) => r.nextFollowUp,
      render: (r) => {
        const overdue = r.nextFollowUp <= '2026-08-22'
        return (
          <span className={cn('text-2xs num font-medium', overdue ? 'text-danger' : 'text-ink-2')}>
            {fmtDate(r.nextFollowUp)}
          </span>
        )
      },
    },
  ]

  const hot = leads.filter((l) => l.status === 'Hot').length
  const qualified = leads.filter((l) => l.status === 'Qualified').length

  return (
    <>
      <PageHeader
        title="Leads"
        subtitle="Capture, score and convert demand across every acquisition channel."
        actions={
          <>
            <Button size="md" variant="secondary" icon={<Upload size={14} />} onClick={() => demo('Import leads')}>Import</Button>
            <Button size="md" variant="primary" icon={<Plus size={14} />} onClick={() => setNewOpen(true)}>New Lead</Button>
          </>
        }
      />

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard label="New Leads" value="18" delta={14.2} icon={<UserPlus size={15} />} hint="Captured in the last 7 days" />
        <KpiCard label="Qualified" value={String(qualified)} delta={9.6} icon={<Target size={15} />} hint="Moved to qualified this month" />
        <KpiCard label="Hot Leads" value={String(hot)} delta={22.4} icon={<Flame size={15} />} accent="warning" hint="Score above 85 with active intent" />
        <KpiCard label="Conversion Rate" value="26.4%" delta={3.1} icon={<TrendingUp size={15} />} accent="success" hint="Lead to qualified opportunity" />
        <KpiCard label="Avg Response Time" value="4.2h" delta={-8.5} invertDelta icon={<Timer size={15} />} accent="warning" hint="Target is under 4 hours" />
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="p-3.5 border-b border-line flex flex-wrap items-center gap-2.5">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={<Search size={15} />}
            placeholder="Search leads, companies or IDs…"
            aria-label="Search leads"
            className="w-full sm:w-72"
          />
          <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status" className="w-auto min-w-[130px]">
            <option value="all">All statuses</option>
            {['New', 'Contacted', 'Qualified', 'Hot', 'Cold'].map((s) => <option key={s}>{s}</option>)}
          </Select>
          <Select value={source} onChange={(e) => setSource(e.target.value)} aria-label="Filter by source" className="w-auto min-w-[140px]">
            <option value="all">All sources</option>
            {SOURCES.map((s) => <option key={s}>{s}</option>)}
          </Select>
          <Select value={owner} onChange={(e) => setOwner(e.target.value)} aria-label="Filter by owner" className="w-auto min-w-[140px]">
            <option value="all">All owners</option>
            {OWNERS.map((o) => <option key={o}>{o}</option>)}
          </Select>
          <Button size="md" variant="ghost" icon={<SlidersHorizontal size={14} />} onClick={() => demo('Advanced filters')}>
            More filters
          </Button>
          <span className="ml-auto text-2xs text-ink-3 num">{filtered.length} of {leads.length} leads</span>
        </div>

        <DataTable
          columns={columns}
          rows={filtered}
          onRowClick={(r) => { setSelected(r); setDrawerTab('overview') }}
          selectable
          pageSize={8}
          emptyTitle="No leads match your filters"
          emptyDescription="Adjust the search, status or owner filters to widen the result set."
          emptyAction={<Button size="sm" variant="secondary" onClick={() => { setQuery(''); setStatus('all'); setSource('all'); setOwner('all') }}>Clear filters</Button>}
          bulkActions={(rows, clear) => (
            <>
              <Button size="xs" variant="secondary" icon={<UserCheck size={12} />} onClick={() => { demo(`Reassigning ${rows.length} leads`); clear() }}>
                Assign
              </Button>
              <Button size="xs" variant="secondary" icon={<Mail size={12} />} onClick={() => { demo('Sequence queued'); clear() }}>
                Add to sequence
              </Button>
              <Button size="xs" variant="danger" icon={<Trash2 size={12} />} onClick={() => { demo('Delete requires approval'); clear() }}>
                Delete
              </Button>
            </>
          )}
        />
      </Card>

      {/* Detail drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        width="lg"
        header={
          selected && (
            <div className="flex items-start gap-3 min-w-0">
              <Avatar name={selected.name} size="lg" />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-display text-lg font-semibold text-ink leading-tight">{selected.name}</h2>
                  <StatusBadge status={selected.status} />
                </div>
                <p className="text-[13px] text-ink-2 mt-0.5">{selected.title} · {selected.company}</p>
                <p className="text-2xs text-ink-3 mt-1 num">{selected.id} · created {fmtDate(selected.createdAt)}</p>
              </div>
            </div>
          )
        }
        footer={
          <>
            <Button variant="primary" size="md" icon={<ArrowRight size={14} />} onClick={() => demo('Converting lead to opportunity')}>
              Convert to deal
            </Button>
            <Button variant="secondary" size="md" icon={<CalendarClock size={14} />} onClick={() => demo('Follow-up scheduled')}>
              Schedule follow-up
            </Button>
            <Button variant="ghost" size="md" icon={<Mail size={14} />} onClick={() => demo('Composing email')} className="ml-auto">
              Email
            </Button>
          </>
        }
      >
        {selected && (
          <>
            <div className="px-5 pt-4">
              <Tabs
                value={drawerTab}
                onChange={setDrawerTab}
                tabs={[
                  { id: 'overview', label: 'Overview' },
                  { id: 'timeline', label: 'Timeline', count: LEAD_TIMELINE.length },
                  { id: 'tasks', label: 'Tasks', count: 3 },
                  { id: 'notes', label: 'Notes', count: 1 },
                ]}
              />
            </div>

            {drawerTab === 'overview' && (
              <>
                <DrawerSection title="Lead score">
                  <div className="flex items-center gap-5">
                    <div className="flex-1">
                      <div className="flex items-end gap-2">
                        <span className={cn('font-display text-[32px] font-bold leading-none num', scoreTone(selected.score))}>
                          {selected.score}
                        </span>
                        <span className="text-2xs text-ink-3 pb-1">/ 100</span>
                      </div>
                      <div className="mt-3">
                        <Progress value={selected.score} tone="auto" />
                      </div>
                      <p className="text-2xs text-ink-3 mt-2.5 leading-relaxed">
                        Scored on engagement recency, budget confirmation, decision authority and fit with the target segment.
                      </p>
                    </div>
                    <div className="w-40 shrink-0 space-y-2">
                      {[
                        { label: 'Engagement', v: 88 },
                        { label: 'Budget fit', v: 94 },
                        { label: 'Authority', v: 90 },
                        { label: 'Timeline', v: 76 },
                      ].map((f) => (
                        <Progress key={f.label} label={f.label} value={f.v} showValue size="xs" tone="brand" />
                      ))}
                    </div>
                  </div>
                </DrawerSection>

                <DrawerSection title="Lead information">
                  <DescList
                    items={[
                      { label: 'Company', value: <span className="inline-flex items-center gap-1.5"><Building2 size={13} className="text-ink-3" />{selected.company}</span> },
                      { label: 'Source', value: <Badge tone="neutral">{selected.source}</Badge> },
                      { label: 'Owner', value: <span className="inline-flex items-center gap-1.5"><Avatar name={selected.owner} size="xs" />{selected.owner}</span> },
                      { label: 'Estimated value', value: <span className="num">{inr(selected.value)}</span> },
                      { label: 'Next follow-up', value: <span className="num">{fmtDate(selected.nextFollowUp)}</span> },
                      { label: 'Last activity', value: <span className="num">{relTime(selected.lastActivity)}</span> },
                    ]}
                  />
                </DrawerSection>

                <DrawerSection title="Contact details">
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {[
                      { icon: Mail, label: selected.email },
                      { icon: Phone, label: selected.phone },
                      { icon: MapPin, label: selected.city },
                      { icon: Building2, label: selected.company },
                    ].map((c) => (
                      <div key={c.label} className="flex items-center gap-2.5 rounded-lg border border-line bg-surface-muted px-3 py-2.5">
                        <c.icon size={14} className="text-ink-3 shrink-0" />
                        <span className="text-[13px] text-ink truncate">{c.label}</span>
                      </div>
                    ))}
                  </div>
                </DrawerSection>

                <DrawerSection title="Notes">
                  <p className="text-[13px] text-ink-2 leading-relaxed">{selected.notes}</p>
                </DrawerSection>
              </>
            )}

            {drawerTab === 'timeline' && (
              <DrawerSection title="Activity timeline">
                <Timeline items={LEAD_TIMELINE} />
              </DrawerSection>
            )}

            {drawerTab === 'tasks' && (
              <DrawerSection
                title="Open tasks"
                action={<Button size="xs" variant="secondary" icon={<Plus size={11} />} onClick={() => demo('New task')}>Add task</Button>}
              >
                <ul className="space-y-2">
                  {[
                    { t: 'Send revised commercial with AMC bundled', due: '23 Aug', owner: selected.owner, done: false },
                    { t: 'Confirm site access window with facilities', due: '25 Aug', owner: 'Sahil Khan', done: false },
                    { t: 'Share reference case study — Prime Estates', due: '20 Aug', owner: selected.owner, done: true },
                  ].map((t) => (
                    <li key={t.t} className="flex items-start gap-3 rounded-lg border border-line px-3.5 py-3 hover:border-line-strong transition-colors">
                      <CheckSquare size={15} className={cn('mt-0.5 shrink-0', t.done ? 'text-success' : 'text-ink-3')} />
                      <div className="min-w-0 flex-1">
                        <p className={cn('text-[13px] text-ink leading-snug', t.done && 'line-through text-ink-3')}>{t.t}</p>
                        <p className="text-2xs text-ink-3 mt-1">Due {t.due} · {t.owner}</p>
                      </div>
                      {t.done ? <Badge tone="success">Done</Badge> : <Badge tone="warning">Open</Badge>}
                    </li>
                  ))}
                </ul>
              </DrawerSection>
            )}

            {drawerTab === 'notes' && (
              <DrawerSection title="Notes">
                <div className="rounded-lg border border-line bg-surface-muted p-4">
                  <div className="flex items-start gap-2.5">
                    <StickyNote size={15} className="text-bronze-500 mt-0.5" />
                    <div>
                      <p className="text-[13px] text-ink leading-relaxed">{selected.notes}</p>
                      <p className="text-2xs text-ink-3 mt-2">{selected.owner} · {relTime(selected.lastActivity)}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3.5">
                  <Textarea placeholder="Add a note about this lead…" aria-label="New note" />
                  <div className="flex justify-end mt-2">
                    <Button size="sm" variant="primary" onClick={() => demo('Note saved')}>Save note</Button>
                  </div>
                </div>
              </DrawerSection>
            )}
          </>
        )}
      </Drawer>

      {/* New lead modal */}
      <Modal
        open={newOpen}
        onClose={() => setNewOpen(false)}
        title="New Lead"
        subtitle="Capture a new enquiry and route it to the right owner"
        icon={<UserPlus size={17} />}
        footer={
          <>
            <Button variant="ghost" onClick={() => setNewOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => { setNewOpen(false); demo('Lead created') }}>Create lead</Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div><Label htmlFor="ln">Full name</Label><Input id="ln" placeholder="e.g. Rohan Kapoor" /></div>
          <div><Label htmlFor="lt">Designation</Label><Input id="lt" placeholder="e.g. Head of Facilities" /></div>
          <div><Label htmlFor="lc">Company</Label><Input id="lc" placeholder="e.g. Apex Elevators" /></div>
          <div><Label htmlFor="lcity">City</Label><Input id="lcity" placeholder="e.g. Mumbai" /></div>
          <div><Label htmlFor="le">Email</Label><Input id="le" type="email" placeholder="name@company.in" /></div>
          <div><Label htmlFor="lp">Phone</Label><Input id="lp" placeholder="+91 98200 00000" /></div>
          <div>
            <Label htmlFor="ls">Source</Label>
            <Select id="ls">{SOURCES.map((s) => <option key={s}>{s}</option>)}</Select>
          </div>
          <div>
            <Label htmlFor="lo">Owner</Label>
            <Select id="lo">{OWNERS.map((o) => <option key={o}>{o}</option>)}</Select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="lv" hint="Optional">Estimated value (₹)</Label>
            <Input id="lv" placeholder="1800000" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="lnote">Notes</Label>
            <Textarea id="lnote" placeholder="Context, requirement summary, next step…" />
          </div>
        </div>
      </Modal>
    </>
  )
}
