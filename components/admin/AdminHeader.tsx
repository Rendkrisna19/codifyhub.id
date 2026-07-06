'use client'

import { Menu, Bell, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/admin/dashboard': { title: 'Dashboard', subtitle: 'Ringkasan performa bisnis Anda' },
  '/admin/orders': { title: 'Manajemen Order', subtitle: 'Kelola semua pesanan masuk dari klien' },
  '/admin/projects': { title: 'Daftar Project', subtitle: 'Katalog & riwayat project yang dikerjakan' },
  '/admin/clients': { title: 'Data Klien', subtitle: 'Database semua klien CodifyHub' },
  '/admin/settings': { title: 'Pengaturan', subtitle: 'Konfigurasi akun & sistem' },
}

interface AdminHeaderProps {
  onMobileMenuOpen: () => void
}

export default function AdminHeader({ onMobileMenuOpen }: AdminHeaderProps) {
  const pathname = usePathname()
  const page = pageTitles[pathname] ?? { title: 'Admin', subtitle: '' }

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
      {/* Mobile hamburger */}
      <button
        className="lg:hidden text-gray-500 hover:text-gray-800 transition"
        onClick={onMobileMenuOpen}
      >
        <Menu size={22} />
      </button>

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-bold text-gray-900 leading-none" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {page.title}
        </h1>
        <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">{page.subtitle}</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notification */}
        <button className="relative w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
          <div className="w-7 h-7 bg-gradient-to-br from-[#0A192F] to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-gray-800 leading-none">Admin</p>
            <p className="text-[10px] text-gray-400 mt-0.5">CodifyHub.id</p>
          </div>
        </div>
      </div>
    </header>
  )
}
