import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compliance Programs — HPP, WVPP, IIPP, KYR | BizHR',
  description: 'California HR compliance programs broken into clear, verifiable cards instead of long pages. Harassment prevention, workplace violence prevention, injury & illness prevention, and know your rights.',
}

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
