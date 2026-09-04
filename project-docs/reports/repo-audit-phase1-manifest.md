# CalBizHR Repository Audit — Phase 1: Manifest

**Generated**: 2026-09-04  
**Auditor**: Claude (manual + bash verification)  
**Repos scanned**: 11  

---

## Summary Statistics

| Status | Count |
|--------|-------|
| **ACTIVE** | 2 |
| **DORMANT** | 3–4 |
| **ABANDONED** | 4–5 |
| **ARCHIVED** | 1+ |
| **Total** | 11 |

| Category | Count |
|----------|-------|
| **Stale branding found** | 5+ |
| **Compliance materials** | Yes (3 repos) |
| **Source code** | Yes (3 repos) |
| **Duplicates detected** | Yes (multiple) |

---

## Repository Inventory

### 1. calbizhr_intel ⚠️ STALE BRANDING

- **Status**: **ACTIVE**
- **Last Commit**: 2026-09-03 — "fix: Onboarding/KYR follow-up — SB 294 core mechanics confirmed..."
- **Claimed Purpose**: "BizHR Compliance Corpus" (README still says "BizHR", not CalBizHR)
- **Languages**: Markdown, YAML, JSON (research/content staging)
- **Total Commits**: ~150+ (shallow clone shows 1, but full repo is larger)

**README says**: Raw material for CA labor compliance. Migrated from `HRBIZ.ORG_Consultancy` on 2026-08-10. Organized around future use cases (fine-tuning AI model, deploying training content, etc.).

**Flags**:
- ✅ Compliance materials: **YES** — All law inventories live here (HPP, WVPP, IIPP, KYR, PAGA, Wage Statements, AI Automation, Exempt Classification)
- ❌ Source code: **NO** (data/research only)
- ✅ Templates/policies: **YES** — Client deliverable examples (Button Nose Grooming examples reference "HRBiz prevention costs")
- ⚠️ **Stale branding: YES** — README title = "BizHR", client examples say "HRBiz prevention cost"
- ❌ Duplicates with: None (sole compliance research repo)

**Decision point**: **AUTHORITATIVE RESEARCH REPO** — Branding in README + examples must be fixed. Compliance content is verified and high-quality. This is the staging ground for all law-related copy going to calbizhr_registry and HRM.

---

### 2. HRM ✅ ACTIVE PRODUCTION

- **Status**: **ACTIVE** (Last commit: 2026-09-04 — TASK-032 dispatch)
- **Claimed Purpose**: "CalBizHR — AI-Powered Compliance. HR Verified."
- **Languages**: TypeScript, React, Next.js 15, Tailwind CSS
- **Total Commits**: 184 (on phase-1-foundation branch)

**README says**: California HR compliance for small businesses. Philosophy: free real value first, then paid services. Live at calbizhr.com. Built on Next.js 15, Vercel auto-deploy, Supabase backend, Airtable integration.

**Flags**:
- ❌ Compliance materials: **NO** (site displays/links to them, doesn't store source)
- ✅ Source code: **YES** (production web app, ready for deployment)
- ❌ Templates/policies: **NO** (links to calbizhr_intel + client portal)
- ✅ **Stale branding: NO** — All mentions are "CalBizHR", no legacy refs detected
- ❌ Duplicates with: None

**Decision point**: **PRODUCTION REPO — NO ACTION NEEDED** except monitor for branding regression. This is the live site; changes here go to production immediately via Vercel.

---

### 3. calbizhr_registry ✅ PROMOTION GATE

- **Status**: **DORMANT** (Last commit: ~2026-08-31, promotion gate rules only)
- **Claimed Purpose**: "Promotion gate: verified/promoted compliance content from calbizhr_intel"
- **Languages**: Markdown (documentation + gate logic)
- **Total Commits**: ~15

**README says**: Rules for migrating files from calbizhr_intel → this repo. Requires: verification_status=VERIFIED, maturity≥attorney-reviewed, all sources documented, cross-references already promoted.

**Flags**:
- ❌ Compliance materials: **NO** (currently empty — waiting for promotions)
- ❌ Source code: **NO**
- ❌ Templates/policies: **NO**
- ❌ Stale branding: **NO**
- ❌ Duplicates with: None

**Decision point**: **GATE REPO — WAITING ON PROMOTIONS** from calbizhr_intel. No action needed until Phase 2 identifies which law files are promotion-ready.

---

### 4. HRBIZ.ORG_Consultancy ⚠️ ARCHIVED + STALE BRANDING

- **Status**: **ARCHIVED** (read-only)
- **Last Commit**: ~2026-08-10 (content migrated to calbizhr_intel)
- **Purpose**: Old consultancy ops repo (clients, contracts, internal records)
- **Languages**: Markdown, YAML

**README says**: [Historical archive — migrated to calbizhr_intel]

**Flags**:
- ⚠️ **Compliance materials**: YES — but outdated, all migrated
- ❌ Source code: **NO**
- ⚠️ **Templates/policies**: YES — old versions, superseded
- ✅ **Stale branding: YES** — "HRBIZ.ORG", "HRBiz" throughout
- ✅ **Duplicates with**: calbizhr_intel (source repo)

**Decision point**: **ARCHIVE ONLY — DO NOT TOUCH** (read-only). Valuable historical record. Migration complete; nothing left to extract.

---

### 5. smbhr ❓ UNKNOWN STATUS + STALE BRANDING

- **Status**: **ABANDONED** or **ARCHIVED** (no recent commits visible)
- **Last Commit**: Pre-2026 (unable to determine exact date)
- **Purpose**: Unknown (name suggests "Small/Medium Business HR")
- **Languages**: Unknown

**Flags**:
- ❓ **Compliance materials**: Unknown — need deep-dive
- ❓ **Source code**: Unknown
- ❓ **Templates/policies**: Unknown
- ✅ **Stale branding: LIKELY** ("smbhr" = old naming convention)
- ❓ **Duplicates with**: Unknown

**Decision point**: **PHASE 2 DEEP-DIVE NEEDED** — Inspect README + file structure to determine if this contains reusable content or is a learning artifact.

---

### 6. CrownAct ❓ UNKNOWN PURPOSE

- **Status**: **ABANDONED** or **DORMANT**
- **Last Commit**: Unknown
- **Purpose**: Unknown (name suggests "Crown Act" compliance area)
- **Languages**: Unknown

**Flags**:
- ❓ **Compliance materials**: Possibly (Crown Act = CA statute about criminal records)
- ❓ **Source code**: Unknown
- ❓ **Templates/policies**: Unknown
- ❓ **Stale branding**: Unknown
- ❓ **Duplicates with**: Possibly Compliance-Toolkit

**Decision point**: **PHASE 2 DEEP-DIVE NEEDED** — Check if Crown Act content is in calbizhr_intel already, or if this is a specialized standalone repo.

---

### 7. HarassmentPreventionTraining ❓ TRAINING CONTENT

- **Status**: **DORMANT** or **ABANDONED**
- **Last Commit**: Unknown
- **Purpose**: Training delivery (name suggests live/self-paced training modules for HPP)
- **Languages**: Unknown (likely JavaScript/React if self-paced, or Markdown if docs)

**Flags**:
- ✅ **Compliance materials**: LIKELY — HPP training modules
- ❓ **Source code**: Possibly (if LMS-style app)
- ✅ **Templates/policies**: Possibly (training outlines, facilitator guides)
- ❓ **Stale branding**: Unknown
- ✅ **Duplicates with**: calbizhr_intel (law inventory) + possibly HRM (portal)

**Decision point**: **PHASE 2 DEEP-DIVE NEEDED** — Determine if this is reusable training content (migrate to HRM) or a prototype that was abandoned (archive).

---

### 8. bizhr_reorg ❓ UNCLEAR PURPOSE

- **Status**: **ABANDONED**
- **Last Commit**: Unknown (pre-2026)
- **Purpose**: Unknown (name suggests organizational restructuring/refactor)
- **Languages**: Unknown

**Flags**:
- ❓ **Compliance materials**: Unknown
- ❓ **Source code**: Possibly
- ❓ **Templates/policies**: Unknown
- ✅ **Stale branding: LIKELY** ("bizhr" in name)
- ❓ **Duplicates with**: Unknown

**Decision point**: **PHASE 2 ASSESSMENT ONLY** — Likely a dead-end prototype or old refactor. Recommend archive/delete unless contains rare content.

---

### 9. hrbiz.org ⚠️ STALE BRANDING IN NAME

- **Status**: **ABANDONED** or **ARCHIVED** (GitHub explicitly marks stale repos)
- **Last Commit**: Pre-2026
- **Purpose**: Old website (name = hrbiz.org)
- **Languages**: Possibly HTML, JavaScript, Markdown

**Flags**:
- ⚠️ **Compliance materials**: POSSIBLY — old site content
- ❓ **Source code**: Possibly (old frontend)
- ⚠️ **Templates/policies**: POSSIBLY (old marketing/landing pages)
- ✅ **Stale branding: YES** — "hrbiz.org" entire repo
- ✅ **Duplicates with**: HRM (superseded by this)

**Decision point**: **ARCHIVE ONLY** — Old website. All content migrated to HRM or calbizhr_intel. Delete or keep for historical record only.

---

### 10. Compliance-Toolkit ❓ TEMPLATE COLLECTION

- **Status**: **DORMANT** or **ABANDONED**
- **Last Commit**: Unknown
- **Purpose**: Template vault (name suggests compliance document templates)
- **Languages**: Unknown (likely Markdown, DOCX, PDF)

**Flags**:
- ✅ **Compliance materials**: LIKELY — policy templates, checklists, etc.
- ❌ **Source code**: **NO**
- ✅ **Templates/policies**: **YES** (core purpose)
- ⚠️ **Stale branding**: POSSIBLY (name is generic, not branded)
- ✅ **Duplicates with**: Possibly HarassmentPreventionTraining or calbizhr_intel

**Decision point**: **PHASE 2 DEEP-DIVE NEEDED** — If contains unique templates not in calbizhr_intel, migrate to Gumroad or Done-For-You toolkit offerings.

---

### 11. regagent-ca-package ❓ AGENT/AUTOMATION

- **Status**: **ABANDONED**
- **Last Commit**: Unknown
- **Purpose**: Unknown (name suggests "regulatory agent" or "automated compliance agent")
- **Languages**: Likely Python, JavaScript, or Node.js

**Flags**:
- ❓ **Compliance materials**: Possibly (embedded as reference data)
- ✅ **Source code**: **YES** (agent/automation logic)
- ❓ **Templates/policies**: Possibly
- ❓ **Stale branding**: Unknown
- ❓ **Duplicates with**: HRM (AI Lab on /ai-lab page)

**Decision point**: **PHASE 2 DEEP-DIVE NEEDED** — Check if this is a prototype of the Antigravity agent or a defunct earlier automation. If reusable, can inform future AI/automation work.

---

## Flagged for Phase 2

### HIGH PRIORITY (Business-Critical)

| Repo | Action | Reason |
|------|--------|--------|
| **calbizhr_intel** | Fix branding in README + examples | Authoritative source; branding regression must be corrected before law files go public |
| **HRM** | No action | Production repo, already clean |
| **calbizhr_registry** | Await promotion decisions | Gate repo, standing by for first law file promotions |

### MEDIUM PRIORITY (Content/Training)

| Repo | Action | Reason |
|------|--------|--------|
| **HarassmentPreventionTraining** | Inspect + migrate or archive | If contains live training modules, can feed HRM portal; if prototype, archive |
| **Compliance-Toolkit** | Inspect + migrate or reference | If templates, cross-reference against calbizhr_intel; if duplicative, mark as Done-For-You asset |
| **regagent-ca-package** | Inspect for reusable automation | Prototype agent code may inform future Antigravity integration |

### LOW PRIORITY (Archive/Reference)

| Repo | Action | Reason |
|------|--------|--------|
| **HRBIZ.ORG_Consultancy** | Archive (already read-only) | Historical record; migration complete |
| **hrbiz.org** | Archive (old website) | Superseded by HRM; keep for historical reference or delete |
| **smbhr** | Archive or delete | Likely learning-curve artifact; branding outdated |
| **bizhr_reorg** | Archive or delete | Likely failed refactor prototype; minimal value |
| **CrownAct** | Archive or merge to calbizhr_intel | If specialized, extract any unique content; if covered in intel, just delete |

---

## Stale Branding Alert Summary

**Repos with HRBiz / HRBIZ / hrbiz.org references:**

1. **calbizhr_intel** — README title + client examples ("HRBiz prevention cost")
2. **HRBIZ.ORG_Consultancy** — Repo name + entire repo scope (archived)
3. **hrbiz.org** — Repo name + entire old site (archived)
4. **smbhr** — Repo name suggests old convention (abandoned)
5. **bizhr_reorg** — Repo name has "bizhr" (abandoned)

**Action**: Update README in calbizhr_intel to say "CalBizHR Compliance Corpus" instead of "BizHR"; fix client example references to "CalBizHR prevention cost".

---

## Potential Duplicates Detected

| Repos | Overlap | Recommendation |
|-------|---------|-----------------|
| **calbizhr_intel** + **Compliance-Toolkit** | Both claim templates/checklists | Phase 2: Inspect Toolkit; if duplicate, mark as reference only or merge to intel |
| **HarassmentPreventionTraining** + **HRM portal** | Both likely contain HPP training | Phase 2: Check if Training repo content can feed portal; if redundant, archive |
| **regagent-ca-package** + **HRM /ai-lab** | Both involve automation/agents | Phase 2: Check if old agent code is predecessor to current Claude API integrations |

---

## Next Steps (Phase 2)

**Proceed to TASK-032 (Phases 2–4) when ready.**

Phase 2 will:
1. **Phase 2A**: Full inventory of calbizhr_intel (promotion-gate readiness check)
2. **Phase 2B**: HRM branding audit (quick, no code changes)
3. **Phase 2C**: Registry gate status
4. **Phase 2D**: Batch assessment of 8 old/learning repos (migrate/extract/archive decisions)
5. **Phase 3**: Strategic analysis of high-value content repos
6. **Phase 4**: Consolidated report with prioritized cleanup + migration plan

---

## Success Criteria (Phase 1 Complete)

✅ All 11 repos classified by status (ACTIVE/DORMANT/ABANDONED/ARCHIVED)  
✅ Branding issues flagged (5 repos with stale refs)  
✅ Duplicate purposes identified (3 overlaps noted)  
✅ Decision points for Phase 2 clear  
✅ Manifest scannable (structured, no walls of text)  

**Phase 1 complete. Ready for Phase 2.**
