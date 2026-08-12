import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import Breadcrumb from '@/components/layout/Breadcrumb'
import {
  GraduationCap,
  Calendar,
  Sparkles,
  MapPin,
  Heart,
  CheckCircle2,
  Phone,
  ExternalLink,
  Briefcase
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Mario Espindola, MPA — BizHR Founder | California HR Compliance',
  description: '10+ years of California municipal regulatory experience, now helping small businesses navigate HR compliance without the law-firm price tag.',
}

export default function AboutPage() {
  const qualifications = [
    {
      title: 'IPMA-Senior Certified Professional',
      description: 'Senior-level certification from the International Public Management Association for HR — the credential specific to public-sector HR leadership.',
      icon: GraduationCap,
    },
    {
      title: '$60M HR Budget, 1,500+ Employees',
      description: 'Seven years at the City of Santa Ana — Management Aide through HR Analyst — overseeing HR operations for a workforce that size before ever starting BizHR.',
      icon: Calendar,
    },
    {
      title: 'MPA, Cal State Fullerton',
      description: 'Master of Public Administration, including the City Management Fellowship — advanced training in governance, organizational design, and regulatory analysis.',
      icon: Sparkles,
    },
  ]

  const keyDifferentiators = [
    'Practical, non-academic guidance built directly for shift and hourly operators',
    'AI-augmented delivery resulting in large-firm quality with fewer billable hours',
    'Local San Gabriel Valley presence, ensuring close, on-demand relationships',
    'Honest, fast, transparent counsel without unnecessary bureaucratic overhead',
  ]

  return (
    <div className="bg-[#0a0a0a] text-zinc-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb className="mb-8" />
        
        {/* Hero Banner */}
        <div className="relative rounded-3xl border border-white/5 bg-[#111111]/40 p-8 sm:p-12 mb-12 overflow-hidden text-left flex flex-col md:flex-row items-center gap-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_60%)] pointer-events-none" />
          <div className="flex-1 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 w-fit mb-6">
              <MapPin className="h-3 w-3" /> Founder & Principal Consultant
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mb-6">
              Mario Espindola, MPA
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-medium">
              &ldquo;Some kids grew up watching cartoons. I grew up watching my parents build something from nothing. I built BizHR so employers like them have somewhere to turn — practical, affordable, expert HR support.&rdquo;
            </p>
          </div>
          <div className="shrink-0 z-10 relative">
            <div className="h-48 w-48 sm:h-56 sm:w-56 rounded-full overflow-hidden border-4 border-[#161616] ring-1 ring-white/10 shadow-2xl relative">
              <Image 
                src="/images/mario_bio.jpg" 
                alt="Mario Espindola" 
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-left mb-16">
          <div className="md:col-span-8 flex flex-col gap-6">
            <h2 className="text-2xl font-extrabold text-zinc-100 tracking-tight">My Story & Philosophy</h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              They started with nothing — literally nothing. From homelessness to a flea market table, and eventually to two storefronts, my parents taught me that entrepreneurship isn&apos;t glamorous; it&apos;s a series of hard decisions made under pressure. I watched them wrestle with real questions: Do we invest in new technology? Do we get compliant with the latest regulations? Or do we put that money into inventory that actually moves? More often than not, they chose what worked — what made money and kept the doors open. That pragmatic, results-driven mindset became the lens through which I see everything.
            </p>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              My curiosity with technology started early. While my parents ran their business, I was the kid who wanted to understand how things worked — not just use them, but understand them. That curiosity never left me.
            </p>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              I went on to earn a Master&apos;s degree, spent years serving my community in municipal government, and built experience as an independent developer — each chapter deepening my understanding of systems, people, and what it actually takes to keep an operation running. Along the way, I kept coming back to the same problem I watched my parents navigate: small businesses are constantly forced to choose between staying compliant, staying competitive, and staying profitable. Too often, they feel like they can&apos;t afford all three.
            </p>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              That&apos;s exactly the gap I&apos;m here to close. I help small businesses stay compliant and high-tech — not with enterprise-level price tags, but with smart, accessible solutions built for the way real business owners operate. I&apos;ve seen the hustle up close my whole life. Now I get to be part of the solution.
            </p>
          </div>
          
          <div className="md:col-span-4 bg-[#111111] border border-white/10 rounded-2xl p-6 flex flex-col gap-6">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-100">Our Mission</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              To empower California small businesses by delivering the highest-caliber compliance frameworks and AI efficiency — allowing founders to focus on growth and building thriving workforces.
            </p>
          </div>
        </div>

        {/* Qualifications Grid */}
        <div className="mb-16 text-left">
          <h2 className="text-2xl font-extrabold text-zinc-100 tracking-tight mb-8">Professional Credentials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {qualifications.map((item, index) => (
              <div key={index} className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-zinc-100 leading-tight">{item.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Differentiators */}
        <div className="bg-[#111111]/40 border border-white/5 rounded-3xl p-8 sm:p-10 mb-16 text-left relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.03)_0%,transparent_50%)] pointer-events-none" />
          <h2 className="text-2xl font-extrabold text-zinc-100 tracking-tight mb-6">What Sets Us Apart</h2>
          <ul className="flex flex-col gap-4">
            {keyDifferentiators.map((diff, index) => (
              <li key={index} className="flex items-start gap-3.5 text-sm sm:text-base text-zinc-300">
                <CheckCircle2 className="h-5.5 w-5.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{diff}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Full professional background link */}
        <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 sm:p-10 mb-16 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex gap-4">
            <div className="h-11 w-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-100 mb-1.5">The Knowledge Behind BizHR</h3>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
                BizHR is built on real municipal HR experience, not a certification course. My full
                career history, credentials, and background are documented on my professional
                portfolio — worth a look if you want the complete picture before booking a call.
              </p>
            </div>
          </div>
          <a
            href="https://mario000.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 w-full sm:w-auto"
          >
            <Button variant="outline" className="w-full border-cyan-500/20 hover:border-cyan-500/40 bg-cyan-950/20 text-cyan-300 hover:text-cyan-200 font-semibold tracking-wide py-3 px-6 rounded-lg flex items-center justify-center gap-2">
              View Full Portfolio <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>

        {/* CTA block */}
        <div className="bg-gradient-to-r from-indigo-900/20 to-cyan-900/10 border border-white/10 rounded-2xl p-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-extrabold text-zinc-100">Ready to consult with Mario?</h3>
            <p className="text-xs sm:text-sm text-zinc-400">Book your introductory 30-minute call. Credit applied to any subsequent support.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link href="/book" className="w-full sm:w-auto">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-zinc-50 font-semibold tracking-wide py-3 px-6 rounded-lg">
                Book a Call
              </Button>
            </Link>
            <a href="tel:6269996239" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-white/10 hover:border-white/20 bg-zinc-950 text-zinc-300 hover:text-zinc-100 font-semibold tracking-wide py-3 px-6 rounded-lg flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" /> Call 626-999-6239
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
