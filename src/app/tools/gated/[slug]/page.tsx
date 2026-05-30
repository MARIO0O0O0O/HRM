import { spokeRegistry } from '@/data/tools'
import GatedSpokePlaceholder from '@/components/tools/GatedSpokePlaceholder'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// Gated slugs that get placeholder pages (SEO equity while building)
const GATED_SLUGS = ['paga-defense', 'separation-checklist', 'hiring-compliance']

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return GATED_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  // Build spoke config inline for gated spokes not in toolsRegistry
  const gatedConfigs: Record<string, { title: string; description: string; lawRef: string }> = {
    'paga-defense': {
      title: 'PAGA Defense Readiness Assessment | BizHR',
      description: 'California PAGA defense readiness assessment — evaluate your exposure under AB 2288 reformed penalty structure, cure provision eligibility, and documentation quality before a claim is filed.',
      lawRef: 'Labor Code §§ 2698–2699.6 (AB 2288)',
    },
    'separation-checklist': {
      title: 'California Termination & Separation Checklist | BizHR',
      description: 'California-compliant termination checklist — final pay timing, COBRA notice, WARN Act threshold calculator, reference policy, and separation agreement guidance.',
      lawRef: 'Labor Code §§ 201-203 / WARN Act / COBRA',
    },
    'hiring-compliance': {
      title: 'California Hiring Compliance Toolkit | BizHR',
      description: 'California hiring compliance toolkit — ban-the-box (AB 1008), offer letter templates, background check process, and salary history ban (SB 1162) compliance.',
      lawRef: 'Gov. Code § 12952 (AB 1008) / Labor Code § 432.3 (SB 1162)',
    },
  }
  const config = gatedConfigs[slug]
  if (!config) return {}
  return {
    title: config.title,
    description: config.description,
  }
}

export default async function GatedToolPage({ params }: Props) {
  const { slug } = await params
  if (!GATED_SLUGS.includes(slug)) notFound()

  // Build minimal spoke config for the placeholder
  const gatedSpokes: Record<string, Parameters<typeof GatedSpokePlaceholder>[0]['spoke']> = {
    'paga-defense': {
      slug: 'paga-defense',
      route: '/tools/paga-defense',
      title: 'PAGA Defense Readiness Assessment',
      shortTitle: 'PAGA Defense',
      badge: 'AB 2288 Updated',
      description: 'Evaluate your exposure under the AB 2288 reformed PAGA penalty structure. Assess cure provision eligibility, documentation quality, and arbitration agreement status before a claim is filed against your business.',
      lawRef: 'Labor Code §§ 2698–2699.6 (AB 2288)',
      price: 99,
      priceLabel: '$99 one-time',
      items: [],
      faqs: [],
      ctaLabel: 'Get Early Access',
      accentColor: 'indigo' as const,
    },
    'separation-checklist': {
      slug: 'separation-checklist',
      route: '/tools/separation-checklist',
      title: 'California Termination & Separation Checklist',
      shortTitle: 'Separation Checklist',
      badge: 'CA Labor Code',
      description: 'A step-by-step California-compliant termination checklist — final pay timing (Labor Code § 201-203), COBRA notice, WARN Act threshold calculator, reference policy, and separation agreement guidance for small businesses.',
      lawRef: 'Labor Code §§ 201-203 / WARN Act / COBRA',
      price: 79,
      priceLabel: '$79 one-time',
      items: [],
      faqs: [],
      ctaLabel: 'Get Early Access',
      accentColor: 'rose' as const,
    },
    'hiring-compliance': {
      slug: 'hiring-compliance',
      route: '/tools/hiring-compliance',
      title: 'California Hiring Compliance Toolkit',
      shortTitle: 'Hiring Toolkit',
      badge: 'AB 1008 + SB 1162',
      description: 'A complete California hiring compliance toolkit — ban-the-box (AB 1008) compliant job posting review, California-compliant offer letter templates, background check process design, and salary history ban (SB 1162) compliance for small businesses.',
      lawRef: 'Gov. Code § 12952 (AB 1008) / Labor Code § 432.3 (SB 1162)',
      price: 99,
      priceLabel: '$99 one-time',
      items: [],
      faqs: [],
      ctaLabel: 'Get Early Access',
      accentColor: 'cyan' as const,
    },
  }

  const spoke = gatedSpokes[slug]
  if (!spoke) notFound()

  return <GatedSpokePlaceholder spoke={spoke} />
}
