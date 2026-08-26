# Task 010 (6-Tile Hub Streamline): Streamline Hub to 6-Tile Zero-Scroll Grid

**Status**: COMPLETED  
**Branch**: `agent/hub-6tile-010`  

---

## 1. Mission Overview
Streamline the primary CalBizHR interface to a zero-scroll 6-tile hub grid (2×3 on mobile, 3×2 on desktop), consolidating payment and retainer handles into Advisory Intake and Booking & Scheduling modals.

---

## 2. 6-Tile Hub Inventory

1. **PAGA Risk Center (`paga-risk`)**: AB 2288 Penalty Calculator & Cure Rules (`PagaNestedPortalModal`).
2. **AI & Automation Governance (`ai-automation`)**: CRD Decision Rules & Policy Architect.
3. **Legal Insights & Blog (`legal-insights`)**: California Labor Code Briefings.
4. **Founder Bio (`founder-bio`)**: Mario Espindola, MPA Profile & Mission.
5. **Advisory Intake (`advisory-intake`)**: Direct Compliance Outreach & Retainer handles (Zelle, Venmo, Cash App).
6. **Booking & Scheduling (`booking-scheduling`)**: 30-Min Diagnostic ($75 Credited) & calendar scheduling.

---

## 3. Viewport & Grid Locking
- Viewport height locked to `100dvh` (`overflow: hidden` on viewport, no document scrolling on mobile).
- Grid layout: `grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2` fitting `h-[calc(100dvh-56px)]`.

---

## 4. Verification Criteria
- [x] Streamlined 6-tile grid renders cleanly without scrolling on mobile (`100dvh`).
- [x] Retainer payment handles (Zelle: `info@mario00.com`, Venmo: `@marioo00`, Cash App: `10mario01`) consolidated into Advisory Intake & Booking modals.
- [x] Vitest test suite passes 100% (17/17 test files passed).
- [x] Next.js production build compiles clean (66/66 static pages).
