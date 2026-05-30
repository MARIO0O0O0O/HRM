import Link from 'next/link'
import { Bell, ArrowRight, Clock } from 'lucide-react'

interface GatedSpokeProps {
  slug: string
  title: string
  shortTitle: string
  lawRef: string
  description: string
  liveDate?: string
}

interface GatedSpokePlaceholderProps {
  spoke: GatedSpokeProps
}

export default function GatedSpokePlaceholder({ spoke }: GatedSpokePlaceholderProps) {
  const launchDate = spoke.liveDate
    ? new Date(spoke.liveDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Coming Soon'

  return (
    <div className="bg-[#0a0a0a] text-zinc-100 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Status badge */}
        <span className="inline-flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-full border bg-amber-500/10 border-amber-500/20 text-amber-400 mb-8">
          <Clock className="h-3.5 w-3.5" />
          {spoke.title} — Updating for 2026 Regulations
        </span>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-100 mt-4">
          {spoke.shortTitle}
        </h1>
        <p className="text-xs font-mono text-zinc-600 mt-2">{spoke.lawRef}</p>

        <p className="text-base text-zinc-400 mt-6 leading-relaxed">
          {spoke.description}
        </p>

        <p className="text-sm text-zinc-500 mt-4">
          We&apos;re updating this tool to reflect 2026 California regulatory changes. Expected launch: {launchDate}.
        </p>

        {/* Email waitlist form */}
        <div className="mt-10 bg-[#111111] border border-white/10 rounded-2xl p-7">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-zinc-100">Get early access when it launches</h2>
          </div>
          <form
            action="/api/waitlist"
            method="POST"
            className="flex flex-col sm:flex-row gap-3"
          >
            <input type="hidden" name="spoke" value={spoke.slug} />
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm shrink-0"
            >
              Notify Me <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          <p className="text-xs text-zinc-700 mt-3">
            No spam. One email when the tool launches.
          </p>
        </div>

        {/* Book consultation CTA */}
        <div className="mt-8">
          <p className="text-sm text-zinc-500">Need this now?</p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Book a consultation and we&apos;ll handle it manually <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
