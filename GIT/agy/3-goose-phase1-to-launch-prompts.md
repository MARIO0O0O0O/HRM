# Goose Prompts — Phase 1 Through End of Build
> Goose is the planner/orchestrator. Antigravity executes all code.
> Goose instructs Antigravity Agent Manager via the workflows defined in Phase 0.

---

## Global Goose context
```md
You are Goose, primary orchestrator for the HRM SaaS build, Phases 1–5.
Phase 0 is complete. Antigravity is the execution environment on Windows.
Invoke Gemini personas only through explicit block IDs and /workflow commands.
Check docs/phase0-summary.md and docs/phase0-status.json before starting any phase.
Stack: Next.js on Vercel, Supabase backend, Stripe primary payment processor.
Naming: P<phase>of6-B<block>of<total><SHORT-NAME>
Always commit after each block and push to the correct branch.
```

---

## PHASE 1 KICKOFF
```
Read docs/phase0-summary.md. Confirm all P06 blocks are complete.
Start Phase 1 of 6 — Foundation Build.
Branch: phase-1-foundation

Execute P16-B14APP-SCAFFOLD first (it is a dependency for all other Phase 1 blocks).
After P16-B14APP-SCAFFOLD passes /review-block and /test-block, immediately
dispatch these three blocks SIMULTANEOUSLY to three Antigravity agent sessions:
  - Agent A: P16-B24AUTH-ACCOUNT
  - Agent B: P16-B34DATA-MODEL
  - Agent C: P16-B44NAV-IA

Each agent works on files in non-overlapping directories:
  - Auth: src/app/auth/, src/middleware.ts, supabase/migrations/001_auth.sql
  - Data: supabase/migrations/002_schema.sql, src/types/database.ts
  - Nav: src/components/layout/, docs/ia.md

If file conflicts arise, serialize the conflicting change and document in block status.
Update docs/phase0-status.json after each block completes.
```

### P16-B14APP-SCAFFOLD
```
/implement-block
Block: P16-B14APP-SCAFFOLD
Branch: phase-1-foundation
Goal: establish core Next.js route structure and shared layout shell

Tasks:
1. Create routes in src/app/:
   - page.tsx (landing — import placeholder from Phase 0)
   - blog/page.tsx
   - services/page.tsx
   - contact/page.tsx
   - book/page.tsx
   - portal/page.tsx (auth-protected, stub)
   - spokes/[slug]/page.tsx (dynamic route stub)
2. Create src/components/layout/Header.tsx with logo placeholder,
   nav links, and shadcn Sheet-based hamburger menu for mobile.
3. Create src/components/layout/Footer.tsx with legal disclaimer links.
4. Create src/data/spokes.ts — registry object mapping slug to spoke metadata.
5. Ensure RootLayout in src/app/layout.tsx wraps all pages with Header and Footer.

Pass: All 7 routes return 200. Hamburger opens on 375px viewport.
Run /test-block after /review-block passes.
Commit: P16-B14APP-SCAFFOLD: create route structure and layout shell
```

### P16-B24AUTH-ACCOUNT — run simultaneously with B34 and B44
```
/implement-block
Block: P16-B24AUTH-ACCOUNT
Branch: phase-1-foundation
Goal: Supabase auth, protected routes, and profiles table

Tasks:
1. Enable Supabase email/password auth in Supabase dashboard.
2. Create src/app/auth/login/page.tsx — email/password login form.
3. Create src/app/auth/callback/route.ts — OAuth callback handler.
4. Create src/middleware.ts — protect /portal and /admin routes,
   redirect unauthenticated users to /auth/login.
5. Run Supabase migration:
   supabase/migrations/003_profiles.sql
   CREATE TABLE profiles (
     id uuid REFERENCES auth.users PRIMARY KEY,
     company_name text,
     contact_email text,
     plan_tier text DEFAULT 'free',
     created_at timestamptz DEFAULT now()
   );
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "own profile only" ON profiles
     FOR ALL USING (auth.uid() = id);
6. Run: supabase gen types typescript --project-id zteebziywhoglccgdxxn > src/types/database.ts

Pass: Unauthenticated /portal redirects to /auth/login.
Commit: P16-B24AUTH-ACCOUNT: Supabase auth, protected routes, profiles table
```

### P16-B34DATA-MODEL — run simultaneously with B24 and B44
```
/implement-block
Block: P16-B34DATA-MODEL
Branch: phase-1-foundation
Goal: core Supabase schema for blog, scheduling, and CRM

Migration: supabase/migrations/004_schema.sql
CREATE TABLE blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  content text,
  excerpt text,
  category text,
  tags text[],
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now()
);
CREATE TABLE appointments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id uuid REFERENCES profiles(id),
  scheduled_at timestamptz,
  status text DEFAULT 'pending',
  notes text
);
CREATE TABLE ai_interactions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text,
  prompt_hash text,
  response_length int,
  created_at timestamptz DEFAULT now()
);
Enable RLS on all tables. Create read-only public policy for blog_posts where published=true.
Run: supabase gen types typescript and update src/types/database.ts.

Pass: Migrations apply cleanly. RLS test blocks unprivileged access to appointments.
Commit: P16-B34DATA-MODEL: create blog, appointments, and ai_interactions schema
```

### P16-B44NAV-IA — run simultaneously with B24 and B34
```
/implement-block
Block: P16-B44NAV-IA
Branch: phase-1-foundation
Goal: information architecture and 1-click home / 2-click max navigation

Tasks:
1. Document IA in docs/ia.md — map every primary user goal to path and click count.
2. Implement Breadcrumb component at src/components/layout/Breadcrumb.tsx.
3. Add persistent floating "Book a Call" button (bottom-right, shadcn Button,
   primary color #6366f1) linking to /book on every page via RootLayout.
4. Write Playwright test: from /blog/[any-slug], home is reachable in 1 click.

Pass: Playwright click-flow test passes. No section requires >2 clicks from home.
Commit: P16-B44NAV-IA: IA documentation and persistent navigation components
```

---

## PHASE 2 KICKOFF
```
Confirm all Phase 1 blocks complete. Merge phase-1-foundation to main.
Start Phase 2 of 6 — UX, Branding, and Content.

Dispatch simultaneously in three Antigravity sessions:
  - Session A: P26-B15THEME-CINEMATIC (files: tailwind.config.ts, globals.css, design tokens, core UI components)
  - Session B: P26-B25BRAND-ASSETS (files: src/components/brand/, docs/branding.md, public/og-image.png)
  - Session C: P26-B55SCHEDULING-PAYMENTS (files: src/app/book/, src/components/payments/)

After A and B are merged and stable:
  - Session D: P26-B45LANDING-CRO (depends on theme tokens from A and brand from B)
  - Session E: P26-B35BLOG-MVP (depends on data model from Phase 1)
```

### P26-B15THEME-CINEMATIC
```
/implement-block
Block: P26-B15THEME-CINEMATIC
Branch: phase-2-ui
Goal: dark cinematic UI system with design tokens and card components

Design tokens — add to tailwind.config.ts:
  background: '#0a0a0a'
  surface: '#111111'
  surface-elevated: '#1a1a1a'
  primary: '#6366f1'
  accent: '#06b6d4'
  foreground: '#f4f4f5'
  muted: '#71717a'
  border: 'rgba(255,255,255,0.08)'

Tasks:
1. Apply tokens as CSS variables in src/app/globals.css.
2. Build src/components/ui/CinematicHero.tsx — full-width section with CSS gradient
   background and lazy-loaded optional video slot.
3. Update shadcn Card to use surface color with border-white/10 and hover elevation.
4. Implement HamburgerMenu with shadcn Sheet; touch targets min 44px.
5. Install framer-motion (MIT): pnpm add framer-motion.
   Add fade-in/slide-up entrance animation to all Card components on scroll.
6. Run Lighthouse on preview URL via Antigravity browser agent.
   Target: Performance ≥ 85, Accessibility ≥ 90 on mobile viewport.

Pass: Lighthouse scores met, no critical a11y regressions.
Commit: P26-B15THEME-CINEMATIC: dark theme tokens, card system, and cinematic hero
```

### P26-B25BRAND-ASSETS — run simultaneously with B15 and B55
```
/implement-block
Block: P26-B25BRAND-ASSETS
Branch: phase-2-ui
Goal: logo, slogan, branding palette, and OG assets

Tasks:
1. Create docs/branding.md with:
   - Brand story: expert HR at small-business prices, powered by AI
   - Target audience: California small businesses without an HR dept
   - Colors: indigo #6366f1 (authority), cyan #06b6d4 (AI/tech), black #0a0a0a (premium)
   - Typography: Manrope for headings, Inter for body (both MIT via next/font/google)
   - Slogan: "HR Expertise. Labor Law Compliance. AI-Powered for Small Business."
2. Create src/components/brand/Logo.tsx as an inline SVG wordmark.
3. Create public/og-image.png — 1200x630, dark background, logo, slogan.
4. Add slogan to <title> and <meta name="description"> in src/app/layout.tsx.
5. Export logo as public/logo-192.png and public/logo-512.png for PWA manifest.

Pass: Branding consistent in header, footer, and landing. OG image renders in social preview.
Commit: P26-B25BRAND-ASSETS: logo, slogan, branding palette, and OG assets
```

### P26-B35BLOG-MVP
```
/implement-block
Block: P26-B35BLOG-MVP
Branch: phase-2-content
Goal: Supabase-backed blog with ISR, admin editor, and JSON-LD schema

Tasks:
1. Implement src/app/blog/page.tsx — server component fetching published posts.
2. Implement src/app/blog/[slug]/page.tsx with generateStaticParams and revalidate:3600.
3. Install TipTap: pnpm add @tiptap/react @tiptap/pm @tiptap/starter-kit (all MIT).
4. Build src/app/admin/blog/page.tsx — protected page with TipTap editor for new posts.
5. Build src/components/blog/PostCard.tsx — card layout matching theme tokens.
6. Add JSON-LD BlogPosting schema to each post page.

Pass: Blog index loads, post renders, admin editor accessible only when authenticated.
Commit: P26-B35BLOG-MVP: Supabase blog with TipTap editor and JSON-LD schema
```

### P26-B45LANDING-CRO — after B15 and B25 merged
```
/implement-block
Block: P26-B45LANDING-CRO
Branch: phase-2-content
Goal: full conversion-optimized landing page with bio card

Sections (each a separate component in src/components/sections/):
1. HeroSection — slogan headline, "Book Free Consultation" CTA, cinematic background.
2. PainPointsSection — three cards: "No HR dept?", "Compliance risks?", "Can't afford a firm?"
3. ServicesSection — four-card grid: Compliance Audit, Policy Writing, Training, AI-Assisted HR.
4. BioSection — bio card with credentials badges:
   Name: M.E. | Credentials: MPA, 10+ Yrs HR, AI Specialist, CA Compliance Expert
   Bio: [canonical text from master spec section 10]
   Links: LinkedIn, mario-hr-portfolio.netlify.app
5. TestimonialsSection — placeholder cards with JSON-LD Review schema.
6. BlogPreviewSection — latest 3 posts from Supabase (server component).
7. CTABannerSection — "Ready to protect your business? Book a call."

Pass: All sections render, bio displays correctly, blog preview loads from Supabase.
Commit: P26-B45LANDING-CRO: conversion-optimized landing page with all sections
```

### P26-B55SCHEDULING-PAYMENTS — run simultaneously with B15 and B25
```
/implement-block
Block: P26-B55SCHEDULING-PAYMENTS
Branch: phase-2-content
Goal: Cal.com booking embed with intake form and payment options page

Tasks:
1. Install Cal.com embed: pnpm add @calcom/embed-react (MIT).
2. Create src/app/book/page.tsx:
   - Intake form first: react-hook-form + zod validation (both MIT).
     Fields: name, company, email, phone, service type.
   - Cal.com embed below intake form pointing to your Cal handle.
3. Configure Supabase webhook or Cal webhook to write to appointments table.
4. Add PaymentOptions component from Phase 0 to src/app/pricing/page.tsx.
5. Add "Book a Call" to Header nav and floating CTA button.

Pass: Intake form validates, Cal embed loads, payment options render safely.
Commit: P26-B55SCHEDULING-PAYMENTS: booking, intake form, and payment options
```

---

## PHASE 3 KICKOFF
```
Confirm Phase 2 complete. Merge phase-2-ui and phase-2-content to main.
Start Phase 3 of 6 — SEO, Security, and Legal.

Dispatch simultaneously:
  - Session A: P36-B14SEO-HYBRID
  - Session B: P36-B24SECURITY-HARDENING
  - Session C: P36-B34LEGAL-DISCLAIMERS
After routes are fully stable, dispatch P36-B44PERF-PWA.
```

### P36-B14SEO-HYBRID
```
/implement-block Block: P36-B14SEO-HYBRID Branch: phase-3-seo-security
Install next-sitemap (MIT) and next-seo (MIT).
Add generateMetadata() to all route files with unique title, description, canonical.
Add JSON-LD LocalBusiness schema to homepage targeting San Gabriel Valley.
Submit sitemap.xml to Google Search Console.
Enable ISR revalidate:3600 on blog posts.
Commit: P36-B14SEO-HYBRID: sitemap, metadata, JSON-LD, and ISR
```

### P36-B24SECURITY-HARDENING — simultaneously with B14 and B34
```
/implement-block Block: P36-B24SECURITY-HARDENING Branch: phase-3-seo-security
Add security headers in next.config.ts:
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=()
  Content-Security-Policy: (strict policy scoped to Supabase and Vercel domains)
Run: supabase db lint to audit all RLS policies.
Run: pnpm audit and fix any high-severity issues.
Add pnpm audit to .github/workflows/ci.yml.
Commit: P36-B24SECURITY-HARDENING: CSP headers, RLS audit, and CI security scan
```

### P36-B34LEGAL-DISCLAIMERS — simultaneously with B14 and B24
```
/implement-block Block: P36-B34LEGAL-DISCLAIMERS Branch: phase-3-seo-security
Create src/app/legal/disclaimer/page.tsx with sections:
  - AI Content Disclaimer
  - HR Consulting Disclaimer (not legal representation)
  - California Labor Law Disclaimer
  - No Attorney-Client Relationship clause
Create src/app/legal/privacy/page.tsx (CCPA/CalOPPA aligned).
Add disclaimer and privacy links to Footer.
Add modal on first Gemini canvas interaction acknowledging AI disclaimer.
Commit: P36-B34LEGAL-DISCLAIMERS: disclaimer and privacy pages
```

### P36-B44PERF-PWA — after routes stable
```
/implement-block Block: P36-B44PERF-PWA Branch: phase-3-seo-security
Install next-pwa (MIT): pnpm add next-pwa.
Create public/manifest.json with name, icons (192, 512), theme_color #0a0a0a.
Optimize all images using next/image with priority on hero images.
Add .github/workflows/lighthouse.yml for Lighthouse CI on every PR.
Run Lighthouse via Antigravity browser agent. Pass: Performance ≥ 85 mobile.
Commit: P36-B44PERF-PWA: PWA manifest, image optimization, Lighthouse CI
```

---

## PHASE 4 KICKOFF
```
Confirm Phase 3 complete. Merge to main.
Start Phase 4 of 6 — Gemini Canvas Integration.

Execute P46-B14CANVAS-ARCH first (architecture dependency).
After architecture is approved, dispatch simultaneously:
  - Session A: P46-B24CANVAS-UI
  - Session B: P46-B34CANVAS-SECURITY
After both pass, execute P46-B44CANVAS-DEPLOY.
```

### P46-B14CANVAS-ARCH
```
/implement-block Block: P46-B14CANVAS-ARCH Branch: phase-4-canvas
Install: pnpm add @google/generative-ai (Apache-2.0).
Create src/app/api/gemini/chat/route.ts:
  - POST handler accepting { message, history, mode }
  - Uses GEMINI_API_KEY from server env only (never client)
  - System prompt scoped to HR/compliance expert persona
  - Streaming response using Next.js Response with ReadableStream
Create src/components/canvas/GeminiCanvas.tsx shell with three tab modes:
  Chat | Document | Media
Commit: P46-B14CANVAS-ARCH: Gemini API route and canvas component shell
```

### P46-B24CANVAS-UI — simultaneously with B34
```
/implement-block Block: P46-B24CANVAS-UI Branch: phase-4-canvas
Build full chat interface: message bubbles, input bar, send button, typing indicator.
Build Document mode: renders markdown HR policy drafts.
  Install jspdf (MIT): pnpm add jspdf. Add "Copy" and "Download PDF" buttons.
Build Media mode: displays YouTube embed or Supabase video when triggered.
Add HR preset prompt chips:
  "What are California meal break requirements?"
  "Draft an at-will employment notice"
  "Explain meal period compliance"
  "What records must I keep as an employer?"
Add AI disclaimer modal before first canvas interaction.
Commit: P46-B24CANVAS-UI: full canvas UI with chat, document, and media modes
```

### P46-B34CANVAS-SECURITY — simultaneously with B24
```
/implement-block Block: P46-B34CANVAS-SECURITY Branch: phase-4-canvas
Install Upstash rate limiting: pnpm add @upstash/ratelimit @upstash/redis (both MIT).
Add rate limiting to /api/gemini/chat: max 10 req/min per IP.
Validate all input with Zod before sending to Gemini.
Add prompt injection guard: strip "ignore previous instructions" patterns server-side.
Log all canvas interactions to ai_interactions table (anonymized: no PII in logs).
Add "AI-generated content — not legal advice" watermark to Document mode output.
Commit: P46-B34CANVAS-SECURITY: rate limiting, input validation, and interaction logging
```

### P46-B44CANVAS-DEPLOY
```
/implement-block Block: P46-B44CANVAS-DEPLOY Branch: phase-4-canvas
Test canvas in Antigravity browser agent: send all 4 preset prompts.
Verify streaming responses render correctly.
Add canvas as floating "Ask AI" button on /services and /contact pages.
Add lazy loading to GeminiCanvas so it does not block initial page load.
Integration test: 5 prompts, all return valid responses with disclaimer watermark.
Merge phase-4-canvas to main. Commit: P46-B44CANVAS-DEPLOY: canvas deployed and tested
```

---

## PHASE 5 KICKOFF
```
Confirm Phase 4 complete and feature freeze declared.
Start Phase 5 of 6 — Launch and Hardening.

If P26-B45LANDING-CRO bio card was not fully merged, execute P56-B13BIO-CARD.
Then execute P56-B23FINAL-SEO-TEST.
Finally execute P56-B33DEPLOY-LAUNCH only after all tests pass.
```

### P56-B13BIO-CARD
```
/implement-block Block: P56-B13BIO-CARD Branch: phase-5-launch
Verify bio card is present on landing page with canonical text, credentials badges,
and links to LinkedIn and mario-hr-portfolio.netlify.app.
If missing or incomplete, implement now using the bio text from the master spec.
Commit: P56-B13BIO-CARD: bio card complete with credentials and links
```

### P56-B23FINAL-SEO-TEST
```
/test-block Block: P56-B23FINAL-SEO-TEST Branch: phase-5-launch
Run Lighthouse CI on all major pages. Pass threshold: Performance ≥ 85 mobile.
Verify Google Search Console has received sitemap. Confirm no crawl errors.
Run full Playwright end-to-end suite: nav, auth, blog, booking, canvas, payment.
Run pnpm audit — zero high or critical vulnerabilities.
Document all results in docs/launch-test-report.md.
Commit: P56-B23FINAL-SEO-TEST: final test report committed
```

### P56-B33DEPLOY-LAUNCH
```
/implement-block Block: P56-B33DEPLOY-LAUNCH Branch: main
Merge all feature branches into main via PRs reviewed in Antigravity.
Confirm Vercel production deployment is healthy at final URL.
Set up custom domain in Vercel dashboard if available.
Update mario-hr-portfolio.netlify.app with a redirect to the new Vercel URL.
Tag release: git tag v1.0.0 && git push origin v1.0.0
Write docs/launch-notes.md with release summary.
Final commit: P56-B33DEPLOY-LAUNCH: v1.0.0 launched
```

---

## FINAL CLOSEOUT
```
Confirm every block in Phases 1–5 is marked complete or blocked with reasons
in docs/phase0-status.json.
Confirm:
  - Vercel production is live and healthy.
  - Stripe is primary in the payment UI.
  - Venmo, Cash App, Zelle render as safe copyable text.
  - Legal disclaimer and privacy routes are live.
  - Bio card is present on landing page.
  - Gemini canvas is live with rate limiting and disclaimer.
  - v1.0.0 tag exists on GitHub.
Build is complete.
```
