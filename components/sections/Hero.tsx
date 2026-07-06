'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, GraduationCap, Monitor, Store, Sparkles } from 'lucide-react'
import OrderModal from '@/components/ui/OrderModal'

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [heroData, setHeroData] = useState({
    title: 'Solusi Digital &',
    highlight: 'Skripsi IT',
    suffix: ' Terpercaya',
    tagline: 'Dari pengerjaan Joki Tugas & Skripsi, pembuatan Sistem UMKM, hingga Web Corporate Profesional — semua dikerjakan oleh tim ahli dengan hasil terbaik.'
  })

  useEffect(() => {
    // Hero title/tagline now uses hardcoded values to preserve the long description
  }, [])

  return (
    <>
      <section className="pt-32 pb-8 px-6 lg:pt-44 lg:pb-12 overflow-hidden relative bg-white min-h-[90vh] flex flex-col justify-center">
        {/* Subtle Grid Background */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)', 
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, white 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, white 40%, transparent 100%)'
          }} 
        />

        {/* BG Glow blobs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-[120px] pointer-events-none opacity-70 z-0" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-indigo-50 rounded-full blur-[100px] pointer-events-none opacity-60 z-0" />

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-7 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-gray-500 text-xs font-semibold animate-fade-in">
            1000+ Mahasiswa Terbantu
          </div>

          {/* Main Heading */}
          <h1
            className="text-5xl md:text-[72px] font-bold tracking-tight mb-6 animate-fade-in leading-[1.08]"
            style={{ fontFamily: 'var(--font-display)', animationDelay: '0.1s' }}
          >
            Joki IT Termurah
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #0d1117 30%, #0A192F 60%, #2563EB)' }}
            >
              Cepat &
            </span>
            {' '}Terpercaya
          </h1>

          {/* Subtext */}
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mb-10 animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
            {heroData.tagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in w-full sm:w-auto mb-16" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-[#0A192F] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-gray-900 hover:shadow-xl hover:shadow-[#0A192F]/25 hover:-translate-y-0.5 transition duration-300"
            >
              Konsultasi Gratis <ArrowRight size={16} />
            </button>
            <a href="#portofolio" className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition duration-300">
              Lihat Portofolio
            </a>
          </div>

          {/* Trust Banner & Stats */}
          <div className="w-full mt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100 text-center">
                <div className="flex flex-col items-center justify-center pt-4 md:pt-0">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
                    <Monitor size={20} />
                  </div>
                  <h4 className="text-3xl font-black text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>2.500++</h4>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Project Website & Sistem</p>
                </div>
                <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
                  <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-3">
                    <Sparkles size={20} />
                  </div>
                  <h4 className="text-3xl font-black text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>4,9/5</h4>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Klien Puas & Terbantu</p>
                </div>
                <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                    <Store size={20} />
                  </div>
                  <h4 className="text-3xl font-black text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>Gratis</h4>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Konsultasi Awal</p>
                </div>
              </div>
            </div>

            {/* About / USP Split Section */}
            <div className="grid md:grid-cols-2 gap-12 text-left items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  Layanan Joki Tugas IT & Sistem Bisnis Profesional
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  CodifyHub menyediakan layanan terpadu mulai dari pengerjaan tugas akhir dan skripsi mahasiswa IT dengan bimbingan penuh, pembuatan website untuk digitalisasi UMKM, hingga pengembangan sistem informasi custom skala enterprise. Setiap project dikerjakan cepat, responsif di berbagai perangkat, mudah dikelola, dan siap dikembangkan lebih lanjut.
                </p>
              </div>
              <div className="space-y-6">
                {[
                  { title: 'Kode Rapi & Profesional', desc: 'Sistem dibangun dengan standar industri, siap pakai dan mudah dipahami.', icon: Monitor, color: 'text-blue-500', bg: 'bg-blue-50' },
                  { title: 'Mudah Dikelola', desc: 'Cocok untuk update konten, layanan, artikel, dan data bisnis Anda tanpa ribet.', icon: Store, color: 'text-orange-500', bg: 'bg-orange-50' },
                  { title: 'SEO-Ready & Cepat', desc: 'Struktur website dioptimasi untuk kecepatan dan mesin pencari (Google).', icon: Sparkles, color: 'text-emerald-500', bg: 'bg-emerald-50' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${item.bg} ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
