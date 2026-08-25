# Task 006: Final sitewide verification sweep (do this LAST, after Tasks 001-005)

## Purpose

A final, independent check that the whole rebrand is actually complete — not trusting the individual
task reports alone, verifying the live result directly.

## Steps

1. Run this exact command from the repo root:
```
grep -rn "BizHR\|M\.E\. HR" src/ README.md package.json
```
Expected: **zero results**, with one allowed exception — a plain-text mention of the
`bizhr-compliance-corpus` repository name, if it appears anywhere (that's a real, separate repo name,
correctly left unchanged).

2. If anything else appears, fix it directly as part of this task (don't create a new task file for
   stragglers — this is the catch-all).

3. Fetch the actual live production URL (calbizhr.com) after your final push and deploy completes —
   confirm the homepage HTML itself shows "CalBizHR" in the page title, not just that the source code
   was changed. Source changes and what's actually live can differ if a deploy didn't go through
   cleanly — verify the real thing, not just the repo.

4. Run `pnpm build` one final time — must be clean.

## Report format

`project-docs/reports/006_REPORT.md` — the final grep output (or explicit confirmation of zero
results), the live-URL check result (quote what the page title actually says), and final build status.
This report is the one that should say, definitively, "the rebrand is complete" or list exactly what
still isn't. Commit, push, append to `BUILD_LOG.md` with a clear "REBRAND COMPLETE" or "REBRAND
INCOMPLETE — see report" marker.
