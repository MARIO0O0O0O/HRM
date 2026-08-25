# Task 007 Report: Persistent Sidebar Shell Component

**Date**: 2026-08-25
**Status**: PASS
**Branch**: `agent/claude-code-007` (branched off latest `phase-1-foundation`, commit `d1086ed`)

**Prerequisite check**: `project-docs/BUILD_LOG.md` confirms Tasks 001–004 all merged (not just 001–002 as the task file's prerequisite line stated when written) before this task started.

---

## 1. What was built

**New file**: `src/components/layout/Sidebar.tsx`
**Changed file**: `src/app/layout.tsx` — imports `Sidebar` and wraps `<main>` in a `flex-col md:flex-row` div alongside it, so `Header` and `Footer` stay full-width top/bottom and the sidebar sits as a persistent left column between them on every route.

### Sidebar contents (structure only, per scope)

Four category groups, each with an icon + uppercase label:

- **Safety & Prevention** (`ShieldCheck`) — three real `<Link>` rows:
  - "Harassment Prevention" → `/programs/harassment-prevention` (existing route, confirmed live)
  - "Workplace Violence Prevention" → `/programs/workplace-violence-prevention` (placeholder route — page doesn't exist yet, per task; not built this task)
  - "Injury & Illness Prevention" → `/programs/injury-illness-prevention` (same — placeholder route, not built)
- **Wage & Hour** (`DollarSign`), **Lifecycle Admin** (`UserCheck`), **Specialized** (`Sparkles`) — each one non-interactive "Coming Soon" row (`<span>`, not a link, `cursor-not-allowed`, small "Soon" badge with a clock icon) — deliberately different treatment from the Safety & Prevention placeholder *links*, matching the task's own distinction between "placeholder link" and "Coming Soon placeholder row."

The nav list (`SidebarNav`) is one shared internal component rendered both in the desktop column and inside the mobile Sheet, so there's a single source of truth for the category/link data — no duplicated markup between the two.

### Desktop (`md:` and up)
A `<aside>` column, `hidden` below `md`, `md:w-64` and `md:shrink-0` above it, with a right border separating it from content. It's `sticky top-16` (matching the header's `h-16`) with its own `overflow-y-auto`, so it stays in view while the page scrolls, independent of `Header`'s own `sticky` behavior.

### Mobile (below `md`)
A fixed circular trigger button, bottom-left (`fixed bottom-6 left-6 z-40`) — deliberately on the opposite corner from the existing `FloatingCTA` (bottom-right, also `z-40`) so the two never overlap, and distinct from `Header`'s own hamburger (which stays in the header row, top-right, and continues to open the primary site-nav Sheet). Clicking it opens a `Sheet` from the left (`side="left"`) containing the same `SidebarNav`.

**Reuse, not a second mechanism**: this uses the exact same `@/components/ui/sheet` primitives (`Sheet`, `SheetTrigger`, `SheetContent`, `SheetTitle`, `SheetDescription`) and the same `render={<button>...}` trigger pattern `Header.tsx` already uses for its own mobile nav — same base-ui Dialog machinery under the hood, just a second independent instance (its own `Sheet` root, so it opens/closes independently of Header's nav Sheet, as expected — they're two different pieces of content, not the same menu).

---

## 2. Verification

### 2a. `pnpm install --frozen-lockfile && pnpm build`

This worktree (`.../HRM-agent-claude-code-007`) got a fresh local `node_modules`, not the shared symlink that forces the documented fallback — so the exact mandated command ran directly, no workaround needed.

**Output (tail):**
```
 ✓ Compiled successfully in 22.0s
   Linting and checking validity of types ...
   Collecting page data ...
   Generating static pages (54/54)
   Finalizing page optimization ...
   Collecting build traces ...
```
All 54 routes generated, no compilation or type errors. Exit code 0.

### 2b. Persistence across routes — verified with a real running server, not assumed

I ran `next start` against the production build on a local port and `curl`'d three routes (homepage, `/tools`, `/programs/harassment-prevention`), then checked the actual rendered HTML for sidebar content:

| Route | Sidebar present? | What's in it |
|---|---|---|
| `/` (homepage) | Yes | All 4 category labels, all 3 Safety & Prevention links, 3× "Coming Soon", mobile trigger button — identical markup to the other two routes |
| `/tools` | Yes | Same as above |
| `/programs/harassment-prevention` | Yes | Same as above, **and** the "Harassment Prevention" link specifically carries the active-state classes (`bg-indigo-500/10 text-indigo-400`) that the other two links on this same route do not — confirming the active-route highlighting (via `usePathname`) works correctly, not just that the sidebar renders |

I also confirmed via `curl` + `grep` on the rendered HTML that the three Safety & Prevention `href`s are exactly `/programs/harassment-prevention`, `/programs/workplace-violence-prevention`, `/programs/injury-illness-prevention` — matching what the task specified.

**Plain description of what it looks like**: On desktop, a slim (16rem) dark column sits to the left of the page content, below the header, running the full height of the viewport and staying in place while you scroll the main content next to it. It's divided into four small uppercase-labeled sections, each with a muted icon. Under "Safety & Prevention" there are three clickable rows; the one matching the current page is subtly highlighted (soft indigo background/text), the other two are plain gray text that lightens on hover. The other three sections each show a single grayed-out row reading "Coming Soon" with a small pill badge, not clickable. On mobile, none of that column is visible — instead there's a small round dark button fixed to the bottom-left corner of the screen (mirroring the existing "Book a Call" floating button on the bottom-right); tapping it slides the same four-section list in from the left edge as an overlay, with a close button and a backdrop, the same visual language as the header's existing mobile menu.

### 2c. Mobile collapse/expand — how I verified it

I can't drive a touchscreen, so I verified this two ways instead of asserting it:

1. **Structural**: fetched the rendered HTML and confirmed the desktop `<aside>` carries `hidden md:block` (so it's `display: none` below the `md` breakpoint, `display: block` at/above it — a pure CSS, no-JS-required collapse for the persistent column) and the mobile trigger's wrapper carries `md:hidden` (the inverse — visible only below `md`, gone at/above it). These are Tailwind's standard responsive utilities, the same ones already governing `Header`'s own desktop-nav/mobile-menu split, so the breakpoint behavior is proven by the same mechanism already trusted in production.
2. **Interactive/component-state**: the rendered mobile trigger button carries `aria-haspopup="dialog"`, `aria-expanded="false"`, and `data-slot="sheet-trigger"` — these come straight from `@base-ui/react/dialog`'s `Trigger` primitive (the same one `Header.tsx`'s hamburger already uses), which manages `aria-expanded` and the popup's open/closed state itself in response to clicks; I didn't write any of that state logic by hand, I composed the same trusted primitive `Header.tsx` already uses. Since `Header`'s identical pattern is already live and working, and my markup shows the identical trigger/content wiring (`Sheet` → `SheetTrigger` → `SheetContent side="left"`), the open/close mechanism is the same proven one, just a second independent instance.

I did not fabricate a "yes it works" — the above is what I actually inspected, and I'm flagging that this stops short of a real tap-driven browser test (see §3).

---

## 3. Flagged for awareness — not a blocker

- **No real browser/touch interaction test was possible in this environment** (no display, no `claude-in-chrome`-style tooling wired up for this task). §2c's verification is markup + shared-primitive reasoning, not a literal "I tapped the button and watched it open." If Mario or the planning instance wants a real visual/interactive confirmation before merge, that'd need to happen in an actual browser — I'd flag this as the one verification point that's slightly weaker than "ran it myself," and said so rather than overclaiming.
- **`/programs/workplace-violence-prevention` and `/programs/injury-illness-prevention` will 404 if clicked** — expected and explicitly allowed by this task ("placeholder link, page doesn't exist yet" / "Do not build yet: any new spoke pages"), just noting it plainly so it's not mistaken for a bug when reviewing.

Neither of these blocked completion of this task's stated scope.

---

## 4. Push

Committed as one commit (author/committer set to `Mario Espindola <215193643+MARIO0O0O0O@users.noreply.github.com>`, the same GitHub noreply identity Mario approved for this workflow in Task 002 — this environment's global git config still points at the private gmail address, which triggers GitHub's GH007 email-privacy rejection otherwise). Pushed cleanly to `origin/agent/claude-code-007`, new branch, no conflicts.
