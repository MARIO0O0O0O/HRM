# Task 002: Rebrand homepage content

## Scope — exactly this file

`src/app/page.tsx` — 7 known instances as of this task's writing: metadata title, "BizHR is built to
step in quickly...", "What BizHR Does About It" heading, the $75 consultation section, the founder
quote block, "BizHR was founded by Mario Espindola...", "Why Mario & BizHR" heading.

Replace every instance of "BizHR" with "CalBizHR". Read the surrounding sentence for each — a couple
of these may read slightly awkwardly with a pure find-replace (e.g., "Why Mario & CalBizHR" is fine,
but check each one makes grammatical sense, don't blindly substitute without reading).

## Do not touch
Any other file, including `src/app/layout.tsx` (separate task) or any component this page imports.

## Verification

```
grep -n "BizHR" src/app/page.tsx
```

Expected output: nothing. Also manually re-read the full page top to bottom once — confirm every
sentence still reads naturally after the substitution, not just that the grep is clean.

## Report format

Same as Task 001: `project-docs/reports/002_REPORT.md` with the grep result, a list of what changed
(with brief before/after quotes for any sentence you had to reword rather than pure substitute), and
the `pnpm build` result. Commit, push, append to `BUILD_LOG.md`.
