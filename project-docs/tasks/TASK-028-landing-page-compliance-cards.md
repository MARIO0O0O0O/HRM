# TASK-028 — Landing Page Compliance Area Cards

**Status:** READY FOR EXECUTION
**Depends on:** TASK-027 merged and verified first
**Verification:** Claude verifies via Playwright screenshot at 412x892 and 1440x900 before merging.

---

## 1. CONTEXT

Founder reversed an earlier decision: compliance areas must NOT be hidden in a menu. They are the core service and belong boldly on the homepage body. This task adds 8 compliance area cards to the landing page, replacing the current hub-tile grid's role as primary content.

## 2. THE 8 CARDS, IN THIS ORDER, WITH THIS DATA

Build type: `ComplianceAreaCard { id, title, ctaLine, bodyText, tags: string[], accentColor, icon, status: 'ready' | 'coming-soon', href }`

| # | id | Title | CTA line (subheading) | Body | Tags | Icon | Accent | Status | href |
|---|---|---|---|---|---|---|---|---|---|
| 1 | harassment-prevention | Harassment and abusive conduct prevention | Required for every California employer with 5+ employees | Free compliance checklist, policy guide, and live training Q&A -- everything you need to meet the state's training mandate. | Checklist, Guide, Live Q&A | shield-check | teal | ready | `/spokes/safety-prevention/harassment-prevention` |
| 2 | onboarding-kyr | Onboarding and Know Your Rights | Wage theft notices and the 2026 annual KYR mandate | Free notice templates and a deadline tracker for both onboarding and annual compliance requirements. | Templates, Tracker | file-check | coral | ready | `/spokes/lifecycle-admin/onboarding` |
| 3 | meal-rest | Meal and rest period compliance | The single largest source of CA wage-and-hour litigation | Coming soon -- free premium-pay calculator and break-scheduling guide. | -- | clock | gray | coming-soon | `/spokes/wage-hour/meal-rest-breaks` |
| 4 | paga | PAGA compliance | Reduce exposure under the 2024 reform's cure provisions | Coming soon -- free exposure calculator and 60-day cure roadmap. | -- | scale | gray | coming-soon | `/paga-calculator` |
| 5 | wage-statements | Wage statements and pay transparency | 9 required items on every paystub, statewide | Coming soon -- free paystub audit checklist. | -- | receipt | gray | coming-soon | `/spokes/wage-hour/paystubs-wage-statements` |
| 6 | exempt-classification | Exempt salary and classification | Misclassification carries retroactive liability | Coming soon -- free classification decision guide. | -- | users | gray | coming-soon | `/spokes/wage-hour/timekeeping-classification` |
| 7 | wvpp | Workplace violence prevention | Mandatory written plan for nearly every CA employer | Coming soon -- free plan template and incident log. | -- | shield-alert | gray | coming-soon | `/spokes/safety-prevention/workplace-violence` |
| 8 | ai-automation | AI and automation compliance | Emerging CA rules on automated employment decisions | Coming soon -- free AI-use policy guide. | -- | cpu | gray | coming-soon | `/ai-governance` (confirm actual route -- may need to check existing `ai-automation` hub tile target) |

Assign each `accent` a real hex from a curated palette that stays legible against the navy/cream card surface -- do not use raw saturated colors. Use muted/desaturated tones consistent with the existing brand's restraint (e.g. teal ~`#0F6E56`, coral ~`#D85A30`). "Coming soon" cards use `gray` regardless of any assigned future accent -- accent only applies once a card is `ready`.

## 3. CARD ANATOMY (applies to all 8, ready or coming-soon)

- Icon (lucide-react, tinted to `accentColor`) top-left
- Title (serif, bold)
- CTA line directly below title, colored with `accentColor` -- only rendered for `ready` cards
- Body text -- only rendered for `ready` cards
- Tag pills -- only rendered for `ready` cards
- `coming-soon` cards: icon rendered in muted gray, title only, single "Coming soon" badge, `opacity-70` on the whole card, `cursor-default` (not clickable -- there is nothing to click through to yet)
- `ready` cards: entire card is a `<Link>` to `href`, `cursor-pointer`, hover state (subtle border-accent brighten)

## 4. LAYOUT

Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` for the 8 cards, positioned directly below the existing banner carousel, above the current hub-tile row.

## 5. EXISTING HUB TILES -- RELOCATE, DO NOT DELETE

Move the current 6-tile `HubGrid` component to a secondary section BELOW the new 8 compliance cards, with a small section label like "More from CalBizHR" (muted, small text, not competing with the compliance cards for attention). Remove `PAGA Risk Center` and `AI & Automation Governance` tiles from this secondary grid -- they're now redundant with compliance cards #4 and #8 above. The remaining 4 tiles (Legal Insights & Blog, Founder Bio & Defense Mission, Advisory Intake & Booking, Payments & Defense Fund) stay in this secondary row.

## 6. VERIFICATION CHECKLIST

- [ ] `pnpm build` -- zero errors
- [ ] All 8 cards render in correct order, correct ready/coming-soon state
- [ ] Both `ready` cards link correctly and are keyboard-focusable
- [ ] `coming-soon` cards are visually distinct (muted) and not clickable
- [ ] Secondary hub-tile row renders below, with PAGA and AI Automation tiles removed (down to 4 tiles)
- [ ] Screenshot at 412px confirms cards stack single-column and remain legible
- [ ] Screenshot at 1440px confirms 4-across grid, no overlap or overflow

**STOP POINT:** awaiting Claude's visual verification before merge.
