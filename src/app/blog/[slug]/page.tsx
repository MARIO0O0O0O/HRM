import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowLeft, ShieldAlert, CheckCircle2, Phone } from 'lucide-react'

interface Post {
  slug: string
  title: string
  category: string
  date: string
  readTime: string
  content: string[]
  keyTakeaways: string[]
}

const blogRegistry: Record<string, Post> = {
  'california-sb-553-workplace-violence-prevention': {
    slug: 'california-sb-553-workplace-violence-prevention',
    title: 'California Workplace Violence Prevention (SB 553): A Step-by-Step Compliance Guide',
    category: 'Workplace Safety',
    date: 'May 20, 2026',
    readTime: '6 min read',
    content: [
      'Effective July 1, 2024, Senate Bill 553 (SB 553) amended California Labor Code Section 6401.9, mandating that nearly all California employers establish, implement, and maintain an effective written Workplace Violence Prevention Plan (WVPP). This directive is enforced strictly by Cal/OSHA, with potential penalties matching standard serious safety violations.',
      'Unlike generic templates, your WVPP must be custom-tailored to your specific workplace operational context and involve active participation from your employees. Frontline staff must be involved in identifying hazards, designing safety processes, and assessing incidents.',
      'Core Requirements of SB 553 Compliance:',
      '1. Develop a Written WVPP: Establish clear roles, incident reporting workflows, anti-retaliation declarations, and emergency action plans.',
      '2. Implement an Active Violent Incident Log: Record every occurrence of workplace violence, including threats, physical force, or weapon-related alerts, tracking post-incident investigations with strict employee anonymity protection.',
      '3. Annual Employee Training: Train all shift, W-2, and frontline management staff on hazard identification, reporting systems, log workflows, and active emergency procedures.',
      '4. Continuous Hazard Assessments: Regularly inspect all workspaces, identify potential high-friction contact points, and implement environmental controls (e.g. panic triggers, lighting upgrades, mirrors, secure barriers).'
    ],
    keyTakeaways: [
      'WVPP must be written, custom-tailored, and readily accessible to all shift employees.',
      'Strict employee participation is mandated during hazard reviews and plan drafting.',
      'Cal/OSHA requires maintaining all training records for a minimum of 1 year and logs for 5 years.',
    ],
  },
  'california-meal-break-compliance-PAGA-rules': {
    slug: 'california-meal-break-compliance-PAGA-rules',
    title: 'Break Traps: Preventing Costly California Meal & Rest Period Class Action Exposure',
    category: 'Wage & Hour',
    date: 'April 14, 2026',
    readTime: '8 min read',
    content: [
      'Meal and rest break violations continue to represent the single largest source of litigation, class actions, and Private Attorneys General Act (PAGA) penalties for California businesses. The state enforces incredibly strict guidelines regarding break timing, durations, and paystub documentation.',
      'California Industrial Welfare Commission (IWC) orders mandate that employees working more than 5 hours per day must receive an uninterrupted, duty-free 30-minute meal break starting no later than the end of the fifth hour of work. A second 30-minute break is required for shifts exceeding 10 hours.',
      'Key California Break Compliance Parameters:',
      '1. Uninterrupted Duty-Free: Employees must be entirely free from work duties. If a manager asks an employee a single quick work-related question during a break, the break is legally compromised, triggering a 1-hour premium pay requirement.',
      '2. Late Breaks are Violations: Clocking in for a meal break at 5 hours and 1 minute is a violation. The break must begin prior to the 5:00:00 mark.',
      '3. Mandatory Rest Breaks: Paid 10-minute rest breaks are required for every 4 hours worked (or major fraction thereof). These breaks must be scheduled near the middle of each work period.',
      '4. Premium Pay Enforcement: If a break is missed, shortened, interrupted, or late, the employer must pay the employee 1 additional hour of regular pay per day. Failure to do so triggers compounding paystub, wage, and PAGA penalties.'
    ],
    keyTakeaways: [
      'Meal breaks must be fully duty-free, uninterrupted, and start before the 5th hour.',
      'Missed or compromised breaks require 1 hour of premium pay paid on the immediate pay cycle.',
      'Frontline managers must be aggressively trained on break scheduling and enforcement.',
    ],
  },
  'SB-1343-mandatory-harassment-prevention-training': {
    slug: 'SB-1343-mandatory-harassment-prevention-training',
    title: 'Mandatory Sexual Harassment Prevention Training in California: SB 1343 Compliance Checklist',
    category: 'Mandatory Training',
    date: 'March 28, 2026',
    readTime: '5 min read',
    content: [
      'Under California Senate Bill 1343 (SB 1343), all employers with 5 or more employees must provide interactive sexual harassment prevention training to all staff members every two years. This covers all hourly, seasonal, W-2, part-time, and full-time personnel.',
      'The state mandates specific durations and formats for this training to be legally compliant. Traditional static slide-reading models do not satisfy the interactive training requirements enforced by the California Civil Rights Department (CRD).',
      'SB 1343 Timeline & Operational Guidelines:',
      '1. Training Durations: Non-supervisory employees must receive at least 1 hour of interactive training. Supervisory employees must receive at least 2 hours.',
      '2. Timing Requirements: New hires must complete compliance training within 6 months of hire. Supervisory employees must complete training within 6 months of assuming their supervisory role.',
      '3. Documentation and Records: Employers must maintain all completion records, certificates, and log files for a minimum of 2 years, showing the dates, trainee names, and certified trainer credentials.',
      '4. Interactive Components: Training must feature interactive scenarios, Q&A sections, and real-time knowledge checks to guarantee active participation.'
    ],
    keyTakeaways: [
      'Training is mandatory for all employers with 5 or more staff members.',
      'Supervisors require 2 hours of training; non-supervisory staff require 1 hour.',
      'Re-training must occur every 2 years from the last certification date.',
    ],
  },
  'employee-handbook-checklist-california': {
    slug: 'employee-handbook-checklist-california',
    title: 'Is Your Employee Handbook Outdated? 5 Mandatory Policies to Include in 2026',
    category: 'Handbooks',
    date: 'February 12, 2026',
    readTime: '7 min read',
    content: [
      'An employee handbook is your primary defensive shield against employment claims. However, in California, static out-of-date handbooks or templates designed for other states often increase your legal exposure. Every year, new state laws, leave mandates, and judicial rulings render older policies obsolete.',
      'A compliant handbook does more than list rules; it outlines standard processes, establishes at-will relationships, and documents mandatory anti-harassment and safety protocols to satisfy state-level inspection audits.',
      'Five Mandatory Policy Updates for 2026:',
      '1. California Paid Sick Leave (PSL): Ensure your handbook documents the updated sick leave accrual and usage rules (up to 40 hours or 5 days annually under recent state upgrades).',
      '2. Reproductive Loss Leave: California mandates up to 5 days of bereavement-style leave for reproductive loss events (miscarriage, failed adoption/surrogacy).',
      '3. Mandatory Off-Duty Cannabis Protection: Update drug testing and compliance policies to explicitly exclude non-psychoactive cannabis metabolite detection, aligning with strict California off-duty privacy acts.',
      '4. At-Will Employment Safeguards: Re-verify that at-will declarations are prominent and cannot be modified except via formal written agreements signed by the founder.',
      '5. Anti-Retaliation Reporting Policies: Document clear reporting pathways for discrimination, wage disputes, or safety concerns, satisfying mandatory CRD and OSHA directives.'
    ],
    keyTakeaways: [
      'California sick leave policies must outline the regular sick leave limits.',
      'Leave administration must explicitly cover newer bereavement and reproductive loss laws.',
      'Handbook policies must be accompanied by signed employee acknowledgment logs.',
    ],
  },
}

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return Object.keys(blogRegistry).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = blogRegistry[slug]
  if (!post) return { title: 'Post Not Found — BizHR' }
  return {
    title: `${post.title} | BizHR Blog`,
    description: post.content[0]?.slice(0, 155) ?? post.title,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogRegistry[slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigation Breadcrumb & Back button */}
        <div className="mb-8 flex flex-col gap-4 text-left">
          <Breadcrumb />
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Publications
          </Link>
        </div>

        {/* Article Viewport */}
        <article className="bg-[#111111] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl text-left relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.02)_0%,transparent_50%)] pointer-events-none" />

          {/* Meta headers */}
          <div className="flex flex-wrap items-center gap-3.5 text-xs font-semibold border-b border-white/5 pb-6 mb-8">
            <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-zinc-500">
              <Calendar className="h-4 w-4" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-zinc-500">
              <Clock className="h-4 w-4" /> {post.readTime}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-zinc-50 mb-6">
            {post.title}
          </h1>

          {/* Seeded Body paragraphs */}
          <div className="space-y-6 text-zinc-300 text-sm sm:text-base leading-relaxed">
            {post.content.map((paragraph, index) => {
              // Highlight bullet lists or headers slightly differently
              const isListItem = paragraph.match(/^\d+\./)
              return (
                <p key={index} className={isListItem ? "pl-4 font-semibold text-zinc-200 border-l border-indigo-500/30 py-1" : ""}>
                  {paragraph}
                </p>
              )
            })}
          </div>

          {/* Bullet Key Takeaways */}
          <div className="mt-10 pt-8 border-t border-white/5 bg-[#161616]/30 -mx-8 sm:-mx-12 px-8 sm:px-12 py-6">
            <h2 className="text-base sm:text-lg font-bold text-zinc-100 mb-4">Key Takeaways for W-2 Employers:</h2>
            <ul className="space-y-3">
              {post.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-400">
                  <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dynamic Action CTA & Advisory disclaimer */}
          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col md:flex-row gap-6 justify-between items-center bg-[#111111]">
            <div className="flex items-start gap-3 max-w-md">
              <ShieldAlert className="h-5 w-5 text-zinc-500 shrink-0 mt-0.5" />
              <p className="text-[10px] sm:text-xs text-zinc-500 leading-relaxed">
                <strong>Advisory Note:</strong> California labor directives evolve continually. This guide provides diagnostic support and does not constitute formal legal counsel.
              </p>
            </div>
            <Link href="/book" className="w-full md:w-auto shrink-0">
              <Button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-zinc-50 font-semibold tracking-wide py-3 px-6 rounded-lg flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" /> Book Diagnostic Call
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}
