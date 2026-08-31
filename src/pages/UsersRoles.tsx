import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus, Search, ShieldCheck, Users, Check, Minus, ChevronRight, Mail, UserCog, Crown, KeyRound,
} from 'lucide-react'
import {
  PageHeader, Card, Button, Input, Select, Badge, Avatar, DataTable, CellPrimary,
  Tabs, useToast, Modal, Label, Alert, StatusBadge,
} from '@/components/ui'
import { employees } from '@/data/people'
import { cn, fmtDate, relTime } from '@/lib/utils'

const ROLES = [
  { id: 'R1', name: 'Super Admin', users: 1, desc: 'Unrestricted access to every module, record and setting.', tone: 'bronze' as const },
  { id: 'R2', name: 'Sales Manager', users: 4, desc: 'Full access to leads, deals, quotations and sales reporting.', tone: 'brand' as const },
  { id: 'R3', name: 'Service Manager', users: 3, desc: 'Manages tickets, SLA policy, engineers and service reporting.', tone: 'brand' as const },
  { id: 'R4', name: 'Project Manager', users: 6, desc: 'Owns delivery projects, milestones, budgets and issue logs.', tone: 'brand' as const },
  { id: 'R5', name: 'Service Engineer', users: 22, desc: 'Field access to assigned tickets, sites and spare requests.', tone: 'neutral' as const },
  { id: 'R6', name: 'Finance', users: 5, desc: 'Invoices, receivables, GST and financial reporting only.', tone: 'neutral' as const },
  { id: 'R7', name: 'Read Only', users: 9, desc: 'View dashboards and reports without any edit capability.', tone: 'neutral' as const },
]

const MODULES = ['Dashboard', 'Leads', 'Customers', 'Pipeline', 'Quotations', 'Service', 'Projects', 'Inventory', 'Employees', 'Feedback', 'Automation', 'Reports', 'Settings']

type Perm = 'full' | 'edit' | 'view' | 'none'

const MATRIX: Record<string, Perm[]> = {
  'Super Admin': MODULES.map(() => 'full'),
  'Sales Manager': ['view', 'full', 'full', 'full', 'full', 'view', 'view', 'view', 'view', 'none', 'view', 'view', 'none'],
  'Service Manager': ['view', 'none', 'view', 'none', 'none', 'full', 'view', 'edit', 'view', 'view', 'edit', 'view', 'none'],
  'Project Manager': ['view', 'none', 'view', 'view', 'view', 'view', 'full', 'edit', 'view', 'none', 'view', 'view', 'none'],
  'Service Engineer': ['view', 'none', 'view', 'none', 'none', 'edit', 'view', 'view', 'none', 'view', 'none', 'none', 'none'],
  Finance: ['view', 'none', 'view', 'view', 'view', 'none', 'view', 'view', 'none', 'none', 'none', 'full', 'none'],
  'Read Only': MODULES.map((m) => (m === 'Settings' ? 'none' : 'view')),
}

const PERM_STYLE: Record<Perm, { label: string; cls: string; icon: typeof Check | null }> = {
  full: { label: 'Full', cls: 'bg-success-soft text-success-ink border-success/20', icon: Check },
  edit: { label: 'Edit', cls: 'bg-brand-50 text-brand-700 border-brand-200', icon: Check },
  view: { label: 'View', cls: 'bg-surface-sunken text-ink-2 border-line', icon: null },
  none: { label: '—', cls: 'bg-transparent text-ink-3 border-transparent', icon: Minus },
}

type Row = {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: string
  lastActive: string
}

const USERS: Row[] = [
  { id: 'U-01', name: 'Venkatesh Jagabathina', email: 'venkatesh@brioelevators.com', role: 'Super Admin', department: 'Leadership', status: 'Active', lastActive: '2026-08-22T09:12:00+05:30' },
  ...employees.slice(0, 12).map((e, i) => ({
    id: `U-${String(i + 2).padStart(2, '0')}`,
    name: e.name,
    email: e.email,
    role:
      e.role.includes('Head') || e.role.includes('Director') ? 'Sales Manager'
        : e.department === 'Service' && e.role.includes('Head') ? 'Service Manager'
        : e.department === 'Service' ? 'Service Engineer'
        : e.department === 'Projects' ? 'Project Manager'
        : e.department === 'Finance' ? 'Finance'
        : e.department === 'Sales' ? 'Sales Manager'
        : 'Read Only',
    department: e.department,
    status: e.status === 'On Leave' ? 'Inactive' : 'Active',
    lastActive: '2026-08-21T16:40:00+05:30',
  })),
]

export function UsersRoles() {
  const { demo } = useToast()
  const [tab, setTab] = useState('users')
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('all')
  const [inviteOpen, setInviteOpen] = useState(false)

  const filtered = USERS.filter(
    (u) =>
      (!query || (u.name + u.email + u.role).toLowerCase().includes(query.toLowerCase())) &&
      (role === 'all' || u.role === role),
  )

  return (
    <>
      <PageHeader
        breadcrumb={
          <nav className="flex items-center gap-1.5 text-2xs text-ink-3" aria-label="Breadcrumb">
            <Link to="/settings" className="hover:text-brand-700 transition-colors">Settings</Link>
            <ChevronRight size={12} />
            <span className="text-ink-2 font-medium">Users & Roles</span>
          </nav>
        }
        title="Users & Roles"
        subtitle="Who has access to the workspace, and exactly what each role can do."
        actions={
          <>
            <Button size="md" variant="secondary" icon={<ShieldCheck size={14} />} onClick={() => demo('New role')}>New Role</Button>
            <Button size="md" variant="primary" icon={<Plus size={14} />} onClick={() => setInviteOpen(true)}>Invite User</Button>
          </>
        }
      />

      <Card className="overflow-hidden">
        <div className="px-4 pt-1">
          <Tabs
            value={tab}
            onChange={setTab}
            tabs={[
              { id: 'users', label: 'Users', count: USERS.length, icon: <Users size={14} /> },
              { id: 'roles', label: 'Roles', count: ROLES.length, icon: <UserCog size={14} /> },
              { id: 'matrix', label: 'Permission Matrix', icon: <KeyRound size={14} /> },
            ]}
          />
        </div>

        {tab === 'users' && (
          <>
            <div className="p-3.5 border-b border-line flex flex-wrap items-center gap-2.5">
              <Input value={query} onChange={(e) => setQuery(e.target.value)} icon={<Search size={15} />}
                placeholder="Search users…" aria-label="Search users" className="w-full sm:w-64" />
              <Select value={role} onChange={(e) => setRole(e.target.value)} aria-label="Filter by role" className="w-auto min-w-[160px]">
                <option value="all">All roles</option>
                {ROLES.map((r) => <option key={r.id}>{r.name}</option>)}
              </Select>
              <span className="ml-auto text-2xs text-ink-3 num">{filtered.length} users</span>
            </div>
            <DataTable
              rows={filtered}
              pageSize={10}
              selectable
              onRowClick={() => demo('Opening user profile')}
              emptyTitle="No users match your filters"
              emptyDescription="Try a different role or clear the search."
              bulkActions={(rows, clear) => (
                <>
                  <Button size="xs" variant="secondary" onClick={() => { demo(`Role updated for ${rows.length} users`); clear() }}>Change role</Button>
                  <Button size="xs" variant="danger" onClick={() => { demo('Deactivation requires approval'); clear() }}>Deactivate</Button>
                </>
              )}
              columns={[
                { key: 'name', header: 'User', sortBy: (r) => r.name, render: (r) => (
                  <CellPrimary icon={<Avatar name={r.name} size="md" />} title={r.name} sub={r.email} />
                ) },
                { key: 'role', header: 'Role', sortBy: (r) => r.role, render: (r) => (
                  <Badge tone={r.role === 'Super Admin' ? 'bronze' : 'brand'} dot={r.role === 'Super Admin'}>{r.role}</Badge>
                ) },
                { key: 'dept', header: 'Department', hideBelow: 'md', sortBy: (r) => r.department, render: (r) => <span className="text-[13px] text-ink-2">{r.department}</span> },
                { key: 'last', header: 'Last Active', hideBelow: 'lg', sortBy: (r) => r.lastActive, render: (r) => <span className="num text-2xs text-ink-3">{relTime(r.lastActive)}</span> },
                { key: 'status', header: 'Status', align: 'right', sortBy: (r) => r.status, render: (r) => <StatusBadge status={r.status} /> },
              ]}
            />
          </>
        )}

        {tab === 'roles' && (
          <div className="p-4 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
            {ROLES.map((r) => (
              <div key={r.id} className="border border-line rounded-xl p-4 hover:border-line-strong hover:shadow-xs transition-all">
                <div className="flex items-start justify-between gap-3">
                  <span className={cn('h-9 w-9 rounded-lg inline-flex items-center justify-center shrink-0',
                    r.tone === 'bronze' ? 'bg-bronze-50 text-bronze-600' : r.tone === 'brand' ? 'bg-brand-50 text-brand-700' : 'bg-surface-sunken text-ink-3')}>
                    {r.tone === 'bronze' ? <Crown size={16} /> : <ShieldCheck size={16} />}
                  </span>
                  <Badge tone="neutral">{r.users} {r.users === 1 ? 'user' : 'users'}</Badge>
                </div>
                <p className="font-display text-[15px] font-semibold text-ink mt-3.5">{r.name}</p>
                <p className="text-[13px] text-ink-2 mt-1.5 leading-relaxed">{r.desc}</p>
                <div className="mt-4 flex gap-2">
                  <Button size="xs" variant="secondary" block onClick={() => setTab('matrix')}>Permissions</Button>
                  <Button size="xs" variant="ghost" block onClick={() => demo('Editing role')}>Edit</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'matrix' && (
          <>
            <div className="p-5 border-b border-line">
              <Alert tone="brand" icon={<Crown size={16} />} title="Super Admin has unrestricted access">
                Venkatesh Jagabathina can view and edit every department, employee, customer, pipeline, report and setting
                in this workspace. All other roles are scoped to the permissions below.
              </Alert>
            </div>
            <div className="overflow-x-auto scroll-thin">
              <table className="w-full min-w-[980px]">
                <thead className="sticky top-0">
                  <tr className="bg-surface-muted border-b border-line">
                    <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-3 sticky left-0 bg-surface-muted">
                      Role
                    </th>
                    {MODULES.map((m) => (
                      <th key={m} className="px-2 py-3 text-center text-[10px] font-semibold uppercase tracking-wide text-ink-3 whitespace-nowrap">
                        {m}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(MATRIX).map(([roleName, perms]) => (
                    <tr key={roleName} className="border-b border-line last:border-0 hover:bg-brand-50/30 transition-colors">
                      <td className="px-4 py-3 sticky left-0 bg-surface">
                        <span className="text-[13px] font-medium text-ink whitespace-nowrap">{roleName}</span>
                      </td>
                      {perms.map((p, i) => {
                        const style = PERM_STYLE[p]
                        const Icon = style.icon
                        return (
                          <td key={MODULES[i]} className="px-2 py-3 text-center">
                            <span className={cn('inline-flex items-center justify-center gap-0.5 h-6 min-w-[46px] px-1.5 rounded-md border text-[10px] font-semibold', style.cls)}>
                              {Icon && <Icon size={10} />}
                              {p !== 'none' && style.label}
                            </span>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-line flex items-center gap-4 flex-wrap">
              {(['full', 'edit', 'view', 'none'] as Perm[]).map((p) => (
                <span key={p} className="inline-flex items-center gap-1.5 text-2xs text-ink-2">
                  <span className={cn('inline-flex items-center justify-center h-4 w-8 rounded border text-[9px] font-semibold', PERM_STYLE[p].cls)}>
                    {p === 'none' ? '—' : PERM_STYLE[p].label}
                  </span>
                  {p === 'full' ? 'Full control' : p === 'edit' ? 'Create and edit' : p === 'view' ? 'View only' : 'No access'}
                </span>
              ))}
            </div>
          </>
        )}
      </Card>

      <Modal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Invite User"
        subtitle="Send a workspace invitation with a scoped role"
        icon={<Mail size={17} />}
        footer={
          <>
            <Button variant="ghost" onClick={() => setInviteOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => { setInviteOpen(false); demo('Invitation sent') }}>Send invitation</Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><Label htmlFor="iv-email">Work email</Label><Input id="iv-email" type="email" placeholder="name@brio.in" icon={<Mail size={14} />} /></div>
          <div><Label htmlFor="iv-name">Full name</Label><Input id="iv-name" placeholder="e.g. Meera Nair" /></div>
          <div>
            <Label htmlFor="iv-dept">Department</Label>
            <Select id="iv-dept">{['Sales', 'Service', 'Projects', 'Operations', 'Finance', 'Leadership'].map((d) => <option key={d}>{d}</option>)}</Select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="iv-role" hint="Determines module access">Role</Label>
            <Select id="iv-role">{ROLES.map((r) => <option key={r.id}>{r.name}</option>)}</Select>
          </div>
          <div className="sm:col-span-2">
            <Alert tone="info">
              The invitation expires after 7 days. Access is granted only once the user completes
              multi-factor enrolment, as required by the current security policy.
            </Alert>
          </div>
        </div>
      </Modal>

      <p className="mt-4 text-2xs text-ink-3">
        Role changes are written to the audit log. Last permission change: 21 Aug 2026 by Venkatesh Jagabathina ·{' '}
        <Link to="/settings/audit" className="text-brand-700 hover:underline font-medium">view audit logs</Link>.
        Workspace created {fmtDate('2021-04-01')}.
      </p>
    </>
  )
}
