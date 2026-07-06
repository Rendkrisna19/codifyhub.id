'use client'

import { useEffect, useState, useCallback } from 'react'
import { Clock, Circle, AlertCircle, CheckCircle2, Ban, Phone, Mail, Search, Filter, ChevronDown, RefreshCw, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Toast, confirmDelete } from '@/lib/swal'

type OrderStatus = 'Pending' | 'DP' | 'Dikerjakan' | 'Lunas' | 'Batal'

interface Order {
  id: string
  customer_name: string
  email: string
  whatsapp: string
  service_type: string
  requirements: string
  status: OrderStatus
  created_at: string
}

const statusConfig: Record<OrderStatus, { label: string; color: string; dot: string; icon: React.ElementType }> = {
  Pending:    { label: 'Pending',    color: 'bg-amber-100 text-amber-700 border-amber-200',    dot: 'bg-amber-400',    icon: Clock },
  DP:         { label: 'DP Masuk',   color: 'bg-blue-100 text-blue-700 border-blue-200',       dot: 'bg-blue-400',     icon: Circle },
  Dikerjakan: { label: 'Dikerjakan', color: 'bg-violet-100 text-violet-700 border-violet-200', dot: 'bg-violet-400',   icon: AlertCircle },
  Lunas:      { label: 'Lunas',      color: 'bg-green-100 text-green-700 border-green-200',    dot: 'bg-green-400',    icon: CheckCircle2 },
  Batal:      { label: 'Batal',      color: 'bg-red-100 text-red-700 border-red-200',          dot: 'bg-red-400',      icon: Ban },
}

const allStatuses: OrderStatus[] = ['Pending', 'DP', 'Dikerjakan', 'Lunas', 'Batal']

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('Semua')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Reset page when filters change
  useEffect(() => { setCurrentPage(1) }, [search, filterStatus, itemsPerPage])

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/orders')
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setOrders(json.data ?? [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchOrders() }, [fetchOrders])

  const updateStatus = async (id: string, status: OrderStatus) => {
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error('Gagal update status')
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
      if (selectedOrder?.id === id) setSelectedOrder(prev => prev ? { ...prev, status } : null)
      Toast.fire({ icon: 'success', title: 'Status diperbarui!' })
    } catch (err: any) {
      Toast.fire({ icon: 'error', title: err.message })
    } finally {
      setUpdatingId(null)
    }
  }

  const deleteOrder = async (id: string) => {
    const isConfirmed = await confirmDelete('Hapus order ini?')
    if (!isConfirmed) return
    
    try {
      const res = await fetch(`/api/admin/orders/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Gagal hapus order')
      
      Toast.fire({ icon: 'success', title: 'Order dihapus!' })
      setOrders(prev => prev.filter(o => o.id !== id))
      if (selectedOrder?.id === id) setSelectedOrder(null)
    } catch (err: any) {
      Toast.fire({ icon: 'error', title: err.message })
    }
  }

  const filtered = orders.filter(o => {
    const matchSearch = o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.service_type?.toLowerCase().includes(search.toLowerCase()) ||
      o.whatsapp.includes(search)
    const matchStatus = filterStatus === 'Semua' || o.status === filterStatus
    return matchSearch && matchStatus
  })

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOrders = filtered.slice(startIndex, startIndex + itemsPerPage)

  // Summary counts
  const counts = allStatuses.reduce((acc, s) => {
    acc[s] = orders.filter(o => o.status === s).length
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-5">

      {/* Status Summary Bar */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {allStatuses.map(s => {
          const sc = statusConfig[s]
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(filterStatus === s ? 'Semua' : s)}
              className={`bg-white border rounded-2xl p-3 text-center hover:shadow-md transition-all ${filterStatus === s ? 'border-[#0A192F] shadow-sm' : 'border-gray-100'}`}
            >
              <p className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{counts[s] ?? 0}</p>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${sc.color} border`}>{sc.label}</span>
            </button>
          )
        })}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0A192F] transition"
            placeholder="Cari nama, layanan, atau nomor WA..."
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:border-[#0A192F] transition cursor-pointer"
            >
              <option>Semua</option>
              {allStatuses.map(s => <option key={s}>{s}</option>)}
            </select>
            <Filter size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <button onClick={fetchOrders} className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-100 transition" title="Refresh">
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 text-sm">
          ❌ {error} — Pastikan <code>SUPABASE_SERVICE_ROLE_KEY</code> sudah diisi di <code>.env.local</code>
        </div>
      )}

      {/* Table + Detail Panel */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${selectedOrder ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          {loading ? (
            <div className="p-5 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-14 bg-gray-50 rounded-xl animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <Search size={32} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm font-medium">{orders.length === 0 ? 'Belum ada order masuk' : 'Tidak ditemukan'}</p>
              {orders.length === 0 && <p className="text-gray-300 text-xs mt-1">Order dari form landing page akan muncul di sini</p>}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50 bg-gray-50/50">
                    <th className="text-left text-[11px] font-semibold text-gray-400 px-5 py-3 uppercase tracking-wider">Klien</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 px-3 py-3 uppercase tracking-wider hidden md:table-cell">Layanan</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 px-3 py-3 uppercase tracking-wider">Status</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 px-3 py-3 uppercase tracking-wider hidden lg:table-cell">Tanggal</th>
                    <th className="px-3 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginatedOrders.map((order) => {
                    const sc = statusConfig[order.status] ?? statusConfig['Pending']
                    const Icon = sc.icon
                    const isSelected = selectedOrder?.id === order.id
                    return (
                      <tr
                        key={order.id}
                        className={`hover:bg-blue-50/20 transition-colors cursor-pointer ${isSelected ? 'bg-blue-50/40' : ''}`}
                        onClick={() => setSelectedOrder(isSelected ? null : order)}
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#0A192F] to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                              {order.customer_name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-xs">{order.customer_name}</p>
                              <p className="text-gray-400 text-[10px]">{order.whatsapp}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3.5 hidden md:table-cell">
                          <p className="text-xs text-gray-600 font-medium max-w-[160px] truncate">{order.service_type}</p>
                        </td>
                        <td className="px-3 py-3.5">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${sc.color}`}>
                            <Icon size={10} /> {sc.label}
                          </span>
                        </td>
                        <td className="px-3 py-3.5 hidden lg:table-cell text-xs text-gray-400">
                          {new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: '2-digit' })}
                        </td>
                        <td className="px-3 py-3.5">
                          <ChevronDown size={14} className={`text-gray-300 transition ${isSelected ? 'rotate-180' : ''}`} />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="px-5 py-3 border-t border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="text-xs font-medium bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#0A192F] cursor-pointer"
                  >
                    <option value={5}>5 baris</option>
                    <option value={10}>10 baris</option>
                    <option value={15}>15 baris</option>
                    <option value={50}>50 baris</option>
                  </select>
                  <p className="text-xs text-gray-400">
                    Menampilkan <strong className="text-gray-600">{filtered.length === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + itemsPerPage, filtered.length)}</strong> dari <strong className="text-gray-600">{filtered.length}</strong> data
                  </p>
                </div>
                
                {totalPages > 1 && (
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-1.5 rounded-lg border border-gray-200 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition flex items-center justify-center"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <div className="text-xs font-semibold text-gray-600 px-2 bg-gray-50 rounded-lg py-1.5 border border-gray-100">
                      Hal {currentPage} / {totalPages}
                    </div>
                    <button 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-1.5 rounded-lg border border-gray-200 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition flex items-center justify-center"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selectedOrder && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4 self-start lg:sticky lg:top-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{selectedOrder.customer_name}</h3>
                <p className="text-gray-400 text-xs mt-0.5">Detail Pesanan</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-300 hover:text-gray-500 text-lg leading-none w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition">×</button>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <a href={`https://wa.me/${selectedOrder.whatsapp}`} target="_blank" rel="noreferrer"
                className="flex items-center gap-2.5 text-xs text-gray-700 bg-green-50 border border-green-100 rounded-xl px-3 py-2.5 hover:bg-green-100 transition font-medium">
                <Phone size={13} className="text-green-600" /> {selectedOrder.whatsapp}
              </a>
              {selectedOrder.email && (
                <div className="flex items-center gap-2.5 text-xs text-gray-600 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5">
                  <Mail size={13} className="text-gray-400" /> {selectedOrder.email}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-2.5 text-xs bg-gray-50 rounded-xl p-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Layanan</span>
                <span className="text-gray-800 font-semibold text-right max-w-[140px]">{selectedOrder.service_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tanggal Masuk</span>
                <span className="text-gray-800">{new Date(selectedOrder.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>

            {/* Requirements */}
            {selectedOrder.requirements && (
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Detail Kebutuhan</p>
                <p className="text-xs text-gray-700 leading-relaxed bg-blue-50 rounded-xl p-3">{selectedOrder.requirements}</p>
              </div>
            )}

            {/* Status Update */}
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Ubah Status</p>
              <div className="grid grid-cols-2 gap-1.5">
                {allStatuses.map(s => {
                  const sc = statusConfig[s]
                  const isActive = selectedOrder.status === s
                  return (
                    <button
                      key={s}
                      onClick={() => updateStatus(selectedOrder.id, s)}
                      disabled={updatingId === selectedOrder.id}
                      className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[11px] font-semibold border transition
                        ${isActive ? sc.color + ' shadow-sm' : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'}
                        ${updatingId === selectedOrder.id ? 'opacity-50 cursor-wait' : ''}`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? sc.dot : 'bg-gray-200'}`} />
                      {sc.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Delete */}
            <button
              onClick={() => deleteOrder(selectedOrder.id)}
              className="w-full flex items-center justify-center gap-2 text-xs text-red-400 hover:text-red-600 hover:bg-red-50 border border-red-100 hover:border-red-200 rounded-xl py-2.5 transition font-medium"
            >
              <Trash2 size={13} /> Hapus Order Ini
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
