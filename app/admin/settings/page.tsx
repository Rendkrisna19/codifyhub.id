'use client'

import { useEffect, useState } from 'react'
import { Bell, Globe, Lock, Save, Loader2, CheckCircle2, RefreshCw } from 'lucide-react'

interface Settings {
  whatsapp_admin: string
  business_name: string
  tagline: string
}

const defaultSettings: Settings = {
  whatsapp_admin: '6281234567890',
  business_name: 'CodifyHub.id',
  tagline: 'Solusi Digital & Skripsi IT Terpercaya',
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/settings')
      const json = await res.json()
      if (res.ok && json.data) {
        setSettings({ ...defaultSettings, ...json.data })
      }
    } catch {
      setError('Gagal memuat pengaturan. Pastikan tabel settings sudah dibuat.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSettings() }, [])

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    setSaved(false)
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const update = (key: keyof Settings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={24} className="animate-spin text-[#0A192F]" />
          <p className="text-sm text-gray-400">Memuat pengaturan...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">

      {/* Banners - full width */}
      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-2xl px-5 py-3.5 flex items-center gap-3">
          <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
          <div>
            <p className="text-green-800 font-semibold text-sm">Pengaturan berhasil disimpan!</p>
            <p className="text-green-600 text-xs mt-0.5">Perubahan akan aktif di seluruh website.</p>
          </div>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-3.5 text-sm text-red-700">
          <p className="font-semibold mb-1">❌ Error: {error}</p>
          <p className="text-xs">Pastikan tabel <code className="bg-red-100 px-1 rounded">settings</code> sudah dibuat dan Service Role Key sudah diisi di .env.local</p>
        </div>
      )}

      {/* 2-column grid layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

      {/* WhatsApp Admin */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50 bg-gray-50/50">
          <div className="w-9 h-9 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Bell size={16} className="text-green-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">WhatsApp Admin</h3>
            <p className="text-xs text-gray-400">Nomor yang menerima pesan dari form pemesanan</p>
          </div>
        </div>
        <div className="px-6 py-5">
          <label className="text-xs font-semibold text-gray-500 mb-2 block">Nomor WhatsApp (format internasional: 62xxx)</label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">+</span>
              <input
                value={settings.whatsapp_admin}
                onChange={e => update('whatsapp_admin', e.target.value.replace(/\D/g, ''))}
                className="w-full pl-7 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0A192F] focus:ring-2 focus:ring-[#0A192F]/10 transition font-medium"
                placeholder="628xxxxxxxxxx"
              />
            </div>
            <a
              href={`https://wa.me/${settings.whatsapp_admin}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-3 bg-green-500 text-white text-xs font-semibold rounded-xl hover:bg-green-600 transition flex items-center gap-2 whitespace-nowrap"
            >
              Test WA
            </a>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">Contoh: <code className="bg-gray-100 px-1 rounded">6281234567890</code> (tanpa spasi, strip, atau tanda +)</p>
        </div>
      </div>

      {/* Informasi Website */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50 bg-gray-50/50">
          <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Globe size={16} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Informasi Website</h3>
            <p className="text-xs text-gray-400">Data bisnis yang tampil di landing page</p>
          </div>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-2 block">Nama Bisnis</label>
            <input
              value={settings.business_name}
              onChange={e => update('business_name', e.target.value)}
              className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0A192F] focus:ring-2 focus:ring-[#0A192F]/10 transition font-medium"
              placeholder="CodifyHub.id"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-2 block">Tagline / Slogan</label>
            <input
              value={settings.tagline}
              onChange={e => update('tagline', e.target.value)}
              className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0A192F] focus:ring-2 focus:ring-[#0A192F]/10 transition font-medium"
              placeholder="Solusi Digital..."
            />
          </div>
        </div>
      </div>

      {/* Security Info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50 bg-gray-50/50">
          <div className="w-9 h-9 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Lock size={16} className="text-orange-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Keamanan & Akses</h3>
            <p className="text-xs text-gray-400">Info konfigurasi autentikasi</p>
          </div>
        </div>
        <div className="px-6 py-5 space-y-3 text-xs text-gray-600">
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3.5">
            <span className="text-blue-500 text-base leading-none flex-shrink-0">🔐</span>
            <div>
              <p className="font-semibold text-blue-800 mb-1">Login Admin aktif via Supabase Auth</p>
              <p className="text-blue-600">Untuk mengganti password admin, pergi ke <strong>Supabase → Authentication → Users</strong> dan klik user admin Anda.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3.5">
            <span className="text-amber-500 text-base leading-none flex-shrink-0">⚠️</span>
            <div>
              <p className="font-semibold text-amber-800 mb-1">Service Role Key</p>
              <p className="text-amber-700">Pastikan <code className="bg-amber-100 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> di file <code className="bg-amber-100 px-1 rounded">.env.local</code> tidak pernah di-commit ke GitHub.</p>
            </div>
          </div>
        </div>
      </div>

      </div>{/* end grid */}

      {/* Save Button - full width */}
      <div className="flex gap-3">
        <button
          onClick={fetchSettings}
          className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
        >
          <RefreshCw size={14} /> Reset
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex-1 flex items-center justify-center gap-2 bg-[#0A192F] text-white py-3 rounded-xl font-semibold text-sm hover:bg-gray-900 transition shadow-sm disabled:opacity-60"
        >
          {saving ? <><Loader2 size={15} className="animate-spin" /> Menyimpan...</> : <><Save size={15} /> Simpan Semua Pengaturan</>}
        </button>
      </div>
    </div>
  )
}
