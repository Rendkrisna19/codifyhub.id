'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { X, Send, User, Mail, Phone, Briefcase, FileText, Loader2 } from 'lucide-react'
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

      console.log('✅ Order tersimpan:', json.data)
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#060D1A]/80 backdrop-blur-md" />

      {/* Modal */}
      <div className="modal-content relative bg-white rounded-[32px] shadow-2xl w-full max-w-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0A192F] to-[#1a3a5c] px-8 pt-8 pb-6 relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <button onClick={onClose} className="absolute top-5 right-5 text-white/40 hover:text-white transition p-1 rounded-full hover:bg-white/10">
            <X size={20} />
          </button>
          <div className="text-xs font-semibold text-blue-300 tracking-widest uppercase mb-2">Konsultasi Gratis</div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>Mulai Project Anda</h2>
          <p className="text-white/50 text-sm mt-1">Isi form, kami segera hubungi via WhatsApp.</p>
        </div>

        {/* Body */}
        <div className="px-8 py-6">

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 text-lg">Pesanan Tersimpan!</p>
                <p className="text-gray-500 text-sm">Mengarahkan ke WhatsApp Admin...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5"><User size={12} /> Nama</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:border-[#0A192F] focus:ring-2 focus:ring-[#0A192F]/10 outline-none transition font-medium"
                    placeholder="Nama / Instansi" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5"><Phone size={12} /> WhatsApp</label>
                  <input type="tel" required value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:border-[#0A192F] focus:ring-2 focus:ring-[#0A192F]/10 outline-none transition font-medium"
                    placeholder="08xxxxxxxxxx" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5"><Mail size={12} /> Email (Opsional)</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:border-[#0A192F] focus:ring-2 focus:ring-[#0A192F]/10 outline-none transition font-medium"
                  placeholder="email@contoh.com" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5"><Briefcase size={12} /> Kategori Layanan</label>
                <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:border-[#0A192F] focus:ring-2 focus:ring-[#0A192F]/10 outline-none transition font-medium appearance-none cursor-pointer">
                  <option>Joki Tugas / Skripsi IT</option>
                  <option>Sistem Profesional / Web Corporate</option>
                  <option>Website & Toko Online UMKM</option>
                  <option>Konsultasi Lainnya</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5"><FileText size={12} /> Detail Kebutuhan</label>
                <textarea rows={3} value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:border-[#0A192F] focus:ring-2 focus:ring-[#0A192F]/10 outline-none transition resize-none font-medium"
                  placeholder="Ceritakan kebutuhan fitur, deadline, atau detail lainnya..."></textarea>
              </div>
              <button type="submit" disabled={isSubmitting}
                className="w-full bg-[#0A192F] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-900 transition flex justify-center items-center gap-2 shadow-lg shadow-[#0A192F]/20 disabled:opacity-60">
                {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Memproses...</> : <><Send size={16} /> Kirim & Lanjut ke WhatsApp</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
