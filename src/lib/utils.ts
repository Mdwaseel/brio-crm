export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Indian numbering: 4850000 -> "₹48.5L", 18200000 -> "₹1.82Cr" */
export function inr(value: number, opts: { decimals?: number; prefix?: boolean } = {}): string {
  const { decimals, prefix = true } = opts
  const sign = value < 0 ? '-' : ''
  const n = Math.abs(value)
  const p = prefix ? '₹' : ''
  if (n >= 1_00_00_000) return `${sign}${p}${trim(n / 1_00_00_000, decimals ?? 2)}Cr`
  if (n >= 1_00_000) return `${sign}${p}${trim(n / 1_00_000, decimals ?? 1)}L`
  if (n >= 1_000) return `${sign}${p}${trim(n / 1_000, decimals ?? 1)}K`
  return `${sign}${p}${trim(n, 0)}`
}

function trim(n: number, d: number) {
  const s = n.toFixed(d)
  return s.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1')
}

/** Full Indian grouping: 4850000 -> "48,50,000" */
export function inrFull(value: number): string {
  const s = Math.round(Math.abs(value)).toString()
  if (s.length <= 3) return (value < 0 ? '-' : '') + '₹' + s
  const last3 = s.slice(-3)
  const rest = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',')
  return (value < 0 ? '-' : '') + '₹' + rest + ',' + last3
}

export function num(value: number): string {
  return value.toLocaleString('en-IN')
}

export function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

const AVATAR_TONES = [
  'bg-brand-100 text-brand-700',
  'bg-bronze-100 text-bronze-700',
  'bg-info-soft text-info-ink',
  'bg-success-soft text-success-ink',
  'bg-warning-soft text-warning-ink',
  'bg-brand-700 text-white',
]

export function toneFor(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return AVATAR_TONES[h % AVATAR_TONES.length]
}

export function relTime(iso: string, now = new Date('2026-08-22T11:30:00+05:30')): string {
  const then = new Date(iso).getTime()
  const diff = now.getTime() - then
  const m = Math.round(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.round(h / 24)
  if (d < 7) return `${d}d ago`
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
}

export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function fmtDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
}

export function fmtDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true,
  })
}
