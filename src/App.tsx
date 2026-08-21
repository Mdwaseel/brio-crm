import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { ToastProvider } from '@/components/ui'
import { AppShell } from '@/components/layout/AppShell'
import { Login } from '@/pages/Login'
import { Dashboard } from '@/pages/Dashboard'
import { Leads } from '@/pages/Leads'
import { Customers } from '@/pages/Customers'
import { Customer360 } from '@/pages/Customer360'
import { Pipeline } from '@/pages/Pipeline'
import { Quotations } from '@/pages/Quotations'
import { Service } from '@/pages/Service'
import { Projects } from '@/pages/Projects'
import { Inventory } from '@/pages/Inventory'
import { Employees } from '@/pages/Employees'
import { Feedback } from '@/pages/Feedback'
import { Automation } from '@/pages/Automation'
import { Intelligence } from '@/pages/Intelligence'
import { Assistant } from '@/pages/Assistant'
import { Reports } from '@/pages/Reports'
import { DailyBrief } from '@/pages/DailyBrief'
import { Settings } from '@/pages/Settings'
import { UsersRoles } from '@/pages/UsersRoles'
import { AuditLogs } from '@/pages/AuditLogs'
import { NotFound } from '@/pages/NotFound'

function LoginRoute({ onSignIn }: { onSignIn: () => void }) {
  const navigate = useNavigate()
  return (
    <Login
      onSignIn={() => {
        onSignIn()
        navigate('/dashboard')
      }}
    />
  )
}

function ShellRoute({ onSignOut }: { onSignOut: () => void }) {
  const navigate = useNavigate()
  return (
    <AppShell
      onSignOut={() => {
        onSignOut()
        navigate('/login')
      }}
    />
  )
}

const AUTH_KEY = 'brio.session'

export default function App() {
  const [authed, setAuthed] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'active'
    } catch {
      return false
    }
  })

  const setSession = (value: boolean) => {
    setAuthed(value)
    try {
      value ? sessionStorage.setItem(AUTH_KEY, 'active') : sessionStorage.removeItem(AUTH_KEY)
    } catch {
      /* storage unavailable — session stays in memory only */
    }
  }

  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginRoute onSignIn={() => setSession(true)} />} />
          {authed ? (
            <Route element={<ShellRoute onSignOut={() => setSession(false)} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customers/:id" element={<Customer360 />} />
              <Route path="/pipeline" element={<Pipeline />} />
              <Route path="/quotations" element={<Quotations />} />
              <Route path="/service" element={<Service />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/automation" element={<Automation />} />
              <Route path="/intelligence" element={<Intelligence />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/brief" element={<DailyBrief />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/users" element={<UsersRoles />} />
              <Route path="/settings/audit" element={<AuditLogs />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
          <Route path="/" element={<Navigate to={authed ? '/dashboard' : '/login'} replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}
