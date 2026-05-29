import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ShieldCheck,
  FileText,
  Users,
  GraduationCap,
  Scale,
  DollarSign,
  UserCheck,
  Phone,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
  MapPin
} from 'lucide-react'

export default function Home() {
  const services = [
    {
      title: 'HR Risk Reviews',
      description: 'Focused reviews of wage-and-hour practices, onboarding, employee files, handbook language, and frontline manager habits.',
      icon: ShieldCheck,
    },
    {
      title: 'Handbooks and Policies',
      description: 'Handbook updates, policy cleanup, notices, forms, and practical documentation built for California small-business reality.',
      icon: FileText,
    },
    {
      title: 'Manager Support',
      description: 'Help with employee issues, write-ups, investigations, terminations, onboarding process design, and day-to-day people problems.',
      icon: Users,
    },
    {
      title: 'Harassment Prevention',
      description: 'Compliance-focused harassment prevention training and policy implementation for California employers and their teams.',
      icon: GraduationCap,
    },
    {
      title: 'Workplace Violence Prevention',
      description: 'SB 553 compliant workplace violence prevention plans, hazard assessments, and incident response training.',
      icon: Scale,
    },
    {
      title: 'Wage-and-Hour Cleanup',
      description: 'Break, overtime, paystub, scheduling, and classification process review aimed at reducing preventable exposure.',
      icon: DollarSign,
    },
    {
      title: 'Onboarding Systems',
      description: 'Offer letters, checklists, orientation flow, new-hire packets, and role clarity for growing teams.',
      icon: UserCheck,
    },
    {
      title: 'Ongoing HR Support',
      description: 'Fractional, project-based, or on-call support for employers who need HR help without hiring full-time HR staff.',
      icon: Layers,
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
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 w-fit">
                <MapPin className="h-3 w-3" /> California Labor Law Compliance
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                Done-for-you HR and AI services for California small businesses.
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">
                BizHR helps employers in the San Gabriel Valley clean up HR, wage-and-hour, and compliance gaps — and implement AI tools that give small businesses the output of a large firm.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Link href="/book">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 active:from-indigo-700 text-zinc-50 font-bold tracking-wide py-6 px-8 rounded-xl shadow-xl shadow-indigo-600/20 transition-all cursor-pointer">
                    Book a $75 Consultation
                  </Button>
                </Link>
                <a href="tel:6269996239" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto border-white/10 hover:border-white/20 bg-zinc-900/50 hover:bg-zinc-800/80 active:bg-zinc-900 text-zinc-300 hover:text-zinc-100 font-semibold tracking-wide py-6 px-8 rounded-xl flex items-center justify-center gap-2 cursor-pointer">
                    <Phone className="h-4 w-4" /> Call 626-999-6239
                  </Button>
                </a>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs font-medium text-zinc-500 border-t border-white/5 pt-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" /> $75 initial consultation — 30 minutes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" /> Fee credited toward ongoing services
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" /> Practical, California-tailored fixes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" /> Hands-on implementation & delivery
                </li>
              </ul>
            </div>
            
            {/* Quick Access Card */}
            <div className="lg:col-span-5 relative w-full max-w-md mx-auto">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl opacity-20 blur-sm pointer-events-none" />
              <div className="relative bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-extrabold text-zinc-100">Quick Access</h2>
                  <p className="text-xs text-zinc-500 mt-1">Direct contact and peer-to-peer options</p>
                </div>
                <div className="flex flex-col gap-4 text-sm">
                  <div className="bg-[#161616] border border-white/5 rounded-xl p-4">
                    <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider block">Phone & SMS</span>
                    <a href="tel:6269996239" className="text-base font-bold text-zinc-100 hover:text-indigo-400 transition-colors mt-1 block">
                      626-999-6239
                    </a>
                  </div>
                  <div className="bg-[#161616] border border-white/5 rounded-xl p-4">
                    <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider block">Direct Email</span>
                    <a href="mailto:mario_espindola@outlook.com" className="text-base font-bold text-zinc-100 hover:text-indigo-400 transition-colors mt-1 block select-all">
                      mario_espindola@outlook.com
                    </a>
                  </div>
                  <div className="bg-[#161616] border border-white/5 rounded-xl p-4 flex flex-col gap-2">
                    <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider block">Peer-to-Peer Handles</span>
                    <div className="flex flex-col gap-1.5 text-xs font-medium text-zinc-400">
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>Zelle</span>
                        <span className="font-bold text-zinc-200">626-999-6239</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>Venmo</span>
                        <span className="font-bold text-zinc-200">@marioo00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cash App</span>
                        <span className="font-bold text-zinc-200">$10mario01</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <div
                key={index}
                className="bg-[#111111] border border-white/5 hover:border-indigo-500/20 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between group"
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
              </div>
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
            If you run a California business with shift work, hourly staff, manager-made schedules, or contractor questions, BizHR is built to step in quickly and do the work with you.
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
              <h3 className="text-xl font-bold text-zinc-100 relative">What BizHR Does About It</h3>
              <p className="text-sm text-zinc-400 leading-relaxed relative">
                We identify the highest-friction HR and compliance gaps in your current workforce framework, prioritize what matters most, and help implement functional fixes without over-engineering your operations.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed relative">
                This is practical, owner-friendly HR support for businesses that need real compliance support today.
              </p>
            </div>
          </div>
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
                Let&apos;s review your current HR issue, wage-and-hour question, or policy draft. The entire $75 fee is credited back toward any signature service or ongoing package if you choose to continue working with BizHR.
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

      {/* 6. AI Services Preview Section */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full w-fit flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> AI Implementation
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
                Give your small business the AI edge.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                BizHR helps California small businesses implement simple, highly effective AI tools that automate HR workflows, hiring, documentation, operations, and administrative tasks. These are the exact same automations that allow BizHR to deliver large-firm caliber consulting at small-business pricing.
              </p>
              <Link href="/services" className="w-fit">
                <Button className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-zinc-50 font-semibold tracking-wide py-3 px-6 rounded-lg cursor-pointer flex items-center gap-2">
                  Explore AI Services <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="lg:col-span-5 bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 text-left">
              <h3 className="text-lg font-bold text-zinc-100">What We Automate</h3>
              <ul className="flex flex-col gap-3 text-xs sm:text-sm">
                <li className="flex items-center gap-3 text-zinc-400">
                  <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400 shrink-0" /> HR onboarding & initial documentation
                </li>
                <li className="flex items-center gap-3 text-zinc-400">
                  <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400 shrink-0" /> Auto-scheduling & time tracking workflows
                </li>
                <li className="flex items-center gap-3 text-zinc-400">
                  <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400 shrink-0" /> AI-assisted hiring & candidate screeners
                </li>
                <li className="flex items-center gap-3 text-zinc-400">
                  <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400 shrink-0" /> Dynamic policy & custom handbook drafts
                </li>
                <li className="flex items-center gap-3 text-zinc-400">
                  <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400 shrink-0" /> Customer support chatbots & auto-response
                </li>
                <li className="flex items-center gap-3 text-zinc-400">
                  <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400 shrink-0" /> Routine invoicing & reporting automations
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
                &ldquo;I grew up watching family members build businesses while struggling with the labor compliance issues that come with growth. I built BizHR so employers like them have somewhere to turn — practical, affordable, expert HR support.&rdquo;
              </blockquote>
              <p className="text-sm text-zinc-400 leading-relaxed">
                BizHR was founded by Mario Espindola — MPA, 10-year California public sector HR professional, and AI automation specialist. Mario grew up in a family of entrepreneurs and watched labor compliance challenges limit their growth. BizHR exists to give small businesses the HR expertise and AI tools they deserve, at prices that actually work.
              </p>
            </div>
            
            <div className="lg:col-span-5 bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 text-left lg:order-1">
              <h3 className="text-lg font-bold text-zinc-100">Why Mario & BizHR</h3>
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
