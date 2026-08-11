'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Mail, Check } from 'lucide-react'

interface Contact {
  id: string
  name: string
  email: string
  message: string | null
  source_page: string | null
  created_at: string
  read: boolean
}

export default function ContactList({ initialContacts }: { initialContacts: Contact[] }) {
  const [contacts, setContacts] = useState(initialContacts)

  async function markRead(id: string) {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, read: true } : c)))
    const supabase = createClient()
    await supabase.from('contact_submissions').update({ read: true }).eq('id', id)
  }

  if (contacts.length === 0) {
    return (
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 text-center text-sm text-zinc-600">
        No contact submissions yet.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2.5">
      {contacts.map((c) => (
        <div
          key={c.id}
          className={`bg-[#111111] border rounded-xl p-4 transition-colors ${c.read ? 'border-white/5 opacity-60' : 'border-indigo-500/20'}`}
        >
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
              <span className="font-semibold text-sm text-zinc-200">{c.name}</span>
              <span className="text-xs text-zinc-600">{c.email}</span>
            </div>
            {!c.read && (
              <button
                onClick={() => markRead(c.id)}
                className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 shrink-0 transition-colors"
              >
                <Check className="h-3.5 w-3.5" /> Mark read
              </button>
            )}
          </div>
          {c.message && <p className="text-sm text-zinc-400 leading-relaxed mb-2">{c.message}</p>}
          <div className="flex items-center gap-3 text-xs text-zinc-600">
            <span>{new Date(c.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
            {c.source_page && <span>from {c.source_page}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}
