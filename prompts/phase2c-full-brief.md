Hey Antigravity, M.E. here.

Green light on Phase 2C. The full build brief is in the repo
at docs/HRM-Phase2C-Build-Brief-v3.md — read it completely
before writing a single line of code. Everything you need is
in there. This message adds context and execution rules on
top of it.

---

EXECUTION RULES

1. Start with Day 0 (CinematicHero) — ship it as its own
   commit before touching any backend work. It has zero
   database dependency and gets the homepage live immediately.

2. Work in this commit cadence:
   - One commit per logical unit (schema, component, route,
     integration). Never bundle unrelated changes.
   - Commit message format: "feat: [what]" / "fix: [what]"
   - Push and confirm Vercel build is GREEN before starting
     the next unit. Do not stack broken commits.

3. If a Vercel build fails — stop, fix it, confirm green,
   then continue. Do not move forward on a broken build.
   You know what happened last time.

4. Flag me before starting any task that could take more
   than 4 hours. I will reprioritize if needed.

5. Do not build Phase 3 features. If you identify something
   that belongs in Phase 3, note it in a PHASE3-NOTES.md
   file and keep moving.

---

DAY 0 — CINEMATIC HERO (Do This First)

File to create:
  src/components/hero/CinematicHero.tsx

The component spec is in the brief. Key points:
- 10-clip video reel, auto-advancing, looping
- Graceful fallback to navy/gold gradient if /public/video/
  directory is empty — so it never looks broken
- Two CTAs: gold "Book $75 Consultation" → /book
  and ghost "Free PAGA Risk Check" → /paga-calculator
- Cinematic caption per clip, progress dots, scroll indicator
- Fonts: Playfair Display (headlines), DM Sans (body),
  DM Mono (labels/mono) — add to layout.tsx if not present

After building the component:
  1. Replace the existing hero <section> in src/app/page.tsx
     with <CinematicHero />
  2. Create public/video/ directory (empty is fine — fallback
     handles it)
  3. Commit: "feat: cinematic hero with video reel"
  4. Deploy and confirm bizhr.vercel.app hero is live

---

WEEK 1 — SUPABASE EXTENSIONS + SCHEMA

Enable these extensions in Supabase Dashboard first, then
run the SQL. All are free tier. Do not skip any.

Extensions to enable (Dashboard → Database → Extensions):
  pgvector, pg_trgm, pg_cron, pg_net, pgmq, pg_hashids

Then run the full schema from the brief as a single migration.
Include:
  - content_articles (with embedding VECTOR(1536) and
    short_id TEXT columns)
  - content_categories
  - waitlist (confirm exists from Phase 2B)
  - referral_clicks
  - email_subscribers
  - site_settings
  - analytics_cache
  - storage buckets: article-covers, tool-outputs, hero-videos

RLS policies: apply all policies from the brief to
content_articles, waitlist, and email_subscribers.
Do not ship any table without RLS enabled.

pg_trgm indexes on content_articles.title and body_mdx.
pgvector ivfflat index on content_articles.embedding.

pg_cron jobs to schedule:
  - publish-scheduled-articles (every 5 minutes)
  - refresh-analytics-cache (daily 2am PT / 9am UTC)
  - flag-stale-content (Monday 8am PT)

Supabase functions to create:
  - match_articles() — pgvector similarity search
  - search_articles() — pg_trgm fuzzy search

Commit: "feat: supabase extensions, schema, RLS, cron jobs"

---

WEEK 1 (CONTINUED) — PUBLIC CONTENT ROUTES

Routes to build:
  /resources              → article index, filterable by
                            type/category/tag, includes
                            <SearchBar /> component at top
  /resources/[slug]       → individual article page
  /resources/category/[slug] → category landing page
  /resources/compare      → comparison hub landing page

Each article page requires:
  - Unique <title>, <meta description>, canonical URL
  - JSON-LD Article schema (author, datePublished,
    dateModified)
  - Auto-generated table of contents from H2/H3 headings
  - Reading time estimate
  - In-article CTA at 33% and 66% scroll depth:
    "Need help implementing this? Book a free 30-min
    session →" linking to /book
  - <HighTicketUpsell /> from Phase 2B at end of article
  - <RelatedArticles /> stub (tag-based for now,
    pgvector wire-up in Week 4)
  - HowTo schema for guides, Review for reviews,
    ItemList for comparisons

<SearchBar /> component:
  - Debounced input (300ms)
  - Calls search_articles() Supabase RPC
  - Dropdown overlay with results
  - Keyboard navigable (arrow keys + Enter)
  - No page reload

<ComparisonTable /> component:
  - Up to 5 columns (products/services)
  - Configurable row groups (criteria)
  - ✓/✗ checkmarks, text, or star ratings per cell
  - "Best for small business" verdict row highlighted
  - Mobile: card-per-product accordion

Commit: "feat: /resources public routes and components"

Sitemap + robots.txt + OG images:
  - src/app/sitemap.ts — queries Supabase for published
    articles, revalidates every 24 hours
  - robots.txt — Disallow: /admin/, /api/,
    /tools/*/preview — Allow: /resources/
  - src/app/resources/[slug]/opengraph-image.tsx —
    next/og, 1200x630, article title + CalHR AI brand +
    category badge, Inter font pre-loaded

Commit: "feat: sitemap, robots.txt, OG images"

---

WEEK 2 — ADMIN CONSOLE

Route: /admin (protected)

Auth: Use Supabase Auth single-user magic link if it wires
cleanly in under 2 hours. If not, use ADMIN_SECRET env var
with HTTP Basic Auth and note the upgrade path. Ship fast.

Routes:
  /admin                  → dashboard
  /admin/content          → article list (all statuses)
  /admin/content/new      → create article
  /admin/content/[id]/edit → edit article
  /admin/spokes           → spoke registry manager
  /admin/analytics        → full analytics view
  /admin/analytics/search → GSC deep-dive tab
  /admin/waitlist         → waitlist manager
  /admin/settings         → site config

Admin dashboard widgets — build all 6 sections:
  A: GA4 traffic (sessions, top pages, bounce, sources)
  B: GSC (top queries, impressions/CTR, avg position,
     keyword opportunities: >100 impressions + >10 position)
  C: GBP (profile views, calls, directions, website clicks)
  D: Content performance (top articles, stale flag,
     draft count, scheduled next)
  E: Funnel metrics (/book visits, waitlist signups,
     banner impressions vs dismissals)
  F: Quick actions bar (always visible)

Content editor requirements:
  - Novel.sh or @uiw/react-md-editor — your call, document it
  - Frontmatter sidebar: status, publish datetime, category,
    tags, featured toggle, AI assisted toggle, slug field
  - Cover image upload → Supabase Storage article-covers bucket
    → auto-populates cover_url field
  - SEO panel: live Google snippet preview, char count
    indicators (title 60, description 160), keyword density
  - GSC overlay: if article slug exists in GSC, show
    impressions/clicks/avg position in sidebar
  - Autosave: debounced 30s to Supabase, show Saved/Saving
  - Preview: /resources/[slug]?preview=true in new tab
    (admin-only middleware gate)

AI Assist (async via pgmq):
  - Click "AI Assist" → send message to ai_draft_jobs queue
  - Editor shows "Generating... (15-30 seconds)"
  - Edge Function process-ai-draft polls queue, calls
    Anthropic API with prompt template from brief, writes
    draft back to content_articles
  - Supabase Realtime subscription in editor watches for
    the update and populates the editor when done
  - Set ai_assisted = true on the article

Realtime notifications panel:
  - Bell icon top-right on all /admin pages
  - Unread count badge
  - Live feed: waitlist signups, article auto-publishes
  - Powered by Supabase Realtime channel subscriptions

Analytics cache layer:
  - src/lib/analytics/cache.ts wrapper
  - Admin dashboard reads from analytics_cache table first
  - Falls back to live API call if cache is stale (>4 hours)
  - pg_cron refreshes cache daily — admin dashboard loads
    in <200ms not 2-4 seconds

Commits:
  "feat: /admin auth and layout"
  "feat: /admin/content list and editor"
  "feat: admin AI assist async pipeline"
  "feat: admin realtime notifications"
  "feat: admin analytics cache layer"

---

WEEK 3 — ANALYTICS INTEGRATIONS

All three use one Google Cloud service account.
One GOOGLE_SERVICE_ACCOUNT_B64 env var covers all three.

OAuth scopes required:
  analytics.readonly (GA4)
  webmasters.readonly (GSC)
  business.manage (GBP)

Build these wrappers:
  src/lib/analytics/ga4.ts
  src/lib/analytics/gsc.ts
  src/lib/analytics/gbp.ts
  src/lib/analytics/index.ts  ← unified entry + fallback

withAnalyticsFallback() pattern: if any provider fails,
return null data and render "Data unavailable" in the
widget — never crash the dashboard.

GSC getKeywordOpportunities(): queries with >100 impressions
AND avg position >10. This is the highest-ROI feature in
the analytics suite. Build it.

GBP: if API approval is pending, build mock data + "Connect
GBP →" setup banner immediately. Ship GA4 and GSC first.

/admin/analytics full page:
  - GA4 tab: per-article breakdown, traffic sources chart,
    booking funnel (/resources → /book)
  - Search Console tab: full query table with filters,
    keyword opportunities table, index coverage, Core Web
    Vitals per page, sitemap submission status
  - GBP tab: metrics over time line chart
  - CSV export per tab (no PII)

/admin/analytics/search — GSC deep-dive standalone page

Commits:
  "feat: GA4 integration and dashboard widgets"
  "feat: GSC integration and analytics/search page"
  "feat: GBP integration (or mock fallback)"
  "feat: unified analytics page with all three tabs"

---

WEEK 4 — REMAINING ADMIN + FUTURE STUBS

/admin/spokes — UI over Phase 2B spoke registry
  - Table: slug | title | status | price | monetized
  - Inline status toggle: live/gated/hidden
  - Inline price edit
  - Add new spoke form

/admin/waitlist — CPRA-compliant
  - Table: email | spoke | date | exported
  - Sort by spoke or date
  - Mark as exported
  - CSV export
  - Per-row delete (CPRA compliance — must have this)

/admin/settings — all values from brief
  Site: name, tagline, email, booking URL, author bio
  Payment: Venmo, Zelle, CashApp (feeds ContributionBanner)
  Analytics: GA4 ID, GSC URL, GBP ID, Test Connection buttons
  Legal: privacy/terms dates, disclaimer override

Future-proofing stubs (build structure, don't wire):
  /api/ref/[product] — affiliate click tracking
    → log to referral_clicks, redirect to affiliate URL
  /api/webhooks/calendly — booking notification
    → insert to bookings table → Realtime push to admin
  <ArticleLeadCapture /> — email capture per article
    → writes to email_subscribers with source_tag
  src/app/api/search/route.ts — semantic search API
    → POST {query} → embedding → match_articles RPC

pgvector wire-up for <RelatedArticles />:
  - Edge Function generate-embedding: triggered on article
    publish, calls embedding API, stores in embedding column
  - Update <RelatedArticles /> to use match_articles() RPC
    (falls back to tag-based if embedding is null)

Commits:
  "feat: /admin/spokes, /admin/waitlist, /admin/settings"
  "feat: future-proofing stubs"
  "feat: pgvector embedding pipeline and related articles"

---

QA CHECKLIST (run before final deploy)

Public:
  [ ] bizhr.vercel.app hero — video or gradient renders,
      both CTAs work
  [ ] /resources — article index loads, search bar works
  [ ] /resources/[slug] — article renders, TOC visible,
      CTAs at scroll depth, upsell at bottom
  [ ] Sitemap at /sitemap.xml — lists published articles
  [ ] robots.txt — /admin/ disallowed

Admin:
  [ ] /admin — protected, redirects to login if no session
  [ ] /admin/content — article list loads
  [ ] /admin/content/new — editor loads, autosave works,
      AI Assist queues and returns draft
  [ ] /admin/analytics — all three tabs load with data
      or graceful "unavailable" state
  [ ] /admin/settings — save works, values persist

Legal/CPRA:
  [ ] Waitlist insert works, per-row delete works
  [ ] Draft articles return 404 to public (RLS confirmed)
  [ ] Signed URLs for tool PDFs expire after 1 hour

Performance:
  [ ] Admin dashboard loads in <500ms (cache layer working)
  [ ] Article page Lighthouse score >85
  [ ] Video hero starts playing within 3s on mobile

---

OPEN QUESTIONS — ANSWER BEFORE STARTING WEEK 2

1. Novel.sh vs. react-md-editor: which has cleaner App
   Router + Supabase autosave integration? Document choice.

2. Supabase Auth: magic link clean in <2 hours or go with
   env-var Basic Auth bridge?

3. Embedding model: use text-embedding-3-small (OpenAI key
   required) or stub the column for Phase 3?

4. GBP API: have you hit approval delays before? If yes,
   build mock immediately and flag steps for M.E.

5. GSC domain verification: confirm bizhr.vercel.app is
   verified in Google Search Console before Week 3 Day 3.
   If not, flag M.E. — 15-minute DNS fix.

---

ENVIRONMENT VARIABLES NEEDED

Confirm these exist. Add any missing ones to Vercel before
Week 3:

  NEXT_PUBLIC_SUPABASE_URL            ✓ (existing)
  NEXT_PUBLIC_SUPABASE_ANON_KEY       ✓ (existing)
  SUPABASE_SERVICE_ROLE_KEY           ✓ (existing)
  ANTHROPIC_API_KEY                   ✓ (existing)
  GOOGLE_SERVICE_ACCOUNT_B64          ← NEW (Week 3)
  GA4_PROPERTY_ID                     ← NEW (Week 3)
  GSC_SITE_URL                        ← NEW (Week 3)
  GBP_ACCOUNT_ID                      ← NEW (Week 3)
  GBP_LOCATION_ID                     ← NEW (Week 3)
  ADMIN_EMAIL                         ← NEW (Week 2)
  NEXT_PUBLIC_SITE_URL                ← NEW (Week 1)
  HASHIDS_SALT                        ← NEW (bizhr-salt-2026)

---

Start with Day 0 now. Confirm the hero is live on
bizhr.vercel.app before moving to Week 1.

— M.E.