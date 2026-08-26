# TASK-019: Hotfix — TASK-018 build-breaking type error

**Urgent, small, mechanical fix. Read `project-docs/SOURCE_OF_TRUTH.md` if you need context, but this
task is self-contained.**

**Branch:** continue on `agent/antigravity-018` (same branch as TASK-018 — this is a fix to that
work, not a new phase) OR a fresh branch off it if that one's already gone. Either way, do not merge
to `phase-1-foundation` yourself.

---

## THE BUG

`pnpm build` currently fails with a TypeScript error on all 6 pages that fetch program data:

```
./src/app/spokes/safety-prevention/harassment-prevention/page.tsx:86:31
Type error: Type 'ProgramRecord | { id: string; name: string; code: string; summary: string; ... }'
is not assignable to type 'ProgramRecord'.
```

**Cause:** each of the 6 pages below defines its own inline `fallbackProgram` object with field names
that don't match the real `ProgramRecord` interface in `src/data/airtable-seed.ts`
(`code, name, governingLaw, primaryStatute, effectiveDate, description, appliesTo, trainingRequired,
supervisoryHours, nonSupervisoryHours, recurrence, keyDeliverables, notes`). The invented field names
(`summary`, `statute`, `agency`, `targetAudience`, `penaltySummary`, `lastUpdated`, `id`) don't match.

**Affected pages:**
- `src/app/spokes/safety-prevention/harassment-prevention/page.tsx`
- `src/app/spokes/safety-prevention/osha-iipp/page.tsx`
- `src/app/spokes/safety-prevention/workplace-violence/page.tsx`
- `src/app/spokes/wage-hour/meal-rest-breaks/page.tsx`
- `src/app/spokes/wage-hour/paystubs-wage-statements/page.tsx`
- `src/app/spokes/wage-hour/timekeeping-classification/page.tsx`

---

## THE FIX

`getProgram(code)` in `src/lib/airtable/server.ts` **already falls back to `programsSeed[code] ?? null`
internally** when no live Airtable key is set. The inline `fallbackProgram` objects are redundant for
any code that already exists in `programsSeed` (`HPP`, `WVPP`, `IIPP`, `KYR`, `WAGE`).

**For `harassment-prevention` (HPP), `workplace-violence` (WVPP), `osha-iipp` (IIPP):**
Delete the inline `fallbackProgram` object entirely. Replace `const activeProgram = program || fallbackProgram`
with `const activeProgram = program ?? programsSeed['HPP']` (swap the code per page). Import
`programsSeed` from `@/data/airtable-seed` if not already imported.

**For the 3 wage-hour sub-topic pages** (`meal-rest-breaks`, `paystubs-wage-statements`,
`timekeeping-classification`): there is no granular seed entry for these — only a combined `WAGE`
entry exists. Keep a local fallback object, but **fix the field names to exactly match `ProgramRecord`**
(`code, name, governingLaw, primaryStatute, effectiveDate, description, appliesTo, trainingRequired,
supervisoryHours, nonSupervisoryHours, recurrence, keyDeliverables, notes`) — carry over the actual
content/values already written, just rename the fields and add `trainingRequired: false` (these are
administrative/payroll topics, not training programs).

Do not change any visible page content, wording, or the citations already reviewed — this is a type
signature fix only, not a content rewrite.

---

## ALSO IN THIS TASK — soften now, verify later

The following 3 dollar figures were not present in the original `/programs/*` source pages — they
came from your own general knowledge, not the migrated material, and should be treated as **unverified,
not confirmed accurate** until reviewed by the founder directly. Do not delete the underlying legal
citations (they're likely fine) — just remove the specific dollar amounts and replace with general,
qualified language. Match this pattern exactly:

1. **`workplace-violence/page.tsx`** — change:
   `'Cal/OSHA citations up to $25,000+ per violation for failure to maintain plan or logs.'`
   to:
   `'Cal/OSHA civil penalties apply for failure to maintain a written plan or incident log (exact penalty figures pending verification).'`

2. **`paystubs-wage-statements/page.tsx`** — change:
   `'$50 initial / $100 subsequent per employee per pay period plus PAGA statutory penalties.'`
   to:
   `'Statutory per-employee, per-pay-period penalties apply under Labor Code § 226(e), plus PAGA statutory penalties (exact penalty figures pending verification).'`

3. Same file — change:
   `'Civil administrative penalties up to $10,000 per violation under Labor Code § 432.3.'`
   to:
   `'Civil administrative penalties apply under Labor Code § 432.3 (exact penalty figures pending verification).'`

This is a known open item, not a task failure — note it in your report as done, and it'll be tracked
in `SOURCE_OF_TRUTH.md` for a future accuracy pass once the founder verifies current figures.

---

## ACCEPTANCE CRITERIA

- [ ] `pnpm build` completes with zero TypeScript errors
- [ ] All 78 pages compile
- [ ] No visible page content/copy changed except the required `fallbackProgram` field renames and
      the 3 specific dollar-figure softenings listed above
- [ ] The 3 dollar figures replaced exactly as specified, citations kept, amounts removed

---

## WHEN DONE

1. Write `project-docs/reports/019_REPORT.md`
2. Append one line to `project-docs/BUILD_LOG.md`
3. Push, don't merge
4. `termux-notification --title "TASK-019 hotfix complete" --content "[PASS/FAIL] — [one-line summary]" --id "task-019"`
