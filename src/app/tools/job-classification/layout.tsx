import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Job Classification Quiz — Exempt, Non-Exempt, or Contractor | CalBizHR',
  description: 'Free California job classification quiz to determine whether a worker is exempt, non-exempt, or an independent contractor under Labor Code § 2775 (AB 5) and IWC Wage Orders.',
}

export default function JobClassificationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
