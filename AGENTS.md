# AGENTS.md — Auto-loaded project context for HRM SaaS

## Project
HRM SaaS — HR Compliance platform for California small businesses.
Owner: M.E. | MPA | 10+ yrs public sector HR
Repo: https://github.com/MARIO0O0O0O/HRM.git
Working dir: /data/data/com.termux/files/home/HRM
App name: hrm

## Vercel Details
- Vercel project name: hrai
- Vercel orgId/scope: marios-projects-abca1e48
- Production alias: https://bizhr.vercel.app
- Custom domain: https://bizhr.org (renew at Namecheap)

## Supabase Details
- Supabase URL: https://zteebziywhoglccgdxxn.supabase.co

## Stack
Next.js 15.3.9 + TypeScript + Tailwind + Supabase + Vercel + pnpm 11.4.0 + Node v26.2.0

## Hard rules
1. All files go under src/app or src/components — never root app/
2. No secrets in client code
3. One commit per logical unit. Format: "feat: [what]" or "fix: [what]"
4. Push and confirm Vercel build GREEN before starting next unit
5. Stop and report after every block. Do not auto-proceed.
6. Flag me before any task that could take >4 hours
7. Vercel project is named 'hrai' under scope 'marios-projects-abca1e48'. Always use --scope marios-projects-abca1e48 with Vercel CLI commands.
8. Booking system is Cal.com only. /book page must always render the Cal.com embed at https://cal.com/bizhr. Never replace or modify the booking integration without explicit instruction from M.E.
9. Do not auto-proceed between phases or weeks. Stop and report after every block. Wait for explicit instruction.

## Key paths
- Nav: src/components/layout/Header.tsx
- Book page: src/app/book/page.tsx (Cal.com embed — do not modify)
- Env: .env.local

## See PROJECT.md for all IDs, keys, and URLs.
