# Task 012: MCP filesystem server + skill authoring (with real verification, not just file checks)

**Higher-risk than Task 011 — most of this is unverified claims from a research pass, not confirmed
project facts. Your job includes actually testing whether any of it works, not just creating files
that look right.**

## What NOT to do (explicitly cut from the research script, don't add these back)

- **No GitHub MCP server setup.** The research paired a GitHub Copilot MCP endpoint with your specific
  CLI without confirming that pairing is real, and it would require putting a token into a config
  file — not doing that on an unverified integration.
- **No `--dangerously-skip-permissions` flag anywhere.** That's a different tool's flag name (not
  yours), likely cross-contaminated into the research. Your permission model is entirely
  `settings.json`'s `permissions.allow`, already confirmed real in Task 009b — use plain `agy -p "..."`
  with no extra flag.
- **Don't touch `model` or anything Task 011 already handled.**

## Part A: MCP filesystem server (lower-risk than GitHub MCP, but still unconfirmed for you specifically)

1. Check for an existing MCP config — try `~/.gemini/config/mcp_config.json` first, then
   `~/.gemini/antigravity-cli/mcp_config.json`. If neither exists, create the first one with just
   `{ "mcpServers": {} }`.
2. Add a filesystem server entry scoped to this repo's root:
   ```json
   "filesystem": {
     "command": "npx",
     "args": ["-y", "@modelcontextprotocol/server-filesystem", "<repo root path>"]
   }
   ```
3. **Real verification, not a file check:** in an actual session (not headless, so you can see the
   real interaction), ask yourself directly: "List the MCP servers you currently have configured and
   confirm you can use filesystem tools from one of them." If you can genuinely name it back and
   demonstrate a filesystem MCP tool call actually working, that's a real pass. If you can only say
   "the config file exists" without demonstrating actual tool use, that's a FAIL — report it as such,
   don't round up to "configured" just because the JSON is valid.

## Part B: Author 3 project-specific skills

Wherever your skill system actually looks for these (global `~/.gemini/antigravity-cli/skills/` or
workspace `.agents/skills/` — confirm which one you actually load from before creating files nobody
reads):

**Skill 1 — `verify-nextjs-build`:** Given a Next.js/pnpm project, run `pnpm install --frozen-lockfile`
then `pnpm build` (this specific project doesn't have separate `pnpm lint`/`pnpm test` as top-level
scripts distinct from what `pnpm build` already covers via its own lint step — check `package.json`
scripts before assuming otherwise). Treat non-zero exit as failure. Never proceed to commit/push on a
failed build.

**Skill 2 — `branch-and-report`:** Encodes this project's standing convention: create
`agent/antigravity-[task-number]` off `phase-1-foundation`, never push to `phase-1-foundation`
directly, write `project-docs/reports/[task-number]_REPORT.md` in the format the specific task
requires, append one line to `project-docs/BUILD_LOG.md`, commit report + code changes together.

**Skill 3 — `self-check-before-pass`:** Before writing "PASS" in any report, re-read your own quoted
verification output and confirm the specific expected result is *literally present* in it — not just
that a command exited 0. If the expected string/result isn't there, the status is FAIL regardless of
exit code. (This exists because of a real incident: a different tool self-reported "PASS" on a task in
this project while its own quoted output showed a session-limit error and the actual test never ran.)

## Verification before considering this task done

1. Confirm which skill-loading location you actually use (report this explicitly — the research
   wasn't certain, so establishing ground truth here has real value)
2. Demonstrate — don't just claim — that at least one of the 3 skills is actually invokable/usable in
   a real interaction, not just present as a file
3. The MCP filesystem real-verification result from Part A

## Report format

`project-docs/reports/012_REPORT.md` — the MCP real-verification result (pass or honest fail), which
skill location actually works, and a demonstrated (not just claimed) invocation of at least one skill.
Commit, push to `agent/antigravity-012`, append to `BUILD_LOG.md`.
