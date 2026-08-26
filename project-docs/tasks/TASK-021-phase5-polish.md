# TASK-021: Phase 5 — Polish (Readability + Imagery)

**Read `project-docs/SOURCE_OF_TRUTH.md` first.** This is the final phase of the 5-phase rebuild.
Structure and content are done — this is a polish pass only. **Do not change any compliance content,
citations, or copy meaning — formatting/readability/visual fixes only.**

**Branch:** new branch off `phase-1-foundation` (suggest `agent/antigravity-p5-polish`).

---

## CHECKPOINT 5A — Readability

Original site audit found: sidebar/drawer copy running 9–11px, and some descriptions forced to a
single line (`line-clamp-1`) causing mid-sentence truncation. Verify current state first — some of
this may already be resolved by the Phase 1–4 rebuild since the drawer was rebuilt from scratch.
Where it still applies:

1. Minimum 12px body text anywhere compliance content is displayed (drawer, spoke pages, hub tiles)
2. Remove any `line-clamp-1` (or similar forced single-line truncation) on descriptive text — either
   let it wrap naturally or increase the line-clamp value so full sentences aren't cut mid-word
3. Spot-check the 3 Level-2 and 9 Level-3 `/spokes/*` pages, the drawer, and the hub tiles for any
   remaining instances of either problem

---

## CHECKPOINT 5B — Imagery

Original site audit found zero images anywhere — pure text + small line icons (SVGs) throughout.
Add real imagery where it clearly helps, without inventing content that isn't already established:

1. **Hero/header imagery** for the 3 Level-2 category hub pages — one relevant image or illustration
   per page (Safety & Prevention, Wage & Hour, Lifecycle Admin). Use royalty-free/stock-appropriate
   generic workplace imagery (office, safety, paperwork/admin themes matching each category) — do not
   fabricate photos of "real" people, logos, or anything implying a specific real business/person.
2. Check `public/images/` for any existing unused assets before sourcing/generating new ones.
3. Keep images decorative/supplementary — do not let them replace or obscure the actual compliance
   text content. Alt text required on every image for accessibility.
4. If there's no clean way to add real imagery without significant new infrastructure (e.g., no
   image generation/sourcing tool available in this environment), it's acceptable to skip this
   checkpoint and clearly say so in your report rather than using placeholder/broken image paths.

---

## CHECKPOINT 5C — Final QA pass

1. Full click-through: drawer open/close, all 3 Level-1 cards, all 3 Level-2 pages, all 9 Level-3
   pages, Back/Home buttons at every level — confirm nothing 404s, nothing dead-ends
2. Confirm mobile viewport (drawer closed-tab state, hub tiles, spoke pages) doesn't have obvious
   layout breaks — check at a narrow width (375px) if you have a way to verify this
3. Re-confirm brand consistency (Navy/Gold, no stray emerald/cyan/purple accents) across every page
   touched in this phase

---

## OUT OF SCOPE — DO NOT TOUCH

- Any compliance content, citations, statutory text, or copy meaning on the 12 `/spokes/*` pages
- Hub tiles content/logic (visual polish only if directly requested here — none is, so don't touch
  `HubGrid.tsx` at all)
- Brand color values themselves (Navy/Gold are correct, don't change them)
- Anything in `next.config.ts` redirects — Phase 4 is done, don't touch it

---

## ACCEPTANCE CRITERIA

- [ ] `pnpm build` runs clean
- [ ] No text below 12px on any spoke/drawer/hub-tile page
- [ ] No forced single-line truncation cutting sentences
- [ ] Imagery added where feasible with proper alt text, or explicitly skipped with reason stated
- [ ] Full click-through QA confirms zero dead ends across all 3 levels
- [ ] No compliance content/citation changed anywhere
- [ ] Pushed to its own branch, not merged to `phase-1-foundation`

---

## WHEN DONE

1. Write `project-docs/reports/021_REPORT.md`
2. Append one line to `project-docs/BUILD_LOG.md`
3. Push, don't merge
4. `termux-notification --title "TASK-021 Phase 5 complete" --content "[PASS/FAIL] — [one-line summary]" --id "task-021"`

**This is the last phase of the rebuild roadmap.** Note in your report if you think anything from the
original 5-phase plan was missed — final sanity check before this is considered done.
