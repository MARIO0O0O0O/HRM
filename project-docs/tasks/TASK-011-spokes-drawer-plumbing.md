# Task 011 (Spokes Drawer Multi-Level Accordion Plumbing): Technical Specification

**Status**: COMPLETED  
**Branch**: `agent/spokes-drawer-011`  
**Date**: 2026-08-26  

---

## 1. Objective
Implement the persistent Spokes drawer containing 3 modular cards with multi-level nested accordion plumbing (Card $\rightarrow$ Compliance Area $\rightarrow$ High-Level Programs/Mandates) and drill-down statutory modal sheets.

---

## 2. Technical Requirements

### 1. Responsive Drawer & Sidebar
- **Desktop ($\ge$1024px / `lg` breakpoint):** Docked persistent sidebar locked to left canvas with `100dvh` viewport and internal `overflow-y: auto`.
- **Mobile (<1024px):** Slide-in drawer sheet toggled via header/mobile bar button with an overlay backdrop (`Sheet`).

### 2. The 3 Modular Cards & Color Accents
1. **Workplace Safety & Prevention (Emerald Accent)**
   - Area 1: Harassment Prevention Program (SB 1343 / FEHA)
     - Mandates: Mandatory Training Cycles | Complaint & Investigation Procedures | Annual Policy Distribution
   - Area 2: Workplace Violence Prevention (SB 553 / LC §6401.9)
     - Mandates: Written Site-Specific WVPP | Violent Incident Logging | Interactive Staff Training
   - Area 3: Cal/OSHA & Safety (Title 8 CCR §3203)
     - Mandates: Injury & Illness Prevention (IIPP) | Indoor/Outdoor Heat Illness | Hazard Inspection Records
2. **Wage & Hour Defense (Cyan Accent)**
   - Area 1: Paystubs & Wage Statements (LC §226)
     - Mandates: 9 Statutory Itemizations | 60-Day PAGA Statutory Cure | Non-Discretionary Bonus Calculations
   - Area 2: Meal & Rest Periods (LC §226.7 / §512)
     - Mandates: 30-Minute Meal Scheduling | 10-Minute Rest Break Intervals | 1-Hour Premium Pay Records
   - Area 3: Timekeeping & Classification (IWC Orders)
     - Mandates: Daily/Weekly Overtime Standards | Exempt Salary Thresholds | Off-the-Clock Exposure Controls
3. **Employee Lifecycle & Relations (Purple Accent)**
   - Area 1: Hiring & Onboarding (LC §2810.5)
     - Mandates: Wage Theft Prevention Notice | Form I-9 Verification | Mandatory Pamphlet Distribution
   - Area 2: Protected Leaves & Accommodations (CFRA / ADA)
     - Mandates: 40-Hour Paid Sick Leave (SB 616) | CFRA Family Leave | ADA Good-Faith Interactive Process
   - Area 3: Terminations & Final Pay (LC §§201–203)
     - Mandates: Immediate Final Wage Payment | Separation Documentation | Waiting Time Penalty Prevention

### 3. Drill-Down Statutory Modal
- Clicking any level-3 mandate item opens `HubModal` populated with statutory citations, operational guidance, and action links.

---

## 3. Verification Protocol
- [x] Refactor `Sidebar.tsx` canvas into 3 modular cards with emerald, cyan, and purple color accents.
- [x] Build 3-level accordion expansion/collapse mechanics (Card $\rightarrow$ Area $\rightarrow$ Mandates).
- [x] Wire level-3 mandate items to drill-down `HubModal`.
- [x] Pass 100% of Vitest tests (`19/19` files, `37/37` tests).
- [x] Pass 100% of Next.js static build (`66/66` pages).
