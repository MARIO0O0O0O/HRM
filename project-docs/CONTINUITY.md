# CONTINUITY.md — Backup Planning Brain Handoff

**Read this entire file before doing anything.** You are stepping into the PLANNING/ARCHITECT
role for CalBizHR's website project because the primary planner (Claude) has hit a usage limit.
This is not a coding-agent role — Antigravity remains the executor ("the hands"). Your job is
the same as the primary planner's: review Antigravity's output, write task files, catch gaps,
verify before merging, maintain discipline. Do not skip the non-negotiables in Section 2 just
because you're a different model — they exist because of real failures earlier in this project,
not stylistic preference.

---

## 1. REPO ACCESS

- Repo: `MARIO0O0O0O/HRM`
- Working branch: `phase-1-foundation` (this is what's deployed to calbizhr.com via Vercel git
  integration — every merge to this branch goes live)
- Founder will provide you a GitHub PAT directly. Do not ask for it to be pasted into a shared
  document — request it through whatever secure channel your platform supports.
- Second, separate repo: `MARIO0O0O0O/bizhr-compliance-corpus` — this is the RAW MATERIAL repo
  (legal research, client deliverable examples, staging content). It is never deployed. Content
  flows one direction: corpus → curated → written into HRM as real page copy. See Section 5.

---

## 2. NON-NEGOTIABLE OPERATING RULES

These exist because each one was learned the hard way earlier in this project. Do not relax them.

1. **Antigravity never acts on a bare chat-pasted prompt.** It only executes a COMMITTED task
   file at `project-docs/tasks/TASK-0XX-name.md`. If the founder pastes something conversational
   asking for a build, your job is to turn it into a proper task file first, commit it, THEN give
   the dispatch message. Never skip straight to execution.

2. **Build verification is `pnpm install --frozen-lockfile && pnpm build`** — never a bare
   `next build` and never `vitest run` alone. `pnpm build` runs ESLint as part of the process and
   catches unused-import errors that narrower checks miss. This has caused real shipped bugs
   twice before this rule was locked in.

3. **Any visual or layout change must be verified with an actual rendered screenshot before
   merging** — at minimum 412x892 (mobile) and 1440x900 (desktop). Use Playwright or equivalent.
   Reading the HTML/JSX or trusting a clean build is NOT sufficient — this project has shipped
   multiple layout bugs that a clean build didn't catch (elements rendering correctly in markup
   but overlapping/misaligned visually). If your tooling can't render a real screenshot, say so
   explicitly and ask the founder to eyeball it before you merge — do not merge blind.

4. **Never state a California compliance figure — dollar penalty, deadline, statutory threshold,
   headcount trigger — with confidence unless you have independently verified it** against a
   primary source (California Civil Rights Department calcivilrights.ca.gov, DIR dir.ca.gov,
   Cal/OSHA, or the actual bill text on leginfo.legislature.ca.gov). Do not trust a prior agent's
   self-reported "research log" as verification — treat it as a claim to check, not a fact. This
   is the single most important discipline on this project; getting it wrong creates real
   liability for a live consulting business.

5. **Session startup protocol**: pull the repo, then read `project-docs/BUILD_LOG.md` FIRST — it
   is the append-only ground truth for current state. Then read `project-docs/SOURCE_OF_TRUTH.md`
   (canonical architecture spec) and `project-docs/AGENTS.md` (executor standing rules). Do this
   before forming any opinion about what to do next.

6. **You (the planner) do not write application code directly**, except small, well-scoped
   surgical fixes on top of something Antigravity already built (e.g. a missing feature caught
   during verification). Anything larger goes through a committed task file and Antigravity.

---

## 3. BRAND SYSTEM

- Colors: Navy `#1A2D4D` (primary), Gold `#B5933C` (accent) — two-color system, no per-category
  rainbow accents on global chrome. Individual compliance-area cards (see TASK-028) are the one
  deliberate exception — each gets its own accent, but via a thin border/icon tint, not a full
  colored background, so the site brand still reads through.
- Typography: Playfair Display (headings), Source Sans 3 (body), JetBrains Mono (legal citations,
  and also the founder's email address — JetBrains Mono renders zero with a dot through it,
  disambiguating from letter O, which is why it's used for `INFO@MARIO00.COM`).
- Tagline: "AI-Powered Compliance. HR Verified."

---

## 4. CURRENT STATE (as of this handoff)

Merged and live: TASK-014 through TASK-027. TASK-027 (global shell overhaul — header, hamburger,
footer, `/support` page, `/library` placeholder) just landed. Committed but NOT yet dispatched to
Antigravity: TASK-028 (landing page compliance area cards) and TASK-029 (fee schedule framework).

**TASK-028 depends on TASK-027 having landed — it has, so TASK-028 is safe to dispatch now.**

Dispatch pattern (paste to Antigravity):
```
Execute project-docs/tasks/TASK-0XX-name.md exactly as written.
Read AGENTS.md and SOURCE_OF_TRUTH.md first. Do not modify scope.
```

---

## 5. THE BIGGER PICTURE (so your decisions make sense in context)

Founder's long-term goal: a structured SQL database of California employment law, organized by
compliance area, letting CalBizHR deliver services "at the speed of large HR teams with the
precision of law firms." Short-term goal: a working website generating leads now. These meet in
the 8-compliance-area build sequence, prioritized near-ready-first then highest-demand:

1. Harassment Prevention (SB 1343) — in progress, one known gap (see Section 6)
2. Onboarding & Know Your Rights (LC §2810.5 + SB 294) — partially verified
3. Meal & Rest Period Compliance — not yet started
4. PAGA Compliance — has an existing calculator tool, not yet audited
5. Wage Statements & Pay Transparency — not yet started
6. Exempt Salary & Classification — the $70,304/yr 2026 threshold IS verified accurate
7. Workplace Violence Prevention (SB 553) — not yet started
8. AI Automation Compliance — has an existing hub tile, not yet audited

Each compliance area, when built, should draw from `bizhr-compliance-corpus/01_COMPLIANCE_MODULES/`
(the curated MOD-numbered library — the trustworthy source) and
`09_FROM_BIZHR_REORG/` (20 already-genericized templates, safe for public downloads). Do NOT pull
directly from `04_CLIENT_DELIVERABLE_EXAMPLES/ButtonNoseGrooming/` without genericizing first — it
contains a real client's identifying information. Do NOT pull from `03_STAGING_RAW/` at all — it's
an uncurated dump, not a source of truth.

Pricing strategy (for context on TASK-029): launch at ~20% below market rate, step up quarterly
until market rate is reached, then jump to 25% above market once the SQL database is live
(justified by faster/higher-value delivery), then adjust every 6 months by CPI. The public fee
schedule page should NOT reveal this internal strategy — no "25% above market" language, no "SQL
database" mention on that page.

---

## 6. KNOWN OPEN ITEMS — DO NOT ASSUME THESE ARE RESOLVED

- **2 CCR §11024 record retention precision check, still open.** A prior research pass found the
  clean "2 years" retention window applies specifically to e-learning/webinar Q&A logs, not as a
  blanket rule for all harassment-prevention training documentation. The 4-year complaint-file
  retention claim (Gov. Code §12946) has not been independently verified either. Do not publish
  final Harassment Prevention spoke copy with retention-period claims until this is closed.
- **`/portal` route returns HTTP 500.** Confirmed pre-existing (reproduced on a commit from before
  TASK-027), not a regression. It's unlinked from all nav now, so low urgency, but still broken if
  anyone hits the URL directly.
- **Dual task-numbering convention** (`0XX_` prefix vs `TASK-0XX-` prefix) exists in the repo's
  history — harmless, just don't be confused by it. Current convention going forward is `TASK-0XX-`.

---

## 7. SAFE-TO-DELEGATE WORK (lower precision risk — a backup brain can move on these with lighter
verification than the rules in Section 2 would otherwise demand, since none of it touches
unverified legal content)

- **TASK-028** (landing page compliance cards) — fully speced already, pure UI/structure, no legal
  claims in the task file itself. Dispatch as-is.
- **TASK-029** (fee schedule framework) — structural only, explicitly contains zero dollar figures
  by design. Dispatch as-is.
- General UI polish, bug fixes, accessibility improvements that don't touch compliance page copy.
- Further inventory/organization work inside `bizhr-compliance-corpus` (cataloging, not verifying
  legal accuracy) — useful groundwork, low risk if imperfect.

## 8. HOLD FOR THE PRIMARY PLANNER'S RETURN (or apply full Section 2 rigor if you must proceed)

- Anything that finalizes actual Harassment Prevention spoke content — the retention-period gap
  is still open and this content ships to a live compliance consultancy's customers.
- Any NEW legal citation, penalty figure, or compliance deadline anywhere on the site.
- Major architectural or navigation pivots — this project has reversed itself on nav structure
  multiple times already; a mid-course change from an unfamiliar planner risks another reversal.
