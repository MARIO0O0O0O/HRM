# Task 008: Preview panel component + PAGA Center hub tile

**Prerequisite:** Task 007 (sidebar shell) merged. Check `BUILD_LOG.md` first.

## Scope — two related, small pieces

### Part A: Preview panel component
- New component: `src/components/programs/PreviewPanel.tsx` — a modal or slide-over (your choice,
  pick whichever fits the existing component library with least new dependency)
- Takes a program summary (reuse the shape already used by `getProgram()` in
  `src/lib/airtable/server.ts`) and renders: title, 2-3 sentence description, 1-2 key figures, a
  "View Full Program" button linking to the full hub page
- Wire ONE sidebar entry to actually open it: "Harassment Prevention" (the only spoke with real data
  and a real full page right now)

### Part B: PAGA Center hub tile
- On the homepage, add or update a tile/section for "PAGA Center" that embeds the existing PAGA
  calculator (`/paga-calculator`'s calculator component) inline, not just a link to it
- Include education content already established: what PAGA is, and the reform framing — **exact
  language required: reasonable-steps caps are 15% (pre-notice) and 30% (post-notice cure) under AB
  2288/SB 92. Never phrase this as "an 85% cap."**

## Do not build yet
Other hub tiles (AI Automation, Blog, About, Contact) — separate task. Other sidebar entries' preview
content — only Harassment Prevention needs to work end-to-end in this task.

## Verification

1. `pnpm build` clean
2. Click Harassment Prevention in the sidebar → preview panel opens with real content → "View Full
   Program" goes to the actual existing hub page — describe this flow working end to end
3. `grep -rn "85%" src/app/page.tsx` — expected: empty, or if present, confirm it's not describing the
   PAGA cap incorrectly
4. PAGA calculator embedded on homepage actually calculates (not just visually present)

## Report format

`project-docs/reports/008_REPORT.md` — all 4 verification points with specifics, build output. Commit,
push to `agent/[tool]-008`, append to `BUILD_LOG.md`.
