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

  // Services / spokes
  { label: 'HPP Compliance Hub (SB 1343)', href: '/programs/harassment-prevention', kind: 'Service' },
  { label: 'HR Compliance Audit', href: '/spokes/compliance-audit', kind: 'Service' },
  { label: 'Wage-and-Hour Cleanup', href: '/spokes/labor-law', kind: 'Service' },
  { label: 'Handbooks & Policies', href: '/spokes/handbook', kind: 'Service' },
  { label: 'AI-Powered HR Consulting', href: '/spokes/ai-services', kind: 'Service' },
  { label: 'Manager Support', href: '/spokes/manager-support', kind: 'Service' },
  { label: 'Harassment Prevention', href: '/spokes/harassment-prevention', kind: 'Service' },
  { label: 'Workplace Violence Prevention', href: '/spokes/workplace-violence', kind: 'Service' },
  { label: 'Onboarding Systems', href: '/spokes/onboarding', kind: 'Service' },
  { label: 'Ongoing HR Support', href: '/spokes/hr-support', kind: 'Service' },

  // Done-for-you toolkits
  { label: 'HPP Toolkit (SB 1343)', href: '/tools/hpp', kind: 'Toolkit' },
  { label: 'WVPP Toolkit (SB 553)', href: '/tools/wvpp', kind: 'Toolkit' },
  { label: 'IIPP Toolkit', href: '/tools/iipp', kind: 'Toolkit' },
  { label: 'Know Your Rights Toolkit', href: '/tools/kyr', kind: 'Toolkit' },
]
