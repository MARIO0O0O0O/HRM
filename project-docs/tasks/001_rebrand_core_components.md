# Task 001: Rebrand core components (Header, Footer, Hero)

## Scope — exactly these 3 files, nothing else

- `src/components/layout/Header.tsx` — 2 instances ("M.E. HR" at line ~27, "M.E. HR Solutions" at line ~70)
- `src/components/layout/Footer.tsx` — 3 instances ("BizHR · M.E. Consulting", "BizHR and M.E. Consulting...", copyright line)
- `src/components/hero/CinematicHero.tsx` — 1 instance ("BizHR" in the H1)

Replace every instance with "CalBizHR". Line numbers above are a starting reference, not guaranteed —
re-check current content before editing, the file may have changed since this was written.

## Do not touch
Any other file. Other rebrand tasks cover the rest — this task is scoped narrowly on purpose.

## Verification (exact, mechanical — run this yourself before writing your report)

```
grep -n "BizHR\|M\.E\. HR" src/components/layout/Header.tsx src/components/layout/Footer.tsx src/components/hero/CinematicHero.tsx
```

Expected output: **nothing** (empty). If anything prints, the task isn't done — fix it before reporting.

## Report format

Write `project-docs/reports/001_REPORT.md` with:
- Pass/fail per the grep command above (paste the actual command output, even if empty)
- What changed in each of the 3 files (before → after for each instance)
- `pnpm build` result (paste the final success/fail line)

Commit both the code changes and the report file together. Push to `phase-1-foundation`. Append one
line to `project-docs/BUILD_LOG.md`: date, "Task 001", pass/fail, one-sentence summary.
