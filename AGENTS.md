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

**If you are ever given a prompt directly in chat, rather than pointed to an existing file in
`project-docs/tasks/`, STOP. Do not reformat it into your own task file, do not blend it with other
task files sitting in that folder, and do not begin executing it from chat.** Reply that you're
waiting for it to be committed as a task file first. The planning instance (Claude) is responsible
for committing every task file before it's handed to you — if one hasn't arrived yet, that's a
process error to flag, not something to solve by improvising your own version of it. This rule
exists because it failed once already (TASK-011/013, reverted 2026-08-26): a chat-pasted prompt got
reinterpreted during "formalization" and picked up unrelated scope from neighboring task files.

**Source of truth:** `project-docs/SOURCE_OF_TRUTH.md` is the canonical, always-current spec for site
architecture, the phase roadmap, and current build status. If anything in a task file seems to
conflict with it, `SOURCE_OF_TRUTH.md` wins — stop and flag the conflict rather than guessing which
is right. This file is written to be usable by any planning agent (Claude or Gemini), not just one.

## Standing rules (every task, every time)

1. **Branch, don't push directly.** Create `agent/antigravity-[task-number]` off `phase-1-foundation`,
   work there, push there. Never push to `phase-1-foundation` directly.
2. **pnpm, not npm.** `pnpm-lock.yaml` is the only tracked lockfile. Verify with
   `pnpm install --frozen-lockfile && pnpm build` — exactly this, not `npm run build`. **Run this even
   if a task only mentions the test suite** — `pnpm build` lints too, catching things `vitest run`
   alone misses (like an unused import left after editing a test). **Known issue:**
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

## Never invoke yourself or dispatch further work

You are the executor for exactly one assigned task. **Never run `claude`, `agy`, or
`poll_and_dispatch.sh` from within your own Bash tool calls, under any circumstances.** A runaway
recursive `claude -p` process chain happened once already in this project from something resembling
this pattern — hard, non-negotiable boundary, not a judgment call. Dispatching further work is
exclusively the planning instance's job.

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
- **MCP filesystem server via `~/.gemini/config/mcp_config.json` does not work** in this environment —
  confirmed by real attempted tool invocation (Task 012), not just config presence. Config is valid
  JSON but the active toolset stays native-only. Don't re-attempt without new information.
- **Skill discovery precedence, confirmed real**: workspace `.agents/skills/<name>/SKILL.md` (highest)
  → global `~/.gemini/config/skills/<name>/SKILL.md` → built-in
  `~/.gemini/antigravity-cli/builtin/skills/<name>/SKILL.md` (lowest). Three project skills already
  exist at workspace level: `verify-nextjs-build`, `branch-and-report`, `self-check-before-pass`.

## Where to look first

`project-docs/BUILD_LOG.md` for current state, `project-docs/tasks/` for what's assigned.
