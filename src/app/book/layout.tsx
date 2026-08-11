import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Consultation — BizHR California HR Compliance',
  description: 'Book a $75 consultation to get expert guidance on California HR compliance for your business.',
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
