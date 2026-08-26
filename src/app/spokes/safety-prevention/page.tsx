import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Home, ShieldCheck, ArrowRight, Wrench } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Safety & Workplace Prevention | CalBizHR',
  description: 'California Category 1 Hub: Harassment Prevention (SB 1343), Workplace Violence Prevention (SB 553 / LC §6401.9), and Cal/OSHA IIPP (Title 8 CCR §3203).',
}

const programs = [
  {
    id: 'harassment-prevention',
    title: 'Harassment Prevention (SB 1343)',
    href: '/spokes/safety-prevention/harassment-prevention',
    citation: 'Gov. Code § 12950.1 / SB 1343',
    description: 'Mandatory employee and supervisor harassment prevention training timelines, written complaint procedures, and anti-retaliation rules.',
  },
  {
    id: 'workplace-violence',
    title: 'Workplace Violence (SB 553 / LC §6401.9)',
    href: '/spokes/safety-prevention/workplace-violence',
    citation: 'Labor Code § 6401.9 / SB 553',
    description: 'Site-specific written Workplace Violence Prevention Plan (WVPP), violent incident log recordkeeping, and annual employee training.',
  },
  {
    id: 'osha-iipp',
    title: 'Cal/OSHA IIPP (Title 8 CCR §3203)',
    href: '/spokes/safety-prevention/osha-iipp',
    citation: 'Title 8 CCR § 3203',
    description: 'The 8 core Injury & Illness Prevention Program elements, workplace hazard inspections, and indoor/outdoor heat illness prevention procedures.',
  },
]

const tools = [
  {
    title: 'HPP DIY Toolkit',
    href: '/tools/hpp',
    description: 'Turnkey Harassment Prevention Policy template, complaint forms, and training rosters.',
  },
  {
    title: 'WVPP Toolkit',
    href: '/tools/wvpp',
    description: 'Written Workplace Violence Prevention Plan template, hazard audit forms, and incident log.',
  },
  {
    title: 'IIPP Safety Toolkit',
    href: '/tools/iipp',
    description: 'Complete 9-section Cal/OSHA Injury & Illness Prevention Program binder and inspection checklists.',
  },
]

export default function SafetyPreventionHubPage() {
  return (
    <div className="flex-grow bg-[#1A2D4D] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header Bar with Back + Home Navigation */}
        <div className="flex items-center justify-between border-b border-[#B5933C]/20 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-sans font-bold text-[#B5933C] hover:text-[#d4b45a] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Compliance Hub</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-zinc-300 hover:text-white transition-colors bg-[#0f1c32] px-3 py-1.5 rounded-lg border border-[#B5933C]/20"
          >
            <Home className="h-3.5 w-3.5 text-[#B5933C]" />
            <span>Home</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-[#B5933C]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-3 py-1 rounded-full">
              Category 1 Hub • Level 2
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Safety & Workplace Prevention
          </h1>
          <p className="text-lg font-sans text-zinc-300 max-w-3xl leading-relaxed">
            California employers are subject to comprehensive statutory mandates designed to protect workers from harassment, physical violence, and occupational hazards. Establishing effective preventive programs is a core legal responsibility under California law.
          </p>
        </div>

        {/* Category Law Overview (Authoritative Statutory Text) */}
        <div className="p-6 sm:p-8 bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl space-y-4 text-zinc-300 font-sans text-sm sm:text-base leading-relaxed">
          <h2 className="text-xl font-serif font-bold text-white mb-2">
            Statutory Legal Framework
          </h2>
          <p>
            Under <strong className="text-[#B5933C]">Senate Bill 1343</strong>, California law requires employers with 5 or more employees to provide mandatory sexual harassment prevention training to all supervisory and non-supervisory personnel. Employers must also maintain clear written anti-harassment complaint procedures and conduct prompt, impartial investigations.
          </p>
          <p>
            Effective July 1, 2024, <strong className="text-[#B5933C]">Senate Bill 553 / Labor Code § 6401.9</strong> mandates that nearly all California employers establish, implement, and maintain a site-specific written Workplace Violence Prevention Plan (WVPP). This mandate includes recording violent incidents in a statutory log and providing annual training tailored to workplace-specific hazards.
          </p>
          <p>
            Additionally, under <strong className="text-[#B5933C]">Title 8 CCR § 3203</strong>, Cal/OSHA enforces mandatory Injury & Illness Prevention Programs (IIPP). Every California employer must maintain an active written safety program covering hazard evaluation, safety communications, regular inspections, and heat illness prevention protocols.
          </p>
        </div>

        {/* 3 Nested Program Cards Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-serif font-bold text-white">
            Compliance Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map((prog) => (
              <Link
                key={prog.id}
                href={prog.href}
                className="group flex flex-col justify-between p-6 bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl text-left transition-all duration-200 hover:border-[#B5933C] hover:bg-[#1f365c] hover:shadow-xl"
              >
                <div className="space-y-3">
                  <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-2.5 py-0.5 rounded-full">
                    {prog.citation}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#B5933C] transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                    {prog.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#B5933C]/10 flex items-center justify-between text-xs font-sans font-bold text-[#B5933C]">
                  <span>Explore Program</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="space-y-4 pt-4 border-t border-[#B5933C]/20">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-[#B5933C]" />
            <h2 className="text-xl font-serif font-bold text-white">
              Category Toolkits & Resources
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tools.map((tool, idx) => (
              <Link
                key={idx}
                href={tool.href}
                className="p-5 bg-[#0f1c32] border border-[#B5933C]/20 rounded-xl hover:border-[#B5933C]/50 transition-colors group"
              >
                <h3 className="text-sm font-sans font-bold text-white group-hover:text-[#B5933C] transition-colors">
                  {tool.title}
                </h3>
                <p className="text-xs font-sans text-zinc-400 mt-1">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
