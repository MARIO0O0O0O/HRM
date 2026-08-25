import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service — CalBizHR | California HR Compliance',
  description: 'CalBizHR terms of service — not a law firm, general information only, no attorney-client relationship. California HR compliance consulting and AI-assisted tools.',
}

export default function TermsPage() {
  const lastUpdated = 'May 30, 2026'

  return (
    <div className="bg-[#0a0a0a] text-zinc-100 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            <FileText className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-zinc-100">Terms of Service</h1>
            <p className="text-xs text-zinc-600">Last updated: {lastUpdated}</p>
          </div>
        </div>

        {/* Critical disclaimer box */}
        <div className="bg-[#111111] border border-rose-500/20 rounded-2xl p-5 text-sm mb-8">
          <p className="text-zinc-300">
            <strong className="text-rose-400">Not a Law Firm.</strong>{' '}
            CalBizHR and M.E. Consulting are not a law firm and do not provide legal advice.
            All content, tools, calculators, and documents on this site constitute general HR compliance information only.
            No attorney-client relationship is created by use of this site or its tools.
            For legal advice specific to your situation, consult a licensed California employment attorney.
          </p>
        </div>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-zinc-400 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using bizhr.vercel.app (or any associated domain), you agree to be bound by these Terms of Service.
              If you do not agree, do not use this site. These terms apply to all visitors, users, and clients.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">2. Nature of Services</h2>
            <p>CalBizHR (M.E. Consulting) provides:</p>
            <ul className="space-y-2 list-disc list-inside mt-2">
              <li>HR compliance consulting services (advisory, not legal representation)</li>
              <li>Compliance document templates and toolkits for California employers</li>
              <li>AI-assisted policy drafting tools (general drafts requiring human review)</li>
              <li>Compliance calculators providing estimates (not legal determinations)</li>
              <li>Educational blog content and resources</li>
            </ul>
            <p className="mt-3 text-xs text-zinc-500">
              All services are provided as general HR compliance guidance. Nothing on this site constitutes legal advice,
              legal representation, or a guarantee of compliance. California employment law is complex and fact-specific.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">3. AI-Generated Content</h2>
            <p>
              Some tools on this platform use artificial intelligence to generate draft HR documents, policy templates,
              and compliance outputs. You acknowledge that:
            </p>
            <ul className="space-y-2 list-disc list-inside mt-2">
              <li>AI-generated content is a starting point, not a final compliance document</li>
              <li>All AI output requires review by a qualified HR professional or attorney before implementation</li>
              <li>M.E. Consulting is not responsible for consequences arising from unreviewed AI output</li>
              <li>AI tools may not reflect the most recent regulatory updates — verify current law before implementing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">4. PAGA Calculator Disclaimer</h2>
            <p>
              The PAGA Exposure Calculator provides penalty estimates based on user-provided inputs and statutory rates
              as of 2026 (reflecting AB 2288 / SB 92 reforms). These estimates:
            </p>
            <ul className="space-y-2 list-disc list-inside mt-2">
              <li>Are not legal determinations of actual liability</li>
              <li>Depend on accuracy of inputs provided by the user</li>
              <li>Do not account for arbitration agreements, cure actions taken, or judicial discretion</li>
              <li>Should not be used as the sole basis for settlement or litigation decisions</li>
            </ul>
            <p className="mt-3 font-semibold text-zinc-300">
              M.E. Consulting accepts no liability for business decisions made based on calculator output.
              Consult a PAGA defense attorney before making settlement or cure decisions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">5. Document Templates & Toolkits</h2>
            <p>
              Templates and toolkits sold or provided through this site are designed for general use by California employers.
              You agree that:
            </p>
            <ul className="space-y-2 list-disc list-inside mt-2">
              <li>Templates require customization for your specific business, industry, and workforce</li>
              <li>Industry-specific hazards (chemical, ergonomic, electrical) may require additional professional review</li>
              <li>M.E. Consulting recommends attorney review of all templates before implementation</li>
              <li>Cal/OSHA compliance requires site-specific assessments that templates alone cannot provide</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">6. Cannabis Industry</h2>
            <p>
              Guidance provided through this site applies to California state employment law (FEHA, Labor Code, Cal/OSHA).
              Cannabis employers face additional complexity at the federal-state intersection including:
            </p>
            <ul className="space-y-2 list-disc list-inside mt-2">
              <li>DEA Schedule I status affecting federal contractor obligations</li>
              <li>Federal banking regulations affecting payment processing</li>
              <li>I-9 and background check complications for federally regulated roles</li>
            </ul>
            <p className="mt-3">
              HR guidance provided does not address these federal-nexus issues. Consult specialized cannabis
              employment counsel for matters involving federal law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by California law, M.E. Consulting&apos;s liability for any claim arising
              from use of this site or its services is limited to the amount paid by you for the specific service
              giving rise to the claim in the 12 months preceding the claim.
            </p>
            <p className="mt-3">
              M.E. Consulting is not liable for indirect, incidental, consequential, or punitive damages including
              Cal/OSHA citations, PAGA judgments, DFEH complaints, or employment claims arising from implementation
              of content found on this site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">8. Governing Law</h2>
            <p>
              These terms are governed by the laws of the State of California. Any disputes shall be resolved in
              the courts of Los Angeles County, California.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">9. Contact</h2>
            <p>
              Questions about these terms:{' '}
              <a href="mailto:mario_espindola@outlook.com" className="text-indigo-400 hover:text-indigo-300">
                mario_espindola@outlook.com
              </a>{' '}
              · 626-999-6239
            </p>
          </section>

        </div>

        <div className="mt-12 border-t border-white/5 pt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Link href="/privacy" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors">
            Privacy Policy <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/contact" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
            Questions? Contact us
          </Link>
        </div>
      </div>
    </div>
  )
}
