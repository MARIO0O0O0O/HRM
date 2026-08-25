---
name: self-check-before-pass
description: >-
  Verification gate requiring literal match check in raw command outputs before marking any report as PASS.
  Use this skill when auditing test results and verification outputs prior to reporting PASS.
---

# Self-Check Before Marking PASS

Verification policy to prevent false positive pass reporting.

## Steps

1. **Inspect Raw Output**:
   - Read the exact un-truncated log or command output from test or build execution.

2. **Literal String Check**:
   - Confirm that the specific required string, title, metric, or output assertion is literally present in the raw text output.
   - Do not rely solely on exit code 0 or execution completion.

3. **Pass / Fail Determination**:
   - If the expected output is literally present -> Report `PASS`.
   - If the expected output is absent, truncated, or errored -> Report `FAIL` regardless of exit code.
