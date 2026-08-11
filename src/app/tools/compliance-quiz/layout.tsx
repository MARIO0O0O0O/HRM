import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compliance Quick-Check — Free Self-Assessment | BizHR',
  description: 'A short self-assessment for HPP, WVPP, IIPP, or KYR compliance — see where the gaps are. Free, no signup required.',
}

export default function ComplianceQuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
