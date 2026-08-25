import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'California Mandatory Workplace Posting Checklist — Free Tool | CalBizHR',
  description: 'Free interactive checklist of required federal, California state, and Los Angeles local workplace postings. Filter by company size, location, and industry.',
}

export default function MandatoryPostingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
