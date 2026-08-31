import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles, Send, User, BarChart3, ArrowRight, RefreshCw, Database, Lightbulb, ThumbsUp, ThumbsDown, Copy,
} from 'lucide-react'
import { Button, Input, Card, Badge, useToast, Avatar } from '@/components/ui'
import { BrioMark } from '@/components/layout/Logo'
import { cn } from '@/lib/utils'

type Msg = {
  id: number
  role: 'user' | 'ai'
  text?: string
  answer?: {
    summary: string
    factors: string[]
    actions: string[]
    sources?: { label: string; to: string }[]
  }
}

const SUGGESTIONS = [
  'Why is revenue down?',
  'Which customers are at risk?',
  'Which projects are delayed?',
  'Who needs manager attention?',
  'Which leads should sales prioritise?',
]

const CANNED: Record<string, Msg['answer']> = {
  default: {
    summary: 'Service performance decreased 6.2% this month.',
    factors: [
      'Ticket backlog increased 17%',
      'Two engineers are above workload threshold',
      'Average resolution time increased 11%',
      'Three high-priority tickets are approaching SLA breach',
    ],
    actions: ['Redistribute 8 priority tickets', 'Review engineer workload', 'Escalate 3 SLA-risk tickets'],
    sources: [
      { label: 'Service & Tickets', to: '/service' },
      { label: 'Employees', to: '/employees' },
    ],
  },
  revenue: {
    summary: 'Revenue is not down — it is up 12.8% month on month at ₹48.6L, but 3% short of the ₹50L target.',
    factors: [
      'Enterprise conversion reached 41%, the strongest in six months',
      'Mid-market win rate fell to 24% against a 32% benchmark',
      'Two large deals slipped from August into September',
      'AMC renewal revenue is flat because six contracts are still unsigned',
    ],
    actions: ['Accelerate the two slipped deals', 'Route mid-market leads to inside sales', 'Start the AMC renewal play early'],
    sources: [
      { label: 'Sales Pipeline', to: '/pipeline' },
      { label: 'Reports', to: '/reports' },
    ],
  },
  customers: {
    summary: 'Three accounts are at risk, carrying ₹1.13Cr of revenue between them.',
    factors: [
      'Crescent Mall — health 58, seven open tickets and a repeat escalator fault',
      'Vertex Infra — health 64, six open tickets and an expired quotation',
      'Orion Works — health 61, budget deferred to the next financial year',
      'Combined AMC exposure of ₹22.1L renews within 120 days',
    ],
    actions: ['Assign a recovery owner per account', 'Close the repeat fault at Crescent Mall', 'Re-price the expired Vertex quotation'],
    sources: [
      { label: 'Customers', to: '/customers' },
      { label: 'Service & Tickets', to: '/service' },
    ],
  },
  projects: {
    summary: 'Two of eight active projects are behind schedule, both blocked on supplier commitments.',
    factors: [
      'Metro Tower Installation — shaft installation is 3 days overdue, civil works slipped 12 days',
      'Crescent Mall Refurbishment — step chain supplier slipped by 3 weeks',
      'Combined delivery value at risk is ₹1.76Cr',
      'Neither project has a recovery plan logged',
    ],
    actions: ['Run a recovery review with both managers', 'Escalate supplier commitments in writing', 'Re-baseline the two schedules'],
    sources: [{ label: 'Projects', to: '/projects' }],
  },
  employees: {
    summary: 'Three people need manager attention this week.',
    factors: [
      'Kiran Das — 98% workload, engagement down 8 points, 31 open tasks',
      'Sahil Khan — 94% workload with two escalated safety tickets',
      'Vikram Rao — 96% workload while managing the two delayed projects',
      'All three sit in service or delivery functions',
    ],
    actions: ['Schedule 1:1s this week', 'Redistribute open tasks to the western region', 'Review the weekend coverage rotation'],
    sources: [
      { label: 'Employees', to: '/employees' },
      { label: 'Feedback Intelligence', to: '/feedback' },
    ],
  },
  leads: {
    summary: 'Five leads should be prioritised today, worth ₹1.19Cr in estimated value.',
    factors: [
      'Rohan Kapoor — Apex Elevators, score 92, follow-up due tomorrow',
      'Imran Qureshi — Prime Estates, score 89, follow-up due today',
      'Neha Reddy — Urban Spaces, score 87, commercial call pending',
      'Tanya Sethi — Metro Living, score 81, revised commercial requested',
    ],
    actions: ['Contact the two follow-ups due today', 'Send the revised Metro Living commercial', 'Book the Urban Spaces CFO call'],
    sources: [
      { label: 'Leads', to: '/leads' },
      { label: 'Sales Pipeline', to: '/pipeline' },
    ],
  },
}

function pick(q: string) {
  const s = q.toLowerCase()
  if (s.includes('revenue') || s.includes('sales down')) return CANNED.revenue
  if (s.includes('customer') || s.includes('churn') || s.includes('risk')) return CANNED.customers
  if (s.includes('project') || s.includes('delay')) return CANNED.projects
  if (s.includes('employee') || s.includes('manager') || s.includes('attention') || s.includes('workload')) return CANNED.employees
  if (s.includes('lead') || s.includes('prioriti')) return CANNED.leads
  return CANNED.default
}

export function Assistant() {
  const { demo } = useToast()
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(2)

  const [messages, setMessages] = useState<Msg[]>([
    { id: 0, role: 'user', text: 'Why did service performance decrease this month?' },
    { id: 1, role: 'ai', answer: CANNED.default },
  ])

  useEffect(() => {
    endRef.current?.scrollIntoView?.({ behavior: 'smooth', block: 'end' })
  }, [messages, thinking])

  const ask = (text: string) => {
    if (!text.trim()) return
    const uid = ++idRef.current
    setMessages((m) => [...m, { id: uid, role: 'user', text }])
    setInput('')
    setThinking(true)
    setTimeout(() => {
      setThinking(false)
      setMessages((m) => [...m, { id: ++idRef.current, role: 'ai', answer: pick(text) }])
    }, 900)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-9rem)] min-h-[560px]">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-line">
        <div className="flex items-start gap-3.5">
          <BrioMark size={44} />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-[26px] font-bold text-ink tracking-tight leading-none">Brio Intelligence</h1>
              <Badge tone="bronze">Beta</Badge>
            </div>
            <p className="text-[14px] text-ink-2 mt-1.5">Ask questions about your business.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" icon={<Database size={13} />} onClick={() => demo('Opening connected data sources')}>
            8 data sources
          </Button>
          <Button size="sm" variant="ghost" icon={<RefreshCw size={13} />} onClick={() => { setMessages(messages.slice(0, 2)); demo('Conversation reset') }}>
            Reset
          </Button>
        </div>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto scroll-thin py-6 space-y-5">
        {messages.map((m) =>
          m.role === 'user' ? (
            <div key={m.id} className="flex justify-end">
              <div className="flex items-start gap-3 max-w-2xl">
                <div className="rounded-2xl rounded-tr-md bg-brand-700 text-white px-4 py-3">
                  <p className="text-[14px] leading-relaxed">{m.text}</p>
                </div>
                <Avatar name="Venkatesh Jagabathina" size="md" />
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex items-start gap-3 max-w-4xl">
              <BrioMark size={32} />
              <div className="min-w-0 flex-1">
                <Card className="overflow-hidden">
                  <div className="px-4 py-3 border-b border-line bg-surface-muted flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 text-2xs font-semibold text-ink-2">
                      <Sparkles size={12} className="text-bronze-500" />
                      Brio Intelligence
                    </span>
                    <span className="text-[10px] text-ink-3">Analysed 8 modules · 14,206 records</span>
                  </div>

                  <div className="p-4">
                    <p className="text-[14px] font-medium text-ink leading-relaxed">{m.answer!.summary}</p>

                    <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-3 mt-4 mb-2">
                      Contributing factors
                    </p>
                    <ul className="space-y-1.5">
                      {m.answer!.factors.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-[13px] text-ink-2 leading-relaxed">
                          <span className="mt-[7px] h-1 w-1 rounded-full bg-brand-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-3 mt-4 mb-2">
                      Recommended actions
                    </p>
                    <ol className="space-y-1.5">
                      {m.answer!.actions.map((a, i) => (
                        <li key={a} className="flex items-start gap-2.5 text-[13px] text-ink leading-relaxed">
                          <span className="h-[18px] w-[18px] rounded-md bg-brand-50 text-brand-700 text-[10px] font-bold inline-flex items-center justify-center shrink-0 num mt-px">
                            {i + 1}
                          </span>
                          {a}
                        </li>
                      ))}
                    </ol>

                    {m.answer!.sources && (
                      <div className="mt-4 pt-3.5 border-t border-line flex flex-wrap items-center gap-2">
                        <span className="text-2xs text-ink-3">Sources:</span>
                        {m.answer!.sources.map((s) => (
                          <button
                            key={s.label}
                            onClick={() => navigate(s.to)}
                            className="inline-flex items-center gap-1 text-2xs font-medium text-brand-700 border border-brand-200 bg-brand-50 rounded-md px-2 py-1 hover:bg-brand-100 transition-colors"
                          >
                            {s.label}
                            <ArrowRight size={10} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="px-4 py-2.5 border-t border-line bg-surface-muted/60 flex items-center gap-1.5">
                    <button onClick={() => demo('Feedback recorded')} aria-label="Helpful"
                      className="h-7 w-7 rounded-md inline-flex items-center justify-center text-ink-3 hover:text-success hover:bg-success-soft transition-colors">
                      <ThumbsUp size={13} />
                    </button>
                    <button onClick={() => demo('Feedback recorded')} aria-label="Not helpful"
                      className="h-7 w-7 rounded-md inline-flex items-center justify-center text-ink-3 hover:text-danger hover:bg-danger-soft transition-colors">
                      <ThumbsDown size={13} />
                    </button>
                    <button onClick={() => demo('Copied to clipboard')} aria-label="Copy"
                      className="h-7 w-7 rounded-md inline-flex items-center justify-center text-ink-3 hover:text-ink hover:bg-surface-sunken transition-colors">
                      <Copy size={13} />
                    </button>
                    <button onClick={() => navigate('/reports')}
                      className="ml-auto inline-flex items-center gap-1.5 text-2xs font-semibold text-brand-700 hover:underline">
                      <BarChart3 size={12} /> View supporting data
                    </button>
                  </div>
                </Card>
              </div>
            </div>
          ),
        )}

        {thinking && (
          <div className="flex items-start gap-3">
            <BrioMark size={32} />
            <div className="rounded-xl border border-line bg-surface px-4 py-3 flex items-center gap-2.5">
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-dot-pulse"
                    style={{ animationDelay: `${i * 160}ms` }} />
                ))}
              </span>
              <span className="text-2xs text-ink-3">Analysing across CRM, service, projects and people data…</span>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Composer */}
      <div className="border-t border-line pt-4">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="inline-flex items-center gap-1.5 text-2xs text-ink-3">
            <Lightbulb size={12} className="text-bronze-500" /> Try asking:
          </span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => ask(s)}
              className="text-2xs font-medium text-ink-2 border border-line bg-surface rounded-full px-3 py-1.5 hover:border-brand-300 hover:text-brand-700 hover:bg-brand-50 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); ask(input) }}
          className="flex items-center gap-2.5"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about revenue, customers, delivery, service or your teams…"
            aria-label="Ask Brio Intelligence"
            icon={<User size={15} />}
            className="h-11"
          />
          <Button type="submit" variant="primary" size="lg" icon={<Send size={15} />} disabled={!input.trim()}>
            Ask
          </Button>
        </form>

        <p className={cn('text-[10px] text-ink-3 mt-2.5 text-center')}>
          Responses in this prototype are pre-authored to demonstrate the interaction model. No AI service is called.
        </p>
      </div>
    </div>
  )
}
