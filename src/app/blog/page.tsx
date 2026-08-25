import Link from 'next/link'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { Calendar, Clock, BookOpen, ChevronRight, Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'HR Compliance Blog — California Employment Law Updates | CalBizHR',
  description: 'Practical guides on SB 553, SB 1343, PAGA, meal breaks, and California employment law for small business owners.',
}

export default function BlogPage() {
  const articles = [
    {
      slug: 'california-sb-553-workplace-violence-prevention',
      title: 'California Workplace Violence Prevention (SB 553): A Step-by-Step Compliance Guide',
      excerpt: 'As of July 2024, nearly all California employers must implement a written Workplace Violence Prevention Plan. Learn the core hazard assessment, training, and log recordkeeping steps.',
      category: 'Workplace Safety',
      date: 'May 20, 2026',
      readTime: '6 min read',
    },
    {
      slug: 'california-meal-break-compliance-PAGA-rules',
      title: 'Break Traps: Preventing Costly California Meal & Rest Period Class Action Exposure',
      excerpt: 'Meal and rest break compliance remains the single highest source of class-action and PAGA claims. Discover the exact policy language and manager oversight workflows you need.',
      category: 'Wage & Hour',
      date: 'April 14, 2026',
      readTime: '8 min read',
    },
    {
      slug: 'SB-1343-mandatory-harassment-prevention-training',
      title: 'Mandatory Sexual Harassment Prevention Training in California: SB 1343 Compliance Checklist',
      excerpt: 'California law requires all employers with 5 or more staff members to provide interactive harassment prevention training every two years. Verify your administrative compliance timelines.',
      category: 'Mandatory Training',
      date: 'March 28, 2026',
      readTime: '5 min read',
    },
    {
      slug: 'employee-handbook-checklist-california',
      title: 'Is Your Employee Handbook Outdated? 5 Mandatory Policies to Include in 2026',
      excerpt: 'Under California regulatory updates, static or out-of-state handbook templates can increase your legal exposure. Verify these essential state-specific at-will, leave, and anti-harassment clauses.',
      category: 'Handbooks',
      date: 'February 12, 2026',
      readTime: '7 min read',
    },
  ]

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb className="mb-8" />

        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full">
            Legal & Compliance Insights
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6">
            California Labor Law Updates
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-xl mx-auto leading-relaxed">
            Practical briefings and operational checklists compiled directly by Mario Espindola, MPA, to help California employers reduce litigation risk.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Articles Feed */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {articles.map((post) => (
              <article
                key={post.slug}
                className="bg-[#111111] border border-white/5 hover:border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-4 text-left transition-all duration-200 group"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-zinc-500">
                    <Calendar className="h-3.5 w-3.5" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1 text-zinc-500">
                    <Clock className="h-3.5 w-3.5" /> {post.readTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors leading-tight">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="pt-2">
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer group-hover:underline">
                    Read Compliance Brief <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar Tools */}
          <div className="lg:col-span-4 flex flex-col gap-8 text-left">
            {/* Free Lead Magnet */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-indigo-500/10 pointer-events-none">
                <BookOpen className="h-24 w-24" />
              </div>
              <h3 className="text-lg font-bold text-zinc-100 relative">Free Compliance Checklist</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-2.5 mb-6 relative">
                Download our comprehensive **California HR Pre-Flight Checklist** to self-audit your employee files, wage classifications, and required state policy compliance.
              </p>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-zinc-50 font-semibold tracking-wide py-2.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/10">
                <Download className="h-4.5 w-4.5" /> Download PDF
              </Button>
            </div>

            {/* Advisory Note */}
            <div className="bg-[#111111]/40 border border-white/5 rounded-2xl p-6">
              <h3 className="text-base font-bold text-zinc-100">Legal Disclaimer</h3>
              <p className="text-xs text-zinc-500 leading-relaxed mt-2.5">
                The insights and articles provided in this section are intended strictly for educational and general compliance-awareness purposes. They do not constitute formal legal advice. For detailed actionable counsel, please book a direct consultation with CalBizHR.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
