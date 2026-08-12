import { ExternalLink, ShieldCheck } from 'lucide-react'

export interface ValidationLink {
  label: string
  href: string
  source: string
}

export default function ValidationLinks({ links }: { links: ValidationLink[] }) {
  return (
    <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-6 flex flex-col gap-4">
      <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-1.5">
        <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" /> Verify This Yourself
      </h3>
      <p className="text-xs text-zinc-500 leading-relaxed -mt-2">
        Don&apos;t take my word for it — here&apos;s where this information actually comes from.
      </p>
      <div className="flex flex-col gap-2.5">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 bg-[#0a0a0a] border border-white/5 hover:border-emerald-500/20 rounded-xl px-4 py-3 transition-colors group"
          >
            <div>
              <p className="text-sm font-semibold text-zinc-300 group-hover:text-zinc-100 transition-colors">{link.label}</p>
              <p className="text-xs text-zinc-600">{link.source}</p>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-zinc-600 group-hover:text-emerald-400 shrink-0 transition-colors" />
          </a>
        ))}
      </div>
    </div>
  )
}
