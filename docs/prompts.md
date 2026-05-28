# Reusable Agent Prompt Templates

This document stores the four core reusable prompts used to invoke specialized Gemini persona agent sessions during construction.

---

## 1. Implement Block Template
```
[DEV] Implement block <block_id>.
Goal: <goal>
Branch: <branch>

Tasks:
1. Review .agents/rules/hrm-standards.md and docs/standards.md before writing code.
2. Implement components and logic in the designated src/ directories.
3. Write unit or smoke tests under src/__tests__/<block_id>.test.ts.
4. Verify compiling and linting status locally: pnpm lint && pnpm build.
```

---

## 2. Review Block Template
```
[REVIEWER] Review diff for block <block_id> on branch <branch>.
Checklist:
- Ensure TypeScript type correctness and strict type definition.
- Verify zero hardcoded secrets or API tokens in client bundles.
- Check license compliance (MIT/Apache-2.0/BSD only).
- Enforce accessibility rules (touch target size, labels) and payment copyable styling.
```

---

## 3. Test Block Template
```
[TESTER] Run the full test suite for block <block_id>.
Commands to run:
- pnpm lint
- pnpm test
- pnpm build
Verify all results pass cleanly and document logs in docs/tests/<block_id>-test-results.txt.
```

---

## 4. Research Tool/License Template
```
[RESEARCH] Evaluate <tool_name>.
Checklist:
- License validation (must be permissive MIT/Apache-2.0/BSD).
- Operating system compatibility (Windows/Linux sandbox compatible).
- Community ecosystem size, last commit or release date, and security advisory logs.
- Provide a summary recommendation for implementation.
```
