'use client'

import { useState } from 'react'
import { Sparkles, Copy, Check, FileText, Settings, ShieldCheck, HelpCircle } from 'lucide-react'

type PolicyType = 'wvpp' | 'breaks' | 'reimbursement'

interface PolicyTemplate {
  title: string
  lawRef: string
  intro: string
  templateText: (company: string, lead: string, date: string, industry: string, options: Record<string, boolean>) => string
}

export default function AIPolicyWizard() {
  const [policyType, setPolicyType] = useState<PolicyType>('wvpp')
  const [companyName, setCompanyName] = useState('Acme SGV Enterprises')
  const [hrLead, setHrLead] = useState('Jane Doe')
  const [effectiveDate, setEffectiveDate] = useState('2026-06-01')
  const [industry, setIndustry] = useState('Retail')
  const [includeReporting, setIncludeReporting] = useState(true)
  const [includeRestBreaks, setIncludeRestBreaks] = useState(true)
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)
  const [generatedPolicy, setGeneratedPolicy] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const policies: Record<PolicyType, PolicyTemplate> = {
    wvpp: {
      title: 'SB 553 Workplace Violence Prevention Plan',
      lawRef: 'California Labor Code Section 6401.9',
      intro: 'Required for almost all California employers with 10 or more employees by July 1, 2024. Plan must be customized, active, and accessible.',
      templateText: (company, lead, date, ind, opts) => `======================================================================
CALIFORNIA WORKPLACE VIOLENCE PREVENTION PLAN (WVPP)
In Compliance with California Labor Code Section 6401.9 (SB 553)
======================================================================

COMPANY NAME: ${company}
COMPLIANCE COORDINATOR: ${lead}
EFFECTIVE DATE: ${date}
INDUSTRY CATEGORY: ${ind}

1. POLICY STATEMENT
${company} is committed to providing a safe, secure, and violence-free workplace for all employees, contractors, visitors, and customers. The Company maintains a zero-tolerance policy for workplace violence, threats, intimidation, and harassment.

2. RESPONSIBILITY & COORDINATION
${lead} is designated as the WVPP Administrator with full authority and responsibility to implement, monitor, and maintain this plan. Duties include:
- Coordinating periodic hazard assessments of the work site.
- Ensuring employee concerns and threats are thoroughly logged and investigated.
- Coordinating annual employee training sessions regarding WVPP guidelines.

3. HAZARD IDENTIFICATION & EVALUATION
Hazard assessments will be conducted:
- Annually, to review facility physical security, access logs, and layout.
- When new, previously unrecognized workplace hazards are introduced.
- Whenever a workplace violence incident occurs.
${opts.includeReporting ? `
4. REPORTING PROTOCOLS & ANTI-RETALIATION
- Employees are encouraged to immediately report any acts or threats of violence to ${lead}.
- For active threats, employees must immediately call 911 or follow local law enforcement evacuations.
- STRICT NO-RETALIATION POLICY: ${company} guarantees that no employee will be retaliated against, terminated, or disciplined for reporting workplace violence hazards or filing an incident log in good faith.` : ''}

5. VIOLENT INCIDENT LOGS
All incidents of workplace violence must be recorded in an active Incident Log. Each record will track the date, location, specific threat type, and corrective actions taken, keeping any identifying medical information confidential under CPRA guidelines.

Approved By: ${lead}
Title: WVPP Compliance Director
Signature Date: ${date}
`
    },
    breaks: {
      title: 'California Meal & Rest Break Policy',
      lawRef: 'California Labor Code Sections 226.7 & 512',
      intro: 'Strictest rest guidelines in the nation. Rest periods are paid, and meal periods must be entirely duty-free and provided on time.',
      templateText: (company, lead, date, ind, opts) => `======================================================================
CALIFORNIA MEAL AND REST PERIOD COMPLIANCE POLICY
In Accordance with California Labor Code Sections 226.7, 512 & IWC Wage Orders
======================================================================

COMPANY NAME: ${company}
HR COMPLIANCE CONTACT: ${lead}
EFFECTIVE DATE: ${date}
APPLICABLE LAWS: California Division of Labor Standards Enforcement (DLSE)

1. MEAL PERIOD POLICY
- ALL employees working shifts exceeding five (5) consecutive hours are provided an uninterrupted, duty-free meal period of at least thirty (30) consecutive minutes.
- The meal period must begin no later than the end of the employee's fifth hour of work.
- If a shift exceeds ten (10) hours, a second 30-minute duty-free meal period is provided, beginning no later than the end of the tenth hour.
- RECORDKEEPING: Employees must accurately record their meal "clock-ins" and "clock-outs" on the company timekeeper daily.

2. DUTY-FREE COMPLIANCE
During meal periods, employees are fully relieved of all duties and are free to leave the premises. If ${company} fails to provide a compliant, duty-free meal period, the employee is entitled to one (1) additional hour of pay at their regular rate for that workday.

3. REST PERIOD POLICY
- Employees are authorized and permitted to take one (1) net 10-minute rest period for every four (4) hours worked, or major fraction thereof.
- Rest periods are counted as hours worked and are fully paid.
- Rest periods should, to the extent practicable, be scheduled in the middle of each work segment.

${opts.includeRestBreaks ? `
4. REST BREAK TIMING CHART
- Shift of 3.5 to 6.0 hours: One (1) 10-minute rest period.
- Shift of 6.0 to 10.0 hours: Two (2) 10-minute rest periods.
- Shift of 10.0 to 14.0 hours: Three (3) 10-minute rest periods.` : ''}

5. RETALIATION & AUDIT reporting
Any supervisor who interferes with, discourages, or pressures an employee to skip a meal or rest period is subject to immediate disciplinary actions. Employees must immediately report any violations to ${lead} for payroll correction and premium processing.

Approved By: ${lead}
Title: HR Compliance Administrator
Date: ${date}
`
    },
    reimbursement: {
      title: 'California Expense Reimbursement Policy',
      lawRef: 'California Labor Code Section 2802',
      intro: 'Requires employers to reimburse employees for all necessary expenditures or losses incurred by the employee in direct consequence of discharge of duties.',
      templateText: (company, lead, date) => `======================================================================
CALIFORNIA BUSINESS EXPENSE REIMBURSEMENT POLICY
In Compliance with California Labor Code Section 2802
======================================================================

COMPANY NAME: ${company}
FINANCIAL AUDITOR: ${lead}
EFFECTIVE DATE: ${date}

1. POLICY STATEMENT
${company} will reimburse employees for all reasonable and necessary business-related expenditures incurred in the performance of their job duties. 

2. REMOTE WORK & PHONE USE REIMBURSEMENT
- CELL PHONES: If employees are required to use personal cell phones for business calls, texting, or company apps, the company will provide a reasonable monthly stipend of $30.00.
- INTERNET: For approved remote work schedules, ${company} provides a monthly internet connection stipend of $40.00 to cover professional bandwidth consumption.

3. TRAVEL & MILEAGE REIMBURSEMENT
- Travel mileage driven in personal vehicles for direct business activities (excluding standard daily commute) will be reimbursed at the standard California IRS mileage rate.
- Employees must submit a log detailing date, purpose, and exact odometer mileage to ${lead} by the 5th of each month.

4. SUBMISSION DEADLINES
Expense reimbursement requests must be submitted with valid digital receipts or logs within 30 days of incurring the expense. Approved reimbursements will be processed and paid on the payroll run immediately following submission.

Approved By: ${lead}
Title: Director of Compliance Operations
Date: ${date}
`
    }
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    setGenerationStep(1)
    setGeneratedPolicy(null)

    // Simulate multi-stage AI compilation
    setTimeout(() => {
      setGenerationStep(2)
      setTimeout(() => {
        setGenerationStep(3)
        setTimeout(() => {
          const selected = policies[policyType]
          const outputText = selected.templateText(
            companyName,
            hrLead,
            effectiveDate,
            industry,
            { includeReporting, includeRestBreaks }
          )
          setGeneratedPolicy(outputText)
          setIsGenerating(false)
          setGenerationStep(0)
        }, 600)
      }, 600)
    }, 600)
  }

  const handleCopy = () => {
    if (!generatedPolicy) return
    navigator.clipboard.writeText(generatedPolicy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden text-left">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.02)_0%,transparent_50%)] pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/5 pb-6 mb-6">
        <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-zinc-100">AI California Compliance Policy Wizard</h3>
          <p className="text-xs text-zinc-400">Generate fully customizable, industry-tailored California compliant policy drafts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Settings Panel */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-zinc-500 flex items-center gap-1">
              <Settings className="h-3 w-3" /> Select Policy Template
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {(Object.keys(policies) as PolicyType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setPolicyType(type)
                    setGeneratedPolicy(null)
                  }}
                  className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer flex flex-col gap-1 ${
                    policyType === type
                      ? 'bg-indigo-950/20 border-indigo-500 text-indigo-300'
                      : 'bg-[#161616] border-white/5 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="font-bold flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" /> {policies[type].title}
                  </span>
                  <span className="text-xs text-zinc-500 line-clamp-2">{policies[type].lawRef}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#161616] border border-white/5 rounded-xl p-4 text-[11px] text-zinc-400 leading-relaxed flex gap-2">
            <HelpCircle className="h-4.5 w-4.5 text-zinc-500 shrink-0 mt-0.5" />
            <p>{policies[policyType].intro}</p>
          </div>

          {/* Form customization fields */}
          <div className="flex flex-col gap-4 bg-[#161616] border border-white/5 rounded-xl p-5">
            <h4 className="text-[10px] uppercase font-extrabold text-zinc-400 tracking-wider">Customize Variables</h4>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-zinc-500">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="bg-[#0e0e0e] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-zinc-500">Responsible Compliance Lead</label>
              <input
                type="text"
                value={hrLead}
                onChange={(e) => setHrLead(e.target.value)}
                className="bg-[#0e0e0e] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-zinc-500">Effective Date</label>
                <input
                  type="date"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="bg-[#0e0e0e] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-zinc-500">Industry Sector</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="bg-[#0e0e0e] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Retail">Retail</option>
                  <option value="Office/Professional">Office/Professional</option>
                  <option value="Construction/Outdoor">Construction/Outdoor</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Restaurant/Hospitality">Restaurant/Hospitality</option>
                </select>
              </div>
            </div>

            {/* Custom Option Checkboxes based on policyType */}
            {policyType === 'wvpp' && (
              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <input
                  type="checkbox"
                  id="includeReporting"
                  checked={includeReporting}
                  onChange={(e) => setIncludeReporting(e.target.checked)}
                  className="h-3.5 w-3.5 rounded bg-[#0e0e0e] border-white/10 accent-indigo-500"
                />
                <label htmlFor="includeReporting" className="text-[10px] font-bold text-zinc-400 cursor-pointer">
                  Include Anonymous Reporting & Evacuation Safe Harbors
                </label>
              </div>
            )}

            {policyType === 'breaks' && (
              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <input
                  type="checkbox"
                  id="includeRestBreaks"
                  checked={includeRestBreaks}
                  onChange={(e) => setIncludeRestBreaks(e.target.checked)}
                  className="h-3.5 w-3.5 rounded bg-[#0e0e0e] border-white/10 accent-indigo-500"
                />
                <label htmlFor="includeRestBreaks" className="text-[10px] font-bold text-zinc-400 cursor-pointer">
                  Include Net 10-Min Break Reference Timings Chart
                </label>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="mt-2 w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-zinc-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 border border-indigo-500/20 cursor-pointer"
            >
              <Sparkles className="h-4 w-4 shrink-0" />
              {isGenerating ? 'Analyzing Regulations...' : 'Generate Policy Draft'}
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-7 flex flex-col bg-[#161616] border border-white/10 rounded-2xl p-6 relative overflow-hidden h-[450px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.01)_0%,transparent_50%)] pointer-events-none" />
          
          {/* Output Header */}
          <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4 shrink-0">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-zinc-500 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-400 animate-pulse" /> Compliance Document Drawer
            </span>
            {generatedPolicy && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors border border-white/5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy Policy Text
                  </>
                )}
              </button>
            )}
          </div>

          {/* Core Content Area */}
          <div className="flex-grow overflow-y-auto">
            {isGenerating ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
                <div className="relative flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full border-t-2 border-r-2 border-indigo-500 animate-spin" />
                  <Sparkles className="absolute h-4 w-4 text-indigo-400 animate-pulse" />
                </div>
                <div className="flex flex-col gap-1 max-w-[280px]">
                  <span className="text-xs font-bold text-zinc-200 uppercase tracking-widest">
                    {generationStep === 1 && 'Analyzing Statutes'}
                    {generationStep === 2 && 'Structuring Compliance Guidelines'}
                    {generationStep === 3 && 'Injecting California Safe Harbors'}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    {generationStep === 1 && 'Scanning Labor Code Section 226.7/512 databases...'}
                    {generationStep === 2 && 'Configuring custom rest parameters for safety...'}
                    {generationStep === 3 && 'Validating with California DLSE regulations...'}
                  </span>
                </div>
              </div>
            ) : generatedPolicy ? (
              <pre className="text-[11px] font-mono text-zinc-300 bg-black/40 border border-white/5 p-4 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
                {generatedPolicy}
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center gap-3 text-center text-zinc-500">
                <FileText className="h-12 w-12 text-zinc-700 shrink-0" />
                <p className="text-xs italic max-w-[260px] leading-relaxed">
                  Configure the customization variables on the left, then click &quot;Generate Policy Draft&quot; to compile your compliance framework.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
