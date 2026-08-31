import { useNavigate } from 'react-router-dom'
import {
  Menu, Search, Bell, ChevronDown, Calendar, Download, User, SlidersHorizontal, ShieldCheck, LogOut,
  AlertTriangle, UserPlus, HardHat, RefreshCw, MessageSquareHeart, FileCheck2, Command, Settings, HelpCircle,
  Sun, Moon,
} from 'lucide-react'
import { cn, relTime } from '@/lib/utils'
import { useTheme, THEME_OPTIONS } from '@/lib/theme'
import { Button, IconButton, Dropdown, MenuItem, MenuLabel, MenuDivider, Badge, useToast } from '@/components/ui'
import { notifications } from '@/data/analytics'
import { BrioLogo } from './Logo'

const NOTIF_ICON = {
  sla: { icon: AlertTriangle, tone: 'bg-danger-soft text-danger' },
  lead: { icon: UserPlus, tone: 'bg-info-soft text-info' },
  project: { icon: HardHat, tone: 'bg-warning-soft text-warning' },
  amc: { icon: RefreshCw, tone: 'bg-lime-100 text-lime-800' },
  feedback: { icon: MessageSquareHeart, tone: 'bg-success-soft text-success' },
  approval: { icon: FileCheck2, tone: 'bg-forest-50 text-forest-700' },
}

/** Circular chrome button — the reference pattern for secondary shell actions. */
function RoundAction({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-surface ring-1 ring-[color:var(--ring-hairline)] text-ink-2 hover:text-ink hover:ring-lime-300 transition-colors shadow-xs"
    >
      {children}
    </button>
  )
}

/**
 * Click flips light/dark; the caret opens the three-way choice so "follow the
 * system" stays reachable without burying it in Settings.
 */
function ThemeControl() {
  const { theme, preference, setPreference, toggle } = useTheme()

  return (
    <div className="flex items-center rounded-full bg-surface ring-1 ring-[color:var(--ring-hairline)] shadow-xs">
      <button
        onClick={toggle}
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        className="h-10 w-10 inline-flex items-center justify-center rounded-full text-ink-2 hover:text-ink transition-colors"
      >
        {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
      </button>
      <Dropdown
        width="w-48"
        align="right"
        trigger={({ toggle: open }) => (
          <button
            onClick={open}
            aria-label="Theme options"
            className="h-10 w-6 -ml-2 pr-1.5 inline-flex items-center justify-center rounded-r-full text-ink-3 hover:text-ink transition-colors"
          >
            <ChevronDown size={13} />
          </button>
        )}
      >
        {(close) => (
          <>
            <MenuLabel>Appearance</MenuLabel>
            {THEME_OPTIONS.map((o) => (
              <MenuItem
                key={o.id}
                icon={<o.icon size={14} />}
                active={preference === o.id}
                onClick={() => { close(); setPreference(o.id) }}
              >
                {o.label}
              </MenuItem>
            ))}
          </>
        )}
      </Dropdown>
    </div>
  )
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
    <header className="sticky top-0 z-30 h-[72px] bg-surface-muted/85 backdrop-blur-md">
      <div className="h-full px-4 sm:px-6 lg:px-7 flex items-center gap-3">
        <IconButton label="Open navigation" className="lg:hidden bg-surface ring-1 ring-[color:var(--ring-hairline)]" onClick={onMenuClick}>
          <Menu size={18} />
        </IconButton>

        {/* The sidebar carries the brand on desktop; below lg it is off-canvas. */}
        <span className="lg:hidden">
          <BrioLogo size="sm" />
        </span>

        <div className="flex-1" />

        {/* Search — pill, matching the reference's rounded field */}
        <button
          onClick={onSearchClick}
          className={cn(
            'group flex items-center gap-2.5 h-11 pl-4 pr-2 rounded-full bg-surface ring-1 ring-[color:var(--ring-hairline)] shadow-xs',
            'text-ink-3 hover:ring-lime-300 transition-shadow',
            'w-full max-w-[340px]',
          )}
        >
          <Search size={16} className="shrink-0" />
          <span className="text-[13px] truncate flex-1 text-left">Search anything</span>
          <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-semibold text-ink-2 bg-surface-muted rounded-full px-2 py-1">
            <Command size={9} /> K
          </span>
        </button>

        {/* Date range */}
        <Dropdown
          width="w-52"
          trigger={({ toggle }) => (
            <Button size="md" variant="secondary" icon={<Calendar size={14} />} iconRight={<ChevronDown size={13} />} onClick={toggle}
              className="hidden xl:inline-flex">
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

        <ThemeControl />

        <div className="hidden md:flex items-center gap-2">
          <RoundAction label="Export" onClick={() => demo('Export started')}>
            <Download size={17} />
          </RoundAction>
          <RoundAction label="Settings" onClick={() => navigate('/settings')}>
            <Settings size={17} />
          </RoundAction>
          <RoundAction label="Help centre" onClick={() => demo('Opening help centre')}>
            <HelpCircle size={17} />
          </RoundAction>
        </div>

        {/* Notifications */}
        <Dropdown
          width="w-[380px]"
          trigger={({ toggle, open }) => (
            <button
              onClick={toggle}
              aria-label={`Notifications, ${unread} unread`}
              className={cn(
                'relative h-10 w-10 inline-flex items-center justify-center rounded-full ring-1 ring-[color:var(--ring-hairline)] shadow-xs transition-colors',
                open ? 'bg-forest-900 text-lime-300 ring-forest-900' : 'bg-surface text-ink-2 hover:text-ink hover:ring-lime-300',
              )}
            >
              <Bell size={17} />
              {unread > 0 && (
                <span className="absolute top-1 right-1 h-[16px] min-w-[16px] px-1 rounded-full bg-danger text-white text-[9px] font-bold flex items-center justify-center num ring-2 ring-surface-muted">
                  {unread}
                </span>
              )}
            </button>
          )}
        >
          {(close) => (
            <>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[13px] font-semibold text-ink">Notifications</span>
                <Badge tone="danger">{unread} new</Badge>
              </div>
              <div className="max-h-[340px] overflow-y-auto scroll-thin px-2">
                {notifications.map((n) => {
                  const meta = NOTIF_ICON[n.type]
                  const Icon = meta.icon
                  return (
                    <button
                      key={n.id}
                      onClick={() => { close(); demo('Opening notification') }}
                      className={cn(
                        'w-full flex items-start gap-3 px-2.5 py-2.5 text-left rounded-xl hover:bg-surface-muted transition-colors',
                        n.unread && 'bg-lime-50/60',
                      )}
                    >
                      <span className={cn('h-8 w-8 rounded-full inline-flex items-center justify-center shrink-0', meta.tone)}>
                        <Icon size={14} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13px] font-medium text-ink leading-snug">{n.title}</span>
                        <span className="block text-2xs text-ink-2 mt-0.5 leading-relaxed">{n.description}</span>
                        <span className="block text-[10px] text-ink-3 mt-1 num">{relTime(n.time)}</span>
                      </span>
                      {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-lime-500 mt-1.5 shrink-0" />}
                    </button>
                  )
                })}
              </div>
              <div className="px-4 py-3 mt-1 border-t border-line/70">
                <button
                  onClick={() => { close(); demo('Marked all as read') }}
                  className="text-2xs font-semibold text-accent hover:underline"
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
            <button
              onClick={toggle}
              className="h-10 w-10 rounded-full bg-forest-900 text-lime-300 text-[12px] font-bold inline-flex items-center justify-center ring-2 ring-surface hover:ring-lime-300 transition-colors shadow-xs"
              aria-label="Account menu"
            >
              VJ
            </button>
          )}
        >
          {(close) => (
            <>
              <div className="px-4 py-3">
                <p className="text-[13px] font-semibold text-ink">Venkatesh Jagabathina</p>
                <p className="text-2xs text-ink-3">venkatesh@brioelevators.com</p>
                <Badge tone="bronze" className="mt-2">Super Admin · Full access</Badge>
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
