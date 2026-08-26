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

**Phase 4: IN PROGRESS (started 2026-08-26)**
Task committed: `project-docs/tasks/TASK-020-phase4-cleanup.md`. Kills `/programs/*` (with redirects),
retires the 9 old `/spokes/[slug]` service stubs (with redirects, 2 map directly to new Level-3
pages, rest fold into `/services`), fixes title-tag/ticker-duplication bugs, trims top nav to 7 items.

**Phase 5:** Not started.

**Phases 4–5:** Not started.

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
