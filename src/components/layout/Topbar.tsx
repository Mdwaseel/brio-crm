import { useNavigate } from 'react-router-dom'
import {
  Menu, Search, Bell, ChevronDown, Calendar, Download, User, SlidersHorizontal, ShieldCheck, LogOut,
  AlertTriangle, UserPlus, HardHat, RefreshCw, MessageSquareHeart, FileCheck2, Command,
} from 'lucide-react'
import { cn, relTime } from '@/lib/utils'
import { Button, IconButton, Dropdown, MenuItem, MenuLabel, MenuDivider, Badge, useToast } from '@/components/ui'
import { notifications } from '@/data/analytics'

const NOTIF_ICON = {
  sla: { icon: AlertTriangle, tone: 'bg-danger-soft text-danger' },
  lead: { icon: UserPlus, tone: 'bg-info-soft text-info' },
  project: { icon: HardHat, tone: 'bg-warning-soft text-warning' },
  amc: { icon: RefreshCw, tone: 'bg-bronze-50 text-bronze-600' },
  feedback: { icon: MessageSquareHeart, tone: 'bg-success-soft text-success' },
  approval: { icon: FileCheck2, tone: 'bg-brand-50 text-brand-700' },
}

export function Topbar({
  onMenuClick,
  onSearchClick,
  onSignOut,
}: {
  onMenuClick: () => void
  onSearchClick: () => void
  onSignOut: () => void
}) {
  const { demo } = useToast()
  const navigate = useNavigate()
  const unread = notifications.filter((n) => n.unread).length

  return (
    <header className="sticky top-0 z-30 h-16 bg-surface/85 backdrop-blur-md border-b border-line">
      <div className="h-full px-4 sm:px-6 flex items-center gap-3">
        <IconButton label="Open navigation" className="lg:hidden" onClick={onMenuClick}>
          <Menu size={18} />
        </IconButton>

        <button
          onClick={onSearchClick}
          className={cn(
            'group flex items-center gap-2.5 h-9 px-3 rounded-lg border border-line bg-surface-muted',
            'text-ink-3 hover:border-line-strong hover:bg-surface transition-colors',
            'w-full max-w-sm',
          )}
        >
          <Search size={15} className="shrink-0" />
          <span className="text-[13px] truncate flex-1 text-left">Search anything…</span>
          <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-medium text-ink-3 border border-line rounded px-1.5 py-0.5 bg-surface">
            <Command size={9} /> K
          </span>
        </button>

        <div className="flex-1" />

        {/* Date range */}
        <Dropdown
          width="w-52"
          trigger={({ toggle }) => (
            <Button size="sm" variant="secondary" icon={<Calendar size={14} />} iconRight={<ChevronDown size={13} />} onClick={toggle}
              className="hidden md:inline-flex">
              Last 30 days
            </Button>
          )}
        >
          {(close) => (
            <>
              <MenuLabel>Date range</MenuLabel>
              {['Today', 'Last 7 days', 'Last 30 days', 'This quarter', 'This financial year', 'Custom range…'].map((r) => (
                <MenuItem key={r} active={r === 'Last 30 days'} onClick={() => { close(); demo(`Date range set to ${r}`) }}>
                  {r}
                </MenuItem>
              ))}
            </>
          )}
        </Dropdown>

        <Button
          size="sm"
          variant="secondary"
          icon={<Download size={14} />}
          onClick={() => demo('Export started')}
          className="hidden md:inline-flex"
        >
          Export
        </Button>

        <span className="hidden sm:block w-px h-6 bg-line" />

        {/* Notifications */}
        <Dropdown
          width="w-[380px]"
          trigger={({ toggle, open }) => (
            <button
              onClick={toggle}
              aria-label={`Notifications, ${unread} unread`}
              className={cn(
                'relative h-9 w-9 inline-flex items-center justify-center rounded-lg transition-colors',
                open ? 'bg-surface-sunken text-ink' : 'text-ink-2 hover:bg-surface-sunken hover:text-ink',
              )}
            >
              <Bell size={17} />
              {unread > 0 && (
                <span className="absolute top-1.5 right-1.5 h-[15px] min-w-[15px] px-1 rounded-full bg-danger text-white text-[9px] font-bold flex items-center justify-center num">
                  {unread}
                </span>
              )}
            </button>
          )}
        >
          {(close) => (
            <>
              <div className="flex items-center justify-between px-3 py-2 border-b border-line">
                <span className="text-[13px] font-semibold text-ink">Notifications</span>
                <Badge tone="danger">{unread} new</Badge>
              </div>
              <div className="max-h-[340px] overflow-y-auto scroll-thin">
                {notifications.map((n) => {
                  const meta = NOTIF_ICON[n.type]
                  const Icon = meta.icon
                  return (
                    <button
                      key={n.id}
                      onClick={() => { close(); demo('Opening notification') }}
                      className={cn('w-full flex items-start gap-3 px-3 py-2.5 text-left hover:bg-surface-muted transition-colors', n.unread && 'bg-brand-50/40')}
                    >
                      <span className={cn('h-7 w-7 rounded-lg inline-flex items-center justify-center shrink-0', meta.tone)}>
                        <Icon size={14} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13px] font-medium text-ink leading-snug">{n.title}</span>
                        <span className="block text-2xs text-ink-2 mt-0.5 leading-relaxed">{n.description}</span>
                        <span className="block text-[10px] text-ink-3 mt-1 num">{relTime(n.time)}</span>
                      </span>
                      {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-brand-600 mt-1.5 shrink-0" />}
                    </button>
                  )
                })}
              </div>
              <div className="px-3 py-2 border-t border-line">
                <button
                  onClick={() => { close(); demo('Marked all as read') }}
                  className="text-2xs font-medium text-brand-700 hover:underline"
                >
                  Mark all as read
                </button>
              </div>
            </>
          )}
        </Dropdown>

        {/* Profile */}
        <Dropdown
          width="w-60"
          trigger={({ toggle }) => (
            <button onClick={toggle} className="flex items-center gap-2 pl-1 pr-1.5 h-9 rounded-lg hover:bg-surface-sunken transition-colors">
              <span className="h-7 w-7 rounded-full bg-bronze-500 text-white text-[11px] font-semibold inline-flex items-center justify-center">
                AM
              </span>
              <span className="hidden sm:block text-left leading-tight">
                <span className="block text-[13px] font-semibold text-ink">Arjun Mehta</span>
                <span className="block text-[10px] text-ink-3">Super Admin</span>
              </span>
              <ChevronDown size={14} className="text-ink-3" />
            </button>
          )}
        >
          {(close) => (
            <>
              <div className="px-3 py-2.5 border-b border-line">
                <p className="text-[13px] font-semibold text-ink">Arjun Mehta</p>
                <p className="text-2xs text-ink-3">arjun.mehta@brio.in</p>
                <Badge tone="brand" className="mt-2">Super Admin · Full access</Badge>
              </div>
              <MenuItem icon={<User size={14} />} onClick={() => { close(); demo('Opening profile') }}>Profile</MenuItem>
              <MenuItem icon={<SlidersHorizontal size={14} />} onClick={() => { close(); navigate('/settings') }}>Preferences</MenuItem>
              <MenuItem icon={<ShieldCheck size={14} />} onClick={() => { close(); navigate('/settings/users') }}>Security</MenuItem>
              <MenuDivider />
              <MenuItem icon={<LogOut size={14} />} danger onClick={() => { close(); onSignOut() }}>Sign out</MenuItem>
            </>
          )}
        </Dropdown>
      </div>
    </header>
  )
}
