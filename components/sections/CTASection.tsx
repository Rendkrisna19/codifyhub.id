'use client'

import { useState } from 'react'
import { MessageCircle, ArrowRight } from 'lucide-react'
import OrderModal from '@/components/ui/OrderModal'

export default function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section id="pesan" className="py-24 px-6 bg-[#060D1A] relative overflow-hidden">
        {/* BG decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-block mb-5 text-xs font-semibold text-blue-400 tracking-widest uppercase">
            ✦ Siap Mulai?
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Wujudkan Project Impian
            <br />
            <span className="text-blue-400">Sekarang Juga</span>
          </h2>
          <p className="text-gray-400 text-base mb-10 leading-relaxed max-w-xl mx-auto">
            Konsultasi gratis, tanpa komitmen. Tim kami siap membantu Anda dari nol hingga project selesai.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-sm transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/30"
            >
              <MessageCircle size={16} /> Konsultasi via WhatsApp
            </button>
            <a href="#portofolio" className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full font-semibold text-sm transition">
              Lihat Portofolio <ArrowRight size={16} />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-12 border-t border-white/5">
            {[
              { value: '100+', label: 'Project Selesai' },
              { value: '50+', label: 'Klien Puas' },
              { value: '3 Th', label: 'Pengalaman' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>{stat.value}</p>
                <p className="text-gray-500 text-xs font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
