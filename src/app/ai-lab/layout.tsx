import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Lab — Free Compliance Audit & Policy Drafting | CalBizHR',
  description: 'Two free AI-powered tools: a Strategic Audit Engine that scores your HR practices, and a Policy Architect that drafts California-specific HR policies from a plain-English request.',
}

export default function AiLabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
