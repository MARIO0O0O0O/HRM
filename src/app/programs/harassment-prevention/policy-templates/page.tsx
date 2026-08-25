import Breadcrumb from '@/components/layout/Breadcrumb'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import ValidationLinks from '@/components/programs/ValidationLinks'
import { getDocumentsByCategory } from '@/lib/airtable/server'
import { FileText, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 3600

export default async function PolicyTemplatesCard() {
  const documents = await getDocumentsByCategory('HPP')
  const policyDocs = documents.filter((d) => !d.name.toLowerCase().includes('checklist') && !d.name.toLowerCase().includes('guide'))

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Breadcrumb className="mb-6" />
        <Link href="/programs/harassment-prevention" className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 w-fit mb-8 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Harassment Prevention Program
        </Link>

        <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
          <FileText className="h-3.5 w-3.5" /> Policy & Forms
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-100 mt-6 mb-4">
          Policy & Forms
        </h1>
        <p className="text-sm text-zinc-400 leading-relaxed mb-10 max-w-xl">
          A written policy alone doesn&apos;t satisfy SB 1343 — you need the supporting forms too, and
          they need to actually get used and signed. Here&apos;s the complete set.
        </p>

        <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden mb-8">
          {policyDocs.map((doc, i) => (
            <div
              key={doc.name}
              className={`flex items-center justify-between px-5 py-4 ${i !== policyDocs.length - 1 ? 'border-b border-white/5' : ''}`}
            >
              <span className="text-sm font-medium text-zinc-300">{doc.name}</span>
              {doc.mpaVerified && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full shrink-0">
                  MPA Verified
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 mb-8 text-sm text-zinc-400 leading-relaxed">
          <strong className="text-zinc-200">Why each of these matters:</strong> a policy without a
          complaint form leaves employees with nowhere to go. Acknowledgment forms are your proof that
          employees actually received the policy — without them, a policy that exists on paper only is
          hard to defend as one that was actually implemented.
        </div>

        <ValidationLinks
          links={[
            {
              label: 'Gov. Code § 12950.1 — Written Policy Requirements',
              href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12950.1',
              source: 'California Legislative Information',
            },
            {
              label: 'CRD Model Harassment Prevention Policy',
              href: 'https://calcivilrights.ca.gov/wp-content/uploads/sites/32/2020/06/DFEH_ModelHarassmentPolicy.pdf',
              source: 'California Civil Rights Department',
            },
          ]}
        />
        <LegalDisclaimer />
      </div>
    </div>
  )
}
