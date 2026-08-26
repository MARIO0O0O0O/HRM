import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import InventoryCard from '@/components/programs/InventoryCard'
import ValidationLinks from '@/components/programs/ValidationLinks'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import KnowledgeQuiz from '@/components/tools/KnowledgeQuiz'
import PagaCalculatorComponent from '@/components/calculator/PagaCalculatorComponent'
import { pagaKnowledgeQuiz } from '@/data/quiz-content'
import {
  ShieldAlert,
  Scale,
  FileCheck,
  Calculator,
  ArrowRight,
  Info,
  Building2
} from 'lucide-react'

export const revalidate = 3600

export default function PagaDefensePortalPage() {
  const statutoryItems = [
    '35% Employee / 65% LWDA civil penalty distribution (reformed under AB 2288)',
    '$9,000 per aggrieved employee statutory cap for technical violations',
    'Standing requirement: Plaintiff must have personally experienced the violation',
    'Reasonable-steps caps: 15% (pre-notice reasonable steps) and 30% (post-notice cure) under AB 2288/SB 92',
    'Good-faith employer compliance defense and judicial penalty discretion',
  ]

  const cureProtocolItems = [
    'Statutory 60-day cure window upon receiving an official LWDA notice',
    'Wage statement technical itemization cures under Labor Code § 226',
    'Meal & rest break attestation logging and retrospective payroll adjustments',
    'LWDA response documentation log and cure verification submission',
    'Early dispute resolution & confidential settlement conference protocol',
  ]

  const auditToolkitItems = [
    '9 mandatory paystub itemizations audit (LC § 226(a))',
    'Overtime regular rate of pay math verification (bonuses & commissions)',
    'Timecard attestation & rest break waiver verification',
    'Individual PAGA arbitration waiver enforceability audit (Viking River & Adolph standards)',
    'Turnkey PAGA audit readiness binder and employer defense checklist',
  ]

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb className="mb-8" />

        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
            <ShieldAlert className="h-3.5 w-3.5" /> Compliance Program · Cal. Lab. Code §§ 2698–2699.6
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6">
            PAGA Defense Readiness & Cure Portal (AB 2288 / SB 92)
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-3xl leading-relaxed">
            California&apos;s Private Attorneys General Act (PAGA) permits employees to file representative lawsuits for Labor Code violations. Under the landmark AB 2288 and SB 92 legislative reforms, employers who take proactive reasonable compliance steps can cap penalties at 15% pre-notice or 30% post-notice cure.
          </p>
        </div>

        {/* Program Highlights Summary Box */}
        <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 mb-10">
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-6 flex items-center gap-2">
            <Scale className="h-4 w-4" /> AB 2288 Reform Statutory Summary & Caps
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#18181b] border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
              <span className="text-xs text-zinc-400 font-medium">Penalty Distribution</span>
              <p className="text-lg font-black text-amber-300 mt-2">35% / 65%</p>
              <span className="text-[11px] text-zinc-500 mt-1">Employee / LWDA State Split</span>
            </div>
            <div className="bg-[#18181b] border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
              <span className="text-xs text-zinc-400 font-medium">Statutory Employee Cap</span>
              <p className="text-lg font-black text-amber-300 mt-2">$9,000</p>
              <span className="text-[11px] text-zinc-500 mt-1">Per Employee Cap</span>
            </div>
            <div className="bg-[#18181b] border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
              <span className="text-xs text-zinc-400 font-medium">Pre-Notice Reasonable Steps</span>
              <p className="text-lg font-black text-amber-300 mt-2">15% Cap</p>
              <span className="text-[11px] text-zinc-500 mt-1">Statutory Reasonable-Steps Cap</span>
            </div>
            <div className="bg-[#18181b] border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
              <span className="text-xs text-zinc-400 font-medium">Post-Notice Statutory Cure</span>
              <p className="text-lg font-black text-amber-300 mt-2">30% Cap</p>
              <span className="text-[11px] text-zinc-500 mt-1">60-Day Cure Penalty Cap</span>
            </div>
          </div>
        </div>

        {/* What's In This Program -- Inventory Cards */}
        <div className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4">Educational Portal Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <InventoryCard
              href="#statutory-framework"
              icon={Scale}
              title="AB 2288 Statutory Framework"
              description="Legislative reforms, statutory penalty splits, standing rules, and statutory caps under AB 2288 and SB 92."
              items={statutoryItems}
            />
            <InventoryCard
              href="#cure-protocol"
              icon={FileCheck}
              title="60-Day Cure Protocol & LWDA Notice Log"
              description="Step-by-step statutory 60-day cure window execution, paystub error corrections, and LWDA filings."
              items={cureProtocolItems}
            />
            <InventoryCard
              href="#audit-toolkit"
              icon={Building2}
              title="PAGA Audit Readiness & Toolkit"
              description="Comprehensive payroll audit checklists, break attestation logs, and Viking River arbitration audit."
              items={auditToolkitItems}
            />
          </div>
        </div>

        {/* Interactive PAGA Exposure & Penalty Calculator Zone */}
        <div className="mb-12 bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
                <Calculator className="h-3.5 w-3.5" /> Interactive Risk Tool
              </span>
              <h2 className="text-2xl font-bold text-zinc-100 mt-4">California PAGA Penalty & Exposure Calculator</h2>
              <p className="text-sm text-zinc-400 max-w-xl mt-1">
                Estimate potential statutory penalty exposure under AB 2288 rules and calculate potential savings with pre-notice and post-notice cure caps.
              </p>
            </div>
            <Link
              href="/paga-calculator"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shrink-0"
            >
              Full Screen Calculator <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <PagaCalculatorComponent />
        </div>

        {/* Knowledge Check & Advisory Section */}
        <div className="mb-12 bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              PAGA Reform Self-Assessment
            </span>
            <h2 className="text-2xl font-bold text-zinc-100 mt-4 mb-2">AB 2288 PAGA Knowledge Check</h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              Test your understanding of California PAGA reforms, statutory penalty caps, standing rules, and cure protocols.
            </p>
          </div>

          <KnowledgeQuiz questions={pagaKnowledgeQuiz} />
        </div>

        {/* Advisory / Statutory Wording Note Box */}
        <div className="bg-[#111111]/60 border border-amber-500/20 rounded-2xl p-6 mb-10 text-left">
          <h3 className="text-base font-bold text-amber-300 flex items-center gap-2 mb-3">
            <Info className="h-5 w-5 text-amber-400 shrink-0" /> Important Statutory Cap Framing (AB 2288 / SB 92)
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed mb-3">
            Under California Labor Code §§ 2698–2699.6, reasonable-steps caps are <strong>15% (pre-notice reasonable steps)</strong> and <strong>30% (post-notice cure)</strong> of maximum statutory penalties. Note: Statutory caps are strictly defined as 15% and 30% of maximum exposure under AB 2288/SB 92 legislation.
          </p>
          <ul className="flex flex-col gap-1.5 text-xs text-zinc-400 border-t border-white/5 pt-3">
            <li>• <strong className="text-zinc-200">Pre-Notice Reasonable Steps Cap (15%):</strong> Available to employers who took all reasonable steps prior to receiving a PAGA notice (e.g., conducting payroll audits, disseminating compliant policies, training supervisors).</li>
            <li>• <strong className="text-zinc-200">Post-Notice Cure Cap (30%):</strong> Available to employers who cure the alleged Labor Code violations within 60 days of receiving the PAGA notice.</li>
            <li>• <strong className="text-zinc-200">Standing Rule:</strong> Aggrieved employees must have personally suffered the specific Labor Code violation within 1 year.</li>
          </ul>
        </div>

        {/* Validation Links & Defense Package CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <ValidationLinks
            links={[
              {
                label: 'Cal. Lab. Code §§ 2698–2699.6 — Full AB 2288 / SB 92 Statutory Text',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=2698',
                source: 'California Legislative Information',
              },
              {
                label: 'DIR LWDA PAGA Filing Portal & Official Notice Guidance',
                href: 'https://www.dir.ca.gov/Private-Attorneys-General-Act/Private-Attorneys-General-Act.head.html',
                source: 'California Labor & Workforce Development Agency (LWDA)',
              },
              {
                label: 'Cal. Lab. Code § 226 — Paystub Itemization & Cure Rules',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=226',
                source: 'California Legislative Information',
              },
            ]}
          />

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-zinc-200">PAGA Audit & Defense Readiness Package</h3>
              <p className="text-xs text-zinc-500 leading-relaxed mt-2">
                Audit your paystubs, timecards, meal breaks, and arbitration agreements to secure the statutory 15% reasonable-steps cap before a notice is filed.
              </p>
            </div>
            <Link
              href="/book"
              className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              Book PAGA Audit Session <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <LegalDisclaimer />
      </div>
    </div>
  )
}
