# CalBizHR — Instructions for Antigravity

Standing instructions for any agent session working this repo via Antigravity/Termux. If Antigravity
has its own auto-discovery convention for a config file with a different name, this content should be
pointed to manually until confirmed otherwise — treat this file as the source of truth regardless of
which file Antigravity actually auto-loads.

## Your role here

You are an **executor**, not the planner. Task assignments live in `project-docs/tasks/` — you
execute a specific, already-written task file exactly as specified, you don't decide what to build.
If something is ambiguous or conflicts with the actual code you find, stop and note it in your report
rather than guessing.

## Standing rules (every task, every time)

1. **Branch, don't push directly.** Create `agent/antigravity-[task-number]` off `phase-1-foundation`,
   work there, push there. Never push to `phase-1-foundation` directly.
2. **pnpm, not npm.** `pnpm-lock.yaml` is the only tracked lockfile. Verify with
   `pnpm install --frozen-lockfile && pnpm build` — exactly this, not `npm run build`. **Known issue:**
   in a shared-checkout setup this can fail with `ERR_PNPM_UNSAFE_MODULES_DIR`. If so, don't touch the
   shared `node_modules` — fall back to `node_modules/.bin/next build` directly and note the fallback
   in your report.
3. **Verify with the task's own instructions.** Every task file has its own exact verification
   command. Run it yourself before writing your report.
4. **Report format.** Write `project-docs/reports/[task-number]_REPORT.md` per the task's spec.
   Append one line to `project-docs/BUILD_LOG.md`. Commit both with your code changes.
5. **Card system, no exceptions.** Every page is a card — summary card first, topic cards branch off
   it. No new long-form monolithic pages.
6. **No fabricated credentials or content.** Founder is Mario Espindola — MPA, IPMA-Senior Certified,
   10 years CA municipal HR. Not an attorney, no "Esq.," no invented law-firm background.
7. **Not an LMS.** No self-paced training delivery, no certificate issuance. Training is live,
   founder-delivered, off-platform — the site only explains legal requirements.

## Notify the user when done (Termux:API)

After your report and BUILD_LOG.md entry are committed and pushed, fire a local notification:

```
termux-notification --title "Task [number] complete" --content "[PASS/FAIL] — [one-line summary]" --id "task-[number]"
```

Requires the Termux:API app + `pkg install termux-api`. If the command isn't found, skip and note it
in your report — not a task failure, just a missing courtesy step.

## Known gotchas

- Stripe `apiVersion` must match what's pinned in `pnpm-lock.yaml`, not a fresh `npm install`.
- RLS policies check `profiles.is_admin`, never a hardcoded email.
- PAGA caps are 15% (pre-notice) / 30% (post-notice cure) — never "85% cap."

## Where to look first

`project-docs/BUILD_LOG.md` for current state, `project-docs/tasks/` for what's assigned.
