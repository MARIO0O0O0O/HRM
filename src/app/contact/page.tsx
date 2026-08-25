'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { Button } from '@/components/ui/button'
import { Mail, Phone, CheckCircle2, User, MessageSquare } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Save the submission so it's never lost even if the visitor's device
    // has no configured mail client (mailto: silently does nothing then).
    // This is best-effort: if it fails, we still fall through to mailto.
    try {
      const supabase = createClient()
      await supabase.from('contact_submissions').insert({
        name,
        email,
        message,
        source_page: '/contact',
      })
    } catch {
      // Non-blocking -- the mailto fallback below still fires either way.
    }

    // Propose email request
    const subject = encodeURIComponent('CalBizHR Contact Request — ' + name)
    const body = encodeURIComponent(
      `Hello Mario,\n\nI would like to contact you regarding some compliance questions.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nThank you!`
    )
    
    window.location.href = `mailto:mario_espindola@outlook.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  const peerToPeerOptions = [
    { label: 'Zelle', handle: 'mario_espindola@outlook.com', description: 'Send via your bank app' },
    { label: 'Venmo', handle: '@marioo00', description: 'Pay via Venmo mobile app' },
    { label: 'Cash App', handle: '10mario01', description: 'Pay via Cash tag' },
  ]

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb className="mb-8" />

        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full">
            Direct Outreach
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6">
            Get in Touch with CalBizHR
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-xl mx-auto leading-relaxed">
            Have questions about California compliance or SB 553 violence prevention plans? Reach out directly to secure prompt, professional guidance.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
          
          {/* Info Details column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Primary Details Box */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
              <h2 className="text-xl font-bold text-zinc-100">Contact Information</h2>
              <div className="flex flex-col gap-4 text-sm font-semibold">
                <div className="flex items-center gap-4 bg-[#161616] border border-white/5 rounded-xl p-4">
                  <div className="h-10 w-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">Phone & SMS</span>
                    <a href="tel:6269996239" className="text-sm font-bold text-zinc-200 hover:text-indigo-400 transition-colors mt-0.5 block">
                      626-999-6239
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#161616] border border-white/5 rounded-xl p-4">
                  <div className="h-10 w-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">Email Address</span>
                    <a href="mailto:mario_espindola@outlook.com" className="text-sm font-bold text-zinc-200 hover:text-indigo-400 transition-colors mt-0.5 block select-all">
                      mario_espindola@outlook.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing / Peer-to-Peer box */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-4">
              <h3 className="text-base font-bold text-zinc-100">Billing & Peer-to-Peer Payments</h3>
              <p className="text-xs text-zinc-500 leading-relaxed mb-2">
                Zelle, Venmo, and Cash App options are available below for diagnostic consultations or quick retainer updates. Credit card billing is handled securely through Stripe inside our Client Portal.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {peerToPeerOptions.map((opt, index) => (
                  <div key={index} className="bg-[#161616] border border-white/5 rounded-xl p-4 text-center flex flex-col justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{opt.label}</span>
                      <p className="text-xs font-bold text-zinc-200 mt-1 select-all break-all">{opt.handle}</p>
                    </div>
                    <span className="text-[9px] text-zinc-600 block leading-tight">{opt.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form column */}
          <div className="lg:col-span-6 relative w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl opacity-10 blur-sm pointer-events-none" />
            <div className="relative bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
              
              <div>
                <h3 className="text-lg font-bold text-zinc-100">Send an Inquiry</h3>
                <p className="text-xs text-zinc-500 mt-1">Submit your details to launch an email diagnostic draft immediately.</p>
              </div>

              {submitted ? (
                <div className="text-center py-8 flex flex-col items-center gap-4">
                  <CheckCircle2 className="h-12 w-12 text-cyan-400 animate-bounce" />
                  <h4 className="text-base font-bold text-zinc-100">Inquiry Ready to Send!</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
                    We have launched your email client with prefilled compliance inquiry details. Send the draft to finish your outreach.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-4 border-white/10 text-zinc-300">
                    Edit Details
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
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
                      Compliance Inquiry / Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3.5 h-4 w-4 text-zinc-600" />
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={5}
                        className="w-full bg-[#161616] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="Enter your compliance inquiry or consultation details here..."
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 active:from-indigo-700 text-zinc-50 font-bold tracking-wide py-3 rounded-lg cursor-pointer"
                  >
                    Launch Email Diagnostic Request
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
