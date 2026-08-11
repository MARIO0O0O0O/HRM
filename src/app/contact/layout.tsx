import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact BizHR — California HR Compliance Consulting',
  description: 'Get in touch about harassment prevention, workplace violence prevention, or general California HR compliance questions.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
