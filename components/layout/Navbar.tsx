'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Rocket } from 'lucide-react'
import OrderModal from '@/components/ui/OrderModal'

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100/80 shadow-sm py-4' 
            : 'bg-[#0A192F]/95 backdrop-blur-md py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 flex-shrink-0 bg-white rounded-lg p-1">
              <img src="/images/logo.png" alt="CodifyHub Logo" className="w-full h-full object-contain" />
            </div>
            <span className={`font-bold text-lg tracking-tight ${scrolled ? 'text-[#0A192F]' : 'text-white'}`} style={{ fontFamily: 'var(--font-display)' }}>
              Codify<span className={scrolled ? 'text-blue-800' : 'text-blue-800'}>Hub.id</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#layanan" className={`transition ${scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`}>Layanan</a>
            <a href="#portofolio" className={`transition ${scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`}>Portofolio</a>
            <a href="#testimonial" className={`transition ${scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`}>Testimoni</a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className={`relative group overflow-hidden px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 shadow-lg ${
                scrolled 
                  ? 'bg-[#0A192F] text-white hover:bg-gray-900 hover:shadow-[#0A192F]/30 hover:-translate-y-0.5' 
                  : 'bg-white text-[#0A192F] hover:bg-gray-50 hover:shadow-white/30 hover:-translate-y-0.5'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                Mulai Project
                <Rocket size={16} className={scrolled ? 'text-blue-400' : 'text-blue-600'} />
              </span>
              {/* Glowing / Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button 
            className={`md:hidden p-1 ${scrolled ? 'text-gray-700' : 'text-white'}`} 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 px-6 py-4 space-y-3 text-sm font-medium shadow-xl">
            <a href="#layanan" className="block text-gray-600 hover:text-gray-900 py-2" onClick={() => setIsMobileOpen(false)}>Layanan</a>
            <a href="#portofolio" className="block text-gray-600 hover:text-gray-900 py-2" onClick={() => setIsMobileOpen(false)}>Portofolio</a>
            <a href="#testimonial" className="block text-gray-600 hover:text-gray-900 py-2" onClick={() => setIsMobileOpen(false)}>Testimoni</a>
            <button onClick={() => { setIsModalOpen(true); setIsMobileOpen(false) }}
              className="w-full bg-[#0A192F] text-white py-3.5 rounded-full font-bold text-sm mt-4 flex justify-center items-center gap-2 relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2">
                Mulai Project <Rocket size={16} className="text--400" />
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            </button>
          </div>
        )}
      </nav>

      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
