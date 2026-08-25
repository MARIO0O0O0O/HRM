import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'California PAGA Exposure Calculator — Free Tool | CalBizHR',
  description: 'Estimate your PAGA exposure range under the AB 2288 reformed penalty structure. Free, instant, no signup required.',
}

export default function PagaCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
