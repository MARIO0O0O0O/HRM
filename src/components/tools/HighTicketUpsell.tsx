import Link from 'next/link'
import { ArrowRight, Download, Shield } from 'lucide-react'

interface HighTicketUpsellProps {
  isCannabis?: boolean
  onDownload?: () => void
  downloadLabel?: string
}

export default function HighTicketUpsell({
  isCannabis = false,
  onDownload,
  downloadLabel = 'Download & Implement Myself',
}: HighTicketUpsellProps) {
  return (
    <div className="mt-10 border border-indigo-500/20 bg-gradient-to-br from-indigo-950/30 to-[#0d0d0d] rounded-2xl p-7 sm:p-9">
      <div className="flex items-start gap-4 mb-5">
        <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
          <Shield className="h-5 w-5 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-zinc-100 leading-snug">
            Don&apos;t implement this alone.
          </h3>
          <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
            {isCannabis
              ? 'Cannabis employers face unique FEHA + federal intersection risks. Get a compliance review before you file anything — one gap can trigger a Cal/OSHA citation or PAGA claim.'
              : 'A Senior HR Compliance Auditor will review your output, identify gaps specific to your industry, and give you a clear implementation roadmap.'}
            {' '}Free 30-minute strategy session — no obligation.
          </p>
        </div>
      </div>

      {/* Trust signal */}
      <p className="text-xs text-zinc-600 mb-5">
        Trusted by Los Angeles-area small businesses since 2024.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/book"
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-indigo-900/30 text-sm"
        >
          Book My Free Strategy Session <ArrowRight className="h-4 w-4" />
        </Link>

        {onDownload && (
          <button
            onClick={onDownload}
            className="inline-flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-zinc-100 font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            <Download className="h-4 w-4" />
            {downloadLabel}
          </button>
        )}
      </div>
    </div>
  )
}
