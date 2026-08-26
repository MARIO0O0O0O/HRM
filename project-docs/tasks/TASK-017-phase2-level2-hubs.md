# TASK-017: Phase 2 — Level 2 Category Hub Pages

**Read `project-docs/SOURCE_OF_TRUTH.md` first.** If anything here conflicts with it, SOURCE_OF_TRUTH
wins — stop and flag the conflict in your report rather than guessing.

**Note:** this repo has two parallel task-numbering conventions (`0XX_name.md` and
`TASK-0XX-name.md`). This file continues the `TASK-` convention used for the drawer/spoke rebuild
(TASK-007 → 008 → 010 → 011 → 013 → 014 → this one). It is unrelated to the `015_` / `016_` files —
do not reference or blend with those, they're a different workstream (hub tile content, bio/contact
fixes). If you're unsure which workstream a file belongs to, stop and ask rather than merging them.

**Branch:** new branch off `phase-1-foundation` (suggest `agent/antigravity-p2-hubs`, exact name not
critical as long as it's new and not pushed directly to `phase-1-foundation`).

---

## OBJECTIVE

Build out the 3 Level-2 category hub pages that currently exist as bare placeholders
(`/spokes/safety-prevention`, `/spokes/wage-hour`, `/spokes/lifecycle-admin`). Replace placeholder
content with real Level-2 hub content per SOURCE_OF_TRUTH.md Section 1. Also create 9 new Level-3
placeholder routes so this phase's program cards have somewhere real to link to.

**Scope is Level 2 structure + reasonable category-overview copy only.** Full Level-3 program content
(mandates, checklists, calculators) is Phase 3 — do not build that now.

---

## PART A — REPLACE THE 3 EXISTING PLACEHOLDER PAGES

For each of `/spokes/safety-prevention`, `/spokes/wage-hour`, `/spokes/lifecycle-admin`, build:

1. **Category law overview** — 2-4 short paragraphs. **Use only these citations, do not invent any
   others, do not state specific penalty amounts or deadlines not already listed here:**
   - Safety & Prevention: SB 1343 (Harassment Prevention), SB 553 / LC §6401.9 (Workplace Violence),
     Title 8 CCR §3203 (Cal/OSHA IIPP)
   - Wage & Hour: LC §226 (Wage Statements), SB 1162 (Pay Transparency, merged into Paystubs)
   - Lifecycle Admin: LC §2810.5 (Onboarding/Wage Notice), CFRA/ADA (Leaves), LC §§201-203
     (Termination/Final Pay)
   - If you're unsure whether a claim is accurate, keep it general ("employers must comply with...")
     rather than specific. This is a compliance consultancy's client-facing site — do not fabricate
     legal detail.

2. **Tools section** — link out to the existing relevant `/tools/*` pages (already live, do not build
   new tools):
   - Safety & Prevention → `/tools/hpp`, `/tools/wvpp`, `/tools/iipp`
   - Wage & Hour → `/tools/threshold-checker`, `/tools/compliance-quiz`
   - Lifecycle Admin → `/tools/mandatory-postings`, `/tools/job-classification`

3. **3 nested program cards per page** — real `<Link>` elements (not buttons), navigating to the
   Level-3 placeholder routes created in Part B below.

4. **Back + Home buttons.** Since Level 1 (the drawer) has no page of its own, both Back and Home
   should link to `/` (homepage) for these Level-2 pages. Don't use `router.back()` — a visitor
   arriving via direct link/bookmark has no history to go back to.

5. Drawer stays pinned and functional on these pages (should already be true from Phase 1's root
   layout — verify, don't assume).

---

## PART B — CREATE 9 LEVEL-3 PLACEHOLDER ROUTES

Nested under each Level-2 page, matching this exact structure (Phase 3 will build these out — for
now, minimal placeholders matching Phase 1's placeholder pattern: Navy/Gold, brief headline, "full
content coming in Phase 3" messaging):

- `/spokes/safety-prevention/harassment-prevention`
- `/spokes/safety-prevention/workplace-violence`
- `/spokes/safety-prevention/osha-iipp`
- `/spokes/wage-hour/paystubs-wage-statements`
- `/spokes/wage-hour/meal-rest-breaks`
- `/spokes/wage-hour/timekeeping-classification`
- `/spokes/lifecycle-admin/onboarding`
- `/spokes/lifecycle-admin/leaves`
- `/spokes/lifecycle-admin/terminations`

Each of these Level-3 placeholders should also have working Back (→ its parent Level-2 page, e.g.
`/spokes/safety-prevention/harassment-prevention`'s Back goes to `/spokes/safety-prevention`) and
Home (→ `/`) buttons, and the drawer still pinned.

---

## OUT OF SCOPE — DO NOT TOUCH

- `/programs/*` — untouched until Phase 4
- The 9 existing `/spokes/*` service-stub pages (`handbook`, `manager-support`, etc.)
- Hub tiles (`src/components/hub/HubGrid.tsx`)
- Top nav bar
- Brand system / global shell (`layout.tsx`, `Header.tsx`, `Footer.tsx`, `Sidebar.tsx`) — Phase 1 is
  done, don't modify it, only add the new page routes
- Full Level-3 content (mandates, checklists, calculators, templates) — Phase 3, not this task
- The `015_` / `016_` numbered task files or anything they describe

---

## ACCEPTANCE CRITERIA

- [ ] `pnpm build` runs clean
- [ ] All 3 Level-2 pages replace their placeholders with real content per Part A
- [ ] Each Level-2 page has exactly 3 program cards, all real `<Link>` elements
- [ ] All 9 Level-3 placeholder routes exist, don't 404, brand-consistent
- [ ] Back/Home work correctly on both Level-2 and Level-3 pages per the rules above
- [ ] Drawer still pinned and functional on every new page
- [ ] No citation, penalty amount, or legal claim appears that isn't explicitly listed in Part A(1)
      above
- [ ] Nothing in "out of scope" was touched
- [ ] Pushed to its own branch, not merged to `phase-1-foundation`

---

## WHEN DONE

1. Write `project-docs/reports/017_REPORT.md`
2. Append one line to `project-docs/BUILD_LOG.md`
3. Confirm branch pushed and ready for review
