import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Home, DollarSign, ArrowRight, Wrench } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Wage & Hour Compliance | CalBizHR',
  description: 'California Category 2 Hub: Itemized Wage Statements (LC §226), Pay Transparency (SB 1162), Meal & Rest Breaks, and Timekeeping Classification.',
}

const programs = [
  {
    id: 'paystubs-wage-statements',
    title: 'Paystubs & Wage Statements (LC §226)',
    href: '/spokes/wage-hour/paystubs-wage-statements',
    citation: 'Labor Code § 226 / SB 1162',
    description: 'Mandatory itemized wage statement requirements, hourly rate itemizations, and pay scale transparency disclosures.',
  },
  {
    id: 'meal-rest-breaks',
    title: 'Meal & Rest Breaks (LC §226.7 / §512)',
    href: '/spokes/wage-hour/meal-rest-breaks',
    citation: 'Labor Code § 226.7 & § 512',
    description: 'Statutory 30-minute meal break timing rules, 10-minute rest period requirements, and premium pay compliance.',
  },
  {
    id: 'timekeeping-classification',
    title: 'Timekeeping & Classification',
    href: '/spokes/wage-hour/timekeeping-classification',
    citation: 'Labor Code Exemption Rules',
    description: 'Exempt vs. non-exempt duties tests, California minimum salary thresholds, off-the-clock work controls, and overtime math.',
  },
]

const tools = [
  {
    title: 'Employee Threshold Checker',
    href: '/tools/threshold-checker',
    description: 'Determine statutory compliance obligations based on your California headcount.',
  },
  {
    title: 'Compliance Diagnostic Quiz',
    href: '/tools/compliance-quiz',
    description: 'Interactive self-assessment to identify high-risk wage and hour exposure areas.',
  },
]

export default function WageHourHubPage() {
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
            <DollarSign className="h-7 w-7 text-[#B5933C]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-3 py-1 rounded-full">
              Category 2 Hub • Level 2
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Wage & Hour Compliance
          </h1>
          <p className="text-lg font-sans text-zinc-300 max-w-3xl leading-relaxed">
            California wage and hour laws enforce strict technical standards for employee compensation, time tracking, meal and rest breaks, and pay stub itemizations. Maintaining systematic compliance is essential for ongoing business operations.
          </p>
        </div>

        {/* Hero Banner Image */}
        <div className="relative w-full aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden border border-[#B5933C]/30 shadow-2xl">
          <Image
            src="/images/wage_hour_banner.jpg"
            alt="California Wage & Hour Labor Code Compliance Banner"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Category Law Overview (Authoritative Statutory Text) */}
        <div className="p-6 sm:p-8 bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl space-y-4 text-zinc-300 font-sans text-sm sm:text-base leading-relaxed">
          <h2 className="text-xl font-serif font-bold text-white mb-2">
            Statutory Legal Framework
          </h2>
          <p>
            Under <strong className="text-[#B5933C]">Labor Code § 226</strong>, California employers must provide employees with accurate, itemized written wage statements showing gross wages, total hours worked, all applicable hourly rates, and legal employer identifiers.
          </p>
          <p>
            Additionally, under <strong className="text-[#B5933C]">Senate Bill 1162</strong> (Pay Transparency), pay scale transparency requirements are integrated into California wage administration, mandating clear disclosures and job posting wage range information.
          </p>
          <p>
            Employers must also comply with strict California Labor Code rules governing timely meal and rest breaks, accurate timekeeping practices, and correct employee exemption classifications.
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
                  <span className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-2.5 py-0.5 rounded-full">
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
