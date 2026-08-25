# Task 009a: Verify and fix Claude Code's own headless-mode environment

**This task is for Claude Code only. Nothing in this file concerns any other tool.**

This task touches no application code and no repo file except its own report — it's entirely about
your local CLI environment. Safe to run alongside any other task, no file-overlap risk.

## Steps

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

## Report format

Write `project-docs/reports/009a_REPORT.md` with: what you checked, what was already fine, what was
missing/broken and what you changed to fix it, and the literal quoted output of your trivial headless
test (don't summarize it as "it worked" — quote it). Append one line to `project-docs/BUILD_LOG.md`.
Commit and push to `agent/claude-code-009a`.
