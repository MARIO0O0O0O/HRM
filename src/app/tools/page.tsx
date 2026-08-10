import Link from 'next/link'
import { toolsList } from '@/data/tools'
import { ArrowRight, Shield, FileText, AlertTriangle, BookOpen, Calculator, ClipboardCheck, CalendarClock } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Compliance Tools & Toolkits — BizHR | California HR for Small Businesses',
  description: 'Free California compliance tools (PAGA calculator, self-assessment quizzes, deadline tracker) plus DIY toolkits — WVPP (SB 553), HPP (SB 1343), IIPP (8 CCR § 3203), and Know Your Rights (SB 294).',
}

const accentMap = {
  indigo: {
    badge: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
    border: 'hover:border-indigo-500/30',
    icon: 'bg-indigo-500/10 text-indigo-400',
    btn: 'bg-indigo-600 hover:bg-indigo-500',
    tag: 'bg-indigo-500/10 text-indigo-300',
  },
  cyan: {
    badge: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    border: 'hover:border-cyan-500/30',
    icon: 'bg-cyan-500/10 text-cyan-400',
    btn: 'bg-cyan-600 hover:bg-cyan-500',
    tag: 'bg-cyan-500/10 text-cyan-300',
  },
  violet: {
    badge: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
    border: 'hover:border-violet-500/30',
    icon: 'bg-violet-500/10 text-violet-400',
    btn: 'bg-violet-600 hover:bg-violet-500',
    tag: 'bg-violet-500/10 text-violet-300',
  },
  rose: {
    badge: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
    border: 'hover:border-rose-500/30',
    icon: 'bg-rose-500/10 text-rose-400',
    btn: 'bg-rose-600 hover:bg-rose-500',
    tag: 'bg-rose-500/10 text-rose-300',
  },
}

const slugIcons: Record<string, React.ElementType> = {
  hpp: Shield,
  wvpp: AlertTriangle,
  iipp: FileText,
  kyr: BookOpen,
}

export default function ToolsPage() {
  return (
    <div className="bg-[#0a0a0a] text-zinc-100 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full">
            California Compliance Tools
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-100 mt-6">
            Free tools first,{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              toolkits when you&apos;re ready
            </span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 mt-4 leading-relaxed">
            Start with the free calculator, quiz, or deadline tracker below — no signup needed. When you want fillable
            templates, Cal/OSHA-ready forms, and training facilitator guides, the DIY toolkits are further down.
          </p>
          <p className="mt-3 text-xs text-zinc-600">
            Educational guidance only · Not legal advice · Review with qualified employment counsel before implementation
          </p>
        </div>

        {/* Free Tools -- highest priority per site value hierarchy */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
            Free — No Signup Required
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <Link
            href="/paga-calculator"
            className="group bg-[#111111] border border-white/10 hover:border-indigo-500/30 rounded-2xl p-6 flex flex-col gap-3 transition-all"
          >
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Calculator className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-zinc-100 group-hover:text-white transition-colors">PAGA Exposure Calculator</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">Estimate your PAGA exposure range under the AB 2288 reformed penalty structure.</p>
            <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1 mt-auto">
              Try it <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
          <Link
            href="/tools/compliance-quiz"
            className="group bg-[#111111] border border-white/10 hover:border-indigo-500/30 rounded-2xl p-6 flex flex-col gap-3 transition-all"
          >
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-zinc-100 group-hover:text-white transition-colors">Compliance Quick-Check</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">A short self-assessment for HPP, WVPP, IIPP, or KYR — see where the gaps are.</p>
            <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1 mt-auto">
              Try it <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
          <Link
            href="/tools/deadline-tracker"
            className="group bg-[#111111] border border-white/10 hover:border-indigo-500/30 rounded-2xl p-6 flex flex-col gap-3 transition-all"
          >
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <CalendarClock className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-zinc-100 group-hover:text-white transition-colors">Training Deadline Tracker</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">Enter your dates and headcount to get exact renewal and new-hire deadlines.</p>
            <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1 mt-auto">
              Try it <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        </div>

        {/* Toolkit Cards */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full">
            Done-For-You Toolkits
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {toolsList.map((tool) => {
            const colors = accentMap[tool.accentColor]
            const Icon = slugIcons[tool.slug] ?? FileText
            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className={`group bg-[#111111] border border-white/10 ${colors.border} rounded-2xl p-8 flex flex-col gap-5 transition-all duration-300 hover:scale-[1.01]`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className={`h-11 w-11 rounded-xl ${colors.icon} flex items-center justify-center shrink-0`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${colors.badge}`}>
                    {tool.badge}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-zinc-100 group-hover:text-white transition-colors leading-snug">
                    {tool.shortTitle}
                  </h2>
                  <p className="text-xs text-zinc-600 font-mono mt-1">{tool.lawRef}</p>
                  <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-1">
                  {tool.items.slice(0, 3).map((item) => (
                    <span key={item.title} className={`text-xs font-medium px-2.5 py-1 rounded-lg ${colors.tag}`}>
                      {item.icon} {item.title.split('(')[0].trim()}
                    </span>
                  ))}
                  {tool.items.length > 3 && (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/5 text-zinc-500">
                      +{tool.items.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-5 mt-auto">
                  <span className="text-2xl font-black text-zinc-100">{tool.priceLabel}</span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors">
                    View Toolkit <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 border border-white/10 bg-[#111111] rounded-2xl p-8 sm:p-10 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-zinc-100">Need help implementing?</h3>
          <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
            Purchase the toolkit, then book a $75 consultation to get expert guidance on customizing and rolling it out in your business.
          </p>
          <Link href="/book" className="inline-block mt-6">
            <span className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors inline-flex items-center gap-2">
              Book a Consultation <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
