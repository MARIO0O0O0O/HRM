'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  PanelLeft,
  ShieldCheck,
  DollarSign,
  UserCheck,
  ChevronDown,
  ChevronRight,
  FileText,
  Layers,
  Wrench
} from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import HubModal from '@/components/hub/HubModal'

export interface SpokeDetailItem {
  id: string
  title: string
  type: 'subject' | 'service'
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
  badge: string
  subjects: SpokeDetailItem[]
  service: SpokeDetailItem
}

export interface SpokeCategory {
  id: string
  title: string
  icon: typeof ShieldCheck
  areas: ComplianceArea[]
}

export const spokes3TierData: SpokeCategory[] = [
  {
    id: 'safety-prevention',
    title: 'Safety & Workplace Prevention',
    icon: ShieldCheck,
    areas: [
      {
        id: 'sb553-wvpp',
        title: 'Workplace Violence (SB 553 / LC §6401.9)',
        lawRef: 'Labor Code § 6401.9',
        badge: 'Cal/OSHA Mandatory',
        subjects: [
          {
            id: 'wvpp-written-plan',
            title: 'Written WVPP Plan',
            type: 'subject',
            lawRef: 'Labor Code § 6401.9(c)',
            description: 'Custom site-specific written plan covering hazard assessments, emergency protocols, and anti-retaliation rules.',
            content: 'California employers with 1+ employees must establish, implement, and maintain an effective site-specific Workplace Violence Prevention Plan (WVPP). Must include designated responsible managers, hazard evaluation procedures, violent incident reporting channels, and employee communication protocols.'
          },
          {
            id: 'wvpp-incident-log',
            title: 'Violent Incident Log',
            type: 'subject',
            lawRef: 'Labor Code § 6401.9(f)',
            description: 'Statutory 5-year recordkeeping log for recording all workplace violence incidents, threats, and investigations.',
            content: 'Employers must record every incident of workplace violence, post-incident investigations, and corrective actions taken in a detailed Violent Incident Log. Log records must be retained for at least 5 years and exclude personal identifying information to protect employee privacy.'
          }
        ],
        service: {
          id: 'wvpp-training-service',
          title: 'Training Implementation & WVPP Toolkit ($199)',
          type: 'service',
          lawRef: 'Labor Code § 6401.9(e)',
          description: 'Interactive employee and manager annual training implementation with completion tracking logs and turnkey $199 toolkit.',
          content: 'Annual interactive training tailored to workplace hazards. Covers plan access, threat identification, emergency responses, incident reporting, and non-retaliation rules.',
          actionLabel: 'Get WVPP Toolkit ($199)',
          actionHref: '/tools/wvpp'
        }
      },
      {
        id: 'sb1343-hpp',
        title: 'Harassment Prevention (SB 1343)',
        lawRef: 'Gov. Code § 12950.1',
        badge: 'FEHA Mandatory',
        subjects: [
          {
            id: 'hpp-timelines',
            title: 'Mandatory Training Timelines',
            type: 'subject',
            lawRef: 'Gov. Code § 12950.1(a)',
            description: 'Statutory 6-month new hire training windows and 2-year mandatory retraining cycles.',
            content: 'Employers with 5 or more employees must provide 1 hour of sexual harassment prevention training to non-supervisory employees and 2 hours to supervisory employees within 6 months of hire or promotion, and every 2 years thereafter.'
          },
          {
            id: 'hpp-complaint-procedures',
            title: 'Complaint Procedures',
            type: 'subject',
            lawRef: '2 CCR § 11023',
            description: 'Compliant internal investigation SOPs, impartial reporting channels, and CRD reporting guidelines.',
            content: 'Written anti-harassment policy detailing impartial complaint intake, prompt documentation, confidential investigation workflows, corrective discipline, and protection against unlawful retaliation.'
          }
        ],
        service: {
          id: 'hpp-diy-toolkit',
          title: 'HPP DIY Toolkit ($149) & Policy Overhaul',
          type: 'service',
          lawRef: 'Gov. Code § 12950.1',
          description: 'Turnkey HPP policy template, DFEH-compliant forms, and training facilitator guides.',
          content: 'Complete SB 1343 compliance package including written policy, complaint forms, investigation logs, and training completion rosters.',
          actionLabel: 'Get HPP Toolkit ($149)',
          actionHref: '/tools/hpp'
        }
      },
      {
        id: 'iipp-sec3203',
        title: 'Cal/OSHA IIPP (8 CCR §3203)',
        lawRef: '8 CCR § 3203',
        badge: 'Core Safety',
        subjects: [
          {
            id: 'iipp-core-mandates',
            title: 'Core Safety Mandates',
            type: 'subject',
            lawRef: '8 CCR § 3203(a)',
            description: 'The 8 mandatory elements required in every California employer safety plan.',
            content: 'Covers administrative responsibility, compliance enforcement, communication systems, hazard evaluation, injury investigation, hazard correction, training instruction, and recordkeeping.'
          },
          {
            id: 'iipp-heat-illness',
            title: 'Heat Illness Rules',
            type: 'subject',
            lawRef: '8 CCR § 3395',
            description: 'Outdoor and indoor heat illness prevention plan requirements, shade, water, and rest breaks.',
            content: 'Mandatory heat illness prevention procedures covering potable water supply, access to shade (at or above 80°F), high-heat procedures (at or above 95°F), emergency response, and acclimatization protocols.'
          }
        ],
        service: {
          id: 'iipp-9section-toolkit',
          title: '9-Section IIPP Toolkit ($199)',
          type: 'service',
          lawRef: '8 CCR § 3203',
          description: 'Comprehensive written IIPP, safety inspection checklists, and Cal/OSHA log templates.',
          content: 'Turnkey IIPP binder with 9 core sections, safety committee templates, hazard audit forms, and Cal/OSHA 300 log instructions.',
          actionLabel: 'Get IIPP Toolkit ($199)',
          actionHref: '/tools/iipp'
        }
      }
    ]
  },
  {
    id: 'wage-hour-defense',
    title: 'Wage & Hour Defense',
    icon: DollarSign,
    areas: [
      {
        id: 'paystubs-lc226',
        title: 'Paystubs & Wage Statements (LC §226)',
        lawRef: 'Labor Code § 226',
        badge: 'High Exposure',
        subjects: [
          {
            id: 'paystubs-9-itemizations',
            title: '9 Mandatory Itemizations',
            type: 'subject',
            lawRef: 'Labor Code § 226(a)',
            description: 'The 9 statutory requirements on every California wage statement to avoid $100/pay period penalties.',
            content: 'Must explicitly show: (1) Gross wages earned, (2) Total hours worked, (3) Piece rate units, (4) All deductions, (5) Net wages earned, (6) Pay period start/end dates, (7) Employee name & last 4 of SSN, (8) Employer legal name & address, (9) All applicable hourly rates and hours worked at each rate.'
          },
          {
            id: 'paystubs-60day-cure',
            title: '60-Day PAGA Cure',
            type: 'subject',
            lawRef: 'Labor Code § 2699(d) (AB 2288)',
            description: 'Reformed AB 2288 PAGA cure provisions allowing employers 60 days to fix paystub errors.',
            content: 'Under AB 2288 PAGA reform, employers who receive a PAGA notice for wage statement technical errors can cure itemization mistakes within 60 days to cap or eliminate statutory civil penalties.'
          }
        ],
        service: {
          id: 'payroll-exposure-audit',
          title: 'Payroll Exposure Audit & Correction',
          type: 'service',
          lawRef: 'Labor Code § 226 / PAGA',
          description: 'Deep-dive audit of payroll software outputs, paystub formatting, and rate calculations.',
          content: 'Professional audit of your payroll system, paystub line items, overtime rate math, and wage statement compliance to eliminate PAGA lawsuit targets.',
          actionLabel: 'Book Exposure Audit',
          actionHref: '/book'
        }
      },
      {
        id: 'meal-rest-breaks',
        title: 'Meal & Rest Breaks',
        lawRef: 'Labor Code § 512 / Wage Orders',
        badge: 'PAGA Target',
        subjects: [
          {
            id: 'meal-rest-scheduling',
            title: 'Break Scheduling Rules',
            type: 'subject',
            lawRef: 'Labor Code § 512(a)',
            description: '30-minute uninterrupted meal break before 5th hour and 10-minute rest breaks per 4 hours.',
            content: 'First meal break must begin no later than the end of the 5th hour of work. Employees working over 10 hours receive a second 30-minute meal break. Rest breaks must be 10 net minutes for every 4 hours worked or major fraction thereof.'
          },
          {
            id: 'meal-rest-premium-pay',
            title: 'Premium Pay Exposure',
            type: 'subject',
            lawRef: 'Labor Code § 226.7',
            description: '1 additional hour of pay at regular rate for each missed or non-compliant break.',
            content: 'If an employer fails to provide a compliant meal or rest break, the employer must pay the employee 1 additional hour of pay at the employee’s regular rate of pay for each workday that the meal or rest break is not provided.'
          }
        ],
        service: {
          id: 'workflow-system-design',
          title: 'Break Workflow System Design',
          type: 'service',
          lawRef: 'Labor Code § 226.7 / § 512',
          description: 'Break attestation logging, automated timecard alerts, and scheduling workflows.',
          content: 'Custom break compliance system setup including POS/timecard attestation prompts, manager oversight SOPs, and break waiver documentation.',
          actionLabel: 'Learn More',
          actionHref: '/programs/wage-and-hour/meal-and-rest-breaks'
        }
      }
    ]
  },
  {
    id: 'employee-lifecycle-admin',
    title: 'Employee Lifecycle Admin',
    icon: UserCheck,
    areas: [
      {
        id: 'onboarding-lc28105',
        title: 'Onboarding & Wage Notices (LC §2810.5)',
        lawRef: 'Labor Code § 2810.5 / SB 294',
        badge: 'New Hire Required',
        subjects: [
          {
            id: 'onboarding-wage-theft-notice',
            title: 'Wage Theft Prevention Notice',
            type: 'subject',
            lawRef: 'Labor Code § 2810.5(a)',
            description: 'Mandatory written notice of pay rates, allowances, payday schedule, and workers comp carrier.',
            content: 'Must be provided to all non-exempt employees at time of hire. Must list pay rates, overtime rates, allowances (meal/lodging), regular payday, legal name of employer, DBA, address, phone, and workers comp insurance details.'
          },
          {
            id: 'onboarding-i9-compliance',
            title: 'Form I-9',
            type: 'subject',
            lawRef: '8 U.S.C. § 1324a / USCIS',
            description: 'Section 1 within Day 1, Section 2 within 3 business days of hire, and reverification SOPs.',
            content: 'Strict federal I-9 rules requiring physical document inspection within 3 days of first day of work, proper retention rules (3 years from hire or 1 year after termination), and clean audit procedures.'
          }
        ],
        service: {
          id: 'onboarding-flow-design',
          title: 'Onboarding Flow Design & KYR Toolkit ($49)',
          type: 'service',
          lawRef: 'Labor Code § 2810.5 / SB 294',
          description: 'Digital offer letter packets, wage theft notice automation, and statutory KYR checklists ($49).',
          content: 'Complete onboarding package setup including automated Form 2810.5 generation, emergency disclosures, policy acknowledgments, and I-9 audit readiness.',
          actionLabel: 'Get KYR Toolkit ($49)',
          actionHref: '/tools/kyr'
        }
      },
      {
        id: 'terminations-lc201-203',
        title: 'Terminations & Final Pay (LC 201-203)',
        lawRef: 'Labor Code §§ 201–203',
        badge: 'Immediate Penalty',
        subjects: [
          {
            id: 'terminations-immediate-pay',
            title: 'Immediate Final Pay',
            type: 'subject',
            lawRef: 'Labor Code § 201 / § 202',
            description: 'Final paycheck due immediately upon involuntary discharge, or within 72 hours for voluntary quit.',
            content: 'Involuntary terminations require ALL earned wages, accrued unused PTO/vacation, and expense reimbursements to be handed over at the time of firing. Failure triggers Waiting Time Penalties under LC § 203 (1 day of regular pay per day late, up to 30 days).'
          },
          {
            id: 'terminations-disciplinary-sops',
            title: 'Disciplinary SOPs',
            type: 'subject',
            lawRef: 'Labor Code § 1102.5 / FEHA',
            description: 'Progressive discipline documentation, performance improvement plans, and termination checklists.',
            content: 'Structured corrective action documentation process to defend against wrongful termination, retaliation, and unemployment benefit claims.'
          }
        ],
        service: {
          id: 'manager-support-service',
          title: 'Manager Support & Separation Advisory',
          type: 'service',
          lawRef: 'Labor Code §§ 201-203',
          description: 'Direct HR guidance on high-risk terminations, severance agreements, and final pay checks.',
          content: 'On-demand HR manager support for executing legally sound terminations, calculating exact final checks, drafting severance waivers, and preventing post-employment claims.',
          actionLabel: 'Book Consultation',
          actionHref: '/book'
        }
      }
    ]
  }
]

export default function Sidebar() {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'safety-prevention': true,
    'wage-hour-defense': true,
    'employee-lifecycle-admin': true,
  })
  const [openAreas, setOpenAreas] = useState<Record<string, boolean>>({
    'sb553-wvpp': true,
    'paystubs-lc226': true,
  })
  const [activeModalItem, setActiveModalItem] = useState<SpokeDetailItem | null>(null)

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleArea = (id: string) => {
    setOpenAreas((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleOpenDetail = (item: SpokeDetailItem) => {
    setActiveModalItem(item)
  }

  return (
    <>
      {/* Mobile Drawer Trigger Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#111111] border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-indigo-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
            3-Tier Spokes Directory
          </span>
        </div>
        <Sheet>
          <SheetTrigger className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600/30 transition-colors cursor-pointer">
            <PanelLeft className="h-3.5 w-3.5" />
            <span>Explore Spokes</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85vw] sm:w-[380px] p-0 bg-[#0c0c0c] border-r border-white/10 flex flex-col">
            <div className="p-4 border-b border-white/10 bg-[#111111]">
              <SheetTitle className="text-base font-bold text-zinc-100 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-indigo-400" />
                Compliance Spokes
              </SheetTitle>
              <SheetDescription className="text-xs text-zinc-400 mt-1">
                3-Tier Hierarchy: Category → Area → Subjects & Services
              </SheetDescription>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <SidebarNavContent
                openCategories={openCategories}
                openAreas={openAreas}
                toggleCategory={toggleCategory}
                toggleArea={toggleArea}
                onSelectItem={handleOpenDetail}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex flex-col w-72 lg:w-80 shrink-0 bg-[#0c0c0c] border-r border-white/10 h-[calc(100vh-65px)] sticky top-[65px] overflow-hidden">
        <div className="px-4 py-3.5 border-b border-white/10 bg-[#111111] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-indigo-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Spokes Directory
            </h2>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
            3-Tier
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          <SidebarNavContent
            openCategories={openCategories}
            openAreas={openAreas}
            toggleCategory={toggleCategory}
            toggleArea={toggleArea}
            onSelectItem={handleOpenDetail}
          />
        </div>
      </aside>

      {/* Detail Modal Overlay */}
      {activeModalItem && (
        <HubModal
          title={activeModalItem.title}
          subtitle={activeModalItem.lawRef ? `Legal Citation: ${activeModalItem.lawRef}` : undefined}
          isOpen={!!activeModalItem}
          onClose={() => setActiveModalItem(null)}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className={cn(
                'text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border',
                activeModalItem.type === 'service'
                  ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                  : 'bg-zinc-800 text-zinc-300 border-white/10'
              )}>
                {activeModalItem.type === 'service' ? 'Implementation Service' : 'Compliance Subject'}
              </span>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed font-medium">
              {activeModalItem.description}
            </p>

            <div className="bg-[#141414] border border-white/10 rounded-xl p-4 sm:p-5 text-xs text-zinc-300 leading-relaxed space-y-3">
              <h4 className="text-xs font-bold text-zinc-100 uppercase tracking-wider">Operational Guidance & Requirements</h4>
              <p>{activeModalItem.content}</p>
            </div>

            {activeModalItem.actionHref && (
              <div className="pt-2 flex justify-end">
                <Link
                  href={activeModalItem.actionHref}
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
                >
                  {activeModalItem.actionLabel || 'Access Resource'}
                </Link>
              </div>
            )}
          </div>
        </HubModal>
      )}
    </>
  )
}

function SidebarNavContent({
  openCategories,
  openAreas,
  toggleCategory,
  toggleArea,
  onSelectItem,
}: {
  openCategories: Record<string, boolean>
  openAreas: Record<string, boolean>
  toggleCategory: (id: string) => void
  toggleArea: (id: string) => void
  onSelectItem: (item: SpokeDetailItem) => void
}) {
  return (
    <div className="flex flex-col gap-5">
      {spokes3TierData.map((category) => {
        const isCatOpen = openCategories[category.id] !== false
        const CategoryIcon = category.icon

        return (
          <div key={category.id} className="flex flex-col gap-2">
            {/* Tier 1: Category */}
            <button
              type="button"
              onClick={() => toggleCategory(category.id)}
              className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <CategoryIcon className="h-4 w-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="truncate">{category.title}</span>
              </div>
              {isCatOpen ? (
                <ChevronDown className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
              )}
            </button>

            {/* Tier 2: Compliance Areas */}
            {isCatOpen && (
              <div className="pl-3 flex flex-col gap-2 border-l border-white/10 ml-2">
                {category.areas.map((area) => {
                  const isAreaOpen = openAreas[area.id] !== false

                  return (
                    <div key={area.id} className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => toggleArea(area.id)}
                        className="flex items-center justify-between w-full px-2 py-1 rounded-md text-left text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          {isAreaOpen ? (
                            <ChevronDown className="h-3 w-3 text-indigo-400 shrink-0" />
                          ) : (
                            <ChevronRight className="h-3 w-3 text-zinc-500 shrink-0" />
                          )}
                          <span className="truncate">{area.title}</span>
                        </div>
                        <span className="text-[9px] font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.2 rounded border border-indigo-500/20 shrink-0 ml-1">
                          {area.badge}
                        </span>
                      </button>

                      {/* Tier 3: Subjects & Services */}
                      {isAreaOpen && (
                        <div className="pl-4 flex flex-col gap-1 my-0.5">
                          {/* Subjects */}
                          {area.subjects.map((sub) => (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => onSelectItem(sub)}
                              className="flex items-center gap-1.5 w-full text-left px-2 py-1 rounded text-[11px] font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-colors"
                            >
                              <FileText className="h-3 w-3 text-zinc-500 shrink-0" />
                              <span className="truncate">{sub.title}</span>
                            </button>
                          ))}

                          {/* Service */}
                          <button
                            type="button"
                            onClick={() => onSelectItem(area.service)}
                            className="flex items-center gap-1.5 w-full text-left px-2 py-1 rounded text-[11px] font-semibold text-indigo-300 hover:text-indigo-200 hover:bg-indigo-500/10 transition-colors mt-0.5"
                          >
                            <Wrench className="h-3 w-3 text-indigo-400 shrink-0" />
                            <span className="truncate">Service: {area.service.title}</span>
                          </button>
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
