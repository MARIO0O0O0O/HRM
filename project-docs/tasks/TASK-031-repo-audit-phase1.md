# TASK-031: CalBizHR Repository Audit — Phase 1 (Manifest)

**Owner**: Antigravity CLI  
**Priority**: High  
**Dependency**: None  
**Blocking**: TASK-032, TASK-033 (Phase 2-4)  
**Estimated time**: 30–45 min  

---

## Objective

Generate a complete, structured inventory of 11 CalBizHR-related GitHub repositories in the MARIO0O0O0O account. For each, identify status, last commit, primary purpose, and flag decision points for Phase 2 deep-dive.

---

## Repositories to Audit

In order of priority:

1. `MARIO0O0O0O/calbizhr_intel` — research & law staging
2. `MARIO0O0O0O/HRM` — production live site
3. `MARIO0O0O0O/calbizhr_registry` — promotion gate
4. `MARIO0O0O0O/HRBIZ.ORG_Consultancy` — archived/old
5. `MARIO0O0O0O/smbhr` — learning artifact?
6. `MARIO0O0O0O/CrownAct` — compliance area?
7. `MARIO0O0O0O/HarassmentPreventionTraining` — training content?
8. `MARIO0O0O0O/bizhr_reorg` — old version?
9. `MARIO0O0O0O/hrbiz.org` — stale branding
10. `MARIO0O0O0O/Compliance-Toolkit` — template collection?
11. `MARIO0O0O0O/regagent-ca-package` — agent/script?

---

## Instructions

### For each repo:

1. **Clone or access** (shallow clone `--depth=1` if >90 days dormant)
2. **Capture metadata**:
   - Repository name
   - GitHub description (as stated)
   - Last commit date & one-line message
   - Primary language(s)
   - Total commits (rough: `git rev-list --count HEAD`)
   - Branches (`git branch -a | head -10`)

3. **Classify status**:
   - `ACTIVE`: Last commit ≤30 days ago
   - `DORMANT`: Last commit 31–90 days ago
   - `ABANDONED`: Last commit >90 days ago
   - `ARCHIVED`: Explicitly marked archived on GitHub

4. **Read README.md**, note:
   - What does the repo claim to do?
   - Stale branding? (HRBiz, HRBIZ, hrbiz.org, Sapphos)
   - Learning-curve artifact vs. business asset?
   - Purpose overlap with other repos?

5. **Flag decision points** (don't decide yet):
   - Contains compliance materials → which areas? (HPP, WVPP, KYR, Wage & Hour, etc.)
   - Contains source code → reusable for HRM?
   - Contains templates/policies → worth extracting?
   - Stale branding → needs cleanup?
   - Duplicate purpose with another repo?

---

## Output Format

```markdown
# CalBizHR Repository Audit — Phase 1: Manifest

**Generated**: [today's date]
**Auditor**: Antigravity CLI
**Repos scanned**: 11

---

## Summary Statistics

| Status | Count |
|--------|-------|
| ACTIVE | — |
| DORMANT | — |
| ABANDONED | — |
| **Total** | **11** |

---

## Repository Inventory

### 1. calbizhr_intel
- **Status**: [ACTIVE/DORMANT/ABANDONED]
- **Last Commit**: [YYYY-MM-DD] — "[commit message]"
- **Claimed Purpose**: [from README]
- **Languages**: [markdown, Python, bash, etc.]
- **Total Commits**: ~[N]

**README Summary**: [1–2 sentence gist]

**Flags**:
- Compliance materials: [Y/N — which areas?]
- Source code: [Y/N]
- Templates/policies: [Y/N]
- Stale branding: [Y/N — which?]
- Duplicate with: [repo name or "None"]

**Decision Point**: [e.g., "Research staging — investigate in Phase 2"]

---

### 2. HRM
- **Status**: [ACTIVE/DORMANT/ABANDONED]
- **Last Commit**: [date] — "[message]"
- **Claimed Purpose**: [from README]
- **Languages**: [Next.js, React, TypeScript, etc.]
- **Total Commits**: ~[N]

**README Summary**: [1–2 sentence gist]

**Flags**:
- Compliance materials: [Y/N]
- Source code: [Y — production web app]
- Templates/policies: [Y/N]
- Stale branding: [Y/N — which?]
- Duplicate with: [None — primary repo]

**Decision Point**: "Production repo — branding check only"

---

### 3. calbizhr_registry
- [Same structure as above]

---

### 4–11. [Remaining repos]
- [Same structure, one per repo]

---

## Flagged for Phase 2 Deep-Dive

**High Priority** (business-critical or compliance-heavy):
- [repos with compliance materials or production code]

**Medium Priority** (training or templates):
- [repos with reusable content]

**Low Priority** (learning-curve or historical):
- [repos that appear to be prototypes/old versions]

---

## Stale Branding Alert

**Repos with "HRBiz," "HRBIZ," "hrbiz.org" in name or README**:
- [List if any]

---

## Potential Duplicates

- [Repo A + Repo B share purpose — investigate in Phase 2]
- [Or: None found]

---

## Next Step

**Phase 2 will deep-dive** into:
- High-priority repos (full content inventory)
- Medium-priority repos (sampling key docs)
- Low-priority repos (README + archive recommendation)

**Proceed to TASK-032 when Phase 1 is complete.**
```

---

## Success Criteria

- ✅ All 11 repos classified by status (ACTIVE/DORMANT/ABANDONED/ARCHIVED)
- ✅ Branding issues flagged
- ✅ Purpose overlap identified
- ✅ Clear hand-off to Phase 2 (TASK-032)
- ✅ Output is scannable (structured markdown, no walls of text)

---

## Notes for Antigravity

- Use shallow clones for old repos to save bandwidth
- Focus on README + git log for status assessment
- Don't need to read entire codebases yet — that's Phase 2
- If a repo's GitHub description contradicts the README, flag both
- Stale branding is a cleanup blocker — flag aggressively

---

## Output Location

Save output as: `project-docs/reports/repo-audit-phase1-manifest.md`

Push to `phase-1-foundation` branch when complete.
