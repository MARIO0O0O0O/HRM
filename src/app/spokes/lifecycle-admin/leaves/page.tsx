import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Home, UserCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Protected Leaves & Accommodations (CFRA / ADA) | CalBizHR',
  description: 'California Family Rights Act (CFRA) leave rules, FEHA/ADA interactive process, and statutory leave notices.',
}

export default function LeavesProgramPage() {
  return (
    <div className="flex-grow bg-[#1A2D4D] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-[#B5933C]/20 pb-4">
          <Link
            href="/spokes/lifecycle-admin"
            className="inline-flex items-center gap-2 text-sm font-sans font-bold text-[#B5933C] hover:text-[#d4b45a] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Lifecycle Admin</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-zinc-300 hover:text-white transition-colors bg-[#0f1c32] px-3 py-1.5 rounded-lg border border-[#B5933C]/20"
          >
            <Home className="h-3.5 w-3.5 text-[#B5933C]" />
            <span>Home</span>
          </Link>
        </div>

        {/* Program Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <UserCheck className="h-6 w-6 text-[#B5933C]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-2.5 py-0.5 rounded-full">
              Level 3 Program • Phase 3
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Protected Leaves & Accommodations (CFRA / ADA)
          </h1>
          <p className="text-base font-sans text-zinc-300 leading-relaxed">
            CFRA 12-week job-protected family leave, disability accommodations, interactive process SOPs, and leave tracking documentation.
          </p>
        </div>

        {/* Placeholder Content Box */}
        <div className="p-8 bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl space-y-4 text-center">
          <h2 className="text-lg font-serif font-bold text-[#B5933C]">
            Program Details Coming in Phase 3
          </h2>
          <p className="text-sm font-sans text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Full compliance content for Protected Leaves & Accommodations — including CFRA eligibility calculators, interactive dialogue forms, and accommodation logs — will be integrated here in Phase 3.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/tools/job-classification"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-bold text-[#1A2D4D] bg-[#B5933C] hover:bg-[#d4b45a] transition-colors"
            >
              Access Job Classification Tool
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
