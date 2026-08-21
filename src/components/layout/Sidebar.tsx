import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, UserPlus, Building2, GitBranch, FileText, Headphones, HardHat, Package,
  Users, MessageSquareHeart, Workflow, BarChart3, Settings, ShieldCheck, ScrollText,
  PanelLeftClose, PanelLeftOpen, Sparkles, Gauge, ChevronsUpDown, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BrioLogo, BrioMark } from './Logo'
import { Tooltip } from '@/components/ui'

export const NAV_SECTIONS = [
  {
    label: 'Workspace',
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
    label: 'Administration',
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
  const width = collapsed ? 'lg:w-[72px]' : 'lg:w-[252px]'

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-brand-950/45 backdrop-blur-[2px] lg:hidden animate-fade-in" onClick={onCloseMobile} />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-brand-900 text-brand-100 border-r border-brand-950/40',
          'w-[268px] transition-transform duration-300 lg:transition-[width] lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          width,
        )}
      >
        {/* Brand */}
        <div className={cn('h-16 flex items-center shrink-0 border-b border-white/10', collapsed ? 'lg:justify-center px-4' : 'px-5')}>
          <div className={cn('flex-1 min-w-0', collapsed && 'lg:hidden')}>
            <BrioLogo inverted showTagline />
          </div>
          {collapsed && <BrioMark size={32} inverted className="hidden lg:inline-flex" />}
          <button
            aria-label="Close navigation"
            onClick={onCloseMobile}
            className="lg:hidden h-8 w-8 inline-flex items-center justify-center rounded-lg text-brand-200 hover:bg-white/10"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto scroll-thin py-4 px-3 space-y-6" aria-label="Primary">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <p className="px-2.5 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-300/70">
                <span className={collapsed ? 'lg:hidden' : ''}>{section.label}</span>
                {collapsed && <span className="hidden lg:block h-px bg-white/10 mx-1 mt-1.5 mb-0.5" aria-hidden />}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const link = (
                    <NavLink
                      to={item.to}
                      end={item.to === '/settings'}
                      onClick={onCloseMobile}
                      className={({ isActive }) =>
                        cn(
                          'group relative flex items-center gap-2.5 rounded-lg px-2.5 h-9 text-[13px] font-medium',
                          'transition-colors duration-150',
                          collapsed && 'lg:justify-center lg:px-0',
                          isActive
                            ? 'bg-white/12 text-white'
                            : 'text-brand-200/85 hover:bg-white/[0.07] hover:text-white',
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-bronze-400" />
                          )}
                          <Icon size={17} strokeWidth={1.9} className="shrink-0" />
                          <span className={cn('flex-1 truncate', collapsed && 'lg:hidden')}>{item.label}</span>
                          {'badge' in item && item.badge && (
                            <span
                              className={cn(
                                'text-[10px] font-semibold num px-1.5 py-px rounded-full',
                                isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-brand-200',
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

        {/* Collapse control */}
        <div className="px-3 pb-2 hidden lg:block">
          <button
            onClick={onToggle}
            className={cn(
              'w-full flex items-center gap-2.5 rounded-lg px-2.5 h-8 text-2xs font-medium',
              'text-brand-300 hover:bg-white/[0.07] hover:text-white transition-colors',
              collapsed && 'justify-center px-0',
            )}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>

        {/* User */}
        <div className="p-3 border-t border-white/10 shrink-0">
          <button
            onClick={onProfileClick}
            className={cn(
              'w-full flex items-center gap-2.5 rounded-lg p-1.5 hover:bg-white/[0.07] transition-colors text-left',
              collapsed && 'lg:justify-center',
            )}
          >
            <span className="h-8 w-8 rounded-full bg-bronze-500 text-white text-[11px] font-semibold inline-flex items-center justify-center shrink-0">
              AM
            </span>
            <span className={cn('flex-1 min-w-0', collapsed && 'lg:hidden')}>
              <span className="block text-[13px] font-semibold text-white truncate leading-tight">Arjun Mehta</span>
              <span className="block text-2xs text-brand-300 truncate">Super Admin</span>
            </span>
            <ChevronsUpDown size={14} className={cn('text-brand-300 shrink-0', collapsed && 'lg:hidden')} />
          </button>
        </div>
      </aside>
    </>
  )
}
