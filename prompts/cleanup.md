CLEANUP + PROJECT PROFILE CARD UPDATE

Before anything else, do a full project audit and cleanup.

## Step 1 — Fix Git Remote Auth
Confirm git remote is set correctly:
  git remote -v
If it shows https://github.com/MARIO0O0O0O/HRM.git without a 
token, update it:
  git remote set-url origin https://TOKEN@github.com/MARIO0O0O0O/HRM.git
Replace TOKEN with the value from .env.local or ask me to provide it.

## Step 2 — Push phase-2c to GitHub
  git push origin phase-2c
Confirm the push succeeded before continuing.

## Step 3 — Clean Up HRM Root Directory
Move these stale files out of the project root into archive/:
  - Any .css, .js, .zip files not part of the Next.js project
  - Any .md files with hash-looking names (e.g. 48d46905.md)
  - agy.log
Create: mkdir -p archive/static-site-v1 and move them there.

## Step 4 — Fix .npmrc Warning
The node-linker warning appears on every npm command. Fix it:
  Check .npmrc at ~/HRM/.npmrc
  If node-linker=hoisted is there, confirm it's correct for 
  pnpm + Next.js 15. Document the decision in DECISIONS.md.

## Step 5 — Fix mcp_config.json
The log showed a broken JSON file causing errors on every session:
  echo '{}' > ~/.gemini/config/mcp_config.json

## Step 6 — Booking Rule (HARD RULE — DO NOT CHANGE)
The booking system is Cal.com and must stay Cal.com permanently.
  - Booking URL: https://cal.com/bizhr
  - The /book page uses the Cal.com embed — do not replace it
    with any other booking system at any point in Phase 2C
  - All CTAs that link to booking must point to /book which 
    renders the Cal.com embed
  - Do not install Calendly, SavvyCal, or any other scheduler
  - Add this as a hard rule in AGENTS.md:
    "Booking system is Cal.com only. /book page must always 
    render the Cal.com embed. Never replace or modify the 
    booking integration without explicit instruction from M.E."

## Step 7 — Update PROJECT.md with Correct Values
Replace all outdated values with these confirmed correct ones:

  App name: hrm
  Vercel project name: hrai
  Vercel orgId/scope: marios-projects-abca1e48
  Vercel dashboard: https://vercel.com/marios-projects-abca1e48/hrai
  Production alias: https://bizhr.vercel.app
  Custom domain: https://bizhr.org (renew at Namecheap)
  GitHub repo: https://github.com/MARIO0O0O0O/HRM.git
  Active branch: phase-2c (branched from phase-1-foundation)
  Production branch: phase-1-foundation
  Local path: /data/data/com.termux/files/home/HRM
  Supabase URL: https://zteebziywhoglccgdxxn.supabase.co
  Cal.com booking: https://cal.com/bizhr (permanent — do not change)
  Stack: Next.js 15.3.9 / TypeScript / Tailwind / pnpm 11.4.0 / Node v26.2.0

  Payment handles:
    Venmo: @marioo00
    CashApp: $10mario01
    Zelle: mario_espindola@outlook.com
    Phone: 626-999-6239
    Email: mario_espindola@outlook.com

  Key file paths:
    Homepage: src/app/page.tsx
    Book page: src/app/book/page.tsx (Cal.com embed — do not modify)
    PAGA calculator: src/app/paga-calculator/page.tsx
    Portal: src/app/portal/page.tsx
    Pricing: src/app/pricing/page.tsx
    Layout: src/app/layout.tsx
    Nav: src/components/layout/Header.tsx
    Footer: src/components/layout/Footer.tsx
    Env file: .env.local
    Migrations: supabase/migrations/

  Live routes:
    / → Homepage (CinematicHero)
    /book → Cal.com booking embed (permanent)
    /paga-calculator → PAGA risk calculator
    /portal → Client portal
    /tools → HR toolkits
    /pricing → Pricing
    /blog → Blog
    /resources → Article index (phase-2c, pending merge)

  Rewind commands:
    Restore book page: git checkout stable-pre-calcom -- src/app/book/page.tsx
    Undo last commit: git revert HEAD --no-edit && git push origin phase-1-foundation
    Nuclear reset: git reset --hard stable-pre-calcom && git push origin phase-1-foundation --force

## Step 8 — Update AGENTS.md
Rewrite AGENTS.md with the corrected project values from above.
Remove any references to hrcomply-ai. Add these hard rules:
  1. "Vercel project is named 'hrai' under scope 
     'marios-projects-abca1e48'. Always use --scope 
     marios-projects-abca1e48 with Vercel CLI commands."
  2. "Booking system is Cal.com only. /book page must always 
     render the Cal.com embed at https://cal.com/bizhr. Never 
     replace or modify the booking integration without explicit 
     instruction from M.E."
  3. "Do not auto-proceed between phases or weeks. Stop and 
     report after every block. Wait for explicit instruction."

## Step 9 — Generate Updated Project Profile Card
After all cleanup is done, generate a clean updated PROJECT 
PROFILE CARD in this exact format and save it as 
docs/PROJECT-PROFILE.md:

  # HRM Project Profile
  Generated: [today's date]

  ## Identity
  [table with all confirmed values]

  ## Local Environment
  [table]

  ## Vercel
  [table with correct hrai project details]

  ## Git
  [table with branches, tags, remote]

  ## Supabase
  [table with URL, tables created, RLS status]

  ## Stack
  [table]

  ## Live Routes
  [table — mark /book as "Cal.com embed — permanent"]

  ## Key File Paths
  [table]

  ## Payment / Contact
  [table]

  ## Phase Status
  [table showing Day 0, Week 1 schema, Week 1 routes status]

  ## Hard Rules
  [numbered list of all permanent rules]

  ## Rewind Commands
  [bash block]

## Step 10 — Commit Everything
  git add -A
  git commit -m "chore: cleanup root, update PROJECT.md, AGENTS.md, project profile"
  git push origin phase-2c

Stop and show me the completed PROJECT-PROFILE.md contents 
when done. Do not proceed to any Phase 2C build work.