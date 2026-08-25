import Link from 'next/link'
import type { Metadata } from 'next'
import CinematicHero from '@/components/hero/CinematicHero'
import PagaCalculatorComponent from '@/components/calculator/PagaCalculatorComponent'
import { Button } from '@/components/ui/button'
import {
  ShieldCheck,
  FileText,
  Users,
  GraduationCap,
  Scale,
  DollarSign,
  UserCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
  Calculator
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'CalBizHR | California HR Compliance for Small Businesses — SB 1343, SB 553, PAGA',
  description: 'Free California HR compliance tools (PAGA calculator, compliance quiz, deadline tracker) plus DIY toolkits and live training for harassment prevention (SB 1343), workplace violence prevention (SB 553), and more. Built for LA-area small businesses.',
}

export default function Home() {
  const services = [
    {
      title: 'HR Risk Reviews',
      description: 'Focused reviews of wage-and-hour practices, onboarding, employee files, handbook language, and frontline manager habits.',
      icon: ShieldCheck,
      href: '/spokes/compliance-audit',
    },
    {
      title: 'Handbooks and Policies',
      description: 'Handbook updates, policy cleanup, notices, forms, and practical documentation built for California small-business reality.',
      icon: FileText,
      href: '/spokes/handbook',
    },
    {
      title: 'Manager Support',
      description: 'Help with employee issues, write-ups, investigations, terminations, onboarding process design, and day-to-day people problems.',
      icon: Users,
      href: '/spokes/manager-support',
    },
    {
      title: 'Harassment Prevention',
      description: 'Compliance-focused harassment prevention training and policy implementation for California employers and their teams.',
      icon: GraduationCap,
      href: '/spokes/harassment-prevention',
    },
    {
      title: 'Workplace Violence Prevention',
      description: 'SB 553 compliant workplace violence prevention plans, hazard assessments, and incident response training.',
      icon: Scale,
      href: '/spokes/workplace-violence',
    },
    {
      title: 'Wage-and-Hour Cleanup',
      description: 'Break, overtime, paystub, scheduling, and classification process review aimed at reducing preventable exposure.',
      icon: DollarSign,
      href: '/spokes/labor-law',
    },
    {
      title: 'Onboarding Systems',
      description: 'Offer letters, checklists, orientation flow, new-hire packets, and role clarity for growing teams.',
      icon: UserCheck,
      href: '/spokes/onboarding',
    },
    {
      title: 'Ongoing HR Support',
      description: 'Fractional, project-based, or on-call support for employers who need HR help without hiring full-time HR staff.',
      icon: Layers,
      href: '/spokes/hr-support',
    },
  ]

  const industries = [
    'Restaurants',
    'Cafes & Boba Shops',
    'Retail',
    'Clinics & Dental',
    'Salons & Spas',
    'Hospitality',
    'Home Services',
    'Logistics',
    'Property Management',
    'Childcare & Tutoring',
  ]

  const exposurePoints = [
    'Meal and rest break handling anomalies',
    'Paystub and recordkeeping system errors',
    'Overtime calculations and off-the-clock work exposure',
    'Contractor vs. employee classification issues',
    'Inconsistent onboarding and frontline manager practices',
    'Weak documentation during discipline and terminations',
  ]

  return (
    <div className="bg-[#0a0a0a] text-zinc-100 min-h-screen">
      {/* 1. Hero Section */}
      <CinematicHero />

      {/* 2. Services Grid */}
      <section className="py-20 border-b border-white/5 bg-[#0a0a0a]" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full">
              Full Services Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 mt-6 tracking-tight">
              Done-for-you California HR Services
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed">
              We design and operationalize compliance systems directly inside your business, giving you large-firm quality without over-engineering your operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="bg-[#111111] border border-white/5 hover:border-indigo-500/30 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between group"
              >
                <div>
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-all shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100 mt-5 group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  Learn More <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Industries Served */}
      <section className="py-20 border-b border-white/5 bg-[#111111]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full">
              Industries Served
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 mt-6 tracking-tight">
              Built for Businesses with Hourly Teams
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {industries.map((industry, index) => (
              <span
                key={index}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/5 hover:border-indigo-500/20 text-xs sm:text-sm font-semibold text-zinc-300 transition-colors"
              >
                {industry}
              </span>
            ))}
          </div>
          <p className="text-center text-xs sm:text-sm text-zinc-500 mt-10 max-w-xl mx-auto leading-relaxed">
            If you run a California business with shift work, hourly staff, manager-made schedules, or contractor questions, CalBizHR is built to step in quickly and do the work with you.
          </p>
        </div>
      </section>

      {/* 4. Common Exposure Points */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full w-fit">
                Common Exposure Points
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
                Where California Small Businesses Get into Trouble
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                California compliance audits prove that standard people processes routinely violate state directives. The most expensive lawsuits and PAGA penalties stem from these areas:
              </p>
              <ul className="flex flex-col gap-3 text-sm">
                {exposurePoints.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-zinc-300">
                    <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 sm:p-10 flex flex-col gap-6 text-left relative">
              <div className="absolute top-4 right-4 text-indigo-500/15">
                <Scale className="h-24 w-24" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100 relative">What CalBizHR Does About It</h3>
              <p className="text-sm text-zinc-400 leading-relaxed relative">
                We identify the highest-friction HR and compliance gaps in your current workforce framework, prioritize what matters most, and help implement functional fixes without over-engineering your operations.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed relative">
                This is practical, owner-friendly HR support for businesses that need real compliance support today.
              </p>
              <div className="pt-2 relative">
                <Link href="/paga-calculator">
                  <Button className="w-full bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-zinc-50 font-bold tracking-wide py-2.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/10">
                    <Calculator className="h-4.5 w-4.5" /> Run Free PAGA Risk Check <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGA Center Hub Tile & Calculator */}
      <section className="py-20 border-b border-white/5 bg-[#111111]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Scale className="h-3.5 w-3.5" /> PAGA Center &amp; Risk Calculator
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight mt-4">
              Private Attorneys General Act (PAGA) Center
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-3xl mx-auto mt-3 leading-relaxed">
              Under California&apos;s Private Attorneys General Act (PAGA), employees can file representative actions for Labor Code violations with penalties compounding per pay period. Under recent statutory reforms, reasonable-steps caps are 15% (pre-notice) and 30% (post-notice cure) under AB 2288/SB 92.
            </p>
          </div>

          <PagaCalculatorComponent compact={true} />
        </div>
      </section>

      {/* 5. Consultation Pricing Card */}
      <section className="py-20 border-b border-white/5 bg-[#111111]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.05)_0%,transparent_50%)] pointer-events-none" />
            <div className="md:col-span-8 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full w-fit">
                Initial Session Offer
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">
                $75 Introductory 30-Minute Consultation
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Let&apos;s review your current HR issue, wage-and-hour question, or policy draft. The entire $75 fee is credited back toward any signature service or ongoing package if you choose to continue working with CalBizHR.
              </p>
            </div>
            <div className="md:col-span-4 bg-[#161616] border border-white/5 rounded-xl p-6 sm:p-8 flex flex-col gap-4 items-center justify-center text-center">
              <span className="text-4xl sm:text-5xl font-black text-cyan-400">$75</span>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">30-Minute Consultation</span>
              <Link href="/book" className="w-full">
                <Button className="w-full bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-zinc-95 font-bold tracking-wide py-3 rounded-lg cursor-pointer">
                  Reserve Your Time
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AI Tools Section */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full w-fit flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> AI Tools
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
                Two AI tools I built and use myself.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                A Strategic Audit Engine that scores your HR practices across the areas that generate the
                most PAGA exposure, and a Policy Architect that drafts a California-specific policy from a
                plain-English description. Both are free to try. Both produce a real draft — never a final
                answer — that should go to an employment attorney before you rely on it.
              </p>
              <Link href="/ai-lab" className="w-fit">
                <Button className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-zinc-50 font-semibold tracking-wide py-3 px-6 rounded-lg cursor-pointer flex items-center gap-2">
                  Try the AI Tools <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="lg:col-span-5 bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 text-left">
              <h3 className="text-lg font-bold text-zinc-100">What&apos;s Actually In There</h3>
              <ul className="flex flex-col gap-3 text-xs sm:text-sm">
                <li className="flex items-center gap-3 text-zinc-400">
                  <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400 shrink-0" /> Strategic Audit Engine — describe your current practices, get a scored breakdown by risk area
                </li>
                <li className="flex items-center gap-3 text-zinc-400">
                  <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400 shrink-0" /> Policy Architect — draft a CA-specific HR policy from a plain-English request
                </li>
                <li className="flex items-center gap-3 text-zinc-400">
                  <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400 shrink-0" /> Every draft is marked clearly as AI-assisted, not attorney-reviewed
                </li>
                <li className="flex items-center gap-3 text-zinc-400">
                  <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400 shrink-0" /> No signup required to try either one
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. About Teaser Section */}
      <section className="py-20 bg-[#111111]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6 text-left lg:order-2">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full w-fit">
                About the Founder
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
                Expert HR, AI-augmented delivery.
              </h2>
              <blockquote className="border-l-2 border-indigo-500 pl-4 py-1 italic text-zinc-300 text-sm sm:text-base leading-relaxed">
                &ldquo;Some kids grew up watching cartoons. I grew up watching my parents build something from nothing. I built CalBizHR so employers like them have somewhere to turn — practical, affordable, expert HR support.&rdquo;
              </blockquote>
              <p className="text-sm text-zinc-400 leading-relaxed">
                CalBizHR was founded by Mario Espindola — MPA, 10-year California public sector HR professional, and AI automation specialist. Watching his parents navigate the challenges of entrepreneurship inspired Mario to provide small businesses with the HR expertise and AI tools they deserve, at prices that actually work.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link href="/about">
                  <Button className="bg-indigo-600 hover:bg-indigo-500 text-zinc-50 font-semibold tracking-wide px-6 py-3">
                    Meet Mario <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
                <Link href="/book">
                  <Button variant="outline" className="border-white/10 hover:border-white/20 bg-transparent text-zinc-300 hover:text-zinc-100 font-semibold px-6 py-3">
                    Book a Consultation
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-5 bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 text-left lg:order-1">
              <h3 className="text-lg font-bold text-zinc-100">Why Mario & CalBizHR</h3>
              <ul className="flex flex-col gap-3.5 text-xs sm:text-sm">
                <li className="flex items-start gap-3 text-zinc-400">
                  <CheckCircle2 className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span><strong>MPA + 10 Years Depth:</strong> Deep California public sector HR & workforce expertise.</span>
                </li>
                <li className="flex items-start gap-3 text-zinc-400">
                  <CheckCircle2 className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span><strong>AI Automation Advantage:</strong> Direct large-firm output at small-business rates.</span>
                </li>
                <li className="flex items-start gap-3 text-zinc-400">
                  <CheckCircle2 className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span><strong>San Gabriel Valley Focus:</strong> On-the-ground support specifically for SGV business owners.</span>
                </li>
                <li className="flex items-start gap-3 text-zinc-400">
                  <CheckCircle2 className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span><strong>Practical Fixes:</strong> Direct operations-level support, not just dry template files.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
