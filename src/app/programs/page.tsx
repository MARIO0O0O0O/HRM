import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import { Shield, AlertTriangle, HardHat, BookOpen, ArrowRight, Clock } from 'lucide-react'

const programs = [
  {
    slug: 'harassment-prevention',
    code: 'HPP',
    title: 'Harassment Prevention Program',
    lawRef: 'SB 1343',
    description: 'Policy, training, and forms required under California\'s mandatory harassment prevention training law.',
    icon: Shield,
    live: true,
  },
  {
    slug: 'workplace-violence-prevention',
    code: 'WVPP',
    title: 'Workplace Violence Prevention',
    lawRef: 'SB 553',
    description: 'Written plan, hazard assessments, and annual training required for nearly all California employers.',
    icon: AlertTriangle,
    live: false,
  },
  {
    slug: 'injury-illness-prevention',
    code: 'IIPP',
    title: 'Injury & Illness Prevention',
    lawRef: 'Cal/OSHA',
    description: 'The foundational safety program required for every California employer, regardless of size.',
    icon: HardHat,
    live: false,
  },
  {
    slug: 'know-your-rights',
    code: 'KYR',
    title: 'Know Your Rights',
    lawRef: 'SB 294',
    description: 'Annual standalone notice covering workers\' comp, immigration rights, and emergency contact designation.',
    icon: BookOpen,
    live: false,
  },
]

export default function ProgramsIndexPage() {
  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb className="mb-8" />

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full">
            Compliance Programs
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-100 mt-6">
            Every California Compliance Program, Broken Down
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed">
            Each program below is a hub, not a wall of text — the summary card tells you exactly what&apos;s
            inside, and every claim links to where you can verify it yourself.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {programs.map((p) => {
            const cardContent = (
              <>
                <div className="flex items-start justify-between">
                  <div className="h-11 w-11 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                    <p.icon className="h-5 w-5" />
                  </div>
                  {p.live ? (
                    <ArrowRight className="h-4 w-4 text-zinc-700 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all mt-2" />
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full">
                      <Clock className="h-3 w-3" /> Soon
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-xs font-mono text-zinc-600 mb-1">{p.lawRef}</p>
                  <h3 className="font-bold text-lg text-zinc-100 group-hover:text-white transition-colors">{p.title}</h3>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">{p.description}</p>
                </div>
              </>
            )

            return p.live ? (
              <Link
                key={p.slug}
                href={`/programs/${p.slug}`}
                className="group bg-[#111111] border border-white/10 hover:border-indigo-500/30 rounded-2xl p-6 flex flex-col gap-4 transition-all"
              >
                {cardContent}
              </Link>
            ) : (
              <div
                key={p.slug}
                className="group bg-[#111111] border border-white/5 opacity-60 rounded-2xl p-6 flex flex-col gap-4"
              >
                {cardContent}
              </div>
            )
          })}
        </div>
        <LegalDisclaimer />
      </div>
    </div>
  )
}
