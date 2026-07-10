'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { MessageCircle } from 'lucide-react'

export default function FloatingWA() {
  const pathname = usePathname()
  const [waNumber, setWaNumber] = useState('6282275373233')
  const [showText, setShowText] = useState(false)

  if (pathname?.startsWith('/admin')) {
    return null
  }

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data, error } = await supabase.from('settings').select('wa_number').limit(1).single()
        if (data && data.wa_number) {
          setWaNumber(data.wa_number)
        }
      } catch (e) {
        console.error("Error fetching WA number", e)
      }
    }
    fetchSettings()
  }, [])

  const url = `https://api.whatsapp.com/send?phone=${waNumber}&text=Halo%20CodifyHub,%20saya%20ingin%20konsultasi%20mengenai%20layanan%20Anda.`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <a 
        href={url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-3 group"
        onMouseEnter={() => setShowText(true)}
        onMouseLeave={() => setShowText(false)}
      >
        <div 
          className={`bg-[#25D366] text-white px-4 py-2.5 rounded-xl font-bold shadow-lg transition-all duration-300 origin-right ${
            showText ? 'scale-100 opacity-100' : 'scale-90 opacity-0 hidden md:block pointer-events-none'
          }`}
        >
          Konsultasi Gratis
        </div>
        <div className="bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform hover:shadow-[#25D366]/40 relative">
          <MessageCircle size={28} />
          {/* Pulse effect */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 animate-ping" />
        </div>
      </a>
    </div>
  )
}
