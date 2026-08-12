# BizHR

California HR compliance for small businesses — free tools first, paid services second. Built and
maintained for Mario Espindola (MPA) / M.E. Consulting.

**Live site:** [bizhr.vercel.app](https://bizhr.vercel.app)

## Philosophy

Every page, tool, and piece of copy on this site follows a strict priority order:

1. **Free real value** — calculators, quizzes, checklists genuinely useful whether or not a visitor
   ever becomes a client
2. **Contact info** — low-friction, always visible, never gated behind a form
3. **Education on services** — documentation-style explanations, not sales copy
4. **Selling** — pricing/booking CTAs exist but are deliberately calm and never the loudest thing on
   a page

No calculator, checklist, or tool requires signup or email capture. Tone throughout is "educate, don't
scare" — no red alarm styling, no urgency language, no inflated risk claims.

## Tech Stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui components
- **Database/Auth:** Supabase (Postgres + Auth)
- **External data:** Airtable (HRBiz Ops Database) — live-fetch with static fallback
- **AI:** Anthropic Claude API (Sonnet)
- **Payments:** Stripe
- **Package manager:** pnpm (canonical — `pnpm-lock.yaml` is the tracked lockfile; Vercel builds with
  `pnpm build`, not npm)
- **Deployment:** Vercel, git-connected to this repo's `phase-1-foundation` branch (auto-deploys on
  push)

## Site Map

### Free tools (`/tools`)
No signup required, all log anonymous usage to `tool_usage_events`:
- `/paga-calculator` — PAGA exposure estimator (AB 2288 reformed penalty structure)
- `/tools/compliance-quiz` — self-assessment quiz, per program (HPP/WVPP/IIPP/KYR)
- `/tools/deadline-tracker` — training/notice deadline calculator, per program
- `/tools/threshold-checker` — which CA/federal laws apply, by employee count
- `/tools/job-classification` — exempt/non-exempt/contractor branching quiz (ABC test)
- `/tools/mandatory-postings` — filterable required-posting checklist
- `/ai-lab` — Strategic Audit Engine + Policy Architect (Claude API, requires `ANTHROPIC_API_KEY`)

### Compliance program hubs (`/programs`)
Card-based hub-and-spoke architecture — a summary card first (program overview + inventory of what's
nested), then individual topic cards branch off from it. Currently live: **Harassment Prevention
(SB 1343)**. WVPP, IIPP, and KYR are scaffolded as "coming soon" (waitlist) pending the same buildout.
Program data is sourced from Airtable (see below), not hardcoded.

Each program hub ends with hyperlinks to official third-party sources (CRD, CA Legislative
Information, CCR) so every claim is independently verifiable — never just asserted.

### Paid toolkits & services
- `/tools/[hpp|wvpp|iipp|kyr]` — done-for-you toolkit product pages
- `/services`, `/spokes/[slug]` — service offering pages
- `/pricing`, `/book` — pricing and consultation booking

### Content
- `/blog`, `/blog/[slug]` — compliance articles
- `/about`, `/contact`

### Admin (`/admin`, requires `is_admin = true` on the Supabase profile)
- Contact submissions (with mark-as-read), waitlist signups, tool usage analytics

### Client portal (`/portal`, requires any authenticated Supabase user)
- Not the same gate as `/admin` — any signed-up user reaches `/portal`; only flagged admins reach
  `/admin`

## Important: this is not an LMS

Training is delivered live, remotely, by a human facilitator — not through this site. The site's job
regarding training is purely informational: explain what the law requires (hours, timing, and
critically, the *interactivity* requirement — 2 CCR § 11024 effectively requires a real person who can
answer questions in real time), which is also the reason live delivery is the right format. There is
no certificate issuance, no self-paced module delivery, and no LMS functionality here by design.

## Data Sources

### Supabase (Postgres)
Tables: `profiles` (has `is_admin` flag + an auto-creation trigger on signup), `blog_posts`,
`appointments`, `ai_interactions`, `contact_submissions`, `tool_usage_events`, `waitlist`. All
RLS-protected; public tables allow anonymous INSERT only, never SELECT. Admin SELECT/UPDATE policies
check `profiles.is_admin` — not a hardcoded email (a hardcoded-email version of these policies existed
earlier in this project's history and broke silently when the account email changed; don't repeat
that pattern).

### Airtable — HRBiz Ops Database (`app7Dhacms0tMsXKN`)
`src/lib/airtable/server.ts` prefers a live Airtable fetch (1hr revalidation) when `AIRTABLE_API_KEY`
is set, and falls back to a static migrated snapshot (`src/data/airtable-seed.ts`) otherwise — the
site works with zero additional setup and upgrades to live data the moment a token is added. Only the
`Programs` and `Document Vault` tables are mirrored (public-facing content); `Clients`, `Employees`,
`Certificates`, etc. stay Airtable-only as they're operational/client data, not public content.

## Environment Variables

```
# Required for the site to function
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=          # server-only, admin dashboard + auth

# Required for /ai-lab to actually respond (site works fine without it, AI Lab returns an error)
ANTHROPIC_API_KEY=

# Optional — live Airtable data instead of the static seed
AIRTABLE_API_KEY=

# Optional — paid checkout flow (site works without these, checkout just won't)
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_ENABLED=

# Optional — canonical site URL for sitemap/OG tags, defaults to https://bizhr.vercel.app
NEXT_PUBLIC_SITE_URL=
```

## Local Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Use `pnpm build` (not `npm run build`) to
reproduce Vercel's exact build — the two package managers can resolve different dependency versions
if you mix them, which has caused real deploy failures before.

## Deployment

Git-connected to Vercel — every push to `phase-1-foundation` auto-deploys to production
(`bizhr.vercel.app`). No manual `vercel deploy` step needed or wanted; the project previously lost
Vercel dashboard access when the original account's login recovery failed, and manual CLI deploys were
part of why nobody noticed for a while. Git-based auto-deploy is the durable fix — don't reintroduce a
manual deploy workflow.

## Related Repositories

- [`bizhr-compliance-corpus`](https://github.com/MARIO0O0O0O/bizhr-compliance-corpus) — private data
  repository: raw compliance research, module content, client deliverable examples. Kept separate from
  this app repo intentionally (different lifecycle, ~200MB+ of reference PDFs that don't belong in
  every clone of the app).

Several earlier iterations of this site exist as archived repositories under the same GitHub account
(`hrbiz.org`, `smbhr`, `HRBIZ.ORG_Consultancy`, `bizhr_reorg`, and others) — all superseded, all
archived (GitHub's native read-only archive, not deleted), with anything of value already migrated
into this repo or the corpus repo above.
