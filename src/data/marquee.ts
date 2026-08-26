// Every free tool and service, in one place -- feeds the footer marquee so
// visitors can see (and reach) everything the site offers without digging
// through nav menus. See src/components/layout/ToolMarquee.tsx.

export interface MarqueeCard {
  label: string
  href: string
  kind: 'Free Tool' | 'Service' | 'Toolkit'
}

export const marqueeCards: MarqueeCard[] = [
  // Free tools -- highest priority, listed first
  { label: 'PAGA Exposure Calculator', href: '/paga-calculator', kind: 'Free Tool' },
  { label: 'Compliance Quick-Check', href: '/tools/compliance-quiz', kind: 'Free Tool' },
  { label: 'Training Deadline Tracker', href: '/tools/deadline-tracker', kind: 'Free Tool' },
  { label: 'Employer Threshold Checker', href: '/tools/threshold-checker', kind: 'Free Tool' },
  { label: 'Job Classification Quiz', href: '/tools/job-classification', kind: 'Free Tool' },
  { label: 'Mandatory Postings Checklist', href: '/tools/mandatory-postings', kind: 'Free Tool' },
  { label: 'AI Lab: Audit + Policy Drafter', href: '/ai-lab', kind: 'Free Tool' },

  // Services / Spokes
  { label: 'Harassment Prevention (SB 1343)', href: '/spokes/safety-prevention/harassment-prevention', kind: 'Service' },
  { label: 'Workplace Violence (SB 553)', href: '/spokes/safety-prevention/workplace-violence', kind: 'Service' },
  { label: 'Cal/OSHA IIPP Safety', href: '/spokes/safety-prevention/osha-iipp', kind: 'Service' },
  { label: 'Paystubs & Wage Statements', href: '/spokes/wage-hour/paystubs-wage-statements', kind: 'Service' },
  { label: 'Meal & Rest Breaks', href: '/spokes/wage-hour/meal-rest-breaks', kind: 'Service' },
  { label: 'Timekeeping & Classification', href: '/spokes/wage-hour/timekeeping-classification', kind: 'Service' },
  { label: 'Hiring & Onboarding', href: '/spokes/lifecycle-admin/onboarding', kind: 'Service' },
  { label: 'Protected Leaves (CFRA/ADA)', href: '/spokes/lifecycle-admin/leaves', kind: 'Service' },
  { label: 'Terminations & Final Pay', href: '/spokes/lifecycle-admin/terminations', kind: 'Service' },
  { label: 'Solutions Catalog', href: '/services', kind: 'Service' },

  // Done-for-you toolkits
  { label: 'HPP Toolkit (SB 1343)', href: '/tools/hpp', kind: 'Toolkit' },
  { label: 'WVPP Toolkit (SB 553)', href: '/tools/wvpp', kind: 'Toolkit' },
  { label: 'IIPP Toolkit', href: '/tools/iipp', kind: 'Toolkit' },
  { label: 'Know Your Rights Toolkit', href: '/tools/kyr', kind: 'Toolkit' },
]
