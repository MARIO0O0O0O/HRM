'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  DollarSign,
  UserCheck,
  ChevronDown,
  ChevronRight,
  FileText,
  Layers,
  PanelLeft,
  ExternalLink,
  Info
} from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import HubModal from '@/components/hub/HubModal'

export interface SpokeMandateItem {
  id: string
  title: string
  lawRef?: string
  description: string
  content: string
  actionLabel?: string
  actionHref?: string
}

export interface ComplianceArea {
  id: string
  title: string
  lawRef: string
  mandates: SpokeMandateItem[]
}

export interface SpokeCard {
  id: string
  title: string
  accentColor: 'emerald' | 'cyan' | 'purple'
  badge: string
  description: string
  icon: typeof ShieldCheck
  areas: ComplianceArea[]
}

export const spokesCardsData: SpokeCard[] = [
  {
    id: 'workplace-safety-prevention',
    title: 'Workplace Safety & Prevention',
    accentColor: 'emerald',
    badge: '3 Compliance Areas',
    description: 'Cal/OSHA IIPP, SB 553 Workplace Violence, and SB 1343 Harassment Prevention mandates.',
    icon: ShieldCheck,
    areas: [
      {
        id: 'sb1343-hpp',
        title: 'Harassment Prevention Program (SB 1343 / FEHA)',
        lawRef: 'Gov. Code § 12950.1',
        mandates: [
          {
            id: 'hpp-training-cycles',
            title: 'Mandatory Training Cycles',
            lawRef: 'Gov. Code § 12950.1(a)',
            description: '1-hour non-supervisory and 2-hour supervisory training within 6 months of hire & every 2 years.',
            content: 'Employers with 5+ employees must provide mandatory interactive sexual harassment prevention training. Non-supervisory employees require 1 hour; supervisors require 2 hours within 6 months of hire/promotion and biennially thereafter.',
            actionLabel: 'Explore HPP Program',
            actionHref: '/programs/harassment-prevention'
          },
          {
            id: 'hpp-complaint-procedures',
            title: 'Complaint & Investigation Procedures',
            lawRef: '2 CCR § 11023',
            description: 'Written anti-harassment policy, impartial complaint intake, and CRD reporting guidelines.',
            content: 'Written policy specifying multiple impartial reporting avenues, prompt investigation workflows, corrective disciplinary action, and statutory protection against unlawful retaliation under FEHA.',
            actionLabel: 'Access Policy Templates',
            actionHref: '/programs/harassment-prevention/policy-templates'
          },
          {
            id: 'hpp-annual-distribution',
            title: 'Annual Policy Distribution',
            lawRef: 'Gov. Code § 12950',
            description: 'Distribution of CRD-184 fact sheet, workplace posting, and policy acknowledgments.',
            content: 'Mandatory distribution of the DFEH-184 / CRD Harassment Information Sheet to all employees upon hire, alongside annual distribution of the employer written anti-harassment policy.',
            actionLabel: 'Get HPP DIY Toolkit ($149)',
            actionHref: '/tools/hpp'
          }
        ]
      },
      {
        id: 'sb553-wvpp',
        title: 'Workplace Violence Prevention (SB 553 / LC §6401.9)',
        lawRef: 'Labor Code § 6401.9',
        mandates: [
          {
            id: 'wvpp-site-specific-plan',
            title: 'Written Site-Specific WVPP',
            lawRef: 'Labor Code § 6401.9(c)',
            description: 'Custom site-tailored written plan covering hazard assessments, emergency SOPs, and anti-retaliation.',
            content: 'California employers with 1+ employees must establish and maintain an effective written Workplace Violence Prevention Plan tailored to specific worksite hazards, designated responsible managers, and threat reporting procedures.',
            actionLabel: 'Explore WVPP Program',
            actionHref: '/programs/workplace-violence-prevention'
          },
          {
            id: 'wvpp-incident-logging',
            title: 'Violent Incident Logging',
            lawRef: 'Labor Code § 6401.9(f)',
            description: '5-year statutory recordkeeping log for recording all violent incidents and investigations.',
            content: 'Detailed logging of every workplace violence incident, threat, physical force, or weapon exposure. Logs must be maintained for at least 5 years and exclude personal identifying employee health information.',
            actionLabel: 'Get WVPP Toolkit ($199)',
            actionHref: '/tools/wvpp'
          },
          {
            id: 'wvpp-staff-training',
            title: 'Interactive Staff Training',
            lawRef: 'Labor Code § 6401.9(e)',
            description: 'Annual interactive employee training on plan access, hazard identification, and emergency SOPs.',
            content: 'Annual interactive training tailored to workplace hazards, covering how to report violent incidents, emergency alarm responses, escape routes, and non-retaliation rights.',
            actionLabel: 'Get WVPP Toolkit ($199)',
            actionHref: '/tools/wvpp'
          }
        ]
      },
      {
        id: 'cal-osha-iipp',
        title: 'Cal/OSHA & Safety (Title 8 CCR §3203)',
        lawRef: '8 CCR § 3203',
        mandates: [
          {
            id: 'iipp-core-plan',
            title: 'Injury & Illness Prevention (IIPP)',
            lawRef: '8 CCR § 3203(a)',
            description: 'The 8 mandatory elements required in every California employer safety plan.',
            content: 'Every California employer must establish a written Injury & Illness Prevention Program covering management commitment, compliance systems, communication, hazard identification, incident investigation, hazard correction, and training.',
            actionLabel: 'Explore IIPP Program',
            actionHref: '/programs/injury-illness-prevention'
          },
          {
            id: 'iipp-heat-illness',
            title: 'Indoor/Outdoor Heat Illness',
            lawRef: '8 CCR § 3395 / § 3396',
            description: 'Heat illness prevention procedures, shade access at 80°F, high-heat SOPs at 95°F, and water.',
            content: 'Mandatory heat illness prevention procedures covering potable water supply, shade access, 5-minute cool-down rest periods, high-heat procedures, acclimatization, and emergency response.',
            actionLabel: 'Get IIPP Toolkit ($199)',
            actionHref: '/tools/iipp'
          },
          {
            id: 'iipp-hazard-inspections',
            title: 'Hazard Inspection Records',
            lawRef: '8 CCR § 3203(b)',
            description: 'Scheduled and periodic worksite hazard evaluations and corrective action records.',
            content: 'Documentation of scheduled worksite safety inspections, identified hazards, corrective actions taken, and employee safety committee meeting minutes retained for statutory audit inspection.',
            actionLabel: 'Get IIPP Toolkit ($199)',
            actionHref: '/tools/iipp'
          }
        ]
      }
    ]
  },
  {
    id: 'wage-hour-defense',
    title: 'Wage & Hour Defense',
    accentColor: 'cyan',
    badge: '3 Compliance Areas',
    description: 'Paystub LC §226 itemizations, Meal & Rest break exposure, and Overtime classification.',
    icon: DollarSign,
    areas: [
      {
        id: 'paystubs-lc226',
        title: 'Paystubs & Wage Statements (LC §226)',
        lawRef: 'Labor Code § 226',
        mandates: [
          {
            id: 'paystub-9-itemizations',
            title: '9 Statutory Itemizations',
            lawRef: 'Labor Code § 226(a)',
            description: 'The 9 mandatory items on every California paystub to prevent $100/pay period PAGA penalties.',
            content: 'Must explicitly list: (1) Gross wages, (2) Total hours worked, (3) Piece rate units, (4) All deductions, (5) Net wages, (6) Pay period start/end dates, (7) Employee name & last 4 SSN, (8) Employer legal name & address, (9) All applicable hourly rates and hours worked at each rate.',
            actionLabel: 'Explore Wage Statements',
            actionHref: '/programs/wage-and-hour/wage-statements'
          },
          {
            id: 'paystub-60day-cure',
            title: '60-Day PAGA Statutory Cure',
            lawRef: 'Labor Code § 2699(d) (AB 2288)',
            description: 'AB 2288 reformed PAGA cure rules allowing 60 days to fix wage statement technical errors.',
            content: 'Under AB 2288 PAGA reform, employers who receive a PAGA notice for wage statement technical errors can cure itemization mistakes within 60 days to cap civil penalties at 15% or 30%.',
            actionLabel: 'Calculate PAGA Exposure',
            actionHref: '/paga-calculator'
          },
          {
            id: 'paystub-bonus-calc',
            title: 'Non-Discretionary Bonus Calculations',
            lawRef: 'Labor Code § 510 / DLSE Manual',
            description: 'Regular rate of pay adjustments required when non-discretionary bonuses are earned.',
            content: 'Non-discretionary bonuses (production, attendance, retention) must be factored into the employee’s regular rate of pay, requiring retroactive overtime premium calculations for overtime worked during the bonus period.',
            actionLabel: 'Book Exposure Audit',
            actionHref: '/book'
          }
        ]
      },
      {
        id: 'meal-rest-periods',
        title: 'Meal & Rest Periods (LC §226.7 / §512)',
        lawRef: 'Labor Code §§ 226.7, 512',
        mandates: [
          {
            id: 'meal-30min-scheduling',
            title: '30-Minute Meal Scheduling',
            lawRef: 'Labor Code § 512(a)',
            description: 'First 30-minute uninterrupted break before end of 5th hour; 2nd break before 10th hour.',
            content: 'First meal break must commence no later than the end of the 5th hour of work. A second 30-minute meal break is required for shifts over 10 hours. Meal waivers are strictly limited and must be in writing.',
            actionLabel: 'Explore Break Compliance',
            actionHref: '/programs/wage-and-hour/meal-and-rest-breaks'
          },
          {
            id: 'rest-10min-intervals',
            title: '10-Minute Rest Break Intervals',
            lawRef: 'IWC Wage Orders / § 226.7',
            description: '10 net minutes of paid rest for every 4 hours worked or major fraction thereof.',
            content: 'Rest breaks must be 10 net minutes for every 4 hours worked. Rest breaks are paid time and must be provided in the middle of each work period insofar as practicable.',
            actionLabel: 'Explore Break Compliance',
            actionHref: '/programs/wage-and-hour/meal-and-rest-breaks'
          },
          {
            id: 'premium-pay-records',
            title: '1-Hour Premium Pay Records',
            lawRef: 'Labor Code § 226.7(c)',
            description: '1 additional hour of pay at regular rate for each workday a compliant break is not provided.',
            content: 'Failure to provide a compliant meal or rest break triggers a statutory penalty of 1 additional hour of pay at the employee regular rate of pay for each workday the break was denied.',
            actionLabel: 'Book Exposure Audit',
            actionHref: '/book'
          }
        ]
      },
      {
        id: 'timekeeping-classification',
        title: 'Timekeeping & Classification (IWC Orders)',
        lawRef: 'IWC Wage Orders / LC § 510',
        mandates: [
          {
            id: 'overtime-standards',
            title: 'Daily/Weekly Overtime Standards',
            lawRef: 'Labor Code § 510(a)',
            description: '1.5x pay over 8 hrs/day or 40 hrs/week; 2.0x pay over 12 hrs/day or 7th consecutive day.',
            content: 'California requires 1.5x regular rate for hours over 8 up to 12 in a workday, and for the first 8 hours on the 7th consecutive day. Requires 2.0x pay for hours over 12 in a workday or over 8 on the 7th consecutive day.',
            actionLabel: 'Explore Overtime Rules',
            actionHref: '/programs/wage-and-hour/overtime-misclassification'
          },
          {
            id: 'exempt-salary-thresholds',
            title: 'Exempt Salary Thresholds',
            lawRef: 'Labor Code § 515(a)',
            description: '2x state minimum wage for full-time executive, administrative, and professional exemptions.',
            content: 'To qualify for exempt status in California, employees must earn a monthly salary equivalent to at least twice the state minimum wage for full-time employment (40 hours/week), in addition to meeting strict duties tests.',
            actionLabel: 'Explore Classification',
            actionHref: '/programs/wage-and-hour/overtime-misclassification'
          },
          {
            id: 'off-the-clock-exposure',
            title: 'Off-the-Clock Exposure Controls',
            lawRef: 'Labor Code § 1194',
            description: 'Strict prohibition on unpaid pre/post shift duties, timecard rounding, and off-shift messages.',
            content: 'Employers must pay for all time the employee is under the control of the employer, including donning/doffing gear, security checks, and answering work communications after hours.',
            actionLabel: 'Book Exposure Audit',
            actionHref: '/book'
          }
        ]
      }
    ]
  },
  {
    id: 'employee-lifecycle-relations',
    title: 'Employee Lifecycle & Relations',
    accentColor: 'purple',
    badge: '3 Compliance Areas',
    description: 'Onboarding LC §2810.5 notices, SB 616 Paid Sick Leave, CFRA/ADA, and LC §§201-203 terminations.',
    icon: UserCheck,
    areas: [
      {
        id: 'hiring-onboarding',
        title: 'Hiring & Onboarding (LC §2810.5)',
        lawRef: 'Labor Code § 2810.5',
        mandates: [
          {
            id: 'wage-theft-notice',
            title: 'Wage Theft Prevention Notice',
            lawRef: 'Labor Code § 2810.5(a)',
            description: 'Mandatory written notice of pay rates, allowances, regular payday, and workers comp carrier.',
            content: 'Must be provided to all non-exempt hires. Must detail pay rates, overtime rates, meal/lodging allowances, regular payday, employer legal name, address, phone number, and workers compensation carrier details.',
            actionLabel: 'Get KYR Toolkit ($49)',
            actionHref: '/tools/kyr'
          },
          {
            id: 'form-i9-verification',
            title: 'Form I-9 Verification',
            lawRef: '8 U.S.C. § 1324a',
            description: 'Section 1 on Day 1, Section 2 document inspection within 3 business days of hire.',
            content: 'Strict federal employment eligibility verification rules requiring physical document inspection within 3 business days of hire and retention for 3 years after hire or 1 year after termination.',
            actionLabel: 'Get KYR Toolkit ($49)',
            actionHref: '/tools/kyr'
          },
          {
            id: 'mandatory-pamphlets',
            title: 'Mandatory Pamphlet Distribution',
            lawRef: 'EDD / CRD / DIR Rules',
            description: 'Distribution of Paid Family Leave, Disability, Sexual Harassment, and Workers Comp notices.',
            content: 'New hires must receive statutory state pamphlets: EDD Disability Insurance (DE 2515), Paid Family Leave (DE 2511), CRD Sexual Harassment (CRD-184), Workers Comp Rights, and Rights of Victims of Violence.',
            actionLabel: 'Get KYR Toolkit ($49)',
            actionHref: '/tools/kyr'
          }
        ]
      },
      {
        id: 'protected-leaves-accommodations',
        title: 'Protected Leaves & Accommodations (CFRA / ADA)',
        lawRef: 'Gov. Code § 12945.2 / FEHA',
        mandates: [
          {
            id: 'paid-sick-leave-sb616',
            title: '40-Hour Paid Sick Leave (SB 616)',
            lawRef: 'Labor Code § 246 (SB 616)',
            description: 'Mandatory 40 hours / 5 days paid sick leave annual accrual and usage rights.',
            content: 'Effective Jan 1, 2024, California mandates at least 40 hours or 5 days of paid sick leave per year. Accrual is 1 hour per 30 hours worked, with an annual cap of no less than 80 hours.',
            actionLabel: 'Explore Paid Leave Rules',
            actionHref: '/programs'
          },
          {
            id: 'cfra-family-leave',
            title: 'CFRA Family Leave',
            lawRef: 'Gov. Code § 12945.2',
            description: '12 weeks job-protected family and medical leave for employers with 5+ employees.',
            content: 'CFRA grants eligible employees up to 12 weeks of job-protected leave to care for themselves or a covered family member (child, parent, spouse, grandparent, sibling, designated person) with a serious health condition.',
            actionLabel: 'Explore Leave Compliance',
            actionHref: '/programs'
          },
          {
            id: 'ada-interactive-process',
            title: 'ADA Good-Faith Interactive Process',
            lawRef: 'Gov. Code § 12940(n)',
            description: 'Timely, good-faith interactive dialogue to explore reasonable accommodations for disabilities.',
            content: 'California FEHA requires employers to engage in a timely, good-faith interactive process with employees to determine effective reasonable accommodations for known physical or mental disabilities.',
            actionLabel: 'Book Consultation',
            actionHref: '/book'
          }
        ]
      },
      {
        id: 'terminations-final-pay',
        title: 'Terminations & Final Pay (LC §§201–203)',
        lawRef: 'Labor Code §§ 201–203',
        mandates: [
          {
            id: 'immediate-final-pay',
            title: 'Immediate Final Wage Payment',
            lawRef: 'Labor Code § 201 / § 202',
            description: 'Final paycheck due immediately upon discharge, or within 72 hours for voluntary resignation.',
            content: 'Involuntary discharge requires ALL earned wages and accrued unused PTO to be paid immediately at the time of termination. Voluntary resignation without notice requires final pay within 72 hours.',
            actionLabel: 'Book Consultation',
            actionHref: '/book'
          },
          {
            id: 'separation-documentation',
            title: 'Separation Documentation',
            lawRef: 'Unemp. Ins. Code § 1089',
            description: 'EDD Unemployment Pamphlet (DE 2320), Cal-COBRA notice, and change in relationship notice.',
            content: 'California employers must provide discharged employees with written Notice of Change in Relationship (LC § 2810.5), EDD Unemployment Insurance Pamphlet (DE 2320), and Health Insurance Premium notices.',
            actionLabel: 'Book Consultation',
            actionHref: '/book'
          },
          {
            id: 'waiting-time-penalties',
            title: 'Waiting Time Penalty Prevention',
            lawRef: 'Labor Code § 203',
            description: '30-day penalty exposure (1 day regular pay per day late) for delayed final paychecks.',
            content: 'Willful failure to pay final wages on time triggers Waiting Time Penalties under LC § 203: 1 day of the employee’s regular rate of pay for each day the final check is late, up to a maximum of 30 days.',
            actionLabel: 'Book Consultation',
            actionHref: '/book'
          }
        ]
      }
    ]
  }
]

export default function Sidebar() {
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({
    'workplace-safety-prevention': true,
    'wage-hour-defense': true,
    'employee-lifecycle-relations': true,
  })

  const [openAreas, setOpenAreas] = useState<Record<string, boolean>>({
    'sb1343-hpp': true,
    'sb553-wvpp': false,
    'cal-osha-iipp': false,
    'paystubs-lc226': true,
    'meal-rest-periods': false,
    'timekeeping-classification': false,
    'hiring-onboarding': true,
    'protected-leaves-accommodations': false,
    'terminations-final-pay': false,
  })

  const [activeMandate, setActiveMandate] = useState<SpokeMandateItem | null>(null)

  const toggleCard = (id: string) => {
    setOpenCards((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleArea = (id: string) => {
    setOpenAreas((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleOpenMandate = (mandate: SpokeMandateItem) => {
    setActiveMandate(mandate)
  }

  return (
    <>
      {/* Mobile Drawer Bar (Visible <1024px / <lg) */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#111111] border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-indigo-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
            Compliance Spokes Directory
          </span>
        </div>
        <Sheet>
          <SheetTrigger className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 transition-colors cursor-pointer">
            <PanelLeft className="h-4 w-4" />
            <span>Spokes Drawer</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-[88vw] sm:w-[400px] p-0 bg-[#0c0c0c] border-r border-white/10 flex flex-col text-zinc-100">
            <div className="p-4 border-b border-white/10 bg-[#111111]">
              <SheetTitle className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                <Layers className="h-4 w-4 text-indigo-400" />
                Compliance Spokes
              </SheetTitle>
              <SheetDescription className="text-xs text-zinc-400 mt-1">
                Multi-Level Hierarchy: Card → Compliance Area → Mandates
              </SheetDescription>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              <SidebarContent
                openCards={openCards}
                openAreas={openAreas}
                toggleCard={toggleCard}
                toggleArea={toggleArea}
                onSelectMandate={handleOpenMandate}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Persistent Sidebar (Visible >=1024px / >=lg) */}
      <aside className="hidden lg:flex flex-col w-80 lg:w-84 shrink-0 bg-[#0c0c0c] border-r border-white/10 h-[calc(100vh-65px)] sticky top-[65px] overflow-hidden select-none">
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/10 bg-[#111111] flex items-center justify-between shrink-0 h-[48px]">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-indigo-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Compliance Spokes
            </h2>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
            3-Tier Accordion
          </span>
        </div>

        {/* 3 Modular Cards Canvas */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          <SidebarContent
            openCards={openCards}
            openAreas={openAreas}
            toggleCard={toggleCard}
            toggleArea={toggleArea}
            onSelectMandate={handleOpenMandate}
          />
        </div>
      </aside>

      {/* Mandate Detail Modal Sheet */}
      {activeMandate && (
        <HubModal
          title={activeMandate.title}
          subtitle={activeMandate.lawRef ? `California Legal Citation: ${activeMandate.lawRef}` : undefined}
          badge="MANDATE"
          isOpen={!!activeMandate}
          onClose={() => setActiveMandate(null)}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-indigo-500/10 text-indigo-400 border-indigo-500/20 flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5" />
                Statutory Compliance Mandate
              </span>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed font-medium">
              {activeMandate.description}
            </p>

            <div className="bg-[#141414] border border-white/10 rounded-xl p-4 sm:p-5 text-xs text-zinc-300 leading-relaxed space-y-3">
              <h4 className="text-xs font-bold text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-indigo-400" />
                Operational Requirements & Guidance
              </h4>
              <p>{activeMandate.content}</p>
            </div>

            {activeMandate.actionHref && (
              <div className="pt-2 flex justify-end">
                <Link
                  href={activeMandate.actionHref}
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow-md shadow-indigo-600/20"
                >
                  <span>{activeMandate.actionLabel || 'Access Resource'}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </div>
        </HubModal>
      )}
    </>
  )
}

function SidebarContent({
  openCards,
  openAreas,
  toggleCard,
  toggleArea,
  onSelectMandate,
}: {
  openCards: Record<string, boolean>
  openAreas: Record<string, boolean>
  toggleCard: (id: string) => void
  toggleArea: (id: string) => void
  onSelectMandate: (mandate: SpokeMandateItem) => void
}) {
  return (
    <div className="space-y-3">
      {spokesCardsData.map((card) => {
        const isCardOpen = openCards[card.id] !== false
        const CardIcon = card.icon

        const accentStyles = {
          emerald: {
            border: 'border-emerald-500/20 hover:border-emerald-500/40',
            badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            titleHover: 'group-hover:text-emerald-300',
            areaBadge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            chevron: 'text-emerald-400',
          },
          cyan: {
            border: 'border-cyan-500/20 hover:border-cyan-500/40',
            badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
            iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
            titleHover: 'group-hover:text-cyan-300',
            areaBadge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
            chevron: 'text-cyan-400',
          },
          purple: {
            border: 'border-purple-500/20 hover:border-purple-500/40',
            badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            titleHover: 'group-hover:text-purple-300',
            areaBadge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            chevron: 'text-purple-400',
          },
        }[card.accentColor]

        return (
          <div
            key={card.id}
            className={cn(
              'bg-[#141414] border rounded-xl overflow-hidden transition-all duration-200',
              accentStyles.border
            )}
          >
            {/* Level 1: Card Accordion Header */}
            <button
              type="button"
              onClick={() => toggleCard(card.id)}
              className="w-full p-3.5 text-left flex items-start justify-between gap-2 hover:bg-white/5 transition-colors group cursor-pointer"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <div className={cn('p-1.5 rounded-lg border shrink-0 mt-0.5', accentStyles.iconBg)}>
                  <CardIcon className="h-4 w-4" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={cn('text-xs font-bold text-zinc-100 transition-colors', accentStyles.titleHover)}>
                      {card.title}
                    </h3>
                    <span className={cn('text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border', accentStyles.badge)}>
                      {card.badge}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-zinc-400 line-clamp-1 leading-snug">
                    {card.description}
                  </p>
                </div>
              </div>
              {isCardOpen ? (
                <ChevronDown className={cn('h-4 w-4 shrink-0 mt-1', accentStyles.chevron)} />
              ) : (
                <ChevronRight className="h-4 w-4 text-zinc-500 shrink-0 mt-1" />
              )}
            </button>

            {/* Level 2: Compliance Areas List */}
            {isCardOpen && (
              <div className="p-3 pt-0 border-t border-white/5 bg-[#101010] space-y-2">
                {card.areas.map((area) => {
                  const isAreaOpen = openAreas[area.id] !== false

                  return (
                    <div key={area.id} className="bg-[#161616] border border-white/5 rounded-lg overflow-hidden">
                      {/* Area Header */}
                      <button
                        type="button"
                        onClick={() => toggleArea(area.id)}
                        className="w-full p-2.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <div className="space-y-0.5 min-w-0 pr-2">
                          <div className="flex items-center gap-1.5">
                            {isAreaOpen ? (
                              <ChevronDown className={cn('h-3.5 w-3.5 shrink-0', accentStyles.chevron)} />
                            ) : (
                              <ChevronRight className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                            )}
                            <span className="text-xs font-semibold text-zinc-200 truncate">{area.title}</span>
                          </div>
                          <p className="text-[9.5px] font-mono text-zinc-400 pl-5">{area.lawRef}</p>
                        </div>
                      </button>

                      {/* Level 3: Mandates List */}
                      {isAreaOpen && (
                        <div className="pl-6 pr-2.5 pb-2.5 pt-1 space-y-1 bg-[#121212] border-t border-white/5">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                            High-Level Mandates ({area.mandates.length})
                          </span>
                          {area.mandates.map((mandate) => (
                            <button
                              key={mandate.id}
                              type="button"
                              onClick={() => onSelectMandate(mandate)}
                              className="w-full p-2 rounded-md bg-[#181818] hover:bg-[#202020] border border-white/5 hover:border-white/10 text-left transition-colors flex items-start justify-between gap-2 group cursor-pointer"
                            >
                              <div className="space-y-0.5 min-w-0">
                                <span className="text-[11px] font-bold text-zinc-300 group-hover:text-white block truncate">
                                  {mandate.title}
                                </span>
                                <p className="text-[10px] text-zinc-400 line-clamp-1">{mandate.description}</p>
                              </div>
                              <FileText className="h-3 w-3 text-zinc-500 group-hover:text-indigo-400 shrink-0 mt-0.5" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
