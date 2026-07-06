'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Users, Phone, Mail, Search, ExternalLink } from 'lucide-react'

interface Client {
  id: string
  customer_name: string
  email: string
  whatsapp: string
  service_type: string
  status: string
  created_at: string
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      // Clients = unique WA numbers from orders
      const { data } = await supabase
        .from('orders')
        .select('id, customer_name, email, whatsapp, service_type, status, created_at')
        .order('created_at', { ascending: false })
      setClients(data ?? [])
      setLoading(false)
    }
    fetch()
  }, [])

  const filtered = clients.filter(c =>
    c.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    c.whatsapp.includes(search) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            placeholder="Cari nama, nomor WA, atau email..."
          />
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5 flex items-center gap-2">
          <Users size={14} className="text-blue-600" />
          <span className="text-sm font-bold text-blue-700">{clients.length}</span>
          <span className="text-xs text-blue-400 hidden sm:inline">klien</span>
        </div>
      </div>

      {/* Grid Cards */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse h-32" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 text-center">
          <Users size={32} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 text-sm font-medium">Belum ada data klien</p>
          <p className="text-gray-300 text-xs mt-1">Klien yang mengisi form akan otomatis muncul di sini</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((client, i) => (
            <div key={client.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all duration-200 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#0A192F] to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {client.customer_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm truncate">{client.customer_name}</p>
                  <p className="text-[10px] text-gray-400">{new Date(client.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>

              <div className="space-y-1.5 mb-3">
                <a href={`https://wa.me/${client.whatsapp}`} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-xs text-gray-600 hover:text-green-600 transition">
                  <Phone size={11} className="text-green-500 flex-shrink-0" />
                  <span className="truncate font-medium">{client.whatsapp}</span>
                </a>
                {client.email && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Mail size={11} className="text-gray-400 flex-shrink-0" />
                    <span className="truncate">{client.email}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full max-w-[150px] truncate">
                  {client.service_type}
                </span>
                <a href={`https://wa.me/${client.whatsapp}?text=Halo ${client.customer_name}, kami dari CodifyHub ingin menghubungi Anda...`} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-blue-500 transition font-medium">
                  Chat <ExternalLink size={10} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
