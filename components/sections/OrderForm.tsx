'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function OrderForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', whatsapp: '',
    service: 'Joki Tugas / Skripsi IT', details: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const { error } = await supabase.from('orders').insert([{ 
      customer_name: formData.name, email: formData.email, whatsapp: formData.whatsapp, service_type: formData.service, requirements: formData.details
    }])
    setIsSubmitting(false)
    if (error) {
      alert('Terjadi kesalahan koneksi database. Silakan coba lagi.')
      return
    }
    const waNumber = '6281234567890'
    const text = `Halo Admin CodifyHub!%0A%0ASaya tertarik dengan layanan:%0ANama: ${formData.name}%0AEmail: ${formData.email}%0ALayanan: ${formData.service}%0ADetail: ${formData.details}%0A%0AMohon informasi lebih lanjut.`
    window.open(`https://api.whatsapp.com/send?phone=${waNumber}&text=${text}`, '_blank')
    setFormData({name: '', email: '', whatsapp: '', service: 'Joki Tugas / Skripsi IT', details: ''})
  }

  return (
    <section id="pesan" className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[40px] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-gray-100 p-8 md:p-14">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Konsultasikan Project Anda</h2>
            <p className="text-gray-500">Isi detail kebutuhan Anda untuk Skripsi, UMKM, atau Corporate secara gratis.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap / Instansi</label>
                <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#0A192F] focus:ring-4 focus:ring-[#0A192F]/10 transition outline-none" placeholder="Masukkan nama" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">No. WhatsApp</label>
                <input type="tel" required value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#0A192F] focus:ring-4 focus:ring-[#0A192F]/10 transition outline-none" placeholder="081234567890" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email (Opsional)</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#0A192F] focus:ring-4 focus:ring-[#0A192F]/10 transition outline-none" placeholder="email@contoh.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori Layanan</label>
                <select value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#0A192F] focus:ring-4 focus:ring-[#0A192F]/10 transition outline-none cursor-pointer">
                  <option>Joki Tugas / Skripsi IT</option>
                  <option>Sistem Profesional / Web Corporate</option>
                  <option>Website & Toko Online UMKM</option>
                  <option>Konsultasi Lainnya</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Detail Kebutuhan</label>
              <textarea rows={4} value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#0A192F] focus:ring-4 focus:ring-[#0A192F]/10 transition outline-none resize-none" placeholder="Ceritakan detail fitur dari tugas akhir atau sistem bisnis yang ingin dibuat..."></textarea>
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-[#0A192F] text-white py-4 rounded-2xl font-bold text-lg hover:bg-gray-900 transition disabled:opacity-70 flex justify-center items-center shadow-lg shadow-[#0A192F]/20 mt-4">
              {isSubmitting ? 'Memproses...' : 'Kirim & Lanjut ke WhatsApp'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
