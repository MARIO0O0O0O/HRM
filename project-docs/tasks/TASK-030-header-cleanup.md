# TASK-030: Replace Redundant Utility Bar with Always-On Nav Buttons

**Status:** READY FOR EXECUTION
**Read first:** `AGENTS.md`, `SOURCE_OF_TRUTH.md`

---

## 1. THE PROBLEM (confirmed by reading the actual code, not guessing)

`src/components/layout/Header.tsx` renders two stacked bars, globally, on every page
(Header is imported in the root `src/app/layout.tsx`):

- **BAR 1** (lines 58-208): logo, tagline, hamburger menu. Keep as-is, not in scope.
- **BAR 2** (lines 210-252, comment reads `{/* BAR 2: Thin Utility Strip */}`): phone
  number, email, Donate link, Book a Call button.

On hub-type pages specifically (`src/components/hub/HubGrid.tsx`, "Top Hub Bar",
lines 200-225), a THIRD bar renders directly below Bar 2 — and it renders the SAME
phone number again (line 218-223: `href="tel:6267082220"`). Three stacked bars before
any real content, with the phone number appearing twice within a few dozen pixels of
each other. Confirmed visually in the founder's own annotated screenshot.

## 2. THE FIX

Replace Bar 2's content entirely. Remove phone, email, Donate link, and Book a Call
button from this bar (all three already live elsewhere — phone/email in the hamburger
menu's Contact page and the footer, Donate in the hamburger menu, Book a Call as a
persistent button inside the hamburger sheet on mobile and reachable via `/book`).

In their place, render four always-visible direct-link buttons:

| Label | Route | Icon suggestion (already imported in Header.tsx) |
|---|---|---|
| Blog | `/blog` | `Newspaper` |
| Resource Library | `/library` | `Folder` |
| Bio | `/about` | `User` |
| Fee Schedule | `/pricing` | `Receipt` |

All four routes already exist — confirmed (`/about`, `/library`, `/blog`, `/pricing`
are all present in the repo and already referenced in `mainNavItems`).

## 3. DESIGN CONSTRAINTS

- Keep this a single thin strip, matching Bar 2's current height/weight
  (`py-1.5`, `text-xs`) — this should not become a second full-height nav bar.
- Keep it responsive: on narrow mobile widths, wrap or truncate gracefully rather than
  overflowing. Test at 412px specifically, since that's this project's standard mobile
  breakpoint.
- Match existing color/hover treatment from the current Bar 2 links
  (`text-zinc-300 hover:text-[#B5933C]`) for visual consistency — don't invent a new
  palette for this bar.
- "Bio" is intentionally the label even though the route is `/about` — that's the
  founder's stated preference, not a mismatch to "fix."

## 4. WHAT NOT TO TOUCH

- Bar 1 (logo/tagline/hamburger) — out of scope.
- The Hub Bar in `HubGrid.tsx` — its own phone link stays as-is; it's a hub-specific
  element, not part of this global header, and removing the *global* bar's duplicate
  phone number resolves the redundancy without needing to touch hub-page code at all.
- The hamburger menu itself and its existing nav items — no changes needed there.

## 5. VERIFICATION BEFORE MERGE (Claude will check this independently)

- Playwright screenshots at 412×892 and 1440×900, homepage and at least one spoke page,
  confirming: only one phone number visible near the top of the page (from the Hub Bar,
  not duplicated), four new buttons visible and functional, `pnpm build` clean.

## 6. WHEN DONE

Commit to `agent/<your-name>-task-030`, do not merge your own branch, report completion
and stop.
