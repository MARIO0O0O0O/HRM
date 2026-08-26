import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Home, UserCheck, ArrowRight, Wrench } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Employee Lifecycle Admin | CalBizHR',
  description: 'California Category 3 Hub: Onboarding & Wage Theft Notices (LC §2810.5), CFRA/ADA Protected Leaves, and Terminations & Final Pay (LC §§201-203).',
}

const programs = [
  {
    id: 'onboarding',
    title: 'Hiring & Onboarding (LC §2810.5)',
    href: '/spokes/lifecycle-admin/onboarding',
    citation: 'Labor Code § 2810.5',
    description: 'Mandatory written Wage Theft Prevention notices at hire, Form I-9 verification compliance, and statutory new hire pamphlet distribution.',
  },
  {
    id: 'leaves',
    title: 'Protected Leaves & Accommodations',
    href: '/spokes/lifecycle-admin/leaves',
    citation: 'CFRA / ADA / FEHA',
    description: 'California Family Rights Act (CFRA) job-protected leave, ADA interactive accommodation process SOPs, and disability leave management.',
  },
  {
    id: 'terminations',
    title: 'Terminations & Final Pay (LC §§201–203)',
    href: '/spokes/lifecycle-admin/terminations',
    citation: 'Labor Code §§ 201–203',
    description: 'Immediate final wage payment timelines upon involuntary discharge, voluntary quit rules, accrued PTO payout, and separation documentation.',
  },
]

const tools = [
  {
    title: 'Mandatory Workplace Postings',
    href: '/tools/mandatory-postings',
    description: 'Review statutory California and federal workplace posting and notice obligations.',
  },
  {
    title: 'Job Classification Guide',
    href: '/tools/job-classification',
    description: 'Evaluate job descriptions, exempt status criteria, and independent contractor compliance.',
  },
]

export default function LifecycleAdminHubPage() {
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
            <UserCheck className="h-7 w-7 text-[#B5933C]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-3 py-1 rounded-full">
              Category 3 Hub • Level 2
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Employee Lifecycle Admin
          </h1>
          <p className="text-lg font-sans text-zinc-300 max-w-3xl leading-relaxed">
            Managing the employment lifecycle in California requires strict adherence to statutory notice requirements at hire, compliant leave administration, and precise final pay processing upon separation.
          </p>
        </div>

        {/* Category Law Overview */}
        <div className="p-6 sm:p-8 bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl space-y-4 text-zinc-300 font-sans text-sm sm:text-base leading-relaxed">
          <h2 className="text-xl font-serif font-bold text-white mb-2">
            Statutory Legal Framework
          </h2>
          <p>
            Under <strong className="text-[#B5933C]">Labor Code § 2810.5</strong>, California employers must provide non-exempt new hires with written Wage Theft Prevention notices detailing pay rates, allowances, regular paydays, employer legal names, and workers&apos; compensation insurance details.
          </p>
          <p>
            For protected leaves and accommodations, the <strong className="text-[#B5933C]">California Family Rights Act (CFRA)</strong> and the <strong className="text-[#B5933C]">Americans with Disabilities Act (ADA / FEHA)</strong> govern job-protected leave rights, medical certifications, and good-faith interactive process obligations for California employers.
          </p>
          <p>
            Upon employee separation, <strong className="text-[#B5933C]">Labor Code §§ 201–203</strong> mandate immediate final wage payment upon discharge (or within 72 hours for voluntary quit), including all earned wages and accrued unused vacation/PTO.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
