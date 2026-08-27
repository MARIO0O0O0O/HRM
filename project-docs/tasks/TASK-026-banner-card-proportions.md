# TASK-026: Banner/Card Proportions + Horizontal Notch Reorientation

**4th iteration on this specific area — read this carefully, previous attempts made real progress but
this corrects the notch shape/orientation and adds new sizing requirements from the founder.** Read
`project-docs/SOURCE_OF_TRUTH.md` first.

**Branch:** new branch off `phase-1-foundation` (suggest `agent/antigravity-026-proportions`).

---

## WHAT'S STILL WRONG (verified by screenshot, TASK-025's branch)

TASK-025 correctly fixed the header-overlap bug and made the notch column taller. But:
1. The notch column is still too wide/tall as a single vertical block — it now bleeds into the left
   edge of the banner section (the banner has no reserved left padding matching the notch column's
   width, so the notch cuts into the "SAFETY & PREVENTION" badge text)
2. Zero-scroll is still not achieved — full page still requires significant scrolling past the 6 tiles
3. **Founder direction, corrects the notch shape entirely:** the 3 notches should NOT be one tall
   vertical column with vertically-stacked title text. They should be **3 separate thin horizontal
   strips** (wider than tall, normal non-rotated horizontal text), stacked vertically with small gaps
   — like the protruding front edges of 3 real stacked drawers. The whole assembly should read as "a
   small thin drawer sticking out," revealing 3 horizontal notch labels — not a wide/tall block.

---

## PART A — NOTCH REORIENTATION (replaces TASK-025's vertical column approach)

Rebuild the closed-state notch assembly in `Sidebar.tsx`:
- 3 separate horizontal strips (each wider than tall — think a short wide tab, not a narrow tall one),
  one per category, each with normal horizontal (not rotated) title text
- Stacked vertically along the left screen edge, small gap between each
- The whole assembly should protrude only a **small/thin** amount into the screen — similar footprint
  to the original single-tab design, just internally divided into 3 labeled horizontal sections rather
  than one
- Each strip independently tappable, opens the full drawer (same behavior as before)
- Apply the same wood-texture/gold treatment as before, just reshaped to fit a horizontal strip instead
  of a vertical one

**Positioning — apply the fix consistently everywhere this time:** use the `--header-height` CSS
variable (or equivalent single-source-of-truth approach) from TASK-025 for the top offset. Since the
notch assembly is now much thinner/narrower, confirm it doesn't overlap the banner section either —
reserve matching left padding on the banner container the same way the tile grid already reserves it
(`pl-12 sm:pl-16` — confirmed present on the tile grid's `<main>`, confirm the banner's container has
the equivalent).

---

## PART B — BANNER AND CARD HEIGHT RATIO (new founder requirement)

- **Banner height** should increase to roughly match what **one tile row currently occupies** (the
  tile grid is `grid-rows-3` — the banner's target height ≈ the current per-row height of that grid,
  not the banner's current small `min-h-[64px] sm:min-h-[72px]`)
- **Tile card height** should reduce to roughly **half** of its current per-row height

Net effect should move the page closer to fitting one viewport, not further from it (growing the
banner by ~1 row-height while shrinking 3 rows by half each is a net reduction — verify this is true
after implementing, don't just implement and hope).

Reduce tile card internal padding/content as needed to look good at half height — icon, title,
subtitle, badge, and "Launch Module" link all need to still fit and stay legible (12px+ text, no
overlap) at the smaller size. Use your judgment on what to trim (e.g., subtitle could go to 1 line
instead of 2) but don't drop any of these 5 elements entirely.

---

## OUT OF SCOPE — DO NOT TOUCH

- Open-state wooden drawer box styling (`SheetContent`, the 3 box `Link` elements) — already correct
- Banner carousel timing/accessibility logic — resize its container, don't touch the carousel mechanics
- Tile imagery — already improved in TASK-024, keep as-is, just adjust the container it sits in
- `spokeCategoryCards` / `hubTiles` data, `/spokes/*` pages, redirects

---

## ACCEPTANCE CRITERIA

- [ ] `pnpm build` runs clean
- [ ] Notch assembly is 3 horizontal strips, not a vertical column — confirm via screenshot
- [ ] Notch assembly doesn't overlap header, banner, or tile content anywhere — confirm via screenshot
- [ ] Banner height ≈ current one-tile-row height; tile row height ≈ half of current
- [ ] All 5 tile elements (icon, title, subtitle, badge, CTA link) present and legible at the new size
- [ ] Homepage (header + banner + hub grid) fits 375px and 412px mobile viewports with zero scroll —
      **take an actual screenshot and visually confirm before writing PASS**
- [ ] Nothing in "out of scope" touched

---

## WHEN DONE

1. Write `project-docs/reports/026_REPORT.md` — describe your screenshot verification method
   specifically, same requirement as TASK-025
2. Append one line to `project-docs/BUILD_LOG.md`
3. Push, don't merge
4. `termux-notification --title "TASK-026 proportions complete" --content "[PASS/FAIL] — [one-line summary]" --id "task-026"`

**Note for the planning instance (Claude) on merge:** screenshot and visually verify personally before
merging — 4th attempt at this general area, don't skip verification regardless of report claims.
