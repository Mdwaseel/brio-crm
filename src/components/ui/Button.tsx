import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'accent' | 'subtle'
type Size = 'xs' | 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-brand-700 text-white border border-brand-700 hover:bg-brand-800 hover:border-brand-800 shadow-xs active:bg-brand-900',
  accent:
    'bg-bronze-500 text-white border border-bronze-500 hover:bg-bronze-600 hover:border-bronze-600 shadow-xs',
  secondary:
    'bg-surface text-ink border border-line hover:bg-surface-muted hover:border-line-strong shadow-xs active:bg-surface-sunken',
  outline: 'bg-transparent text-brand-700 border border-brand-200 hover:bg-brand-50',
  subtle: 'bg-surface-sunken text-ink-2 border border-transparent hover:bg-brand-50 hover:text-brand-700',
  ghost: 'bg-transparent text-ink-2 border border-transparent hover:bg-surface-sunken hover:text-ink',
  danger: 'bg-danger text-white border border-danger hover:bg-danger-ink shadow-xs',
}

const SIZES: Record<Size, string> = {
  xs: 'h-7 px-2.5 text-2xs gap-1.5 rounded-md',
  sm: 'h-8 px-3 text-[13px] gap-1.5 rounded-lg',
  md: 'h-9 px-3.5 text-[13px] gap-2 rounded-lg',
  lg: 'h-10 px-4 text-sm gap-2 rounded-lg',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconRight?: ReactNode
  block?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'secondary', size = 'md', icon, iconRight, block, className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-medium whitespace-nowrap select-none',
        'transition-[background-color,border-color,color,box-shadow,transform] duration-150',
        'active:scale-[.985] disabled:opacity-50 disabled:pointer-events-none',
        VARIANTS[variant],
        SIZES[size],
        block && 'w-full',
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  )
})

export function IconButton({
  label, className, variant = 'ghost', size = 'md', children, ...rest
}: ButtonProps & { label: string }) {
  const box = size === 'sm' ? 'h-8 w-8' : size === 'xs' ? 'h-7 w-7' : 'h-9 w-9'
  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-colors duration-150',
        'disabled:opacity-50 disabled:pointer-events-none',
        VARIANTS[variant], box, className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
