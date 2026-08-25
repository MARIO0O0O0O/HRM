import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HPP Training Requirements — SB 1343 | CalBizHR',
  description: 'The exact training hour, timing, and interactivity requirements for SB 1343 harassment prevention training.',
}

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
