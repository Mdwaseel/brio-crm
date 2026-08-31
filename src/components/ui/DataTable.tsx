import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, Inbox } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Checkbox } from './Field'
import { EmptyState } from './Layout'

export type Column<T> = {
  key: string
  header: string
  render: (row: T) => ReactNode
  sortBy?: (row: T) => string | number
  width?: string
  align?: 'left' | 'right' | 'center'
  hideBelow?: 'sm' | 'md' | 'lg' | 'xl'
}

const HIDE = {
  sm: 'hidden sm:table-cell',
  md: 'hidden md:table-cell',
  lg: 'hidden lg:table-cell',
  xl: 'hidden xl:table-cell',
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  onRowClick,
  selectable,
  pageSize = 10,
  bulkActions,
  emptyTitle = 'No records match your filters',
  emptyDescription = 'Try adjusting your search or filter criteria to find what you are looking for.',
  emptyAction,
  rowClassName,
  compact,
  stickyHeader = true,
}: {
  columns: Column<T>[]
  rows: T[]
  onRowClick?: (row: T) => void
  selectable?: boolean
  pageSize?: number
  bulkActions?: (selected: T[], clear: () => void) => ReactNode
  emptyTitle?: string
  emptyDescription?: string
  emptyAction?: ReactNode
  rowClassName?: (row: T) => string
  compact?: boolean
  stickyHeader?: boolean
}) {
  const [sort, setSort] = useState<{ key: string; dir: 'asc' | 'desc' } | null>(null)
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const sorted = useMemo(() => {
    if (!sort) return rows
    const col = columns.find((c) => c.key === sort.key)
    if (!col?.sortBy) return rows
    const copy = [...rows]
    copy.sort((a, b) => {
      const av = col.sortBy!(a)
      const bv = col.sortBy!(b)
      if (av === bv) return 0
      const r = av > bv ? 1 : -1
      return sort.dir === 'asc' ? r : -r
    })
    return copy
  }, [rows, sort, columns])

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const safePage = Math.min(page, pageCount - 1)
  const visible = sorted.slice(safePage * pageSize, safePage * pageSize + pageSize)

  const toggleSort = (key: string) => {
    setSort((s) => (s?.key !== key ? { key, dir: 'asc' } : s.dir === 'asc' ? { key, dir: 'desc' } : null))
  }

  const allVisibleSelected = visible.length > 0 && visible.every((r) => selected.has(r.id))
  const clear = () => setSelected(new Set())
  const selectedRows = rows.filter((r) => selected.has(r.id))

  const pad = compact ? 'px-3 py-2' : 'px-4 py-3'

  return (
    <div className="relative">
      {selectable && selected.size > 0 && bulkActions && (
        <div className="absolute -top-px inset-x-0 z-20 flex items-center justify-between gap-4 bg-forest-900 dark:bg-forest-700 text-white rounded-t-2xl px-4 py-2.5 animate-slide-down">
          <span className="text-[13px] font-medium num">
            {selected.size} selected
            <button onClick={clear} className="ml-3 text-lime-300 hover:text-white underline underline-offset-2 text-2xs">
              Clear
            </button>
          </span>
          <div className="flex items-center gap-2">{bulkActions(selectedRows, clear)}</div>
        </div>
      )}

      <div className="overflow-x-auto scroll-thin">
        <table className="w-full min-w-[720px] border-collapse">
          <thead className={cn(stickyHeader && 'sticky top-0 z-10')}>
            <tr className="bg-surface-muted border-b border-line">
              {selectable && (
                <th className={cn('w-10', pad)}>
                  <Checkbox
                    aria-label="Select all rows on this page"
                    checked={allVisibleSelected}
                    onChange={(e) => {
                      const next = new Set(selected)
                      visible.forEach((r) => (e.target.checked ? next.add(r.id) : next.delete(r.id)))
                      setSelected(next)
                    }}
                  />
                </th>
              )}
              {columns.map((c) => (
                <th
                  key={c.key}
                  style={{ width: c.width }}
                  className={cn(
                    'text-left font-semibold text-[11px] uppercase tracking-wider text-ink-3 whitespace-nowrap',
                    pad,
                    c.align === 'right' && 'text-right',
                    c.align === 'center' && 'text-center',
                    c.hideBelow && HIDE[c.hideBelow],
                  )}
                >
                  {c.sortBy ? (
                    <button
                      onClick={() => toggleSort(c.key)}
                      className={cn(
                        'inline-flex items-center gap-1 hover:text-ink transition-colors group',
                        c.align === 'right' && 'flex-row-reverse',
                        sort?.key === c.key && 'text-forest-900',
                      )}
                    >
                      {c.header}
                      {sort?.key === c.key ? (
                        sort.dir === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
                      ) : (
                        <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                      )}
                    </button>
                  ) : (
                    c.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(
                  'border-b border-line last:border-0 transition-colors duration-100',
                  onRowClick && 'cursor-pointer hover:bg-lime-50/60 dark:hover:bg-lime-400/[0.07]',
                  selected.has(row.id) && 'bg-lime-50',
                  rowClassName?.(row),
                )}
              >
                {selectable && (
                  <td className={pad} onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      aria-label={`Select row ${row.id}`}
                      checked={selected.has(row.id)}
                      onChange={(e) => {
                        const next = new Set(selected)
                        e.target.checked ? next.add(row.id) : next.delete(row.id)
                        setSelected(next)
                      }}
                    />
                  </td>
                )}
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn(
                      'text-[13px] text-ink-2 align-middle',
                      pad,
                      c.align === 'right' && 'text-right',
                      c.align === 'center' && 'text-center',
                      c.hideBelow && HIDE[c.hideBelow],
                    )}
                  >
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length === 0 && (
        <EmptyState icon={<Inbox size={20} />} title={emptyTitle} description={emptyDescription} action={emptyAction} />
      )}

      {rows.length > pageSize && (
        <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-line">
          <p className="text-2xs text-ink-3 num">
            Showing {safePage * pageSize + 1}–{Math.min(sorted.length, (safePage + 1) * pageSize)} of {sorted.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              aria-label="Previous page"
              disabled={safePage === 0}
              onClick={() => setPage(safePage - 1)}
              className="h-8 w-8 inline-flex items-center justify-center rounded-full border border-line text-ink-2 hover:bg-surface-sunken disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: pageCount }).slice(0, 6).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={cn(
                  'h-8 min-w-8 px-2.5 inline-flex items-center justify-center rounded-full text-2xs font-medium num transition-colors',
                  i === safePage ? 'bg-forest-900 dark:bg-forest-600 text-white' : 'text-ink-2 hover:bg-surface-sunken border border-line',
                )}
              >
                {i + 1}
              </button>
            ))}
            {pageCount > 6 && <span className="text-2xs text-ink-3 px-1">…</span>}
            <button
              aria-label="Next page"
              disabled={safePage >= pageCount - 1}
              onClick={() => setPage(safePage + 1)}
              className="h-8 w-8 inline-flex items-center justify-center rounded-full border border-line text-ink-2 hover:bg-surface-sunken disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function CellPrimary({ title, sub, icon }: { title: ReactNode; sub?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      {icon}
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-ink truncate leading-tight">{title}</p>
        {sub && <p className="text-2xs text-ink-3 truncate mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

export function CellMuted({ children }: { children: ReactNode }) {
  return <span className="text-[13px] text-ink-2">{children}</span>
}

export function CellMono({ children }: { children: ReactNode }) {
  return <span className="text-[13px] text-ink font-medium num">{children}</span>
}
