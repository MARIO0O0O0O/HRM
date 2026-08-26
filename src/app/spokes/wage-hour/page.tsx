import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Wage & Hour Compliance | CalBizHR',
  description: 'California Wage & Hour defense, paystub itemizations (LC §226), meal & rest breaks (LC §226.7), and overtime classification rules.',
}

export default function WageHourPage() {
  return (
    <div className="flex-grow bg-[#1A2D4D] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-3 py-1 rounded-full">
          Category 2 Hub • Phase 2
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Wage & Hour Compliance
        </h1>
        <p className="text-lg font-sans text-zinc-300 leading-relaxed">
          California Labor Code wage statement itemizations (§226), meal & rest break workflow rules (§226.7), and timekeeping classification exposure defense.
        </p>
        <div className="p-6 bg-[#0f1c32] border border-[#B5933C]/20 rounded-2xl text-sm font-sans text-zinc-400">
          <p className="font-semibold text-[#B5933C]">Category Hub Coming Soon in Phase 2</p>
          <p className="mt-1">Detailed statutory guides, wage audit tools, and program materials will launch here.</p>
        </div>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-sm font-bold text-[#1A2D4D] bg-[#B5933C] hover:bg-[#d4b45a] transition-colors shadow-lg"
          >
            &larr; Return to Compliance Hub
          </Link>
        </div>
      </div>
    </div>
  )
}
