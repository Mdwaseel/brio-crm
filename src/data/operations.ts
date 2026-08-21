import type { Ticket, Project, InventoryItem } from '@/types'

export const tickets: Ticket[] = [
  {
    id: 'TKT-1048', customer: 'Crescent Mall', subject: 'Escalator handrail stopping intermittently',
    description: 'Atrium wing escalator handrail halts while the steps continue. Reported by mall operations during peak footfall hours. Unit has been isolated as a precaution.',
    priority: 'Critical', engineer: 'Kiran Das', slaHoursLeft: 1.5, slaTotal: 8, status: 'Escalated',
    created: '2026-08-21T08:15:00+05:30', category: 'Mechanical', site: 'Crescent Mall, Kochi — Atrium Wing',
    comments: [
      { id: 'C1', author: 'Kavya Menon', text: 'This is the third occurrence this month. We need a permanent fix, not a reset.', time: '2026-08-21T08:40:00+05:30' },
      { id: 'C2', author: 'Kiran Das', text: 'Handrail drive chain tension is out of spec. Replacement chain requested from Kochi warehouse.', time: '2026-08-21T10:20:00+05:30' },
      { id: 'C3', author: 'Vikram Rao', text: 'Escalated to service head. Spare is being moved from the Chennai hub, ETA 4 hours.', time: '2026-08-21T13:05:00+05:30' },
    ],
  },
  {
    id: 'TKT-1049', customer: 'Vertex Infra', subject: 'Door sensor misalignment — Block B lift 2',
    description: 'Door reopens without obstruction. Suspected infrared curtain misalignment following the recent civil work at the landing.',
    priority: 'High', engineer: 'Sahil Khan', slaHoursLeft: 3.2, slaTotal: 12, status: 'In Progress',
    created: '2026-08-21T09:45:00+05:30', category: 'Electrical', site: 'Vertex Tower, Hyderabad — Block B',
    comments: [
      { id: 'C4', author: 'Sahil Khan', text: 'On site. Realigning the curtain and re-running the door learn cycle.', time: '2026-08-21T12:30:00+05:30' },
    ],
  },
  {
    id: 'TKT-1050', customer: 'Urban Spaces', subject: 'Unusual noise from machine room',
    description: 'Facility team reports a rhythmic knocking from the machine room during travel above the 8th floor.',
    priority: 'High', engineer: 'Anita Roy', slaHoursLeft: 5.8, slaTotal: 12, status: 'Open',
    created: '2026-08-21T11:10:00+05:30', category: 'Mechanical', site: 'Urban Heights, Bengaluru — Tower 1',
    comments: [],
  },
  {
    id: 'TKT-1051', customer: 'Apex Elevators', subject: 'AMC quarterly inspection due',
    description: 'Scheduled preventive maintenance visit for 6 units under the Platinum contract.',
    priority: 'Medium', engineer: 'Rahul Verma', slaHoursLeft: 26, slaTotal: 48, status: 'Open',
    created: '2026-08-20T16:00:00+05:30', category: 'Preventive', site: 'Apex House, Mumbai',
    comments: [],
  },
  {
    id: 'TKT-1052', customer: 'Skyline Group', subject: 'Emergency phone not connecting',
    description: 'Cabin emergency intercom fails to connect to the control room in two panoramic units.',
    priority: 'Critical', engineer: 'Kiran Das', slaHoursLeft: 2.1, slaTotal: 8, status: 'In Progress',
    created: '2026-08-21T07:30:00+05:30', category: 'Safety', site: 'Skyline Grand, Chennai',
    comments: [
      { id: 'C5', author: 'Kiran Das', text: 'GSM module firmware appears corrupted. Reflashing both units.', time: '2026-08-21T11:15:00+05:30' },
    ],
  },
  {
    id: 'TKT-1053', customer: 'Metro Living', subject: 'Levelling error at ground floor',
    description: 'Cabin stops 18 mm below floor level at the ground landing. Encoder calibration suspected.',
    priority: 'Medium', engineer: 'Sahil Khan', slaHoursLeft: 14, slaTotal: 24, status: 'Waiting',
    created: '2026-08-20T13:20:00+05:30', category: 'Mechanical', site: 'Metro Residency, Pune — Wing A',
    comments: [
      { id: 'C6', author: 'Sahil Khan', text: 'Waiting on customer for a 2-hour shutdown window to recalibrate.', time: '2026-08-20T17:00:00+05:30' },
    ],
  },
  {
    id: 'TKT-1054', customer: 'Crescent Mall', subject: 'Cabin lighting flickering',
    description: 'LED panel flicker in the service lift. Low priority, cosmetic impact only.',
    priority: 'Low', engineer: 'Anita Roy', slaHoursLeft: 44, slaTotal: 72, status: 'Open',
    created: '2026-08-19T15:45:00+05:30', category: 'Electrical', site: 'Crescent Mall, Kochi — Service Core',
    comments: [],
  },
  {
    id: 'TKT-1055', customer: 'Northstar Projects', subject: 'Overload sensor false trigger',
    description: 'Overload alarm triggers at approximately 60% rated load. Load cell recalibration required.',
    priority: 'High', engineer: 'Vikram Rao', slaHoursLeft: 6.5, slaTotal: 12, status: 'In Progress',
    created: '2026-08-21T10:05:00+05:30', category: 'Electrical', site: 'Northstar Park, Gurugram — Block 2',
    comments: [],
  },
  {
    id: 'TKT-1056', customer: 'Vertex Infra', subject: 'Quarterly safety audit findings',
    description: 'Third-party audit flagged two observations on brake test documentation. Closure evidence required.',
    priority: 'Medium', engineer: 'Rahul Verma', slaHoursLeft: 31, slaTotal: 48, status: 'Waiting',
    created: '2026-08-19T09:00:00+05:30', category: 'Compliance', site: 'Vertex Tower, Hyderabad',
    comments: [],
  },
  {
    id: 'TKT-1057', customer: 'Apex Elevators', subject: 'Card reader integration request',
    description: 'Customer requested access-control integration for the executive floor lift.',
    priority: 'Low', engineer: 'Anita Roy', slaHoursLeft: 60, slaTotal: 72, status: 'Open',
    created: '2026-08-18T14:30:00+05:30', category: 'Enhancement', site: 'Apex House, Mumbai — Executive Core',
    comments: [],
  },
  {
    id: 'TKT-1058', customer: 'Prime Estates', subject: 'Handover snag list closure',
    description: 'Six snag items pending closure from the Tower 3 handover checklist.',
    priority: 'Medium', engineer: 'Kiran Das', slaHoursLeft: 20, slaTotal: 48, status: 'In Progress',
    created: '2026-08-20T11:40:00+05:30', category: 'Installation', site: 'Prime Enclave, Delhi NCR — Tower 3',
    comments: [],
  },
  {
    id: 'TKT-1059', customer: 'Orion Works', subject: 'Goods lift gate interlock fault',
    description: 'Gate interlock intermittently reports open while physically closed.',
    priority: 'High', engineer: 'Sahil Khan', slaHoursLeft: 0.8, slaTotal: 12, status: 'Escalated',
    created: '2026-08-21T06:50:00+05:30', category: 'Safety', site: 'Orion Plant, Nagpur',
    comments: [
      { id: 'C7', author: 'Sahil Khan', text: 'Interlock contact block pitted. Replacement not available in the Nagpur bin.', time: '2026-08-21T09:30:00+05:30' },
    ],
  },
  {
    id: 'TKT-1060', customer: 'Skyline Group', subject: 'Annual load test certification',
    description: 'Statutory annual load test and certificate issuance for 8 units.',
    priority: 'Medium', engineer: 'Vikram Rao', slaHoursLeft: 38, slaTotal: 72, status: 'Open',
    created: '2026-08-19T10:15:00+05:30', category: 'Compliance', site: 'Skyline Grand, Chennai',
    comments: [],
  },
  {
    id: 'TKT-1042', customer: 'Urban Spaces', subject: 'Emergency rescue drill support',
    description: 'On-site support for the quarterly trapped-passenger rescue drill.',
    priority: 'Low', engineer: 'Anita Roy', slaHoursLeft: 0, slaTotal: 72, status: 'Resolved',
    created: '2026-08-14T09:00:00+05:30', category: 'Preventive', site: 'Urban Heights, Bengaluru',
    comments: [],
  },
  {
    id: 'TKT-1044', customer: 'Metro Living', subject: 'Door operator belt replacement',
    description: 'Worn door operator belt replaced on two units. Closed with customer sign-off.',
    priority: 'Medium', engineer: 'Kiran Das', slaHoursLeft: 0, slaTotal: 24, status: 'Resolved',
    created: '2026-08-15T12:00:00+05:30', category: 'Mechanical', site: 'Metro Residency, Pune',
    comments: [],
  },
]

export const projects: Project[] = [
  {
    id: 'PRJ-201', name: 'Metro Tower Installation', customer: 'Vertex Infra', manager: 'Vikram Rao',
    progress: 62, budget: 12800000, spent: 8420000, start: '2026-04-08', end: '2026-11-20',
    status: 'At Risk', risk: 'High', team: ['Sahil Khan', 'Kiran Das', 'Anita Roy', 'Deepak Iyer'],
    phase: 'Shaft installation',
    milestones: [
      { id: 'M1', name: 'Site readiness sign-off', due: '2026-05-02', done: true, owner: 'Vikram Rao' },
      { id: 'M2', name: 'Material delivery — batch 1', due: '2026-06-14', done: true, owner: 'Deepak Iyer' },
      { id: 'M3', name: 'Shaft installation — towers 1–2', due: '2026-08-18', done: false, owner: 'Sahil Khan' },
      { id: 'M4', name: 'Cabin fit-out', due: '2026-09-26', done: false, owner: 'Kiran Das' },
      { id: 'M5', name: 'Commissioning & handover', due: '2026-11-20', done: false, owner: 'Vikram Rao' },
    ],
    issues: [
      { id: 'I1', title: 'Civil works delayed by 12 days at tower 2', severity: 'critical', owner: 'Vikram Rao' },
      { id: 'I2', title: 'Guide rail batch pending quality clearance', severity: 'warning', owner: 'Deepak Iyer' },
    ],
  },
  {
    id: 'PRJ-202', name: 'Prime Enclave — 5 Tower Rollout', customer: 'Prime Estates', manager: 'Priya Sharma',
    progress: 38, budget: 21400000, spent: 7960000, start: '2026-06-02', end: '2027-03-15',
    status: 'On Track', risk: 'Low', team: ['Rahul Verma', 'Anita Roy', 'Nikhil Joshi'],
    phase: 'Procurement',
    milestones: [
      { id: 'M6', name: 'Contract signature', due: '2026-06-02', done: true, owner: 'Priya Sharma' },
      { id: 'M7', name: 'Design freeze', due: '2026-07-18', done: true, owner: 'Nikhil Joshi' },
      { id: 'M8', name: 'Procurement — towers 1–3', due: '2026-09-10', done: false, owner: 'Rahul Verma' },
      { id: 'M9', name: 'Installation start — tower 1', due: '2026-10-05', done: false, owner: 'Anita Roy' },
    ],
    issues: [],
  },
  {
    id: 'PRJ-203', name: 'Urban Heights Phase 2', customer: 'Urban Spaces', manager: 'Rahul Verma',
    progress: 81, budget: 9600000, spent: 7880000, start: '2026-02-16', end: '2026-09-12',
    status: 'On Track', risk: 'Low', team: ['Kiran Das', 'Sahil Khan', 'Meera Nair'],
    phase: 'Testing & commissioning',
    milestones: [
      { id: 'M10', name: 'Installation complete', due: '2026-07-30', done: true, owner: 'Kiran Das' },
      { id: 'M11', name: 'Statutory inspection', due: '2026-08-28', done: false, owner: 'Meera Nair' },
      { id: 'M12', name: 'Handover', due: '2026-09-12', done: false, owner: 'Rahul Verma' },
    ],
    issues: [{ id: 'I3', title: 'Inspection slot pending with local authority', severity: 'monitor', owner: 'Meera Nair' }],
  },
  {
    id: 'PRJ-204', name: 'Skyline Grand Panoramic Units', customer: 'Skyline Group', manager: 'Vikram Rao',
    progress: 24, budget: 15200000, spent: 3140000, start: '2026-08-06', end: '2027-02-28',
    status: 'On Track', risk: 'Medium', team: ['Anita Roy', 'Deepak Iyer'],
    phase: 'Design & approvals',
    milestones: [
      { id: 'M13', name: 'Kickoff & survey', due: '2026-08-14', done: true, owner: 'Vikram Rao' },
      { id: 'M14', name: 'Structural approval', due: '2026-09-20', done: false, owner: 'Deepak Iyer' },
    ],
    issues: [],
  },
  {
    id: 'PRJ-205', name: 'Crescent Mall Escalator Refurbishment', customer: 'Crescent Mall', manager: 'Kiran Das',
    progress: 45, budget: 4800000, spent: 2960000, start: '2026-05-20', end: '2026-08-30',
    status: 'Delayed', risk: 'High', team: ['Sahil Khan', 'Meera Nair'],
    phase: 'Mechanical rework',
    milestones: [
      { id: 'M15', name: 'Strip-down complete', due: '2026-06-28', done: true, owner: 'Sahil Khan' },
      { id: 'M16', name: 'Step chain replacement', due: '2026-07-30', done: false, owner: 'Sahil Khan' },
      { id: 'M17', name: 'Recommissioning', due: '2026-08-30', done: false, owner: 'Kiran Das' },
    ],
    issues: [
      { id: 'I4', title: 'Step chain supplier slipped by 3 weeks', severity: 'critical', owner: 'Kiran Das' },
      { id: 'I5', title: 'Weekend-only work window compressing the schedule', severity: 'warning', owner: 'Meera Nair' },
    ],
  },
  {
    id: 'PRJ-206', name: 'Metro Residency Wing A', customer: 'Metro Living', manager: 'Anita Roy',
    progress: 100, budget: 5400000, spent: 5210000, start: '2026-01-12', end: '2026-07-18',
    status: 'Completed', risk: 'Low', team: ['Kiran Das', 'Nikhil Joshi'],
    phase: 'Closed',
    milestones: [
      { id: 'M18', name: 'Installation complete', due: '2026-06-10', done: true, owner: 'Kiran Das' },
      { id: 'M19', name: 'Handover & certification', due: '2026-07-18', done: true, owner: 'Anita Roy' },
    ],
    issues: [],
  },
  {
    id: 'PRJ-207', name: 'Northstar Corporate Park', customer: 'Northstar Projects', manager: 'Rahul Verma',
    progress: 12, budget: 11800000, spent: 940000, start: '2026-08-12', end: '2027-05-30',
    status: 'On Track', risk: 'Medium', team: ['Nikhil Joshi', 'Meera Nair'],
    phase: 'Mobilisation',
    milestones: [{ id: 'M20', name: 'Site mobilisation', due: '2026-09-05', done: false, owner: 'Nikhil Joshi' }],
    issues: [],
  },
  {
    id: 'PRJ-208', name: 'Apex House Modernisation', customer: 'Apex Elevators', manager: 'Priya Sharma',
    progress: 68, budget: 7200000, spent: 4680000, start: '2026-03-24', end: '2026-10-10',
    status: 'At Risk', risk: 'Medium', team: ['Sahil Khan', 'Deepak Iyer'],
    phase: 'Control panel replacement',
    milestones: [
      { id: 'M21', name: 'Panel procurement', due: '2026-06-20', done: true, owner: 'Deepak Iyer' },
      { id: 'M22', name: 'Unit 1–3 changeover', due: '2026-08-25', done: false, owner: 'Sahil Khan' },
      { id: 'M23', name: 'Unit 4–6 changeover', due: '2026-09-28', done: false, owner: 'Sahil Khan' },
    ],
    issues: [{ id: 'I6', title: 'Engineer availability constrained by service escalations', severity: 'warning', owner: 'Priya Sharma' }],
  },
]

export const WAREHOUSES = [
  { id: 'WH-MUM', name: 'Mumbai Central Hub', city: 'Mumbai', skus: 412, value: 18600000, utilisation: 78, critical: 3 },
  { id: 'WH-BLR', name: 'Bengaluru Depot', city: 'Bengaluru', skus: 286, value: 11200000, utilisation: 64, critical: 1 },
  { id: 'WH-DEL', name: 'Delhi NCR Warehouse', city: 'Delhi NCR', skus: 341, value: 14800000, utilisation: 71, critical: 2 },
  { id: 'WH-CHN', name: 'Chennai Service Hub', city: 'Chennai', skus: 198, value: 7400000, utilisation: 52, critical: 0 },
]

export const inventory: InventoryItem[] = [
  { id: 'INV-1', part: 'Gearless traction machine — 1000 kg', sku: 'ELV-GT-1000', category: 'Drive', warehouse: 'Mumbai Central Hub', available: 14, reserved: 6, reorderPoint: 8, unitCost: 480000, status: 'Healthy', lastMovement: '2026-08-20' },
  { id: 'INV-2', part: 'Microprocessor control panel', sku: 'CTL-MP-24', category: 'Controls', warehouse: 'Mumbai Central Hub', available: 5, reserved: 4, reorderPoint: 6, unitCost: 215000, status: 'Low Stock', lastMovement: '2026-08-21' },
  { id: 'INV-3', part: 'Door operator belt — heavy duty', sku: 'DOR-BLT-HD', category: 'Doors', warehouse: 'Bengaluru Depot', available: 42, reserved: 8, reorderPoint: 20, unitCost: 4800, status: 'Healthy', lastMovement: '2026-08-19' },
  { id: 'INV-4', part: 'Handrail drive chain', sku: 'ESC-HDC-02', category: 'Escalator', warehouse: 'Chennai Service Hub', available: 1, reserved: 1, reorderPoint: 6, unitCost: 38500, status: 'Critical', lastMovement: '2026-08-21' },
  { id: 'INV-5', part: 'Infrared door curtain', sku: 'DOR-IRC-01', category: 'Doors', warehouse: 'Delhi NCR Warehouse', available: 18, reserved: 3, reorderPoint: 10, unitCost: 12400, status: 'Healthy', lastMovement: '2026-08-18' },
  { id: 'INV-6', part: 'Gate interlock contact block', sku: 'SAF-GIC-05', category: 'Safety', warehouse: 'Mumbai Central Hub', available: 2, reserved: 2, reorderPoint: 12, unitCost: 6900, status: 'Critical', lastMovement: '2026-08-21' },
  { id: 'INV-7', part: 'Guide rail — T89, 5 m', sku: 'STR-GR-T89', category: 'Structure', warehouse: 'Delhi NCR Warehouse', available: 96, reserved: 40, reorderPoint: 60, unitCost: 9800, status: 'Healthy', lastMovement: '2026-08-17' },
  { id: 'INV-8', part: 'GSM emergency intercom module', sku: 'SAF-GSM-03', category: 'Safety', warehouse: 'Chennai Service Hub', available: 7, reserved: 2, reorderPoint: 8, unitCost: 15600, status: 'Low Stock', lastMovement: '2026-08-21' },
  { id: 'INV-9', part: 'Overload load cell', sku: 'CTL-OLC-01', category: 'Controls', warehouse: 'Delhi NCR Warehouse', available: 11, reserved: 3, reorderPoint: 8, unitCost: 18900, status: 'Healthy', lastMovement: '2026-08-20' },
  { id: 'INV-10', part: 'Escalator step — stainless', sku: 'ESC-STP-SS', category: 'Escalator', warehouse: 'Bengaluru Depot', available: 24, reserved: 12, reorderPoint: 30, unitCost: 11200, status: 'Low Stock', lastMovement: '2026-08-16' },
  { id: 'INV-11', part: 'Cabin LED panel — 600×600', sku: 'CAB-LED-66', category: 'Cabin', warehouse: 'Bengaluru Depot', available: 68, reserved: 6, reorderPoint: 25, unitCost: 3400, status: 'Healthy', lastMovement: '2026-08-15' },
  { id: 'INV-12', part: 'Rope set — 8 mm ×6', sku: 'DRV-RPS-08', category: 'Drive', warehouse: 'Mumbai Central Hub', available: 9, reserved: 5, reorderPoint: 10, unitCost: 42000, status: 'Low Stock', lastMovement: '2026-08-19' },
  { id: 'INV-13', part: 'Encoder — absolute, 13-bit', sku: 'CTL-ENC-13', category: 'Controls', warehouse: 'Chennai Service Hub', available: 16, reserved: 2, reorderPoint: 10, unitCost: 22800, status: 'Healthy', lastMovement: '2026-08-14' },
  { id: 'INV-14', part: 'Brake coil assembly', sku: 'DRV-BRK-02', category: 'Drive', warehouse: 'Delhi NCR Warehouse', available: 3, reserved: 3, reorderPoint: 8, unitCost: 34500, status: 'Critical', lastMovement: '2026-08-21' },
  { id: 'INV-15', part: 'Landing door panel — SS finish', sku: 'DOR-LDP-SS', category: 'Doors', warehouse: 'Mumbai Central Hub', available: 54, reserved: 18, reorderPoint: 30, unitCost: 16800, status: 'Healthy', lastMovement: '2026-08-18' },
]

export const stockMovements = [
  { id: 'MV-1', date: '2026-08-21', sku: 'ESC-HDC-02', part: 'Handrail drive chain', type: 'Issue', qty: -2, warehouse: 'Chennai Service Hub', ref: 'TKT-1048', by: 'Kiran Das' },
  { id: 'MV-2', date: '2026-08-21', sku: 'SAF-GIC-05', part: 'Gate interlock contact block', type: 'Issue', qty: -4, warehouse: 'Mumbai Central Hub', ref: 'TKT-1059', by: 'Sahil Khan' },
  { id: 'MV-3', date: '2026-08-20', sku: 'ELV-GT-1000', part: 'Gearless traction machine', type: 'Receipt', qty: 6, warehouse: 'Mumbai Central Hub', ref: 'PO-8841', by: 'Deepak Iyer' },
  { id: 'MV-4', date: '2026-08-20', sku: 'CTL-OLC-01', part: 'Overload load cell', type: 'Transfer', qty: -3, warehouse: 'Delhi NCR Warehouse', ref: 'TR-2210', by: 'Nikhil Joshi' },
  { id: 'MV-5', date: '2026-08-19', sku: 'DRV-RPS-08', part: 'Rope set — 8 mm ×6', type: 'Reserve', qty: -5, warehouse: 'Mumbai Central Hub', ref: 'PRJ-208', by: 'Deepak Iyer' },
  { id: 'MV-6', date: '2026-08-19', sku: 'DOR-BLT-HD', part: 'Door operator belt', type: 'Issue', qty: -2, warehouse: 'Bengaluru Depot', ref: 'TKT-1044', by: 'Kiran Das' },
  { id: 'MV-7', date: '2026-08-18', sku: 'STR-GR-T89', part: 'Guide rail — T89', type: 'Receipt', qty: 40, warehouse: 'Delhi NCR Warehouse', ref: 'PO-8836', by: 'Nikhil Joshi' },
  { id: 'MV-8', date: '2026-08-17', sku: 'CAB-LED-66', part: 'Cabin LED panel', type: 'Issue', qty: -6, warehouse: 'Bengaluru Depot', ref: 'PRJ-203', by: 'Meera Nair' },
]

export const purchaseOrders = [
  { id: 'PO-8842', supplier: 'Sterling Drives Pvt Ltd', items: 3, value: 1840000, raised: '2026-08-21', expected: '2026-09-04', status: 'Pending Approval', warehouse: 'Mumbai Central Hub' },
  { id: 'PO-8841', supplier: 'Sterling Drives Pvt Ltd', items: 1, value: 2880000, raised: '2026-08-12', expected: '2026-08-20', status: 'Received', warehouse: 'Mumbai Central Hub' },
  { id: 'PO-8840', supplier: 'Precision Safety Systems', items: 5, value: 386000, raised: '2026-08-19', expected: '2026-08-27', status: 'In Transit', warehouse: 'Chennai Service Hub' },
  { id: 'PO-8839', supplier: 'NovaSteel Components', items: 2, value: 624000, raised: '2026-08-15', expected: '2026-08-29', status: 'In Transit', warehouse: 'Delhi NCR Warehouse' },
  { id: 'PO-8838', supplier: 'Elite Cabin Interiors', items: 4, value: 412000, raised: '2026-08-10', expected: '2026-08-18', status: 'Received', warehouse: 'Bengaluru Depot' },
  { id: 'PO-8837', supplier: 'Precision Safety Systems', items: 6, value: 298000, raised: '2026-08-21', expected: '2026-09-02', status: 'Draft', warehouse: 'Mumbai Central Hub' },
]
