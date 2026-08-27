# CalBizHR — Source of Truth
**This file is the canonical spec. If any task file, report, or code comment conflicts with this
document, this document wins.** Update this file the moment scope changes — don't let it drift out
of sync with reality.

**For any planning agent reading this (Claude, Gemini, or otherwise):** read this file in full before
drafting any task file. Do not write application code directly — draft a task file in
`project-docs/tasks/`, commit it, then hand execution to Antigravity (or another executor agent).
See "Planning Agent Protocol" at the bottom.

---

## 1. CONFIRMED SITE ARCHITECTURE

**⚠️ SUPERSEDED 2026-08-26 — the drawer/notch system described below was removed entirely.**
Founder decision: spokes and every other major destination now live as direct tabs in the global
header instead. See Section 1A for the current architecture. Section 1's original 3-level drawer
spec is kept below for historical context only — do not build against it.

**Global shell — on every page, always:**
- Header (always visible)
- Footer (always visible)
- SPOKES drawer — pinned, works from anywhere on the site

**SPOKES drawer mechanics:**
- Closed: slim vertical tab, "SPOKES ❯", pinned to a screen edge
- Open: slides over canvas, shows 3 category cards
- Stays accessible on Level 1, 2, AND 3 — visitor can jump sideways to a different category from
  anywhere without backing out first

**3-level depth, hard stop at Level 3 (no Level 4):**

| Level | What it is | What's on it |
|---|---|---|
| 1 | Drawer card (3 total) | Real link, navigates away — never a button/accordion toggle |
| 2 | Category Hub page (3 total) | Category law info, tools, nested program cards, Back + Home |
| 3 | Program page (9 total) | Everything for that one program — mandates, checklist, templates. One comprehensive page. |

**The 3 categories → 9 programs:**
- **Card 1 — Safety & Prevention** → Harassment Prevention · Workplace Violence (SB 553) · Cal/OSHA IIPP (incl. Heat Illness)
- **Card 2 — Wage & Hour** → Paystubs & Wage Statements (LC §226, incl. Pay Transparency/SB 1162 merged in) · Meal & Rest Breaks · Timekeeping & Classification
- **Card 3 — Lifecycle Admin** → Onboarding (LC §2810.5) · Leaves (CFRA/ADA) · Terminations & Final Pay

**Known open item (not blocking current roadmap):** Know Your Rights (SB 294) doesn't fit the
3-card/9-program structure. Decision deferred — do not build it into any of the 9 slots without a
new explicit decision recorded here first.

---

## 1A. CURRENT ARCHITECTURE — header-based navigation (2026-08-26 onward)

**No drawer. No notches. Everything is a direct header tab.**

The 9 Level-3 program pages and 3 Level-2 category pages built under the old drawer plan **still
exist at the same URLs** (`/spokes/safety-prevention`, `/spokes/safety-prevention/harassment-prevention`,
etc.) — only the *entry point* changed, not the page structure or content. Level-2 pages still show
their 3 nested Level-3 program cards; Level-3 pages are still single comprehensive pages. That part
of the original spec (Section 1's table) is still accurate for page structure — just ignore every
reference to a drawer/notch as the way to reach them.

**Header nav (`src/components/layout/Header.tsx`), desktop (`lg:` and up) and mobile (hamburger,
below `lg:`) — same list, shared data source:**
- Home
- Safety & Prevention → `/spokes/safety-prevention` (direct link, not a dropdown — one click to the
  category page, which itself lists the 3 nested programs)
- Wage & Hour → `/spokes/wage-hour`
- Lifecycle Admin → `/spokes/lifecycle-admin`
- About (bio) → `/about`
- Blog → `/blog`
- Fee Schedule → `/pricing`
- Contact → `/contact`
- Client Portal → `/portal`
- Legal (grouped dropdown on desktop, labeled section in mobile menu, not 3 flat tabs) → Privacy
  Policy, Terms of Service, Accessibility
- Book a Call → `/book` — kept as its own prominent CTA button, not a plain nav link

**Known gap, not yet fixed:** `/privacy` and `/terms` still use the old pre-rebrand dark-indigo theme,
not the Navy/Gold brand system. `/accessibility` (newly created to fix a previously-broken footer
link) uses the correct current branding. Fixing `/privacy` and `/terms` to match is a reasonable
future task, not done as part of this header change.

---

## 2. BRAND SYSTEM

- **Navy `#1A2D4D`** — primary dark surface/background
- **Gold `#B5933C`** — primary accent (CTAs, active states)
- Typography: Playfair Display (headings) · Source Sans 3 (body) · JetBrains Mono (legal citations)
- **Two-color brand system only.** Do not reintroduce per-category rainbow accents (emerald/cyan/
  purple/rose, etc.) — this has happened once already and was reverted. Differentiate categories by
  icon/label, not by assigning each one its own hue.

---

## 3. CONTENT MIGRATION MAP (old → new, nothing gets lost)

| Old content | New Level-3 destination |
|---|---|
| `/programs/harassment-prevention` | Card 1 → Harassment Prevention |
| `/programs/workplace-violence-prevention` (+ training calculator, SB 553 quiz) | Card 1 → Workplace Violence (SB 553) |
| `/programs/injury-illness-prevention` (+ self-assessment, hazard checklist, training calculator, Heat Illness subtopic) | Card 1 → Cal/OSHA IIPP |
| `/programs/wage-and-hour` — Meal/Rest Breaks portion | Card 2 → Meal & Rest Breaks |
| `/programs/wage-and-hour` — Wage Statements portion | Card 2 → Paystubs & Wage Statements |
| `/programs/wage-and-hour` — Overtime & Misclassification portion | Card 2 → Timekeeping & Classification |
| `/programs/wage-and-hour` — Pay Transparency (SB 1162) portion | Card 2 → Paystubs & Wage Statements (merged in) |
| *(none exists)* | Card 3 → Onboarding §2810.5 — build fresh |
| *(none exists)* | Card 3 → Leaves (CFRA/ADA) — build fresh |
| *(none exists)* | Card 3 → Terminations & Final Pay — build fresh |

The 9 existing `/spokes/*` stub pages (Manager Support, Handbooks & Policies, AI-Powered HR
Consulting, etc. — 68–83 words each, service-marketing teasers, not compliance content) fold into
the CTA section of whichever Level-3 page they're most relevant to. They are not standalone
migration targets.

**Note (2026-08-26):** live `/programs/wage-and-hour` already has sub-routes
(`/meal-and-rest-breaks`, `/pay-transparency`, `/overtime-misclassification`, `/wage-statements`) —
migration may be simpler than originally scoped since some splitting is already done at the URL
level. Verify current state before drafting the Phase 3 task file rather than assuming this table is
still fully accurate.

---

## 4. ROADMAP — 5 PHASES

Sized for long, autonomous single-session execution — not fragmented into many small tickets.

| Phase | Scope | Milestone |
|---|---|---|
| **1 — Foundation** | Brand system + global shell (header/footer/drawer), 3 cards as real links to placeholder Level-2 routes | Any page shows correct brand + persistent shell; cards navigate somewhere |
| **2 — Level 2** | 3 category hub pages (law overview, tools, nested program cards, Back/Home) | All 3 pages live and reachable from drawer |
| **3 — Level 3** | 9 program pages, content migrated per Section 3 above (3 checkpoints: Card 1, Card 2, Card 3) | All 9 pages live with full content; every existing tool/calculator/quiz preserved |
| **4 — Cleanup** | Kill `/programs/*` (redirect old URLs), fold old `/spokes/*` stubs into CTAs, fix duplicate title-tag bug, remove duplicated homepage ticker, trim top nav | No dead pages, no duplicate content, `/spokes/*` is the only taxonomy |
| **5 — Polish** | 12px min text, remove forced truncation, real images in place of text-heavy sections | Legible text, imagery present, mobile/desktop parity |

---

## 5. CURRENT STATUS

**Phase 1: ✅ COMPLETE — merged, verified live 2026-08-26.** TASK-014.

**Phase 2: ✅ COMPLETE — merged, verified live 2026-08-26.** TASK-017.
3 Level-2 hub pages + 9 Level-3 placeholders. **Open item:** LC §226.7 / §512 citations on the
Wage & Hour page need Mario's MPA-level sign-off — added by the agent to fill a citation gap I left
in the task spec; appear accurate but unverified by a domain authority.

**Phase 3: ✅ COMPLETE — merged, verified 2026-08-26.** TASK-018 + TASK-019 hotfix.
9 Level-3 pages live: Cards 1/2 migrated with working calculators/quizzes preserved, Card 3 fresh-built
and marked pending compliance review. Build independently re-verified after hotfix (was broken on
first pass — self-report said clean, wasn't). 3 unverified dollar figures softened, citations kept,
tracked below for a real accuracy pass later.

**Phase 4: ✅ COMPLETE — merged/pushed 2026-08-26.** TASK-020.
Killed `/programs/*` (with 301 redirects), retired old `/spokes/[slug]` service stubs (with redirects),
fixed title tags & marquee duplication bugs, trimmed top nav to 7 items. 20/20 test files passed, 78/78 static pages compiled clean.

**Phase 5: ✅ COMPLETE — merged/pushed 2026-08-26.** TASK-021.
Bumped sub-12px badges/text to 12px min, removed forced single-line truncation in AI Policy Wizard, generated & integrated 3 custom hero banners for Level-2 category hubs, verified sitewide QA. 20/20 test files passed, 78/78 static pages compiled clean.

**🎉 ALL 5 ROADMAP PHASES ARE 100% COMPLETE.**

**New scope (not in original 5-phase plan):** `project-docs/tasks/TASK-022-banner-carousel.md` —
homepage banner carousel between header and hub tiles (10 placeholder ads, 5-sec auto-advance, dot
pagination), hub tiles resized shorter to preserve zero-scroll, plus full-bleed background imagery
on each of the 6 hub tiles (notch or contrast-overlay title treatment). Can run parallel to or after
Phase 5 — no file overlap with Phase 5's scope.

**New scope (not in original 5-phase plan):** `project-docs/tasks/TASK-023-wooden-drawer.md` —
SPOKES drawer redesign. Closed state becomes 3 stacked titled notches instead of 1 tab. Open state:
drawer panel + 3 category cards restyled as ornate wooden boxes (gold hinges/latch, leather strap).
**Explicitly scoped to the drawer only** — confirmed with founder this doesn't extend to the rest of
the site's Navy/Gold brand system. No file overlap with Phase 5 or TASK-022.

**Housekeeping note (not blocking):** this repo has two parallel task-numbering conventions —
`0XX_descriptive_name.md` (pre-existing, covers hub tile content / bio / contact / payment fixes,
unrelated to this rebuild) and `TASK-0XX-descriptive-name.md` (this rebuild's convention, used since
TASK-007). Reconcile/consolidate at some point — not urgent, just don't let a planning agent confuse
the two queues.

---

## 6. PLANNING AGENT PROTOCOL

Applies to any planning/architect agent working this project — Claude, Gemini, or otherwise.

1. **Read this file first**, every session, before doing anything else.
2. **You plan and draft — you do not write application code.** Draft a task file, commit it to
   `project-docs/tasks/` with the next sequential `TASK-0XX-descriptive-name.md` number, then hand
   off to an executor agent (Antigravity, currently).
3. **Never hand an executor a prompt without a committed task file behind it.** This is the exact
   failure this document exists to prevent.
4. **Update this file** the moment scope, architecture, or phase status changes. Stale source-of-truth
   is worse than no source-of-truth.
5. **Task files live at `project-docs/tasks/`, reports at `project-docs/reports/`, running log at
   `project-docs/BUILD_LOG.md` (append-only).**
6. **Branch discipline:** executor branches are `agent/[tool]-[task-number]`, off `phase-1-foundation`,
   never pushed directly to `phase-1-foundation`. The planning agent reviews and merges.
7. **If you're Gemini picking this up because Claude ran out of usage:** everything you need is in
   this file plus the current task file in `project-docs/tasks/`. Read both before writing anything.
   Don't assume context from a conversation you weren't part of — this document is written to not
   require that.
