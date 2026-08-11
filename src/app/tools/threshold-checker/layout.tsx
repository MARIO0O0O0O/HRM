import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'California Employer Threshold Checker — Free Tool | BizHR',
  description: 'Find out which California and federal employment laws apply to your business based on your employee count. Instant results, no signup.',
}

export default function ThresholdCheckerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
