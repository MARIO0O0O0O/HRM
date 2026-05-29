'use client'

// Force dynamic rendering — page requires Supabase auth at request time
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import PaymentOptions from '@/components/payments/PaymentOptions'
import ComplianceCalendar from '@/components/portal/ComplianceCalendar'
import AIPolicyWizard from '@/components/portal/AIPolicyWizard'
import {
  User,
  Briefcase,
  Sparkles,
  Download,
  Calendar,
  FileText,
  Clock,
  Calculator,
  Lock
} from 'lucide-react'
import Link from 'next/link'

interface Profile {
  id: string
  company_name: string | null
  contact_email: string | null
  plan_tier: string
  created_at: string
}

type PortalTab = 'dashboard' | 'calendar' | 'wizard' | 'billing'

export default function PortalPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<PortalTab>('dashboard')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()
          
          if (data) {
            setProfile(data)
          } else {
            // Seed a mock profile for preview if no DB entry exists
            setProfile({
              id: user.id,
              company_name: 'Acme SGV Enterprises',
              contact_email: user.email || 'employer@acmesgv.com',
              plan_tier: 'free',
              created_at: new Date().toISOString()
            })
          }
        }
      } catch (err) {
        console.error('Failed to retrieve client profile details:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const lockerDocuments = [
    { name: 'California Employee Handbook (Draft)', type: 'PDF Document', size: '1.2 MB', date: 'May 28, 2026' },
    { name: 'SB 553 Workplace Violence Prevention Plan', type: 'Word Template', size: '480 KB', date: 'May 25, 2026' },
    { name: 'Meal & Rest Break Policy Acknowledgment Form', type: 'PDF Document', size: '120 KB', date: 'May 12, 2026' },
  ]

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center bg-[#0a0a0a] text-zinc-400 py-16">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-indigo-400 animate-spin" />
          <span>Securing portal connection...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8 mb-8 text-left">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Client Portal Dashboard
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Securely manage your company&apos;s California compliance frameworks.
            </p>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 bg-[#111111] p-1.5 rounded-xl border border-white/5">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4.5 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-colors cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-zinc-50'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Dashboard
            </button>
            
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-4.5 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-colors cursor-pointer ${
                activeTab === 'calendar'
                  ? 'bg-indigo-600 text-zinc-50'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Compliance Calendar
            </button>

            <button
              onClick={() => setActiveTab('wizard')}
              className={`px-4.5 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-colors cursor-pointer ${
                activeTab === 'wizard'
                  ? 'bg-indigo-600 text-zinc-50'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              AI Policy Wizard
            </button>

            <button
              onClick={() => setActiveTab('billing')}
              className={`px-4.5 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-colors cursor-pointer ${
                activeTab === 'billing'
                  ? 'bg-indigo-600 text-zinc-50'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Secure Billing
            </button>
          </div>
        </div>

        {/* Tab rendering */}
        <div className="transition-all duration-200">
          
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left animate-in fade-in duration-200">
              
              {/* Left Column: Profile & Actions */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                
                {/* Profile Details Card */}
                <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between gap-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.03)_0%,transparent_50%)] pointer-events-none" />
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Company Registration</span>
                      <h3 className="text-xl font-bold text-zinc-100">{profile?.company_name || 'My Company'}</h3>
                      <p className="text-xs text-zinc-400 flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-zinc-600" /> Admin Contact: {profile?.contact_email}
                      </p>
                    </div>
                  </div>
                  
                  {/* Plan Tier Status */}
                  <div className="bg-[#161616] border border-white/5 rounded-xl p-4 flex flex-col justify-between items-center sm:items-end gap-2 text-center sm:text-right shrink-0 w-full sm:w-auto">
                    <div>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Service Tier</span>
                      <span className="text-sm font-extrabold text-cyan-400 uppercase tracking-wider block mt-0.5">
                        {profile?.plan_tier || 'Free Diagnostics'}
                      </span>
                    </div>
                    <span className="text-[9px] text-zinc-500 leading-snug">Active Account</span>
                  </div>
                </div>

                {/* Quick Compliance Actions */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Quick Compliance Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    <Link href="/paga-calculator" className="bg-[#111111] border border-white/5 hover:border-indigo-500/20 rounded-2xl p-5 flex flex-col justify-between gap-4 group transition-colors">
                      <div className="h-9 w-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-all shrink-0">
                        <Calculator className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">Run PAGA Audit</h4>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">Calculate compounding break and wage liability exposure risk.</p>
                      </div>
                    </Link>

                    <button 
                      onClick={() => setActiveTab('calendar')}
                      className="bg-[#111111] border border-white/5 hover:border-indigo-500/20 rounded-2xl p-5 flex flex-col justify-between gap-4 group transition-colors text-left cursor-pointer"
                    >
                      <div className="h-9 w-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-all shrink-0">
                        <Calendar className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">Compliance Calendar</h4>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">Track key California labor postings and SB 553 training schedules.</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => setActiveTab('wizard')}
                      className="bg-[#111111] border border-white/5 hover:border-indigo-500/20 rounded-2xl p-5 flex flex-col justify-between gap-4 group transition-colors text-left cursor-pointer"
                    >
                      <div className="h-9 w-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-all shrink-0">
                        <Sparkles className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">AI Policy Wizard</h4>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">Draft custom, California-compliant workplace violence and break rules.</p>
                      </div>
                    </button>

                  </div>
                </div>
              </div>

              {/* Right Column: Secure Document Locker */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Secure Document Locker</h3>
                <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    {lockerDocuments.map((doc, index) => (
                      <div
                        key={index}
                        className="bg-[#161616] border border-white/5 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-zinc-500 shrink-0" />
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-zinc-200 truncate max-w-[160px]">{doc.name}</h4>
                            <span className="text-[10px] text-zinc-500 block mt-0.5">{doc.type} • {doc.size}</span>
                          </div>
                        </div>
                        <button className="h-8 w-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center cursor-pointer transition-colors border border-white/5">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 text-center flex items-center justify-center gap-1.5 text-zinc-500">
                    <Lock className="h-3.5 w-3.5" />
                    <span className="text-[10px] italic block leading-relaxed">
                      Encrypted in compliance with CPRA guidelines.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="animate-in fade-in duration-200">
              <ComplianceCalendar />
            </div>
          )}

          {activeTab === 'wizard' && (
            <div className="animate-in fade-in duration-200">
              <AIPolicyWizard />
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="animate-in fade-in duration-200">
              <PaymentOptions />
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
