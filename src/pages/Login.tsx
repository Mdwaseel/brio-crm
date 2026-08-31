import { useState } from 'react'
import { ArrowRight, Lock, Mail, ShieldCheck, Sparkles, Workflow, Gauge, Loader2 } from 'lucide-react'
import { BrioLogo } from '@/components/layout/Logo'
import { Button, Input, Label, Checkbox, useToast } from '@/components/ui'

const PILLARS = [
  { icon: Gauge, title: 'Business Health', text: 'Continuous scoring across revenue, delivery, service and people.' },
  { icon: Sparkles, title: 'Intelligence', text: 'Risks and recommendations surfaced before they reach the P&L.' },
  { icon: Workflow, title: 'Automation', text: 'Business events converted into assigned, tracked actions.' },
]

const FLOW = ['Data', 'KPI', 'Insight', 'Risk', 'Recommendation', 'Automation', 'Result']

export function Login({ onSignIn }: { onSignIn: () => void }) {
  const [email, setEmail] = useState('venkatesh@brioelevators.com')
  const [password, setPassword] = useState('demo-access')
  const [loading, setLoading] = useState(false)
  const { demo } = useToast()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(onSignIn, 620)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-[1.05fr_1fr] bg-surface">
      {/* Brand story */}
      <section className="relative hidden lg:flex flex-col justify-between bg-brand-900 text-white p-12 xl:p-16 overflow-hidden">
        <div
          className="absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #a8e05a 0%, transparent 70%)' }}
          aria-hidden
        />
        <div className="relative">
          <BrioLogo inverted size="lg" showTagline />
        </div>

        <div className="relative max-w-lg">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze-300">
            Business Operations Platform
          </p>
          <h1 className="font-display text-[40px] xl:text-[46px] leading-[1.08] font-extrabold mt-5 tracking-tight text-white">
            Know what is happening.
            <br />
            Know what is going wrong.
            <br />
            <span className="text-bronze-300">Know what to do next.</span>
          </h1>
          <p className="text-[15px] text-brand-200/90 mt-5 leading-relaxed">
            Brio unifies CRM, operations, employee intelligence and automation into one
            operating system for the business — so leadership decisions are made on evidence,
            not on end-of-month reports.
          </p>

          <div className="mt-10 space-y-5">
            {PILLARS.map((p) => (
              <div key={p.title} className="flex items-start gap-3.5">
                <span className="h-10 w-10 rounded-full bg-white/10 ring-1 ring-white/15 inline-flex items-center justify-center shrink-0">
                  <p.icon size={17} className="text-bronze-300" />
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-white">{p.title}</p>
                  <p className="text-[13px] text-brand-200/80 mt-0.5 leading-relaxed">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center gap-1.5 flex-wrap">
            {FLOW.map((step, i) => (
              <span key={step} className="inline-flex items-center gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-forest-200/70 border border-white/10 rounded-full px-2.5 py-1 bg-white/[0.04]">
                  {step}
                </span>
                {i < FLOW.length - 1 && <ArrowRight size={11} className="text-bronze-400/70" />}
              </span>
            ))}
          </div>
          <p className="text-2xs text-brand-300/70 mt-6">
            © 2026 Brio. Prototype environment for client demonstration.
          </p>
        </div>
      </section>

      {/* Login card */}
      <section className="flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-12 bg-surface">
        <div className="lg:hidden mb-10">
          <BrioLogo size="md" showTagline />
        </div>

        <div className="w-full max-w-[400px] mx-auto">
          <span className="inline-flex items-center gap-1.5 text-2xs font-semibold text-bronze-700 bg-bronze-50 border border-bronze-100 rounded-full px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-bronze-500" />
            Demo environment
          </span>

          <h2 className="font-display text-[30px] font-bold text-ink mt-5 tracking-tight">Welcome back</h2>
          <p className="text-[14px] text-ink-2 mt-2">
            Sign in to the Brio workspace to continue where you left off.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={15} />}
                placeholder="you@company.in"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" hint="Minimum 8 characters">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={15} />}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <Checkbox id="remember" label="Remember me" defaultChecked />
              <button
                type="button"
                onClick={() => demo('Password reset link sent')}
                className="text-[13px] font-medium text-accent hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" variant="primary" size="lg" block disabled={loading}
              iconRight={loading ? <Loader2 size={15} className="animate-spin" /> : <ArrowRight size={15} />}>
              {loading ? 'Signing in' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-6 flex items-start gap-2.5 rounded-2xl bg-surface-muted px-4 py-3.5">
            <ShieldCheck size={15} className="text-forest-700 mt-0.5 shrink-0" />
            <p className="text-2xs text-ink-2 leading-relaxed">
              This is a static prototype. Credentials are pre-filled and no data leaves your browser —
              authentication, roles and audit trails are wired up in the production build.
            </p>
          </div>

          <p className="text-2xs text-ink-3 text-center mt-8">
            Need access for your team?{' '}
            <button onClick={() => demo('Request sent to workspace admin')} className="font-medium text-accent hover:underline">
              Contact your workspace admin
            </button>
          </p>
        </div>
      </section>
    </div>
  )
}
