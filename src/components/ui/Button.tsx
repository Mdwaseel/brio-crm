import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'accent' | 'subtle'
type Size = 'xs' | 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-forest-900 text-white border border-forest-900 hover:bg-forest-950 hover:border-forest-950 shadow-sm active:bg-forest-950 '
    + 'dark:bg-lime-400 dark:text-forest-950 dark:border-lime-400 dark:hover:bg-lime-300 dark:hover:border-lime-300 dark:active:bg-lime-500',
  accent:
    'bg-lime-400 text-forest-950 border border-lime-400 hover:bg-lime-500 hover:border-lime-500 shadow-sm font-semibold',
  secondary:
    'bg-surface text-ink border border-line hover:bg-surface-muted hover:border-line-strong shadow-xs active:bg-surface-sunken',
  outline: 'bg-transparent text-forest-800 border border-forest-200 hover:bg-forest-50 dark:text-lime-200 dark:border-forest-600 dark:hover:bg-forest-700/40',
  subtle: 'bg-surface-sunken text-ink-2 border border-transparent hover:bg-lime-100 hover:text-forest-800 dark:hover:bg-lime-400/15 dark:hover:text-lime-200',
  ghost: 'bg-transparent text-ink-2 border border-transparent hover:bg-surface-sunken hover:text-ink',
  danger: 'bg-danger text-white border border-danger hover:bg-danger-ink shadow-sm',
}

/* Pill geometry throughout — the defining shape of the system. */
const SIZES: Record<Size, string> = {
  xs: 'h-7 px-3 text-2xs gap-1.5 rounded-full',
  sm: 'h-8 px-3.5 text-[13px] gap-1.5 rounded-full',
  md: 'h-10 px-4 text-[13px] gap-2 rounded-full',
  lg: 'h-11 px-5 text-sm gap-2 rounded-full',
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
        'active:scale-[.98] disabled:opacity-50 disabled:pointer-events-none',
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
  const box = size === 'sm' ? 'h-8 w-8' : size === 'xs' ? 'h-7 w-7' : 'h-10 w-10'
  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-colors duration-150',
        'disabled:opacity-50 disabled:pointer-events-none',
        VARIANTS[variant], box, className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
