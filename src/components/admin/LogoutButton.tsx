'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  const router = useRouter()

  async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={logout}
      className="flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-300 border border-white/10 hover:border-white/20 rounded-xl px-4 py-2 transition-colors"
    >
      <LogOut className="h-4 w-4" /> Log Out
    </button>
  )
}
