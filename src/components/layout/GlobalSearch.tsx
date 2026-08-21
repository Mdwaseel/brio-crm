import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import {
  Search, Building2, UserPlus, GitBranch, Headphones, HardHat, Users, CornerDownLeft, ArrowUp, ArrowDown, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { leads, customers, deals } from '@/data/crm'
import { tickets, projects } from '@/data/operations'
import { employees } from '@/data/people'
import { inr } from '@/lib/utils'

type Result = { id: string; title: string; sub: string; group: string; to: string; icon: typeof Search }

const GROUP_ICON = {
  Customers: Building2,
  Leads: UserPlus,
  Deals: GitBranch,
  Tickets: Headphones,
  Projects: HardHat,
  Employees: Users,
}

export function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const navigate = useNavigate()

  const index = useMemo<Result[]>(
    () => [
      ...customers.map((c) => ({ id: c.id, title: c.name, sub: `${c.industry} · ${c.city} · Health ${c.health}%`, group: 'Customers', to: `/customers/${c.id}`, icon: GROUP_ICON.Customers })),
      ...leads.map((l) => ({ id: l.id, title: l.name, sub: `${l.company} · ${l.status} · Score ${l.score}`, group: 'Leads', to: '/leads', icon: GROUP_ICON.Leads })),
      ...deals.map((d) => ({ id: d.id, title: d.title, sub: `${d.customer} · ${inr(d.value)} · ${d.stage}`, group: 'Deals', to: '/pipeline', icon: GROUP_ICON.Deals })),
      ...tickets.map((t) => ({ id: t.id, title: `${t.id} — ${t.subject}`, sub: `${t.customer} · ${t.priority} · ${t.status}`, group: 'Tickets', to: '/service', icon: GROUP_ICON.Tickets })),
      ...projects.map((p) => ({ id: p.id, title: p.name, sub: `${p.customer} · ${p.progress}% · ${p.status}`, group: 'Projects', to: '/projects', icon: GROUP_ICON.Projects })),
      ...employees.map((e) => ({ id: e.id, title: e.name, sub: `${e.role} · ${e.department}`, group: 'Employees', to: '/employees', icon: GROUP_ICON.Employees })),
    ],
    [],
  )

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      return index.filter((r) => ['CUS-101', 'LD-2041', 'TKT-1048', 'PRJ-201', 'EMP-01'].includes(r.id))
    }
    return index.filter((r) => (r.title + ' ' + r.sub + ' ' + r.id).toLowerCase().includes(q)).slice(0, 12)
  }, [query, index])

  useEffect(() => setCursor(0), [query])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') { e.preventDefault(); setCursor((c) => Math.min(c + 1, results.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)) }
      if (e.key === 'Enter' && results[cursor]) { navigate(results[cursor].to); onClose() }
    }
    window.addEventListener('keydown', h)
    return () => {
      window.removeEventListener('keydown', h)
      document.body.style.overflow = prev
    }
  }, [open, results, cursor, navigate, onClose])

  useEffect(() => { if (!open) setQuery('') }, [open])

  if (!open) return null

  const grouped = results.reduce<Record<string, Result[]>>((acc, r) => {
    ;(acc[r.group] ??= []).push(r)
    return acc
  }, {})

  let flatIndex = -1

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-start justify-center pt-[10vh] px-4">
      <div className="fixed inset-0 bg-brand-950/50 backdrop-blur-[3px] animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-surface rounded-2xl shadow-pop border border-line overflow-hidden animate-scale-in">
        <div className="flex items-center gap-3 px-4 h-14 border-b border-line">
          <Search size={18} className="text-ink-3 shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads, customers, deals, tickets, projects, employees…"
            aria-label="Global search"
            className="flex-1 bg-transparent text-[14px] text-ink placeholder:text-ink-3 focus:outline-none"
          />
          <button onClick={onClose} aria-label="Close search" className="text-ink-3 hover:text-ink transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="max-h-[52vh] overflow-y-auto scroll-thin py-2">
          {results.length === 0 && (
            <div className="px-4 py-10 text-center">
              <p className="text-[13px] font-semibold text-ink">No results for “{query}”</p>
              <p className="text-2xs text-ink-2 mt-1">Try a company name, ticket ID or employee name.</p>
            </div>
          )}
          {Object.entries(grouped).map(([group, items]) => (
            <div key={group} className="mb-1">
              <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-3">{group}</p>
              {items.map((r) => {
                flatIndex++
                const active = flatIndex === cursor
                const Icon = r.icon
                const myIndex = flatIndex
                return (
                  <button
                    key={r.id}
                    onMouseEnter={() => setCursor(myIndex)}
                    onClick={() => { navigate(r.to); onClose() }}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
                      active ? 'bg-brand-50' : 'hover:bg-surface-muted',
                    )}
                  >
                    <span className={cn('h-7 w-7 rounded-lg inline-flex items-center justify-center shrink-0',
                      active ? 'bg-brand-100 text-brand-700' : 'bg-surface-sunken text-ink-3')}>
                      <Icon size={14} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-medium text-ink truncate">{r.title}</span>
                      <span className="block text-2xs text-ink-3 truncate">{r.sub}</span>
                    </span>
                    <span className="text-[10px] text-ink-3 num shrink-0">{r.id}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-t border-line bg-surface-muted">
          <div className="flex items-center gap-3 text-[10px] text-ink-3">
            <span className="inline-flex items-center gap-1"><ArrowUp size={10} /><ArrowDown size={10} /> navigate</span>
            <span className="inline-flex items-center gap-1"><CornerDownLeft size={10} /> open</span>
            <span className="inline-flex items-center gap-1">esc close</span>
          </div>
          <span className="text-[10px] text-ink-3 num">{results.length} results</span>
        </div>
      </div>
    </div>,
    document.body,
  )
}
