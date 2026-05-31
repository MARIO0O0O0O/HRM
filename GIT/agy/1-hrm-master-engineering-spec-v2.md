# HRM SaaS — Master Engineering Specification v2.0
> Platform: Google Antigravity (Windows 10/11) | Revised: 2026-05-28

---

## 1. Overview

This specification governs the full build of the HRM SaaS — an HR Compliance hub for small
businesses in the San Gabriel Valley and greater California. The frontend is **Next.js + React
deployed on Vercel**, backed by **Supabase**, with **Stripe** as the primary payment processor
and Venmo / Cash App / Zelle as secondary options. The IDE and agent orchestration platform is
**Google Antigravity on Windows**.

**The build is broken into 6 phases and 22 building blocks.** Phase 0 is executed exclusively
inside Antigravity before Goose takes the helm for Phases 1–5.

---

## 2. Architecture

| Layer            | Technology                                   | License      |
|-----------------|----------------------------------------------|-------------|
| Frontend         | Next.js 15 + React 19 + TypeScript           | MIT          |
| Styling          | Tailwind CSS 4 + shadcn/ui                   | MIT          |
| Backend          | Supabase (project: zteebziywhoglccgdxxn)      | Apache-2.0   |
| Auth             | Supabase Auth (email + OAuth)                | Apache-2.0   |
| Payments         | Stripe Checkout + secondary handles          | Proprietary API |
| Hosting          | Vercel (primary)                             | Proprietary  |
| Source control   | GitHub → mario0o0o0o/HRM.git                 | —            |
| IDE / Agents     | Google Antigravity (Windows)                 | Free preview |
| LLM in-app       | Gemini API (server-side only)                | Apache-2.0   |

---

## 3. Development environment — Windows

> **The Samsung S24 Ultra is NO LONGER the development device.**
> All paths, tooling, and shell commands now target **Windows 10/11 (x64)**.

### 3.1 Local repo path
```
C:\Users\<YourUsername>\Documents\HRM\GIT\HRM
```
Replace `<YourUsername>` with your actual Windows username.

### 3.2 Required software — install in this order
1. **Git for Windows** — `winget install Git.Git`
2. **Node.js LTS** — `winget install OpenJS.NodeJS.LTS`
3. **pnpm** — `npm install -g pnpm`
4. **Google Antigravity** — download from `antigravity.google/download`
5. **Chrome** — required for Antigravity browser agent
6. **Antigravity Chrome extension** — installed on first browser task
7. **GitHub CLI** — `winget install GitHub.cli`
8. **Vercel CLI** — `pnpm add -g vercel`
9. **Supabase CLI** — `winget install Supabase.CLI` or `pnpm add -g supabase`
10. **Stripe CLI** — download from `stripe.com/docs/stripe-cli`

### 3.3 Remote repo
```
https://github.com/mario0o0o0o/HRM.git
```

---

## 4. Antigravity first-time setup (Windows)

### 4.1 Installation
1. Download installer from `antigravity.google/download` — select Windows x64.
2. Run installer, launch Antigravity.
3. On setup screen choose **Review-driven development** (recommended).
4. Import VS Code settings if desired, or start fresh with dark theme.
5. Sign in with personal Gmail account.
6. Install Antigravity CLI shortcut: select `agy` during Command Line setup step.
7. Click through Terms of Use.

### 4.2 Autonomy mode recommendation
Use **Review-driven development** for all production repo work:
- Terminal Execution policy → **Request Review**
- Artifact Review policy → **Asks for Review**
- JavaScript Execution policy → **Request Review**

### 4.3 Permissions — Allow list (add in Settings → Agent → Permissions)
```
command(git)
command(pnpm)
command(node)
command(vercel)
command(supabase)
command(stripe)
command(gh)
command(ls)
command(dir)
command(mkdir)
command(echo)
```

### 4.4 Permissions — Deny list
```
command(rm -rf)
command(del /f /s)
command(format)
command(curl | sh)
command(Invoke-Expression)
```

### 4.5 Browser URL allowlist
```
localhost
github.com
vercel.com
supabase.com
stripe.com
app.supabase.com
dashboard.stripe.com
antigravity.google
```

---

## 5. API keys and secrets required

| Service        | Key type                       | Where to add                                    |
|---------------|--------------------------------|-------------------------------------------------|
| Supabase       | NEXT_PUBLIC_SUPABASE_URL       | `.env.local` + Vercel env dashboard             |
| Supabase       | NEXT_PUBLIC_SUPABASE_ANON_KEY  | `.env.local` + Vercel env dashboard             |
| Supabase       | SUPABASE_SERVICE_ROLE_KEY      | Vercel env dashboard (server-side only, never client) |
| Stripe         | NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | `.env.local` + Vercel env dashboard         |
| Stripe         | STRIPE_SECRET_KEY              | Vercel env dashboard (server-side only)         |
| Stripe         | STRIPE_WEBHOOK_SECRET          | Vercel env dashboard (server-side only)         |
| GitHub         | Personal Access Token (PAT)    | Git credential manager or `gh auth login`       |
| Vercel         | VERCEL_TOKEN                   | Vercel CLI login / dashboard                    |
| Gemini API     | GEMINI_API_KEY                 | Vercel env dashboard (server-side only)         |
| Google OAuth   | GOOGLE_CLIENT_ID + SECRET      | Supabase Auth dashboard + `.env.local`          |

> **Rule: Never hardcode any secret. Never commit `.env.local` to git.**
> Add `.env.local` to `.gitignore` before first commit.

---

## 6. Antigravity optimization strategy

### 6.1 Global GEMINI.md rule file
Location: `C:\Users\<YourUsername>\.gemini\GEMINI.md`

This file is read by every agent session and enforces project standards automatically.
See Artifact 2 (Phase 0 Prompts) for the complete GEMINI.md content to paste.

### 6.2 Global skills
Location: `C:\Users\<YourUsername>\.gemini\antigravity\skills\`

Install these skills globally so they are available across all workspaces:
- `code-review` — enforces HR SaaS code quality checklist
- `license-checker` — validates MIT/Apache-2.0/BSD licenses before any new dependency
- `security-audit` — checks for exposed secrets, missing RLS, insecure headers

### 6.3 Workspace skills
Location: `C:\Users\<YourUsername>\Documents\HRM\GIT\HRM\.agents\skills\`

Install these per-workspace skills for the HRM project:
- `supabase-rls` — generates and audits row-level security policies
- `stripe-safety` — validates Stripe integration for Next.js best practices
- `deploy-vercel` — step-by-step Vercel deployment and env-var validation workflow
- `payment-display` — rules for safe display of Venmo/Cash App/Zelle handles

### 6.4 Workspace workflows
Location: `C:\Users\<YourUsername>\Documents\HRM\GIT\HRM\.agents\workflows\`

- `implement-block.md` — triggered with `/implement-block`, runs a full building block
- `review-block.md` — triggered with `/review-block`, reviews diffs against standards
- `test-block.md` — triggered with `/test-block`, runs lint + tests + Lighthouse
- `generate-blog-post.md` — triggered with `/generate-blog-post`, drafts content
- `generate-hr-doc.md` — triggered with `/generate-hr-doc`, drafts HR policy documents

### 6.5 MCP servers to connect
In Antigravity Editor → `...` → MCP Servers, install:
- **GitHub MCP** — one-click install from MCP store for repo operations
- **Supabase MCP** — allows agent to read schema and run queries (read-only recommended)
- **Stripe MCP** — allows agent to inspect products, prices, and webhook events
- **Filesystem MCP** — for cross-workspace file operations when needed

---

## 7. Phase structure and ownership

| Phase | Name                          | Owner         | Blocks |
|-------|-------------------------------|---------------|--------|
| P0    | Preflight                     | Antigravity   | 5      |
| P1    | Foundation Build              | Antigravity/Goose | 4  |
| P2    | UX, Branding, and Content     | Antigravity/Goose | 5  |
| P3    | SEO, Security, and Legal      | Antigravity/Goose | 4  |
| P4    | Gemini Canvas Integration     | Antigravity/Goose | 4  |
| P5    | Launch and Hardening          | Antigravity/Goose | 3  |
| **Total** |                           |               | **25** |

> Phases 1–5 are orchestrated by Goose but executed inside Antigravity. Gemini personas are
> invoked only through explicit block recipes.

---

## 8. Phase 0 blocks — Antigravity executes, no Goose yet

### P06-B15TEAM-AGENTS
- Install and verify: Aider, Cline feasibility, Goose, GitHub CLI, Stripe CLI
- Define Gemini personas in `docs/gemini-personas.md`
- Record environment in `docs/env-summary-phase0.md`
- Create `docs/tools-install-log.txt`
- Create `docs/phase0-status.json`

### P06-B25ORCH-FLOW
- Write `docs/orchestration.md`
- Create `recipes/` with plan, implement, review, test YAML files
- Dry-run with dummy block and write `docs/orchestration-test-log.md`

### P06-B35ENV-SETUP
- Confirm repo opens in Antigravity at `C:\Users\<YourUsername>\Documents\HRM\GIT\HRM`
- Install Node LTS, pnpm, scaffold Next.js app (TypeScript, App Router, ESLint, Prettier)
- Add `.editorconfig`, baseline config files
- Verify `pnpm lint` and `pnpm dev` pass

### P06-B45CFG-GIT-SUPA-VERCEL-STRIPE
- Verify git origin, user.name, user.email
- Add Supabase JS client, env-only config
- Add Stripe SDK, placeholder env vars, minimal checkout scaffold
- Add Vercel config, `vercel.json`
- Add branded payment section: Stripe primary CTA + safe secondary handles
  - Venmo: @marioo00
  - Cash App: 10mario01
  - Zelle: 626-999-6239
- Update `docs/env-summary-phase0.md`

### P06-B55RULES-TEST
- Create `docs/standards.md` and `docs/prompts.md`
- Add Vitest (MIT) framework and at least one passing test
- Update `docs/phase0-status.json` and `docs/phase0-summary.md`
- Write Phase 1 handoff note and stop

---

## 9. Phase 1 — Foundation Build

### P16-B14APP-SCAFFOLD
Routes, layout shell, header, footer, spoke registry.

### P16-B24AUTH-ACCOUNT
Supabase auth, protected routes, profiles table with RLS.

### P16-B34DATA-MODEL
Supabase schema: blog_posts, appointments, categories, tags.

### P16-B44NAV-IA
1-click home, 2-click max navigation, persistent Book a Call CTA.

**Parallel:** P16-B24, P16-B34, P16-B44 after P16-B14 is complete.

---

## 10. Phase 2 — UX, Branding, and Content

### P26-B15THEME-CINEMATIC
Dark theme: background `#0a0a0a`, surface `#111111`, primary `#6366f1`, accent `#06b6d4`.
shadcn/ui cards, framer-motion (MIT) animations, cinematic hero.

### P26-B25BRAND-ASSETS
Logo SVG, slogan, OG image, branding.md.
**Slogan:** *HR Expertise. Labor Law Compliance. AI-Powered for Small Business.*

### P26-B35BLOG-MVP
Supabase-backed blog, ISR (revalidate 3600), TipTap editor (MIT), JSON-LD schema.

### P26-B45LANDING-CRO
Hero, pain points, services grid, bio card, testimonials, blog preview, CTA banner.

**Bio card canonical text:**
> M.E. holds a Master of Public Administration (MPA) and brings over 10 years of California
> public sector HR experience. He is an AI Automation Specialist who augments deep compliance
> expertise with AI tools, delivering large-firm-quality HR services at small-business prices.
> Born into a family of entrepreneurs, M.E. witnessed firsthand the labor compliance challenges
> small business owners face, driving his mission to make expert HR guidance accessible,
> affordable, and AI-powered for small business.

### P26-B55SCHEDULING-PAYMENTS
Cal.com embed (`@calcom/embed-react`, MIT), intake form (react-hook-form + zod, both MIT),
payment presentation with Stripe primary + secondary handles.

**Parallel:** P26-B15 + P26-B25 together; P26-B35 + P26-B45 + P26-B55 after theme stable.

---

## 11. Phase 3 — SEO, Security, and Legal

### P36-B14SEO-HYBRID
next-sitemap (MIT), next-seo (MIT), JSON-LD LocalBusiness schema, ISR, Core Web Vitals.

### P36-B24SECURITY-HARDENING
CSP headers, Supabase RLS audit, env audit, `npm audit` in CI.

### P36-B34LEGAL-DISCLAIMERS
AI disclaimer, HR consulting disclaimer, CA labor law notice, privacy page (CCPA).

### P36-B44PERF-PWA
next-pwa (MIT), manifest.json, next/image, Lighthouse CI in GitHub Actions.

**Parallel:** P36-B14 + P36-B24 + P36-B34 together; P36-B44 after routes stable.

---

## 12. Phase 4 — Gemini Canvas Integration

### P46-B14CANVAS-ARCH
Server-side Gemini API route, streaming, canvas shell component.

### P46-B24CANVAS-UI
Chat, Document mode (jspdf, MIT), Media mode, HR preset prompts, disclaimer modal.

### P46-B34CANVAS-SECURITY
Upstash rate-limiting (MIT), Zod input validation, prompt injection guard, interaction logging.

### P46-B44CANVAS-DEPLOY
Mobile browser testing, lazy loading, floating canvas trigger, integration tests.

**Parallel:** P46-B24 + P46-B34 after P46-B14 complete.

---

## 13. Phase 5 — Launch and Hardening

### P56-B13BIO-CARD
Bio card component merged if not already in P26-B45.

### P56-B23FINAL-SEO-TEST
Lighthouse ≥85, Google Search Console, end-to-end Playwright tests.

### P56-B33DEPLOY-LAUNCH
Merge all branches, Vercel production, custom domain, `git tag v1.0.0`.

---

## 14. License policy

| Category         | Allowed                       | Rejected                          |
|-----------------|-------------------------------|-----------------------------------|
| Permissive       | MIT, Apache-2.0, BSD-2, BSD-3 | —                                 |
| Copyleft         | —                             | GPL, AGPL, SSPL, LGPL (avoid)     |
| Analytics        | Vercel Analytics (MIT)        | Plausible self-hosted (AGPL)      |
| CMS              | TipTap (MIT), MDX (MIT)       | WordPress (GPL)                   |

---

## 15. Payment display rules

1. Stripe is the primary processed-payment CTA.
2. Venmo, Cash App, Zelle are secondary support options.
3. Never expose secrets in the client.
4. Never fabricate unsupported deep links.
5. Render unverified handles as labeled copyable text with brand icon.
6. Keep all payment UX professional, minimal, and brand-aligned.
