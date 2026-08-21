export type Severity = 'critical' | 'warning' | 'monitor' | 'healthy'

export type Lead = {
  id: string
  name: string
  title: string
  company: string
  email: string
  phone: string
  source: 'Website' | 'Facebook Ads' | 'Google Ads' | 'Referral' | 'Trade Show' | 'Cold Outreach' | 'IndiaMART' | 'Partner'
  owner: string
  score: number
  status: 'New' | 'Contacted' | 'Qualified' | 'Hot' | 'Cold' | 'Converted'
  value: number
  city: string
  lastActivity: string
  nextFollowUp: string
  createdAt: string
  notes: string
}

export type Customer = {
  id: string
  name: string
  industry: string
  segment: 'Enterprise' | 'Mid-Market' | 'SMB'
  owner: string
  health: number
  status: 'Active' | 'Monitor' | 'At Risk'
  revenue: number
  openDeals: number
  openDealValue: number
  openTickets: number
  amcValue: number
  amcRenewal: string
  since: string
  city: string
  employees: number
  gstin: string
  website: string
  lastActivity: string
  csat: number
  contacts: Contact[]
}

export type Contact = {
  id: string
  name: string
  role: string
  email: string
  phone: string
  primary?: boolean
}

export type Deal = {
  id: string
  title: string
  customer: string
  value: number
  owner: string
  stage: 'New' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost'
  probability: number
  expectedClose: string
  nextActivity: string
  territory: 'North' | 'West' | 'South' | 'East'
  createdAt: string
  products: string[]
}

export type QuoteLine = {
  id: string
  item: string
  sku: string
  qty: number
  price: number
  discount: number
}

export type Quotation = {
  id: string
  customer: string
  contact: string
  amount: number
  owner: string
  created: string
  validUntil: string
  status: 'Draft' | 'Sent' | 'Viewed' | 'Accepted' | 'Rejected' | 'Expired'
  lines: QuoteLine[]
  terms: string
}

export type Ticket = {
  id: string
  customer: string
  subject: string
  description: string
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  engineer: string
  slaHoursLeft: number
  slaTotal: number
  status: 'Open' | 'In Progress' | 'Waiting' | 'Resolved' | 'Escalated'
  created: string
  category: string
  site: string
  comments: { id: string; author: string; text: string; time: string }[]
}

export type Project = {
  id: string
  name: string
  customer: string
  manager: string
  progress: number
  budget: number
  spent: number
  start: string
  end: string
  status: 'On Track' | 'At Risk' | 'Delayed' | 'Completed'
  risk: 'Low' | 'Medium' | 'High'
  team: string[]
  phase: string
  milestones: { id: string; name: string; due: string; done: boolean; owner: string }[]
  issues: { id: string; title: string; severity: Severity; owner: string }[]
}

export type InventoryItem = {
  id: string
  part: string
  sku: string
  category: string
  warehouse: string
  available: number
  reserved: number
  reorderPoint: number
  unitCost: number
  status: 'Healthy' | 'Low Stock' | 'Critical'
  lastMovement: string
}

export type Employee = {
  id: string
  name: string
  department: 'Sales' | 'Service' | 'Projects' | 'Operations' | 'Finance'
  role: string
  manager: string
  email: string
  phone: string
  location: string
  joined: string
  goalProgress: number
  performance: number
  health: number
  workload: number
  engagement: number
  csat: number
  status: 'Active' | 'On Leave' | 'Notice'
  openTasks: number
  goals: { id: string; title: string; progress: number; due: string }[]
}

export type Workflow = {
  id: string
  name: string
  category: string
  when: string
  conditions: string[]
  actions: string[]
  active: boolean
  runs30d: number
  lastRun: string
  owner: string
}

export type Alert = {
  id: string
  severity: Severity
  title: string
  description: string
  metric: string
  metricValue: string
  time: string
  action: string
  module: string
}

export type Notification = {
  id: string
  type: 'sla' | 'lead' | 'project' | 'amc' | 'feedback' | 'approval'
  title: string
  description: string
  time: string
  unread: boolean
}
