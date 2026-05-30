import GatedSpokePlaceholder from '@/components/tools/GatedSpokePlaceholder'
import { notFound } from 'next/navigation'

const GATED_SLUGS = ['paga-defense', 'separation-checklist', 'hiring-compliance']

interface GatedSpokeData {
  slug: string
  title: string
  shortTitle: string
  lawRef: string
  description: string
  liveDate: string
}

const gatedSpokes: Record<string, GatedSpokeData> = {
  'paga-defense': {
    slug: 'paga-defense',
    title: 'PAGA Defense Readiness Assessment',
    shortTitle: 'PAGA Defense',
    lawRef: 'Labor Code §§ 2698–2699.6 (AB 2288)',
    description: 'Evaluate your exposure under the AB 2288 reformed PAGA penalty structure. Assess cure provision eligibility, documentation quality, and arbitration agreement status before a claim is filed against your business.',
    liveDate: '2026-07-01',
  },
  'separation-checklist': {
    slug: 'separation-checklist',
    title: 'California Termination & Separation Checklist',
    shortTitle: 'Separation Checklist',
    lawRef: 'Labor Code §§ 201-203 / WARN Act / COBRA',
    description: 'A step-by-step California-compliant termination checklist — final pay timing (Labor Code § 201-203), COBRA notice, WARN Act threshold calculator, reference policy, and separation agreement guidance for small businesses.',
    liveDate: '2026-07-15',
  },
  'hiring-compliance': {
    slug: 'hiring-compliance',
    title: 'California Hiring Compliance Toolkit',
    shortTitle: 'Hiring Toolkit',
    lawRef: 'Gov. Code § 12952 (AB 1008) / Labor Code § 432.3 (SB 1162)',
    description: 'A complete California hiring compliance toolkit — ban-the-box (AB 1008) compliant job posting review, California-compliant offer letter templates, background check process design, and salary history ban (SB 1162) compliance for small businesses.',
    liveDate: '2026-07-15',
  },
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return GATED_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const spoke = gatedSpokes[slug]
  if (!spoke) return {}
  return {
    title: `${spoke.title} | BizHR`,
    description: spoke.description,
  }
}

export default async function GatedToolPage({ params }: Props) {
  const { slug } = await params
  const spoke = gatedSpokes[slug]
  if (!spoke) notFound()
  return <GatedSpokePlaceholder spoke={spoke} />
}
