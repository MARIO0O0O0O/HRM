import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import {
  Shield,
  AlertTriangle,
  HardHat,
  BookOpen,
  DollarSign,
  Calendar,
  HeartHandshake,
  UserPlus,
  UserCheck,
  Briefcase,
  UserX,
  Gift,
  Sparkles,
  Cpu,
  Users,
  ArrowRight,
  Clock,
} from 'lucide-react'

const programs = [
  {
    slug: 'harassment-prevention',
    code: 'HPP',
    title: 'Harassment Prevention Program',
    lawRef: 'SB 1343',
    description: "Policy, training, and forms required under California's mandatory harassment prevention training law.",
    icon: Shield,
    live: true,
  },
  {
    slug: 'workplace-violence-prevention',
    code: 'WVPP',
    title: 'Workplace Violence Prevention',
    lawRef: 'SB 553',
    description: 'Written plan, hazard assessments, and annual training required for nearly all California employers.',
    icon: AlertTriangle,
    live: true,
  },
  {
    slug: 'injury-illness-prevention',
    code: 'IIPP',
    title: 'Injury & Illness Prevention',
    lawRef: 'Cal/OSHA',
    description: 'The foundational safety program required for every California employer, regardless of size.',
    icon: HardHat,
    live: true,
  },
  {
    slug: 'know-your-rights',
    code: 'KYR',
    title: 'Know Your Rights',
    lawRef: 'SB 294',
    description: "Annual standalone notice covering workers' comp, immigration rights, and emergency contact designation.",
    icon: BookOpen,
    live: false,
  },
  {
    slug: 'wage-and-hour',
    code: 'WAGE',
    title: 'Wage & Hour',
    lawRef: 'Cal. Lab. Code',
    description: 'Overtime rules, meal & rest break compliance, paystub requirements, and IWC Wage Order rules.',
    icon: DollarSign,
    live: false,
  },
  {
    slug: 'leave-administration',
    code: 'LEAVE',
    title: 'Leave Administration',
    lawRef: 'CFRA / FMLA / PDL',
    description: 'California Family Rights Act, Pregnancy Disability Leave, paid sick leave (SB 616), and bereavement leave.',
    icon: Calendar,
    live: false,
  },
  {
    slug: 'ada-accommodation',
    code: 'ADA',
    title: 'ADA / Reasonable Accommodation',
    lawRef: 'FEHA / ADA',
    description: 'Timely good-faith interactive process, reasonable accommodation documentation, and disability rights.',
    icon: HeartHandshake,
    live: false,
  },
  {
    slug: 'recruitment-selection',
    code: 'RECRUIT',
    title: 'Recruitment & Selection',
    lawRef: 'FEHA / Ban the Box',
    description: 'Compliant job postings, pay transparency (SB 1162), Ban the Box criminal history rules, and applicant privacy.',
    icon: UserPlus,
    live: false,
  },
  {
    slug: 'onboarding',
    code: 'ONBOARD',
    title: 'Onboarding',
    lawRef: 'CA New Hire Notices',
    description: 'Mandatory new-hire packet distribution, Form I-9 verification, wage theft notices, and emergency contacts.',
    icon: UserCheck,
    live: false,
  },
  {
    slug: 'employment-practices',
    code: 'EMP',
    title: 'Employment Practices',
    lawRef: 'CA Labor Code',
    description: 'Employee handbook policies, workplace conduct rules, performance documentation, and manager guidelines.',
    icon: Briefcase,
    live: false,
  },
  {
    slug: 'termination-offboarding',
    code: 'TERM',
    title: 'Termination & Offboarding',
    lawRef: 'Lab. Code §§ 201-203',
    description: 'Immediate final paycheck rules, accrued PTO payout, separation agreements, and COBRA/Cal-COBRA notices.',
    icon: UserX,
    live: false,
  },
  {
    slug: 'employee-benefits',
    code: 'BENEFITS',
    title: 'Employee Benefits',
    lawRef: 'CA EDD / CalSavers',
    description: 'State Disability Insurance (SDI), Paid Family Leave (PFL) integration, and CalSavers mandatory retirement.',
    icon: Gift,
    live: false,
  },
  {
    slug: 'ai-in-workplace',
    code: 'AI-WORK',
    title: 'AI in the Workplace',
    lawRef: 'AB 1018 / FEHA ADMT',
    description: 'Automated decision-making tool disclosure, candidate notice, bias audit rules, and AI workplace guidelines.',
    icon: Sparkles,
    live: false,
  },
  {
    slug: 'hris-systems',
    code: 'HRIS',
    title: 'HRIS & Tech Systems',
    lawRef: 'Cal. Consumer Privacy Act',
    description: 'Employee data privacy (CPRA), digital personnel file retention, and HR tech vendor compliance.',
    icon: Cpu,
    live: false,
  },
  {
    slug: 'unions-collective-bargaining',
    code: 'UNION',
    title: 'Unions & Collective Bargaining',
    lawRef: 'ALRA / NLRA',
    description: 'California labor relations, union organizing rights, union access rules, and collective bargaining compliance.',
    icon: Users,
    live: false,
  },
]

export default function ProgramsIndexPage() {
  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb className="mb-8" />

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full">
            Compliance Programs Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-100 mt-6">
            Every California Compliance Program, Broken Down
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed">
            Each program below represents a California workforce compliance area. Live programs feature full interactive hub pages; coming-soon spokes outline upcoming compliance toolkits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {programs.map((p) => {
            const cardContent = (
              <>
                <div className="flex items-start justify-between">
                  <div className="h-11 w-11 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                    <p.icon className="h-5 w-5" />
                  </div>
                  {p.live ? (
                    <ArrowRight className="h-4 w-4 text-zinc-700 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all mt-2" />
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full">
                      <Clock className="h-3 w-3" /> Soon
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-xs font-mono text-zinc-600 mb-1">{p.lawRef}</p>
                  <h3 className="font-bold text-lg text-zinc-100 group-hover:text-white transition-colors">{p.title}</h3>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">{p.description}</p>
                </div>
              </>
            )

            return p.live ? (
              <Link
                key={p.slug}
                href={`/programs/${p.slug}`}
                className="group bg-[#111111] border border-white/10 hover:border-indigo-500/30 rounded-2xl p-6 flex flex-col gap-4 transition-all"
              >
                {cardContent}
              </Link>
            ) : (
              <div
                key={p.slug}
                className="group bg-[#111111] border border-white/5 opacity-60 rounded-2xl p-6 flex flex-col gap-4 select-none"
              >
                {cardContent}
              </div>
            )
          })}
        </div>
        <LegalDisclaimer />
      </div>
    </div>
  )
}
