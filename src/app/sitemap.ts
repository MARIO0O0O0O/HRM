import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bizhr.vercel.app'

const toolSlugs = ['hpp', 'wvpp', 'iipp', 'kyr']
const spokeSlugs = [
  'compliance-audit',
  'labor-law',
  'handbook',
  'ai-services',
  'manager-support',
  'harassment-prevention',
  'workplace-violence',
  'onboarding',
  'hr-support',
]
const blogSlugs = [
  'california-sb-553-workplace-violence-prevention',
  'california-meal-break-compliance-PAGA-rules',
  'SB-1343-mandatory-harassment-prevention-training',
  'employee-handbook-checklist-california',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes: { path: string; priority: number; changeFreq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1.0, changeFreq: 'weekly' },
    { path: '/paga-calculator', priority: 0.9, changeFreq: 'monthly' },
    { path: '/tools', priority: 0.9, changeFreq: 'monthly' },
    { path: '/tools/compliance-quiz', priority: 0.9, changeFreq: 'monthly' },
    { path: '/tools/deadline-tracker', priority: 0.9, changeFreq: 'monthly' },
    { path: '/services', priority: 0.8, changeFreq: 'monthly' },
    { path: '/pricing', priority: 0.7, changeFreq: 'monthly' },
    { path: '/blog', priority: 0.7, changeFreq: 'weekly' },
    { path: '/about', priority: 0.6, changeFreq: 'yearly' },
    { path: '/contact', priority: 0.6, changeFreq: 'yearly' },
    { path: '/book', priority: 0.8, changeFreq: 'monthly' },
    { path: '/terms', priority: 0.3, changeFreq: 'yearly' },
    { path: '/privacy', priority: 0.3, changeFreq: 'yearly' },
    ...toolSlugs.map((slug) => ({ path: `/tools/${slug}`, priority: 0.7, changeFreq: 'monthly' as const })),
    ...spokeSlugs.map((slug) => ({ path: `/spokes/${slug}`, priority: 0.5, changeFreq: 'monthly' as const })),
    ...blogSlugs.map((slug) => ({ path: `/blog/${slug}`, priority: 0.6, changeFreq: 'yearly' as const })),
  ]

  return routes.map(({ path, priority, changeFreq }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: changeFreq,
    priority,
  }))
}
