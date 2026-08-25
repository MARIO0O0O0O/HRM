import Breadcrumb from '@/components/layout/Breadcrumb'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import ValidationLinks from '@/components/programs/ValidationLinks'
import { getProgram } from '@/lib/airtable/server'
import { GraduationCap, ArrowLeft, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 3600

export default async function TrainingCard() {
  const program = await getProgram('HPP')
  if (!program) return null

  const requirements = [
    {
      title: 'Non-Supervisory Employees',
      detail: `${program.nonSupervisoryHours ?? 1} hour of training, once every 2 years`,
    },
    {
      title: 'Supervisors',
      detail: `${program.supervisoryHours ?? 2} hours of training, once every 2 years — this is a legally distinct track, not just "the same training but longer"`,
    },
    {
      title: 'New Hires',
      detail: 'Within 6 months of hire (supervisors) or as soon as reasonably possible (non-supervisory)',
    },
    {
      title: 'Interactivity Requirement',
      detail: 'Training must include a practical, interactive component — and the law is specific about what that means: employees need a real opportunity to ask questions and get answers within a reasonable time. A video with no one to respond does not satisfy 2 CCR § 11024(a)(2)(F).',
    },
    {
      title: 'Why Live, Facilitated Training',
      detail: 'This is the actual reason self-paced-only training is legally risky: the interactivity requirement effectively calls for a professional who can respond in real time. Live remote sessions satisfy this directly — that\'s the format used here, for both tracks.',
    },
  ]

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Breadcrumb className="mb-6" />
        <Link href="/programs/harassment-prevention" className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 w-fit mb-8 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Harassment Prevention Program
        </Link>

        <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
          <GraduationCap className="h-3.5 w-3.5" /> Training Requirements
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-100 mt-6 mb-4">
          Training Requirements
        </h1>
        <p className="text-sm text-zinc-400 leading-relaxed mb-10 max-w-xl">
          SB 1343 training has more specific requirements than most employers expect — the hour counts
          are the easy part. Here&apos;s everything that actually needs to be true for training to count.
        </p>

        <div className="flex flex-col gap-3 mb-8">
          {requirements.map((r) => (
            <div key={r.title} className="bg-[#111111] border border-white/10 rounded-2xl p-5 flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-zinc-200">{r.title}</p>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-sm font-bold text-zinc-200 mb-2">How This Gets Delivered</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Training here is delivered live, remotely, by a real facilitator — not a pre-recorded module.
            That directly satisfies the interactivity requirement above, since employees can ask questions
            and get real answers during the session itself. You&apos;ll also get the written policy,
            complaint form, and acknowledgment forms that need to accompany the training.
          </p>
        </div>

        <ValidationLinks
          links={[
            {
              label: '2 CCR § 11024 — Full Training Content Requirements',
              href: 'https://govt.westlaw.com/calregs/Document/I0FE22530D40A11E5BAD9DDC301241E9C',
              source: 'California Code of Regulations',
            },
            {
              label: 'CRD Sexual Harassment Prevention Training FAQ',
              href: 'https://calcivilrights.ca.gov/shpt/',
              source: 'California Civil Rights Department',
            },
          ]}
        />
        <LegalDisclaimer />
      </div>
    </div>
  )
}
