# TASK-023: Wooden Drawer Redesign — Closed State + 3 Boxes

**New scope, not part of the original 5-phase plan.** Read `project-docs/SOURCE_OF_TRUTH.md` for
context. **Critical scope boundary, confirmed directly with the founder: this ornate wood/leather/gold
treatment applies ONLY to the SPOKES drawer and its 3 category cards. Nothing else on the site changes
— hub tiles, spoke pages, header, footer all stay in the existing clean Navy/Gold system exactly as
they are.** This is a deliberate, contained signature element, not a brand-wide change.

**Branch:** new branch off `phase-1-foundation` (suggest `agent/antigravity-023-wooden-drawer`).

---

## OBJECTIVE

Two things change in `src/components/layout/Sidebar.tsx`:

1. **Closed state:** currently one slim "SPOKES ❯" tab. Replace with **3 separate stacked notches**,
   one per category, each already titled, each independently tappable — tapping any one opens the
   full drawer (same result regardless of which notch was tapped, since all 3 boxes show at once when
   open).
2. **Open state:** the drawer panel itself should read as an actual wooden drawer sliding open (not a
   flat rectangle), containing the 3 category cards restyled as ornate boxes: wood texture/intricate
   pattern, gold hinges, gold latches, leather straps. Confirmed directly with the founder — full
   treatment, not a toned-down version.

---

## PART A — CLOSED STATE: 3 STACKED NOTCHES

Replace the single `SheetTrigger` tab with 3 smaller stacked tabs/notches at the same screen edge,
each showing its category title (`Safety & Prevention` / `Wage & Hour` / `Lifecycle Admin` — pull
from the existing `spokeCategoryCards` array, don't hardcode a second copy of these titles). Each
notch should visually read as the edge of a wooden box protruding from the screen edge — apply the
same wood-texture treatment described in Part B, just smaller/simpler given the limited space. All 3
notches trigger the same `Sheet` open action (they don't need to scroll to a specific card — all 3
are always visible together when open, per the existing design).

---

## PART B — OPEN STATE: DRAWER + 3 WOODEN BOXES

**The drawer panel (`SheetContent`):** style the sliding panel itself to read as a real wooden drawer
— a wood-grain background/border treatment on the panel, not just a flat colored rectangle with cards
floating on it.

**Each of the 3 cards becomes a box**, styled with:
- Wood texture with an intricate pattern (carved-look grain/pattern — CSS gradients/patterns are fine,
  this doesn't need to be a photographic wood image)
- Gold hinges (decorative, positioned like real box hinges — e.g., two small gold rectangular/hardware
  shapes on one edge)
- Gold latch (a decorative closure element, positioned opposite the hinges)
- Leather strap (a strap-like decorative element, tan/brown, suggesting a real leather closure strap
  over part of the box)

**Legibility requirement — same standard as everywhere else on this site:** title, description, and
badge text on each box must stay clearly readable against the wood texture. Use a parchment/label-
colored solid area behind the text, or a contrast overlay — your call, note which in your report, same
pattern already used for the hub tile imagery work.

**Image sourcing:** prefer CSS/SVG-based textures and decorative elements (gradients, repeating
patterns, simple SVG shapes for hinges/latches/straps) over external images — more reliable to build
without depending on image generation/sourcing tools that may not be available in this environment.
If you can genuinely source real wood-texture or hardware images, that's fine too, but don't use
broken/placeholder image paths if you can't.

---

## OUT OF SCOPE — DO NOT TOUCH

- Any color, texture, or styling anywhere else on the site — hub tiles, spoke pages, header, footer,
  brand system all stay exactly as-is. This is the most important constraint on this task: contained
  to the drawer and its 3 cards only.
- The `spokeCategoryCards` data (titles, hrefs, descriptions) — visual restyle only, don't change the
  underlying content or links
- Drawer functionality (opening/closing, navigation to the 3 category hub pages) — must keep working
  exactly as it does now, this is a visual restyle, not a functional change
- Anything TASK-021 (Phase 5) or TASK-022 (banner carousel) may be working on in parallel — if you hit
  a merge conflict because either landed first, resolve by keeping both sets of changes

---

## ACCEPTANCE CRITERIA

- [ ] `pnpm build` runs clean
- [ ] Closed state shows 3 separate titled notches, not 1 tab
- [ ] Each notch opens the drawer correctly
- [ ] Open drawer panel reads visually as a wooden drawer, not a flat rectangle
- [ ] All 3 cards show wood texture, gold hinges, gold latch, leather strap
- [ ] Title/description/badge text legible on every box
- [ ] All 3 boxes still navigate correctly to their Level-2 category pages (unchanged functionality)
- [ ] Zero visual changes anywhere outside the drawer + 3 boxes
- [ ] Pushed to its own branch, not merged to `phase-1-foundation`

---

## WHEN DONE

1. Write `project-docs/reports/023_REPORT.md`
2. Append one line to `project-docs/BUILD_LOG.md`
3. Push, don't merge
4. `termux-notification --title "TASK-023 wooden drawer complete" --content "[PASS/FAIL] — [one-line summary]" --id "task-023"`
