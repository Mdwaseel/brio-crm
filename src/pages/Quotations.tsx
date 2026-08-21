import { useMemo, useState } from 'react'
import {
  Plus, Search, FileText, Eye, Download, Send, CheckCircle2, IndianRupee, Clock, Percent,
} from 'lucide-react'
import type { Quotation } from '@/types'
import {
  PageHeader, KpiCard, Card, Button, Input, Select, StatusBadge, Avatar, DataTable,
  CellPrimary, Drawer, DrawerSection, DescList, useToast, Modal, Alert,
} from '@/components/ui'
import type { Column } from '@/components/ui'
import { quotations, GST_RATE, OWNERS } from '@/data/crm'
import { cn, inr, inrFull, fmtDate } from '@/lib/utils'

function totals(q: Quotation) {
  const subtotal = q.lines.reduce((s, l) => s + l.qty * l.price, 0)
  const discount = q.lines.reduce((s, l) => s + (l.qty * l.price * l.discount) / 100, 0)
  const net = subtotal - discount
  const gst = (net * GST_RATE) / 100
  return { subtotal, discount, net, gst, total: net + gst }
}

export function Quotations() {
  const { demo } = useToast()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [owner, setOwner] = useState('all')
  const [selected, setSelected] = useState<Quotation | null>(null)
  const [preview, setPreview] = useState<Quotation | null>(null)

  const filtered = useMemo(
    () =>
      quotations.filter((q) => {
        const s = query.trim().toLowerCase()
        return (
          (!s || (q.id + q.customer + q.contact).toLowerCase().includes(s)) &&
          (status === 'all' || q.status === status) &&
          (owner === 'all' || q.owner === owner)
        )
      }),
    [query, status, owner],
  )

  const openValue = quotations.filter((q) => ['Sent', 'Viewed', 'Draft'].includes(q.status)).reduce((s, q) => s + q.amount, 0)
  const accepted = quotations.filter((q) => q.status === 'Accepted')
  const acceptRate = Math.round((accepted.length / quotations.filter((q) => q.status !== 'Draft').length) * 100)

  const columns: Column<Quotation>[] = [
    { key: 'id', header: 'Quote ID', sortBy: (r) => r.id, render: (r) => (
      <CellPrimary
        icon={<span className="h-8 w-8 rounded-lg bg-brand-50 text-brand-700 inline-flex items-center justify-center shrink-0"><FileText size={15} /></span>}
        title={<span className="num">{r.id}</span>}
        sub={`${r.lines.length} line items`}
      />
    ) },
    { key: 'customer', header: 'Customer', sortBy: (r) => r.customer, render: (r) => (
      <div>
        <p className="text-[13px] font-medium text-ink">{r.customer}</p>
        <p className="text-2xs text-ink-3">{r.contact}</p>
      </div>
    ) },
    { key: 'amount', header: 'Amount', align: 'right', sortBy: (r) => r.amount, render: (r) => (
      <span className="text-[13px] font-semibold text-ink num">{inr(r.amount)}</span>
    ) },
    { key: 'owner', header: 'Owner', hideBelow: 'md', sortBy: (r) => r.owner, render: (r) => (
      <span className="inline-flex items-center gap-2"><Avatar name={r.owner} size="sm" /><span className="text-[13px] text-ink-2">{r.owner}</span></span>
    ) },
    { key: 'created', header: 'Created', hideBelow: 'lg', sortBy: (r) => r.created, render: (r) => <span className="num text-2xs text-ink-2">{fmtDate(r.created)}</span> },
    { key: 'valid', header: 'Valid Until', hideBelow: 'lg', sortBy: (r) => r.validUntil, render: (r) => {
      const expired = r.validUntil < '2026-08-22'
      return <span className={cn('num text-2xs font-medium', expired ? 'text-danger' : 'text-ink-2')}>{fmtDate(r.validUntil)}</span>
    } },
    { key: 'status', header: 'Status', align: 'right', sortBy: (r) => r.status, render: (r) => <StatusBadge status={r.status} /> },
  ]

  const t = selected ? totals(selected) : null

  return (
    <>
      <PageHeader
        title="Quotations"
        subtitle="Build, approve and track commercial proposals with full version history."
        actions={
          <>
            <Button size="md" variant="secondary" icon={<Download size={14} />} onClick={() => demo('Exporting quotations')}>Export</Button>
            <Button size="md" variant="primary" icon={<Plus size={14} />} onClick={() => demo('New quotation')}>New Quotation</Button>
          </>
        }
      />

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Open Quotation Value" value={inr(openValue)} delta={9.8} icon={<IndianRupee size={15} />} hint="Draft, sent and viewed" />
        <KpiCard label="Accepted This Month" value={inr(accepted.reduce((s, q) => s + q.amount, 0))} delta={16.4} icon={<CheckCircle2 size={15} />} accent="success" hint={`${accepted.length} quotations accepted`} />
        <KpiCard label="Acceptance Rate" value={`${acceptRate}%`} delta={5.2} icon={<Percent size={15} />} hint="Excluding drafts" />
        <KpiCard label="Avg Turnaround" value="3.4 days" delta={-11.2} invertDelta icon={<Clock size={15} />} accent="warning" hint="Request to quotation sent" />
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="p-3.5 border-b border-line flex flex-wrap items-center gap-2.5">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} icon={<Search size={15} />}
            placeholder="Search quote ID or customer…" aria-label="Search quotations" className="w-full sm:w-72" />
          <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status" className="w-auto min-w-[130px]">
            <option value="all">All statuses</option>
            {['Draft', 'Sent', 'Viewed', 'Accepted', 'Rejected', 'Expired'].map((s) => <option key={s}>{s}</option>)}
          </Select>
          <Select value={owner} onChange={(e) => setOwner(e.target.value)} aria-label="Filter by owner" className="w-auto min-w-[140px]">
            <option value="all">All owners</option>
            {OWNERS.map((o) => <option key={o}>{o}</option>)}
          </Select>
          <span className="ml-auto text-2xs text-ink-3 num">{filtered.length} quotations</span>
        </div>

        <DataTable
          columns={columns}
          rows={filtered}
          onRowClick={setSelected}
          selectable
          pageSize={8}
          emptyTitle="No quotations match your filters"
          emptyDescription="Change the status filter or clear the search to see more."
          bulkActions={(rows, clear) => (
            <>
              <Button size="xs" variant="secondary" icon={<Send size={12} />} onClick={() => { demo(`Sending ${rows.length} quotations`); clear() }}>Send</Button>
              <Button size="xs" variant="secondary" icon={<Download size={12} />} onClick={() => { demo('Downloading PDFs'); clear() }}>Download</Button>
            </>
          )}
        />
      </Card>

      {/* Quotation detail drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        width="lg"
        title={selected?.id}
        badge={selected && <StatusBadge status={selected.status} />}
        subtitle={selected && `${selected.customer} · ${selected.contact}`}
        footer={
          <>
            <Button variant="secondary" icon={<Eye size={14} />} onClick={() => setPreview(selected)}>Preview</Button>
            <Button variant="secondary" icon={<Download size={14} />} onClick={() => demo('Generating PDF')}>Download PDF</Button>
            <Button variant="primary" icon={<Send size={14} />} onClick={() => demo('Quotation sent')}>Send</Button>
            <Button variant="accent" icon={<CheckCircle2 size={14} />} onClick={() => demo('Approval requested')} className="ml-auto">Approve</Button>
          </>
        }
      >
        {selected && t && (
          <>
            <DrawerSection title="Quotation details">
              <DescList
                items={[
                  { label: 'Company', value: 'Brio Elevators India Pvt Ltd' },
                  { label: 'Customer', value: selected.customer },
                  { label: 'Contact', value: selected.contact },
                  { label: 'Owner', value: <span className="inline-flex items-center gap-1.5"><Avatar name={selected.owner} size="xs" />{selected.owner}</span> },
                  { label: 'Created', value: <span className="num">{fmtDate(selected.created)}</span> },
                  { label: 'Valid until', value: <span className="num">{fmtDate(selected.validUntil)}</span> },
                ]}
              />
            </DrawerSection>

            <DrawerSection title="Line items">
              <div className="overflow-x-auto scroll-thin border border-line rounded-xl">
                <table className="w-full min-w-[560px]">
                  <thead>
                    <tr className="bg-surface-muted border-b border-line">
                      {['Item', 'Qty', 'Unit price', 'Disc.', 'Amount'].map((h, i) => (
                        <th key={h} className={cn('px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-3', i === 0 ? 'text-left' : 'text-right')}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selected.lines.map((l) => (
                      <tr key={l.id} className="border-b border-line last:border-0">
                        <td className="px-3 py-2.5">
                          <p className="text-[13px] font-medium text-ink">{l.item}</p>
                          <p className="text-2xs text-ink-3 num mt-0.5">{l.sku}</p>
                        </td>
                        <td className="px-3 py-2.5 text-right text-[13px] num text-ink-2">{l.qty}</td>
                        <td className="px-3 py-2.5 text-right text-[13px] num text-ink-2">{inrFull(l.price)}</td>
                        <td className="px-3 py-2.5 text-right text-[13px] num text-ink-2">{l.discount}%</td>
                        <td className="px-3 py-2.5 text-right text-[13px] num font-semibold text-ink">
                          {inrFull(l.qty * l.price * (1 - l.discount / 100))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DrawerSection>

            <DrawerSection title="Commercial summary">
              <div className="rounded-xl border border-line overflow-hidden">
                {[
                  { label: 'Subtotal', value: inrFull(t.subtotal) },
                  { label: 'Discount', value: `− ${inrFull(t.discount)}`, tone: 'text-danger' },
                  { label: 'Net amount', value: inrFull(t.net) },
                  { label: `GST @ ${GST_RATE}%`, value: inrFull(t.gst) },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between px-4 py-2.5 border-b border-line">
                    <span className="text-[13px] text-ink-2">{r.label}</span>
                    <span className={cn('text-[13px] font-medium num', r.tone ?? 'text-ink')}>{r.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between px-4 py-3.5 bg-brand-50">
                  <span className="text-[13px] font-semibold text-brand-800">Total payable</span>
                  <span className="font-display text-lg font-bold text-brand-800 num">{inrFull(t.total)}</span>
                </div>
              </div>
            </DrawerSection>

            <DrawerSection title="Terms & conditions">
              <p className="text-[13px] text-ink-2 leading-relaxed">{selected.terms}</p>
              {selected.status === 'Draft' && (
                <div className="mt-3.5">
                  <Alert tone="warning" title="Pending internal approval">
                    Discounts above 8% require Sales Head sign-off before this quotation can be sent.
                  </Alert>
                </div>
              )}
            </DrawerSection>
          </>
        )}
      </Drawer>

      {/* Preview modal */}
      <Modal
        open={!!preview}
        onClose={() => setPreview(null)}
        title={`Quotation preview — ${preview?.id ?? ''}`}
        subtitle="Rendered as the customer will receive it"
        size="lg"
        icon={<Eye size={17} />}
        footer={
          <>
            <Button variant="ghost" onClick={() => setPreview(null)}>Close</Button>
            <Button variant="primary" icon={<Download size={14} />} onClick={() => demo('Downloading PDF')}>Download PDF</Button>
          </>
        }
      >
        {preview && (
          <div className="border border-line rounded-xl overflow-hidden">
            <div className="bg-brand-900 text-white px-6 py-5 flex items-start justify-between">
              <div>
                <p className="font-display text-xl font-bold">Brio</p>
                <p className="text-2xs text-brand-200 mt-1">Brio Elevators India Pvt Ltd · Mumbai</p>
              </div>
              <div className="text-right">
                <p className="text-2xs uppercase tracking-wider text-brand-300">Quotation</p>
                <p className="font-display text-lg font-bold num">{preview.id}</p>
                <p className="text-2xs text-brand-200 num mt-0.5">{fmtDate(preview.created)}</p>
              </div>
            </div>
            <div className="p-6 bg-surface">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-2xs uppercase tracking-wider text-ink-3">Billed to</p>
                  <p className="text-[14px] font-semibold text-ink mt-1.5">{preview.customer}</p>
                  <p className="text-2xs text-ink-2 mt-0.5">Attn: {preview.contact}</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-2xs uppercase tracking-wider text-ink-3">Valid until</p>
                  <p className="text-[14px] font-semibold text-ink num mt-1.5">{fmtDate(preview.validUntil)}</p>
                  <div className="mt-1.5 sm:flex sm:justify-end"><StatusBadge status={preview.status} /></div>
                </div>
              </div>
              <table className="w-full mt-6">
                <thead>
                  <tr className="border-y border-line">
                    <th className="py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-3">Description</th>
                    <th className="py-2.5 text-right text-[11px] font-semibold uppercase tracking-wider text-ink-3">Qty</th>
                    <th className="py-2.5 text-right text-[11px] font-semibold uppercase tracking-wider text-ink-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.lines.map((l) => (
                    <tr key={l.id} className="border-b border-line">
                      <td className="py-2.5 text-[13px] text-ink">{l.item}</td>
                      <td className="py-2.5 text-right text-[13px] num text-ink-2">{l.qty}</td>
                      <td className="py-2.5 text-right text-[13px] num font-medium text-ink">{inrFull(l.qty * l.price * (1 - l.discount / 100))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex justify-end">
                <div className="w-full sm:w-64 space-y-1.5">
                  <div className="flex justify-between text-[13px]"><span className="text-ink-2">Net</span><span className="num">{inrFull(totals(preview).net)}</span></div>
                  <div className="flex justify-between text-[13px]"><span className="text-ink-2">GST @ {GST_RATE}%</span><span className="num">{inrFull(totals(preview).gst)}</span></div>
                  <div className="flex justify-between pt-2 border-t border-line">
                    <span className="text-[13px] font-semibold text-ink">Total</span>
                    <span className="font-display text-[15px] font-bold text-ink num">{inrFull(totals(preview).total)}</span>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-2xs text-ink-3 leading-relaxed border-t border-line pt-4">{preview.terms}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
