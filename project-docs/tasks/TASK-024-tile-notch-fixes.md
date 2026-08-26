# TASK-024: Fix Notch Overlap, Restore Zero-Scroll, Minimalist Notched Tile Imagery

**Corrective task — combining a real layout bug found via visual rendering with a content-direction
change from the founder. Read `project-docs/SOURCE_OF_TRUTH.md` first.**

**Branch:** new branch off `phase-1-foundation` (suggest `agent/antigravity-024-tile-fixes`).

---

## CONTEXT: WHY THIS TASK EXISTS

The previous 3 parallel tasks (021, 022, 023) each verified clean independently, but their **combined
result was never visually rendered before merging** — only checked via HTML/build output. Rendering
the live site at 412px mobile width surfaced 2 real bugs plus a content direction change:

1. **The 3 SPOKES drawer closed-state notches overlap directly on top of the hub tile grid content**
   (visible sitting on top of "PAGA Risk Center" and the row below it). `Sidebar.tsx`'s notch
   container uses `fixed left-0 top-1/2 -translate-y-1/2` — vertically centering in the viewport made
   sense in isolation, but now collides with tile content now that the banner pushed the grid layout.
2. **The homepage no longer fits one mobile viewport without scrolling** — banner + 6 tiles is taller
   than 100dvh at 375-412px width. This breaks the site's zero-scroll principle that every prior task
   was explicitly required to preserve.
3. **Founder feedback on tile imagery** (new direction, not a bug): the current heavy dark gradient
   overlay (`bg-gradient-to-t from-[#0f1c32] via-[#0f1c32]/85 to-[#0f1c32]/60`) makes images read as
   dim/indistinct ("blurred"). Replace with: minimalist, simple imagery that clearly conveys each
   tile's topic (not busy/detailed/photorealistic), and a **notch-style title treatment** — a solid
   label area for the title, same visual language as the wooden drawer boxes — instead of text sitting
   directly on a darkened photo.

---

## PART A — FIX NOTCH/TILE OVERLAP

Reposition the 3 closed-state drawer notches so they never overlap hub tile (or any page) content.
Options, use your judgment on which renders cleanest:
- Anchor them higher, just below the header, instead of vertically centered in the viewport
- Reserve a permanent left-edge margin/gutter in the hub grid layout that the notches live in, so
  they're never layered on top of tile content
- Reduce to a lower z-index only if paired with ensuring they're still fully clickable/reachable —
  don't do this if it makes them harder to tap

Verify this by checking actual rendered positioning relative to the tile grid, not just that the code
compiles.

---

## PART B — RESTORE ZERO-SCROLL

Get the homepage (header + banner + 6 hub tiles) back to fitting a 375–412px mobile viewport without
scrolling. This may require: shorter banner height, further-reduced tile padding/spacing, smaller
tile icon/title sizing (never below 12px text), or reconsidering the banner's vertical footprint. The
"Everything On This Site, At a Glance" ticker section below the hub grid is fine to remain
scroll-accessible below the fold — it always has been — the requirement is specifically that
header + banner + hub grid together fit the first viewport.

**Verify this for real:** don't just assert it fits — calculate or test actual rendered heights at
375px and 412px widths and confirm no scroll is needed to see all 6 tiles.

---

## PART C — MINIMALIST NOTCHED TILE IMAGERY

Replace the current tile background treatment for all 6 hub tiles:

1. **Regenerate the 6 tile images** as minimalist, simple imagery — clean iconography or simple
   flat-style illustration conveying each tile's topic, not busy or photorealistic. Think: the kind of
   simple, single-focal-point image you'd see on a clean SaaS product card, not a detailed photo scene.
2. **Remove the heavy full-tile dark gradient overlay.** Instead, apply a **notch**: a solid-color
   label area (matching the tile's Navy/Gold palette — no per-tile rainbow colors) where the title
   sits, same pattern as the wooden drawer boxes' parchment-style content container. The image should
   stay visible and legible in the rest of the tile, not darkened into near-invisibility.
3. Subtitle/badge text also needs to stay legible — extend the notch to cover them too, or apply a
   lighter/smaller contrast treatment if a full notch would take up too much of a shorter tile.

---

## OUT OF SCOPE — DO NOT TOUCH

- Banner carousel logic/timing/accessibility (`BannerCarousel.tsx`, `banner-ads.ts`) — already correct,
  don't touch beyond what's needed for Part B's height adjustment
- Wooden drawer open-state box styling (`SheetContent` and the 3 box `Link` elements) — already correct
  and already confirmed by the founder, don't touch
- `spokeCategoryCards` or `hubTiles` data (titles, hrefs, descriptions) — visual fixes only
- Any `/spokes/*` page content, redirects, or anything outside `Sidebar.tsx` and `HubGrid.tsx`

---

## ACCEPTANCE CRITERIA

- [ ] `pnpm build` runs clean
- [ ] Drawer notches never visually overlap hub tile content — verify by rendering, not just code review
- [ ] Homepage (header + banner + 6 tiles) fits 375px and 412px mobile viewports with zero scroll —
      verify by rendering, not just code review
- [ ] All 6 tile images are simple/minimalist, not busy or heavily obscured
- [ ] Title (and subtitle/badge) legible via a solid notch, not a heavy full-image overlay
- [ ] Nothing in "out of scope" touched

---

## WHEN DONE

1. Write `project-docs/reports/024_REPORT.md` — **include a description of how you verified the visual
   fit/overlap, not just that the build compiled**
2. Append one line to `project-docs/BUILD_LOG.md`
3. Push, don't merge
4. `termux-notification --title "TASK-024 tile/notch fixes complete" --content "[PASS/FAIL] — [one-line summary]" --id "task-024"`

**Note for the planning instance (Claude) on merge:** re-render this visually via screenshot before
merging, same as how this bug was actually found — do not rely on HTML/build-output checks alone for
this task.
