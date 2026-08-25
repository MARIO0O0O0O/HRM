import { Info } from 'lucide-react'

export default function LegalDisclaimer() {
  return (
    <div className="mt-12 p-4 rounded-xl bg-[#111111]/60 border border-white/5 text-xs text-zinc-500 flex items-start gap-2.5 text-left max-w-4xl mx-auto">
      <Info className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
      <p className="leading-relaxed">
        This site&apos;s content is developed with AI assistance and reviewed for accuracy against current statutory and regulatory sources; it is not a substitute for legal advice from a licensed attorney. Laws referenced here change — verify current requirements before relying on any specific figure, deadline, or requirement stated here.
      </p>
    </div>
  )
}
