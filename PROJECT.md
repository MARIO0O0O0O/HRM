# HRM Project Info

## Identity
- **App name**: hrm
- **Vercel project name**: hrai
- **Vercel orgId/scope**: marios-projects-abca1e48
- **Vercel dashboard**: https://vercel.com/marios-projects-abca1e48/hrai
- **Production alias**: https://bizhr.vercel.app
- **Custom domain**: https://bizhr.org (renew at Namecheap)
- **GitHub repo**: https://github.com/MARIO0O0O0O/HRM.git
- **Active branch**: phase-2c (branched from phase-1-foundation)
- **Production branch**: phase-1-foundation
- **Local path**: /data/data/com.termux/files/home/HRM
- **Supabase URL**: https://zteebziywhoglccgdxxn.supabase.co
- **Cal.com booking**: https://cal.com/bizhr (permanent — do not change)

## Stack
- Next.js 15.3.9
- TypeScript
- Tailwind
- pnpm 11.4.0
- Node v26.2.0

## Payment handles
- **Venmo**: @marioo00
- **CashApp**: $10mario01
- **Zelle**: mario_espindola@outlook.com
- **Phone**: 626-999-6239
- **Email**: mario_espindola@outlook.com

## Key file paths
- **Homepage**: `src/app/page.tsx`
- **Book page**: `src/app/book/page.tsx` (Cal.com embed — do not modify)
- **PAGA calculator**: `src/app/paga-calculator/page.tsx`
- **Portal**: `src/app/portal/page.tsx`
- **Pricing**: `src/app/pricing/page.tsx`
- **Layout**: `src/app/layout.tsx`
- **Nav**: `src/components/layout/Header.tsx`
- **Footer**: `src/components/layout/Footer.tsx`
- **Env file**: `.env.local`
- **Migrations**: `supabase/migrations/`

## Live routes
- `/` → Homepage (CinematicHero)
- `/book` → Cal.com booking embed (permanent)
- `/paga-calculator` → PAGA risk calculator
- `/portal` → Client portal
- `/tools` → HR toolkits
- `/pricing` → Pricing
- `/blog` → Blog
- `/resources` → Article index (phase-2c, pending merge)

## Rewind commands
- **Restore book page**: `git checkout stable-pre-calcom -- src/app/book/page.tsx`
- **Undo last commit**: `git revert HEAD --no-edit && git push origin phase-1-foundation`
- **Nuclear reset**: `git reset --hard stable-pre-calcom && git push origin phase-1-foundation --force`
