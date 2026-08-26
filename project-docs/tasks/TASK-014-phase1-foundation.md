# TASK-014: Phase 1 — Foundation (Brand + Global Shell)

**This is a corrected redo of Phase 1.** A prior attempt (TASK-011/013) deviated from spec because it
was generated from a chat-pasted prompt instead of an already-committed task file. This file IS the
committed task file — execute it exactly as written. Do not reinterpret, expand, or blend it with any
other task file in this folder.

**Read `project-docs/SOURCE_OF_TRUTH.md` first.** If anything here conflicts with it, SOURCE_OF_TRUTH
wins — stop and flag the conflict in your report rather than guessing.

**Branch:** `agent/antigravity-014` off `phase-1-foundation`. Never push directly to
`phase-1-foundation`.

---

## OBJECTIVE

Rebuild the site's global shell and brand system. **Scope is shell + brand only** — no compliance
page content, no Level 2 or Level 3 pages, no hub tile changes. Those are separate, later phases.

---

## PART A — BRAND SYSTEM

Replace the current theme with:
- **Navy `#1A2D4D`** — primary dark surface/background tone
- **Gold `#B5933C`** — primary accent (CTAs, active states, highlights)
- Typography: Playfair Display (headings) · Source Sans 3 (body) · JetBrains Mono (legal citations —
  confirm the existing `font-mono` class actually loads JetBrains Mono, not a generic fallback)

**Two-color brand system only.** Do not use per-category accent colors (no emerald/cyan/purple/rose).
Differentiate the 3 drawer categories with icons/labels, not different hues. This has drifted back in
once already — hold the line on it.

Apply via root layout / global Tailwind config so it's inherited everywhere automatically.

---

## PART B — GLOBAL SHELL

Persistent root layout (Next.js App Router `layout.tsx`) — header, footer, drawer wrap every route
automatically, not implemented per-page.

### Header
Always visible, every page. Keep minimal — do not add banners, launch-date messaging, or payment
handles (Venmo/CashApp/Zelle). None of that is in scope for this task.

### Footer
Always visible, every page.

### SPOKES Drawer
- Closed: slim vertical tab, "SPOKES ❯", pinned to a screen edge, visible on every page
- Open: slides over canvas, shows 3 category cards:
  - Card 1 — Safety & Prevention
  - Card 2 — Wage & Hour
  - Card 3 — Lifecycle Admin
- Each card is a **real `<Link>`**, not a button/accordion toggle
- Drawer reachable and functional from every page

### Link destinations (placeholders — Phase 2 builds these out)
- Card 1 → `/spokes/safety-prevention`
- Card 2 → `/spokes/wage-hour`
- Card 3 → `/spokes/lifecycle-admin`

Create these 3 routes now as minimal placeholders (headline + "content coming soon") so links don't
404. Full content is Phase 2 — do not build it now.

---

## OUT OF SCOPE — DO NOT TOUCH

- `/programs/*` — untouched, migrated in Phase 3, removed in Phase 4
- The 9 existing `/spokes/*` service-stub pages
- Hub tiles (`src/components/hub/HubGrid.tsx`) — separate system, not this task
- Top nav bar restructuring — Phase 4
- Any compliance content, mandates, checklists, calculators
- Business plan docs, `vercel_env_variables.md`, anything outside the shell/brand files listed above
- **No new content of any kind that isn't explicitly listed in Part A or Part B** — no banners, no
  launch dates, no payment info, no marketing copy. If you think something's missing, note it in your
  report. Don't add it.

---

## ACCEPTANCE CRITERIA

- [ ] `pnpm build` runs clean
- [ ] Navy/Gold brand + correct typography visible site-wide
- [ ] Header + footer render on every route
- [ ] SPOKES drawer tab visible and pinned on every route
- [ ] Drawer shows exactly 3 category cards, correctly labeled, no per-category accent colors
- [ ] Each card is a real `<Link>` — confirm via URL bar changing on click, not just in-place content swap
- [ ] The 3 placeholder routes exist and don't 404
- [ ] Nothing in "out of scope" was touched
- [ ] Push to `agent/antigravity-014`, do not merge to `phase-1-foundation` yourself

---

## WHEN DONE

1. Write `project-docs/reports/014_REPORT.md`
2. Append one line to `project-docs/BUILD_LOG.md`
3. Confirm branch pushed and ready for review
4. Fire `termux-notification` per AGENTS.md
