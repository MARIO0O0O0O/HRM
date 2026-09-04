# TASK-032: CalBizHR Repository Audit — Phases 2–4 (Deep-Dive & Synthesis)

**Owner**: Antigravity CLI  
**Priority**: High  
**Dependency**: TASK-031 (Phase 1 manifest must be complete)  
**Estimated time**: 2–3 hours total (split across phases)  

---

## Overview

After TASK-031 completes, this task runs three additional phases to audit 11 CalBizHR repos:

- **Phase 2**: Deep inventory & content classification (per-repo)
- **Phase 3**: Strategic analysis & migration recommendations (key repos only)
- **Phase 4**: Consolidated report & decision matrix

This task bundles all three phases with sub-instructions for each. **Run them in order**, one at a time.

---

## PHASE 2: Content Inventory (Per-Repo, 30–90 min per repo)

### Objective
For each repository (prioritized by Phase 1 status), generate a complete file/document inventory. Classify content type, identify old vs. current data, and flag compliance figures.

### Instructions — Phase 2A: calbizhr_intel (HIGH PRIORITY)

**This repo is research/law staging.** Read in full: README.md, AGENTS.md, TOOLING.md.

1. Generate complete file tree of `02_LAW_MAPPING/`, including:
   - Each law inventory file (name, last modified, verification_status)
   - Which areas are verified vs. pending vs. partial

2. For each law area, note:
   - Compliance figures found (list them)
   - Unverified claims flagged
   - Open questions still pending

3. Assess promotion-gate readiness (to calbizhr_registry):
   - Which files meet all 4 promotion criteria?
   - Which are blocked by unresolved flags?

4. **Output**:
```markdown
# calbizhr_intel — Phase 2A: Content Inventory

## Overview
- **Status**: [ACTIVE/DORMANT]
- **Last Commit**: [date]
- **Purpose**: Research & law-staging repo
- **Total Law Inventories**: [N]

## Law Inventory Status

| Area | File | Verification | Maturity | Blocked By |
|------|------|--------------|----------|-----------|
| Harassment Prevention | harassment-prevention/LAW_INVENTORY.md | VERIFIED | draft | None — ready |
| Onboarding/KYR | onboarding-know-your-rights/LAW_INVENTORY.md | PARTIAL | draft | [list open] |
| [Area N] | [file] | [status] | [maturity] | [blocker or "None"] |

## Promotion-Ready Files
- [ ] File 1 → calbizhr_registry
- [ ] File 2 → calbizhr_registry
- [Total: N files ready]

## Compliance Figures by Area
- [HPP]: [list with verification status]
- [WVPP]: [list with verification status]
- [etc.]

## Key Findings
- **Strongest inventory**: [which area]
- **Most flagged/incomplete**: [which area]
- **Stale branding**: [Y/N]

## Recommendation
Promote N files to registry; keep M files staging for follow-up verification.

## Next Step
→ Phase 2B (HRM) or Phase 2C (calbizhr_registry)
```

### Instructions — Phase 2B: HRM (QUICK CHECK, 15 min)

**Live production repo.** Fast audit: branding, branches, pending tasks.

1. Read: README.md, `project-docs/BUILD_LOG.md`, `project-docs/SOURCE_OF_TRUTH.md`
2. Search codebase for stale branding (HRBiz, HRBIZ, hrbiz.org, Sapphos)
3. Check: Active branches, last deploy, any blocked tasks

4. **Output**:
```markdown
# HRM — Phase 2B: Production Audit

## Overview
- **Status**: ACTIVE (production)
- **Last Commit**: [date]
- **Active Branch**: phase-1-foundation
- **Deploy**: [Vercel auto-deploy active?]

## Branding Audit
- HRBiz references: [0 found or list files]
- HRBIZ references: [0 found or list files]
- hrbiz.org references: [0 found or list files]
- Old client names: [0 found or list files]

## Current Status
- **Last documented task**: [from BUILD_LOG]
- **Blockers**: [from SOURCE_OF_TRUTH or none]
- **Cleanup needed**: [Y/N + list if Y]

## Recommendation
[Production-ready OR Flag cleanup items before next release]

## Next Step
→ Phase 2C (calbizhr_registry) or Phase 2D (Batch repos)
```

### Instructions — Phase 2C: calbizhr_registry (QUICK CHECK, 10 min)

**Promotion gate repo.** Mostly empty — what should be promoted from intel?

1. Read README.md (promotion gate rules)
2. Compare against Phase 2A output: which files are ready?
3. What's currently in this repo?

4. **Output**:
```markdown
# calbizhr_registry — Phase 2C: Gate Status

## Promotion Gate (from README)
[Summarize 4 criteria for intel → registry migration]

## Files Eligible for Promotion (from Phase 2A)
- [ ] File 1
- [ ] File 2
- [N total]

## Currently in Registry
[List files or note "Empty"]

## Recommendation
First promotion batch: [N files from calbizhr_intel]

## Next Step
→ Phase 2D (Batch repos)
```

### Instructions — Phase 2D: Abandoned/Learning Repos (BATCH, 45 min)

**Quick assessment of 8 repos**:
- HRBIZ.ORG_Consultancy, smbhr, CrownAct, HarassmentPreventionTraining
- bizhr_reorg, hrbiz.org, Compliance-Toolkit, regagent-ca-package

For each repo:
1. Clone (shallow if >90 days old)
2. Read README only (5 min max per repo)
3. Last commit date + message
4. Scan for: compliance templates, training materials, source code
5. Decide: Migrate / Extract-then-archive / Keep-as-reference / Delete

**Output** (one entry per repo, compact):

```markdown
# [Repo Name] — Phase 2D: Assessment

**Status**: [ABANDONED/DORMANT]
**Last Commit**: [date]
**Purpose**: [from README]

**Content**:
- Compliance templates: [Y/N]
- Training materials: [Y/N]
- Source code: [Y/N — what?]

**Decision**: Migrate / Extract-then-archive / Keep / Delete

**If Migrate/Extract**:
- [Template 1] → [destination]
- [Code] → [destination]

**Stale branding**: [Y/N]

---

[Repeat for each of 8 repos]
```

---

## PHASE 3: Strategic Analysis (Key Repos Only, 30–45 min per repo)

### Objective
For **ACTIVE and DORMANT repos that contain compliance content or source code**, analyze strategy, maturity, and reusability.

### Instructions — Phase 3A: calbizhr_intel (If not done in Phase 2)

1. Map content to CalBizHR business model:
   - Aligned with current three-tier model? (free → DIY → Done-For-You)
   - Which compliance areas covered? (HPP, WVPP, KYR, Wage & Hour, etc.)

2. Is this repo the authoritative source for law inventories going forward?

**Output**:
```markdown
# calbizhr_intel — Phase 3A: Strategic Analysis

## Business Alignment
- **Compliance areas**: [HPP, WVPP, KYR, Wage & Hour, Exempt Classification, PAGA, AI Automation]
- **Authoritative source**: Yes — all law inventories live here
- **Reusability**: High — feeds calbizhr_registry + HRM training content

## Maturity
- **Stage**: Mature research staging
- **Maintenance**: Active (ongoing verification rounds)

## Migration Decision
**Action**: Keep as primary staging repo. Promote verified files to calbizhr_registry as needed.

## Next Step
→ Phase 3B (HarassmentPreventionTraining or other training repo)
```

### Instructions — Phase 3B: Training Content Repos

If **HarassmentPreventionTraining** or similar repos exist and contain training materials:

1. Code maturity: Is this trainable as-is? Needs refactor?
2. Can sections be extracted and integrated into HRM web app?
3. Does it align with the verified 2 CCR § 11024(c) content requirements?

**Output**:
```markdown
# [Training Repo] — Phase 3B: Strategic Analysis

## Alignment with § 11024(c) Requirements
- Covers required topics: [Y/N — list]
- Can be adapted to web platform: [Y/N — estimate effort]

## Migration Decision
**Action**: [Migrate to HRM / Extract then archive / Keep as reference / Delete]

**If Migrate**: Estimated refactor hours: [X]

## Next Step
→ Phase 4 (Consolidated report)
```

---

## PHASE 4: Consolidated Report (30 min)

### Objective
Synthesize findings into a single decision document.

### Instructions

1. Compile stats from Phases 2–3:
   - Total repos: 11 (ACTIVE, DORMANT, ABANDONED breakdown)
   - Compliance files found by area
   - Code that can migrate to HRM
   - Stale branding cleanup items

2. Group repos by decision outcome:
   - **Migrate**: [list]
   - **Extract-then-archive**: [list + what to extract]
   - **Keep as reference**: [list]
   - **Delete**: [list]

3. Prioritize migration work by:
   - Business impact (compliance on critical path)
   - Effort (small wins first)
   - Dependencies (does one unblock another?)

### Output

```markdown
# CalBizHR Repository Audit — Final Report (Phase 4)

**Generated**: [date]
**Repos audited**: 11
**Time invested**: [X hours]

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| ACTIVE repos | [N] |
| DORMANT repos | [N] |
| ABANDONED repos | [N] |
| Repos to migrate | [N] |
| Repos to archive | [N] |
| Compliance files (intel) | [N] |
| Training materials found | [N] |
| Stale branding items | [N] |

---

## Decision Matrix

### Migrate to HRM
| Repo | Content/Code | Effort | Timeline |
|------|--------------|--------|----------|
| HarassmentPreventionTraining | Training modules | [X hours] | Phase [Y] |
| [repo] | [content] | [effort] | [timeline] |

### Extract-then-Archive
| Repo | Extract | Timeline |
|------|---------|----------|
| Compliance-Toolkit | [templates] | Phase [Y] |
| [repo] | [content] | [timeline] |

### Keep as Reference
| Repo | Reason |
|------|--------|
| [repo] | Historical record of early prototypes |

### Delete
| Repo | Reason |
|------|--------|
| [repo] | Learning-curve artifact, no business value |

---

## Cleanup Checklist

- [ ] Branding (HRBiz → CalBizHR): [N items in M repos]
- [ ] Compliance figures flagged for verification: [N items]
- [ ] Broken links fixed: [N items]

---

## Prioritized Next Steps

1. **[Highest-impact action]** — [effort estimate] — Owner: Antigravity/Claude
2. **[Second action]** — [effort estimate]
3. **[Third action]** — [effort estimate]

**Total estimated cleanup time**: [X hours]
**Recommended start date**: [ASAP or specific date]

---

## Recommendations

[Summary of key findings + suggested strategy going forward]

---

## End of Report

**Archive location** for this report: `project-docs/reports/repo-audit-final-report.md`
```

---

## Execution Order

```bash
# After TASK-031 completes (Phase 1 manifest):

# Phase 2A: calbizhr_intel (HIGH PRIORITY)
agy prompt "[Phase 2A instructions above, in full]" \
  --output project-docs/reports/repo-audit-phase2a-calbizhr-intel.md

# Phase 2B: HRM (QUICK)
agy prompt "[Phase 2B instructions above, in full]" \
  --output project-docs/reports/repo-audit-phase2b-hrm.md

# Phase 2C: calbizhr_registry (QUICK)
agy prompt "[Phase 2C instructions above, in full]" \
  --output project-docs/reports/repo-audit-phase2c-registry.md

# Phase 2D: Batch repos (8 repos, one pass)
agy prompt "[Phase 2D instructions above, in full]" \
  --output project-docs/reports/repo-audit-phase2d-batch.md

# Phase 3: Strategic analysis (key repos only)
# [Run per-repo or as bundle, depending on findings from Phase 2]

# Phase 4: Consolidated report (synthesis)
agy prompt "[Phase 4 instructions above, in full]" \
  --output project-docs/reports/repo-audit-final-report.md
```

---

## Success Criteria

✅ **Phase 2A**: Complete content inventory of calbizhr_intel, clear promotion-ready list  
✅ **Phase 2B**: Branding audit of HRM complete, no blocking issues  
✅ **Phase 2C**: Registry gate status clear, promotion list ready  
✅ **Phase 2D**: All 8 old repos classified (migrate/extract/keep/delete)  
✅ **Phase 3**: Strategic decisions documented for high-value repos  
✅ **Phase 4**: Single consolidated report ready for human decision-making  

---

## Notes for Antigravity

- Each phase can be run independently, but Phase 2 must complete before Phase 3/4
- Phase 2D is a batch — do all 8 repos in one pass to save context switching
- Output all reports to `project-docs/reports/` directory
- Keep outputs scannable: use tables, checklists, one-liners where possible
- If a compliance figure is found, flag it as needing verification before going public
- Don't over-analyze — decision points are for humans, not Antigravity

---

## Deliverables

1. `repo-audit-phase2a-calbizhr-intel.md`
2. `repo-audit-phase2b-hrm.md`
3. `repo-audit-phase2c-registry.md`
4. `repo-audit-phase2d-batch.md`
5. `repo-audit-phase3-[strategic-analysis].md` (if needed)
6. `repo-audit-final-report.md`

All reports pushed to `phase-1-foundation` branch.

---

## Blockers & Escalations

- If a repo is private or inaccessible: flag it, skip, note in report
- If a repo contains sensitive data: flag it, don't copy content, note in report
- If branding cleanup is urgent before public release: flag for Mario's decision

