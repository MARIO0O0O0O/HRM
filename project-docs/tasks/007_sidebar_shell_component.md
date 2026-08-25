# Task 007: Persistent sidebar shell component (structure only, no content yet)

**Prerequisite:** Tasks 001-002 merged (confirmed as of this task's writing — check
`project-docs/BUILD_LOG.md` to be sure before starting, don't assume).

## Scope

Build ONLY the sidebar shell component — the persistent, collapsible navigation panel — with no real
spoke content yet (placeholder entries are fine). This is structure/plumbing, a foundation the next
tasks build on, not the full feature.

- New component: `src/components/layout/Sidebar.tsx`
- Persists across the whole site (rendered from `src/app/layout.tsx`, alongside the existing
  `Header`/`Footer`)
- Collapsible on mobile using the same hamburger/Sheet mechanism already in `Header.tsx` — reuse the
  pattern, don't build a second one
- 4 category groups, each a labeled section: Safety & Prevention, Wage & Hour, Lifecycle Admin,
  Specialized
- Placeholder entries under Safety & Prevention only for now: "Harassment Prevention" (link to the
  existing `/programs/harassment-prevention`), "Workplace Violence Prevention" (placeholder link, page
  doesn't exist yet), "Injury & Illness Prevention" (placeholder link). Other 3 categories can each
  have one "Coming Soon" placeholder row.

## Do not build yet (later tasks)
- The preview modal/panel (Task 008)
- Any new spoke pages
- Removing or changing the existing `/programs` index page

## Verification

1. `pnpm install --frozen-lockfile && pnpm build` clean (see `CLAUDE.md` for the shared-node_modules
   fallback if you hit `ERR_PNPM_UNSAFE_MODULES_DIR`)
2. Sidebar renders and is genuinely persistent — spot check by describing what you see on at least 3
   different routes (e.g., homepage, `/tools`, `/programs/harassment-prevention`)
3. Mobile collapse/expand actually works (describe how you verified, since this may not be checkable
   by grep alone — describe the interaction or component state logic you verified)

## Report format

`project-docs/reports/007_REPORT.md` — confirmation of all 3 verification points, build output, and a
plain description of what the sidebar looks like/contains. Commit, push to `agent/[tool]-007`, append
to `BUILD_LOG.md`.
