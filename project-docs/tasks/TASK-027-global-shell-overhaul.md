# TASK-027 — Global Shell Overhaul: Header, Hamburger, Footer, Support Page

**Status:** READY FOR EXECUTION
**Depends on:** none
**Verification:** Claude verifies via Playwright screenshot at 412x892 and 1440x900 before merging. Do not merge without this.

---

## 1. CONTEXT

Founder decided compliance areas move OUT of the header nav entirely and onto the landing page as cards (see TASK-028). This task removes the now-redundant Spokes dropdown, redesigns the header/footer to match, and builds a real Support page since "Donate" is becoming a persistent nav item that needs a real URL, not a modal.

---

## 2. HEADER (`src/components/layout/Header.tsx`)

**Delete entirely:** the `spokeLinks` array and its dropdown (desktop) / sheet (mobile) rendering. Do not delete the 3 links themselves — they move to the Footer (see §4).

**Rebuild as two stacked bars, both breakpoints identical in structure:**

Bar 1 (main): Logo "CalBizHR" (serif, bold, gold "BizHR") + tagline directly beneath in small text: "AI-Powered Compliance. HR Verified." — single hamburger icon (`Menu` from lucide-react) right-aligned. Same trigger element on both desktop and mobile — no separate desktop tab row anymore.

Bar 2 (utility strip, thin, `bg-[#0f1c32]`-adjacent tone or similar subtle differentiation from Bar 1):
- Phone: `<a href="tel:6267082220">626-708-2220</a>`
- Email: `<a href="mailto:info@mario00.com">` — text content `INFO@MARIO00.COM`, wrapped in `font-mono` (JetBrains Mono is already the mono font in this project's Tailwind config — confirm the class, likely `font-mono` maps to it via `tailwind.config`). JetBrains Mono renders zero with a dot through it, disambiguating from letter O — no custom character needed, just the font.
- Donate: `<a href="/support">` with a small heart icon (`Heart` from lucide-react), gold-colored text
- Book a Call: existing `Button` styled as before, links to `/book`

On mobile, if the utility strip items don't fit one row, wrap to a second line rather than truncating anything — all 4 items (phone, email, donate, book) must remain visible, not hidden behind another tap.

**Hamburger menu contents** (same list, desktop = dropdown panel anchored top-right ~200-220px wide; mobile = full-height Sheet from the right, matching the existing Sheet pattern already in this file):

Each item gets a small leading icon (lucide-react, 16-18px, muted color):
- Home → `Home` icon → `/`
- About → `User` icon → `/about`
- Free Resources Library → `Folder` icon → `/library` (**new placeholder route, see §5**)
- Blog → `Newspaper` icon → `/blog`
- Fee Schedule → `Receipt` icon → `/pricing`
- Contact → `MessageCircle` icon → `/contact`
- Donate → `Heart` icon → `/support`

Then a visually de-emphasized "Legal" sub-group (small `Scale` icon on the group label, muted `text-[10px]` uppercase label like the existing pattern), each with its own small icon:
- Privacy Policy → `ShieldCheck` or `Lock` icon → `/privacy`
- Terms of Service → `FileText` icon → `/terms`
- Accessibility → `Accessibility` icon (or `Eye` if that lucide icon doesn't exist — check) → `/accessibility`

**Do NOT include:** Client Portal (removed from nav entirely per founder direction — the `/portal` route itself stays in the codebase, just no longer linked from header/hamburger/footer).

Mobile sheet keeps a "Book a Call" button repeated at the bottom, matching the existing pattern in this file.

---

## 3. SUPPORT PAGE — `src/app/support/page.tsx` (NEW)

Founder is looking for two different things from this page, not one — build both as clearly separated sections, in this order:

**Section A: Community Support**
Move the existing real, working PayPal donation flow here from `PaymentsFundNestedModal.tsx` (the `campaign` subview — the real Hosted Button integration, QR code, P2P handles `<details>` block). Reuse that exact working code; do not rebuild the PayPal integration from scratch. Framing: small businesses / community members supporting free compliance tools for other small businesses. $25-100 suggested range, open-amount PayPal Donate button (already built, just relocate).

Directly beside or below the PayPal button, add a second giving option: **GoFundMe campaign**, `https://gofund.me/8a0a7a7ca`. Render as a clearly labeled external link/button (opens `target="_blank" rel="noopener noreferrer"`, since it leaves the site), visually distinct from the PayPal button so it reads as "another way to give," not a duplicate of the same action — e.g. GoFundMe's green brand tone vs. PayPal's yellow. Short label like "Or support our GoFundMe campaign" is enough; do not fabricate campaign copy, goal amounts, or a story — link out to the real campaign page for that.

**Section B: Invest & Fund Operations**
New section, distinct visual treatment from Section A (different framing — this is not a donate button). Content:
- Short vision statement: CalBizHR is building a structured compliance database (SQL) to deliver services at the speed of large HR teams with the precision of law firms
- What funding accelerates: finishing the database build, expanding compliance area coverage, scaling free resources
- CTA: NOT a payment button. A contact path — link to `/contact` or a `mailto:info@mario00.com?subject=Investment Inquiry` link. Do not build a payment flow for this section; investor conversations happen off-platform.

**After this task lands:** update `PaymentsFundNestedModal.tsx`'s "Small Business Defense Fund" tile/button to link to `/support` instead of opening its own nested modal flow — the modal's `campaign` subview becomes redundant once this page exists. Keep the `tier1`/`retainers` subviews in the modal as-is (client retainer payments are a separate concern, not part of this task).

---

## 4. FOOTER (`src/components/layout/Footer.tsx`)

Restructure the flat link rows into a 4-column grid (`grid-cols-2 lg:grid-cols-4`, matching the confirmed mockup), keep the existing "Everything At a Glance" ticker section and the legal disclaimer block (Not a Law Firm / AI-Assisted Tools / Cannabis Industry Notice / copyright) exactly as-is — only the links-row section above the disclaimers gets restructured.

**Column 1 — Brand:** CalBizHR name, tagline, service area ("Los Angeles & San Gabriel Valley, CA"), phone number

**Column 2 — Explore:** Safety & Prevention (`/spokes/safety-prevention`), Wage & Hour (`/spokes/wage-hour`), Lifecycle Admin (`/spokes/lifecycle-admin`) — these are the 3 links preserved from the deleted Spokes dropdown — plus Free Resources Library (`/library`), Blog (`/blog`)

**Column 3 — Company:** About (`/about`), Contact (`/contact`) — no Client Portal

**Column 4 — Legal & Support:** Privacy Policy, Terms of Service, Accessibility, Donate (`/support`)

---

## 5. NEW PLACEHOLDER ROUTE — `src/app/library/page.tsx`

Simple "coming soon" placeholder — this becomes the real Free Resources Library once spoke content exists (aggregating every free checklist/guide across all 8 compliance areas). For now: page title, one sentence explaining what this will be, navy/gold styling matching the rest of the site. Do not build the actual resource-aggregation logic in this task — that depends on spoke content that doesn't exist yet.

---

## 6. VERIFICATION CHECKLIST

- [ ] `pnpm install --frozen-lockfile && pnpm build` — zero errors, zero unused-import warnings
- [ ] Spokes dropdown fully removed from Header.tsx (desktop and mobile)
- [ ] Header utility strip shows phone (tel: link), email in mono font with visible dotted zero, Donate link, Book a Call — on both breakpoints
- [ ] Hamburger has exactly 7 items + Legal group (3 items), each with an icon, no Client Portal
- [ ] `/support` page renders both sections, PayPal button in Section A actually renders (check for real iframe count like the earlier PayPal verification, not just an empty container)
- [ ] GoFundMe link in Section A points to `https://gofund.me/8a0a7a7ca`, opens in a new tab, visually distinct from the PayPal button
- [ ] `/library` placeholder renders, no 404
- [ ] Footer renders as 2-col grid on mobile (412px), 4-col on desktop (1440px)
- [ ] Footer disclaimer block text is byte-for-byte unchanged from before this task
- [ ] `/portal` route still exists and loads (just unlinked from nav — do not delete the route)
- [ ] No broken links — every new nav href resolves to a real page, not a 404

**STOP POINT:** Do not proceed to TASK-028 or TASK-029 until this is merged and verified live.
