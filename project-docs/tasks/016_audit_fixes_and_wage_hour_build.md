# Task 016: Bio/contact fixes, real verification pass, blog content, Wage & Hour spoke

**Sequenced: Part A (quick fixes + verification) first, Part B (Wage & Hour build) second, same
session, commit separately.**

## Part A1: Bio — no change needed

Confirmed with the founder: the "homelessness" reference in `src/app/about/page.tsx` is about the
founder's parents' history, correctly identified during review, and the founder wants it kept exactly
as written. **Do not edit this paragraph.** Skip this part entirely — noted here only so it's not
mistaken for an oversight.

## Part A2: Update contact info everywhere — including Zelle (correction: same number now)

Confirmed with the founder: `626-708-2220` is both the new general contact number *and* the actual
Zelle number — `626-999-6239` was wrong/outdated in both contexts. Replace `626-999-6239` with
`626-708-2220` **everywhere it appears**, including payment-specific instances:
- `src/app/contact/page.tsx`
- `src/app/about/page.tsx`
- `src/app/terms/page.tsx`
- `src/app/privacy/page.tsx`
- `src/app/layout.tsx` (JSON-LD `telephone` field)
- `src/components/payments/PaymentOptions.tsx` (Zelle handle)
- `src/app/pricing/page.tsx` (Zelle mention)
- `src/app/tools/[slug]/ToolDetailClient.tsx` (Zelle mention)

Also add `info@mario00.com` as contact email in the general-contact files (contact, about, terms,
privacy — not the payment-specific files, which don't currently show an email).

## Part A3: Real verification — booking and free tools (click-test, not build-test)

- Confirm the Cal.com booking embed on `/book` actually renders and is interactive — describe what you
  see, don't just confirm the component compiles
- Click-test all 6 free tools (`/paga-calculator`, `/tools/compliance-quiz`,
  `/tools/deadline-tracker`, `/tools/threshold-checker`, `/tools/job-classification`,
  `/tools/mandatory-postings`) and the AI Lab — confirm each genuinely produces output when used, not
  just that the page loads

## Part A4: Publish ready blog content

9 pieces of ready content exist from earlier in this project (referenced in prior task history — check
`project-docs/BUILD_LOG.md` and git history around 2026-08-12 if you need to locate the source
material; if you cannot locate the original files, report that clearly rather than fabricate content).
Add them to the existing `blogRegistry` pattern in `src/app/blog/[slug]/page.tsx` (same pattern as the
existing 6 posts) — 4 compliance pieces (PAGA penalties, SB 553, SB 1343, 2026 compliance calendar)
and note the SB 1343 one may duplicate an existing post; compare and keep whichever is stronger, not
both. The 5 AI-adoption pieces are a different category (business AI practices, not compliance law) —
publish them too, but tag/categorize distinctly if the existing blog data model supports it.

## Part B: Build the Wage & Hour program hub

Highest-confidence spoke to build — most pre-existing verified material of anything not yet built.
Follow the exact Harassment Prevention pattern (real separate nested sub-pages, not WVPP/IIPP's
in-page anchor shortcut — that was a mistake, found during review, don't repeat it here).

- Route: `/programs/wage-and-hour`
- Summary card + inventory of nested topics
- Nested sub-pages (real routes, each with genuine distinct content and validation links):
  - Meal & Rest Breaks
  - Overtime & Misclassification
  - Pay Transparency (SB 1162)
  - Wage Statement Requirements (Labor Code § 226)
- Reuse existing free tools in the Compliance Checklist zone — PAGA calculator, job classification
  quiz, mandatory postings — don't rebuild them
- Real validation links per nested page (CA Legislative Information, DIR/DLSE)
- Add to sidebar (Wage & Hour category, replacing its coming-soon placeholder) and `/programs` index
  (`live: true`)

## Verification

1. `pnpm build` clean (real command, fresh install)
2. Part A: contact info correct in all 8 files including Zelle instances (quote each), booking/tools
   click-test results, blog post count before/after
3. Part B: click-test all 4 nested Wage & Hour sub-pages — confirm real navigation, not dead anchors
   (this is exactly the bug found in Task 013, don't repeat it)

## Report format

`project-docs/reports/016_REPORT.md` — all of the above, literal quoted results not narrative claims.
Commit Part A and Part B separately. Push to `agent/antigravity-016` — not `phase-1-foundation`
directly.
