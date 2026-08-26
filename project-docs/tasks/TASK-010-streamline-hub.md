# Task 010 (Streamline Hub): Streamline Hub to 6-Tile Zero-Scroll Grid

**Status**: COMPLETED  
**Branch**: `agent/hub-streamline-010`  
**Date**: 2026-08-26  

---

## 1. Objective
Refactor the primary Hub dashboard from an 8-tile grid to a streamlined 6-tile grid (2x3 on mobile, 3x2 on desktop) by consolidating redundant transactional cards, enhancing visual iconography, and guaranteeing zero document scrolling at 100dvh.

---

## 2. 6-Tile Grid Specifications

### Tile 1: PAGA Risk Center (Amber — `Scale`)
- **Badge:** `LAW & RISK`
- **Main View (Tier 1):** PAGA statutory overview (LC §2698), penalty stacking ($100/$200 rates, 65/35 LWDA split), and reform cure caps (15% proactive / 30% 60-day).
- **Nested Sub-Views:**
  - *Sub-View A (Calculator):* Sliders for headcount, pay frequency, violations, and proactive cure toggle.
  - *Sub-View B (Checklist):* Self-audit across paystubs, meal breaks, safety, and notices with universal CA disclaimer.

### Tile 2: AI & Automation Governance (Cyan — `Sparkles`)
- **Badge:** `CRD RULES`
- **Main View (Tier 1):** California Civil Rights Department Automated Decision System (ADS) mandates and liability overview.
- **Nested Sub-Views:**
  - *Sub-View A (AI Bias Assessment):* Screener for hiring tools, resume filters, and employee surveillance.
  - *Sub-View B (Vendor Indemnity Checklist):* Mandatory contract clauses shielding employers from AI vendor liability.

### Tile 3: Legal Insights & Blog (Blue — `BookOpen`)
- **Badge:** `BRIEFINGS`
- **Main View (Tier 1):** California labor law updates and defense case studies.
- **Nested Sub-Views:**
  - *Sub-View A (Articles):* Labor code compliance briefings and case law summaries.
  - *Sub-View B (Deadlines):* Mandatory state compliance calendar (Pay Data, Cal/OSHA logs, CalSavers).

### Tile 4: Founder Bio & Defense Mission (Purple — `UserCheck`)
- **Badge:** `LEADERSHIP`
- **Main View (Tier 1):** Mario Espindola, MPA — 10-year public-sector HR leader and AI automation specialist.
- **Nested Sub-Views:**
  - *Sub-View A (Background & Credentials):* Municipal HR operational experience.
  - *Sub-View B (Defense Philosophy):* Why proactive auditing shields California small businesses.

### Tile 5: Advisory Intake & Booking (Emerald — `Calendar`)
- **Badge:** `CONSULTATION`
- **Main View (Tier 1):** Direct consultation overview and diagnostic intake options.
- **Nested Sub-Views:**
  - *Sub-View A (Book Diagnostic Session):* 30-minute review selector ($75 fee 100% credited toward services; includes placeholder for calendar widget).
  - *Sub-View B (Direct Message Intake):* Intake form for active wage/audit issues + instant tap-to-call/email (`626-708-2220` | `info@mario00.com`).

### Tile 6: Payments & Defense Fund (Indigo — `CreditCard`)
- **Badge:** `PAY & SUPPORT`
- **Main View (Tier 1):** Unified portal for client retainer payments and small business defense contributions.
- **Nested Sub-Views:**
  - *Sub-View A (Client Payments & Retainers):* P2P handles (Zelle: `info@mario00.com`, Venmo: `@marioo00`, Cash App: `10mario01`) and monthly retainers ($99 Starter / $249 Pro).
  - *Sub-View B (Small Business Defense Campaign):* Voluntary contribution buttons ($25, $50, $100) to support free California compliance tools.

---

## 3. Data Integrity & Verification Requirements
- Phone: `626-708-2220`
- Email: `info@mario00.com`
- Venmo: `@marioo00`
- Cash App: `10mario01`
- Zelle: `info@mario00.com`
- Container locked to `100dvh` (`overflow: hidden` on viewport, no document scrolling on mobile).
