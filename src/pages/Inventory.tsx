import { useMemo, useState } from 'react'
import {
  Plus, Search, Package, Warehouse, AlertTriangle, AlertOctagon, IndianRupee, ArrowDownUp,
  ShoppingCart, Truck, FileCheck2, Boxes,
} from 'lucide-react'
import type { InventoryItem } from '@/types'
import {
  PageHeader, KpiCard, Card, Button, Input, Select, Badge, StatusBadge, DataTable,
  CellPrimary, Progress, Tabs, useToast, Modal, Label, Textarea, Alert, MiniKpi,
} from '@/components/ui'
import type { Column } from '@/components/ui'
import { inventory, WAREHOUSES, stockMovements, purchaseOrders } from '@/data/operations'
import { cn, inr, inrFull, num, fmtDate } from '@/lib/utils'

export function Inventory() {
  const { demo } = useToast()
  const [tab, setTab] = useState('stock')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [warehouse, setWarehouse] = useState('all')
  const [poOpen, setPoOpen] = useState(false)

  const filtered = useMemo(
    () =>
      inventory.filter((i) => {
        const q = query.trim().toLowerCase()
        return (
          (!q || (i.part + i.sku + i.category).toLowerCase().includes(q)) &&
          (status === 'all' || i.status === status) &&
          (warehouse === 'all' || i.warehouse === warehouse)
        )
      }),
    [query, status, warehouse],
  )

  const stockValue = inventory.reduce((s, i) => s + i.available * i.unitCost, 0)
  const low = inventory.filter((i) => i.status === 'Low Stock').length
  const critical = inventory.filter((i) => i.status === 'Critical').length

  const columns: Column<InventoryItem>[] = [
    { key: 'part', header: 'Part', width: '26%', sortBy: (r) => r.part, render: (r) => (
      <CellPrimary
        icon={
          <span className={cn('h-8 w-8 rounded-lg inline-flex items-center justify-center shrink-0',
            r.status === 'Critical' ? 'bg-danger-soft text-danger' : r.status === 'Low Stock' ? 'bg-warning-soft text-warning' : 'bg-surface-sunken text-ink-3')}>
            <Package size={15} />
          </span>
        }
        title={r.part}
        sub={<span className="num">{r.sku}</span>}
      />
    ) },
    { key: 'category', header: 'Category', hideBelow: 'lg', sortBy: (r) => r.category, render: (r) => <Badge tone="neutral">{r.category}</Badge> },
    { key: 'warehouse', header: 'Warehouse', hideBelow: 'md', sortBy: (r) => r.warehouse, render: (r) => <span className="text-[13px] text-ink-2">{r.warehouse}</span> },
    { key: 'available', header: 'Available', align: 'right', sortBy: (r) => r.available, render: (r) => (
      <span className={cn('text-[13px] font-semibold num', r.status === 'Critical' ? 'text-danger' : 'text-ink')}>{num(r.available)}</span>
    ) },
    { key: 'reserved', header: 'Reserved', align: 'right', hideBelow: 'lg', sortBy: (r) => r.reserved, render: (r) => <span className="text-[13px] num text-ink-2">{num(r.reserved)}</span> },
    { key: 'reorder', header: 'Reorder Point', align: 'right', hideBelow: 'xl', sortBy: (r) => r.reorderPoint, render: (r) => (
      <div className="flex items-center justify-end gap-2">
        <div className="w-14 hidden sm:block">
          <Progress value={Math.min(100, (r.available / Math.max(1, r.reorderPoint * 2)) * 100)} size="xs"
            tone={r.status === 'Critical' ? 'danger' : r.status === 'Low Stock' ? 'warning' : 'success'} />
        </div>
        <span className="text-[13px] num text-ink-2">{r.reorderPoint}</span>
      </div>
    ) },
    { key: 'value', header: 'Stock Value', align: 'right', hideBelow: 'xl', sortBy: (r) => r.available * r.unitCost, render: (r) => (
      <span className="text-[13px] num text-ink-2">{inr(r.available * r.unitCost)}</span>
    ) },
    { key: 'status', header: 'Status', align: 'right', sortBy: (r) => r.status, render: (r) => <StatusBadge status={r.status} /> },
  ]

  return (
    <>
      <PageHeader
        title="Inventory"
        subtitle="Stock position, warehouse health and replenishment across the network."
        actions={
          <>
            <Button size="md" variant="secondary" icon={<ArrowDownUp size={14} />} onClick={() => demo('Stock transfer')}>Transfer stock</Button>
            <Button size="md" variant="primary" icon={<Plus size={14} />} onClick={() => setPoOpen(true)}>New Purchase Order</Button>
          </>
        }
      />

      {critical > 0 && (
        <div className="mb-5">
          <Alert
            tone="danger"
            icon={<AlertOctagon size={16} />}
            title={`${critical} SKUs are at critical stock`}
            action={<Button size="sm" variant="danger" onClick={() => setPoOpen(true)}>Raise PO</Button>}
          >
            Handrail drive chain and gate interlock contact block are both blocking open service tickets at Crescent Mall and Orion Works.
          </Alert>
        </div>
      )}

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard label="Total SKUs" value="1,237" delta={2.4} icon={<Boxes size={15} />} hint="Across 4 warehouses" />
        <KpiCard label="Stock Value" value={inr(stockValue)} delta={5.8} icon={<IndianRupee size={15} />} hint="At current landed cost" />
        <KpiCard label="Low Stock" value={String(low)} delta={12.5} invertDelta icon={<AlertTriangle size={15} />} accent="warning" hint="Below reorder point" />
        <KpiCard label="Critical Stock" value={String(critical)} delta={50} invertDelta icon={<AlertOctagon size={15} />} accent="danger" hint="Blocking service delivery" />
        <KpiCard label="Warehouses" value="4" icon={<Warehouse size={15} />} hint="Mumbai · Bengaluru · Delhi · Chennai" />
      </div>

      {/* Warehouse cards */}
      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4 mt-3.5">
        {WAREHOUSES.map((w) => (
          <Card key={w.id} className="p-4 hover:border-line-strong transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5 min-w-0">
                <span className="h-8 w-8 rounded-lg bg-brand-50 text-brand-700 inline-flex items-center justify-center shrink-0">
                  <Warehouse size={15} />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-ink truncate">{w.name}</p>
                  <p className="text-2xs text-ink-3 num">{w.id} · {w.city}</p>
                </div>
              </div>
              {w.critical > 0 && <Badge tone="danger" size="xs">{w.critical} critical</Badge>}
            </div>
            <div className="mt-3.5 grid grid-cols-2 gap-3">
              <div>
                <p className="text-2xs text-ink-3">SKUs</p>
                <p className="text-[15px] font-semibold text-ink num mt-0.5">{num(w.skus)}</p>
              </div>
              <div>
                <p className="text-2xs text-ink-3">Value</p>
                <p className="text-[15px] font-semibold text-ink num mt-0.5">{inr(w.value)}</p>
              </div>
            </div>
            <div className="mt-3.5">
              <Progress label="Capacity utilisation" value={w.utilisation} showValue size="sm"
                tone={w.utilisation > 80 ? 'warning' : 'brand'} />
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="px-4 pt-1">
          <Tabs
            value={tab}
            onChange={setTab}
            tabs={[
              { id: 'stock', label: 'Stock', count: inventory.length, icon: <Package size={14} /> },
              { id: 'movements', label: 'Stock Movements', count: stockMovements.length, icon: <ArrowDownUp size={14} /> },
              { id: 'po', label: 'Purchase Orders', count: purchaseOrders.length, icon: <ShoppingCart size={14} /> },
            ]}
          />
        </div>

        {tab === 'stock' && (
          <>
            <div className="p-3.5 border-b border-line flex flex-wrap items-center gap-2.5">
              <Input value={query} onChange={(e) => setQuery(e.target.value)} icon={<Search size={15} />}
                placeholder="Search parts or SKUs…" aria-label="Search inventory" className="w-full sm:w-64" />
              <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status" className="w-auto min-w-[130px]">
                <option value="all">All statuses</option>
                {['Healthy', 'Low Stock', 'Critical'].map((s) => <option key={s}>{s}</option>)}
              </Select>
              <Select value={warehouse} onChange={(e) => setWarehouse(e.target.value)} aria-label="Filter by warehouse" className="w-auto min-w-[180px]">
                <option value="all">All warehouses</option>
                {WAREHOUSES.map((w) => <option key={w.id}>{w.name}</option>)}
              </Select>
              <span className="ml-auto text-2xs text-ink-3 num">{filtered.length} items</span>
            </div>
            <DataTable
              columns={columns}
              rows={filtered}
              selectable
              pageSize={10}
              onRowClick={() => demo('Opening item detail')}
              rowClassName={(r) => (r.status === 'Critical' ? 'bg-danger-soft/30' : '')}
              emptyTitle="No stock items match your filters"
              emptyDescription="Try a different warehouse or clear the status filter."
              bulkActions={(rows, clear) => (
                <Button size="xs" variant="secondary" icon={<ShoppingCart size={12} />} onClick={() => { demo(`Raising PO for ${rows.length} items`); clear() }}>
                  Raise purchase order
                </Button>
              )}
            />
          </>
        )}

        {tab === 'movements' && (
          <DataTable
            rows={stockMovements}
            pageSize={10}
            emptyTitle="No stock movements recorded"
            emptyDescription="Issues, receipts and transfers will appear here."
            columns={[
              { key: 'date', header: 'Date', sortBy: (r) => r.date, render: (r) => <span className="num text-2xs text-ink-2">{fmtDate(r.date)}</span> },
              { key: 'part', header: 'Part', render: (r) => <CellPrimary title={r.part} sub={<span className="num">{r.sku}</span>} /> },
              { key: 'type', header: 'Type', sortBy: (r) => r.type, render: (r) => (
                <Badge tone={r.type === 'Receipt' ? 'success' : r.type === 'Issue' ? 'warning' : r.type === 'Transfer' ? 'info' : 'neutral'}>
                  {r.type}
                </Badge>
              ) },
              { key: 'qty', header: 'Qty', align: 'right', sortBy: (r) => r.qty, render: (r) => (
                <span className={cn('text-[13px] font-semibold num', r.qty > 0 ? 'text-success' : 'text-danger')}>
                  {r.qty > 0 ? '+' : ''}{r.qty}
                </span>
              ) },
              { key: 'wh', header: 'Warehouse', hideBelow: 'md', render: (r) => <span className="text-[13px] text-ink-2">{r.warehouse}</span> },
              { key: 'ref', header: 'Reference', hideBelow: 'lg', render: (r) => <span className="num text-2xs text-brand-700 font-medium">{r.ref}</span> },
              { key: 'by', header: 'By', align: 'right', hideBelow: 'lg', render: (r) => <span className="text-[13px] text-ink-2">{r.by}</span> },
            ]}
          />
        )}

        {tab === 'po' && (
          <>
            <div className="p-4 grid gap-3.5 grid-cols-2 lg:grid-cols-4 border-b border-line">
              <MiniKpi label="Open POs" value="4" icon={<ShoppingCart size={13} />} sub="₹31.4L committed" />
              <MiniKpi label="In Transit" value="2" tone="warning" icon={<Truck size={13} />} sub="Expected within 7 days" />
              <MiniKpi label="Pending Approval" value="1" tone="warning" icon={<FileCheck2 size={13} />} sub="₹18.4L awaiting sign-off" />
              <MiniKpi label="Avg Lead Time" value="14 days" tone="success" icon={<Truck size={13} />} sub="Down 8 days YoY" />
            </div>
            <DataTable
              rows={purchaseOrders}
              pageSize={10}
              onRowClick={() => demo('Opening purchase order')}
              emptyTitle="No purchase orders"
              emptyDescription="Raise a purchase order to replenish stock."
              columns={[
                { key: 'id', header: 'PO Number', sortBy: (r) => r.id, render: (r) => <span className="num font-semibold text-brand-700">{r.id}</span> },
                { key: 'supplier', header: 'Supplier', sortBy: (r) => r.supplier, render: (r) => <span className="text-[13px] font-medium text-ink">{r.supplier}</span> },
                { key: 'items', header: 'Items', align: 'right', hideBelow: 'md', render: (r) => <span className="num text-[13px] text-ink-2">{r.items}</span> },
                { key: 'value', header: 'Value', align: 'right', sortBy: (r) => r.value, render: (r) => <span className="num text-[13px] font-semibold text-ink">{inr(r.value)}</span> },
                { key: 'raised', header: 'Raised', hideBelow: 'lg', sortBy: (r) => r.raised, render: (r) => <span className="num text-2xs text-ink-2">{fmtDate(r.raised)}</span> },
                { key: 'expected', header: 'Expected', hideBelow: 'lg', sortBy: (r) => r.expected, render: (r) => <span className="num text-2xs text-ink-2">{fmtDate(r.expected)}</span> },
                { key: 'status', header: 'Status', align: 'right', sortBy: (r) => r.status, render: (r) => (
                  <Badge tone={r.status === 'Received' ? 'success' : r.status === 'In Transit' ? 'info' : r.status === 'Pending Approval' ? 'warning' : 'neutral'} dot>
                    {r.status}
                  </Badge>
                ) },
              ]}
            />
          </>
        )}
      </Card>

      {/* New PO modal */}
      <Modal
        open={poOpen}
        onClose={() => setPoOpen(false)}
        title="New Purchase Order"
        subtitle="Replenish stock for critical and low-stock items"
        size="lg"
        icon={<ShoppingCart size={17} />}
        footer={
          <>
            <Button variant="ghost" onClick={() => setPoOpen(false)}>Cancel</Button>
            <Button variant="secondary" onClick={() => { setPoOpen(false); demo('Saved as draft') }}>Save draft</Button>
            <Button variant="primary" onClick={() => { setPoOpen(false); demo('Purchase order submitted for approval') }}>Submit for approval</Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="po-sup">Supplier</Label>
            <Select id="po-sup">
              {['Sterling Drives Pvt Ltd', 'Precision Safety Systems', 'NovaSteel Components', 'Elite Cabin Interiors'].map((s) => <option key={s}>{s}</option>)}
            </Select>
          </div>
          <div>
            <Label htmlFor="po-wh">Deliver to</Label>
            <Select id="po-wh">{WAREHOUSES.map((w) => <option key={w.id}>{w.name}</option>)}</Select>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-[13px] font-semibold text-ink mb-2.5">Suggested lines — items below reorder point</p>
          <div className="border border-line rounded-xl overflow-hidden">
            {inventory.filter((i) => i.status !== 'Healthy').slice(0, 5).map((i) => (
              <div key={i.id} className="flex items-center gap-3 px-3.5 py-2.5 border-b border-line last:border-0">
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded-[4px] accent-brand-700" aria-label={`Include ${i.part}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-ink truncate">{i.part}</p>
                  <p className="text-2xs text-ink-3 num">{i.sku} · available {i.available} · reorder at {i.reorderPoint}</p>
                </div>
                <StatusBadge status={i.status} />
                <span className="text-[13px] num font-semibold text-ink w-24 text-right">{inrFull(i.unitCost)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <Label htmlFor="po-notes">Notes to supplier</Label>
          <Textarea id="po-notes" placeholder="Delivery instructions, priority handling, site contact…" />
        </div>
      </Modal>
    </>
  )
}
