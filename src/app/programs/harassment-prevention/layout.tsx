import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Harassment Prevention Program (SB 1343) — Compliance Hub | BizHR',
  description: 'Everything California employers need to know about SB 1343 harassment prevention: policy, forms, training requirements, and links to verify every claim against the actual statute.',
}

export default function HarassmentPreventionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
