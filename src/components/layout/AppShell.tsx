import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { GlobalSearch } from './GlobalSearch'
import { useToast } from '@/components/ui'

export function AppShell({ onSignOut }: { onSignOut: () => void }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { demo } = useToast()

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-surface-muted">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onProfileClick={() => navigate('/settings/users')}
      />

      <div className={cn('transition-[padding] duration-300', collapsed ? 'lg:pl-[80px]' : 'lg:pl-[264px]')}>
        <Topbar
          onMenuClick={() => setMobileOpen(true)}
          onSearchClick={() => setSearchOpen(true)}
          onSignOut={() => {
            demo('Signing out')
            setTimeout(onSignOut, 350)
          }}
        />
        <main key={location.pathname} className="px-4 sm:px-6 lg:px-7 pb-8 pt-1 animate-fade-up">
          <div className="mx-auto max-w-[1560px]">
            <Outlet />
          </div>
        </main>
      </div>

      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
