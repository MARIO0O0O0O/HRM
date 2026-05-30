import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy — BizHR | California HR Compliance',
  description: 'BizHR privacy policy — how we collect, use, and protect your data in compliance with the California Privacy Rights Act (CPRA/CCPA).',
}

export default function PrivacyPage() {
  const lastUpdated = 'May 30, 2026'

  return (
    <div className="bg-[#0a0a0a] text-zinc-100 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            <Shield className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-zinc-100">Privacy Policy</h1>
            <p className="text-xs text-zinc-600">Last updated: {lastUpdated}</p>
          </div>
        </div>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-zinc-400 leading-relaxed">

          <div className="bg-[#111111] border border-indigo-500/20 rounded-2xl p-5 text-sm">
            <p className="text-zinc-300">
              <strong className="text-zinc-100">CPRA/CCPA Notice:</strong> This site is operated by M.E. Consulting (BizHR), a California business.
              California residents have specific rights under the California Privacy Rights Act (CPRA) and the California Consumer Privacy Act (CCPA),
              including the right to know, delete, correct, and opt out of sale of personal information.
            </p>
          </div>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">1. Who We Are</h2>
            <p>
              BizHR is operated by M.E. Consulting, owned by Mario Espindola MPA, located in Los Angeles / San Gabriel Valley, California.
              We provide HR compliance consulting, compliance toolkits, and AI-assisted HR tools for California small businesses.
            </p>
            <p className="mt-2">
              Contact: <a href="mailto:mario_espindola@outlook.com" className="text-indigo-400 hover:text-indigo-300">mario_espindola@outlook.com</a> ·
              626-999-6239
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">2. Information We Collect</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong className="text-zinc-300">Contact information</strong> — name, email, phone number provided via booking or contact forms</li>
              <li><strong className="text-zinc-300">Account information</strong> — email address and password for client portal accounts (stored encrypted via Supabase)</li>
              <li><strong className="text-zinc-300">Booking data</strong> — consultation scheduling information and notes</li>
              <li><strong className="text-zinc-300">Tool inputs</strong> — information entered into compliance calculators and AI policy generators (processed client-side; not stored unless you are logged in)</li>
              <li><strong className="text-zinc-300">Waitlist registrations</strong> — email addresses submitted for early access to upcoming tools</li>
              <li><strong className="text-zinc-300">Usage data</strong> — page views and basic analytics (no PII; no third-party ad tracking)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">3. How We Use Your Information</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>To respond to consultation requests and contact form submissions</li>
              <li>To provide and maintain your client portal account</li>
              <li>To send service-related communications (not marketing without consent)</li>
              <li>To notify waitlist registrants when tools launch</li>
              <li>To improve our compliance tools and services</li>
            </ul>
            <p className="mt-3 text-xs text-zinc-600">
              We do not sell, rent, or share your personal information with third parties for their marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">4. Data Storage & Security</h2>
            <p>
              Client portal data is stored in Supabase (PostgreSQL), hosted on AWS infrastructure with encryption at rest and in transit.
              Supabase is SOC 2 Type II compliant. Row-Level Security (RLS) policies ensure each user can only access their own data.
            </p>
            <p className="mt-2">
              We retain your data for as long as your account is active or as needed to provide services.
              You may request deletion at any time (see Section 6).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">5. Cookies & Analytics</h2>
            <p>
              This site uses minimal first-party cookies necessary for authentication (session management).
              We do not use Google Analytics, Facebook Pixel, or other third-party tracking tools that collect personally identifiable information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">6. Your California Privacy Rights (CPRA)</h2>
            <p>California residents have the right to:</p>
            <ul className="space-y-2 list-disc list-inside mt-2">
              <li><strong className="text-zinc-300">Know</strong> — request disclosure of the personal information we have collected about you</li>
              <li><strong className="text-zinc-300">Delete</strong> — request deletion of your personal information, subject to certain exceptions</li>
              <li><strong className="text-zinc-300">Correct</strong> — request correction of inaccurate personal information</li>
              <li><strong className="text-zinc-300">Opt Out</strong> — we do not sell personal information, so no opt-out is required</li>
              <li><strong className="text-zinc-300">Non-Discrimination</strong> — exercising your privacy rights will not affect your access to our services</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:mario_espindola@outlook.com" className="text-indigo-400 hover:text-indigo-300">mario_espindola@outlook.com</a>.
              We will respond within 45 days as required by CPRA.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">7. Third-Party Services</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong className="text-zinc-300">Supabase</strong> — database and authentication (<a href="https://supabase.com/privacy" className="text-indigo-400 hover:text-indigo-300">privacy policy</a>)</li>
              <li><strong className="text-zinc-300">Vercel</strong> — hosting and CDN (<a href="https://vercel.com/legal/privacy-policy" className="text-indigo-400 hover:text-indigo-300">privacy policy</a>)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-200 mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this policy as our services evolve or as California law requires. Material changes will be communicated
              via email to registered users. The &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent revision.
            </p>
          </section>

        </div>

        <div className="mt-12 border-t border-white/5 pt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Link href="/terms" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors">
            Terms of Service <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/contact" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
            Questions? Contact us
          </Link>
        </div>
      </div>
    </div>
  )
}
