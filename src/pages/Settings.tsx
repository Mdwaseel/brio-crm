import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Building2, Users, ShieldCheck, Network, GitBranch, Tags, Bell, Plug, Zap, Lock, ScrollText,
  ChevronRight, Save, Plus, Globe, IndianRupee, Clock, Check,
} from 'lucide-react'
import {
  PageHeader, Card, CardHeader, Button, Input, Select, Label, Badge, Toggle, useToast, Alert,
  Avatar, Textarea,
} from '@/components/ui'
import { DEPARTMENTS } from '@/data/people'
import { cn } from '@/lib/utils'

const SECTIONS = [
  { id: 'workspace', label: 'Workspace', icon: Building2, desc: 'Company profile, locale and branding' },
  { id: 'users', label: 'Users', icon: Users, desc: 'Team members and access', route: '/settings/users' },
  { id: 'roles', label: 'Roles & Permissions', icon: ShieldCheck, desc: 'What each role can see and do', route: '/settings/users' },
  { id: 'departments', label: 'Departments', icon: Network, desc: 'Structure, heads and headcount' },
  { id: 'pipelines', label: 'Pipelines', icon: GitBranch, desc: 'Sales stages and probabilities' },
  { id: 'statuses', label: 'Statuses', icon: Tags, desc: 'Record statuses across modules' },
  { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Channels, digests and escalation' },
  { id: 'integrations', label: 'Integrations', icon: Plug, desc: 'Connected systems and data sources' },
  { id: 'automation', label: 'Automation', icon: Zap, desc: 'Engine limits and approvals' },
  { id: 'security', label: 'Security', icon: Lock, desc: 'Sessions, SSO and data policy' },
  { id: 'audit', label: 'Audit Logs', icon: ScrollText, desc: 'Every change, who made it and when', route: '/settings/audit' },
]

const PIPELINE_STAGES = [
  { name: 'New', prob: 20, color: 'bg-brand-200' },
  { name: 'Qualified', prob: 40, color: 'bg-brand-400' },
  { name: 'Proposal', prob: 60, color: 'bg-brand-600' },
  { name: 'Negotiation', prob: 75, color: 'bg-bronze-500' },
  { name: 'Won', prob: 100, color: 'bg-success' },
  { name: 'Lost', prob: 0, color: 'bg-danger' },
]

const INTEGRATIONS = [
  { name: 'Tally ERP', cat: 'Finance', status: 'Connected', desc: 'Invoices, receipts and GST reconciliation' },
  { name: 'Google Workspace', cat: 'Productivity', status: 'Connected', desc: 'Calendar, email and single sign-on' },
  { name: 'WhatsApp Business', cat: 'Communication', status: 'Connected', desc: 'Customer updates and ticket notifications' },
  { name: 'Razorpay', cat: 'Payments', status: 'Not connected', desc: 'Payment links and collection reconciliation' },
  { name: 'Zoho Books', cat: 'Finance', status: 'Not connected', desc: 'Alternative accounting sync' },
  { name: 'Microsoft Teams', cat: 'Communication', status: 'Not connected', desc: 'Alert routing to channels' },
]

export function Settings() {
  const { demo } = useToast()
  const navigate = useNavigate()
  const [active, setActive] = useState('workspace')
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    slaEmail: true, slaPush: true, dailyDigest: true, weeklyReport: true,
    leadAlerts: true, projectAlerts: true, stockAlerts: false, feedbackAlerts: true,
    sso: true, mfa: true, ipAllow: false, autoLogout: true, approvals: true, sandbox: false,
  })

  const set = (k: string, v: boolean) => {
    setToggles((t) => ({ ...t, [k]: v }))
    demo(v ? 'Setting enabled' : 'Setting disabled')
  }

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Configure the workspace, its structure and how Brio behaves for your organisation."
        actions={<Button size="md" variant="primary" icon={<Save size={14} />} onClick={() => demo('Settings saved')}>Save changes</Button>}
      />

      <div className="grid gap-5 lg:grid-cols-[264px_1fr] items-start">
        {/* Section nav */}
        <Card className="overflow-hidden lg:sticky lg:top-[88px]">
          <nav className="p-2" aria-label="Settings sections">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => (s.route ? navigate(s.route) : setActive(s.id))}
                className={cn(
                  'w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left transition-colors',
                  active === s.id && !s.route ? 'bg-brand-50 text-brand-800' : 'text-ink-2 hover:bg-surface-muted hover:text-ink',
                )}
              >
                <s.icon size={16} className={cn('shrink-0', active === s.id && !s.route ? 'text-brand-700' : 'text-ink-3')} />
                <span className="flex-1 min-w-0">
                  <span className="block text-[13px] font-medium truncate">{s.label}</span>
                  <span className="block text-[10px] text-ink-3 truncate">{s.desc}</span>
                </span>
                <ChevronRight size={13} className="text-ink-3 shrink-0" />
              </button>
            ))}
          </nav>
        </Card>

        {/* Panels */}
        <div className="space-y-3.5 min-w-0">
          {active === 'workspace' && (
            <>
              <Card>
                <CardHeader title="Workspace Profile" subtitle="How your organisation appears across Brio" />
                <div className="p-5 grid gap-4 sm:grid-cols-2">
                  <div><Label htmlFor="ws-name">Company name</Label><Input id="ws-name" defaultValue="Brio Elevators India Pvt Ltd" /></div>
                  <div><Label htmlFor="ws-gst">GSTIN</Label><Input id="ws-gst" defaultValue="27AABCB1234K1ZV" className="num" /></div>
                  <div><Label htmlFor="ws-web">Website</Label><Input id="ws-web" defaultValue="brio.in" icon={<Globe size={14} />} /></div>
                  <div><Label htmlFor="ws-hq">Headquarters</Label><Input id="ws-hq" defaultValue="Mumbai, Maharashtra" /></div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="ws-addr">Registered address</Label>
                    <Textarea id="ws-addr" defaultValue="Level 8, Apex House, Bandra Kurla Complex, Mumbai 400051, Maharashtra, India" />
                  </div>
                </div>
              </Card>

              <Card>
                <CardHeader title="Locale & Formats" subtitle="Currency, numbering and time settings" />
                <div className="p-5 grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="ws-cur">Currency</Label>
                    <Select id="ws-cur"><option>₹ Indian Rupee (INR)</option><option>$ US Dollar (USD)</option><option>د.إ UAE Dirham (AED)</option></Select>
                  </div>
                  <div>
                    <Label htmlFor="ws-num">Number format</Label>
                    <Select id="ws-num"><option>Indian (48,60,000 · Lakh / Crore)</option><option>International (4,860,000)</option></Select>
                  </div>
                  <div>
                    <Label htmlFor="ws-tz">Time zone</Label>
                    <Select id="ws-tz"><option>Asia/Kolkata (IST, UTC+5:30)</option><option>Asia/Dubai (GST, UTC+4)</option></Select>
                  </div>
                  <div>
                    <Label htmlFor="ws-fy">Financial year</Label>
                    <Select id="ws-fy"><option>April – March</option><option>January – December</option></Select>
                  </div>
                  <div>
                    <Label htmlFor="ws-date">Date format</Label>
                    <Select id="ws-date"><option>DD MMM YYYY</option><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option></Select>
                  </div>
                  <div>
                    <Label htmlFor="ws-gstr">Default GST rate</Label>
                    <Input id="ws-gstr" defaultValue="18" suffix={<span className="text-2xs">%</span>} className="num" />
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <Alert tone="brand" icon={<IndianRupee size={15} />}>
                    Indian numbering is active — values render as ₹48.6L and ₹1.82Cr across every module and export.
                  </Alert>
                </div>
              </Card>
            </>
          )}

          {active === 'departments' && (
            <Card>
              <CardHeader
                title="Departments"
                subtitle="Organisational structure used for routing, reporting and health scoring"
                action={<Button size="sm" variant="secondary" icon={<Plus size={13} />} onClick={() => demo('New department')}>Add department</Button>}
              />
              <div className="p-4 space-y-2.5">
                {DEPARTMENTS.map((d) => (
                  <div key={d.name} className="flex flex-wrap items-center gap-4 rounded-xl border border-line px-4 py-3.5 hover:border-line-strong transition-colors">
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-semibold text-ink">{d.name}</p>
                      <p className="text-2xs text-ink-3 mt-0.5">{d.headcount} people · risk {d.risk}</p>
                    </div>
                    <span className="inline-flex items-center gap-2">
                      <Avatar name={d.head} size="sm" />
                      <span className="text-[13px] text-ink-2">{d.head}</span>
                    </span>
                    <Button size="xs" variant="ghost" onClick={() => demo('Editing department')}>Edit</Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {active === 'pipelines' && (
            <Card>
              <CardHeader
                title="Sales Pipelines"
                subtitle="Stages, default probabilities and the pipelines they belong to"
                action={<Button size="sm" variant="secondary" icon={<Plus size={13} />} onClick={() => demo('New pipeline')}>Add pipeline</Button>}
              />
              <div className="p-5">
                <div className="flex items-center gap-2.5 flex-wrap mb-5">
                  {['Elevators & Escalators', 'Service & AMC', 'Modernisation', 'Spares & Parts'].map((p, i) => (
                    <Badge key={p} tone={i === 0 ? 'brand' : 'neutral'} dot={i === 0}>{p}</Badge>
                  ))}
                </div>
                <div className="space-y-2.5">
                  {PIPELINE_STAGES.map((s) => (
                    <div key={s.name} className="flex items-center gap-4 rounded-lg border border-line px-4 py-3">
                      <span className={cn('h-2.5 w-2.5 rounded-full shrink-0', s.color)} />
                      <span className="text-[13px] font-medium text-ink flex-1">{s.name}</span>
                      <span className="text-2xs text-ink-3">Default probability</span>
                      <span className="text-[13px] font-semibold text-ink num w-12 text-right">{s.prob}%</span>
                      <Button size="xs" variant="ghost" onClick={() => demo('Editing stage')}>Edit</Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {active === 'statuses' && (
            <Card>
              <CardHeader title="Record Statuses" subtitle="Status vocabularies used across each module" />
              <div className="p-5 space-y-5">
                {[
                  { m: 'Leads', s: ['New', 'Contacted', 'Qualified', 'Hot', 'Cold', 'Converted'] },
                  { m: 'Deals', s: ['New', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'] },
                  { m: 'Quotations', s: ['Draft', 'Sent', 'Viewed', 'Accepted', 'Rejected', 'Expired'] },
                  { m: 'Tickets', s: ['Open', 'In Progress', 'Waiting', 'Resolved', 'Escalated'] },
                  { m: 'Projects', s: ['On Track', 'At Risk', 'Delayed', 'Completed'] },
                  { m: 'Inventory', s: ['Healthy', 'Low Stock', 'Critical'] },
                ].map((row) => (
                  <div key={row.m}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[13px] font-semibold text-ink">{row.m}</p>
                      <button onClick={() => demo('Editing statuses')} className="text-2xs font-medium text-brand-700 hover:underline">Edit</button>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {row.s.map((s) => <Badge key={s} tone="neutral">{s}</Badge>)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {active === 'notifications' && (
            <Card>
              <CardHeader title="Notifications" subtitle="What Brio tells you, and where" />
              <div className="p-5 space-y-1">
                {[
                  { k: 'slaEmail', l: 'SLA breach risk — email', d: 'Notify service managers when a ticket crosses 75% of its SLA.' },
                  { k: 'slaPush', l: 'SLA breach risk — in-app', d: 'Show a high-priority in-app alert for the assigned engineer.' },
                  { k: 'leadAlerts', l: 'New high-value lead', d: 'Alert the owner when a lead scores above 80.' },
                  { k: 'projectAlerts', l: 'Project milestone delays', d: 'Notify the manager and sponsor when a milestone slips 5 days.' },
                  { k: 'stockAlerts', l: 'Low stock warnings', d: 'Alert supply chain when stock falls below reorder point.' },
                  { k: 'feedbackAlerts', l: 'Feedback submissions', d: 'Summarise new pulse responses to department heads.' },
                  { k: 'dailyDigest', l: 'Daily management brief', d: 'Deliver the morning brief at 09:00 IST.' },
                  { k: 'weeklyReport', l: 'Weekly management report', d: 'Send department scorecards every Monday at 08:00 IST.' },
                ].map((r) => (
                  <div key={r.k} className="flex items-start justify-between gap-4 py-3 border-b border-line last:border-0">
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-ink">{r.l}</p>
                      <p className="text-2xs text-ink-3 mt-0.5 leading-relaxed">{r.d}</p>
                    </div>
                    <Toggle checked={toggles[r.k]} onChange={(v) => set(r.k, v)} label={r.l} />
                  </div>
                ))}
              </div>
            </Card>
          )}

          {active === 'integrations' && (
            <Card>
              <CardHeader
                title="Integrations"
                subtitle="Systems connected to this workspace"
                action={<Button size="sm" variant="secondary" icon={<Plus size={13} />} onClick={() => demo('Browse integrations')}>Browse catalogue</Button>}
              />
              <div className="p-4 grid gap-3 sm:grid-cols-2">
                {INTEGRATIONS.map((i) => {
                  const on = i.status === 'Connected'
                  return (
                    <div key={i.name} className="rounded-xl border border-line p-4 hover:border-line-strong transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <span className={cn('h-9 w-9 rounded-lg inline-flex items-center justify-center shrink-0',
                            on ? 'bg-success-soft text-success' : 'bg-surface-sunken text-ink-3')}>
                            {on ? <Check size={16} /> : <Plug size={16} />}
                          </span>
                          <div className="min-w-0">
                            <p className="text-[13px] font-semibold text-ink">{i.name}</p>
                            <p className="text-2xs text-ink-3">{i.cat}</p>
                          </div>
                        </div>
                        <Badge tone={on ? 'success' : 'neutral'} dot>{i.status}</Badge>
                      </div>
                      <p className="text-2xs text-ink-2 mt-3 leading-relaxed">{i.desc}</p>
                      <Button size="xs" variant={on ? 'ghost' : 'secondary'} block className="mt-3.5"
                        onClick={() => demo(on ? 'Managing integration' : 'Connecting integration')}>
                        {on ? 'Manage' : 'Connect'}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </Card>
          )}

          {active === 'automation' && (
            <Card>
              <CardHeader title="Automation Settings" subtitle="Guardrails for the automation engine" />
              <div className="p-5 space-y-1">
                {[
                  { k: 'approvals', l: 'Require approval for new workflows', d: 'A Super Admin must approve any workflow before it can activate.' },
                  { k: 'sandbox', l: 'Sandbox mode', d: 'Run workflows in simulation only and log the actions they would have taken.' },
                ].map((r) => (
                  <div key={r.k} className="flex items-start justify-between gap-4 py-3 border-b border-line last:border-0">
                    <div>
                      <p className="text-[13px] font-medium text-ink">{r.l}</p>
                      <p className="text-2xs text-ink-3 mt-0.5">{r.d}</p>
                    </div>
                    <Toggle checked={toggles[r.k]} onChange={(v) => set(r.k, v)} label={r.l} />
                  </div>
                ))}
                <div className="grid gap-4 sm:grid-cols-2 pt-4">
                  <div><Label htmlFor="au-rate">Maximum runs per hour</Label><Input id="au-rate" defaultValue="500" className="num" /></div>
                  <div><Label htmlFor="au-ret">Run history retention</Label><Select id="au-ret"><option>90 days</option><option>180 days</option><option>1 year</option></Select></div>
                </div>
              </div>
            </Card>
          )}

          {active === 'security' && (
            <>
              <Card>
                <CardHeader title="Security" subtitle="Authentication and access policy" />
                <div className="p-5 space-y-1">
                  {[
                    { k: 'sso', l: 'Single sign-on (Google Workspace)', d: 'Users authenticate through your identity provider.' },
                    { k: 'mfa', l: 'Enforce multi-factor authentication', d: 'Required for all Super Admin and Finance roles.' },
                    { k: 'ipAllow', l: 'IP allow-list', d: 'Restrict access to approved office and VPN ranges.' },
                    { k: 'autoLogout', l: 'Automatic session timeout', d: 'Sign users out after 30 minutes of inactivity.' },
                  ].map((r) => (
                    <div key={r.k} className="flex items-start justify-between gap-4 py-3 border-b border-line last:border-0">
                      <div>
                        <p className="text-[13px] font-medium text-ink">{r.l}</p>
                        <p className="text-2xs text-ink-3 mt-0.5">{r.d}</p>
                      </div>
                      <Toggle checked={toggles[r.k]} onChange={(v) => set(r.k, v)} label={r.l} />
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <CardHeader title="Data Policy" subtitle="Retention and residency" />
                <div className="p-5 grid gap-4 sm:grid-cols-2">
                  <div><Label htmlFor="sec-res">Data residency</Label><Select id="sec-res"><option>India (Mumbai)</option><option>Singapore</option></Select></div>
                  <div><Label htmlFor="sec-ret">Record retention</Label><Select id="sec-ret"><option>7 years</option><option>5 years</option><option>3 years</option></Select></div>
                  <div className="sm:col-span-2">
                    <Alert tone="info" icon={<Clock size={15} />}>
                      Audit logs are immutable and retained for the full retention period regardless of record deletion.
                    </Alert>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </>
  )
}
