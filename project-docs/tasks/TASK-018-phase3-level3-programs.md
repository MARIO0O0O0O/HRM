# TASK-018: Phase 3 — Level 3 Program Pages + Content Migration

**Read `project-docs/SOURCE_OF_TRUTH.md` first — Section 3 (Content Migration Map) is the primary
reference for this task.** If anything here conflicts with it, SOURCE_OF_TRUTH wins — stop and flag
the conflict in your report.

**This is the largest phase — 3 checkpoints inside one task. Commit separately after each checkpoint
(3 commits total on your branch), but don't stop for review between them — finish all 3, push, then
report.**

**Branch:** new branch off `phase-1-foundation` (suggest `agent/antigravity-p3-programs`).

---

## OBJECTIVE

Replace the 9 Level-3 placeholder pages (built in Phase 2) with real content. **Nothing existing gets
lost** — real content and working tools currently on `/programs/*` get migrated, not rewritten from
scratch. The 3 Lifecycle Admin pages have no existing source and get built fresh, carefully.

Verify current state of `/programs/wage-and-hour` before starting Checkpoint 3B — SOURCE_OF_TRUTH
notes it may already have sub-routes (`/meal-and-rest-breaks`, `/pay-transparency`,
`/overtime-misclassification`, `/wage-statements`) that make the split more direct than originally
scoped. Check first, don't assume the migration map's description is still exactly accurate.

**Content accuracy rule for all 9 pages:** this is a real compliance consultancy's client-facing site.
Do not state specific penalty dollar amounts, specific deadlines, or specific numeric thresholds
unless they already appear in the source `/programs/*` page you're migrating from, or are extremely
well-established/universally known California employment law facts (e.g., LC §201/202 final pay
timing). When in doubt, state the requirement generally rather than inventing a specific number. Flag
anything you're unsure about in your report rather than guessing.

---

## CHECKPOINT 3A — Card 1: Safety & Prevention

Migrate into the existing placeholder pages (replace placeholder content, keep the file):

- `/spokes/safety-prevention/harassment-prevention` ← migrate `/programs/harassment-prevention` in full
- `/spokes/safety-prevention/workplace-violence` ← migrate `/programs/workplace-violence-prevention`
  in full, **including the training deadline calculator and SB 553 knowledge-check quiz** — these are
  working interactive tools, must be preserved functioning, not just described in text
- `/spokes/safety-prevention/osha-iipp` ← migrate `/programs/injury-illness-prevention` in full,
  **including the 8-element self-assessment, the 6-category hazard inspection checklist, the safety
  training cycle calculator, and the Heat Illness subtopic** — all of these are working interactive
  tools/content, must be preserved functioning

Commit checkpoint 3A separately before moving to 3B.

---

## CHECKPOINT 3B — Card 2: Wage & Hour

- `/spokes/wage-hour/paystubs-wage-statements` ← migrate the Wage Statement Requirements portion of
  `/programs/wage-and-hour`, **plus fold in the Pay Transparency (SB 1162) portion** — both belong on
  this one page per the migration map
- `/spokes/wage-hour/meal-rest-breaks` ← migrate the Meal & Rest Breaks portion, **including the risk
  calculator/intake tool** if it applies to this sub-topic specifically (check — the calculator may
  cover the whole combined page; if so, either replicate the relevant inputs here or note in your
  report how you handled it)
- `/spokes/wage-hour/timekeeping-classification` ← migrate the Overtime & Misclassification portion

Commit checkpoint 3B separately before moving to 3C.

---

## CHECKPOINT 3C — Card 3: Lifecycle Admin (no existing source — build fresh, carefully)

No `/programs/*` content exists for these. Build structurally consistent pages (matching the format
of the migrated Card 1/2 pages: overview, mandates list, checklist-style content, CTA) using **only**
these well-established points — do not expand beyond them without flagging in your report:

- **`/spokes/lifecycle-admin/onboarding` (LC §2810.5):** written wage notice required at hire
  covering pay rate, payday, employer's legal name/address, workers' comp carrier. Federal Form I-9
  required for all new hires. Keep specific deadlines general unless universally standard.
- **`/spokes/lifecycle-admin/leaves` (CFRA/ADA):** CFRA provides job-protected leave for eligible
  employees at covered employers. ADA/FEHA require a good-faith interactive process for accommodation
  requests. Do not state specific week counts, hour caps, or employee-count thresholds unless you are
  certain — flag instead.
- **`/spokes/lifecycle-admin/terminations` (LC §§201-203):** final wages due immediately upon
  involuntary termination (LC §201); due within 72 hours upon employee resignation without notice
  (LC §202) — these two are safe, well-established, include them directly.

**Mark all 3 of these pages with a small, visible note** (e.g., a badge or callout) indicating content
is newly drafted and pending compliance review — distinct from the migrated Card 1/2 pages which
carry verified existing content.

---

## OUT OF SCOPE — DO NOT TOUCH

- `/programs/*` — leave live and untouched, Phase 4 removes it after this migration is confirmed good
- The 9 existing `/spokes/*` service-stub pages
- Hub tiles, top nav, brand system, global shell — all done, don't touch
- Level 2 hub pages (`/spokes/safety-prevention`, `/spokes/wage-hour`, `/spokes/lifecycle-admin`
  themselves) — only their nested Level-3 children are in scope this phase

---

## ACCEPTANCE CRITERIA

- [ ] `pnpm build` runs clean
- [ ] All 9 Level-3 pages have real content, no more "coming soon" placeholders
- [ ] Every tool/calculator/quiz from the old `/programs/*` pages is confirmed working on its new page
      (not just described — actually functional)
- [ ] No specific penalty amount, deadline, or threshold appears that isn't either sourced from the
      original `/programs/*` content or explicitly listed as safe in this task file
- [ ] The 3 Lifecycle Admin pages are visibly marked as pending compliance review
- [ ] `/programs/*` still live, untouched, unchanged
- [ ] Nothing else in "out of scope" touched
- [ ] Pushed to its own branch, not merged to `phase-1-foundation`

---

## WHEN DONE

1. Write `project-docs/reports/018_REPORT.md` — include a clear list of anything flagged for review
   (citation gaps, tool-migration judgment calls, anything you weren't sure about)
2. Append one line to `project-docs/BUILD_LOG.md`
3. Confirm branch pushed and ready for review
4. **Fire a Termux notification** — this is required for this task, not optional:
   ```
   termux-notification --title "TASK-018 Phase 3 complete" --content "[PASS/FAIL] — [one-line summary]" --id "task-018"
   ```
   If `termux-notification` isn't available, note that in your report — not a task failure, but don't
   skip attempting it.
