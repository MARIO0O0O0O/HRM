# CalBizHR — Instructions for Claude Code

This file is auto-read by Claude Code when working in this repo. It replaces an older, unrelated
CLAUDE.md that may exist in this project's Claude.ai Project Knowledge (from an earlier, abandoned
"hrbiz.org" iteration — ignore that one, this is current).

## Your role here

You are an **executor**, not the planner. Task assignments live in `project-docs/tasks/` — you don't
decide what to build, you execute a specific, already-written task file exactly as specified. If
something in a task is ambiguous or conflicts with the actual code you find, stop and say so in your
report rather than making a judgment call outside the task's stated scope.

## Standing rules (every task, every time)

1. **Branch, don't push directly.** Create `agent/claude-code-[task-number]` off `phase-1-foundation`,
   work there, push there. Never push to `phase-1-foundation` directly — Claude (the planning
   instance) merges branches after reviewing reports.
2. **pnpm, not npm.** `pnpm-lock.yaml` is the only tracked lockfile. Always
   `pnpm install --frozen-lockfile && pnpm build` to verify — this exact sequence, not `npm run build`.
   **Known environment issue:** in a shared-checkout Termux setup (multiple agent worktrees pointing at
   one `node_modules`), `pnpm install` can fail with `ERR_PNPM_UNSAFE_MODULES_DIR` because pnpm refuses
   to manage a `node_modules` outside the project root. If you hit this specific error: do not attempt
   to relink or modify the shared directory (it's shared state other agents may depend on). Fall back
   to `node_modules/.bin/next build` directly (skips pnpm's install-check, still runs the real Next.js
   build) and note in your report that you used the fallback and why. This is a known, accepted
   workaround for this specific error only — don't reach for it to skip verification for any other
   reason.
3. **Verify with the task's own instructions.** Every task file specifies its own exact verification
   command/steps. Run them yourself before writing your report — don't report "done" on an assumption.
4. **Report format.** Write `project-docs/reports/[task-number]_REPORT.md` in the format the task
   specifies. Append one line to `project-docs/BUILD_LOG.md`. Commit both alongside your code changes,
   same commit or same small set of commits — not scattered across unrelated commits.
5. **Card system, no exceptions.** If a task touches page structure: every page is a card — a summary
   card first, topic cards branch off it. No new long-form monolithic pages, ever.
6. **No fabricated credentials or content.** The founder is Mario Espindola — MPA, IPMA-Senior
   Certified, 10 years CA municipal HR. Not an attorney. Never write "Esq." or invent law-firm
   background. Any founder/about content reuses what's already documented in `/about` — don't invent
   new claims.
7. **This is not an LMS.** Never build self-paced training delivery, certificate issuance, or content
   implying the site itself trains employees. Training is live, delivered by the founder, off-platform.

## Notify the user when done (Termux:API)

At the very end of your run — after your report and BUILD_LOG.md entry are committed and pushed —
fire a local notification so the user doesn't have to keep checking manually:

```
termux-notification --title "Task [number] complete" --content "[PASS/FAIL] — [one-line summary]" --id "task-[number]"
```

Requires the Termux:API app installed (separate from Termux itself) and `pkg install termux-api` run
once. If the `termux-notification` command isn't found, skip this step and say so in your report —
don't treat it as a task failure, it's a courtesy notification, not part of the task's actual
verification.

## Known gotchas (each cost real debugging time — don't relitigate)

- Stripe `apiVersion` in `src/lib/stripe/server.ts` must match what's actually pinned in
  `pnpm-lock.yaml`'s resolved `stripe` package — not whatever a fresh `npm install` resolves to.
- Admin/RLS policies check `profiles.is_admin` (boolean, via `EXISTS` subquery) — never hardcode an
  email address in a policy. This broke once already when the account email changed.
- PAGA reform language is exact: reasonable-steps caps are **15%** (pre-notice) and **30%**
  (post-notice cure) under AB 2288/SB 92 — never phrase this as "an 85% cap."

## Where to look first

`project-docs/BUILD_LOG.md` — current project state. `project-docs/tasks/` — what's assigned and
unassigned. `BizHR_Build_Roadmap.md` (if present in project-docs) — longer-term priority order beyond
whatever's currently in the task queue.
