'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { Button } from '@/components/ui/button'
import { CheckCircle2, MessageSquare, Mail, User, Briefcase, PhoneCall } from 'lucide-react'

export default function BookPage() {
  const [name, setName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prefill consultation email template
    const subject = encodeURIComponent('BizHR Consultation Request — ' + businessName)
    const body = encodeURIComponent(
      `Hello Mario,\n\nI would like to request a 30-minute introductory compliance consultation.\n\nName: ${name}\nBusiness: ${businessName}\nPhone: ${phone}\nEmail: ${email}\n\nCompliance Focus / Question:\n${message}\n\nThank you!`
    )
    
    window.location.href = `mailto:mario_espindola@outlook.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  const benefits = [
    '30-minute individual review focusing strictly on your core operations',
    'Actionable risk matrix analysis highlighting wage, break, or file gaps',
    '100% of the $75 consult fee credited back if you continue with any BizHR service',
    'Direct scheduling with Mario Espindola, MPA, California compliance specialist',
  ]

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb className="mb-8" />

        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full">
            Consultation Booking
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6">
            Reserve Your Compliance Call
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-xl mx-auto leading-relaxed">
            Take the first step toward securing your business. Book a 30-minute diagnostic session with Mario Espindola.
          </p>
        </div>

        {/* Booking Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
          
          {/* Details & Benefits column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-[#111111]/40 border border-white/5 rounded-2xl p-6 sm:p-8 relative">
              <h2 className="text-xl font-bold text-zinc-100">How the Diagnostic Call Works</h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-3">
                Our initial sessions are geared toward business owners who need immediate answers regarding employee handbooks, meal/rest breaks, frontline manager actions, or SB 553 violence prevention plan requirements.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Flat Price advisory */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 flex items-center justify-between gap-6">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Diagnostics Fee</span>
                <span className="text-3xl font-black text-indigo-400">$75 <span className="text-xs font-medium text-zinc-500">/ 30 min</span></span>
              </div>
              <span className="text-[11px] font-bold text-cyan-400 border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 rounded-md max-w-[180px] leading-snug">
                100% applied toward future service packages
              </span>
            </div>
          </div>

          {/* Consultation Form column */}
          <div className="lg:col-span-6 relative w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl opacity-10 blur-sm pointer-events-none" />
            <div className="relative bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
              
              <div>
                <h3 className="text-lg font-bold text-zinc-100">Request Consultation</h3>
                <p className="text-xs text-zinc-500 mt-1">Submit your details to launch an email booking request directly.</p>
              </div>

              {submitted ? (
                <div className="text-center py-8 flex flex-col items-center gap-4">
                  <CheckCircle2 className="h-12 w-12 text-cyan-400 animate-bounce" />
                  <h4 className="text-base font-bold text-zinc-100">Email Draft Prepared!</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
                    We have launched your default mail client with prefilled consultation details. Send the draft to finish your request.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-4 border-white/10 text-zinc-300">
                    Edit Request Details
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                        Your Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 h-4 w-4 text-zinc-600" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full bg-[#161616] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                          placeholder="Jane Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                        Business Name
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3.5 h-4 w-4 text-zinc-600" />
                        <input
                          type="text"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          required
                          className="w-full bg-[#161616] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                          placeholder="Acme Corp"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 h-4 w-4 text-zinc-600" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full bg-[#161616] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                          placeholder="jane@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <PhoneCall className="absolute left-3 top-3.5 h-4 w-4 text-zinc-600" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-[#161616] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                          placeholder="626-555-0199"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                      Compliance Focus / Core Issues
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3.5 h-4 w-4 text-zinc-600" />
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={4}
                        className="w-full bg-[#161616] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="Detail your primary compliance concerns (e.g. Employee handbook drafting, SB 553 violence safety plan, break policy cleanup)"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 active:from-indigo-700 text-zinc-50 font-bold tracking-wide py-3 rounded-lg cursor-pointer"
                  >
                    Open Email Client to Request
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
