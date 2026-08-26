import type { Metadata } from 'next'
import HubGrid from '@/components/hub/HubGrid'

export const metadata: Metadata = {
  title: 'CalBizHR | California HR Compliance for Small Businesses — SB 1343, SB 553, PAGA',
  description: 'Free California HR compliance tools (PAGA calculator, compliance quiz, deadline tracker) plus DIY toolkits and live training for harassment prevention (SB 1343), workplace violence prevention (SB 553), and more. Built for LA-area small businesses.',
}

export default function Home() {
  return <HubGrid />
}
