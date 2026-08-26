# TASK-014 Specification: Phase 1 — Foundation (Brand + Global Shell)

## Base Branch
`phase-1-foundation`

## Working Branch
`agent/antigravity-p1-foundation` (create off `phase-1-foundation`, do NOT merge directly to `phase-1-foundation`)

---

## OBJECTIVE
Rebuild the site's global shell and brand system. This is Phase 1 of a 5-phase rebuild. Scope is shell + brand only — no compliance page content, no Level 2 or Level 3 pages.

---

## PART A — BRAND SYSTEM
Replace the current generic dark zinc/indigo/emerald/purple theme with:
- **Navy `#1A2D4D`** — primary dark surface/background tone
- **Gold `#B5933C`** — primary accent (CTAs, active states, highlights)
- **Typography:**
  - Headings → Playfair Display
  - Body → Source Sans 3
  - Legal citations / code-style elements (e.g., `font-mono` "Gov. Code § 12950.1" badges) → JetBrains Mono

**Design note:** Drop multi-color category-coding patterns (emerald, cyan, purple, rose). Two-color brand system only — Navy `#1A2D4D` + Gold `#B5933C`. Differentiate categories with icons/labels, not a rainbow of accent hues. Apply this brand system sitewide via root layout / global Tailwind config / fonts.

---

## PART B — GLOBAL SHELL
Build as a **persistent root layout** (`app/layout.tsx`) so header, footer, and drawer wrap every route automatically.

### Header
- Always visible on every page.
- Minimal logo/wordmark.

### Footer
- Always visible on every page.

### SPOKES Drawer
- **Closed state:** slim vertical tab, label `"SPOKES ❯"`, pinned to screen edge (left edge), visible on every page.
- **Open state:** slides smoothly over canvas, reveals 3 category cards:
  - **Card 1 — Safety & Prevention** (`/spokes/safety-prevention`)
  - **Card 2 — Wage & Hour** (`/spokes/wage-hour`)
  - **Card 3 — Lifecycle Admin** (`/spokes/lifecycle-admin`)
- Each card is a **real navigable link** (Next.js `<Link>`), navigating to its placeholder page.
- Drawer is reachable and functional from every page on the site.

### Link Destinations (Minimal Placeholder Routes)
- `/spokes/safety-prevention`
- `/spokes/wage-hour`
- `/spokes/lifecycle-admin`

---

## OUT OF SCOPE — DO NOT TOUCH
- `/programs/*` pages
- The 9 existing `/spokes/*` service-stub pages (`handbook`, `manager-support`, `onboarding`, `hr-support`, `compliance-audit`, `ai-services`, `labor-law`, `harassment-prevention`, `workplace-violence`)
- Hub tiles
- Compliance content, mandates, checklists, calculators

---

## ACCEPTANCE CRITERIA
- [ ] `pnpm build` runs clean, no errors
- [ ] Navy/Gold brand + correct typography (Playfair Display, Source Sans 3, JetBrains Mono) visible sitewide
- [ ] Header + footer render on every route
- [ ] SPOKES drawer tab is visible and pinned on every route
- [ ] Opening the drawer shows exactly 3 category cards, correctly labeled
- [ ] Each card is a real `<Link>` navigating to its placeholder route
- [ ] The 3 placeholder routes (`/spokes/safety-prevention`, `/spokes/wage-hour`, `/spokes/lifecycle-admin`) exist and don't 404
- [ ] Report written to `project-docs/reports/014_REPORT.md` and `project-docs/BUILD_LOG.md` updated
- [ ] Branch `agent/antigravity-p1-foundation` pushed to origin
