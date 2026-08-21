# Brio — Business Operations Platform

A client-facing, frontend-only product prototype: **CRM + Operations + Employee Intelligence + Automation**
in a single enterprise workspace. Every screen is interactive; all data is local and static.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the production build
```

Sign in with the pre-filled demo credentials on the login screen — no backend, database or auth server
is involved.

## Deploying to Netlify

The repo is deploy-ready. `netlify.toml` holds the build command, publish directory, Node version,
cache headers, and — critically — the SPA redirect that lets deep links such as
`/customers/CUS-101` resolve instead of 404ing.

**Option A — connect the Git repo (recommended).** Push to GitHub/GitLab, then in Netlify choose
*Add new site → Import an existing project* and pick the repo. Netlify reads `netlify.toml`, so leave
the build settings untouched:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | `20` (set via `netlify.toml`) |

**Option B — CLI.**

```bash
npm run build
npx netlify-cli deploy --prod --dir=dist
```

**Option C — drag and drop.** Run `npm run build` and drop the `dist` folder onto
[app.netlify.com/drop](https://app.netlify.com/drop).

> Drag-and-drop and folder deploys never see `netlify.toml`, because it lives at the repo root
> rather than inside `dist`. That is why `public/_redirects` also exists — Vite copies it into
> `dist` on every build, so deep links keep working no matter which deploy method is used.
> Both files declare the same `/* → /index.html 200` rule, so they cannot disagree.

No environment variables are required — all data is bundled and static.

## Brand

The palette is derived directly from `brio-logo.svg`:

| Token | Value | Source |
| --- | --- | --- |
| `--brand-primary` | `#234a67` | wordmark fill (`.s0`) |
| `--brand-secondary` | `#a47d57` | mark fill (`.s1`) |

Everything else is neutral slate, white and semantic status colour (success / warning / danger / info).
Semantic colour is used **only** to carry meaning — never for decoration.

Type: **Plus Jakarta Sans** for display and headings, **Inter** for UI, data and body.

## Product philosophy

The interface is built around one chain, and it is visible throughout the app:

```
DATA → KPI → INSIGHT → RISK → RECOMMENDATION → AUTOMATION → RESULT
```

- **Data** — CRM, service, delivery, inventory and people records
- **KPI** — dashboard and per-module scorecards
- **Insight** — AI Business Brief, Management Intelligence
- **Risk** — Business Health & Alerts, improvement areas
- **Recommendation** — ranked actions with owner and projected impact
- **Automation** — WHEN / IF / THEN workflow engine
- **Result** — reports, audit trail and health movement

## Screens

| Route | Screen |
| --- | --- |
| `/login` | Brand story + sign in |
| `/dashboard` | Executive dashboard — KPIs, 6 charts, health alerts, AI brief, department scorecards |
| `/leads` | Lead register, scoring, detail drawer with timeline / tasks / notes |
| `/customers` | Account register (table + card views) |
| `/customers/:id` | **Customer 360** — 10 tabs: overview, contacts, deals, quotations, projects, tickets, AMC, invoices, activities, documents |
| `/pipeline` | Drag-and-drop Kanban across 6 stages, weighted forecast, deal drawer |
| `/quotations` | Quotation register, line items, GST maths, customer-facing preview |
| `/service` | Service dashboard, SLA timers, ticket drawer with comments and activity |
| `/projects` | Portfolio in 4 views (cards / table / kanban / timeline), milestones, issues |
| `/inventory` | Stock, warehouses, movements, purchase orders |
| `/employees` | Directory, workload distribution, **Employee 360** drawer |
| `/feedback` | Feedback Intelligence — themes, pulse, 360 matrix, anonymous, customer, insights |
| `/intelligence` | Company / department / team health, risk register, improvement areas |
| `/assistant` | Brio Intelligence — business Q&A simulation |
| `/automation` | Workflow cards (WHEN → IF → THEN) and a working visual builder |
| `/reports` | 16 reports across 8 categories, scheduled deliveries |
| `/brief` | Daily Management Brief |
| `/settings` | Workspace, locale, departments, pipelines, statuses, notifications, integrations, automation, security |
| `/settings/users` | Users, roles and a full permission matrix |
| `/settings/audit` | Immutable audit trail |

## Interaction model

Navigation, search (`⌘K` / `Ctrl+K`), filters, sorting, pagination, row selection with bulk actions,
tabs, dropdowns, modals, drawers, toggles and Kanban drag-and-drop are all functional on the frontend.
Actions that would require a backend surface a toast:

> Demo action — backend integration will be connected in production.

## Structure

```
src/
├── components/
│   ├── layout/        AppShell, Sidebar, Topbar, GlobalSearch, Logo
│   ├── ui/            Button, Field, Badge, Avatar, Card, Overlay, Layout, DataTable
│   ├── charts/        Chart tokens, tooltip and legend primitives
│   └── intelligence/  AI Business Brief, Business Health alerts
├── pages/             One file per screen
├── data/              crm · operations · people · analytics (static mock data)
├── lib/               Formatting (₹ Lakh/Crore), dates, class helpers
└── types/             Shared domain types
```

## Notes for the demo

- All figures use Indian numbering — `₹48.6L`, `₹1.82Cr`.
- Data is dated around **22 August 2026** so relative timestamps read correctly.
- The logged-in user is **Arjun Mehta, Super Admin**, with visibility of every department, employee,
  customer, pipeline, report and setting.
- Sessions are held in `sessionStorage` only, so a page refresh keeps you on the same screen.
