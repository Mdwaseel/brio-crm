import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, UserPlus, Building2, GitBranch, FileText, Headphones, HardHat, Package,
  Users, MessageSquareHeart, Workflow, BarChart3, Settings, ShieldCheck, ScrollText,
  PanelLeftClose, PanelLeftOpen, Sparkles, Gauge, ChevronsUpDown, X, ArrowUpRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BrioLogo, BrioMark } from './Logo'
import { Tooltip } from '@/components/ui'

export const NAV_SECTIONS = [
  {
    label: 'Main menu',
    items: [
      { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/leads', label: 'Leads', icon: UserPlus, badge: '18' },
      { to: '/customers', label: 'Customers', icon: Building2 },
      { to: '/pipeline', label: 'Sales Pipeline', icon: GitBranch },
      { to: '/quotations', label: 'Quotations', icon: FileText },
      { to: '/service', label: 'Service & Tickets', icon: Headphones, badge: '86' },
      { to: '/projects', label: 'Projects', icon: HardHat },
      { to: '/inventory', label: 'Inventory', icon: Package },
      { to: '/employees', label: 'Employees', icon: Users },
      { to: '/feedback', label: 'Feedback Intelligence', icon: MessageSquareHeart },
      { to: '/automation', label: 'Automation', icon: Workflow },
      { to: '/reports', label: 'Reports', icon: BarChart3 },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { to: '/intelligence', label: 'Management Intelligence', icon: Gauge },
      { to: '/assistant', label: 'Brio Intelligence', icon: Sparkles },
    ],
  },
  {
    label: 'Preference',
    items: [
      { to: '/settings', label: 'Settings', icon: Settings },
      { to: '/settings/users', label: 'Users & Roles', icon: ShieldCheck },
      { to: '/settings/audit', label: 'Audit Logs', icon: ScrollText },
    ],
  },
] as const

export function Sidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onCloseMobile,
  onProfileClick,
}: {
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onCloseMobile: () => void
  onProfileClick: () => void
}) {
  const navigate = useNavigate()
  const width = collapsed ? 'lg:w-[80px]' : 'lg:w-[264px]'

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-forest-950/40 backdrop-blur-[2px] lg:hidden animate-fade-in" onClick={onCloseMobile} />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-surface',
          'w-[276px] transition-transform duration-300 lg:transition-[width] lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          width,
        )}
      >
        {/* Brand */}
        <div className={cn('h-[72px] flex items-center shrink-0', collapsed ? 'lg:justify-center px-4' : 'px-5')}>
          <div className={cn('flex-1 min-w-0', collapsed && 'lg:hidden')}>
            <BrioLogo />
          </div>
          {collapsed && <BrioMark size={36} className="hidden lg:inline-flex" />}
          <button
            aria-label="Close navigation"
            onClick={onCloseMobile}
            className="lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-full text-ink-2 hover:bg-surface-sunken"
          >
            <X size={16} />
          </button>
        </div>

        {/* Account switcher */}
        <div className="shrink-0 pb-4 px-4">
          <button
            onClick={onProfileClick}
            className={cn(
              'w-full flex items-center gap-2.5 rounded-2xl bg-surface-muted ring-1 ring-black/[0.04] p-2.5',
              'hover:ring-lime-300 hover:bg-lime-50/60 transition-colors text-left',
              collapsed && 'lg:justify-center lg:p-2',
            )}
          >
            <span className="h-9 w-9 rounded-full bg-forest-900 text-lime-300 text-[12px] font-bold inline-flex items-center justify-center shrink-0">
              AM
            </span>
            <span className={cn('flex-1 min-w-0', collapsed && 'lg:hidden')}>
              <span className="block text-[13px] font-semibold text-ink truncate leading-tight">Arjun Mehta</span>
              <span className="block text-2xs text-ink-3 truncate mt-0.5">Super Admin</span>
            </span>
            <ChevronsUpDown size={14} className={cn('text-ink-3 shrink-0', collapsed && 'lg:hidden')} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto scroll-thin px-3 pb-2 space-y-5" aria-label="Primary">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-3">
                <span className={collapsed ? 'lg:hidden' : ''}>{section.label}</span>
                {collapsed && <span className="hidden lg:block h-px bg-line mx-1 mt-1 mb-0.5" aria-hidden />}
              </p>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const link = (
                    <NavLink
                      to={item.to}
                      end={item.to === '/settings'}
                      onClick={onCloseMobile}
                      className={({ isActive }) =>
                        cn(
                          'group relative flex items-center gap-3 rounded-xl px-3 h-11 text-[13px] font-medium',
                          'transition-colors duration-150',
                          collapsed && 'lg:justify-center lg:px-0',
                          isActive
                            ? 'bg-forest-900 text-white shadow-sm'
                            : 'text-ink-2 hover:bg-surface-muted hover:text-ink',
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon
                            size={18}
                            strokeWidth={isActive ? 2.1 : 1.8}
                            className={cn('shrink-0', isActive && 'text-lime-300')}
                          />
                          <span className={cn('flex-1 truncate', collapsed && 'lg:hidden')}>{item.label}</span>
                          {'badge' in item && item.badge && (
                            <span
                              className={cn(
                                'text-[10px] font-bold num px-1.5 py-px rounded-full',
                                isActive ? 'bg-lime-400 text-forest-950' : 'bg-lime-100 text-lime-800',
                                collapsed && 'lg:hidden',
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  )
                  return (
                    <li key={item.to} className="[&>span]:w-full [&>span>a]:w-full">
                      {collapsed ? <Tooltip label={item.label}>{link}</Tooltip> : link}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Intelligence promo — the reference upgrade card, carrying real product value */}
        <div className={cn('px-3 pb-2 shrink-0', collapsed && 'lg:hidden')}>
          <div className="relative overflow-hidden rounded-2xl bg-forest-900 p-4 text-center">
            <span
              className="absolute -top-10 -right-8 h-28 w-28 rounded-full opacity-70 animate-drift"
              style={{ background: 'radial-gradient(circle, rgba(168,224,90,.35) 0%, transparent 68%)' }}
              aria-hidden
            />
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-lime-400 text-forest-950">
              <Sparkles size={17} />
            </span>
            <p className="relative mt-2.5 font-display text-[14px] font-bold text-white">Ask Brio anything</p>
            <p className="relative mt-1 text-[11px] leading-relaxed text-white/65">
              Cross-module answers on revenue, risk and delivery — in plain language.
            </p>
            <button
              onClick={() => { onCloseMobile(); navigate('/assistant') }}
              className="relative mt-3 w-full h-9 inline-flex items-center justify-center gap-1.5 rounded-full bg-lime-400 text-forest-950 text-[12px] font-semibold hover:bg-lime-300 transition-colors"
            >
              Open assistant <ArrowUpRight size={13} />
            </button>
          </div>
        </div>

        {/* Collapse control */}
        <div className="px-3 pb-4 pt-1 hidden lg:block shrink-0">
          <button
            onClick={onToggle}
            className={cn(
              'w-full flex items-center gap-2.5 rounded-full px-3 h-9 text-2xs font-medium',
              'text-ink-3 hover:bg-surface-muted hover:text-ink transition-colors',
              collapsed && 'justify-center px-0',
            )}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
