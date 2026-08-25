# Task 015: Complete the hub, then build spoke plumbing for all remaining programs

**Sequenced in two parts, hub first — this is the top priority. Do not start Part B until Part A is
genuinely done and verified.**

## Part A: Complete the hub (highest priority)

**Real gap found during review:** the homepage has a PAGA Center tile with genuine reform education
and an embedded calculator (working, verified). It does NOT have an equivalent "AI Automation
Compliance" education tile — the only AI-automation content on the page is a single marketing line
inside the pricing section. The existing "AI Tools" section is about the AI Lab's tools (Strategic
Audit Engine, Policy Architect), which is different from what's needed here: genuine educational
content about California's AI-in-employment regulatory landscape.

Add a real "AI Automation Compliance" hub tile/section, matching the PAGA Center tile's standard:
- What's actually happening in CA AI employment regulation right now — the "No Robo Bosses" Act,
  proposed AB 1018, and the general shift toward requiring notice/disclosure when AI is used in hiring
  or employment decisions
- Framed the same way PAGA reform is framed: informational, "here's what's changing and why it
  matters," not sales copy
- Link to the AI Lab (existing tools) as "see this in action," similar to how the PAGA tile can link
  to the PAGA calculator page for more depth

**Verification for Part A:** confirm all 6 permanent hub features are genuinely present and working —
PAGA education + calculator (already confirmed), AI Automation Compliance education (new, this task),
Free Tools access, Blog, About/Contact, and the footer marquee. List each one explicitly in your report
with what you found, not just "hub looks complete."

## Part B: Spoke plumbing for all remaining programs

Only after Part A is verified. Every program from the roadmap needs to be visible in the site
structure now, even before it has real content — visitors should see the full scope of what CalBizHR
covers, not just the 4 programs built so far.

**Sidebar (`src/components/layout/Sidebar.tsx`):** replace the single generic "Coming Soon" row in
each of the 3 non-Safety categories with the actual named programs, each marked `comingSoon: true`:

- **Wage & Hour category:** Wage & Hour
- **Lifecycle Admin category:** Leave Administration, ADA / Reasonable Accommodation, Recruitment &
  Selection, Onboarding, Employment, Termination & Offboarding, Employee Benefits
- **Specialized category:** AI in the Workplace *(the legal/compliance explainer page — distinct from
  the hub's AI Automation tile from Part A, and distinct from the AI Lab tools)*, HRIS, Unions &
  Collective Bargaining

Also: **Know Your Rights is missing from the sidebar entirely** even though it's already `live: false`
on `/programs`. Add it to Safety & Prevention as `comingSoon: true` — found during this review, not
originally scoped, but a real gap.

**`/programs` index page:** add `live: false` entries for all of the above (11 new + confirm KYR is
still there), matching the exact existing pattern already used for Know Your Rights. Do not build any
new full program hub pages in this task — coming-soon placeholders only, pointing nowhere or to a
simple "notify me" placeholder consistent with the existing pattern.

## Do not do in this task

- Do not fix the WVPP/IIPP dead anchor links (Task 014, still queued, separate, lower priority than
  this per direction)
- Do not build any new spoke's actual full content — Harassment Prevention stays the only fully-built
  reference; this task is structure only

## Verification

1. `pnpm build` clean (real command, fresh install if in doubt)
2. Part A: explicit confirmation of all 6 hub features, quoted/described individually
3. Part B: confirm all 11 programs appear correctly in both the sidebar (correct category) and
   `/programs` index — list them out in the report, don't just claim "added all programs"
4. Click-test (not just build-test) at least 3 of the new coming-soon sidebar entries to confirm they
   don't error out or dead-end unpleasantly

## Report format

`project-docs/reports/015_REPORT.md` — Part A checklist (all 6 features), Part B full program list
with category placement, click-test results, `pnpm build` output. Commit, push to
`agent/antigravity-015`.
