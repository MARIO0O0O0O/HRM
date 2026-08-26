# TASK-020: Phase 4 — Consolidation & Cleanup

**Read `project-docs/SOURCE_OF_TRUTH.md` first.** This phase makes `/spokes/*` the site's only
compliance-content taxonomy. Real content was already migrated and verified in Phase 3 — this phase
retires the old routes and cleans up navigation. **Do not touch or re-migrate any content — that
work is done. This phase is redirects, deletions, and nav trimming only.**

**Structured as 4 checkpoints, commit separately, don't stop for review between them — finish all 4,
push, then report.**

**Branch:** new branch off `phase-1-foundation` (suggest `agent/antigravity-p4-cleanup`).

---

## CHECKPOINT 4A — Kill `/programs/*`, add redirects

Add permanent (301) redirects in `next.config.js` (or the project's existing redirect mechanism —
check for one before assuming `next.config.js` is unused) for every path below, then delete the
`src/app/programs/` directory entirely:

| Old path | Redirect to |
|---|---|
| `/programs` | `/` |
| `/programs/harassment-prevention` | `/spokes/safety-prevention/harassment-prevention` |
| `/programs/harassment-prevention/policy-templates` | `/spokes/safety-prevention/harassment-prevention` |
| `/programs/harassment-prevention/training` | `/spokes/safety-prevention/harassment-prevention` |
| `/programs/injury-illness-prevention` | `/spokes/safety-prevention/osha-iipp` |
| `/programs/workplace-violence-prevention` | `/spokes/safety-prevention/workplace-violence` |
| `/programs/wage-and-hour` | `/spokes/wage-hour` |
| `/programs/wage-and-hour/meal-and-rest-breaks` | `/spokes/wage-hour/meal-rest-breaks` |
| `/programs/wage-and-hour/overtime-misclassification` | `/spokes/wage-hour/timekeeping-classification` |
| `/programs/wage-and-hour/pay-transparency` | `/spokes/wage-hour/paystubs-wage-statements` |
| `/programs/wage-and-hour/wage-statements` | `/spokes/wage-hour/paystubs-wage-statements` |
| `/programs/paga-defense` | `/paga-calculator` (this one isn't part of the drawer taxonomy — it belongs to the separate PAGA hub tile system, not scope for this rebuild) |

---

## CHECKPOINT 4B — Retire old `/spokes/[slug]` stub pages, add redirects

These 9 service-marketing stub pages are driven by `src/data/spokes.ts` + `src/app/spokes/[slug]/page.tsx`
(a dynamic catch-all route). Two of them are exact-content-match retirements (redirect straight to
the new Level-3 page); the rest are generic service pitches that don't map to a specific compliance
program — redirect those to `/services` (already an existing page).

| Old path | Redirect to |
|---|---|
| `/spokes/harassment-prevention` | `/spokes/safety-prevention/harassment-prevention` |
| `/spokes/workplace-violence` | `/spokes/safety-prevention/workplace-violence` |
| `/spokes/onboarding` | `/spokes/lifecycle-admin/onboarding` |
| `/spokes/labor-law` | `/spokes/wage-hour` |
| `/spokes/handbook` | `/services` |
| `/spokes/manager-support` | `/services` |
| `/spokes/hr-support` | `/services` |
| `/spokes/compliance-audit` | `/services` |
| `/spokes/ai-services` | `/services` |

Before deleting: check `/services/page.tsx` — if it's short/thin, briefly fold in the 1-2 most useful
lines from each retired stub's "What's Included" copy (short bullet additions, not a rewrite). If
`/services` already covers this adequately, skip the fold-in and just redirect.

Once redirects are in place and confirmed working, delete `src/data/spokes.ts` and
`src/app/spokes/[slug]/` entirely — nothing should still depend on the dynamic catch-all route after
this checkpoint.

---

## CHECKPOINT 4C — Fix known bugs

1. **Duplicate title tags:** some pages under the old `/programs/*` had `<title>` tags that duplicated
   the site index title instead of their own unique title. Since those pages are being deleted in 4A,
   this specific instance goes away — but do a quick check of the 9 Level-3 and 3 Level-2 `/spokes/*`
   pages to confirm each has its own unique, correct `<title>` (not inherited/duplicated from a
   parent). Fix any found.
2. **Duplicated homepage ticker:** the homepage has an "Everything On This Site, At a Glance" section
   that currently renders the same set of ~21 cards twice in a row (a duplication bug, not two
   different sections). Find it and remove the duplicate render — either fix so it renders once, or
   remove the section entirely if it's now redundant with the drawer/hub navigation (your call, note
   which you did in your report).

---

## CHECKPOINT 4D — Trim top nav

Current top nav has ~10 flat items competing with the hub tiles and the SPOKES drawer for the same
navigation job. Trim to:
- Home
- About
- Blog
- Services
- Contact
- Client Portal
- Book a Call

Remove: "Free Tools," "Programs" (dead now), "PAGA Risk Check" — these are already reachable through
the hub tiles and the SPOKES drawer, no need for them in the top bar too.

---

## OUT OF SCOPE — DO NOT TOUCH

- Any content on the 3 Level-2 or 9 Level-3 `/spokes/*` pages — already migrated and verified, this
  phase doesn't touch page content, only routing/nav around it
- Hub tiles (`src/components/hub/HubGrid.tsx`)
- Brand system, global shell (`layout.tsx`, `Header.tsx`'s brand styling, `Footer.tsx`, `Sidebar.tsx`)
  — only touch `Header.tsx` for the specific nav-item removal in 4D, nothing else in it
- `/tools/*`, `/ai-lab`, `/paga-calculator`, `/pricing`, `/portal` and other non-`/programs`,
  non-old-`/spokes`-stub pages

---

## ACCEPTANCE CRITERIA

- [ ] `pnpm build` runs clean
- [ ] Every `/programs/*` path returns a working 301 redirect to its mapped destination, page deleted
- [ ] Every old `/spokes/[slug]` stub path returns a working 301 redirect, `src/data/spokes.ts` and
      the `[slug]` dynamic route deleted
- [ ] No page on the site has a duplicated/generic `<title>` tag
- [ ] Homepage "At a Glance" section renders once, not twice (or is removed — noted in report either way)
- [ ] Top nav trimmed to the 7 items listed in 4D
- [ ] Zero content changes on any Level-2 or Level-3 `/spokes/*` page
- [ ] Pushed to its own branch, not merged to `phase-1-foundation`

---

## WHEN DONE

1. Write `project-docs/reports/020_REPORT.md`
2. Append one line to `project-docs/BUILD_LOG.md`
3. Push, don't merge
4. `termux-notification --title "TASK-020 Phase 4 complete" --content "[PASS/FAIL] — [one-line summary]" --id "task-020"`
