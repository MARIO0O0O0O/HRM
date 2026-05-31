You are a senior Next.js/TypeScript/Tailwind engineer working 
on my local project. Make four targeted corrections, commit, 
and deploy to production.

PROJECT INFO:
  Path:    /data/data/com.termux/files/home/HRM
  Branch:  phase-1-foundation
  Deploy:  bizhr.vercel.app (Vercel project prj_pIuk0WuqwvRT8OtFjTNPbJwFQzXF)

─────────────────────────────────────────
CORRECTIONS 1-3 — Targeted Bug Fixes
─────────────────────────────────────────

CORRECTION 1 — Fix wrong domain in Terms of Service
  Find: grep -r "hrai.vercel.app" src/ --include="*.tsx" \
        --include="*.ts" -l
  Fix:  Replace every instance of "hrai.vercel.app" with
        "bizhr.vercel.app" in those files only.

CORRECTION 2 — Fix wrong brand name in PAGA disclaimer
  Find: grep -r "CalHR AI" src/ --include="*.tsx" \
        --include="*.ts" -l
  Fix:  Replace every instance of "CalHR AI" with
        "BizHR / M.E. Consulting" in those files only.

CORRECTION 3 — Fix PAGA calculator $0 on page load
  Find: find src/ -name "*paga*" -o -name "*calculator*" \
        | grep -i "\.tsx$"
  Fix:  Wrap output display in useEffect or initialize state
        with default slider values already calculated so a
        non-zero estimate renders on first load. Do not
        change calculation logic or slider defaults.

─────────────────────────────────────────
CORRECTION 4 — Card-Wrap Long Monolithic Pages
─────────────────────────────────────────

GOAL: Remove the long unbroken single-column scroll on these
pages by wrapping each logical section in a card container.
Do NOT change any text content, links, prices, or page
structure. This is a pure visual refactor only.

TARGET PAGES — find them with:
  find src/app -name "page.tsx" | xargs grep -l \
  "className" | grep -v "tools/\|gated/\|paga"

Apply this card pattern to every distinct section on each
page (hero excluded — leave hero full-width):

  BEFORE (typical monolithic section):
  <section className="py-16">
    <div className="max-w-5xl mx-auto px-4">
      <h2>Section Title</h2>
      <p>Content...</p>
    </div>
  </section>

  AFTER (card-wrapped):
  <section className="py-16">
    <div className="max-w-5xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-900 
                      border border-gray-200 
                      dark:border-gray-800 
                      rounded-xl shadow-sm p-8">
        <h2>Section Title</h2>
        <p>Content...</p>
      </div>
    </div>
  </section>

RULES for Correction 4:
  - Hero sections: leave full-width, no card wrapper
  - Navigation and footer: do not touch
  - Each distinct section gets its own card — do not merge
    multiple sections into one card
  - Use rounded-xl, border, shadow-sm, and p-6 or p-8
  - Dark mode: use dark:bg-gray-900 dark:border-gray-800
  - Cards should have visible breathing room between them:
    add gap-6 or space-y-6 between sibling cards
  - Do not add new sections, remove sections, or reorder
    anything — wrap only, content untouched
  - If a section already has a visible card/border/background
    treatment, skip it — do not double-wrap

PAGES TO REFACTOR (confirm each exists before editing):
  src/app/page.tsx             (homepage)
  src/app/services/page.tsx    (services)
  src/app/pricing/page.tsx     (pricing)
  src/app/about/page.tsx       (about)
  src/app/contact/page.tsx     (contact)

─────────────────────────────────────────
EXECUTION STEPS
─────────────────────────────────────────

1. Complete Corrections 1-3 first (surgical, low risk)
2. Complete Correction 4 page by page in this order:
   about → pricing → contact → services → homepage
   (simplest to most complex — stop and report if any
   page has an unusual structure that needs clarification)
3. Run: npx tsc --noEmit && npx next lint
4. Fix any lint errors before proceeding
5. Commit: git add -A && git commit -m "fix: domain, brand, 
   PAGA hydration, and card layout refactor"
6. Deploy: vercel --prod
7. After deploy, confirm live:
   - bizhr.vercel.app/terms      → no "hrai.vercel.app"
   - bizhr.vercel.app/paga-calculator → non-zero on load,
                                        "BizHR" in disclaimer
   - bizhr.vercel.app/about      → sections have visible
                                    card separation
   - bizhr.vercel.app/pricing    → sections have visible
                                    card separation
8. Report back with confirmation or errors. Do not start
   any other work beyond what is listed here.