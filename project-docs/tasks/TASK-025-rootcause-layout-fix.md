# TASK-025: Root-Cause Fix — Header Height Accounting + Tall 3-Segment Drawer Column

**Third attempt at this specific problem — TASK-024 improved tile imagery but did not fix the core
bugs (notch now overlaps the header instead of the tiles; page still scrolls). This task identifies
the actual root cause and gives an exact fix, plus a precise spec for the drawer column height from
the founder's own annotated screenshot. Read `project-docs/SOURCE_OF_TRUTH.md` first.**

**Branch:** new branch off `phase-1-foundation` (suggest `agent/antigravity-025-rootcause`).

---

## ROOT CAUSE (verified by reading the actual code, not guessing)

- `src/app/layout.tsx`: `<body>` uses `min-h-full` (grows to fit content, not locked to viewport).
  `<Header />` is `sticky top-0` — takes its own real height in the layout (currently `h-[46px]
  sm:h-[52px]` for HubGrid's *internal* second bar, plus the separate global `Header` component's own
  height on top of that).
- `src/components/hub/HubGrid.tsx`: its outer container is hardcoded to `h-[100dvh] max-h-[100dvh]
  overflow-hidden` — this claims the **entire** viewport height for itself, with no awareness that the
  global `<Header />` above it already consumed real space. Total rendered height = Header's height +
  HubGrid's full 100dvh = always taller than one screen. This is why scroll has persisted across two
  fix attempts that only adjusted padding/spacing inside HubGrid without addressing this.
- `src/components/layout/Sidebar.tsx`'s notch column uses a **hardcoded** `top-[56px] sm:top-[60px]`
  offset that only accounts for the global `Header`, not HubGrid's own internal second bar
  (`CalBizHR | Compliance Hub | phone`) rendered below it — so the notches still land on top of that
  second bar.

## THE FIX — single source of truth for header height

Set up a CSS custom property for the real, combined header height (global `Header` + HubGrid's
internal top bar, if that internal bar stays), and have every component that needs to clear the header
read from that same variable — don't hardcode pixel guesses in more than one place ever again.

**Recommended approach:** measure the actual rendered height of the header area (via a `ref` +
`useEffect`/`ResizeObserver` on the `Header` component, or simplest: combine both bars into a single
`sticky` header element with a known, controlled height) and expose it as a CSS variable (e.g.
`--header-height`) on a shared ancestor (`<html>` or `<body>`). Then:
- `HubGrid.tsx`'s hero container: change `h-[100dvh] max-h-[100dvh]` to
  `h-[calc(100dvh-var(--header-height))] max-h-[calc(100dvh-var(--header-height))]`
- `Sidebar.tsx`'s notch column: change the hardcoded `top-[56px] sm:top-[60px]` to
  `top-[var(--header-height)]`

If a dynamic ref-based measurement is too complex to get right reliably, an acceptable fallback is:
combine the two stacked header bars into one, measure its actual real height precisely via rendering
(not estimation), and hardcode that single verified value in exactly one place, then reference it
consistently — but the dynamic/CSS-variable approach is strongly preferred since it can't silently
drift out of sync the way two independent hardcoded guesses just did, twice.

---

## DRAWER COLUMN — TALLER, 3 EQUAL SEGMENTS (per founder's annotated screenshot)

The closed-state notch column should **not** be a small compact cluster. Per direct annotation: it
should span roughly the height of the first 2 tile rows (roughly 55–65% of viewport height, positioned
starting right below the header), with the 3 notches dividing that height into **3 equal segments**
stacked to fill it — like real drawer fronts on a dresser, not 3 small pills floating in the middle.

**Critical requirement to prevent this regressing a third time:** the hub tile grid's container must
reserve real left padding/margin matching the notch column's width, so tile content is structurally
guaranteed to never sit underneath it — don't rely on z-index/layering alone, reserve the actual space
in the layout.

---

## OUT OF SCOPE — DO NOT TOUCH

- Banner carousel logic/timing (`BannerCarousel.tsx`, `banner-ads.ts`)
- Wooden drawer open-state box styling (already correct, confirmed by founder)
- Tile imagery from TASK-024 (already improved, don't regenerate unless the height fix requires
  re-checking they still display correctly at the new proportions)
- `spokeCategoryCards` / `hubTiles` data, any `/spokes/*` page content, redirects

---

## ACCEPTANCE CRITERIA

- [ ] `pnpm build` runs clean
- [ ] Notch column never overlaps the header (global or HubGrid's internal bar) at any viewport width
- [ ] Notch column never overlaps tile content — verified by real left-padding reservation, not
      layering
- [ ] Notch column spans roughly 2 tile-rows tall, 3 equal segments
- [ ] Homepage (header + banner + hub grid) fits 375px and 412px mobile viewports with zero scroll —
      **take an actual screenshot and visually confirm this before writing PASS in your report**
- [ ] Nothing in "out of scope" touched

---

## WHEN DONE

1. Write `project-docs/reports/025_REPORT.md` — **describe exactly how you verified the visual fit
   this time** (screenshot tool used, viewport sizes checked). If you don't have a way to render and
   screenshot in this environment, say so explicitly rather than asserting a visual result you didn't
   actually see.
2. Append one line to `project-docs/BUILD_LOG.md`
3. Push, don't merge
4. `termux-notification --title "TASK-025 root-cause fix complete" --content "[PASS/FAIL] — [one-line summary]" --id "task-025"`

**Note for the planning instance (Claude) on merge:** this is the third attempt at this bug — screenshot
and visually verify personally before merging, do not skip this step regardless of what the report claims.
