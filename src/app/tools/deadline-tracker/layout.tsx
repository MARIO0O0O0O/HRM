import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Training Deadline Tracker — Free Tool | BizHR',
  description: 'Enter your dates and headcount to get exact training renewal and new-hire compliance deadlines for HPP, WVPP, IIPP, and KYR.',
}

export default function DeadlineTrackerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
