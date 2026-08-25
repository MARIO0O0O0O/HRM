# Task 009: Verify and fix your own headless-mode environment setup

**This is a self-diagnostic task. Each tool checks and fixes only its own setup — Claude Code follows
Part A, Antigravity follows Part B. Skip the section that isn't yours.**

This task touches no application code and no other file in the repo except its own report — it's
entirely about the local CLI environment. Safe to run at the same time as any other task, by either
tool, no file-overlap risk.

## Part A — Claude Code only

1. Confirm `claude` is on PATH and runs: `claude --version`
2. Confirm `pnpm` is on PATH: `pnpm --version`. If missing, install it: `npm install -g pnpm`, then
   re-verify. (A prior task's report found this missing in this exact environment before — check
   again rather than assume it's still fine.)
3. Run a real trivial headless test that exercises the same flags the dispatcher actually uses:
   ```
   claude -p "Run the shell command 'echo headless-test-ok' and report the exact output." --allowedTools "Bash" --permission-mode acceptEdits
   ```
   Confirm the literal string `headless-test-ok` actually appears in the result — not just that the
   command exited without error.

## Part B — Antigravity only

1. Confirm `agy` is on PATH and runs: `agy --version`
2. Check whether `~/.gemini/antigravity-cli/settings.json` exists and already contains a
   `permissions.allow` list including `command(git)`, `command(pnpm)`, and `command(node)`.
3. If the file doesn't exist, or exists but is missing any of those three: **edit it to add them,
   merging with whatever's already there — do not overwrite or delete any existing settings in that
   file.** If you're unsure how to safely merge (e.g., the file has complex existing structure you're
   not confident editing without breaking), stop and report the current file contents instead of
   guessing at a merge.
4. Run a real trivial headless test — critically, one that actually exercises a shell command, since
   Antigravity's headless mode is known to soft-deny shell commands by default (exits 0, does nothing,
   looks successful) when not pre-authorized:
   ```
   agy -p "Run the shell command 'echo headless-test-ok' and report the exact output."
   ```
   Confirm the literal string `headless-test-ok` actually appears in the result. If it doesn't — even
   if the process exited 0 — that's a FAIL, not a pass. This is exactly the failure mode this task
   exists to catch.

## Report format

Write `project-docs/reports/009_[claude-code|antigravity]_REPORT.md` (use your own tool name in the
filename, so both reports can coexist) with: what you checked, what was already fine, what was
missing/broken and what you changed to fix it (exact before/after of any settings file edit), and the
literal output of your trivial headless test — quote it, don't summarize it, since "it worked" is
exactly the kind of claim this task is designed not to accept at face value. Append one line to
`project-docs/BUILD_LOG.md`. Commit and push to `agent/[your-tool]-009`.
