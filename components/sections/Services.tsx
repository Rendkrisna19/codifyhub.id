'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { servicesData } from '@/data/services'

export default function Services() {
  const [activeTab, setActiveTab] = useState(servicesData[0].id)
  
  const currentCategory = servicesData.find(c => c.id === activeTab)

  return (
    <section id="layanan" className="py-24 px-6 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-3 text-xs font-semibold text-gray-400 tracking-widest uppercase">Pilihan Paket</div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Layanan & Harga Spesial
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">Pilih paket yang paling sesuai dengan kebutuhan Anda, dari Mahasiswa hingga Perusahaan.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {servicesData.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === category.id 
                  ? 'bg-[#0A192F] text-white shadow-lg' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {currentCategory?.packages.map((pkg, i) => (
            <div 
              key={pkg.id} 
              className={`bg-white rounded-3xl border ${pkg.isPopular ? 'border-blue-500 shadow-xl relative' : 'border-gray-200 shadow-sm'} overflow-hidden flex flex-col hover:-translate-y-1 transition duration-300`}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 inset-x-0 bg-blue-600 text-white text-center text-xs font-bold py-1.5 tracking-wider uppercase">
                  Paling Populer
                </div>
              )}
              <div className={`p-8 ${pkg.isPopular ? 'pt-10' : ''}`}>
                <div className="text-sm font-semibold text-blue-600 mb-2">{pkg.target}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>{pkg.name}</h3>
                <p className="text-gray-500 text-sm mb-6 min-h-[40px] leading-relaxed">{pkg.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-400 line-through text-sm">{pkg.originalPrice}</span>
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Diskon Spesial</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-gray-900 tracking-tight">{pkg.price}</span>
                    {pkg.period && <span className="text-gray-500 text-sm font-medium">{pkg.period}</span>}
                  </div>
                </div>

                {/* This button can open modal or go to form */}
                <button 
                  onClick={() => document.getElementById('konsultasi')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`block w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all ${
                    pkg.isPopular 
                      ? 'bg-[#0A192F] text-white hover:bg-gray-900 shadow-md hover:shadow-lg' 
                      : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  Pilih Paket Ini
                </button>
              </div>
              
              <div className="p-8 pt-0 flex-1 flex flex-col bg-gray-50/50 mt-auto border-t border-gray-100">
                <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-4 mt-6">Layanan utama yang didapat:</p>
                <ul className="space-y-3">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 font-medium leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
