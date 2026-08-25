# Task 005: Update test assertions + config/docs (do this LAST, after Tasks 001-004)

## Why this task exists and why it's separate

Tasks 001-004 change source content from "BizHR" to "CalBizHR". If the test files still assert against
the old string, the test suite will start failing — silently, since Vercel's deploy build does not run
tests, so this would not block deployment but would leave the test suite red. This task exists
specifically to prevent that.

**Do not run this task before Tasks 001-004 are complete** — it needs the actual final content to test
against.

## Scope

- `src/__tests__/Services.test.tsx`, `src/__tests__/Contact.test.tsx` — find any assertion checking for
  the literal text "BizHR" (e.g., `expect(screen.getByText('BizHR'))` or similar) and update to
  "CalBizHR"
- `README.md` — full pass, not find-replace only (some sentences may need rewording, same standard as
  the content-page tasks)
- `package.json` — `description` field

## Verification

1. Find the actual test run command (check `package.json` scripts — likely `pnpm test`) and run it.
   **The full test suite must pass, not just the two files you edited** — paste the full test run
   output in your report, not just "tests pass."
2. `grep -n "BizHR" README.md package.json` — expected: nothing (except any deliberate, correct
   reference to the separate `bizhr-compliance-corpus` repo name, which should NOT be changed, that's
   a real repo name)

## Report format

`project-docs/reports/005_REPORT.md` — full test suite output (pass/fail, not summarized), grep result
for README/package.json, and confirmation the `bizhr-compliance-corpus` repo name reference (if any
exists in README) was correctly left alone. Commit, push, append to `BUILD_LOG.md`.
