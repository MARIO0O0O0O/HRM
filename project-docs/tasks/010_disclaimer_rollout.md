# Task 010: Sitewide legal disclaimer rollout

**File-disjoint from Tasks 006 and 008** — this task only touches `/terms`, `/privacy`, and disclaimer
text on tool/AI-output pages. Safe to run at the same time as either of those.

## Background

This was identified as a priority early in this project and never actually executed as a discrete,
trackable task. Two distinct things currently inconsistent across the site:

1. Standard liability disclaimer ("educational, not legal advice") — present on some pages (AI Lab,
   PAGA calculator), missing or inconsistent on others
2. AI-involvement transparency — not present anywhere yet

## Scope

Add this exact two-part disclaimer, consistently, to the footer of every free tool page, every program
hub page, and both AI Lab outputs:

> "This site's content is developed with AI assistance and reviewed for accuracy against current
> statutory and regulatory sources; it is not a substitute for legal advice from a licensed attorney.
> Laws referenced here change — verify current requirements before relying on any specific figure,
> deadline, or requirement stated here."

Target pages (confirm this list against what actually exists — the site may have grown since this was
written):
- `/paga-calculator`
- `/tools/compliance-quiz`, `/tools/deadline-tracker`, `/tools/threshold-checker`,
  `/tools/job-classification`, `/tools/mandatory-postings`
- `/ai-lab`
- `/programs/harassment-prevention` and its nested pages (`/policy-templates`, `/training`)

**Also:** read `/terms` and `/privacy` in full — this has not been done yet this project. Confirm
they're current and complete. Only edit them if something is clearly wrong or missing; if you find
something questionable but aren't certain it needs a fix, report it rather than guess. Do not alter
any other wording, structure, or legal language beyond what's clearly necessary.

## Do not touch

`Sidebar.tsx`, `PreviewPanel.tsx`, homepage tile content, or anything Task 008 or Task 006 might be
concurrently touching. If you find something in one of those areas that looks wrong, note it in your
report instead of fixing it directly.

## Verification

1. `pnpm build` clean
2. Spot-check at least 6 of the target pages — confirm the disclaimer text appears, quote what you
   see, don't just claim it's there
3. Confirm `/terms` and `/privacy` were read in full — summarize what you found (current/complete, or
   specific gaps), and list exactly what (if anything) you changed in either file

## Report format

`project-docs/reports/010_REPORT.md` — the 6+ page spot-check results, the terms/privacy review
findings, and `pnpm build` output. Commit, push to `agent/[your-tool]-010`, append to `BUILD_LOG.md`.
