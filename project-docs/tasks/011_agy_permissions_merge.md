# Task 011: Merge additional permissions.allow entries into your own settings.json

**Low-risk, additive-only. You (Antigravity) run this on yourself — configure your own environment,
not application code.**

## Background

A Perplexity research pass produced a broader setup script for extending your own capabilities. Most
of it is unverified and held back (see Task 012's caution). This task is the one piece confirmed
low-risk: it only *merges* new entries into `permissions.allow` in your existing, already-working
`~/.gemini/antigravity-cli/settings.json` — same mechanism already confirmed real in Task 009b, purely
additive, no restructuring.

**One caught error in the source script, do not repeat it:** its fallback settings.json template used
`"model": "Gemini 3.5 Flash (High)"`. Your actual, current settings.json says `"model": "Gemini 3.6
Flash (High)"` — a real value, already correct. **Do not touch the `model` field at all in this
task** — only `permissions.allow`.

## Steps

1. Read your current `~/.gemini/antigravity-cli/settings.json` in full first — confirm it exists (it
   should, per Task 009b) and note its current `permissions.allow` array exactly as-is.
2. Merge in these additional entries (keep everything already there, add these, dedupe):
   ```
   command(npm run (build|lint|test))
   mcp(filesystem/*)
   ```
   Do not add `mcp(github/*)` or anything GitHub-MCP-related — that's separate, more speculative, and
   explicitly out of scope here (see Task 012).
3. Do not touch `model`, `trustedWorkspaces`, or any other existing field — permissions.allow only.

## Verification

1. Read the file back after editing. Confirm valid JSON (`jq . ~/.gemini/antigravity-cli/settings.json`
   should succeed without error).
2. Confirm `model` is unchanged from before your edit — quote the value before and after, they must
   match.
3. Confirm the new entries are present alongside everything that was already there — quote the full
   `permissions.allow` array, before and after.

## Report format

Write `project-docs/reports/011_REPORT.md` with: the before/after `permissions.allow` arrays (quoted
in full, not summarized), confirmation `model` is unchanged, and the `jq` validation result. Commit
and push to `agent/antigravity-011`. This task touches no application code, so no `pnpm build` needed
— but do append one line to `project-docs/BUILD_LOG.md` as usual.
