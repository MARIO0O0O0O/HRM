import Link from 'next/link'
import type { Metadata } from 'next'
import { spokesRegistry } from '@/data/spokes'
import { Button } from '@/components/ui/button'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { CheckCircle2, ArrowRight, Sparkles, Scale, BookOpen, ShieldAlert, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services — California HR Compliance Consulting | BizHR',
  description: 'Harassment prevention, workplace violence prevention, injury & illness prevention, compliance audits, and ongoing HR support for California small businesses.',
}

export default function ServicesPage() {
  const services = Object.values(spokesRegistry)

  // Map slugs to appropriate icons
  const getIcon = (slug: string) => {
    switch (slug) {
      case 'compliance-audit':
        return ShieldAlert
      case 'labor-law':
        return Scale
      case 'handbook':
        return BookOpen
      case 'training':
        return Award
      case 'ai-services':
        return Sparkles
      default:
        return ShieldAlert
    }
  }

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb className="mb-8" />
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full">
            Comprehensive Compliance
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6">
            M.E. HR Solutions Catalog
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-xl mx-auto leading-relaxed">
            Done-for-you, highly practical operations-level support built specifically for California small business owners who run shift and hourly workforce teams.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => {
            const Icon = getIcon(service.slug)
            return (
              <div
                key={service.slug}
                className="bg-[#111111] border border-white/5 hover:border-indigo-500/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-indigo-500/5 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-5">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-xl font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">
                        {service.title}
                      </h2>
                    </div>
                    {service.slug === 'ai-services' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 tracking-wide uppercase shrink-0">
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs sm:text-sm text-zinc-400 mt-4 leading-relaxed font-medium">
                    {service.description}
                  </p>

                  <div className="mt-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">Key Focus Areas:</h3>
                    <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
                      {service.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-zinc-300">
                          <CheckCircle2 className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <Link href={`/spokes/${service.slug}`}>
                    <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-zinc-100 font-semibold tracking-wide py-2.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Closing Pricing / Retainer CTA */}
        <div className="bg-gradient-to-r from-indigo-900/20 to-cyan-900/10 border border-white/10 rounded-2xl p-8 sm:p-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.03)_0%,transparent_50%)] pointer-events-none" />
          <div className="flex flex-col gap-3 max-w-xl">
            <h2 className="text-2xl font-extrabold text-zinc-100 tracking-tight">Need On-Demand Support?</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              We offer customizable ongoing fractional HR consulting and policy updates subscription models starting at small-business rates. No long-term locks required.
            </p>
          </div>
          <Link href="/book" className="w-full md:w-auto shrink-0">
            <Button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-zinc-50 font-semibold tracking-wide py-3 px-8 rounded-lg cursor-pointer">
              Consult with Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
