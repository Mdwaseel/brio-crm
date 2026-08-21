import type { Employee } from '@/types'

export const employees: Employee[] = [
  {
    id: 'EMP-01', name: 'Priya Sharma', department: 'Sales', role: 'Senior Account Director', manager: 'Arjun Mehta',
    email: 'priya.sharma@brio.in', phone: '+91 98200 11001', location: 'Mumbai', joined: '2021-03-15',
    goalProgress: 88, performance: 94, health: 91, workload: 72, engagement: 93, csat: 4.6, status: 'Active', openTasks: 12,
    goals: [
      { id: 'G1', title: 'Close ₹1.2Cr new business in H2', progress: 74, due: '2026-12-31' },
      { id: 'G2', title: 'Grow enterprise segment by 18%', progress: 82, due: '2026-12-31' },
      { id: 'G3', title: 'Mentor two junior account executives', progress: 60, due: '2026-10-31' },
    ],
  },
  {
    id: 'EMP-02', name: 'Rahul Verma', department: 'Sales', role: 'Account Manager', manager: 'Priya Sharma',
    email: 'rahul.verma@brio.in', phone: '+91 98200 11002', location: 'Gurugram', joined: '2022-07-04',
    goalProgress: 71, performance: 82, health: 78, workload: 84, engagement: 79, csat: 4.2, status: 'Active', openTasks: 18,
    goals: [
      { id: 'G4', title: 'Achieve ₹78L quarterly quota', progress: 68, due: '2026-09-30' },
      { id: 'G5', title: 'Improve proposal turnaround to 3 days', progress: 55, due: '2026-10-15' },
    ],
  },
  {
    id: 'EMP-03', name: 'Vikram Rao', department: 'Projects', role: 'Project Manager', manager: 'Arjun Mehta',
    email: 'vikram.rao@brio.in', phone: '+91 98450 11003', location: 'Hyderabad', joined: '2020-01-20',
    goalProgress: 62, performance: 76, health: 64, workload: 96, engagement: 68, csat: 3.9, status: 'Active', openTasks: 27,
    goals: [
      { id: 'G6', title: 'Deliver Metro Tower on revised schedule', progress: 58, due: '2026-11-20' },
      { id: 'G7', title: 'Keep project margin above 22%', progress: 64, due: '2026-12-31' },
      { id: 'G8', title: 'Close all open safety observations', progress: 45, due: '2026-09-30' },
    ],
  },
  {
    id: 'EMP-04', name: 'Anita Roy', department: 'Service', role: 'Senior Service Engineer', manager: 'Meera Nair',
    email: 'anita.roy@brio.in', phone: '+91 98220 11004', location: 'Pune', joined: '2021-11-08',
    goalProgress: 79, performance: 86, health: 82, workload: 74, engagement: 85, csat: 4.4, status: 'Active', openTasks: 14,
    goals: [
      { id: 'G9', title: 'Maintain SLA compliance above 95%', progress: 92, due: '2026-12-31' },
      { id: 'G10', title: 'Complete advanced controls certification', progress: 40, due: '2026-11-30' },
    ],
  },
  {
    id: 'EMP-05', name: 'Kiran Das', department: 'Service', role: 'Field Service Engineer', manager: 'Meera Nair',
    email: 'kiran.das@brio.in', phone: '+91 94470 11005', location: 'Kochi', joined: '2022-02-14',
    goalProgress: 54, performance: 71, health: 58, workload: 98, engagement: 62, csat: 3.8, status: 'Active', openTasks: 31,
    goals: [
      { id: 'G11', title: 'Reduce repeat visits by 20%', progress: 38, due: '2026-10-31' },
      { id: 'G12', title: 'Close Crescent Mall escalations', progress: 45, due: '2026-09-15' },
    ],
  },
  {
    id: 'EMP-06', name: 'Sahil Khan', department: 'Service', role: 'Field Service Engineer', manager: 'Meera Nair',
    email: 'sahil.khan@brio.in', phone: '+91 99870 11006', location: 'Ahmedabad', joined: '2023-05-22',
    goalProgress: 66, performance: 78, health: 61, workload: 94, engagement: 66, csat: 4.0, status: 'Active', openTasks: 26,
    goals: [
      { id: 'G13', title: 'First-time fix rate above 85%', progress: 72, due: '2026-12-31' },
      { id: 'G14', title: 'Complete safety refresher training', progress: 100, due: '2026-08-15' },
    ],
  },
  {
    id: 'EMP-07', name: 'Meera Nair', department: 'Service', role: 'Head of Service', manager: 'Arjun Mehta',
    email: 'meera.nair@brio.in', phone: '+91 90040 11007', location: 'Chennai', joined: '2019-06-10',
    goalProgress: 74, performance: 88, health: 79, workload: 81, engagement: 84, csat: 4.3, status: 'Active', openTasks: 16,
    goals: [
      { id: 'G15', title: 'Lift SLA compliance to 96%', progress: 78, due: '2026-12-31' },
      { id: 'G16', title: 'Rebalance engineer workload across regions', progress: 42, due: '2026-09-30' },
    ],
  },
  {
    id: 'EMP-08', name: 'Deepak Iyer', department: 'Operations', role: 'Supply Chain Lead', manager: 'Arjun Mehta',
    email: 'deepak.iyer@brio.in', phone: '+91 98200 11008', location: 'Mumbai', joined: '2020-09-01',
    goalProgress: 83, performance: 85, health: 84, workload: 68, engagement: 87, csat: 4.2, status: 'Active', openTasks: 9,
    goals: [
      { id: 'G17', title: 'Cut critical stock-outs to zero', progress: 66, due: '2026-10-31' },
      { id: 'G18', title: 'Reduce average lead time by 8 days', progress: 88, due: '2026-12-31' },
    ],
  },
  {
    id: 'EMP-09', name: 'Nikhil Joshi', department: 'Projects', role: 'Project Engineer', manager: 'Vikram Rao',
    email: 'nikhil.joshi@brio.in', phone: '+91 98730 11009', location: 'Gurugram', joined: '2023-08-16',
    goalProgress: 69, performance: 79, health: 76, workload: 77, engagement: 81, csat: 4.1, status: 'Active', openTasks: 15,
    goals: [{ id: 'G19', title: 'Site mobilisation within 15 days of PO', progress: 70, due: '2026-11-30' }],
  },
  {
    id: 'EMP-10', name: 'Sneha Pillai', department: 'Finance', role: 'Finance Manager', manager: 'Arjun Mehta',
    email: 'sneha.pillai@brio.in', phone: '+91 94470 11010', location: 'Kochi', joined: '2021-01-11',
    goalProgress: 86, performance: 90, health: 88, workload: 62, engagement: 89, csat: 4.5, status: 'Active', openTasks: 7,
    goals: [
      { id: 'G20', title: 'Reduce DSO to 42 days', progress: 81, due: '2026-12-31' },
      { id: 'G21', title: 'Automate GST reconciliation', progress: 92, due: '2026-09-30' },
    ],
  },
  {
    id: 'EMP-11', name: 'Rohit Bansal', department: 'Sales', role: 'Inside Sales Executive', manager: 'Priya Sharma',
    email: 'rohit.bansal@brio.in', phone: '+91 98110 11011', location: 'Delhi NCR', joined: '2024-04-02',
    goalProgress: 58, performance: 68, health: 72, workload: 66, engagement: 74, csat: 3.9, status: 'Active', openTasks: 11,
    goals: [{ id: 'G22', title: 'Qualify 40 leads per month', progress: 62, due: '2026-12-31' }],
  },
  {
    id: 'EMP-12', name: 'Tanvi Desai', department: 'Operations', role: 'Warehouse Supervisor', manager: 'Deepak Iyer',
    email: 'tanvi.desai@brio.in', phone: '+91 98220 11012', location: 'Pune', joined: '2022-10-19',
    goalProgress: 77, performance: 81, health: 80, workload: 70, engagement: 82, csat: 4.1, status: 'Active', openTasks: 8,
    goals: [{ id: 'G23', title: 'Inventory accuracy above 99%', progress: 84, due: '2026-12-31' }],
  },
  {
    id: 'EMP-13', name: 'Farah Sheikh', department: 'Finance', role: 'Accounts Executive', manager: 'Sneha Pillai',
    email: 'farah.sheikh@brio.in', phone: '+91 98450 11013', location: 'Hyderabad', joined: '2023-12-04',
    goalProgress: 72, performance: 77, health: 83, workload: 58, engagement: 80, csat: 4.0, status: 'On Leave', openTasks: 4,
    goals: [{ id: 'G24', title: 'Clear receivables ageing above 90 days', progress: 68, due: '2026-10-31' }],
  },
  {
    id: 'EMP-14', name: 'Ananya Ghosh', department: 'Operations', role: 'Quality Lead', manager: 'Deepak Iyer',
    email: 'ananya.ghosh@brio.in', phone: '+91 98300 11014', location: 'Kolkata', joined: '2021-08-23',
    goalProgress: 81, performance: 84, health: 86, workload: 64, engagement: 88, csat: 4.3, status: 'Active', openTasks: 6,
    goals: [{ id: 'G25', title: 'Zero critical audit findings', progress: 90, due: '2026-12-31' }],
  },
]

export const DEPARTMENTS = [
  {
    name: 'Sales', head: 'Priya Sharma', headcount: 24, performance: 86, workload: 74,
    csat: 4.3, sla: 0, engagement: 84, risk: 'Low' as const, revenue: 28600000,
    note: 'Enterprise conversion improving; mid-market response times slipping.',
  },
  {
    name: 'Service', head: 'Meera Nair', headcount: 38, performance: 74, workload: 92,
    csat: 4.0, sla: 94.2, engagement: 68, risk: 'High' as const, revenue: 12400000,
    note: 'Backlog up 17%. Two engineers materially above workload threshold.',
  },
  {
    name: 'Projects', head: 'Vikram Rao', headcount: 19, performance: 78, workload: 88,
    csat: 4.1, sla: 91.6, engagement: 72, risk: 'Medium' as const, revenue: 41800000,
    note: 'Two projects behind schedule; supplier slippage is the primary driver.',
  },
  {
    name: 'Operations', head: 'Deepak Iyer', headcount: 27, performance: 84, workload: 69,
    csat: 4.2, sla: 97.1, engagement: 85, risk: 'Low' as const, revenue: 0,
    note: 'Lead times improving. Three SKUs at critical stock require action.',
  },
  {
    name: 'Finance', head: 'Sneha Pillai', headcount: 12, performance: 89, workload: 61,
    csat: 4.5, sla: 98.4, engagement: 89, risk: 'Low' as const, revenue: 0,
    note: 'DSO trending down for the fourth consecutive month.',
  },
]

export const feedbackThemes = [
  { theme: 'Manager Support', score: 91, delta: 3.2, responses: 118, tone: 'success' as const },
  { theme: 'Team Collaboration', score: 88, delta: 1.8, responses: 121, tone: 'success' as const },
  { theme: 'Growth Opportunities', score: 79, delta: -1.4, responses: 116, tone: 'warning' as const },
  { theme: 'Workload Balance', score: 73, delta: -5.6, responses: 124, tone: 'danger' as const },
  { theme: 'Recognition', score: 82, delta: 2.1, responses: 112, tone: 'success' as const },
  { theme: 'Tools & Enablement', score: 85, delta: 0.6, responses: 109, tone: 'success' as const },
]

export const pulseSurveys = [
  { id: 'PS-14', name: 'August Pulse — Workload & Support', sent: '2026-08-15', responses: 124, invited: 135, score: 86, status: 'Active' },
  { id: 'PS-13', name: 'July Pulse — Team Collaboration', sent: '2026-07-15', responses: 128, invited: 133, score: 84, status: 'Closed' },
  { id: 'PS-12', name: 'Q2 Engagement Survey', sent: '2026-06-28', responses: 119, invited: 131, score: 82, status: 'Closed' },
  { id: 'PS-11', name: 'June Pulse — Manager Effectiveness', sent: '2026-06-14', responses: 122, invited: 130, score: 88, status: 'Closed' },
]

export const anonymousFeedback = [
  { id: 'AF-1', department: 'Service', sentiment: 'Negative', theme: 'Workload Balance', text: 'Weekend escalations have become the norm rather than the exception. Coverage planning needs a rethink.', time: '2026-08-20' },
  { id: 'AF-2', department: 'Sales', sentiment: 'Positive', theme: 'Manager Support', text: 'Deal reviews are genuinely useful now — clear decisions instead of long status updates.', time: '2026-08-19' },
  { id: 'AF-3', department: 'Projects', sentiment: 'Neutral', theme: 'Growth Opportunities', text: 'Would like a clearer path from project engineer to project manager with defined criteria.', time: '2026-08-18' },
  { id: 'AF-4', department: 'Service', sentiment: 'Negative', theme: 'Tools & Enablement', text: 'Spare part availability at regional bins is the biggest cause of repeat visits.', time: '2026-08-17' },
  { id: 'AF-5', department: 'Operations', sentiment: 'Positive', theme: 'Recognition', text: 'The quarterly operations award felt fair and was well communicated across the team.', time: '2026-08-16' },
  { id: 'AF-6', department: 'Finance', sentiment: 'Positive', theme: 'Team Collaboration', text: 'Cross-functional coordination with sales on collections has improved noticeably.', time: '2026-08-15' },
]

export const feedbackMatrix = [
  { employee: 'Priya Sharma', self: 88, manager: 94, peers: 91, customers: 92, company: 90 },
  { employee: 'Rahul Verma', self: 82, manager: 82, peers: 79, customers: 84, company: 81 },
  { employee: 'Vikram Rao', self: 78, manager: 76, peers: 72, customers: 78, company: 75 },
  { employee: 'Anita Roy', self: 84, manager: 86, peers: 88, customers: 88, company: 86 },
  { employee: 'Kiran Das', self: 74, manager: 71, peers: 76, customers: 76, company: 73 },
  { employee: 'Sahil Khan', self: 80, manager: 78, peers: 82, customers: 80, company: 79 },
  { employee: 'Meera Nair', self: 86, manager: 88, peers: 85, customers: 86, company: 87 },
  { employee: 'Deepak Iyer', self: 85, manager: 85, peers: 87, customers: 84, company: 85 },
]

export const customerFeedback = [
  { id: 'CF-1', customer: 'Prime Estates', contact: 'Imran Qureshi', score: 5, sentiment: 'Positive', text: 'Handover was on schedule and documentation was complete on day one.', time: '2026-08-19', module: 'Projects' },
  { id: 'CF-2', customer: 'Crescent Mall', contact: 'Kavya Menon', score: 2, sentiment: 'Negative', text: 'Three visits for the same handrail fault. We need a root-cause fix.', time: '2026-08-21', module: 'Service' },
  { id: 'CF-3', customer: 'Apex Elevators', contact: 'Rohan Kapoor', score: 5, sentiment: 'Positive', text: 'The account team is proactive — issues are raised before we notice them.', time: '2026-08-18', module: 'Sales' },
  { id: 'CF-4', customer: 'Vertex Infra', contact: 'Aditya Nair', score: 3, sentiment: 'Neutral', text: 'Technical quality is good; schedule communication could be sharper.', time: '2026-08-17', module: 'Projects' },
  { id: 'CF-5', customer: 'Skyline Group', contact: 'Arvind Pillai', score: 5, sentiment: 'Positive', text: 'Emergency response during the intercom outage was fast and well handled.', time: '2026-08-20', module: 'Service' },
  { id: 'CF-6', customer: 'Metro Living', contact: 'Tanya Sethi', score: 4, sentiment: 'Positive', text: 'Commercial flexibility on the AMC bundle was appreciated.', time: '2026-08-16', module: 'Sales' },
]

export const IMPROVEMENT_AREAS = [
  {
    id: 'IA-1', title: 'Workload imbalance', department: 'Service', severity: 'critical' as const,
    impact: '4 engineers carrying 35% above team average', trend: -8.4,
    detail: 'Kiran Das and Sahil Khan are both above the 90% workload threshold while three engineers in the western region sit below 60%.',
    recommendation: 'Rebalance 8 open priority tickets across the western region and add weekend coverage rotation.',
  },
  {
    id: 'IA-2', title: 'Service resolution time', department: 'Service', severity: 'critical' as const,
    impact: 'Average resolution up 11% month-on-month', trend: -11,
    detail: 'Mechanical category resolution has slipped from 6.2 to 6.9 hours, driven largely by spare part availability at regional bins.',
    recommendation: 'Raise reorder points for the three critical SKUs and pre-position escalator spares at the Chennai hub.',
  },
  {
    id: 'IA-3', title: 'Project milestone delays', department: 'Projects', severity: 'warning' as const,
    impact: '2 of 8 active projects behind schedule', trend: -6.2,
    detail: 'Metro Tower and Crescent Mall are both slipping on supplier-dependent milestones with no recovery plan logged.',
    recommendation: 'Run a recovery review with both project managers and escalate supplier commitments in writing.',
  },
  {
    id: 'IA-4', title: 'Declining mid-market conversion', department: 'Sales', severity: 'warning' as const,
    impact: 'Mid-market win rate down to 24%', trend: -4.8,
    detail: 'Enterprise conversion is strong at 41%, but mid-market response time has grown to 6.4 hours against a 4-hour target.',
    recommendation: 'Route mid-market leads through inside sales with an automated 2-hour first-response rule.',
  },
  {
    id: 'IA-5', title: 'Employee satisfaction — growth paths', department: 'Company', severity: 'monitor' as const,
    impact: 'Growth opportunity score at 79, down 1.4 pts', trend: -1.4,
    detail: 'Field engineers and project engineers both flag unclear progression criteria in the latest pulse survey.',
    recommendation: 'Publish role progression matrices for service and project tracks before the next review cycle.',
  },
]
