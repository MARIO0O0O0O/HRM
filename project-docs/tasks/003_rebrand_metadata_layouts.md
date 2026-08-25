# Task 003: Rebrand metadata-only layout.tsx files (mechanical, batch task)

## Scope — these files, each containing only a small metadata object (title/description strings), no
substantive prose

Run this first to get the current, authoritative list (may differ slightly from what's below since
time has passed):

```
grep -rl "BizHR\|M\.E\. HR" src/app --include="layout.tsx"
```

As of this task's writing, that included: `src/app/layout.tsx` (root — includes JSON-LD structured
data too, check that specifically), `src/app/ai-lab/layout.tsx`,
`src/app/programs/harassment-prevention/layout.tsx`,
`src/app/programs/harassment-prevention/training/layout.tsx`,
`src/app/programs/harassment-prevention/policy-templates/layout.tsx`, `src/app/programs/layout.tsx`,
`src/app/book/layout.tsx`, `src/app/contact/layout.tsx`, `src/app/tools/deadline-tracker/layout.tsx`,
`src/app/tools/mandatory-postings/layout.tsx`, `src/app/tools/job-classification/layout.tsx`,
`src/app/tools/threshold-checker/layout.tsx`, `src/app/tools/compliance-quiz/layout.tsx`,
`src/app/paga-calculator/layout.tsx`.

For each: replace "BizHR" with "CalBizHR" in title/description metadata strings. For
`src/app/layout.tsx` specifically, also check the JSON-LD `structuredData` object's `name` field and
`metadataBase`/OG `url` fields — these should already reference calbizhr.com if Prompt 1 ran correctly,
but verify, don't assume.

## Do not touch
`src/app/opengraph-image.tsx` (separate task, it's not a metadata object, it's rendered image text) or
any `page.tsx` files (separate tasks).

## Verification

```
grep -rn "BizHR\|M\.E\. HR" src/app --include="layout.tsx"
```

Expected: nothing.

## Report format

`project-docs/reports/003_REPORT.md` — list every file touched, the grep result, and `pnpm build`
result. Commit, push, append to `BUILD_LOG.md`.
