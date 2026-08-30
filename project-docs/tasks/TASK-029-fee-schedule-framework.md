# TASK-029 — Fee Schedule Framework (structure only, no dollar figures)

**Status:** READY FOR EXECUTION
**Depends on:** TASK-027 merged (Fee Schedule is now a hamburger/footer nav target)
**Verification:** Claude verifies via Playwright screenshot before merging.

---

## 1. CONTEXT

Founder wants the FRAMEWORK built now; actual dollar amounts are deliberately deferred to a future deep-research pass on real CA market rates. Do not invent, estimate, or hardcode any dollar figures in this task. Every price field renders a clearly-marked placeholder (e.g. "TBD" or "--") until real numbers are supplied.

**Replaces existing content:** `src/app/pricing/page.tsx` currently has an unrelated SaaS-style subscription tier model (Starter $99/mo, etc.). Delete that content entirely -- it does not match the new hourly + flat-fee model and should not be merged with it or left reachable.

## 2. THE PRICING MODEL (for reference -- do not hardcode as copy, this is context for why the schema looks the way it does)

Founder's actual strategy, so the data model supports it correctly:
1. Launch: 20% below market rate
2. Quarterly step-up increases until market rate is reached
3. Once the SQL database (separate, future initiative) is live: jump to 25% above market (premium tier)
4. From there: re-priced every 6 months based on CPI

This means prices are NOT static constants in the page component -- they must read from a small config object that can be updated without touching page markup.

## 3. RATE CONFIG — `src/data/fee-schedule.ts` (NEW)

```typescript
export interface FeeItem {
  id: string
  label: string
  type: 'hourly' | 'flat'
  amount: number | null // null = not yet researched/set
  unit?: string // e.g. "per hour", "per session", "per employee"
  notes?: string
}

export interface PricingPhase {
  phase: 'launch' | 'stepping-up' | 'market-rate' | 'premium' | 'cpi-adjusted'
  label: string
  description: string
  lastAdjusted: string | null // ISO date, null until first real adjustment
  nextScheduledReview: string | null
}

export const currentPricingPhase: PricingPhase = {
  phase: 'launch',
  label: 'Launch pricing',
  description: 'Approximately 20% below market rate, increasing quarterly toward market rate.',
  lastAdjusted: null,
  nextScheduledReview: null, // set once real launch date is confirmed
}

export const feeSchedule: FeeItem[] = [
  { id: 'general-hourly', label: 'General HR consulting', type: 'hourly', amount: null, unit: 'per hour' },
  { id: 'nonsupervisor-training', label: 'Non-supervisor harassment prevention training', type: 'flat', amount: null },
  { id: 'supervisor-training', label: 'Supervisor harassment prevention training', type: 'flat', amount: null },
  { id: 'wvpp-training', label: 'Workplace Violence Prevention training', type: 'flat', amount: null },
  // additional flat-fee training items to be added during the deep-research pass
]
```

Populate additional `feeSchedule` entries as placeholders for "other trainings" the founder mentioned -- use your best judgment on 2-3 additional plausible training categories (e.g. IIPP training, wage-and-hour compliance training) with `amount: null`, clearly understood as placeholders to be confirmed later, not researched or guessed at in this task.

## 4. PAGE — `src/app/pricing/page.tsx` (REPLACE existing content)

- Hero: "Fee Schedule" title, one sentence explaining the hourly + flat-fee structure
- Section: "Hourly services" -- lists all `type: 'hourly'` items from `feeSchedule`, price column renders "Rate TBD" styled distinctly (muted, italic) when `amount === null`
- Section: "Flat-fee trainings" -- same treatment for `type: 'flat'` items
- Small footnote referencing `currentPricingPhase.description` so the page is honest about being in launch pricing, without displaying founder-internal strategy details (do not mention "25% premium" or "SQL database" on the public page -- that's internal strategy, not customer-facing copy)
- CTA at page bottom: Book a Call button

## 5. VERIFICATION CHECKLIST

- [ ] `pnpm build` -- zero errors
- [ ] Old subscription-tier content fully removed from `/pricing`
- [ ] No dollar amount appears anywhere on the page or in `fee-schedule.ts` -- every price shows a clear "TBD" placeholder
- [ ] Page reads data from `fee-schedule.ts`, not hardcoded inline values
- [ ] Public copy does not reveal internal pricing strategy (no "25% above market", no "SQL database" mention on this page)
- [ ] Screenshot at 412px and 1440px confirm clean rendering

**STOP POINT:** awaiting Claude's visual verification before merge.
