import { forwardRef } from 'react'
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

const BASE =
  'w-full bg-surface border border-line rounded-xl text-[13px] text-ink placeholder:text-ink-3 ' +
  'transition-[border-color,box-shadow] duration-150 hover:border-line-strong ' +
  'focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/25 disabled:bg-surface-sunken disabled:text-ink-3'

export function Label({ children, htmlFor, hint }: { children: ReactNode; htmlFor?: string; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="flex items-center justify-between mb-1.5">
      <span className="text-[13px] font-medium text-ink">{children}</span>
      {hint && <span className="text-2xs text-ink-3">{hint}</span>}
    </label>
  )
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  suffix?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { icon, suffix, className, ...rest }, ref,
) {
  if (!icon && !suffix) return <input ref={ref} className={cn(BASE, 'h-9 px-3', className)} {...rest} />
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3 pointer-events-none flex">{icon}</span>
      )}
      <input ref={ref} className={cn(BASE, 'h-9', icon ? 'pl-9' : 'pl-3', suffix ? 'pr-9' : 'pr-3', className)} {...rest} />
      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-3 flex">{suffix}</span>}
    </div>
  )
})

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, children, ...rest }, ref) {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(BASE, 'h-9 pl-3 pr-8 appearance-none cursor-pointer', className)}
          {...rest}
        >
          {children}
        </select>
        <svg
          className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-ink-3"
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    )
  },
)

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...rest }, ref) {
    return <textarea ref={ref} className={cn(BASE, 'px-3 py-2 min-h-[84px] resize-y leading-relaxed', className)} {...rest} />
  },
)

export function Checkbox({ label, id, ...rest }: InputHTMLAttributes<HTMLInputElement> & { label?: ReactNode }) {
  return (
    <label htmlFor={id} className="inline-flex items-center gap-2 cursor-pointer select-none group">
      <input
        id={id}
        type="checkbox"
        className={cn(
          'h-4 w-4 rounded-md border border-line-strong bg-surface appearance-none cursor-pointer',
          'checked:bg-forest-900 checked:border-forest-900 transition-colors duration-150',
          'bg-[length:12px] bg-center bg-no-repeat',
          "checked:bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E\")]",
        )}
        {...rest}
      />
      {label && <span className="text-[13px] text-ink-2 group-hover:text-ink transition-colors">{label}</span>}
    </label>
  )
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-5 w-9 rounded-full transition-colors duration-200 shrink-0',
        checked ? 'bg-forest-900' : 'bg-line-strong',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200',
          checked ? 'translate-x-[18px]' : 'translate-x-0.5',
        )}
      />
    </button>
  )
}
