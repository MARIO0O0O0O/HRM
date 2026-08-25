# How This Works

1. **Claude** writes task files here (`project-docs/tasks/NNN_description.md`), commits and pushes
   them to the repo directly — no manual file handoff through Downloads.
2. **You** paste one short, reusable dispatch message (below) into Antigravity or Claude Code. Same
   message every time — the executing agent figures out which task is next by looking at the repo.
3. **The executing agent** pulls the repo, finds the lowest-numbered task with no matching report yet,
   reads it, executes it, verifies per the task's own instructions, writes its report to
   `project-docs/reports/NNN_REPORT.md`, appends one line to `BUILD_LOG.md`, commits and pushes
   everything together.
4. **Claude** (next session) pulls the repo and reads the report directly — no relay needed.

## The dispatch message (reusable, paste as-is every time)

> Pull the latest from the `phase-1-foundation` branch of this repo. Look in `project-docs/tasks/` for
> the lowest-numbered task file that does NOT yet have a matching report in `project-docs/reports/`
> (e.g., if `001_REPORT.md` exists but `002_REPORT.md` doesn't, do task 002). Read that task file
> completely. Execute exactly what it specifies — nothing more, nothing outside its stated scope. Run
> its verification steps yourself before writing anything. Write your report to
> `project-docs/reports/[same-number]_REPORT.md` in the format the task file specifies. Append one
> line to `project-docs/BUILD_LOG.md`. Commit your code changes and both new files together, with a
> clear commit message, and push. If anything in the task is ambiguous, conflicts with what you find
> in the actual code, or requires a decision outside your authority, stop and write that in your
> report instead of guessing.

## Task design rules (for Claude, writing future tasks)

- One task = one narrow, mechanically verifiable outcome. If "done" can't be checked with a specific
  command or a specific quoted result, the task is too vague — narrow it further.
- Every task states its own exact verification command/steps. Never rely on "it should work."
- Sequence tasks so each one's prerequisite is either "none" or an earlier numbered task — never
  circular, never assumed-parallel unless explicitly stated safe to run out of order.

## Running two agents in parallel (safe, when tasks are file-disjoint)

The generic "find the next task" dispatch message is for **sequential, single-agent** execution only.
Running it on two agents at once causes a race condition — both will grab the same task.

For genuinely parallel work, use **explicit assignment + separate branches** instead:

1. Confirm the tasks being parallelized don't touch any of the same files (check each task's Scope
   section) — if they overlap at all, don't parallelize them, run sequentially instead.
2. Each agent gets a specific task number (not "find the next") and its own branch, named
   `agent/[tool]-[task-number]` (e.g., `agent/antigravity-001`).
3. Each agent branches off `phase-1-foundation`, does its one assigned task, pushes to its own branch
   — never directly to `phase-1-foundation`.
4. Claude merges both branches back into `phase-1-foundation` after both report back, resolving any
   incidental conflicts (should be none, if step 1 was checked correctly).

This trades a small amount of setup (explicit assignment instead of auto-discovery) for zero collision
risk. Worth it any time there are 2+ genuinely independent tasks ready at once.

## Automated polling/dispatch (optional, reduces manual copy-paste further)

`project-docs/scripts/poll_and_dispatch.sh` — run on your device (Termux) to automatically check for
new tasks and dispatch them, instead of manually pasting a message every round.

**What it actually does:** Claude Code gets fully auto-dispatched (real headless mode, `claude -p`,
confirmed to exist). Antigravity does not have a confirmed equivalent — the script fires you a Termux
notification instead, and you still paste the dispatch message into it manually. If Antigravity turns
out to have its own headless/scriptable mode, tell Claude and this script gets extended to cover it
too — don't assume it's covered until then.

**Setup (one time):**
```
pkg install termux-api git
# also install the Termux:API app itself (F-Droid or Play Store, same developer as Termux)
```
Then either add it to cron (`crontab -e`, e.g. `*/10 * * * * bash ~/HRM/project-docs/scripts/poll_and_dispatch.sh`)
or run it in a simple loop in a spare Termux session.

This does not replace the review/merge step — Claude still needs to review each report and merge
branches. It only removes the manual "paste the dispatch message" step for Claude Code specifically.
