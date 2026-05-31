# HRM Project Profile
Generated: May 31, 2026

## Identity
| Key | Value |
| --- | --- |
| App Name | hrm |
| Active Branch | phase-2c (branched from phase-1-foundation) |
| Production Branch | phase-1-foundation |
| Custom Domain | https://bizhr.org (renew at Namecheap) |
| GitHub Repo | https://github.com/MARIO0O0O0O/HRM.git |

## Local Environment
| Key | Value |
| --- | --- |
| Local Path | /data/data/com.termux/files/home/HRM |

## Vercel
| Key | Value |
| --- | --- |
| Vercel Project Name | hrai |
| Vercel OrgId/Scope | marios-projects-abca1e48 |
| Vercel Dashboard | https://vercel.com/marios-projects-abca1e48/hrai |
| Production Alias | https://bizhr.vercel.app |

## Git
| Branch | Notes |
| --- | --- |
| phase-1-foundation | Production base |
| phase-2c | Active branch containing recent work |

## Supabase
| Key | Value |
| --- | --- |
| Supabase URL | https://zteebziywhoglccgdxxn.supabase.co |
| Tables Created | content_articles, content_categories, waitlist, referral_clicks, email_subscribers, site_settings, analytics_cache |
| RLS Status | Enabled on content_articles, waitlist, email_subscribers |

## Stack
| Tech | Version |
| --- | --- |
| Next.js | 15.3.9 |
| TypeScript | Yes |
| Tailwind | Yes |
| pnpm | 11.4.0 |
| Node | v26.2.0 |

## Live Routes
| Route | Description |
| --- | --- |
| / | Homepage (CinematicHero) |
| /book | Cal.com embed — permanent |
| /paga-calculator | PAGA risk calculator |
| /portal | Client portal |
| /tools | HR toolkits |
| /pricing | Pricing |
| /blog | Blog |
| /resources | Article index (phase-2c, pending merge) |

## Key File Paths
| File | Path |
| --- | --- |
| Homepage | src/app/page.tsx |
| Book Page | src/app/book/page.tsx |
| PAGA Calculator | src/app/paga-calculator/page.tsx |
| Portal | src/app/portal/page.tsx |
| Pricing | src/app/pricing/page.tsx |
| Layout | src/app/layout.tsx |
| Nav | src/components/layout/Header.tsx |
| Footer | src/components/layout/Footer.tsx |
| Env File | .env.local |
| Migrations | supabase/migrations/ |

## Payment / Contact
| Contact Method | Handle/Detail |
| --- | --- |
| Venmo | @marioo00 |
| CashApp | $10mario01 |
| Zelle | mario_espindola@outlook.com |
| Phone | 626-999-6239 |
| Email | mario_espindola@outlook.com |

## Phase Status
| Phase/Task | Status |
| --- | --- |
| Day 0 (Cinematic Hero) | Complete |
| Week 1 Schema & Extensions | Complete |
| Week 1 Public Routes | Complete |

## Hard Rules
1. Vercel project is named 'hrai' under scope 'marios-projects-abca1e48'. Always use --scope marios-projects-abca1e48 with Vercel CLI commands.
2. Booking system is Cal.com only. /book page must always render the Cal.com embed at https://cal.com/bizhr. Never replace or modify the booking integration without explicit instruction from M.E.
3. Do not auto-proceed between phases or weeks. Stop and report after every block. Wait for explicit instruction.

## Rewind Commands
```bash
# Restore book page
git checkout stable-pre-calcom -- src/app/book/page.tsx

# Undo last commit
git revert HEAD --no-edit && git push origin phase-1-foundation

# Nuclear reset
git reset --hard stable-pre-calcom && git push origin phase-1-foundation --force
```
