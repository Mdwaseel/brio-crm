import { cn, initials, toneFor } from '@/lib/utils'

export function Avatar({
  name, size = 'md', className, ring,
}: { name: string; size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; className?: string; ring?: boolean }) {
  const sizes = {
    xs: 'h-5 w-5 text-[9px]',
    sm: 'h-6 w-6 text-[10px]',
    md: 'h-8 w-8 text-[11px]',
    lg: 'h-10 w-10 text-[13px]',
    xl: 'h-14 w-14 text-lg',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold shrink-0 select-none',
        sizes[size], toneFor(name), ring && 'ring-2 ring-white', className,
      )}
      title={name}
      aria-hidden
    >
      {initials(name)}
    </span>
  )
}

export function AvatarGroup({ names, max = 4, size = 'sm' }: { names: string[]; max?: number; size?: 'xs' | 'sm' | 'md' }) {
  const shown = names.slice(0, max)
  const rest = names.length - shown.length
  const box = size === 'xs' ? 'h-5 w-5 text-[9px]' : size === 'sm' ? 'h-6 w-6 text-[10px]' : 'h-8 w-8 text-[11px]'
  return (
    <div className="flex items-center -space-x-1.5">
      {shown.map((n) => <Avatar key={n} name={n} size={size} ring />)}
      {rest > 0 && (
        <span className={cn('inline-flex items-center justify-center rounded-full bg-surface-sunken text-ink-2 font-semibold ring-2 ring-white', box)}>
          +{rest}
        </span>
      )}
    </div>
  )
}
