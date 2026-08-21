import { useState } from 'react'
import {
  Plus, Zap, Play, Pause, ArrowDown, Filter, CheckCircle2, Clock, Activity, Search,
  GitBranch, Bell, ClipboardList, Mail, UserPlus, FileText, Package, BarChart3, Settings2,
} from 'lucide-react'
import type { Workflow } from '@/types'
import {
  PageHeader, KpiCard, Card, Button, Input, Select, Badge, Avatar, Toggle,
  Modal, Label, Textarea, useToast, SectionTitle, Alert, Tabs,
} from '@/components/ui'
import { workflows } from '@/data/analytics'
import { cn, relTime, num } from '@/lib/utils'

const CATEGORY_ICON: Record<string, typeof Zap> = {
  Sales: GitBranch, Service: Bell, Customers: UserPlus, Inventory: Package,
  Management: BarChart3, People: ClipboardList, Projects: ClipboardList,
}

const TRIGGERS = [
  'New lead is created', 'Deal stage changes', 'Ticket SLA threshold reached',
  'AMC contract nears expiry', 'Stock falls below reorder point', 'Milestone becomes overdue',
  'Quotation submitted for approval', 'Scheduled — recurring',
]

const ACTIONS = [
  { icon: UserPlus, label: 'Assign to user or team' },
  { icon: Bell, label: 'Send notification' },
  { icon: ClipboardList, label: 'Create task' },
  { icon: Mail, label: 'Send email' },
  { icon: FileText, label: 'Generate document' },
  { icon: Zap, label: 'Update record field' },
]

export function Automation() {
  const { demo } = useToast()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [builderOpen, setBuilderOpen] = useState(false)
  const [tab, setTab] = useState('workflows')
  const [states, setStates] = useState<Record<string, boolean>>(
    Object.fromEntries(workflows.map((w) => [w.id, w.active])),
  )

  const categories = Array.from(new Set(workflows.map((w) => w.category)))
  const filtered = workflows.filter(
    (w) =>
      (!query || (w.name + w.when + w.category).toLowerCase().includes(query.toLowerCase())) &&
      (category === 'all' || w.category === category),
  )

  const activeCount = Object.values(states).filter(Boolean).length
  const totalRuns = workflows.reduce((s, w) => s + w.runs30d, 0)

  return (
    <>
      <PageHeader
        title="Automation Engine"
        subtitle="Turn business events into actions — routing, escalation and follow-through without manual chasing."
        actions={
          <>
            <Button size="md" variant="secondary" icon={<Activity size={14} />} onClick={() => demo('Opening run history')}>Run history</Button>
            <Button size="md" variant="primary" icon={<Plus size={14} />} onClick={() => setBuilderOpen(true)}>New Workflow</Button>
          </>
        }
      />

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Active Workflows" value={String(activeCount)} delta={14.3} icon={<Zap size={15} />} hint={`${workflows.length} configured in total`} />
        <KpiCard label="Runs (30 days)" value={num(totalRuns)} delta={22.8} icon={<Play size={15} />} accent="success" hint="Across all active workflows" />
        <KpiCard label="Actions Automated" value="1,842" delta={18.6} icon={<CheckCircle2 size={15} />} accent="success" hint="Assignments, tasks and notifications" />
        <KpiCard label="Hours Saved" value="164h" delta={26.4} icon={<Clock size={15} />} accent="bronze" hint="Estimated manual effort avoided" />
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="px-4 pt-1">
          <Tabs
            value={tab}
            onChange={setTab}
            tabs={[
              { id: 'workflows', label: 'Workflows', count: workflows.length },
              { id: 'library', label: 'Template Library', count: 12 },
            ]}
          />
        </div>

        {tab === 'workflows' && (
          <div className="p-3.5 border-b border-line flex flex-wrap items-center gap-2.5">
            <Input value={query} onChange={(e) => setQuery(e.target.value)} icon={<Search size={15} />}
              placeholder="Search workflows…" aria-label="Search workflows" className="w-full sm:w-64" />
            <Select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category" className="w-auto min-w-[150px]">
              <option value="all">All categories</option>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </Select>
            <span className="ml-auto text-2xs text-ink-3 num">{filtered.length} workflows</span>
          </div>
        )}

        {tab === 'workflows' ? (
          <div className="p-4 grid gap-3.5 lg:grid-cols-2 xl:grid-cols-3">
            {filtered.map((w) => (
              <WorkflowCard
                key={w.id}
                workflow={w}
                active={states[w.id]}
                onToggle={(v) => {
                  setStates((s) => ({ ...s, [w.id]: v }))
                  demo(v ? `${w.name} activated` : `${w.name} paused`)
                }}
                onEdit={() => setBuilderOpen(true)}
              />
            ))}
          </div>
        ) : (
          <div className="p-4 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { t: 'Lead response SLA', d: 'Alert the owner if a new lead is not contacted within 2 hours.', c: 'Sales' },
              { t: 'Deal stagnation alert', d: 'Flag deals that have not moved stage in 21 days.', c: 'Sales' },
              { t: 'CSAT follow-up', d: 'Trigger a manager call when a survey scores 2 or below.', c: 'Service' },
              { t: 'Preventive maintenance', d: 'Auto-create PM tickets from the AMC visit calendar.', c: 'Service' },
              { t: 'Invoice overdue chase', d: 'Escalate receivables past 30 days to the collection owner.', c: 'Finance' },
              { t: 'Onboarding checklist', d: 'Generate day-one tasks when an employee record is created.', c: 'People' },
            ].map((t) => (
              <div key={t.t} className="border border-line rounded-xl p-4 hover:border-line-strong hover:shadow-xs transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-ink">{t.t}</p>
                    <p className="text-2xs text-ink-2 mt-1.5 leading-relaxed">{t.d}</p>
                  </div>
                  <Badge tone="neutral">{t.c}</Badge>
                </div>
                <Button size="sm" variant="secondary" block className="mt-4" onClick={() => setBuilderOpen(true)}>
                  Use template
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      <section className="mt-8">
        <SectionTitle title="How automation works in Brio" subtitle="Every workflow follows the same three-part structure" icon={<Settings2 size={18} />} />
        <div className="grid gap-3.5 md:grid-cols-3">
          {[
            { step: 'WHEN', title: 'An event happens', text: 'A record is created or changed, a threshold is crossed, or a schedule fires.', icon: Zap, tone: 'bg-brand-50 text-brand-700 border-brand-200' },
            { step: 'IF', title: 'Conditions are evaluated', text: 'Filters on value, score, priority, ownership or contract tier decide whether to proceed.', icon: Filter, tone: 'bg-bronze-50 text-bronze-700 border-bronze-200' },
            { step: 'THEN', title: 'Actions are executed', text: 'Assign, notify, create tasks, generate documents or update records — with a full audit trail.', icon: CheckCircle2, tone: 'bg-success-soft text-success-ink border-success/20' },
          ].map((s) => (
            <Card key={s.step} className="p-5">
              <span className={cn('inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider border rounded px-2 py-1', s.tone)}>
                <s.icon size={11} />
                {s.step}
              </span>
              <p className="font-display text-[15px] font-semibold text-ink mt-3.5">{s.title}</p>
              <p className="text-[13px] text-ink-2 mt-1.5 leading-relaxed">{s.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Builder modal */}
      <Modal
        open={builderOpen}
        onClose={() => setBuilderOpen(false)}
        title="Workflow Builder"
        subtitle="Define the trigger, conditions and actions for this automation"
        size="lg"
        icon={<Zap size={17} />}
        footer={
          <>
            <Button variant="ghost" onClick={() => setBuilderOpen(false)}>Cancel</Button>
            <Button variant="secondary" onClick={() => { setBuilderOpen(false); demo('Workflow saved as draft') }}>Save draft</Button>
            <Button variant="primary" onClick={() => { setBuilderOpen(false); demo('Workflow activated') }}>Activate workflow</Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div><Label htmlFor="wf-name">Workflow name</Label><Input id="wf-name" placeholder="e.g. High-value lead routing" /></div>
          <div>
            <Label htmlFor="wf-cat">Category</Label>
            <Select id="wf-cat">{['Sales', 'Service', 'Customers', 'Projects', 'Inventory', 'People', 'Management'].map((c) => <option key={c}>{c}</option>)}</Select>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <BuilderBlock step="WHEN" tone="brand" icon={<Zap size={13} />}>
            <Select aria-label="Trigger">{TRIGGERS.map((t) => <option key={t}>{t}</option>)}</Select>
          </BuilderBlock>

          <div className="flex justify-center"><ArrowDown size={16} className="text-ink-3" /></div>

          <BuilderBlock step="IF" tone="bronze" icon={<Filter size={13} />}>
            <div className="grid gap-2.5 sm:grid-cols-3">
              <Select aria-label="Condition field">{['Lead score', 'Deal value', 'Priority', 'Contract value', 'Discount'].map((f) => <option key={f}>{f}</option>)}</Select>
              <Select aria-label="Condition operator">{['is greater than', 'is less than', 'equals', 'is not'].map((f) => <option key={f}>{f}</option>)}</Select>
              <Input placeholder="70" aria-label="Condition value" />
            </div>
            <button onClick={() => demo('Condition added')} className="mt-2.5 text-2xs font-medium text-brand-700 hover:underline inline-flex items-center gap-1">
              <Plus size={11} /> Add condition
            </button>
          </BuilderBlock>

          <div className="flex justify-center"><ArrowDown size={16} className="text-ink-3" /></div>

          <BuilderBlock step="THEN" tone="success" icon={<CheckCircle2 size={13} />}>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {ACTIONS.map((a) => (
                <button
                  key={a.label}
                  onClick={() => demo(`Action added: ${a.label}`)}
                  className="flex items-center gap-2.5 rounded-lg border border-line px-3 py-2.5 text-left hover:border-brand-300 hover:bg-brand-50/50 transition-colors"
                >
                  <a.icon size={14} className="text-brand-600 shrink-0" />
                  <span className="text-[13px] text-ink">{a.label}</span>
                </button>
              ))}
            </div>
          </BuilderBlock>
        </div>

        <div className="mt-5">
          <Label htmlFor="wf-desc">Description</Label>
          <Textarea id="wf-desc" placeholder="Explain when this workflow should run and what it is intended to achieve…" />
        </div>

        <div className="mt-5">
          <Alert tone="info" title="Prototype behaviour">
            The builder is fully interactive in this demo but does not execute. In production, each workflow
            writes to the audit log and can be simulated against historical data before activation.
          </Alert>
        </div>
      </Modal>
    </>
  )
}

function BuilderBlock({
  step, tone, icon, children,
}: { step: string; tone: 'brand' | 'bronze' | 'success'; icon: React.ReactNode; children: React.ReactNode }) {
  const tones = {
    brand: 'bg-brand-50 text-brand-700 border-brand-200',
    bronze: 'bg-bronze-50 text-bronze-700 border-bronze-200',
    success: 'bg-success-soft text-success-ink border-success/20',
  }
  return (
    <div className="rounded-xl border border-line p-4">
      <span className={cn('inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider border rounded px-2 py-1', tones[tone])}>
        {icon}
        {step}
      </span>
      <div className="mt-3">{children}</div>
    </div>
  )
}

function WorkflowCard({
  workflow, active, onToggle, onEdit,
}: { workflow: Workflow; active: boolean; onToggle: (v: boolean) => void; onEdit: () => void }) {
  const Icon = CATEGORY_ICON[workflow.category] ?? Zap
  return (
    <article className={cn(
      'bg-surface border rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md',
      active ? 'border-line' : 'border-line opacity-75',
    )}>
      <div className="p-4 border-b border-line flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5 min-w-0">
          <span className={cn('h-8 w-8 rounded-lg inline-flex items-center justify-center shrink-0',
            active ? 'bg-brand-50 text-brand-700' : 'bg-surface-sunken text-ink-3')}>
            <Icon size={15} />
          </span>
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-ink leading-snug">{workflow.name}</p>
            <p className="text-2xs text-ink-3 mt-0.5 num">{workflow.id} · {workflow.category}</p>
          </div>
        </div>
        <Toggle checked={active} onChange={onToggle} label={`Toggle ${workflow.name}`} />
      </div>

      <div className="p-4 space-y-2.5 flex-1">
        <Rule step="WHEN" tone="brand" items={[workflow.when]} />
        <div className="flex justify-center"><ArrowDown size={12} className="text-ink-3" /></div>
        <Rule step="IF" tone="bronze" items={workflow.conditions} />
        <div className="flex justify-center"><ArrowDown size={12} className="text-ink-3" /></div>
        <Rule step="THEN" tone="success" items={workflow.actions} />
      </div>

      <div className="px-4 py-2.5 border-t border-line bg-surface-muted/60 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 min-w-0">
          <Avatar name={workflow.owner} size="xs" />
          <span className="text-2xs text-ink-3 truncate">{workflow.owner}</span>
        </span>
        <span className="flex items-center gap-3 shrink-0">
          <span className="text-2xs text-ink-3 num">{workflow.runs30d} runs</span>
          <button onClick={onEdit} className="text-2xs font-semibold text-brand-700 hover:underline">Edit</button>
        </span>
      </div>

      <div className="px-4 pb-3 flex items-center gap-1.5 text-[10px] text-ink-3">
        {active ? <Play size={9} className="text-success" /> : <Pause size={9} />}
        Last run {relTime(workflow.lastRun)}
      </div>
    </article>
  )
}

function Rule({ step, tone, items }: { step: string; tone: 'brand' | 'bronze' | 'success'; items: string[] }) {
  const tones = {
    brand: 'text-brand-700 bg-brand-50 border-brand-200',
    bronze: 'text-bronze-700 bg-bronze-50 border-bronze-200',
    success: 'text-success-ink bg-success-soft border-success/20',
  }
  return (
    <div className="rounded-lg border border-line bg-surface-muted/50 px-3 py-2.5">
      <span className={cn('inline-block text-[9px] font-bold uppercase tracking-wider border rounded px-1.5 py-0.5', tones[tone])}>
        {step}
      </span>
      <ul className="mt-2 space-y-1">
        {items.map((i) => (
          <li key={i} className="text-2xs text-ink-2 leading-relaxed flex items-start gap-1.5">
            <span className="mt-1.5 h-1 w-1 rounded-full bg-ink-3 shrink-0" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  )
}
