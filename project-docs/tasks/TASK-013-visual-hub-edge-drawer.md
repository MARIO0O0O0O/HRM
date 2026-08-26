# TASK-013 Specification: Visual 4-Tile Hub Grid & Persistent Edge Drawer

## Objective
Implement a persistent screen-edge pull drawer (`SPOKES ❯`) for the 3 Spokes cards, refactor the main dashboard into a zero-scroll (`100dvh`) 2x2 grid with 4 Visual Cards featuring image banners and 1-2 word titles, and update top header tabs & release banner.

## Architectural & Design Requirements

### 1. Persistent Edge Drawer (Spokes)
- Screen-edge tab pinned to the left screen border with label **`SPOKES ❯`**.
- Always visible on all screen sizes (mobile & desktop).
- Removes old hamburger menu icon from top header.
- Tapping/clicking the tab slides out the full-height drawer sheet containing the **3 Spokes Cards**:
  1. **Safety & Prevention (Emerald Accent):** Harassment (SB 1343), Workplace Violence (SB 553), Cal/OSHA (IIPP).
  2. **Wage & Hour (Cyan Accent):** Paystubs (LC §226), Breaks (LC §226.7), Timekeeping/Overtime.
  3. **Lifecycle Admin (Purple Accent):** Onboarding (LC §2810.5), Protected Leaves (CFRA), Terminations (LC 201-203).

### 2. Main Hub: Visual Cards (2x2 Grid, Zero-Scroll 100dvh)
- Lock primary viewport to `100dvh` (`overflow: hidden` on page canvas).
- Render a 2x2 grid fitting 375px+ mobile screens with zero document scrolling.
- 4 Cards featuring generated visual banners and 1-2 word copy:
  - **Tile 1: PAGA Risk**
    - Visual Banner: High-contrast legal scale/gavel illustration
    - Title: **PAGA Risk** | Subtitle: **Exposure Calculator**
    - Modal: Education -> Calculator Sub-View -> Cure Rules
  - **Tile 2: AI Governance**
    - Visual Banner: Modern AI / automation tech illustration
    - Title: **AI Governance** | Subtitle: **CRD Rules**
    - Modal: ADS Laws -> Bias Screener -> Vendor Indemnity
  - **Tile 3: Audit Checklists**
    - Visual Banner: Compliance audit clipboard illustration
    - Title: **Audit Checklists** | Subtitle: **Self Review**
    - Modal: Paystub, Break, Safety, and Notice interactive checks
  - **Tile 4: Fund & Invest**
    - Visual Banner: Investor / backing hands illustration
    - Title: **Fund & Invest** | Subtitle: **Defense Campaign**
    - Modal: Donations, Angel Investors, Monthly Retainers

### 3. Header & Release Banner
- **Header Tabs:** `[Bio]` | `[Blog]` | `[Book ($75)]` (opens dedicated modal views / routes).
- **Header Right:** Phone (`626-708-2220`) + Status badge: `BETA • Launch Jan 1, 2027`.
- **Top Release Banner:** *"⚡ CalBizHR (Beta): Full Launch Jan 1, 2027 | 2026 California Labor Code Active"*.

### 4. Contact & Identity Standard
- Phone: `626-708-2220`
- Email / Zelle: `info@mario00.com`
- Venmo: `@marioo00` | Cash App: `10mario01`
