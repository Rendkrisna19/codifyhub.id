'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { X, Send, User, Mail, Phone, Briefcase, FileText, Loader2, MessageSquare, Check, Sparkles } from 'lucide-react'
import { Toast } from '@/lib/swal'

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [formData, setFormData] = useState({
    name: '', email: '', whatsapp: '',
    service: 'Joki Tugas / Skripsi IT', details: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [waNumber, setWaNumber] = useState('6282275373233')

  // Load WA number from settings
  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(json => {
        if (json.data?.whatsapp_admin) setWaNumber(json.data.whatsapp_admin)
      })
      .catch(() => {}) // silently fail, fallback to default
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          service_type: formData.service,
          requirements: formData.details,
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        Toast.fire({ icon: 'error', title: 'Gagal menyimpan pesanan!' })
        setIsSubmitting(false)
        return
      }

      setIsSubmitting(false)
      setSubmitted(true)

      setTimeout(() => {
        const text = `Halo Admin CodifyHub! 👋%0A%0ASaya ingin memesan layanan:%0A• Nama: ${formData.name}%0A• Email: ${formData.email}%0A• Layanan: ${formData.service}%0A• Detail: ${formData.details}%0A%0AMohon infonya, terima kasih!`
        window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank')
        onClose()
        setSubmitted(false)
        setFormData({ name: '', email: '', whatsapp: '', service: 'Joki Tugas / Skripsi IT', details: '' })
      }, 1500)

    } catch (err) {
      Toast.fire({ icon: 'error', title: 'Gagal terhubung ke server.' })
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" />

      {/* Modal */}
      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row transform transition-all">
        
        {/* Left Column (Branding) - Hidden on mobile */}
        <div className="hidden md:flex flex-col justify-between w-5/12 bg-[#0A192F] p-10 relative overflow-hidden">
          {/* Abstract background shapes */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
              <Sparkles className="text-blue-300" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Mulai Perjalanan<br />Digital Anda.
            </h2>
            <p className="text-blue-100/70 text-sm leading-relaxed pr-4">
              Ceritakan visi dan kebutuhan bisnis Anda. Tim kami siap merancang solusi teknologi premium, cepat, dan transparan.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            {[
              'Konsultasi & Analisis Gratis',
              'Transparan & Harga Fleksibel',
              'Garansi Maintenance'
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3.5 text-sm text-blue-100/90 font-medium">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Check size={12} strokeWidth={3} />
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Form) */}
        <div className="w-full md:w-7/12 p-6 sm:p-10 relative bg-gray-50/50">
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition p-2 bg-white hover:bg-gray-100 border border-gray-200 shadow-sm rounded-full">
            <X size={16} />
          </button>

          <div className="mb-8 md:hidden">
            <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>Konsultasi Gratis</h2>
            <p className="text-gray-500 text-sm mt-1.5">Isi form di bawah, kami segera membalas via WhatsApp.</p>
          </div>
          
          <div className="hidden md:block mb-8">
            <h3 className="text-xl font-bold text-gray-900">Form Pemesanan</h3>
            <p className="text-gray-500 text-sm mt-1">Kami akan membalas pesan Anda secepatnya.</p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 gap-5 h-full">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
                <div className="w-20 h-20 bg-emerald-50 border-4 border-emerald-100 rounded-full flex items-center justify-center relative z-10">
                  <Check className="text-emerald-500" size={36} strokeWidth={2.5} />
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 text-xl mb-2">Pesan Tersimpan!</p>
                <p className="text-gray-500 text-sm">Anda akan dialihkan ke WhatsApp Admin...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Nama / Instansi</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm"
                    placeholder="Masukkan nama" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Nomor WhatsApp</label>
                  <input type="tel" required value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm"
                    placeholder="08xxxxxxxxxx" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Email (Opsional)</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm"
                  placeholder="email@contoh.com" />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Kategori Layanan</label>
                <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm appearance-none cursor-pointer">
                  <option>Joki Tugas / Skripsi IT</option>
                  <option>Sistem Profesional / Web Corporate</option>
                  <option>Website & Toko Online UMKM</option>
                  <option>Konsultasi Lainnya</option>
                </select>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Ceritakan Detailnya</label>
                <textarea rows={3} value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm resize-none"
                  placeholder="Tuliskan kebutuhan fitur, referensi, atau deadline..."></textarea>
              </div>
              
              <button type="submit" disabled={isSubmitting}
                className="w-full bg-[#0A192F] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[#122A50] hover:-translate-y-0.5 active:translate-y-0 transition-all flex justify-center items-center gap-2 shadow-lg shadow-[#0A192F]/25 disabled:opacity-70 disabled:hover:translate-y-0 mt-2">
                {isSubmitting ? (
                  <><Loader2 size={16} className="animate-spin" /> Memproses...</>
                ) : (
                  <><Send size={16} className="mr-1" /> Kirim & Lanjut ke WhatsApp</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
