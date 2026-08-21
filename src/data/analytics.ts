import type { Alert, Notification, Workflow } from '@/types'

export const revenueSeries = [
  { month: 'Mar', revenue: 3820000, target: 4000000, lastYear: 3410000 },
  { month: 'Apr', revenue: 4160000, target: 4200000, lastYear: 3680000 },
  { month: 'May', revenue: 3940000, target: 4400000, lastYear: 3720000 },
  { month: 'Jun', revenue: 4720000, target: 4600000, lastYear: 3980000 },
  { month: 'Jul', revenue: 4380000, target: 4800000, lastYear: 4120000 },
  { month: 'Aug', revenue: 4860000, target: 5000000, lastYear: 4310000 },
]

export const pipelineStages = [
  { stage: 'New', value: 4230000, count: 18, fill: '#95b6cd' },
  { stage: 'Qualified', value: 6480000, count: 14, fill: '#5f8fae' },
  { stage: 'Proposal', value: 4900000, count: 9, fill: '#3d7093' },
  { stage: 'Negotiation', value: 2610000, count: 5, fill: '#2e5a79' },
  { stage: 'Won', value: 6610000, count: 7, fill: '#234a67' },
]

export const ticketSeries = [
  { week: 'W27', created: 62, resolved: 58, backlog: 41 },
  { week: 'W28', created: 71, resolved: 64, backlog: 48 },
  { week: 'W29', created: 66, resolved: 69, backlog: 45 },
  { week: 'W30', created: 78, resolved: 66, backlog: 57 },
  { week: 'W31', created: 74, resolved: 71, backlog: 60 },
  { week: 'W32', created: 81, resolved: 70, backlog: 71 },
  { week: 'W33', created: 76, resolved: 74, backlog: 73 },
  { week: 'W34', created: 69, resolved: 78, backlog: 64 },
]

export const departmentPerformance = [
  { department: 'Sales', performance: 86, target: 85 },
  { department: 'Service', performance: 74, target: 88 },
  { department: 'Projects', performance: 78, target: 84 },
  { department: 'Operations', performance: 84, target: 82 },
  { department: 'Finance', performance: 89, target: 86 },
]

export const customerHealth = [
  { name: 'Healthy', value: 812, fill: '#12805c' },
  { name: 'Monitor', value: 341, fill: '#b46a06' },
  { name: 'At Risk', value: 131, fill: '#c02b26' },
]

export const employeeHealthSeries = [
  { month: 'Mar', health: 79, engagement: 86, workload: 74 },
  { month: 'Apr', health: 81, engagement: 87, workload: 76 },
  { month: 'May', health: 83, engagement: 89, workload: 79 },
  { month: 'Jun', health: 82, engagement: 88, workload: 84 },
  { month: 'Jul', health: 84, engagement: 90, workload: 87 },
  { month: 'Aug', health: 86, engagement: 91, workload: 89 },
]

export const satisfactionTrend = [
  { month: 'Mar', satisfaction: 78, managerSupport: 84, collaboration: 82, growth: 81 },
  { month: 'Apr', satisfaction: 80, managerSupport: 86, collaboration: 83, growth: 82 },
  { month: 'May', satisfaction: 82, managerSupport: 88, collaboration: 85, growth: 82 },
  { month: 'Jun', satisfaction: 81, managerSupport: 88, collaboration: 86, growth: 80 },
  { month: 'Jul', satisfaction: 84, managerSupport: 90, collaboration: 87, growth: 80 },
  { month: 'Aug', satisfaction: 86, managerSupport: 91, collaboration: 88, growth: 79 },
]

export const workloadBalance = [
  { name: 'Priya Sharma', workload: 72, capacity: 100 },
  { name: 'Rahul Verma', workload: 84, capacity: 100 },
  { name: 'Vikram Rao', workload: 96, capacity: 100 },
  { name: 'Anita Roy', workload: 74, capacity: 100 },
  { name: 'Kiran Das', workload: 98, capacity: 100 },
  { name: 'Sahil Khan', workload: 94, capacity: 100 },
  { name: 'Meera Nair', workload: 81, capacity: 100 },
  { name: 'Deepak Iyer', workload: 68, capacity: 100 },
]

export const slaSeries = [
  { month: 'Mar', compliance: 96.1, resolution: 5.8 },
  { month: 'Apr', compliance: 95.4, resolution: 6.0 },
  { month: 'May', compliance: 96.8, resolution: 5.6 },
  { month: 'Jun', compliance: 95.2, resolution: 6.2 },
  { month: 'Jul', compliance: 94.8, resolution: 6.4 },
  { month: 'Aug', compliance: 94.2, resolution: 6.9 },
]

export const conversionFunnel = [
  { stage: 'Leads captured', value: 486 },
  { stage: 'Contacted', value: 372 },
  { stage: 'Qualified', value: 214 },
  { stage: 'Proposal sent', value: 118 },
  { stage: 'Won', value: 46 },
]

export const alerts: Alert[] = [
  {
    id: 'AL-1', severity: 'critical', title: 'SLA breach risk',
    description: '3 priority service tickets are approaching their SLA limit. Two are already in escalation with no engineer confirmed on site.',
    metric: 'Time to breach', metricValue: '< 2 hrs', time: '2026-08-21T10:42:00+05:30',
    action: 'Reassign tickets', module: 'Service',
  },
  {
    id: 'AL-2', severity: 'warning', title: 'Workload imbalance',
    description: '4 engineers are carrying 35% more open tasks than the team average, concentrated in the southern region.',
    metric: 'Above threshold', metricValue: '4 engineers', time: '2026-08-21T09:15:00+05:30',
    action: 'Rebalance workload', module: 'Employees',
  },
  {
    id: 'AL-3', severity: 'warning', title: 'Project milestone slippage',
    description: 'Metro Tower Installation and Crescent Mall Refurbishment have both missed supplier-dependent milestones.',
    metric: 'Projects delayed', metricValue: '2 of 8', time: '2026-08-21T08:05:00+05:30',
    action: 'Open recovery review', module: 'Projects',
  },
  {
    id: 'AL-4', severity: 'monitor', title: 'AMC renewals approaching',
    description: '₹24.8L in annual maintenance contracts are due for renewal within the next 90 days across 6 accounts.',
    metric: 'Contract value', metricValue: '₹24.8L', time: '2026-08-20T18:30:00+05:30',
    action: 'Start renewal plays', module: 'Customers',
  },
  {
    id: 'AL-5', severity: 'monitor', title: 'Critical stock levels',
    description: '3 SKUs have fallen below critical thresholds, two of which are blocking open service tickets.',
    metric: 'SKUs critical', metricValue: '3', time: '2026-08-21T07:20:00+05:30',
    action: 'Raise purchase order', module: 'Inventory',
  },
  {
    id: 'AL-6', severity: 'healthy', title: 'Customer satisfaction improving',
    description: 'CSAT improved 6.4% compared with the previous period, led by the projects and finance functions.',
    metric: 'CSAT', metricValue: '4.3 / 5', time: '2026-08-20T16:00:00+05:30',
    action: 'View report', module: 'Feedback',
  },
]

export const aiBrief = {
  headline: 'Performance is up 8% this month, driven by stronger enterprise conversion.',
  points: [
    { tone: 'success' as const, text: 'Enterprise conversion reached 41%, the highest in six months, adding ₹1.62Cr to weighted pipeline.' },
    { tone: 'danger' as const, text: 'Service risk is rising: ticket backlog increased 17% and average resolution time is up 11%.' },
    { tone: 'warning' as const, text: 'Two projects are behind schedule — both are blocked on supplier commitments rather than internal capacity.' },
    { tone: 'info' as const, text: '₹24.8L of AMC value renews within 90 days across six accounts; three have open service escalations.' },
  ],
  recommendations: [
    { id: 'R1', title: 'Redistribute priority service tickets', detail: 'Move 8 open priority tickets from Kiran Das and Sahil Khan to the western region team.', impact: 'Projected SLA recovery to 96.4%' },
    { id: 'R2', title: 'Review delayed projects', detail: 'Run a recovery review on Metro Tower and Crescent Mall with written supplier commitments.', impact: 'Protects ₹1.76Cr of delivery revenue' },
    { id: 'R3', title: 'Schedule manager check-ins', detail: 'Two engineers are above the workload threshold and their engagement scores have dropped 8 points.', impact: 'Reduces attrition risk in service' },
  ],
}

export const dailyBrief = [
  { id: 'DB-1', label: '18 new leads captured', detail: '6 scored above 80 and are queued for same-day follow-up.', tone: 'info' as const, module: '/leads' },
  { id: 'DB-2', label: '6 tickets require manager attention', detail: '3 are approaching SLA breach and 2 are already escalated.', tone: 'danger' as const, module: '/service' },
  { id: 'DB-3', label: '2 projects are at risk', detail: 'Metro Tower and Crescent Mall both slipped supplier-dependent milestones.', tone: 'warning' as const, module: '/projects' },
  { id: 'DB-4', label: '₹24.8L AMC renewals due within 90 days', detail: 'Six accounts, three with open service escalations.', tone: 'warning' as const, module: '/customers' },
  { id: 'DB-5', label: 'Customer health improved 3.2 points', detail: 'Driven by faster project handovers and cleaner documentation.', tone: 'success' as const, module: '/intelligence' },
  { id: 'DB-6', label: '7 employees have workload above threshold', detail: 'Concentrated in service; two are also showing declining engagement.', tone: 'warning' as const, module: '/employees' },
]

export const workflows: Workflow[] = [
  {
    id: 'WF-01', name: 'High-value lead routing', category: 'Sales',
    when: 'New lead is created',
    conditions: ['Lead score is greater than 70', 'Estimated value is above ₹10L'],
    actions: ['Assign to Sales Manager', 'Create follow-up task due in 4 hours', 'Send in-app notification to owner'],
    active: true, runs30d: 214, lastRun: '2026-08-21T16:42:00+05:30', owner: 'Priya Sharma',
  },
  {
    id: 'WF-02', name: 'SLA escalation ladder', category: 'Service',
    when: 'Ticket SLA reaches 75% consumed',
    conditions: ['Priority is High or Critical', 'Status is not Resolved'],
    actions: ['Notify service head', 'Escalate ticket priority', 'Post update to customer'],
    active: true, runs30d: 86, lastRun: '2026-08-21T13:05:00+05:30', owner: 'Meera Nair',
  },
  {
    id: 'WF-03', name: 'AMC renewal play', category: 'Customers',
    when: 'AMC contract is 90 days from expiry',
    conditions: ['Contract value is above ₹5L'],
    actions: ['Create renewal opportunity', 'Assign to account owner', 'Draft renewal quotation'],
    active: true, runs30d: 12, lastRun: '2026-08-20T09:00:00+05:30', owner: 'Priya Sharma',
  },
  {
    id: 'WF-04', name: 'Low stock replenishment', category: 'Inventory',
    when: 'Stock falls below reorder point',
    conditions: ['Item is flagged as service-critical'],
    actions: ['Raise draft purchase order', 'Notify supply chain lead', 'Flag affected open tickets'],
    active: true, runs30d: 31, lastRun: '2026-08-21T07:20:00+05:30', owner: 'Deepak Iyer',
  },
  {
    id: 'WF-05', name: 'Weekly management report', category: 'Management',
    when: 'Every Monday at 08:00 IST',
    conditions: ['Recipient is a department head or above'],
    actions: ['Compile department scorecards', 'Attach risk register', 'Email to leadership group'],
    active: true, runs30d: 4, lastRun: '2026-08-17T08:00:00+05:30', owner: 'Arjun Mehta',
  },
  {
    id: 'WF-06', name: 'Employee feedback pulse', category: 'People',
    when: 'On the 15th of each month',
    conditions: ['Employee has been active for more than 30 days'],
    actions: ['Send pulse survey', 'Anonymise responses', 'Update employee health index'],
    active: true, runs30d: 1, lastRun: '2026-08-15T10:00:00+05:30', owner: 'Meera Nair',
  },
  {
    id: 'WF-07', name: 'Project delay escalation', category: 'Projects',
    when: 'Milestone is overdue by more than 5 days',
    conditions: ['Project budget is above ₹50L'],
    actions: ['Flag project as At Risk', 'Notify project manager and sponsor', 'Create recovery-plan task'],
    active: true, runs30d: 6, lastRun: '2026-08-19T11:30:00+05:30', owner: 'Vikram Rao',
  },
  {
    id: 'WF-08', name: 'Quotation approval gate', category: 'Sales',
    when: 'Quotation is submitted for approval',
    conditions: ['Discount is greater than 8%'],
    actions: ['Route to Sales Head for approval', 'Lock quotation from editing', 'Log approval in audit trail'],
    active: false, runs30d: 0, lastRun: '2026-07-30T15:10:00+05:30', owner: 'Arjun Mehta',
  },
]

export const notifications: Notification[] = [
  { id: 'N-1', type: 'sla', title: 'Critical SLA risk — TKT-1048', description: 'Crescent Mall escalator ticket breaches SLA in 1h 30m.', time: '2026-08-21T10:42:00+05:30', unread: true },
  { id: 'N-2', type: 'lead', title: 'New lead assigned to you', description: 'Imran Qureshi — Prime Estates, score 89.', time: '2026-08-21T09:30:00+05:30', unread: true },
  { id: 'N-3', type: 'project', title: 'Project milestone delayed', description: 'Metro Tower Installation — shaft installation is 3 days overdue.', time: '2026-08-21T08:05:00+05:30', unread: true },
  { id: 'N-4', type: 'amc', title: 'AMC renewal due in 60 days', description: 'Vertex Infra — ₹9.8L contract expires 20 Sep 2026.', time: '2026-08-20T18:30:00+05:30', unread: false },
  { id: 'N-5', type: 'feedback', title: 'Employee feedback submitted', description: '124 of 135 responses received for the August pulse survey.', time: '2026-08-20T16:00:00+05:30', unread: false },
  { id: 'N-6', type: 'approval', title: 'Quotation awaiting approval', description: 'QT-3044 — Metro Living, discount above approved floor.', time: '2026-08-20T12:15:00+05:30', unread: false },
]

export const auditLogs = [
  { id: 'AU-1', actor: 'Arjun Mehta', action: 'Updated role permissions', target: 'Role: Service Engineer', module: 'Users & Roles', ip: '103.21.58.14', time: '2026-08-21T15:40:00+05:30' },
  { id: 'AU-2', actor: 'Priya Sharma', action: 'Approved quotation', target: 'QT-3043 — Prime Estates', module: 'Quotations', ip: '49.36.180.72', time: '2026-08-21T14:05:00+05:30' },
  { id: 'AU-3', actor: 'Meera Nair', action: 'Escalated ticket', target: 'TKT-1048 — Crescent Mall', module: 'Service', ip: '117.96.44.9', time: '2026-08-21T13:05:00+05:30' },
  { id: 'AU-4', actor: 'Deepak Iyer', action: 'Raised purchase order', target: 'PO-8842 — Sterling Drives', module: 'Inventory', ip: '103.21.58.61', time: '2026-08-21T11:20:00+05:30' },
  { id: 'AU-5', actor: 'System', action: 'Executed workflow', target: 'WF-02 — SLA escalation ladder', module: 'Automation', ip: '—', time: '2026-08-21T10:45:00+05:30' },
  { id: 'AU-6', actor: 'Vikram Rao', action: 'Changed project status', target: 'PRJ-201 — Metro Tower Installation', module: 'Projects', ip: '106.51.22.88', time: '2026-08-21T09:12:00+05:30' },
  { id: 'AU-7', actor: 'Rahul Verma', action: 'Created deal', target: 'DL-506 — Northstar Projects', module: 'Pipeline', ip: '49.36.180.104', time: '2026-08-20T17:33:00+05:30' },
  { id: 'AU-8', actor: 'Sneha Pillai', action: 'Exported report', target: 'Revenue Report — Aug 2026', module: 'Reports', ip: '117.96.44.51', time: '2026-08-20T16:02:00+05:30' },
]

export const REPORT_CATEGORIES = ['Sales', 'Customers', 'Service', 'Projects', 'Inventory', 'Employees', 'Finance', 'Management'] as const

export const reports = [
  { id: 'RP-1', name: 'Revenue Report', category: 'Sales', description: 'Monthly revenue against target, split by segment, territory and product line.', updated: '2026-08-21', views: 218, owner: 'Sneha Pillai', format: 'Chart + Table' },
  { id: 'RP-2', name: 'Pipeline Report', category: 'Sales', description: 'Stage-wise pipeline value, weighted forecast and stage ageing analysis.', updated: '2026-08-21', views: 194, owner: 'Priya Sharma', format: 'Chart + Table' },
  { id: 'RP-3', name: 'Lead Conversion', category: 'Sales', description: 'Source-wise conversion, response time and cost per qualified lead.', updated: '2026-08-20', views: 141, owner: 'Rohit Bansal', format: 'Funnel' },
  { id: 'RP-4', name: 'Customer Health', category: 'Customers', description: 'Health scoring across revenue, tickets, CSAT and renewal exposure.', updated: '2026-08-21', views: 176, owner: 'Priya Sharma', format: 'Scorecard' },
  { id: 'RP-5', name: 'AMC Renewal Forecast', category: 'Customers', description: 'Contracts expiring in 30 / 60 / 90 days with renewal probability.', updated: '2026-08-19', views: 98, owner: 'Anita Roy', format: 'Table' },
  { id: 'RP-6', name: 'SLA Report', category: 'Service', description: 'SLA compliance by priority, engineer and region with breach root causes.', updated: '2026-08-21', views: 232, owner: 'Meera Nair', format: 'Chart + Table' },
  { id: 'RP-7', name: 'Ticket Resolution Analysis', category: 'Service', description: 'Resolution time trends, first-time fix rate and repeat visit drivers.', updated: '2026-08-20', views: 164, owner: 'Meera Nair', format: 'Chart' },
  { id: 'RP-8', name: 'Project Performance', category: 'Projects', description: 'Schedule variance, budget burn and milestone slippage across the portfolio.', updated: '2026-08-21', views: 187, owner: 'Vikram Rao', format: 'Chart + Table' },
  { id: 'RP-9', name: 'Inventory Health', category: 'Inventory', description: 'Stock coverage, critical SKUs, ageing inventory and warehouse utilisation.', updated: '2026-08-21', views: 112, owner: 'Deepak Iyer', format: 'Scorecard' },
  { id: 'RP-10', name: 'Purchase Order Cycle', category: 'Inventory', description: 'PO ageing, supplier lead time performance and receipt accuracy.', updated: '2026-08-18', views: 76, owner: 'Tanvi Desai', format: 'Table' },
  { id: 'RP-11', name: 'Employee Performance', category: 'Employees', description: 'Goal attainment, performance distribution and manager-rated capability.', updated: '2026-08-20', views: 203, owner: 'Arjun Mehta', format: 'Scorecard' },
  { id: 'RP-12', name: 'Feedback Insights', category: 'Employees', description: 'Pulse themes, sentiment movement and anonymised commentary clusters.', updated: '2026-08-21', views: 158, owner: 'Meera Nair', format: 'Chart' },
  { id: 'RP-13', name: 'Receivables Ageing', category: 'Finance', description: 'Outstanding invoices by ageing bucket, customer and collection owner.', updated: '2026-08-21', views: 149, owner: 'Sneha Pillai', format: 'Table' },
  { id: 'RP-14', name: 'GST Summary', category: 'Finance', description: 'Output and input tax summary with reconciliation exceptions.', updated: '2026-08-19', views: 84, owner: 'Farah Sheikh', format: 'Table' },
  { id: 'RP-15', name: 'Company Health Scorecard', category: 'Management', description: 'Cross-functional health across performance, workload, risk and engagement.', updated: '2026-08-21', views: 264, owner: 'Arjun Mehta', format: 'Scorecard' },
  { id: 'RP-16', name: 'Risk Register', category: 'Management', description: 'Consolidated operational, delivery and commercial risks with owners.', updated: '2026-08-21', views: 121, owner: 'Arjun Mehta', format: 'Table' },
]

export const invoices = [
  { id: 'INV-9021', customer: 'Apex Elevators', amount: 1850000, issued: '2026-08-01', due: '2026-08-31', status: 'Paid' },
  { id: 'INV-9022', customer: 'Prime Estates', amount: 2460000, issued: '2026-08-05', due: '2026-09-04', status: 'Open' },
  { id: 'INV-9023', customer: 'Urban Spaces', amount: 1180000, issued: '2026-07-18', due: '2026-08-17', status: 'Overdue' },
  { id: 'INV-9024', customer: 'Skyline Group', amount: 3200000, issued: '2026-08-08', due: '2026-09-07', status: 'Open' },
  { id: 'INV-9025', customer: 'Metro Living', amount: 640000, issued: '2026-07-28', due: '2026-08-27', status: 'Open' },
  { id: 'INV-9026', customer: 'Vertex Infra', amount: 980000, issued: '2026-07-10', due: '2026-08-09', status: 'Overdue' },
]
