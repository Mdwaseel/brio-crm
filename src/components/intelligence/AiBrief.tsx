import { Sparkles, ArrowRight, Database, CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { aiBrief } from '@/data/analytics'
import { Button, useToast } from '@/components/ui'

const TONE_ICON: Record<string, ReactNode> = {
  success: <CheckCircle2 size={14} className="text-success" />,
  danger: <XCircle size={14} className="text-danger" />,
  warning: <AlertTriangle size={14} className="text-warning" />,
  info: <Info size={14} className="text-info" />,
}

export function AiBriefPanel({ compact }: { compact?: boolean }) {
  const { demo } = useToast()

  return (
    <section className="relative overflow-hidden rounded-2xl bg-brand-900 text-white border border-brand-950/40 shadow-lg">
      <div
        className="absolute -top-32 -right-20 h-80 w-80 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #a47d57 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="relative p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-3">
            <span className="h-10 w-10 rounded-xl bg-white/10 ring-1 ring-white/15 inline-flex items-center justify-center shrink-0">
              <Sparkles size={18} className="text-bronze-300" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-[17px] font-semibold text-white leading-tight">AI Business Brief</h2>
                <span className="text-[9px] font-bold uppercase tracking-wider text-bronze-200 bg-bronze-500/25 ring-1 ring-bronze-400/30 rounded px-1.5 py-0.5">
                  Generated
                </span>
              </div>
              <p className="text-[13px] text-brand-200/85 mt-0.5">Your business snapshot · 22 Aug 2026, 09:00 IST</p>
            </div>
          </div>
          <span className="text-2xs text-brand-300/80 num">Analysed 14,206 records across 8 modules</span>
        </div>

        <p className="mt-5 text-[15px] leading-relaxed text-white/95 font-medium max-w-4xl">{aiBrief.headline}</p>

        <div className={cn('mt-5 grid gap-2.5', compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2 xl:grid-cols-4')}>
          {aiBrief.points.map((p, i) => (
            <div key={i} className="flex items-start gap-2.5 rounded-xl bg-white/[0.06] ring-1 ring-white/10 px-3.5 py-3">
              <span className="mt-0.5 shrink-0">{TONE_ICON[p.tone]}</span>
              <p className="text-[13px] leading-relaxed text-brand-100/90">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-bronze-300 mb-3">Recommended actions</p>
          <ol className="grid gap-2.5 lg:grid-cols-3">
            {aiBrief.recommendations.map((r, i) => (
              <li key={r.id} className="rounded-xl bg-white/[0.06] ring-1 ring-white/10 p-3.5">
                <div className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-md bg-bronze-500/30 ring-1 ring-bronze-400/30 text-bronze-100 text-[11px] font-bold inline-flex items-center justify-center shrink-0 num">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-white leading-snug">{r.title}</p>
                    <p className="text-2xs text-brand-200/80 mt-1 leading-relaxed">{r.detail}</p>
                    <p className="text-2xs text-bronze-300 mt-2 font-medium">{r.impact}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <Button
            variant="accent"
            size="md"
            iconRight={<ArrowRight size={15} />}
            onClick={() => demo('Opening recommendation queue')}
          >
            Review recommendations
          </Button>
          <button
            onClick={() => demo('Opening supporting data')}
            className="inline-flex items-center gap-2 h-9 px-3.5 rounded-lg text-[13px] font-medium text-brand-100 bg-white/[0.08] ring-1 ring-white/15 hover:bg-white/[0.14] transition-colors"
          >
            <Database size={14} />
            View supporting data
          </button>
          <span className="text-2xs text-brand-300/70 ml-auto">
            AI-generated summary · static content in this prototype
          </span>
        </div>
      </div>
    </section>
  )
}
