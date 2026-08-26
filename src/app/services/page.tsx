import Link from 'next/link'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { CheckCircle2, ArrowRight, Sparkles, Scale, BookOpen, ShieldAlert, Award, UserCheck, PhoneCall } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services — California HR Compliance Consulting | CalBizHR',
  description: 'Harassment prevention, workplace violence prevention, injury & illness prevention, compliance audits, and ongoing HR support for California small businesses.',
}

interface ServiceItem {
  slug: string
  title: string
  description: string
  href: string
  actionLabel: string
  icon: typeof ShieldAlert
  isPopular?: boolean
  details: string[]
}

const servicesCatalog: ServiceItem[] = [
  {
    slug: 'harassment-prevention',
    title: 'Harassment Prevention (SB 1343)',
    description: 'Compliance-focused harassment prevention training and written policy implementation for California employers.',
    href: '/spokes/safety-prevention/harassment-prevention',
    actionLabel: 'Explore Program',
    icon: Award,
    details: [
      'SB 1343 compliant training delivery for staff (1 hr) and supervisors (2 hrs)',
      'Written anti-harassment and anti-discrimination policy drafting',
      'Complaint intake and investigation procedure setup',
      'Interactive Harassment Prevention Program (HPP) toolkit',
      'Annual recertification and documentation tracking',
    ],
  },
  {
    slug: 'workplace-violence',
    title: 'Workplace Violence Prevention (SB 553)',
    description: 'SB 553 compliant workplace violence prevention plans, hazard assessments, and annual incident response training.',
    href: '/spokes/safety-prevention/workplace-violence',
    actionLabel: 'Explore Program',
    icon: ShieldAlert,
    details: [
      'Written Workplace Violence Prevention Plan (WVPP) development',
      'Workplace hazard identification and risk assessment',
      'Mandatory 4-type Violent Incident Log setup & retention',
      'Staff training and documentation per Cal/OSHA SB 553 requirements',
      'Annual plan review and update process',
    ],
  },
  {
    slug: 'labor-law',
    title: 'Wage-and-Hour Cleanup',
    description: 'Break, overtime, paystub, scheduling, and classification process review aimed at reducing preventable PAGA exposure.',
    href: '/spokes/wage-hour',
    actionLabel: 'Explore Wage & Hour',
    icon: Scale,
    details: [
      'Meal and rest period policy validation (LC §226.7 / §512)',
      'Itemized wage statement compliance audit (LC §226)',
      'Exempt vs. non-exempt duties test & 2x salary threshold audit',
      'Pay transparency disclosures (SB 1162)',
      'Independent contractor ABC classification analysis (LC §2775)',
    ],
  },
  {
    slug: 'onboarding',
    title: 'Hiring & Onboarding Systems',
    description: 'California Wage Theft notices, Form I-9 verification workflows, orientation flows, and statutory new hire packets.',
    href: '/spokes/lifecycle-admin/onboarding',
    actionLabel: 'Explore Onboarding',
    icon: UserCheck,
    details: [
      'California-compliant Labor Code § 2810.5 written wage notice',
      'Federal Form I-9 verification & audit procedures',
      'EDD & CRD mandatory new hire pamphlet distribution',
      'Lactation accommodation & policy disclosure setup',
      'At-will employment offer letter documentation',
    ],
  },
  {
    slug: 'compliance-audit',
    title: 'HR Compliance Audit',
    description: 'Comprehensive analysis of your current HR policies, employee files, and operational practices to identify compliance gaps.',
    href: '/book',
    actionLabel: 'Schedule Audit Call',
    icon: ShieldAlert,
    details: [
      'I-9 audit and verification procedures',
      'Employee file structure & confidential storage review',
      'Wage and hour classification & overtime calculation check',
      'Local municipality ordinance compliance checks',
    ],
  },
  {
    slug: 'handbook',
    title: 'Handbooks & Policies',
    description: 'Handbook updates, policy cleanup, notices, forms, and practical documentation built for California small-business reality.',
    href: '/book',
    actionLabel: 'Request Handbook Review',
    icon: BookOpen,
    details: [
      'Custom California at-will employment clauses',
      'State-mandated anti-harassment, CFRA leave, and sick leave incorporation',
      'Custom company standards and expectations guidelines',
      'Annual regulatory update subscription option',
    ],
  },
  {
    slug: 'manager-support',
    title: 'Manager Coaching & Support',
    description: 'Hands-on help with employee issues, write-ups, internal investigations, terminations, and day-to-day people problems.',
    href: '/book',
    actionLabel: 'Book Manager Support',
    icon: PhoneCall,
    details: [
      'Employee corrective action documentation and write-ups',
      'Internal investigation process design and coaching',
      'Termination checklist & LC §§201-203 final pay timing compliance',
      'Day-to-day people problem escalation support',
    ],
  },
  {
    slug: 'ai-services',
    title: 'AI-Powered HR Consulting',
    description: 'Leveraging cutting-edge AI tools to streamline policy drafting, compliance checking, and question resolution.',
    href: '/ai-lab',
    actionLabel: 'Access AI Lab',
    icon: Sparkles,
    isPopular: true,
    details: [
      'Instant interactive California compliance checker',
      'AI policy draft templates custom-tailored in real-time',
      'Automated job description and onboarding content generation',
      'Affordable operations-level consulting rates',
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="flex-grow bg-[#1A2D4D] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb className="mb-8" />
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-3.5 py-1.5 rounded-full">
            Comprehensive Compliance
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mt-6">
            CalBizHR Solutions Catalog
          </h1>
          <p className="text-sm sm:text-base font-sans text-zinc-300 mt-4 max-w-xl mx-auto leading-relaxed">
            Done-for-you, highly practical operations-level support built specifically for California small business owners who manage shift and hourly workforce teams.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {servicesCatalog.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.slug}
                className="bg-[#0f1c32] border border-[#B5933C]/20 hover:border-[#B5933C]/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 border-b border-[#B5933C]/20 pb-5">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-[#B5933C]/10 border border-[#B5933C]/30 flex items-center justify-center text-[#B5933C] shrink-0">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-xl font-serif font-bold text-white group-hover:text-[#B5933C] transition-colors">
                        {service.title}
                      </h2>
                    </div>
                    {service.isPopular && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#B5933C]/20 border border-[#B5933C]/40 text-[10px] font-mono font-bold text-[#B5933C] tracking-wide uppercase shrink-0">
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs sm:text-sm font-sans text-zinc-300 mt-4 leading-relaxed font-medium">
                    {service.description}
                  </p>

                  <div className="mt-6">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] mb-3">Key Deliverables:</h3>
                    <ul className="flex flex-col gap-2.5 text-xs sm:text-sm font-sans">
                      {service.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-zinc-200">
                          <CheckCircle2 className="h-4.5 w-4.5 text-[#B5933C] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#B5933C]/20">
                  <Link href={service.href}>
                    <Button className="w-full bg-[#1A2D4D] hover:bg-[#1A2D4D]/80 text-[#B5933C] border border-[#B5933C]/30 font-sans font-bold tracking-wide py-2.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all">
                      {service.actionLabel} <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Closing Pricing / Retainer CTA */}
        <div className="bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl p-8 sm:p-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="flex flex-col gap-3 max-w-xl">
            <h2 className="text-2xl font-serif font-bold text-white tracking-tight">Need On-Demand Support?</h2>
            <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed">
              We offer customizable ongoing fractional HR consulting and policy update subscriptions starting at small-business rates. No long-term locks required.
            </p>
          </div>
          <Link href="/book" className="w-full md:w-auto shrink-0">
            <Button className="w-full md:w-auto bg-[#B5933C] hover:bg-[#d4b45a] text-[#1A2D4D] font-sans font-bold tracking-wide py-3 px-8 rounded-lg cursor-pointer transition-colors">
              Consult with Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
