'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from '@/components/admin/Sidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import { supabase } from '@/lib/supabaseClient'
import { Loader2 } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [checking, setChecking] = useState(true)
  const [authed, setAuthed] = useState(false)

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setAuthed(true)
        // Kalau sudah login, jangan bisa akses /admin/login
        if (isLoginPage) router.replace('/admin/dashboard')
      } else {
        setAuthed(false)
        if (!isLoginPage) router.replace('/admin/login')
      }
      setChecking(false)
    }

    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuthed(true)
        if (isLoginPage) router.replace('/admin/dashboard')
      } else {
        setAuthed(false)
        if (!isLoginPage) router.replace('/admin/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [isLoginPage, router])

  // Loading screen
  if (checking) {
    return (
      <div className="min-h-screen bg-[#F4F6FA] flex items-center justify-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={28} className="animate-spin text-[#0A192F]" />
          <p className="text-sm text-gray-500 font-medium">Memeriksa sesi...</p>
        </div>
      </div>
    )
  }

  // Render login page tanpa sidebar
  if (isLoginPage) {
    return <>{children}</>
  }

  // Kalau belum auth, tampilkan kosong (redirect sudah jalan)
  if (!authed) return null

  return (
    <div className="min-h-screen bg-[#F4F6FA]" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />
      <div className={`transition-all duration-300 min-h-screen flex flex-col ${isCollapsed ? 'lg:ml-[72px]' : 'lg:ml-60'}`}>
        <AdminHeader onMobileMenuOpen={() => setIsMobileOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
