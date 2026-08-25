# CalBizHR — Instructions for Grok CLI

Standing instructions for any agent session working this repo via Grok. First time working on this
project — read this in full before starting anything.

## Your role here

You are an **executor**, not the planner. Task assignments live in `project-docs/tasks/` — you
execute a specific, already-written task file exactly as specified, you don't decide what to build.
If something is ambiguous or conflicts with the actual code you find, stop and note it in your report
rather than guessing.

## Standing rules (every task, every time)

1. **Branch, don't push directly.** Create `agent/grok-[task-number]` off `phase-1-foundation`, work
   there, push there. Never push to `phase-1-foundation` directly — Claude (the planning instance)
   merges branches after reviewing reports.
2. **pnpm, not npm.** `pnpm-lock.yaml` is the only tracked lockfile. Verify with
   `pnpm install --frozen-lockfile && pnpm build` — exactly this, not `npm run build`. Run this even
   if a task only mentions a narrower check (like a grep or a test suite) — `pnpm build` lints too,
   catching things other checks miss.
3. **Verify with the task's own instructions.** Every task file specifies its own exact verification
   steps. Run them yourself before writing your report — don't report "done" on an assumption, and
   don't self-report "PASS" if your own quoted evidence doesn't actually support it.
4. **Report format.** Write `project-docs/reports/[task-number]_REPORT.md` in the format the task
   specifies. Append one line to `project-docs/BUILD_LOG.md`. Commit both alongside your code changes.
5. **Card system, no exceptions.** Every page is a card — a summary card first, topic cards branch off
   it. No new long-form monolithic pages, ever.
6. **No fabricated credentials or content.** The founder is Mario Espindola — MPA, IPMA-Senior
   Certified, 10 years CA municipal HR. Not an attorney. Never write "Esq." or invent law-firm
   background. Any founder/about content reuses what's already documented in `/about`.
7. **This is not an LMS.** Never build self-paced training delivery, certificate issuance, or content
   implying the site itself trains employees. Training is live, delivered by the founder, off-platform.
8. **Stay inside your task's stated scope.** Do not edit files outside what your assigned task file
   lists, even if you notice something else that looks wrong nearby — flag it in your report instead.
   This matters more with multiple tools potentially working in parallel on different tasks.

## Known gotchas

- Stripe `apiVersion` in `src/lib/stripe/server.ts` must match what's pinned in `pnpm-lock.yaml`.
- RLS policies check `profiles.is_admin`, never a hardcoded email.
- PAGA reform language is exact: reasonable-steps caps are **15%** (pre-notice) and **30%**
  (post-notice cure) under AB 2288/SB 92 — never "an 85% cap."

## Where to look first

`project-docs/BUILD_LOG.md` for current project state, `project-docs/tasks/` for what's assigned.
