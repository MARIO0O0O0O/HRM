# TASK-022: Homepage Banner Carousel + Hub Card Resize

**New feature, not part of the original 5-phase rebuild roadmap — read `project-docs/SOURCE_OF_TRUTH.md`
for context on the existing site architecture, but this task stands on its own.** Can run before or
after Phase 5 reports done — no file overlap with Phase 5's scope.

**Branch:** new branch off `phase-1-foundation` (suggest `agent/antigravity-022-banner`).

---

## OBJECTIVE

Add an auto-advancing banner carousel to the homepage, positioned between the header and the hub tile
grid. Resize the hub tiles shorter to make room for it, while preserving the site's existing
zero-scroll principle — the whole homepage (header + banner + hub grid) must still fit in one mobile
viewport without scrolling, same as it does today without the banner.

**Homepage only.** This does not appear on `/spokes/*`, `/tools/*`, or any other page.

---

## PART A — BANNER CAROUSEL

**Behavior:**
- 10 ad slots, one visible at a time
- Auto-advances every 5 seconds
- Loops from ad 10 back to ad 1 continuously
- Pagination dots, bottom-left of the banner: 10 dots, current position visibly highlighted/filled
- Clicking a dot jumps directly to that ad and resets the 5-second timer
- Each ad is a real, clickable `<Link>` to a specific page (not a div with an onClick) — every ad
  links somewhere real, listed in Part B
- **Accessibility — match the existing pattern in `src/components/layout/ToolMarquee.tsx`:** pause
  auto-advance on hover/focus, fully respect `prefers-reduced-motion` (if reduced motion is on, don't
  auto-advance — show the first ad statically, or let the dots be the only way to navigate), every ad
  and dot keyboard-focusable and reachable via keyboard navigation

**Placement:** render at the top of `src/components/hub/HubGrid.tsx`, before the tile grid itself —
`HubGrid` is what actually renders on the homepage (confirmed: `src/app/page.tsx` renders only
`<HubGrid />`, with `Header`/`Footer`/drawer coming from the root layout around it), so this keeps the
banner correctly scoped to homepage-only without touching the global layout.

**New files to create:**
- `src/data/banner-ads.ts` — data array, one object per ad: `{ id, title, subtitle, href }` (add an
  `imageUrl` field too, optional/nullable, for when real creative gets swapped in later — leave null
  for now, don't fabricate image paths that don't exist)
- `src/components/hub/BannerCarousel.tsx` — the carousel component itself

---

## PART B — PLACEHOLDER AD CONTENT (10 slots, swap-ready)

Use these exact 10, linking to real existing pages so nothing dead-ends. Keep each ad's visible text
short (title + one-line subtitle, this is a small banner, not a full card):

1. Harassment Prevention Program → `/spokes/safety-prevention/harassment-prevention`
2. Workplace Violence Prevention (SB 553) → `/spokes/safety-prevention/workplace-violence`
3. Cal/OSHA IIPP & Heat Illness → `/spokes/safety-prevention/osha-iipp`
4. Wage Statement Compliance (LC §226) → `/spokes/wage-hour/paystubs-wage-statements`
5. Meal & Rest Break Compliance → `/spokes/wage-hour/meal-rest-breaks`
6. Employee Classification Check → `/spokes/wage-hour/timekeeping-classification`
7. Onboarding Compliance (LC §2810.5) → `/spokes/lifecycle-admin/onboarding`
8. Leave Management (CFRA/ADA) → `/spokes/lifecycle-admin/leaves`
9. Free PAGA Risk Calculator → `/paga-calculator`
10. Book a Free Consultation → `/book`

Confirm `/book` exists as a real route before using it — if it doesn't, use `/contact` instead and
note the substitution in your report.

---

## PART C — RESIZE HUB TILES

Reduce the hub tile card heights in `HubGrid.tsx` enough to make room for the banner above them,
while keeping all 6 tiles + the banner + the header fitting in a single mobile viewport without
scrolling (this is the site's existing zero-scroll design principle — don't break it). This will
likely mean: smaller padding/vertical spacing per tile, possibly smaller icon/title sizing — use
judgment, but the content in each tile (title, subtitle, badge) must stay legible, don't shrink text
below 12px to make this fit.

Verify at a narrow mobile width (375px) specifically — that's the tightest constraint.

---

## OUT OF SCOPE — DO NOT TOUCH

- The 6 hub tiles' actual content/modals (`HubModal.tsx`, `PagaNestedPortalModal.tsx`, etc.) — sizing
  only, not content
- `/spokes/*` pages, drawer, footer, brand system, `next.config.ts` redirects
- Anything from Phase 5 if it's running in parallel — if you hit a merge conflict because Phase 5
  landed first, resolve by keeping both changes, don't drop either

---

## ACCEPTANCE CRITERIA

- [ ] `pnpm build` runs clean
- [ ] Banner renders on homepage only, between header and hub tiles
- [ ] 10 ads, 5-second auto-advance, loops correctly, dots at bottom-left match count/position
- [ ] Every ad and dot is keyboard-navigable; hover/focus pauses auto-advance;
      `prefers-reduced-motion` respected
- [ ] Every ad links to a real, working page — confirm none 404
- [ ] Homepage (header + banner + hub grid) still fits a 375px mobile viewport without scrolling
- [ ] No hub tile text below 12px
- [ ] Nothing in "out of scope" touched

---

## WHEN DONE

1. Write `project-docs/reports/022_REPORT.md`
2. Append one line to `project-docs/BUILD_LOG.md`
3. Push, don't merge
4. `termux-notification --title "TASK-022 banner carousel complete" --content "[PASS/FAIL] — [one-line summary]" --id "task-022"`
