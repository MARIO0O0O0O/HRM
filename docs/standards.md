# HRM SaaS Project Standards

This document establishes the official coding standards, architectural patterns, and compliance rules for the HRM SaaS application.

---

## 1. TypeScript & React
- **Strict Mode**: `strict` typechecking is enabled in `tsconfig.json`. Explicit types are required. No `any` type definitions without explicit written justification.
- **Functional Components**: All React components must be written as functional components using modern hooks and hooks-based state management.
- **File Extensions**: Use `.tsx` for React components and `.ts` for pure TypeScript logic/utility files.

---

## 2. Next.js App Router Conventions
- **Routing**: All pages and APIs must be structured within the `src/app/` directory (App Router layout). No Pages Router layout is permitted.
- **Server vs Client Components**: Components are Server Components by default. Use the `"use client"` directive at the very top of files ONLY when incorporating interactive hooks (`useState`, `useEffect`, context, framer-motion, etc.).
- **Data Fetching**: Database and API calls should be executed on the server via Server Components or API routes where possible.

---

## 3. Security Hardening
- **Environment Variables**: No API keys, credentials, or sensitive secrets may be hardcoded. Use `.env.local` for local development and Vercel environment dashboard for production.
- **Row-Level Security (RLS)**: Row-Level Security (RLS) must be enabled on every Supabase table. Every query from client-side must map toauthenticated user claims.
- **Server Security**: Sensitive keys (such as `STRIPE_SECRET_KEY` and `SUPABASE_SERVICE_ROLE_KEY`) must never be exposed or bundled in client-side code.

---

## 4. Open-Source Dependency Licensing
- **Allowed Permissive Licenses**: MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause.
- **Prohibited Copyleft/Restrictive Licenses**: GPL (all versions), AGPL, SSPL, LGPL (highly avoided unless specifically permitted).
- **Audit Requirement**: Any new package must be verified by `license-checker` before inclusion in `package.json`.

---

## 5. Vercel Deployment Workflows
- **Build Preflight**: `pnpm build` must pass cleanly locally with zero compilation or lint errors before trigger deployments.
- **Environment Parity**: Local `.env.local` variables must match exactly with Vercel dashboard configurations.

---

## 6. Payment Display Rules
- **Stripe Integration**: Stripe Checkout remains the primary payment and subscription call-to-action (CTA).
- **Secondary Handles (Venmo, Cash App, Zelle)**:
  - Peer-to-peer accounts are only rendered as copyable, plain-text labels.
  - Never fabricate custom deep links or QR-code URLs for mobile payment apps.
  - Section must be accompanied by an official clarifying note detailing Stripe as the primary processed mechanism.
