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

## ALSO IN THIS TASK — flag, don't fix

Do not change these, just confirm in your report whether they're accurate (I'll make the final call,
not you): the following specific dollar figures appear in TASK-018's output and were **not** present
in the original `/programs/*` source pages being migrated, meaning they came from your own general
knowledge rather than the source material:
- `workplace-violence/page.tsx`: "$25,000+ per violation" (Cal/OSHA WVPP citation)
- `paystubs-wage-statements/page.tsx`: "$50 initial / $100 subsequent per employee per pay period"
  (LC §226 wage statement penalty) and "$10,000 per violation under Labor Code § 432.3"

State plainly in your report: are you confident these are currently accurate, or did you extrapolate
them? Don't soften this — a wrong answer here matters more than an uncertain one.

---

## ACCEPTANCE CRITERIA

- [ ] `pnpm build` completes with zero TypeScript errors
- [ ] All 78 pages compile
- [ ] No visible page content/copy changed except the required `fallbackProgram` field renames
- [ ] Report states plainly whether the 3 flagged dollar figures are sourced/verified or extrapolated

---

## WHEN DONE

1. Write `project-docs/reports/019_REPORT.md`
2. Append one line to `project-docs/BUILD_LOG.md`
3. Push, don't merge
4. `termux-notification --title "TASK-019 hotfix complete" --content "[PASS/FAIL] — [one-line summary]" --id "task-019"`
