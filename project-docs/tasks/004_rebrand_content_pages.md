# Task 004: Rebrand remaining content pages

## Scope — run this to get the current list first

```
grep -rl "BizHR\|M\.E\. HR" src/app --include="page.tsx" | grep -v "src/app/page.tsx"
```

(excludes the homepage, already handled in Task 002). As of this task's writing this included:
`src/app/about/page.tsx`, `src/app/services/page.tsx`, `src/app/spokes/[slug]/page.tsx`,
`src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/contact/page.tsx`,
`src/app/terms/page.tsx`, `src/app/privacy/page.tsx`, `src/app/pricing/page.tsx`,
`src/app/paga-calculator/page.tsx`, `src/app/tools/page.tsx`, `src/app/tools/[slug]/page.tsx`,
`src/app/tools/gated/[slug]/page.tsx`, and `src/app/tools/[slug]/ToolDetailClient.tsx` (a component,
not a page, but same content-prose nature).

Also: `src/app/api/ai/policy/route.ts` and `src/app/api/ai/audit/route.ts` — these have "BizHR" inside
system prompt strings sent to the Claude API, not visible page content, but should still be updated
for consistency.

Replace "BizHR" with "CalBizHR" throughout. These are prose files — read each substitution in context,
same standard as Task 002 (don't blindly find-replace without checking the sentence still reads right).

**Careful with `/terms` and `/privacy` specifically** — these are legal pages. Only change the brand
name string itself, do not alter any other wording, structure, or legal language in these two files.

## Verification

**Note:** "CalBizHR" contains "BizHR" as a substring — a plain `grep "BizHR"` matches every
correctly-rebranded line too and can't prove completeness alone (a prior task caught this). Use:

```
grep -rnP '(?<!Cal)BizHR' src/app/about/page.tsx src/app/services/page.tsx "src/app/spokes/[slug]/page.tsx" src/app/blog/page.tsx "src/app/blog/[slug]/page.tsx" src/app/contact/page.tsx src/app/terms/page.tsx src/app/privacy/page.tsx src/app/pricing/page.tsx src/app/paga-calculator/page.tsx src/app/tools/page.tsx "src/app/tools/[slug]/page.tsx" "src/app/tools/gated/[slug]/page.tsx" "src/app/tools/[slug]/ToolDetailClient.tsx" src/app/api/ai/policy/route.ts src/app/api/ai/audit/route.ts
grep -rn "M\.E\. HR" src/app/about/page.tsx src/app/services/page.tsx "src/app/spokes/[slug]/page.tsx" src/app/blog/page.tsx "src/app/blog/[slug]/page.tsx" src/app/contact/page.tsx src/app/terms/page.tsx src/app/privacy/page.tsx src/app/pricing/page.tsx src/app/paga-calculator/page.tsx src/app/tools/page.tsx "src/app/tools/[slug]/page.tsx" "src/app/tools/gated/[slug]/page.tsx" "src/app/tools/[slug]/ToolDetailClient.tsx" src/app/api/ai/policy/route.ts src/app/api/ai/audit/route.ts
```
Expected: both empty.

## Report format

`project-docs/reports/004_REPORT.md` — every file touched, grep result, `pnpm build` result, and an
explicit confirmation you did NOT alter any legal wording in terms/privacy beyond the brand string.
Commit, push, append to `BUILD_LOG.md`.
