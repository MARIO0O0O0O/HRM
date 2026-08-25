# Task 009b: Verify and fix Antigravity's own headless-mode environment

**This task is for Antigravity only. Nothing in this file concerns any other tool.**

This task touches no application code and no repo file except its own report — it's entirely about
your local CLI environment. Safe to run alongside any other task, no file-overlap risk.

## Steps

1. Confirm `agy` is on PATH and runs: `agy --version`
2. Check whether `~/.gemini/antigravity-cli/settings.json` exists and already contains a
   `permissions.allow` list including `command(git)`, `command(pnpm)`, and `command(node)`.
3. If the file doesn't exist, or exists but is missing any of those three: edit it to add them,
   **merging with whatever's already there — do not overwrite or delete any existing settings in that
   file.** If you're unsure how to safely merge, stop and report the current file contents instead of
   guessing at a merge.
4. Run a real trivial headless test that actually exercises a shell command, since Antigravity's
   headless mode is known to soft-deny shell commands by default (exits 0, does nothing, looks
   successful) when not pre-authorized:
   ```
   agy -p "Run the shell command 'echo headless-test-ok' and report the exact output."
   ```
   Confirm the literal string `headless-test-ok` actually appears in the result. If it doesn't — even
   if the process exited 0 — that's a FAIL, not a pass. This is exactly the failure mode this task
   exists to catch.

## Report format

Write `project-docs/reports/009b_REPORT.md` with: what you checked, what was already fine, what was
missing/broken and what you changed to fix it (exact before/after of any settings file edit), and the
literal quoted output of your trivial headless test. Append one line to `project-docs/BUILD_LOG.md`.
Commit and push to `agent/antigravity-009b`.
