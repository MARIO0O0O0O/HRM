# Task 011 (3-Card Spokes Drawer Architecture): Refactor Spokes Canvas

**Status**: COMPLETED  
**Branch**: `agent/spokes-drawer-011`  
**Date**: 2026-08-26  

---

## 1. Objective
Refactor the Spokes Directory from a traditional vertical accordion into a zero-scroll 3-Card Spokes Drawer Architecture featuring 3 high-contrast Category Cards and a slide-over 3-tier drawer sheet (Category $\rightarrow$ Compliance Area $\rightarrow$ Subjects & Services).

---

## 2. 3-Card Category Inventory

1. **Card 1: Safety & Workplace Prevention (`ShieldCheck`)**
   - **Badge**: `3 Compliance Areas`
   - **Areas**: Workplace Violence (SB 553 / LC §6401.9), Harassment Prevention (SB 1343), Cal/OSHA IIPP (8 CCR §3203).
   - **Featured Toolkits**: WVPP Toolkit ($199), HPP DIY Toolkit ($149), 9-Section IIPP Toolkit ($199).

2. **Card 2: Wage & Hour Defense (`DollarSign`)**
   - **Badge**: `3 Compliance Areas`
   - **Areas**: Paystubs & Wage Statements (LC §226), Meal & Rest Breaks, Overtime & Classification.
   - **Featured Toolkits & Audits**: Payroll Exposure Audit & Correction, Break Workflow System Design.

3. **Card 3: Employee Lifecycle Admin (`UserCheck`)**
   - **Badge**: `2 Compliance Areas`
   - **Areas**: Onboarding & Wage Notices (LC §2810.5 / Form I-9), Terminations & Final Pay (LC §§201-203).
   - **Featured Toolkits & Advisory**: KYR Toolkit ($49), Manager Support & Separation Advisory.

---

## 3. Verification Protocol
- [x] Refactor `Sidebar.tsx` canvas to 3 persistent Category Cards.
- [x] Implement slide-over Drawer Sheet (Sheet) triggered on Category card click.
- [x] Provide 3-Tier hierarchy (Category header, Area accordions, Subjects, and highlighted Toolkit action buttons).
- [x] Run Vitest test suite and Next.js static build to ensure 100% pass rate.
