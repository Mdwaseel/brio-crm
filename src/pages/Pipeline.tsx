import { useMemo, useState } from 'react'
import {
  Plus, SlidersHorizontal, GitBranch, Percent, Trophy, Scale, CalendarDays, ChevronDown,
  MoreHorizontal, ArrowRight, Building2, Target,
} from 'lucide-react'
import type { Deal } from '@/types'
import {
  PageHeader, KpiCard, Card, Button, Select, Badge, Avatar, Progress, useToast, Dropdown,
  MenuItem, MenuLabel, Drawer, DrawerSection, DescList, Timeline, StatusBadge,
} from '@/components/ui'
import { deals, OWNERS } from '@/data/crm'
import { cn, inr, fmtDateShort, fmtDate } from '@/lib/utils'

const STAGES = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'] as const
type Stage = (typeof STAGES)[number]

const STAGE_META: Record<Stage, { accent: string; dot: string; text: string }> = {
  New: { accent: 'bg-brand-200', dot: 'bg-brand-300', text: 'text-ink-2' },
  Qualified: { accent: 'bg-brand-400', dot: 'bg-brand-400', text: 'text-ink-2' },
  Proposal: { accent: 'bg-brand-600', dot: 'bg-brand-600', text: 'text-ink-2' },
  Negotiation: { accent: 'bg-bronze-500', dot: 'bg-bronze-500', text: 'text-ink-2' },
  Won: { accent: 'bg-success', dot: 'bg-success', text: 'text-success' },
  Lost: { accent: 'bg-danger', dot: 'bg-danger', text: 'text-danger' },
}

export function Pipeline() {
  const { demo } = useToast()
  const [owner, setOwner] = useState('all')
  const [territory, setTerritory] = useState('all')
  const [pipeline, setPipeline] = useState('Elevators & Escalators')
  const [selected, setSelected] = useState<Deal | null>(null)
  const [dragging, setDragging] = useState<string | null>(null)
  const [moved, setMoved] = useState<Record<string, Stage>>({})

  const visible = useMemo(
    () =>
      deals
        .map((d) => ({ ...d, stage: moved[d.id] ?? d.stage }))
        .filter((d) => (owner === 'all' || d.owner === owner) && (territory === 'all' || d.territory === territory)),
    [owner, territory, moved],
  )

  const open = visible.filter((d) => d.stage !== 'Won' && d.stage !== 'Lost')
  const pipelineValue = open.reduce((s, d) => s + d.value, 0)
  const weighted = open.reduce((s, d) => s + (d.value * d.probability) / 100, 0)
  const won = visible.filter((d) => d.stage === 'Won')
  const lost = visible.filter((d) => d.stage === 'Lost')
  const winRate = won.length + lost.length > 0 ? Math.round((won.length / (won.length + lost.length)) * 100) : 0
  const avgDeal = open.length ? pipelineValue / open.length : 0

  const byStage = (s: Stage) => visible.filter((d) => d.stage === s)

  const onDrop = (stage: Stage) => {
    if (!dragging) return
    const deal = deals.find((d) => d.id === dragging)
    setMoved((m) => ({ ...m, [dragging]: stage }))
    setDragging(null)
    if (deal && (moved[dragging] ?? deal.stage) !== stage) {
      demo(`${deal.title} moved to ${stage}`)
    }
  }

  return (
    <>
      <PageHeader
        title="Sales Pipeline"
        subtitle="Track every opportunity from first conversation to signed contract."
        actions={
          <>
            <Button size="md" variant="secondary" icon={<SlidersHorizontal size={14} />} onClick={() => demo('Advanced filters')}>Filters</Button>
            <Button size="md" variant="primary" icon={<Plus size={14} />} onClick={() => demo('New deal')}>New Deal</Button>
          </>
        }
      />

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Pipeline Value" value={inr(pipelineValue)} delta={8.4} icon={<GitBranch size={15} />} hint={`${open.length} open opportunities`} />
        <KpiCard label="Weighted Pipeline" value={inr(weighted)} delta={6.1} icon={<Scale size={15} />} hint="Probability-adjusted forecast" />
        <KpiCard label="Win Rate" value={`${winRate}%`} delta={4.2} icon={<Trophy size={15} />} accent="success" hint={`${won.length} won · ${lost.length} lost this quarter`} />
        <KpiCard label="Average Deal Size" value={inr(avgDeal)} delta={2.8} icon={<Percent size={15} />} accent="bronze" hint="Across open opportunities" />
      </div>

      {/* Controls */}
      <Card className="mt-6 p-3.5 flex flex-wrap items-center gap-2.5">
        <Dropdown
          width="w-60"
          trigger={({ toggle }) => (
            <Button size="md" variant="secondary" icon={<GitBranch size={14} />} iconRight={<ChevronDown size={13} />} onClick={toggle}>
              {pipeline}
            </Button>
          )}
        >
          {(close) => (
            <>
              <MenuLabel>Pipeline</MenuLabel>
              {['Elevators & Escalators', 'Service & AMC', 'Modernisation', 'Spares & Parts'].map((p) => (
                <MenuItem key={p} active={p === pipeline} onClick={() => { setPipeline(p); close() }}>{p}</MenuItem>
              ))}
            </>
          )}
        </Dropdown>

        <Select value={owner} onChange={(e) => setOwner(e.target.value)} aria-label="Filter by owner" className="w-auto min-w-[140px]">
          <option value="all">All owners</option>
          {OWNERS.map((o) => <option key={o}>{o}</option>)}
        </Select>
        <Select value={territory} onChange={(e) => setTerritory(e.target.value)} aria-label="Filter by territory" className="w-auto min-w-[130px]">
          <option value="all">All territories</option>
          {['North', 'West', 'South', 'East'].map((t) => <option key={t}>{t}</option>)}
        </Select>
        <Button size="md" variant="secondary" icon={<CalendarDays size={14} />} iconRight={<ChevronDown size={13} />} onClick={() => demo('Date range')}>
          This quarter
        </Button>
        <span className="ml-auto text-2xs text-ink-3 num">{visible.length} deals · drag cards between stages</span>
      </Card>

      {/* Kanban */}
      <div className="mt-4 overflow-x-auto scroll-thin pb-3">
        <div className="flex gap-3.5 min-w-max">
          {STAGES.map((stage) => {
            const items = byStage(stage)
            const total = items.reduce((s, d) => s + d.value, 0)
            const meta = STAGE_META[stage]
            return (
              <section
                key={stage}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(stage)}
                className="w-[290px] shrink-0 flex flex-col rounded-xl bg-surface-sunken/70 border border-line"
              >
                <div className="px-3.5 py-3 border-b border-line">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2">
                      <span className={cn('h-2 w-2 rounded-full', meta.dot)} />
                      <span className="text-[13px] font-semibold text-ink">{stage}</span>
                      <span className="text-2xs text-ink-3 num">{items.length}</span>
                    </span>
                    <span className="text-2xs font-semibold text-ink num">{inr(total)}</span>
                  </div>
                  <div className="mt-2.5 h-1 rounded-full bg-line overflow-hidden">
                    <div className={cn('h-full rounded-full', meta.accent)}
                      style={{ width: `${Math.min(100, (total / 7000000) * 100)}%` }} />
                  </div>
                </div>

                <div className="p-2.5 space-y-2.5 flex-1 min-h-[180px]">
                  {items.map((d) => (
                    <article
                      key={d.id}
                      draggable
                      onDragStart={() => setDragging(d.id)}
                      onDragEnd={() => setDragging(null)}
                      onClick={() => setSelected(d)}
                      className={cn(
                        'bg-surface border border-line rounded-xl p-3.5 cursor-pointer shadow-xs',
                        'transition-[box-shadow,border-color,transform] duration-150 hover:shadow-md hover:border-line-strong hover:-translate-y-px',
                        dragging === d.id && 'opacity-50 rotate-1',
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-ink leading-snug truncate">{d.customer}</p>
                          <p className="text-2xs text-ink-3 mt-0.5 truncate">{d.title}</p>
                        </div>
                        <button
                          aria-label="Deal actions"
                          onClick={(e) => { e.stopPropagation(); demo('Deal actions') }}
                          className="text-ink-3 hover:text-ink transition-colors shrink-0"
                        >
                          <MoreHorizontal size={14} />
                        </button>
                      </div>

                      <p className="font-display text-[17px] font-bold text-ink num mt-2.5">{inr(d.value)}</p>

                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex-1"><Progress value={d.probability} size="xs" tone={d.stage === 'Lost' ? 'danger' : 'auto'} /></div>
                        <span className="text-2xs font-semibold text-ink-2 num">{d.probability}%</span>
                      </div>

                      <div className="mt-3 pt-3 border-t border-line flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 min-w-0">
                          <Avatar name={d.owner} size="xs" />
                          <span className="text-2xs text-ink-2 truncate">{d.owner.split(' ')[0]}</span>
                        </span>
                        <span className="text-2xs text-ink-3 num shrink-0">{fmtDateShort(d.expectedClose)}</span>
                      </div>

                      <p className="text-2xs text-ink-3 mt-2 truncate">Next: {d.nextActivity}</p>
                    </article>
                  ))}

                  {items.length === 0 && (
                    <div className="border border-dashed border-line rounded-xl py-8 text-center">
                      <p className="text-2xs text-ink-3">No deals in this stage</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => demo(`New deal in ${stage}`)}
                  className="m-2.5 mt-0 flex items-center justify-center gap-1.5 h-8 rounded-lg border border-dashed border-line text-2xs font-medium text-ink-3 hover:text-brand-700 hover:border-brand-300 hover:bg-brand-50/50 transition-colors"
                >
                  <Plus size={12} /> Add deal
                </button>
              </section>
            )
          })}
        </div>
      </div>

      {/* Deal drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        width="md"
        title={selected?.customer}
        badge={selected && <StatusBadge status={selected.stage} />}
        subtitle={selected?.title}
        footer={
          <>
            <Button variant="primary" icon={<ArrowRight size={14} />} onClick={() => demo('Advancing deal stage')}>Advance stage</Button>
            <Button variant="secondary" onClick={() => demo('Creating quotation')}>Create quotation</Button>
            <Button variant="ghost" className="ml-auto" onClick={() => demo('Marked as lost')}>Mark lost</Button>
          </>
        }
      >
        {selected && (
          <>
            <DrawerSection title="Deal value">
              <div className="flex items-end gap-4">
                <div>
                  <p className="font-display text-[32px] font-bold text-ink num leading-none">{inr(selected.value)}</p>
                  <p className="text-2xs text-ink-3 mt-2">Weighted: <span className="num font-semibold text-ink">{inr((selected.value * selected.probability) / 100)}</span></p>
                </div>
                <div className="flex-1">
                  <Progress label="Probability" value={selected.probability} showValue tone="auto" />
                </div>
              </div>
            </DrawerSection>

            <DrawerSection title="Deal information">
              <DescList
                items={[
                  { label: 'Deal ID', value: <span className="num">{selected.id}</span> },
                  { label: 'Owner', value: <span className="inline-flex items-center gap-1.5"><Avatar name={selected.owner} size="xs" />{selected.owner}</span> },
                  { label: 'Customer', value: <span className="inline-flex items-center gap-1.5"><Building2 size={13} className="text-ink-3" />{selected.customer}</span> },
                  { label: 'Territory', value: <Badge tone="neutral">{selected.territory}</Badge> },
                  { label: 'Expected close', value: <span className="num">{fmtDate(selected.expectedClose)}</span> },
                  { label: 'Created', value: <span className="num">{fmtDate(selected.createdAt)}</span> },
                ]}
              />
            </DrawerSection>

            <DrawerSection title="Products & scope">
              <ul className="space-y-2">
                {selected.products.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 rounded-lg border border-line px-3 py-2.5">
                    <Target size={13} className="text-brand-600 shrink-0" />
                    <span className="text-[13px] text-ink">{p}</span>
                  </li>
                ))}
              </ul>
            </DrawerSection>

            <DrawerSection title="Next activity">
              <div className="rounded-lg border border-brand-200 bg-brand-50 px-3.5 py-3">
                <p className="text-[13px] font-medium text-brand-800">{selected.nextActivity}</p>
                <p className="text-2xs text-brand-700/80 mt-1">Scheduled before {fmtDate(selected.expectedClose)}</p>
              </div>
            </DrawerSection>

            <DrawerSection title="Deal timeline">
              <Timeline
                dense
                items={[
                  { id: 'd1', title: `Stage moved to ${selected.stage}`, time: '2 days ago', tone: 'brand' },
                  { id: 'd2', title: 'Proposal shared with customer', time: '6 days ago', tone: 'info' },
                  { id: 'd3', title: 'Discovery call completed', time: '2 weeks ago', tone: 'success' },
                  { id: 'd4', title: 'Deal created', time: fmtDate(selected.createdAt), tone: 'neutral' },
                ]}
              />
            </DrawerSection>
          </>
        )}
      </Drawer>
    </>
  )
}
