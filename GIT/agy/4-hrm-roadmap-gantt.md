# HRM SaaS Development Roadmap — Gantt Chart
> Google Antigravity on Windows | `[par]` = simultaneous agent sessions | ~30-day sprint

## Parallel Execution Rules (from Goose prompts)

| Phase | Parallel Group | Blocks | Dependency |
|-------|---------------|--------|------------|
| P1 | Group A | P16-B24 AUTH, P16-B34 DATA, P16-B44 NAV | All after P16-B14 completes |
| P2 | Group B | P26-B15 THEME, P26-B25 BRAND, P26-B55 SCHED | Start together day 9 |
| P2 | Group C | P26-B35 BLOG, P26-B45 LANDING | After Group B stable |
| P3 | Group D | P36-B14 SEO, P36-B24 SECURITY, P36-B34 LEGAL | Start together day 15 |
| P4 | Group E | P46-B24 CANVAS-UI, P46-B34 CANVAS-SEC | Both after P46-B14 arch |

---

## Mermaid Gantt

```mermaid
gantt
    dateFormat  YYYY-MM-DD
    title HRM SaaS Build Roadmap — 25 Blocks, 6 Phases
    axisFormat %b %d

    section Phase 0 – Preflight (Antigravity)
    P06-B15 TEAM-AGENTS        :p0b1, 2026-05-28, 2d
    P06-B35 ENV-SETUP          :p0b3, 2026-05-29, 2d
    P06-B25 ORCH-FLOW          :p0b2, after p0b1, 1d
    P06-B45 CFG-INTEGR         :p0b4, after p0b2, 2d
    P06-B55 RULES-TEST         :p0b5, after p0b3, 1d

    section Phase 1 – Foundation (Antigravity + Goose)
    P16-B14 APP-SCAFFOLD       :p1b1, 2026-06-02, 2d
    P16-B24 AUTH [par]         :p1b2, after p1b1, 2d
    P16-B34 DATA-MODEL [par]   :p1b3, after p1b1, 2d
    P16-B44 NAV-IA [par]       :p1b4, after p1b1, 2d

    section Phase 2 – UX & Content (Antigravity + Goose)
    P26-B15 THEME [par]        :p2b1, 2026-06-09, 3d
    P26-B25 BRAND [par]        :p2b2, 2026-06-09, 2d
    P26-B55 SCHED [par]        :p2b5, 2026-06-09, 2d
    P26-B35 BLOG-MVP           :p2b3, 2026-06-11, 3d
    P26-B45 LANDING-CRO        :p2b4, 2026-06-12, 3d

    section Phase 3 – SEO & Security (Antigravity + Goose)
    P36-B14 SEO [par]          :p3b1, 2026-06-15, 2d
    P36-B24 SECURITY [par]     :p3b2, 2026-06-15, 2d
    P36-B34 LEGAL [par]        :p3b3, 2026-06-15, 1d
    P36-B44 PERF-PWA           :p3b4, after p3b1, 2d

    section Phase 4 – Gemini Canvas (Antigravity + Goose)
    P46-B14 CANVAS-ARCH        :p4b1, 2026-06-19, 2d
    P46-B24 CANVAS-UI [par]    :p4b2, after p4b1, 3d
    P46-B34 CANVAS-SEC [par]   :p4b3, after p4b1, 2d
    P46-B44 CANVAS-DEPLOY      :p4b4, after p4b2, 2d

    section Phase 5 – Launch (Antigravity + Goose)
    P56-B13 BIO-CARD           :p5b1, 2026-06-26, 1d
    P56-B23 FINAL-TEST         :p5b2, after p5b1, 2d
    P56-B33 DEPLOY-LAUNCH      :p5b3, after p5b2, 1d
```

---

## Notes
- Paste this Mermaid block into any Markdown renderer (GitHub, Notion, Antigravity docs) to see the visual chart.
- `[par]` blocks are dispatched to separate Antigravity Agent Manager sessions simultaneously.
- Each block ends with a commit, push, and pull-request review before Goose advances the phase.
- Total estimated sprint: 30 working days from project kickoff.
