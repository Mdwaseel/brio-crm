import { cn } from '@/lib/utils'

/**
 * Brio mark — the arrowhead motif from brio-logo.svg, set in a round
 * forest-green badge with a spring-green glyph.
 */
export function BrioMark({ size = 32, className, inverted }: { size?: number; className?: string; inverted?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full shrink-0 overflow-hidden relative',
        inverted ? 'bg-white/12 ring-1 ring-white/20' : 'bg-forest-900',
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {!inverted && (
        <span
          className="absolute inset-0"
          style={{ background: 'radial-gradient(80% 80% at 78% 18%, rgba(168,224,90,.45) 0%, transparent 62%)' }}
        />
      )}
      <svg width={size * 0.54} height={size * 0.54} viewBox="0 0 24 24" fill="none" className="relative">
        <path d="M12 3.4 21 15.2h-5.6L12 10.2 8.6 15.2H3L12 3.4Z" fill="#a8e05a" />
        <path d="M6.6 18.1h10.8l1.6 2.4H5L6.6 18.1Z" fill="#ffffff" fillOpacity={0.85} />
      </svg>
    </span>
  )
}

export function BrioLogo({
  size = 'md',
  inverted,
  showTagline,
}: {
  size?: 'sm' | 'md' | 'lg'
  inverted?: boolean
  showTagline?: boolean
}) {
  const mark = { sm: 28, md: 34, lg: 44 }[size]
  const text = { sm: 'text-[17px]', md: 'text-[20px]', lg: 'text-[26px]' }[size]
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <BrioMark size={mark} inverted={inverted} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display font-extrabold tracking-tight',
            text,
            inverted ? 'text-white' : 'text-forest-900',
          )}
        >
          Brio
        </span>
        {showTagline && (
          <span
            className={cn(
              'text-[9px] font-semibold uppercase tracking-[0.16em] mt-1',
              inverted ? 'text-white/70' : 'text-ink-3',
            )}
          >
            Business Operations
          </span>
        )}
      </span>
    </span>
  )
}
