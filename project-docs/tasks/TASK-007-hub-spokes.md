# Task 007 (Hub-Spokes Overhaul): CalBizHR Hub & 3-Tier Spokes Architecture Overhaul

**Status**: IN_PROGRESS  
**Branch**: `agent/antigravity-hub-spokes`  

---

## 1. Mission Overview
Overhaul the primary CalBizHR interface to match a zero-scroll (`100dvh`) 8-tile Hub and 3-Tier Compliance Spokes architecture. 

---

## 2. Requirements Checklist

### A. Zero-Scroll Mobile Viewport & 8-Tile Hub Grid
- [ ] Container locked to `100dvh` (`overflow: hidden` on viewport, zero document scrolling).
- [ ] Compact 2x4 responsive grid on mobile (4x2 on desktop) featuring exactly 8 persistent tiles:
  1. **PAGA Risk Center**: Interactive statutory penalty exposure calculator (Labor Code §2698) & 60-day cure guidelines.
  2. **AI & Automation Governance**: CRD Automated Decision System regulations, hiring bias disclosures, and AI tool lab.
  3. **Legal Insights & Blog**: California labor law updates and defense briefings.
  4. **Founder Bio**: Mario Espindola, MPA profile and mission.
  5. **Advisory Intake**: Consultation intake form.
  6. **Booking & Scheduling**: 30-min diagnostic session booking ($75 fee credited toward ongoing packages).
  7. **Payment Portal**: Zelle, Venmo, Cash App, and Stripe retainer options.
  8. **Defense Campaign**: Contributions to small business compliance defense and free legal tools.

### B. 3-Tier Persistent Spokes Directory (Sidebar Drawer)
- [ ] Expandable/collapsible sidebar drawer (mobile drawer + desktop persistent/collapsible sidebar).
- [ ] Strict 3-tier hierarchy: **Category -> Compliance Area -> Specific Subjects & Services**:
  - **Category 1: Safety & Workplace Prevention**
    - Area: SB 553 Workplace Violence (Subjects: Written WVPP, Violent Incident Log; Service: Training Implementation).
    - Area: SB 1343 Harassment Prevention (Subjects: Timelines, Complaint Procedures; Service: HPP DIY Toolkit).
    - Area: Cal/OSHA IIPP Title 8 §3203 (Subjects: Core Mandates, Heat Illness; Service: 9-Section Toolkit).
  - **Category 2: Wage & Hour Defense**
    - Area: Paystubs & Wage Statements LC §226 (Subjects: 9 Itemizations, 60-Day Cure; Service: Payroll Exposure Audit).
    - Area: Meal & Rest Breaks (Subjects: Scheduling Rules, Premium Pay; Service: Workflow System Design).
  - **Category 3: Employee Lifecycle Admin**
    - Area: Onboarding & Wage Notices LC §2810.5 (Subjects: Wage Theft Notice, I-9; Service: Onboarding Flow Design).
    - Area: Terminations & Final Pay LC §201-203 (Subjects: Immediate Pay, Disciplinary SOPs; Service: Manager Support).

### C. Drill-Down Sheet / Modal Behavior
- [ ] Clicking any Hub tile or Spoke item opens an overlay modal/sheet.
- [ ] Overlay modal scrolls internally while keeping the background viewport locked.

### D. Data Integrity & Verification
- [ ] Founder profile: Mario Espindola, MPA.
- [ ] Contact info: Phone: `626-999-6239` | Email: `mario_espindola@outlook.com`.
- [ ] Payment handles: Venmo: `@marioo00` | Cash App: `10mario01` | Zelle: `mario_espindola@outlook.com`.
- [ ] Tag any unconfigured third-party scripts with `[PLACEHOLDER]`.
- [ ] Build & Test verification pass clean.

---

## 3. Deliverables
- `src/app/page.tsx` (8-tile zero-scroll hub with drill-down modals)
- `src/components/layout/Sidebar.tsx` (3-tier structured spokes navigation)
- `src/components/hub/HubTileModal.tsx` (Modal overlay component for drill-down views)
- `project-docs/reports/REPORT-hub-spokes.md`
- `project-docs/BUILD_LOG.md` entry
