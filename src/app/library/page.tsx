import Link from 'next/link'
import { Folder, ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Free Resources Library | CalBizHR',
  description: 'Free California HR compliance checklists, guides, and toolkits for small businesses.',
}

export default function LibraryPage() {
  return (
    <main className="min-h-screen bg-[#0a1320] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#B5933C] hover:text-[#d4b45a] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#B5933C]/10 border border-[#B5933C]/30 text-[#B5933C] mb-2">
            <Folder className="h-8 w-8" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Free Resources Library
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            We are building a central, free library aggregating downloadable compliance checklists, guides, and toolkits across all California HR compliance areas for local small businesses.
          </p>

          <div className="inline-block bg-[#B5933C]/10 border border-[#B5933C]/30 rounded-full px-4 py-1.5 text-xs font-mono text-[#B5933C] uppercase tracking-wider">
            Coming Soon · Phase 2 Expansion
          </div>
        </div>
      </div>
    </main>
  )
}
