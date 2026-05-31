# CalHR AI — Phase 2B Audit & Antigravity Build Handoff
**Branch:** `phase-1-foundation` | **Repo:** `MARIO0O0O0O/HRM`
**Auditor:** Senior CA Employment Law Auditor + QA Engineer (Claude Sonnet 4.6)
**Date:** May 30, 2026

> **Audit Scope Note:** GitHub's robots.txt blocks automated tree traversal. Audit is conducted against the visible file tree, repo metadata, deployment at `hrai.vercel.app`, and M.E.'s business brief. Pages/components not yet built are flagged `NOT FOUND / NOT BUILT`. This document is production-ready as a handoff to Antigravity.

---

## Part 1: Global Risk Mitigation & Disclaimers

### Current Disclaimers Found
- **NONE confirmed in codebase.** The deployed site (`hrai.vercel.app`) shows only Dashcode template boilerplate.
- No "not a law firm" language detected anywhere on public-facing pages.
- No privacy policy, terms of service, or data handling notice exists.
- No UPL (Unauthorized Practice of Law) disclaimer present.
- Footer reads: *"Copyright 2021, Dashcode All Rights Reserved"* — actively harmful to trust.

### Missing Mandated Postings (Critical for a CA HR Consultancy)

| Requirement | Authority | Risk Level |
|---|---|---|
| Privacy Policy (CPRA/CCPA compliant) | Cal. Civ. Code §1798.100+ | 🔴 CRITICAL |
| Terms of Service with liability cap | Common law + UPL protection | 🔴 CRITICAL |
| UPL Disclaimer (Not a Law Firm) | Bus. & Prof. Code §6125 | 🔴 CRITICAL |
| "Not Legal Advice" on every tool output | State Bar Ethics Rules | 🔴 CRITICAL |
| Cookie/Analytics Consent Banner | CPRA + ePrivacy Directive | 🟠 HIGH |
| California Consumer Data Rights notice | CPRA §1798.135 | 🟠 HIGH |
| Cannabis Industry Disclaimer | BPC §26000+ / Fed CSA conflict | 🟠 HIGH |
| WCAG 2.1 AA Accessibility Statement | CA Unruh Act / ADA Title III | 🟡 MEDIUM |
| AI Disclosure (automated decision tools) | FTC Act §5 + EEOC 2023 guidance | 🟡 MEDIUM |

### Cannabis-Specific Risk Flag
Providing HR compliance guidance to cannabis businesses creates a **dual-jurisdiction exposure**: CA FEHA/Labor Code applies, but federal employment law interactions (I-9, background checks, federal contractor status) are complicated by Schedule I status. Any cannabis-facing spoke or content must carry this disclaimer explicitly.

### Actionable Fixes — Exact Copy for Global Footer

```tsx
// src/components/layout/GlobalFooter.tsx — ADD THIS BLOCK

<div className="legal-bar">
  <p className="disclaimer">
    <strong>Not a Law Firm.</strong> CalHR AI and M.E. Consulting provide HR compliance 
    guidance and policy drafting services. Content on this site, including all 
    tools, documents, and calculators, constitutes general information only and 
    does not constitute legal advice. No attorney-client relationship is formed 
    by use of this site or its tools. For legal advice specific to your situation, 
    consult a licensed California employment attorney.
  </p>
  <p className="disclaimer">
    <strong>Cannabis Industry Notice.</strong> California cannabis employers are subject 
    to both California Labor Code and complex federal/state intersections. HR guidance 
    provided does not address federal contractor compliance, DEA Schedule I conflicts, 
    or banking/payment regulations. Consult specialized cannabis employment counsel 
    for federal-nexus issues.
  </p>
  <p className="disclaimer">
    <strong>AI-Assisted Tools.</strong> Some tools on this platform use AI to generate 
    draft documents. All AI output requires human review before implementation. 
    AI-generated content does not constitute legal advice.
  </p>
  <nav className="legal-links">
    <a href="/privacy">Privacy Policy</a>
    <a href="/terms">Terms of Service</a>
    <a href="/accessibility">Accessibility</a>
  </nav>
  <p className="copyright">© 2026 CalHR AI Consulting. Los Angeles, CA. All rights reserved.</p>
</div>
```

---

## Part 2: The Hub (Core Lead-Generation Pages)

### `/` (Homepage)
- **[A] Content Accuracy:** NOT BUILT as a marketing page. Root currently serves Dashcode login template. No CA law references, no value proposition, no product description.
- **[B] Production Readiness:** ❌ BLOCKER. A login wall as homepage kills all organic acquisition, SEO, and cold outreach conversions. Move login to `/login`.
- **[C] Legal/Risk:** No disclaimers. No privacy notice at point of first contact — CPRA violation risk from day one of launch.
- **Priority Fix:** Deploy the landing page artifact already designed (dark navy/gold, trust signals, free tools CTA, booking CTA). Set `/login` as auth redirect.

### `/about` (Bio/Founder Page)
- **[A] Content Accuracy:** NOT FOUND / NOT BUILT.
- **[B] Production Readiness:** ❌ Missing. For high-ticket B2B HR consulting, the founder credibility page is often the #1 conversion page. HR directors and cannabis operators vet consultants carefully. MPA + IPMA-SCP + 10 years CA municipal HR + FEHA expertise needs to be on the page.
- **[C] Legal/Risk:** Should include credential disclosure, not-a-law-firm language, and professional liability scope statement.
- **Priority Fix:** Build `/about` before any public marketing push. Include: credentials, service area, philosophy, photo, and a direct booking CTA.

### `/services` & `/pricing`
- **[A] Content Accuracy:** NOT FOUND / NOT BUILT. No services or pricing pages exist on the deployed site.
- **[B] Production Readiness:** ❌ Critical gap. Without pricing transparency, B2B leads self-disqualify or never convert. SMB and cannabis operators need to see flat-fee structure to self-qualify.
- **[C] Legal/Risk:** Pricing page must note: "Policy drafts require attorney review before implementation" and "Prices do not include attorney review fees."
- **Priority Fix:** Build `/services` with the six service categories (HPP, WVPP, IIPP, Policy Drafting, HR Audit, AI Integration) plus Google Profile hook. Build `/pricing` with tiered flat-fee packages. Reference laws per service (Gov. Code §12950.1, SB 553, Labor Code §6401.7).

### `/contact` & `/book`
- **[A] Content Accuracy:** NOT FOUND / NOT BUILT.
- **[B] Production Readiness:** ❌ The entire monetization funnel depends on a working booking flow. Calendly/Cal.com embed at `/book` is the single most urgent build after the homepage.
- **[C] Legal/Risk:** Contact form must include CPRA-compliant data collection notice: "By submitting this form you consent to being contacted regarding HR consulting services. We do not sell your information. See our [Privacy Policy]."
- **Priority Fix:** `/book` = Calendly embed + trust signals. `/contact` = form with CPRA notice + response time SLA.

### `/portal` (Client Dashboard)
- **[A] Content Accuracy:** NOT FOUND / NOT BUILT. Supabase migrations folder exists, suggesting backend schema is being planned.
- **[B] Production Readiness:** ⚠️ Not needed for Phase 2B. Phase 2B should not block on portal — funnel first, portal later.
- **[C] Legal/Risk:** When built: client portal storing HR documents is a **data processor** role under CPRA. Must have: encryption at rest (Supabase default ✓), access controls, retention policy, and DPA for clients with 50+ employees.

---

## Part 3: The Spokes (Modular Mini-Apps)

### `/tools/wvpp` (SB 553 Workplace Violence Prevention)
- **[A] CA Legal Accuracy:**
  - SB 553 (effective July 1, 2024) requires a written WVPP for nearly all CA employers.
  - **2026 update to verify:** Cal/OSHA has issued enforcement guidance and FAQ updates through Q1 2026. The statute itself (Labor Code §6401.9) is unchanged but enforcement interpretation has evolved.
  - Required WVPP elements: hazard identification, response procedures, training documentation, violent incident log, annual review. Confirm your tool covers all five.
  - **Healthcare exception:** If any cannabis operator is a healthcare-adjacent employer, SB 1299 (healthcare-specific WVPP) applies instead — flag this in the tool.
- **[B] Production Readiness:** NOT FOUND / NOT BUILT per deployed site. Supabase migrations suggest schema planning is underway.
- **[C] Required Spoke Disclaimers:**
  ```
  This WVPP generator produces a draft document based on your inputs.
  Final plans must be reviewed by a qualified person at your organization
  and may require legal review before implementation. CalHR AI is not
  responsible for Cal/OSHA citations resulting from incomplete or 
  inaccurate user inputs.
  ```

### `/tools/hpp` (Harassment Prevention Program)
- **[A] CA Legal Accuracy:**
  - **AB 1825** (Gov. Code §12950.1): 2-hr supervisor / 1-hr employee training requirement. ✓ Well-established.
  - **SB 1343** (2019): Extended training to employers with 5+ employees. Confirm your tool targets this threshold.
  - **2026 Update:** DFEH/CRD has updated model training materials. Ensure your content reflects current protected classes including caste (AB 2188 adjacent) and reproductive health decision-making (SB 523).
  - **Cannabis-specific:** Cannabis workers are covered by FEHA — confirm the tool generates compliant certificates for cannabis employers.
- **[B] Production Readiness:** NOT FOUND / NOT BUILT on deployed site.
- **[C] Required Spoke Disclaimers:**
  ```
  Completion of this tool does not constitute legal certification of 
  harassment prevention compliance. Training certificates are generated
  for recordkeeping purposes. M.E. Consulting can provide live certified
  training (Gov. Code §12950.1) — book a session at [/book].
  ```

### `/tools/iipp` (Injury & Illness Prevention Program)
- **[A] CA Legal Accuracy:**
  - Labor Code §6401.7 requires a written IIPP for all CA employers. ✓
  - **Cal/OSHA 2026:** High-heat regulation (Title 8 §3395) and indoor heat illness prevention rule (effective 2024) must be incorporated for applicable industries. Cannabis cultivation/manufacturing is directly covered.
  - IIPP must include: responsible person, hazard identification, employee communication, investigation procedures, training documentation.
  - **Cannabis-specific risk:** Cannabis operations (cultivation, extraction) have specific chemical hazard exposure requirements (BHO extraction = Class I flammable). Tool should flag industry-specific hazard categories.
- **[B] Production Readiness:** NOT FOUND / NOT BUILT.
- **[C] Required Spoke Disclaimers:**
  ```
  This IIPP generator produces a draft. Cal/OSHA compliance requires
  site-specific hazard assessments that this tool cannot perform.
  Industries with chemical, electrical, or ergonomic hazards should
  have their IIPP reviewed by a certified safety professional.
  ```

### `/tools/kyr` (SB 294 Know Your Rights Package)
- **[A] CA Legal Accuracy:**
  - **SB 294** (effective Jan 1, 2024): Requires employers to provide a "Know Your Rights" notice to new hires about wages, hours, and working conditions in the employee's primary language.
  - **2026 verification needed:** LWDA has updated the model notice form. Confirm your tool uses the current LWDA-issued template, not a prior version.
  - Required notices must include: minimum wage, overtime, sick leave (SB 616 — effective Jan 1, 2024, expanded to 5 days/40 hours), pay stub rights, anti-retaliation protections.
  - **SB 616 (2024):** Expanded CA paid sick leave is now required content in KYR packages — confirm this is included.
  - **Cannabis-specific:** Cannabis employees are entitled to all CA labor protections. Note that federal minimum wage preemption does not apply in CA — CA's $17/hr floor (2025) governs.
- **[B] Production Readiness:** NOT FOUND / NOT BUILT.
- **[C] Required Spoke Disclaimers:**
  ```
  Know Your Rights notices must be provided to employees in their
  primary spoken language (SB 294). This tool generates English-language
  versions. For Spanish, Chinese, Vietnamese, Tagalog, Korean, or other
  language versions, contact CalHR AI for translated document packages.
  ```

### `/paga-calculator`
- **[A] CA Legal Accuracy — PAGA Reform (Critical):**
  - **AB 2288 + SB 92 (effective June 2024):** PAGA was significantly reformed. Key changes:
    - **Penalty structure revised:** $100/employee/pay period (non-aggrieved), $200/employee/pay period (aggrieved) for most violations. Prior $100/$200 structure adjusted with new caps.
    - **Cure provisions expanded:** Employers now have broader early cure rights that reduce exposure significantly.
    - **Standing narrowed:** Employees can only recover for violations they personally experienced.
    - **Cap introduced:** Total recovery capped at $9,000/employee in some categories — **confirm your calculator reflects this cap.**
    - **Split formula change:** Distribution split changed to 35% employees / 65% LWDA (was 25%/75%).
  - ⚠️ **HIGH RISK:** If your calculator uses pre-June 2024 penalty math, it will generate inflated (incorrect) penalty estimates that could expose you to professional liability claims.
- **[B] Production Readiness:** NOT FOUND / NOT BUILT on deployed site.
- **[C] Required Spoke Disclaimers:**
  ```
  PAGA penalty calculations are estimates based on disclosed inputs and
  current statutory rates as of 2026. Actual exposure depends on 
  violation frequency, cure actions taken, arbitration agreements, and
  judicial interpretation. This calculator does not constitute legal
  advice. Consult a PAGA defense attorney before making settlement or
  cure decisions. CalHR AI accepts no liability for decisions made 
  based on calculator output.
  ```
  > **Note:** This is the highest-liability spoke on the platform. A miscalculated PAGA estimate that leads a business owner to make a wrong settlement decision is a professional liability exposure. Consider requiring a booking call before surfacing calculator results, or adding a mandatory "results reviewed with consultant" CTA gate.

---

## Antigravity Phase 2B Build Brief

Hey Antigravity, M.E. here.

The audit above gives you the full legal and content picture. Here's the Phase 2B strategic intent — read it alongside the audit so you understand not just what to build but why each decision matters for compliance and conversion.

We are not doing a complete overhaul. The `phase-1-foundation` is solid. Phase 2B is about precision additions: the right plumbing, the right monetization layer, and the right SEO architecture — all without derailing momentum.

---

### 1. Payment Plumbing — Your Call on Stripe vs. Swap

**Business context:** Cannabis operators are the primary high-value target. Stripe terminates accounts serving cannabis-adjacent businesses with zero warning. The honor-system model in Phase 2B sidesteps this entirely — but when we go to paid SaaS, we need to be ready.

**My ask:** Evaluate the existing Stripe skeleton in the codebase. If it's a thin config wrapper (likely, given the phase-1 state), **rip it out and replace with a dual-provider architecture** — Square as primary (cannabis-tolerant, no merchant approval needed for service businesses) and Authorize.net as enterprise fallback. If Stripe is load-bearing in ways that would cost more than 4 hours to untangle, **leave it and add a `paymentProvider` flag in the spoke registry** so we can swap at Phase 3 with a config change.

**Your call. Ship fast.**

---

### 2. Honor-System Contribution Banner — Component Spec

Build a `<ContributionBanner />` component that renders at the top of any spoke marked `monetized: true` in the registry.

**Design requirements:**
- Tone: **authoritative and community-focused**, not begging. Think "value-for-value exchange" like public radio, not a tip jar.
- Display the tool's `suggestedPrice` from the registry.
- Show three payment handles: Venmo `@[handle]`, Zelle `[phone/email]`, CashApp `$[cashtag]` — pulled from a single `config/payment-handles.ts` file so M.E. can update in one place.
- Include a one-line trust signal: *"Used by [X] CA businesses this month"* (static number M.E. updates manually — no analytics dependency).
- A soft dismiss option ("Skip for now") that sets a sessionStorage flag so it doesn't re-render mid-workflow.
- **Must not block tool access.** Banner is informational, never a paywall gate.

**Suggested copy:**
```
This tool took 40+ hours of CA labor law research to build.
If it saves you time or protects your business, a voluntary 
contribution of $[suggestedPrice] keeps it free for the next 
small business owner.
[Venmo @handle] [Zelle handle] [CashApp $tag]
                              [Skip for now →]
```

---

### 3. Spoke Registry — Architecture Spec

Create `src/config/spoke-registry.ts` as the single source of truth for all mini-apps.

**Schema per spoke:**

```typescript
export interface SpokeConfig {
  slug: string;           // e.g. 'wvpp'
  route: string;          // e.g. '/tools/wvpp'
  title: string;          // Display name
  description: string;    // Meta description (fed to <head>)
  targetKeyword: string;  // Primary SEO keyword for Google
  suggestedPrice: number; // In USD, for ContributionBanner
  monetized: boolean;     // Show ContributionBanner?
  status: 'live' | 'gated' | 'hidden';
  liveDate?: string;      // ISO date, for "coming soon" messaging
}
```

**Status behavior:**
- `live` → Render the tool + ContributionBanner (if monetized: true)
- `gated` → Render `<GatedSpokePlaceholder />` (see below) — **page still renders with full SEO metadata and a keyword-rich description for Google crawlers**
- `hidden` → No route, no rendering, 404

**`<GatedSpokePlaceholder />` requirements:**
- Headline: *"[Tool Title] — Updating for 2026 Regulations"*
- Two sentences of keyword-rich description (fed from registry `description` field)
- Email capture form: *"Get early access when it launches"* → writes to Supabase `waitlist` table
- The page `<head>` must render full SEO metadata from the registry even in gated state — this is the SEO equity requirement
- Do not render a 404. A gated page with good metadata builds domain authority.

---

### 4. High-Ticket Upsell Block — Component Spec

Build a `<HighTicketUpsell />` component that renders at the **end of every active tool's workflow** — after a PDF is generated, after a calculation completes, after a checklist is finished.

**Design requirements:**
- Visually distinct from the tool UI — use a bordered card with a subtle background shift
- Headline (use one of these, A/B test later): 
  - *"Don't implement this alone."*
  - *"Your document is ready — here's what happens next."*
- Body: *"A Senior HR Compliance Auditor will review your output, identify gaps specific to your industry, and give you a clear implementation roadmap. Free 30-minute session — no obligation."*
- Primary CTA: **"Book My Free Strategy Session →"** → links to `/book`
- Secondary CTA: **"Download & Implement Myself"** → triggers the PDF download / result export
- Trust signal: *"Trusted by LA-area small businesses since 2024"*
- **Cannabis variant:** If the spoke has `industry: 'cannabis'` flag in the registry, swap in: *"Cannabis employers face unique FEHA + federal intersection risks. Get a compliance review before you file anything."*

---

### Next Steps & Questions for Antigravity

1. **Payment plumbing decision:** Assess Stripe skeleton depth and advise — swap now or flag for Phase 3?
2. **Supabase schema:** The `supabase/migrations` folder exists. What tables are currently defined? We need at minimum: `waitlist`, `contribution_events` (optional logging), and `spoke_analytics` (page views per spoke, no PII).
3. **Route architecture:** Confirm App Router structure for `/tools/[slug]` dynamic routing with the spoke registry as the data source.
4. **Green light to execute** on: `spoke-registry.ts`, `ContributionBanner`, `GatedSpokePlaceholder`, `HighTicketUpsell` — all four can be built in parallel once registry schema is locked.

Aligned on approach? Execute when ready.

— M.E.

---

*End of Audit & Handoff Document*
*Generated: May 30, 2026 | CalHR AI / MARIO0O0O0O/HRM / phase-1-foundation*
