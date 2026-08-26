export interface BannerAd {
  id: string
  title: string
  subtitle: string
  href: string
  badge: string
  imageUrl?: string | null
}

export const bannerAds: BannerAd[] = [
  {
    id: 'harassment-prevention',
    title: 'Harassment Prevention Program (SB 1343)',
    subtitle: 'Mandatory 1-hr staff & 2-hr supervisor compliance training and policy drafting.',
    href: '/spokes/safety-prevention/harassment-prevention',
    badge: 'SAFETY & PREVENTION',
  },
  {
    id: 'workplace-violence',
    title: 'Workplace Violence Prevention (SB 553)',
    subtitle: 'Written WVPP plan, mandatory violent incident log, and annual hazard training.',
    href: '/spokes/safety-prevention/workplace-violence',
    badge: 'SAFETY & PREVENTION',
  },
  {
    id: 'cal-osha-iipp',
    title: 'Cal/OSHA IIPP & Heat Illness Safety',
    subtitle: 'Title 8 CCR §3203 hazard evaluation, safety procedures, and heat protocols.',
    href: '/spokes/safety-prevention/osha-iipp',
    badge: 'SAFETY & PREVENTION',
  },
  {
    id: 'paystubs-wage-statements',
    title: 'Wage Statement Compliance (LC §226)',
    subtitle: 'Itemized paystub audit, wage transparency disclosures, and SB 1162 rules.',
    href: '/spokes/wage-hour/paystubs-wage-statements',
    badge: 'WAGE & HOUR',
  },
  {
    id: 'meal-rest-breaks',
    title: 'Meal & Rest Break Compliance',
    subtitle: 'California Labor Code §226.7 & §512 break timing, policy validation & premium pay.',
    href: '/spokes/wage-hour/meal-rest-breaks',
    badge: 'WAGE & HOUR',
  },
  {
    id: 'timekeeping-classification',
    title: 'Employee Classification Check',
    subtitle: 'Exempt vs non-exempt salary threshold audit and independent contractor ABC test.',
    href: '/spokes/wage-hour/timekeeping-classification',
    badge: 'WAGE & HOUR',
  },
  {
    id: 'onboarding-notices',
    title: 'Onboarding Compliance (LC §2810.5)',
    subtitle: 'Mandatory CA Wage Theft Prevention written notice & statutory new hire packets.',
    href: '/spokes/lifecycle-admin/onboarding',
    badge: 'LIFECYCLE ADMIN',
  },
  {
    id: 'leaves-accommodations',
    title: 'Leave Management (CFRA / ADA)',
    subtitle: 'CFRA job-protected leave rights, FEHA disability interactive process, and notices.',
    href: '/spokes/lifecycle-admin/leaves',
    badge: 'LIFECYCLE ADMIN',
  },
  {
    id: 'paga-calculator',
    title: 'Free PAGA Exposure Calculator',
    subtitle: 'Estimate potential penalty ranges under AB 2288 & SB 92 reformed caps.',
    href: '/paga-calculator',
    badge: 'FREE COMPLIANCE TOOL',
  },
  {
    id: 'book-consultation',
    title: 'Book a Free Strategy Call',
    subtitle: 'Direct consultation with California HR compliance leadership.',
    href: '/book',
    badge: 'EXPERT CONSULTING',
  },
]
