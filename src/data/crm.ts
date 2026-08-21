import type { Lead, Customer, Deal, Quotation } from '@/types'

export const OWNERS = ['Priya Sharma', 'Rahul Verma', 'Vikram Rao', 'Anita Roy', 'Kiran Das', 'Sahil Khan']

export const leads: Lead[] = [
  {
    id: 'LD-2041', name: 'Rohan Kapoor', title: 'Head of Facilities', company: 'Apex Elevators',
    email: 'rohan.kapoor@apexelevators.in', phone: '+91 98200 41120', source: 'Website',
    owner: 'Priya Sharma', score: 92, status: 'Hot', value: 1800000, city: 'Mumbai',
    lastActivity: '2026-08-21T15:20:00+05:30', nextFollowUp: '2026-08-23', createdAt: '2026-08-04',
    notes: 'Evaluating a 14-unit modernisation package for two commercial towers. Budget approved by CFO.',
  },
  {
    id: 'LD-2042', name: 'Neha Reddy', title: 'Project Director', company: 'Urban Spaces',
    email: 'neha.reddy@urbanspaces.co.in', phone: '+91 99450 88210', source: 'Facebook Ads',
    owner: 'Rahul Verma', score: 87, status: 'Qualified', value: 2400000, city: 'Bengaluru',
    lastActivity: '2026-08-21T11:05:00+05:30', nextFollowUp: '2026-08-24', createdAt: '2026-08-06',
    notes: 'Township phase 2 — needs vertical transport plus AMC bundled into a single commercial.',
  },
  {
    id: 'LD-2043', name: 'Aditya Nair', title: 'GM Operations', company: 'Vertex Infra',
    email: 'aditya.nair@vertexinfra.com', phone: '+91 98450 33012', source: 'Referral',
    owner: 'Vikram Rao', score: 78, status: 'Qualified', value: 3600000, city: 'Hyderabad',
    lastActivity: '2026-08-20T17:40:00+05:30', nextFollowUp: '2026-08-25', createdAt: '2026-07-29',
    notes: 'Referred by Skyline Group. Wants a site survey before the technical proposal.',
  },
  {
    id: 'LD-2044', name: 'Sanjana Bhatt', title: 'Procurement Lead', company: 'Metro Living',
    email: 'sanjana.bhatt@metroliving.in', phone: '+91 97690 21188', source: 'IndiaMART',
    owner: 'Anita Roy', score: 64, status: 'Contacted', value: 950000, city: 'Pune',
    lastActivity: '2026-08-19T10:15:00+05:30', nextFollowUp: '2026-08-26', createdAt: '2026-08-11',
    notes: 'Price-sensitive. Comparing three vendors; decision expected end of quarter.',
  },
  {
    id: 'LD-2045', name: 'Imran Qureshi', title: 'Director', company: 'Prime Estates',
    email: 'imran.q@primeestates.in', phone: '+91 98110 45521', source: 'Trade Show',
    owner: 'Priya Sharma', score: 89, status: 'Hot', value: 4200000, city: 'Delhi NCR',
    lastActivity: '2026-08-21T09:30:00+05:30', nextFollowUp: '2026-08-22', createdAt: '2026-08-02',
    notes: 'Met at Elevator Expo. Wants a 5-tower rollout with a single service SLA.',
  },
  {
    id: 'LD-2046', name: 'Kavya Menon', title: 'Facility Manager', company: 'Crescent Mall',
    email: 'kavya.menon@crescentmall.in', phone: '+91 94470 66210', source: 'Google Ads',
    owner: 'Kiran Das', score: 71, status: 'Qualified', value: 1250000, city: 'Kochi',
    lastActivity: '2026-08-20T14:00:00+05:30', nextFollowUp: '2026-08-27', createdAt: '2026-08-09',
    notes: 'Escalator refurbishment for the atrium wing. Weekend-only work window.',
  },
  {
    id: 'LD-2047', name: 'Devendra Shah', title: 'CEO', company: 'BuildRight',
    email: 'd.shah@buildright.co.in', phone: '+91 99870 10045', source: 'Cold Outreach',
    owner: 'Sahil Khan', score: 45, status: 'New', value: 600000, city: 'Ahmedabad',
    lastActivity: '2026-08-18T16:45:00+05:30', nextFollowUp: '2026-08-28', createdAt: '2026-08-18',
    notes: 'Early conversation. No defined timeline yet.',
  },
  {
    id: 'LD-2048', name: 'Ritu Malhotra', title: 'VP Projects', company: 'Northstar Projects',
    email: 'ritu.m@northstarprojects.in', phone: '+91 98730 77219', source: 'Partner',
    owner: 'Rahul Verma', score: 83, status: 'Qualified', value: 2900000, city: 'Gurugram',
    lastActivity: '2026-08-21T13:10:00+05:30', nextFollowUp: '2026-08-24', createdAt: '2026-08-07',
    notes: 'Partner-sourced. Technical evaluation scheduled with their consultant.',
  },
  {
    id: 'LD-2049', name: 'Arvind Pillai', title: 'Head — Maintenance', company: 'Skyline Group',
    email: 'arvind.pillai@skylinegroup.in', phone: '+91 90040 55870', source: 'Website',
    owner: 'Vikram Rao', score: 68, status: 'Contacted', value: 1450000, city: 'Chennai',
    lastActivity: '2026-08-19T12:20:00+05:30', nextFollowUp: '2026-08-25', createdAt: '2026-08-13',
    notes: 'Existing AMC customer exploring an upgrade for three legacy units.',
  },
  {
    id: 'LD-2050', name: 'Pooja Deshmukh', title: 'Admin Head', company: 'Orion Works',
    email: 'pooja.d@orionworks.in', phone: '+91 98220 39917', source: 'Referral',
    owner: 'Anita Roy', score: 57, status: 'Cold', value: 480000, city: 'Nagpur',
    lastActivity: '2026-08-12T09:50:00+05:30', nextFollowUp: '2026-09-02', createdAt: '2026-07-24',
    notes: 'Budget deferred to next financial year. Keep warm with quarterly touchpoints.',
  },
  {
    id: 'LD-2051', name: 'Harshad Patil', title: 'Site Engineer', company: 'Urban Spaces',
    email: 'harshad.patil@urbanspaces.co.in', phone: '+91 98905 12034', source: 'Website',
    owner: 'Kiran Das', score: 74, status: 'Contacted', value: 820000, city: 'Bengaluru',
    lastActivity: '2026-08-20T18:05:00+05:30', nextFollowUp: '2026-08-26', createdAt: '2026-08-14',
    notes: 'Secondary contact for the township deal. Useful technical champion.',
  },
  {
    id: 'LD-2052', name: 'Tanya Sethi', title: 'Purchase Manager', company: 'Metro Living',
    email: 'tanya.sethi@metroliving.in', phone: '+91 99300 74412', source: 'Google Ads',
    owner: 'Priya Sharma', score: 81, status: 'Hot', value: 1650000, city: 'Pune',
    lastActivity: '2026-08-21T16:40:00+05:30', nextFollowUp: '2026-08-23', createdAt: '2026-08-08',
    notes: 'Requested a revised commercial with a 3-year AMC attached.',
  },
]

export const customers: Customer[] = [
  {
    id: 'CUS-101', name: 'Apex Elevators', industry: 'Infrastructure', segment: 'Enterprise',
    owner: 'Priya Sharma', health: 92, status: 'Active', revenue: 8640000, openDeals: 3,
    openDealValue: 4200000, openTickets: 2, amcValue: 1850000, amcRenewal: '2026-11-14',
    since: '2021-06-12', city: 'Mumbai', employees: 640, gstin: '27AAECA1234F1Z5',
    website: 'apexelevators.in', lastActivity: '2026-08-21T15:20:00+05:30', csat: 4.6,
    contacts: [
      { id: 'CT-1', name: 'Rohan Kapoor', role: 'Head of Facilities', email: 'rohan.kapoor@apexelevators.in', phone: '+91 98200 41120', primary: true },
      { id: 'CT-2', name: 'Sunita Iyer', role: 'Finance Controller', email: 'sunita.iyer@apexelevators.in', phone: '+91 98200 41133' },
      { id: 'CT-3', name: 'Mohit Saxena', role: 'Maintenance Supervisor', email: 'mohit.s@apexelevators.in', phone: '+91 98200 41147' },
    ],
  },
  {
    id: 'CUS-102', name: 'Urban Spaces', industry: 'Real Estate', segment: 'Enterprise',
    owner: 'Rahul Verma', health: 78, status: 'Active', revenue: 6420000, openDeals: 2,
    openDealValue: 3100000, openTickets: 4, amcValue: 1240000, amcRenewal: '2026-10-02',
    since: '2022-02-08', city: 'Bengaluru', employees: 410, gstin: '29AAFCU5678K1ZP',
    website: 'urbanspaces.co.in', lastActivity: '2026-08-21T11:05:00+05:30', csat: 4.2,
    contacts: [
      { id: 'CT-4', name: 'Neha Reddy', role: 'Project Director', email: 'neha.reddy@urbanspaces.co.in', phone: '+91 99450 88210', primary: true },
      { id: 'CT-5', name: 'Harshad Patil', role: 'Site Engineer', email: 'harshad.patil@urbanspaces.co.in', phone: '+91 98905 12034' },
    ],
  },
  {
    id: 'CUS-103', name: 'Vertex Infra', industry: 'Construction', segment: 'Enterprise',
    owner: 'Vikram Rao', health: 64, status: 'Monitor', revenue: 5180000, openDeals: 2,
    openDealValue: 3600000, openTickets: 6, amcValue: 980000, amcRenewal: '2026-09-20',
    since: '2020-11-30', city: 'Hyderabad', employees: 880, gstin: '36AACCV9012L1Z2',
    website: 'vertexinfra.com', lastActivity: '2026-08-20T17:40:00+05:30', csat: 3.8,
    contacts: [
      { id: 'CT-6', name: 'Aditya Nair', role: 'GM Operations', email: 'aditya.nair@vertexinfra.com', phone: '+91 98450 33012', primary: true },
      { id: 'CT-7', name: 'Leela Krishnan', role: 'Procurement Head', email: 'leela.k@vertexinfra.com', phone: '+91 98450 33044' },
    ],
  },
  {
    id: 'CUS-104', name: 'Metro Living', industry: 'Residential Development', segment: 'Mid-Market',
    owner: 'Anita Roy', health: 71, status: 'Active', revenue: 3960000, openDeals: 2,
    openDealValue: 1650000, openTickets: 3, amcValue: 720000, amcRenewal: '2026-12-05',
    since: '2023-01-19', city: 'Pune', employees: 220, gstin: '27AAGCM3456M1Z8',
    website: 'metroliving.in', lastActivity: '2026-08-21T16:40:00+05:30', csat: 4.0,
    contacts: [
      { id: 'CT-8', name: 'Tanya Sethi', role: 'Purchase Manager', email: 'tanya.sethi@metroliving.in', phone: '+91 99300 74412', primary: true },
      { id: 'CT-9', name: 'Sanjana Bhatt', role: 'Procurement Lead', email: 'sanjana.bhatt@metroliving.in', phone: '+91 97690 21188' },
    ],
  },
  {
    id: 'CUS-105', name: 'Prime Estates', industry: 'Real Estate', segment: 'Enterprise',
    owner: 'Priya Sharma', health: 88, status: 'Active', revenue: 7240000, openDeals: 1,
    openDealValue: 4200000, openTickets: 1, amcValue: 1560000, amcRenewal: '2027-01-22',
    since: '2021-09-03', city: 'Delhi NCR', employees: 520, gstin: '07AABCP7890N1Z1',
    website: 'primeestates.in', lastActivity: '2026-08-21T09:30:00+05:30', csat: 4.7,
    contacts: [
      { id: 'CT-10', name: 'Imran Qureshi', role: 'Director', email: 'imran.q@primeestates.in', phone: '+91 98110 45521', primary: true },
    ],
  },
  {
    id: 'CUS-106', name: 'Northstar Projects', industry: 'Infrastructure', segment: 'Mid-Market',
    owner: 'Rahul Verma', health: 74, status: 'Active', revenue: 4310000, openDeals: 1,
    openDealValue: 2900000, openTickets: 2, amcValue: 640000, amcRenewal: '2026-10-28',
    since: '2022-07-15', city: 'Gurugram', employees: 310, gstin: '06AAECN2345P1Z9',
    website: 'northstarprojects.in', lastActivity: '2026-08-21T13:10:00+05:30', csat: 4.1,
    contacts: [
      { id: 'CT-11', name: 'Ritu Malhotra', role: 'VP Projects', email: 'ritu.m@northstarprojects.in', phone: '+91 98730 77219', primary: true },
    ],
  },
  {
    id: 'CUS-107', name: 'Crescent Mall', industry: 'Retail', segment: 'Mid-Market',
    owner: 'Kiran Das', health: 58, status: 'At Risk', revenue: 2870000, openDeals: 1,
    openDealValue: 1250000, openTickets: 7, amcValue: 890000, amcRenewal: '2026-09-08',
    since: '2020-04-27', city: 'Kochi', employees: 180, gstin: '32AAHCC6789Q1Z4',
    website: 'crescentmall.in', lastActivity: '2026-08-20T14:00:00+05:30', csat: 3.4,
    contacts: [
      { id: 'CT-12', name: 'Kavya Menon', role: 'Facility Manager', email: 'kavya.menon@crescentmall.in', phone: '+91 94470 66210', primary: true },
    ],
  },
  {
    id: 'CUS-108', name: 'Skyline Group', industry: 'Hospitality', segment: 'Enterprise',
    owner: 'Vikram Rao', health: 85, status: 'Active', revenue: 6890000, openDeals: 2,
    openDealValue: 1450000, openTickets: 2, amcValue: 1420000, amcRenewal: '2026-11-30',
    since: '2019-08-21', city: 'Chennai', employees: 760, gstin: '33AABCS1122R1Z7',
    website: 'skylinegroup.in', lastActivity: '2026-08-19T12:20:00+05:30', csat: 4.5,
    contacts: [
      { id: 'CT-13', name: 'Arvind Pillai', role: 'Head — Maintenance', email: 'arvind.pillai@skylinegroup.in', phone: '+91 90040 55870', primary: true },
    ],
  },
  {
    id: 'CUS-109', name: 'BuildRight', industry: 'Construction', segment: 'SMB',
    owner: 'Sahil Khan', health: 66, status: 'Monitor', revenue: 1640000, openDeals: 1,
    openDealValue: 600000, openTickets: 1, amcValue: 280000, amcRenewal: '2026-12-19',
    since: '2024-03-11', city: 'Ahmedabad', employees: 95, gstin: '24AAFCB3344S1Z3',
    website: 'buildright.co.in', lastActivity: '2026-08-18T16:45:00+05:30', csat: 3.9,
    contacts: [
      { id: 'CT-14', name: 'Devendra Shah', role: 'CEO', email: 'd.shah@buildright.co.in', phone: '+91 99870 10045', primary: true },
    ],
  },
  {
    id: 'CUS-110', name: 'Orion Works', industry: 'Manufacturing', segment: 'SMB',
    owner: 'Anita Roy', health: 61, status: 'Monitor', revenue: 1280000, openDeals: 0,
    openDealValue: 0, openTickets: 2, amcValue: 340000, amcRenewal: '2026-10-16',
    since: '2023-10-05', city: 'Nagpur', employees: 140, gstin: '27AAJCO5566T1Z6',
    website: 'orionworks.in', lastActivity: '2026-08-12T09:50:00+05:30', csat: 3.7,
    contacts: [
      { id: 'CT-15', name: 'Pooja Deshmukh', role: 'Admin Head', email: 'pooja.d@orionworks.in', phone: '+91 98220 39917', primary: true },
    ],
  },
]

export const deals: Deal[] = [
  { id: 'DL-501', title: 'Tower A modernisation', customer: 'Apex Elevators', value: 1800000, owner: 'Priya Sharma', stage: 'Proposal', probability: 75, expectedClose: '2026-08-28', nextActivity: 'Proposal review', territory: 'West', createdAt: '2026-07-12', products: ['Gearless traction unit', 'Control panel upgrade'] },
  { id: 'DL-502', title: 'Township phase 2 — vertical transport', customer: 'Urban Spaces', value: 2400000, owner: 'Rahul Verma', stage: 'Negotiation', probability: 60, expectedClose: '2026-09-05', nextActivity: 'Commercial call with CFO', territory: 'South', createdAt: '2026-06-28', products: ['Passenger elevator ×6', '3-year AMC'] },
  { id: 'DL-503', title: 'Metro corridor escalators', customer: 'Vertex Infra', value: 3600000, owner: 'Vikram Rao', stage: 'Qualified', probability: 40, expectedClose: '2026-09-22', nextActivity: 'Site survey', territory: 'South', createdAt: '2026-07-29', products: ['Heavy-duty escalator ×4'] },
  { id: 'DL-504', title: 'Sector 42 residential package', customer: 'Metro Living', value: 1650000, owner: 'Anita Roy', stage: 'Proposal', probability: 55, expectedClose: '2026-09-11', nextActivity: 'Revised quotation', territory: 'West', createdAt: '2026-07-18', products: ['Passenger elevator ×4', 'AMC bundle'] },
  { id: 'DL-505', title: '5-tower rollout', customer: 'Prime Estates', value: 4200000, owner: 'Priya Sharma', stage: 'Negotiation', probability: 70, expectedClose: '2026-09-02', nextActivity: 'Contract redline review', territory: 'North', createdAt: '2026-06-15', products: ['Passenger elevator ×10', 'Service SLA — Platinum'] },
  { id: 'DL-506', title: 'Corporate park delivery', customer: 'Northstar Projects', value: 2900000, owner: 'Rahul Verma', stage: 'Qualified', probability: 45, expectedClose: '2026-09-30', nextActivity: 'Technical evaluation', territory: 'North', createdAt: '2026-08-07', products: ['Passenger elevator ×8'] },
  { id: 'DL-507', title: 'Atrium escalator refurbishment', customer: 'Crescent Mall', value: 1250000, owner: 'Kiran Das', stage: 'New', probability: 20, expectedClose: '2026-10-14', nextActivity: 'Discovery call', territory: 'South', createdAt: '2026-08-09', products: ['Escalator refurbishment ×2'] },
  { id: 'DL-508', title: 'Legacy unit upgrade', customer: 'Skyline Group', value: 1450000, owner: 'Vikram Rao', stage: 'Proposal', probability: 65, expectedClose: '2026-09-08', nextActivity: 'Technical walkthrough', territory: 'South', createdAt: '2026-07-22', products: ['Control panel upgrade ×3'] },
  { id: 'DL-509', title: 'Warehouse goods lift', customer: 'BuildRight', value: 600000, owner: 'Sahil Khan', stage: 'New', probability: 15, expectedClose: '2026-10-28', nextActivity: 'Requirement capture', territory: 'West', createdAt: '2026-08-18', products: ['Goods lift ×1'] },
  { id: 'DL-510', title: 'Service contract renewal — Platinum', customer: 'Apex Elevators', value: 1850000, owner: 'Priya Sharma', stage: 'Won', probability: 100, expectedClose: '2026-08-14', nextActivity: 'Kickoff scheduled', territory: 'West', createdAt: '2026-06-02', products: ['AMC — Platinum, 24 months'] },
  { id: 'DL-511', title: 'Hotel tower installation', customer: 'Skyline Group', value: 3200000, owner: 'Vikram Rao', stage: 'Won', probability: 100, expectedClose: '2026-08-06', nextActivity: 'Handover to projects', territory: 'South', createdAt: '2026-05-20', products: ['Panoramic elevator ×3'] },
  { id: 'DL-512', title: 'Mall annexe expansion', customer: 'Crescent Mall', value: 980000, owner: 'Kiran Das', stage: 'Lost', probability: 0, expectedClose: '2026-08-01', nextActivity: 'Post-mortem logged', territory: 'South', createdAt: '2026-05-11', products: ['Escalator ×1'] },
  { id: 'DL-513', title: 'Plant material handling', customer: 'Orion Works', value: 740000, owner: 'Anita Roy', stage: 'Lost', probability: 0, expectedClose: '2026-07-25', nextActivity: 'Budget deferred', territory: 'West', createdAt: '2026-05-30', products: ['Goods lift ×2'] },
  { id: 'DL-514', title: 'Retail wing AMC', customer: 'Prime Estates', value: 1560000, owner: 'Priya Sharma', stage: 'Won', probability: 100, expectedClose: '2026-07-30', nextActivity: 'Invoice raised', territory: 'North', createdAt: '2026-06-08', products: ['AMC — Gold, 36 months'] },
  { id: 'DL-515', title: 'Campus block C', customer: 'Urban Spaces', value: 1120000, owner: 'Kiran Das', stage: 'Qualified', probability: 35, expectedClose: '2026-10-06', nextActivity: 'Layout confirmation', territory: 'South', createdAt: '2026-08-12', products: ['Passenger elevator ×3'] },
  { id: 'DL-516', title: 'Annexe modernisation', customer: 'Vertex Infra', value: 1380000, owner: 'Sahil Khan', stage: 'New', probability: 20, expectedClose: '2026-10-20', nextActivity: 'Qualification call', territory: 'South', createdAt: '2026-08-19', products: ['Modernisation package'] },
]

export const quotations: Quotation[] = [
  {
    id: 'QT-3041', customer: 'Apex Elevators', contact: 'Rohan Kapoor', amount: 1800000, owner: 'Priya Sharma',
    created: '2026-08-12', validUntil: '2026-09-11', status: 'Viewed',
    terms: '40% advance, 50% on delivery, 10% on commissioning. Delivery in 10–12 weeks from PO.',
    lines: [
      { id: 'QL-1', item: 'Gearless traction machine — 1000 kg', sku: 'ELV-GT-1000', qty: 2, price: 480000, discount: 5 },
      { id: 'QL-2', item: 'Microprocessor control panel', sku: 'CTL-MP-24', qty: 2, price: 215000, discount: 5 },
      { id: 'QL-3', item: 'Installation & commissioning', sku: 'SVC-INST-01', qty: 1, price: 260000, discount: 0 },
      { id: 'QL-4', item: 'Extended warranty — 24 months', sku: 'WAR-EXT-24', qty: 1, price: 145000, discount: 10 },
    ],
  },
  {
    id: 'QT-3042', customer: 'Urban Spaces', contact: 'Neha Reddy', amount: 2400000, owner: 'Rahul Verma',
    created: '2026-08-10', validUntil: '2026-09-09', status: 'Sent',
    terms: '30% advance, 60% against delivery, 10% post handover. AMC billed annually.',
    lines: [
      { id: 'QL-5', item: 'Passenger elevator — 13 person', sku: 'ELV-PS-13', qty: 6, price: 320000, discount: 8 },
      { id: 'QL-6', item: 'AMC — Gold, 36 months', sku: 'AMC-GLD-36', qty: 1, price: 540000, discount: 5 },
    ],
  },
  {
    id: 'QT-3043', customer: 'Prime Estates', contact: 'Imran Qureshi', amount: 4200000, owner: 'Priya Sharma',
    created: '2026-08-06', validUntil: '2026-09-05', status: 'Accepted',
    terms: 'Milestone-linked billing across 5 towers. Platinum SLA with 4-hour response.',
    lines: [
      { id: 'QL-7', item: 'Passenger elevator — 16 person', sku: 'ELV-PS-16', qty: 10, price: 365000, discount: 10 },
      { id: 'QL-8', item: 'Service SLA — Platinum, 24 months', sku: 'SLA-PLT-24', qty: 1, price: 620000, discount: 0 },
    ],
  },
  {
    id: 'QT-3044', customer: 'Metro Living', contact: 'Tanya Sethi', amount: 1650000, owner: 'Anita Roy',
    created: '2026-08-14', validUntil: '2026-09-13', status: 'Draft',
    terms: 'Draft pending internal margin approval. Discount above 8% requires Sales Head sign-off.',
    lines: [
      { id: 'QL-9', item: 'Passenger elevator — 10 person', sku: 'ELV-PS-10', qty: 4, price: 285000, discount: 6 },
      { id: 'QL-10', item: 'AMC — Silver, 24 months', sku: 'AMC-SLV-24', qty: 1, price: 320000, discount: 0 },
    ],
  },
  {
    id: 'QT-3045', customer: 'Skyline Group', contact: 'Arvind Pillai', amount: 1450000, owner: 'Vikram Rao',
    created: '2026-08-08', validUntil: '2026-09-07', status: 'Viewed',
    terms: '50% advance, balance on completion. Work restricted to non-operational hours.',
    lines: [
      { id: 'QL-11', item: 'Control panel upgrade kit', sku: 'CTL-UPG-3', qty: 3, price: 340000, discount: 7 },
      { id: 'QL-12', item: 'Site labour & certification', sku: 'SVC-LBR-02', qty: 1, price: 210000, discount: 0 },
    ],
  },
  {
    id: 'QT-3046', customer: 'Crescent Mall', contact: 'Kavya Menon', amount: 1250000, owner: 'Kiran Das',
    created: '2026-07-24', validUntil: '2026-08-23', status: 'Rejected',
    terms: 'Rejected on commercials — customer requested a 15% reduction beyond approved floor.',
    lines: [
      { id: 'QL-13', item: 'Escalator refurbishment package', sku: 'ESC-REF-01', qty: 2, price: 560000, discount: 5 },
    ],
  },
  {
    id: 'QT-3047', customer: 'Northstar Projects', contact: 'Ritu Malhotra', amount: 2900000, owner: 'Rahul Verma',
    created: '2026-08-18', validUntil: '2026-09-17', status: 'Sent',
    terms: 'Phased delivery across 3 blocks. Payment against milestone certification.',
    lines: [
      { id: 'QL-14', item: 'Passenger elevator — 13 person', sku: 'ELV-PS-13', qty: 8, price: 320000, discount: 9 },
      { id: 'QL-15', item: 'Installation & commissioning', sku: 'SVC-INST-01', qty: 1, price: 420000, discount: 0 },
    ],
  },
  {
    id: 'QT-3048', customer: 'Vertex Infra', contact: 'Aditya Nair', amount: 3600000, owner: 'Vikram Rao',
    created: '2026-07-15', validUntil: '2026-08-14', status: 'Expired',
    terms: 'Validity lapsed. Requires re-pricing against current steel and component rates.',
    lines: [
      { id: 'QL-16', item: 'Heavy-duty escalator — 6 m rise', sku: 'ESC-HD-06', qty: 4, price: 820000, discount: 6 },
    ],
  },
  {
    id: 'QT-3049', customer: 'BuildRight', contact: 'Devendra Shah', amount: 600000, owner: 'Sahil Khan',
    created: '2026-08-19', validUntil: '2026-09-18', status: 'Draft',
    terms: 'Draft — awaiting site dimensions before finalising the shaft configuration.',
    lines: [{ id: 'QL-17', item: 'Goods lift — 2000 kg', sku: 'ELV-GD-2000', qty: 1, price: 600000, discount: 0 }],
  },
  {
    id: 'QT-3050', customer: 'Apex Elevators', contact: 'Sunita Iyer', amount: 1850000, owner: 'Priya Sharma',
    created: '2026-07-28', validUntil: '2026-08-27', status: 'Accepted',
    terms: 'AMC renewal — Platinum tier, 24 months, quarterly billing.',
    lines: [{ id: 'QL-18', item: 'AMC — Platinum, 24 months', sku: 'AMC-PLT-24', qty: 1, price: 1850000, discount: 0 }],
  },
]

export const GST_RATE = 18
