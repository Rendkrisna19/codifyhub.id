'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, Loader2, Shield } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (authError) {
      setError(authError.message === 'Invalid login credentials'
        ? 'Email atau password salah. Silakan coba lagi.'
        : authError.message
      )
      return
    }

    router.push('/admin/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex items-center justify-center p-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* BG decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0A192F] via-blue-600 to-[#0A192F]" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-60" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-slate-100 rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#0A192F] to-[#112240] px-8 py-8 text-center relative">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/5 rounded-full" />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden">
                <img src="/images/logo.png" alt="Logo" className="w-10 h-10 object-contain" onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextElementSibling?.classList.remove('hidden')
                }} />
                <Shield size={28} className="text-blue-300 hidden" />
              </div>
              <h1 className="text-xl font-bold text-white mb-1">Admin CodifyHub</h1>
              <p className="text-white/40 text-xs">Masuk untuk akses dashboard</p>
            </div>
          </div>

          {/* Form */}
          <div className="px-8 py-7">
            {error && (
              <div className="mb-5 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 flex items-start gap-2.5">
                <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-[10px] font-bold">!</span>
                </div>
                <p className="text-red-700 text-xs font-medium leading-relaxed">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1.5">
                  <Mail size={11} /> Email Admin
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0A192F] focus:ring-2 focus:ring-[#0A192F]/10 transition font-medium"
                  placeholder="admin@codifyhub.id"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1.5">
                  <Lock size={11} /> Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-11 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0A192F] focus:ring-2 focus:ring-[#0A192F]/10 transition font-medium"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0A192F] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-900 transition flex items-center justify-center gap-2 shadow-lg shadow-[#0A192F]/20 disabled:opacity-60 mt-2"
              >
                {loading ? (
                  <><Loader2 size={15} className="animate-spin" /> Memverifikasi...</>
                ) : (
                  <><Lock size={14} /> Masuk ke Dashboard</>
                )}
              </button>
            </form>

            <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-xl text-center">
              <p className="text-[10px] text-blue-600 font-medium">
                🔒 Area terbatas — hanya untuk admin CodifyHub.id
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          © {new Date().getFullYear()} CodifyHub.id — Admin Panel
        </p>
      </div>
    </div>
  )
}
