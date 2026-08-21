import { cn } from '@/lib/utils'

/**
 * Brio mark — derived from the arrowhead motif in brio-logo.svg (#a47d57),
 * paired with the wordmark colour (#234a67).
 */
export function BrioMark({ size = 32, className, inverted }: { size?: number; className?: string; inverted?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-lg shrink-0',
        inverted ? 'bg-white/10 ring-1 ring-white/15' : 'bg-brand-700',
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none">
        <path d="M12 3.4 21 15.2h-5.6L12 10.2 8.6 15.2H3L12 3.4Z" fill="#a47d57" />
        <path d="M6.6 18.1h10.8l1.6 2.4H5L6.6 18.1Z" fill={inverted ? '#ffffff' : '#e2ebf2'} fillOpacity={inverted ? 0.9 : 1} />
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
  const mark = { sm: 28, md: 32, lg: 44 }[size]
  const text = { sm: 'text-[17px]', md: 'text-[19px]', lg: 'text-[26px]' }[size]
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <BrioMark size={mark} inverted={inverted} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display font-extrabold tracking-tight',
            text,
            inverted ? 'text-white' : 'text-brand-800',
          )}
        >
          Brio
        </span>
        {showTagline && (
          <span
            className={cn(
              'text-[9px] font-semibold uppercase tracking-[0.16em] mt-1',
              inverted ? 'text-brand-200/80' : 'text-bronze-600',
            )}
          >
            Business Operations
          </span>
        )}
      </span>
    </span>
  )
}
