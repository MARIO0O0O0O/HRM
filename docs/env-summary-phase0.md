# Phase 0 Environment Summary

## Actual Execution Environment (Termux Sandbox)
- **OS**: Android / Linux (aarch64)
- **Node.js**: v26.2.0
- **npm**: v11.15.0
- **pnpm**: v11.4.0 (shebang fixed for Termux compatibility)
- **Python**: v3.13.13
- **pip**: v26.1.1
- **git**: git version 2.54.0
- **Available Storage**: 322 GB
- **User Directory**: `/data/data/com.termux/files/home`
- **Repo Directory**: `/data/data/com.termux/files/home/HRM`

## Target Developer Environment (Windows 10/11)
- **OS**: Windows 10/11 (x64)
- **Target Repo Directory**: `C:\Users\<YourUsername>\Documents\HRM\GIT\HRM`
- **Required Software**: Git for Windows, Node.js LTS, pnpm, Google Antigravity, Chrome + Extension, GitHub CLI, Vercel CLI, Supabase CLI, Stripe CLI.

## Cross-Platform Constraints & Adjustments
- **Path Resolution**: We adapt all Windows-style paths (`C:\Users\...`) to native Termux paths (`/data/data/com.termux/files/...`) for execution in this environment.
- **Shebangs in Termux**: Global Node/npm modules installed via Termux sometimes suffer from "bad interpreter: /usr/bin/env". We run `termux-fix-shebang` on installed CLI binaries (e.g. `pnpm`, `vercel`, `npx`, `create-next-app`, `shadcn`) to fix them.
- **Compilation in Termux**: Some python packages with native C/Rust extensions (like `tiktoken` in `aider-chat`) require local compilation which can be resource-intensive in a mobile environment. Aider was skipped due to compilation errors on Python 3.13.
- **Turbopack vs Webpack**: Next.js v15+ uses Turbopack by default, which is not natively supported on Termux ARM64. We modified `package.json` to use Webpack (`next build --webpack`) for local build compatibility.
- **Permissions**: Terminal execution is configured for review-driven development to ensure all commands are verified before running.
