<!-- FOLIO_PEER_REVIEW/FOLIO_PERSONAL_BLUEPRINT.md -->
# FOLIO Personal — Engineering Blueprint
**Purpose:** Personal job search tool for Mario Espindola only  
**Date:** 2026-05-26  
**Stack:** React 18 + Vite + Supabase + Gemini API + pdfme  
**Deployment:** Netlify free tier  
**Auth:** NONE — hardcoded single user via Supabase anon key + Row Lock

---

## What This Is

Five engines wired in sequence:

```
[1] RESUME DB      → Your career data lives in Supabase. Edit once, used everywhere.
[2] JOB SEARCH     → Arbeitnow API (free, no key). Returns real listings.
[3] MATCH ENGINE   → Scores each job 1–8 against your resume. You pick the best.
[4] APP FILLER     → AI reads the job description + your resume → pre-fills fields.
[5] DOC ENGINE     → Generates tailored resume + cover letter as PDF/DOCX.
         ↓
    YOU REVIEW → SUBMIT
```

No login page. No Stripe. No multi-user RLS. No admin panel. No waitlist.
You open the app, it loads your data, you work.

---

## What Gets Stripped From FOLIO v1.0

| Removed | Why |
|---------|-----|
| `auth.html` / Supabase Auth / OAuth | Only you use this |
| RLS policies | Single user — anon key with table-level lock is sufficient |
| `user_consents`, `usage_tracking`, `beta_feedback`, `waitlist` tables | Multi-user SaaS concerns |
| `subscription_tier`, `stripe_customer_id` | No monetization |
| `is_admin`, `is_beta_user`, `microsoft_connected` | Not needed |
| `ai_logging_consent` | Your data, your choice |
| Microsoft Teams/Outlook integration | Overkill for personal use |
| Netlify Functions for auth/token exchange | No auth = no need |
| SEO meta tags, sitemap.xml, robots.txt | Not a public site |
| Landing page, onboarding flow | You know how to use it |
| `admin.html`, `support.html` | N/A |

---

## Architecture

### Single-User Security Model
No Supabase Auth. Use the **anon key** + a single hardcoded `profile_id` UUID
you set once in `.env`. All queries filter by that UUID. Lock the tables to
reject any request without the matching ID. This is secure for localhost/Netlify
with no public exposure.

```
.env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_MY_PROFILE_ID=your-fixed-uuid-here   ← you generate this once
VITE_GEMINI_API_KEY=your_gemini_key
VITE_ARBEITNOW_BASE=https://www.arbeitnow.com/api/job-board-api
```

---

## Database Schema (Simplified)

### Table 1: `my_profile`
Your resume, stored once. Edit via a simple form in the app.

```sql
CREATE TABLE my_profile (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name           TEXT NOT NULL,
  email               TEXT NOT NULL,
  phone               TEXT,
  linkedin_url        TEXT,
  location            TEXT,
  target_titles       TEXT[],          -- ['HR Director', 'VP People', 'CHRO']
  target_salary_min   INTEGER,
  target_salary_max   INTEGER,
  target_industries   TEXT[],
  target_locations    TEXT[],
  target_remote       BOOLEAN DEFAULT false,
  executive_summary   TEXT,            -- 3–4 sentences, AI uses this directly
  experience          JSONB,           -- [{ company, title, start, end, bullets[] }]
  education           JSONB,           -- [{ degree, institution, year }]
  skills              TEXT[],          -- flat list: ['HRIS', 'Workday', 'FMLA', ...]
  certifications      JSONB,           -- [{ name, issuer, year }]
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);
```

### Table 2: `job_saves`
Jobs you've found and saved. Source is Arbeitnow (free) or manual paste.

```sql
CREATE TABLE job_saves (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source          TEXT DEFAULT 'arbeitnow',
  external_id     TEXT,
  title           TEXT NOT NULL,
  company         TEXT NOT NULL,
  location        TEXT,
  is_remote       BOOLEAN DEFAULT false,
  salary_min      INTEGER,
  salary_max      INTEGER,
  apply_url       TEXT NOT NULL,
  description     TEXT,               -- full JD text — this is what AI reads
  posted_at       TIMESTAMPTZ,
  saved_at        TIMESTAMPTZ DEFAULT NOW(),
  fit_score       INTEGER CHECK (fit_score BETWEEN 1 AND 8),
  skill_matches   TEXT[],
  skill_gaps      TEXT[],
  status          TEXT DEFAULT 'saved'
                  CHECK (status IN ('saved','applied','interviewing','decision','passed'))
);
```

### Table 3: `documents`
Generated resumes and cover letters, linked to the job they were made for.

```sql
CREATE TABLE documents (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id          UUID REFERENCES job_saves(id) ON DELETE SET NULL,
  type            TEXT NOT NULL CHECK (type IN ('resume','cover_letter')),
  content_json    JSONB,              -- pdfme template data
  content_text    TEXT,               -- raw text version (for AI context)
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### Table 4: `applications`
Tracks what you've submitted and where it is.

```sql
CREATE TABLE applications (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id              UUID REFERENCES job_saves(id) ON DELETE CASCADE,
  resume_id           UUID REFERENCES documents(id) ON DELETE SET NULL,
  cover_letter_id     UUID REFERENCES documents(id) ON DELETE SET NULL,
  prefilled_fields    JSONB,          -- what the app filler generated
  submitted_at        TIMESTAMPTZ,
  status              TEXT DEFAULT 'draft'
                      CHECK (status IN ('draft','submitted','interviewing','offer','rejected')),
  notes               TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);
```

**Total: 4 tables. That's it.**

---

## The 5 Engines

### Engine 1 — Resume DB (Profile Editor)
**What it does:** A simple form where you fill in your career data once.
Structured fields + JSONB for experience/education/skills. This is the
source of truth for every other engine.

**Build:**
- Single-page form with sections: Personal Info, Experience, Education, Skills, Targets
- On save: upsert `my_profile` where `id = VITE_MY_PROFILE_ID`
- No validation beyond required fields

**Key data the AI uses:**
- `skills[]` — matched against job descriptions
- `experience[].bullets[]` — used to write bullet-matched cover letters
- `executive_summary` — opening paragraph of every cover letter
- `target_titles[]` — filters job search results

---

### Engine 2 — Job Search (Signal Feed)
**What it does:** Queries Arbeitnow API with your target titles and location.
Returns real job listings. You browse, click Save on the ones worth pursuing.

**Build:**
```
GET https://www.arbeitnow.com/api/job-board-api?search=HR+Director&location=Los+Angeles
```

No API key required. Returns JSON with title, company, location, description, url.

**UI:** Card grid. Each card shows title, company, location, salary (if available).
Buttons: `[Save]` `[View JD]` `[Skip]`

On Save: inserts into `job_saves`, immediately runs Match Engine.

---

### Engine 3 — Match Engine (Fit Score)
**What it does:** Scores a saved job 1–8 against your profile using
fuse.js (fuzzy match) + compromise.js (NLP skill extraction).

**Algorithm:**
```
1. Extract skills from job description text → compromise.js
2. Compare against my_profile.skills[] → fuse.js similarity
3. Score:
   - title_score:    target_titles match job title (0–1)
   - skill_score:    % of job skills found in your skills (0–1)
   - location_score: location match or remote preference (0–1)
   - salary_score:   salary range overlap (0–1, skip if no data)
4. Weighted average → map to 1–8 scale
5. Store: fit_score, skill_matches[], skill_gaps[] on job_saves row
```

**Libraries:** `fuse.js` (Apache 2.0), `compromise` (MIT) — both pure JS, Termux-safe.

**UI:** After scoring, show score badge on job card.
Gaps are shown as "Missing: HRIS, Workday, FMLA" so you know what to address.

---

### Engine 4 — App Filler
**What it does:** Reads the job description and your profile,
then uses Gemini to pre-fill common application fields.

**Trigger:** User clicks `[Fill Application]` on a saved job.

**Gemini prompt structure:**
```
You are helping Mario Espindola fill out a job application.

PROFILE:
{executive_summary}
{experience as bullet list}
{skills list}

JOB DESCRIPTION:
{job_saves.description}

Generate pre-filled answers for these standard application fields:
1. Why are you interested in this role? (3 sentences, specific to this JD)
2. What makes you qualified? (3 bullets matching JD requirements to resume)
3. Describe a relevant accomplishment (STAR format, pull from experience)
4. Salary expectation (use target_salary_min–max range)
5. Availability to start (2 weeks standard)

Return as JSON: { why_interested, qualifications, accomplishment, salary, availability }
```

**UI:** Pre-filled text fields. You edit any field before saving.
On confirm: saves to `applications.prefilled_fields`.

---

### Engine 5 — Document Engine
**What it does:** Generates a tailored resume and cover letter for a specific job.
Resume is a pdfme PDF. Cover letter is both PDF and DOCX.

**Trigger:** User clicks `[Generate Documents]` on a saved job.

**Resume generation:**
```
Gemini takes:
  - my_profile (full data)
  - job_saves.description (the JD)

Returns:
  - reordered/rewritten bullet points prioritizing skills mentioned in JD
  - executive summary rewritten to mirror JD language
  - skills section sorted with most-relevant-to-JD first

pdfme renders this as PDF using ATS-safe template
(no columns, no graphics, 11pt font, standard headings)
```

**Cover letter generation:**
```
Gemini takes:
  - profile.executive_summary
  - profile.experience (most recent 2–3 roles)
  - job JD
  - profile.target_salary_min/max
  - prefilled_fields.accomplishment (from App Filler)

Returns:
  - 3-paragraph cover letter:
    Para 1: Opening + why this specific role/company
    Para 2: Most relevant accomplishment from your background
    Para 3: Value proposition + salary + call to action
```

**Outputs saved to `documents` table linked to the job.**

**UI:**
- PDF preview (react-pdf or iframe)
- `[Edit]` button opens text editor for manual changes
- `[Download PDF]` `[Download DOCX]`
- `[Looks Good — Move to Review]`

---

## Review & Submit Flow

After both documents are generated:

```
Review Screen shows:
┌─────────────────────────────────────┐
│  COMPANY: Acme Corp                 │
│  ROLE: HR Director                  │
│  FIT SCORE: 7/8                     │
│  SKILL GAPS: HRIS (addressable)     │
├─────────────────────────────────────┤
│  [Preview Resume]  [Edit Resume]    │
│  [Preview Cover Letter]  [Edit CL]  │
├─────────────────────────────────────┤
│  Application Fields:                │
│  Why interested: [editable text]    │
│  Qualifications: [editable text]    │
│  Accomplishment: [editable text]    │
├─────────────────────────────────────┤
│  [Open Apply Page]  [Mark Submitted]│
└─────────────────────────────────────┘
```

`[Open Apply Page]` → opens apply_url in new tab (you paste/fill manually there).
`[Mark Submitted]` → sets application.status = 'submitted', timestamps it.

**You stay in control. Nothing auto-submits.**

---

## Pipeline Dashboard

Simple kanban board. 4 columns: Saved → Applied → Interviewing → Decision.
Cards show company, role, fit score, date.
Drag to move between columns.

Library: `@dnd-kit/sortable` (MIT).

---

## File & Folder Structure

```
folio-personal/
├── src/
│   ├── lib/
│   │   ├── supabase.ts          ← singleton client, MY_PROFILE_ID constant
│   │   ├── gemini.ts            ← API wrapper with streaming
│   │   ├── matchEngine.ts       ← fuse.js + compromise scoring
│   │   └── pdfGenerator.ts      ← pdfme wrapper
│   ├── pages/
│   │   ├── Profile.tsx          ← Engine 1: edit your resume DB
│   │   ├── Search.tsx           ← Engine 2: job search + save
│   │   ├── JobDetail.tsx        ← Engine 3+4+5: score + fill + generate
│   │   ├── Review.tsx           ← review + mark submitted
│   │   └── Pipeline.tsx         ← kanban tracker
│   ├── components/
│   │   ├── JobCard.tsx
│   │   ├── FitScoreBadge.tsx
│   │   ├── DocumentPreview.tsx
│   │   └── KanbanBoard.tsx
│   └── App.tsx                  ← router, no auth guard
├── netlify/functions/
│   └── gemini-proxy.ts          ← hides API key, streams response
├── supabase/migrations/
│   ├── 001_create_tables.sql
│   └── 002_seed_profile.sql     ← your hardcoded profile UUID
├── .env.example
└── package.json
```

---

## Dependencies (All MIT or Apache 2.0)

| Package | Purpose | Size impact |
|---------|---------|------------|
| `@supabase/supabase-js` | DB client | small |
| `fuse.js` | Fuzzy matching for Engine 3 | tiny |
| `compromise` | NLP skill extraction | medium |
| `@pdfme/generator` | PDF generation | medium |
| `@pdfme/ui` | PDF preview | medium |
| `docx` | DOCX cover letter export | small |
| `@dnd-kit/sortable` | Kanban drag-and-drop | small |
| `@tanstack/react-query` | Data fetching/caching | small |
| `sonner` | Toast notifications | tiny |

**No assistant-ui. No Zustand canvas state. No Stripe. No MSAL.**

---

## Build Order (10 days estimate at ~3 hrs/day)

| Day | Task | Done when... |
|-----|------|-------------|
| 1 | Scaffold: Vite + Supabase + router + .env | App loads, DB connected |
| 2 | DB migrations + seed profile | Tables exist, profile row inserted |
| 3 | Profile page (Engine 1) | You can edit and save your resume data |
| 4 | Job Search page (Engine 2) | Arbeitnow results display, Save works |
| 5 | Match Engine (Engine 3) | Fit scores appear on saved jobs |
| 6 | Gemini proxy Netlify Function | Streaming response confirmed |
| 7 | App Filler (Engine 4) | Pre-filled JSON returned and displayed |
| 8 | Document Engine (Engine 5) | PDF resume + cover letter generate |
| 9 | Review screen + Pipeline kanban | Full flow from search → submit works |
| 10 | Polish: error states, mobile layout, DOCX export | Ready to use |

---

## Gemini CLI Prompt to Start

```
Read GEMINI_RULES.md.

Build FOLIO Personal per FOLIO_PERSONAL_BLUEPRINT.md.

This is a single-user personal job search app for Mario Espindola.
No authentication. No multi-user. No Stripe. No landing page.

Start with Day 1–2:
1. Scaffold Vite + React 18 + TypeScript + Tailwind + Supabase client
2. Create .env.example with the 4 required variables
3. Write supabase/migrations/001_create_tables.sql (4 tables from blueprint)
4. Write supabase/migrations/002_seed_profile.sql
   (INSERT a single row into my_profile with placeholder data + a fixed UUID)
5. Confirm: "Scaffold complete. DB tables created. Ready for Engine 1."

Do not build any auth flow. Do not create any login page.
The app loads directly to the Profile page.
```

---

*Blueprint by Mario Espindola + Claude | FOLIO Personal v1.0*
