---
name: verify-nextjs-build
description: >-
  Given a Next.js/pnpm project, runs pnpm install --frozen-lockfile and pnpm build to verify the build is clean.
  Use this skill before committing or completing any task modifying application code.
---

# Verify Next.js Build

Instructions for verifying Next.js build health in this project.

## Steps

1. Run lockfile validation:
   ```bash
   pnpm install --frozen-lockfile
   ```

2. Run Next.js production build:
   ```bash
   pnpm build
   ```
   (Note: On Android/Termux environments where native binary modules block direct execution in node_modules/.bin, use `node node_modules/next/dist/bin/next build` or sync to internal storage to run Vitest/Next.js commands).

3. Treat any non-zero exit code as failure. Never proceed to commit or push on a failed build.
