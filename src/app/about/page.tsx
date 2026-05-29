import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Breadcrumb from '@/components/layout/Breadcrumb'
import {
  GraduationCap,
  Calendar,
  Sparkles,
  MapPin,
  Heart,
  CheckCircle2,
  Phone
} from 'lucide-react'

export default function AboutPage() {
  const qualifications = [
    {
      title: 'Master of Public Administration (MPA)',
      description: 'Advanced degree focusing on public management, organizational design, governance, and regulatory analysis.',
      icon: GraduationCap,
    },
    {
      title: '10+ Years Workforce Depth',
      description: 'Over a decade designing policy, conducting audits, resolving disputes, and managing recruitment in California public sector HR.',
      icon: Calendar,
    },
    {
      title: 'AI Automation Integration',
      description: 'Certified specialist leveraging LLMs, dynamic automation workflows, and custom checker pipelines to streamline business procedures.',
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
        <div className="relative rounded-3xl border border-white/5 bg-[#111111]/40 p-8 sm:p-12 mb-12 overflow-hidden text-left">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_60%)] pointer-events-none" />
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 w-fit mb-6">
            <MapPin className="h-3 w-3" /> Founder & Principal Consultant
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mb-6">
            Mario Espindola, MPA
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-medium">
            &ldquo;I grew up watching family members build businesses while struggling with the labor compliance issues that come with growth. I built BizHR so employers like them have somewhere to turn — practical, affordable, expert HR support.&rdquo;
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-left mb-16">
          <div className="md:col-span-8 flex flex-col gap-6">
            <h2 className="text-2xl font-extrabold text-zinc-100 tracking-tight">My Story & Philosophy</h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Growing up in the San Gabriel Valley, California, in a family of hard-working entrepreneurs, I witnessed firsthand the anxiety that labor compliance can cause. Small business owners excel at their crafts and care deeply about their teams, but navigating California&apos;s complex regulatory landscape without dedicated legal resources is a minefield.
            </p>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              After earning my Master of Public Administration (MPA) and spending over a decade handling high-stakes HR operations, policy writing, audits, and conflict resolution in the California public sector, I decided to bridge this gap.
            </p>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              BizHR was founded to provide practical compliance infrastructure directly to business owners in construction, hospitality, retail, restaurants, salons, and home services. We operate on three fundamental principles: **honesty, speed, and practicality**.
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
