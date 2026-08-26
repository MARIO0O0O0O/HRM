# Task 008 (PAGA Nested Portal): Refactor PAGA Risk Center Modal Into Multi-Tier Nested Portal

**Status**: COMPLETED  
**Branch**: `agent/paga-nested-008`  

---

## 1. Mission Overview
Refactor the PAGA Risk Center modal into a multi-tier nested portal featuring an Educational Hub (Tier 1), an Interactive Calculator sub-page (Tier 2 Sub-View A), and a Universal California Compliance Checklist sub-page (Tier 2 Sub-View B), with verified contact and identity data.

---

## 2. Architectural Requirements

### Tier 1: PAGA Educational Hub (Default Modal View)
- [x] Plain-English breakdown of California Labor Code § 2698 (PAGA) and 1-year statutory lookback.
- [x] Penalty math explanation ($100 initial / $200 subsequent per employee per pay period) and 65% LWDA / 35% employee split.
- [x] 2024–2026 PAGA Reform cure rules: 15% penalty cap for proactive audits (85% savings) and 30% cap for 60-day post-notice cures.
- [x] 3 Primary action buttons:
  - `[Calculate Risk Exposure]` -> transitions to Calculator Sub-View.
  - `[Review Audit Checklist]` -> transitions to Checklist Sub-View.
  - `[Book Diagnostic Consultation ($75)]` -> opens Booking modal.

### Tier 2: Sub-View A (PAGA Risk Calculator)
- [x] Real-time controls:
  - Non-exempt employee count slider (5 to 500, default 25).
  - Pay frequency selector (Weekly 52, Bi-Weekly 26, Semi-Monthly 24).
  - Violations per period counter (1 to 5).
  - "Apply Proactive Audit Cap" checkbox (applies 85% penalty reduction / 15% cap math).
- [x] Live exposure card showing: Total Estimated Liability, State LWDA Share (65%), Employee Share (35%).
- [x] Header `← Back to PAGA Guide` button returning to Tier 1.

### Tier 2: Sub-View B (Universal CA Compliance Checklist)
- [x] Interactive checklist with toggle checkboxes across 4 core exposure areas:
  - **Paystubs (LC § 226):** Legal entity name/address, inclusive pay dates, hourly rates & hours, gross/net wages, sick leave balance.
  - **Meal & Rest Breaks (LC § 226.7 / § 512):** Uninterrupted 30-min break by 5th hour, 10-min rest per 4 hours, 1-hr premium pay tracking.
  - **Safety & Cal/OSHA:** Written SB 553 WVPP plan, Violent Incident Log, Title 8 § 3203 IIPP.
  - **New Hire & Notices:** LC § 2810.5 Wage Notice, DFEH-185 pamphlet, required workplace posters.
- [x] Mandatory Disclaimer: *"Note: This checklist highlights common California Labor Code exposure areas. Specific statutory obligations vary across industries (e.g., hospitality, construction, healthcare). This tool is for diagnostic education and does not constitute formal legal counsel."*
- [x] Header `← Back to PAGA Guide` button returning to Tier 1.

### Contact & Identity Standards
- [x] Email / Zelle: `info@mario00.com`
- [x] Phone: `626-708-2220`
- [x] Venmo: `@marioo00`
- [x] Cash App: `10mario01`

---

## 3. Verification Criteria
- [x] Tapping main dashboard PAGA tile opens Tier 1 Educational Hub.
- [x] Sub-views transition smoothly inside modal without breaking zero-scroll 100dvh background.
- [x] Calculator math updates dynamically and sub-view back buttons return to Tier 1.
- [x] Vitest test suite passes 100% (17/17 test files passed).
- [x] Next.js production build compiles clean (66/66 static pages).
