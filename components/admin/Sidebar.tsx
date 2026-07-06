'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, ShoppingBag, FolderKanban,
  Users, Settings, ChevronLeft, X,
  LogOut, ExternalLink
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { label: 'Manajemen Order', icon: ShoppingBag, href: '/admin/orders' },
  { label: 'Daftar Project', icon: FolderKanban, href: '/admin/projects' },
  { label: 'Data Klien', icon: Users, href: '/admin/clients' },
  { label: 'Pengaturan', icon: Settings, href: '/admin/settings' },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
  isMobileOpen: boolean
  onMobileClose: () => void
}

export default function Sidebar({ isCollapsed, onToggle, isMobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-5 py-5 border-b border-white/8 ${isCollapsed ? 'justify-center px-3' : ''}`}>
        <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 bg-white/10 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="CodifyHub Logo"
            className="w-7 h-7 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
        {!isCollapsed && (
          <div>
            <p className="text-white font-bold text-sm leading-none" style={{ fontFamily: 'Poppins, sans-serif' }}>CodifyHub</p>
            <p className="text-white/30 text-[10px] mt-0.5">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {!isCollapsed && (
          <p className="text-[10px] font-semibold text-white/20 uppercase tracking-widest px-3 pb-2 pt-1">Menu</p>
        )}
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                ${isActive
                  ? 'bg-white text-[#0A192F] shadow-sm'
                  : 'text-white/45 hover:text-white hover:bg-white/8'
                }
                ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon
                size={17}
                className={`flex-shrink-0 transition-colors ${isActive ? 'text-[#0A192F]' : 'text-white/45 group-hover:text-white'}`}
              />
              {!isCollapsed && (
                <span className="text-sm font-semibold">{item.label}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-white/8 space-y-0.5">
        <Link
          href="/"
          target="_blank"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/35 hover:text-white hover:bg-white/8 transition-all duration-200 ${isCollapsed ? 'justify-center' : ''}`}
          title={isCollapsed ? 'Lihat Website' : undefined}
        >
          <ExternalLink size={16} className="flex-shrink-0" />
          {!isCollapsed && <span className="text-xs font-medium">Lihat Website</span>}
        </Link>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400/60 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 ${isCollapsed ? 'justify-center' : ''}`}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <LogOut size={16} className="flex-shrink-0" />
          {!isCollapsed && <span className="text-xs font-medium">Logout</span>}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed left-0 top-0 h-full z-40 bg-[#0A192F] transition-all duration-300 border-r border-white/5
          ${isCollapsed ? 'w-[68px]' : 'w-60'}`}
      >
        <button
          onClick={onToggle}
          className="absolute -right-3.5 top-7 bg-[#0A192F] border border-white/10 rounded-full p-1.5 text-white/30 hover:text-white transition z-50 shadow-lg"
        >
          <ChevronLeft size={12} className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onMobileClose} />
          <aside className="relative w-64 bg-[#0A192F] h-full flex flex-col z-10 border-r border-white/5">
            <button onClick={onMobileClose} className="absolute top-4 right-4 text-white/30 hover:text-white transition">
              <X size={18} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  )
}
