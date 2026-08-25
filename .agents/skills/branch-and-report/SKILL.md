---
name: branch-and-report
description: >-
  Encodes project standing conventions for branching, task reporting, and build logging.
  Use this skill when starting or finalizing task rounds in this repository.
---

# Branching and Reporting Convention

Standard operating procedure for task execution in CalBizHR / HRM.

## Steps

1. **Branching**:
   - Always create a dedicated branch `agent/antigravity-[task-number]` off `phase-1-foundation`.
   - Never push directly to `phase-1-foundation` unless explicitly instructed as primary build agent on solo rounds.

2. **Reporting**:
   - Write task completion report to `project-docs/reports/[task-number]_REPORT.md`.
   - Include Executive Summary, Scope/Implementation details, Verification output, and Conclusion.

3. **Build Log**:
   - Append exactly one entry per completed task to `project-docs/BUILD_LOG.md`.
   - Format: `YYYY-MM-DD — Task [number] — [PASS/FAIL] — [one-sentence summary]`.

4. **Commit & Push**:
   - Commit report, log update, and code changes together with clear task-labeled commit message.
   - Push to `origin/agent/antigravity-[task-number]`.
