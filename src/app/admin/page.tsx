import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Mail, ListChecks, Activity, MessageSquare, ArrowRight } from 'lucide-react'
import ContactList from '@/components/admin/ContactList'
import LogoutButton from '@/components/admin/LogoutButton'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [
    { data: contacts, count: contactCount },
    { count: unreadCount },
    { count: waitlistCount },
    { data: toolEvents },
  ] = await Promise.all([
    supabase.from('contact_submissions').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(20),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('read', false),
    supabase.from('waitlist').select('*', { count: 'exact', head: true }),
    supabase.from('tool_usage_events').select('tool_slug, created_at').order('created_at', { ascending: false }).limit(500),
  ])

  // Aggregate tool usage by slug
  const usageBySlug = new Map<string, number>()
  ;(toolEvents ?? []).forEach((e) => {
    usageBySlug.set(e.tool_slug, (usageBySlug.get(e.tool_slug) ?? 0) + 1)
  })
  const usageRanked = Array.from(usageBySlug.entries()).sort((a, b) => b[1] - a[1])
  const totalViews = toolEvents?.length ?? 0

  const stats = [
    { label: 'Total Contact Submissions', value: contactCount ?? 0, icon: Mail, color: 'text-indigo-400' },
    { label: 'Unread', value: unreadCount ?? 0, icon: MessageSquare, color: 'text-amber-400' },
    { label: 'Waitlist Signups', value: waitlistCount ?? 0, icon: ListChecks, color: 'text-cyan-400' },
    { label: 'Tool Views (last 500 events)', value: totalViews, icon: Activity, color: 'text-emerald-400' },
  ]

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-100">Admin Dashboard</h1>
            <p className="text-sm text-zinc-500 mt-1">Everything coming in through the free tools and contact form.</p>
          </div>
          <LogoutButton />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#111111] border border-white/10 rounded-2xl p-5">
              <s.icon className={`h-5 w-5 ${s.color} mb-3`} />
              <p className="text-2xl font-black text-zinc-100">{s.value}</p>
              <p className="text-xs text-zinc-500 mt-1 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact submissions -- interactive, client component */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-3">Recent Contact Submissions</h2>
            <ContactList initialContacts={contacts ?? []} />
          </div>

          {/* Tool usage ranked */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-3">Most-Used Free Tools</h2>
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
              {usageRanked.length === 0 && (
                <p className="text-sm text-zinc-600">No tool usage recorded yet.</p>
              )}
              {usageRanked.map(([slug, count]) => {
                const pct = totalViews > 0 ? Math.round((count / totalViews) * 100) : 0
                return (
                  <div key={slug}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-zinc-300">{slug}</span>
                      <span className="text-zinc-500">{count}</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-indigo-500 h-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>

            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-3 mt-6">Quick Links</h2>
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-2 flex flex-col">
              <Link href="/admin/waitlist" className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/[0.03] transition-colors text-sm font-semibold text-zinc-300">
                Waitlist Signups <ArrowRight className="h-3.5 w-3.5 text-zinc-600" />
              </Link>
              <Link href="/portal" className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/[0.03] transition-colors text-sm font-semibold text-zinc-300">
                Client Portal View <ArrowRight className="h-3.5 w-3.5 text-zinc-600" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
