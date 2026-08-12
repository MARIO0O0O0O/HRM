import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HPP Policy & Forms — SB 1343 Requirements | BizHR',
  description: 'The complete set of policy and form documents required for SB 1343 harassment prevention compliance.',
}

export default function PolicyTemplatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
