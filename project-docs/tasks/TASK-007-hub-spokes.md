# Task 007 (Hub-Spokes Overhaul): CalBizHR Hub & 3-Tier Spokes Architecture Overhaul

**Status**: COMPLETED  
**Branch**: `agent/antigravity-hub-spokes`  

---

## 1. Mission Overview
Overhaul the primary CalBizHR interface to match a zero-scroll (`100dvh`) 8-tile Hub and 3-Tier Compliance Spokes architecture with interactive modal controllers and accurate identity/business data.

---

## 2. Requirements Checklist

### A. Zero-Scroll Mobile Viewport & 8-Tile Hub Grid
- [x] Container locked to `100dvh` (`overflow: hidden` on viewport, zero document scrolling on 375px–430px mobile).
- [x] Compact 2x4 responsive grid on mobile (4x2 on desktop) featuring exactly 8 persistent tiles:
  1. **PAGA Risk Center**: Interactive statutory penalty exposure calculator (Labor Code §2698) & 60-day cure guidelines.
  2. **AI & Automation Governance**: CRD Automated Decision System regulations, hiring bias disclosures, and AI tool lab.
  3. **Legal Insights & Blog**: California labor law updates and defense briefings.
  4. **Founder Bio**: Mario Espindola, MPA profile and mission.
  5. **Advisory Intake**: Consultation intake form.
  6. **Booking & Scheduling**: 30-min diagnostic session booking ($75 fee credited toward ongoing packages).
  7. **Payment Portal**: Zelle, Venmo, Cash App, and Stripe retainer options.
  8. **Defense Campaign**: Contributions to small business compliance defense and free legal tools.

### B. 3-Tier Expandable Accordion Spokes Directory
- [x] Expandable/collapsible sidebar drawer (mobile drawer + desktop persistent/collapsible sidebar).
- [x] Strict 3-tier hierarchy: **Category -> Compliance Area -> Specific Subjects & Services**:
  - **Category 1: Safety & Workplace Prevention**
    - *Area 1.1:* Workplace Violence (SB 553 / LC §6401.9)
      - Subjects: Written WVPP Plan, Violent Incident Log
      - Service: Training Implementation & WVPP Toolkit ($199)
    - *Area 1.2:* Harassment Prevention (SB 1343)
      - Subjects: Mandatory Training Timelines, Complaint Procedures
      - Service: HPP DIY Toolkit ($149) & Policy Overhaul
    - *Area 1.3:* Cal/OSHA IIPP (8 CCR §3203)
      - Subjects: Core Safety Mandates, Heat Illness Rules
      - Service: 9-Section IIPP Toolkit ($199)
  - **Category 2: Wage & Hour Defense**
    - *Area 2.1:* Paystubs & Wage Statements (LC §226)
      - Subjects: 9 Mandatory Itemizations, 60-Day PAGA Cure
      - Service: Payroll Exposure Audit & Correction
    - *Area 2.2:* Meal & Rest Breaks
      - Subjects: Break Scheduling Rules, Premium Pay Exposure
      - Service: Break Workflow System Design
  - **Category 3: Employee Lifecycle Admin**
    - *Area 3.1:* Onboarding & Wage Notices (LC §2810.5)
      - Subjects: Wage Theft Prevention Notice, Form I-9
      - Service: Onboarding Flow Design & KYR Toolkit ($49)
    - *Area 3.2:* Terminations & Final Pay (LC 201-203)
      - Subjects: Immediate Final Pay, Disciplinary SOPs
      - Service: Manager Support & Separation Advisory

### C. Modal Drill-Down Controller
- [x] Tapping any Hub tile or Spoke item triggers an overlay sheet/modal that scrolls internally, keeping the background locked.

### D. Data Integrity & Verification
- [x] Founder Profile: Mario Espindola, MPA (10-Year CA Public Sector HR Professional).
- [x] Phone: `626-999-6239` | Email: `mario_espindola@outlook.com`.
- [x] Payment Handles: Venmo (`@marioo00`), Cash App (`10mario01`), Zelle (`mario_espindola@outlook.com`).
- [x] Unlinked external integrations tagged with `[PLACEHOLDER]`.
- [x] Next.js Build (64/64 static pages clean) & Vitest suite (15/15 test files pass).

---

## 3. Deliverables
- `src/app/page.tsx` (8-tile zero-scroll hub with drill-down modals)
- `src/components/layout/Sidebar.tsx` (3-tier structured spokes navigation)
- `src/components/hub/HubGrid.tsx` & `src/components/hub/HubModal.tsx`
- `project-docs/reports/REPORT-hub-spokes.md`
- `project-docs/BUILD_LOG.md` entry
