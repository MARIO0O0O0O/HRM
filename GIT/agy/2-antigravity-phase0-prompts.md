# Antigravity Phase 0 Prompts
> Paste each prompt into Antigravity Agent Manager in **Planning mode**.
> Use Review-driven development. Commit after each block. Stop after handoff.

---

## GLOBAL GEMINI.md
Save this file to `C:\Users\<YourUsername>\.gemini\GEMINI.md` before starting any session.
Antigravity reads this file automatically for every project.

```md
# GEMINI.md — HRM SaaS Project Rules

## Identity
You are a senior SaaS engineer building an HR Compliance SaaS for small businesses.
Owner: M.E. | MPA | 10+ yrs California public sector HR | AI Automation Specialist.
Repo: https://github.com/mario0o0o0o/HRM.git
Local path: C:\Users\<YourUsername>\Documents\HRM\GIT\HRM
Device: Windows 10/11 (x64)

## Stack
- Frontend: Next.js 15 + React 19 + TypeScript + App Router
- UI: Tailwind CSS 4 + shadcn/ui (all MIT)
- Backend: Supabase project zteebziywhoglccgdxxn
- Payments: Stripe primary, Venmo @marioo00, Cash App 10mario01, Zelle 626-999-6239
- Hosting: Vercel
- IDE: Google Antigravity

## Hard rules
1. All libraries must use MIT, Apache-2.0, or BSD licenses. No GPL/AGPL/SSPL.
2. Never store secrets in client code. Use .env.local and Vercel env dashboard.
3. Components in /src/components, pages in /src/app.
4. Every block ends with: git add . && git commit -m "<block-id>: <description>" && git push origin <branch>
5. Always TypeScript. No `any` without justification.
6. Every new page or component requires a test in /src/__tests__/.
7. Block naming: P<phase>of6-B<block>of<total><SHORT-NAME>

## Personas
- [PLANNER] — planning only, no code edits
- [DEV] — code changes and refactors
- [REVIEWER] — reviews diffs, enforces standards
- [TESTER] — runs tests, reports pass/fail
- [DOCS] — writes and updates documentation
- [RESEARCH] — gathers licensing and tooling facts

## Payment rules
- Stripe is the primary CTA.
- Never fabricate Venmo/Cash App/Zelle deep links.
- Render unverified handles as labeled copyable text only.
```

---

## Workspace ANTIGRAVITY-RULES.md
Save to `.agents/rules/hrm-standards.md` inside the repo root.

```md
- Use TypeScript for all files. No JavaScript files in src/.
- Use App Router patterns only. No Pages Router.
- All components must be accessible: aria labels, keyboard navigation, 44px touch targets.
- Dark theme: background #0a0a0a, surface #111111, primary #6366f1, accent #06b6d4.
- Never hardcode secrets. Use environment variables only.
- All Supabase queries must go through server components or API routes.
- RLS must be enabled on every Supabase table before it enters production.
- Stripe secret key is server-side only, never in client bundle.
- Every commit message must begin with the block ID.
```

---

## WORKFLOW: /implement-block
Save to `.agents/workflows/implement-block.md`

```md
Implement the building block described below.
1. Read GEMINI.md and .agents/rules/ for full context.
2. Switch to the specified branch.
3. Implement all tasks listed for this block.
4. Write tests in /src/__tests__/<block-id>.test.ts.
5. Run: pnpm lint && pnpm test && pnpm build.
6. If all pass: git add . && git commit -m "<block-id>: <goal>" && git push origin <branch>.
7. Report pass/fail and any issues.
```

---

## WORKFLOW: /review-block
Save to `.agents/workflows/review-block.md`

```md
Review the diff for the specified building block.
Check: TypeScript types, license compliance, no secrets in client, test coverage,
naming convention compliance, accessibility basics, payment display rules.
Output: PASS or FAIL with specific line-level feedback.
```

---

## WORKFLOW: /test-block
Save to `.agents/workflows/test-block.md`

```md
Run the full test suite for the specified building block.
Commands: pnpm lint && pnpm test && pnpm build
Optional: pnpm dlx lighthouse-ci if routes are live.
Report each command result, overall PASS/FAIL, and any errors to fix.
```

---

## PROMPT 1 — P06-B15TEAM-AGENTS
> Mode: Planning | Branch: phase-0-preflight

```
[PLANNER] Implement building block P06-B15TEAM-AGENTS.

Environment: Windows 10/11, repo at C:\Users\<YourUsername>\Documents\HRM\GIT\HRM

Tasks:
1. Detect and document environment: OS version, Node version, Python version,
   pnpm version, git version, available storage, Windows-specific constraints.
   Save to docs/env-summary-phase0.md.

2. Install Aider (pip install aider-chat). Verify with: aider --help.
   Log to docs/tools-install-log.txt.

3. Evaluate Cline. Cline is a VS Code extension. Document that Antigravity is
   built on VS Code foundation and test whether the Cline extension installs and
   runs inside Antigravity's editor. Log result to docs/tools-install-log.txt.

4. Install Goose CLI (follow official install for Windows).
   Verify it can access the local repo and run shell commands.
   Log to docs/tools-install-log.txt.

5. Install three additional terminal-friendly AI CLIs suitable for Windows:
   - GitHub CLI (gh): winget install GitHub.cli — used for PR automation and repo ops.
   - Stripe CLI: install from stripe.com/docs/stripe-cli — used for webhook testing.
   - Vercel CLI: pnpm add -g vercel — used for deployment and preview URL generation.
   Verify each with a help or version command.
   Log all results to docs/tools-install-log.txt.

6. Create docs/gemini-personas.md with these six personas, each documenting:
   purpose, allowed actions, preferred tools, expected inputs, expected outputs,
   invocation prefix convention:
   - GEMINI-PLANNER
   - GEMINI-DEV
   - GEMINI-REVIEWER
   - GEMINI-TESTER
   - GEMINI-DOCS
   - GEMINI-RESEARCH

7. Create docs/phase0-status.json with every Phase 0 block as pending/completed/blocked.

8. Create docs/phase0-summary.md with installed tools, limitations, and handoff rule.

Git:
- Create branch phase-0-preflight.
- Commit with message: P06-B15TEAM-AGENTS: install toolchain and define Gemini personas
- Push to origin phase-0-preflight.

Pass criteria: all tools verified, docs committed, branch pushed.
```

---

## PROMPT 2 — P06-B25ORCH-FLOW
> Mode: Planning | Branch: phase-0-preflight

```
[PLANNER] Implement building block P06-B25ORCH-FLOW.

Tasks:
1. Create docs/orchestration.md defining:
   - Planner -> Worker -> Reviewer -> Tester workflow.
   - Rule: no coding without a block ID and explicit instructions.
   - Parallelization rule: independent blocks may run simultaneously;
     dependent blocks wait for status file confirmation.
   - Gemini persona invocation by prefix tags.

2. Create recipes/ directory with four YAML files.
   Each file must accept these parameters:
   block_id, short_description, input_files, expected_outputs, allowed_tools.

   recipes/plan-block.yaml — outlines what a planner does for a block.
   recipes/implement-block.yaml — outlines what a coder does for a block.
   recipes/review-block.yaml — outlines what a reviewer checks.
   recipes/test-block.yaml — outlines what a tester runs and reports.

3. Perform a dry-run using a dummy block named P00-B00DUMMY-TEST.
   Confirm that each recipe creates its expected placeholder outputs.
   Write results to docs/orchestration-test-log.md.

Git:
- Commit: P06-B25ORCH-FLOW: add orchestration rules and recipe templates
- Push to origin phase-0-preflight.

Pass criteria: all four recipe files present, dry-run log written, committed and pushed.
```

---

## PROMPT 3 — P06-B35ENV-SETUP
> Mode: Planning | Branch: phase-0-preflight

```
[DEV] Implement building block P06-B35ENV-SETUP.

Tasks:
1. Confirm Antigravity can open the repo workspace at:
   C:\Users\<YourUsername>\Documents\HRM\GIT\HRM

2. Verify Node LTS is installed: node --version (must be 20.x or 22.x LTS).
   Verify pnpm is installed: pnpm --version.
   If pnpm is not installed: npm install -g pnpm.

3. Scaffold the Next.js app if not already present:
   pnpm dlx create-next-app@latest . --typescript --app --eslint --tailwind --src-dir --import-alias "@/*"
   Use the existing directory. Do not create a subdirectory.

4. Add these baseline config files:
   .editorconfig — indent_size=2, charset=utf-8, end_of_line=lf.
   .prettierrc — printWidth:100, singleQuote:true, trailingComma:all, semi:false.
   eslint config — extend Next.js defaults, add no-hardcoded-credentials rule.
   next.config.ts — minimal, include reactStrictMode:true.

5. Install shadcn/ui: pnpm dlx shadcn@latest init — select dark theme, slate base.

6. Create a minimal placeholder landing page at src/app/page.tsx with:
   - Dark background (#0a0a0a).
   - Centered heading: "HR Expertise. Labor Law Compliance. AI-Powered for Small Business."
   - Subheading: "Coming soon — M.E. HR Solutions"

7. Update docs/env-summary-phase0.md with all setup details.

Tests:
- Run pnpm lint — must pass with zero errors.
- Run pnpm dev — dev server must start on localhost:3000.
- Use Antigravity browser agent to navigate to localhost:3000 and confirm page renders.
- Record browser verification screenshot.

Git:
- Commit: P06-B35ENV-SETUP: scaffold Next.js app with dark theme placeholder
- Push to origin phase-0-preflight.
```

---

## PROMPT 4 — P06-B45CFG-GIT-SUPA-VERCEL-STRIPE
> Mode: Planning | Branch: phase-0-preflight

```
[DEV] Implement building block P06-B45CFG-GIT-SUPA-VERCEL-STRIPE.

Tasks:
1. Git:
   - Run: git remote -v and confirm origin is https://github.com/mario0o0o0o/HRM.git
   - If not: git remote set-url origin https://github.com/mario0o0o0o/HRM.git
   - Run: gh auth login and authenticate with GitHub.
   - Confirm user.name and user.email are set.

2. Supabase:
   - Install: pnpm add @supabase/supabase-js @supabase/ssr
   - Create src/lib/supabase/client.ts — browser client using NEXT_PUBLIC env vars.
   - Create src/lib/supabase/server.ts — server client using SUPABASE_SERVICE_ROLE_KEY.
   - Create .env.local with placeholders:
     NEXT_PUBLIC_SUPABASE_URL=https://zteebziywhoglccgdxxn.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=REPLACE_WITH_ANON_KEY
     SUPABASE_SERVICE_ROLE_KEY=REPLACE_WITH_SERVICE_ROLE_KEY
   - Add .env.local to .gitignore immediately.

3. Stripe:
   - Install: pnpm add stripe @stripe/stripe-js
   - Create src/lib/stripe/client.ts — exports loadStripe() with publishable key only.
   - Create src/lib/stripe/server.ts — exports Stripe instance using STRIPE_SECRET_KEY.
   - Add placeholders to .env.local:
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=REPLACE_WITH_PUBLISHABLE_KEY
     STRIPE_SECRET_KEY=REPLACE_WITH_SECRET_KEY
     STRIPE_WEBHOOK_SECRET=REPLACE_WITH_WEBHOOK_SECRET
   - Create src/app/api/stripe/checkout/route.ts — stub for hosted checkout session.

4. Vercel:
   - Create vercel.json:
     { "framework": "nextjs", "buildCommand": "pnpm build", "outputDirectory": ".next" }
   - Run: vercel login — authenticate with Vercel account.
   - Run: vercel link — link local repo to Vercel project (create new if needed).

5. Payment display section:
   - Create src/components/payments/PaymentOptions.tsx
   - Stripe: primary button "Pay with Card" linking to Stripe Checkout.
   - Secondary section with three labeled cards:
     Venmo: display "@marioo00" as copyable text. Link to venmo.com/u/marioo00
     Cash App: display "$10mario01" as copyable text. Link to cash.app/$10mario01
     Zelle: display "626-999-6239" as copyable text with note "Send via your bank app."
   - Include a note: "Stripe is our primary processor. Peer-to-peer options are for
     clients who prefer mobile payment apps."

6. Update docs/env-summary-phase0.md with all configuration details.

Tests:
- Confirm pnpm build succeeds.
- Confirm vercel deploy --prebuilt runs or vercel preview generates a URL.
- Use browser agent to load the preview URL and verify payment section renders.
- Confirm no secrets appear in browser source code.

Git:
- Commit: P06-B45CFG-GIT-SUPA-VERCEL-STRIPE: configure integrations and payment display
- Push to origin phase-0-preflight.
```

---

## PROMPT 5 — P06-B55RULES-TEST
> Mode: Planning | Branch: phase-0-preflight

```
[DOCS] Implement building block P06-B55RULES-TEST.

Tasks:
1. Create docs/standards.md with these sections:
   - TypeScript and React standards (strict mode, no any, functional components only).
   - Next.js App Router conventions.
   - Security rules (no secrets in client, RLS required, env vars only).
   - License policy (MIT/Apache-2.0/BSD allowed; GPL/AGPL/SSPL rejected).
   - Vercel deployment rules (pnpm build must pass before any deploy).
   - Payment integration rules (Stripe primary, no fabricated links, handles as copyable text).

2. Create docs/prompts.md with four reusable prompt templates:
   - Implement block: [DEV] Implement <block_id>. Goal: <goal>. Branch: <branch>. ...
   - Review block: [REVIEWER] Review diff for <block_id> on <branch>. Check: ...
   - Test block: [TESTER] Run tests for <block_id>. Commands: pnpm lint && pnpm test ...
   - Research tool/license: [RESEARCH] Evaluate <tool_name>. Check: license, S24/Windows
     compatibility, community size, last release date, and recommended use.

3. Install Vitest:
   pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom

4. Add vitest.config.ts:
   import { defineConfig } from 'vitest/config'
   import react from '@vitejs/plugin-react'
   export default defineConfig({ plugins: [react()], test: { environment: 'jsdom' } })

5. Add "test": "vitest run" script to package.json.

6. Create src/__tests__/placeholder.test.ts:
   import { describe, it, expect } from 'vitest'
   describe('Phase 0 smoke test', () => {
     it('passes baseline check', () => { expect(true).toBe(true) })
   })

7. Update docs/phase0-status.json — mark all blocks completed or blocked with reasons.
8. Update docs/phase0-summary.md with final summary and Phase 1 handoff note.

Tests:
- Run pnpm lint — zero errors.
- Run pnpm test — at least one test passes.

Git:
- Commit: P06-B55RULES-TEST: add standards, prompts, and baseline test framework
- Push to origin phase-0-preflight.
```

---

## PROMPT 6 — Phase 0 Handoff
> Mode: Fast

```
[DOCS] Perform final Phase 0 closeout.

1. Update docs/phase0-status.json so every P06 block is marked completed or blocked.
2. Finalize docs/phase0-summary.md with:
   - installed tools and versions
   - any limitations found
   - Gemini persona definitions summary
   - orchestration model summary
   - payment integration summary
   - Phase 1 handoff note
3. Write this handoff statement in docs/phase0-summary.md:

   "Phase 0 is complete. From Phase 1 onward, Goose is the primary planner and
   orchestrator. Antigravity continues to execute all code and tests. Gemini personas
   are only invoked when a planner or Goose workflow explicitly calls them with a
   block ID. The primary stack is Next.js on Vercel. Stripe is the primary payment
   processor. Venmo, Cash App, and Zelle are secondary support options."

4. Do not implement Phase 1.

Git:
- Commit: P06-HANDOFF: finalize Phase 0 and prepare for Goose handoff
- Push to origin phase-0-preflight.
- Open a pull request from phase-0-preflight to main on GitHub.
```
