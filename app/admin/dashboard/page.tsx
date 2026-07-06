'use client'

import { useEffect, useState } from 'react'
import {
  ShoppingBag, FolderKanban, Users, TrendingUp,
  Clock, CheckCircle2, Circle, AlertCircle, ArrowUpRight
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

interface Stats {
  totalOrders: number
  totalProjects: number
  totalClients: number
  pendingOrders: number
}

interface RecentOrder {
  id: string
  customer_name: string
  service_type: string
  status: string
  created_at: string
  whatsapp: string
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  Pending:   { label: 'Pending',   color: 'bg-amber-100 text-amber-700',   icon: Clock },
  DP:        { label: 'DP Masuk',  color: 'bg-blue-100 text-blue-700',     icon: Circle },
  Dikerjakan:{ label: 'Dikerjakan',color: 'bg-violet-100 text-violet-700', icon: AlertCircle },
  Lunas:     { label: 'Lunas',     color: 'bg-green-100 text-green-700',   icon: CheckCircle2 },
  Batal:     { label: 'Batal',     color: 'bg-red-100 text-red-700',       icon: AlertCircle },
}

// Simple SVG bar chart
function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map(d => d.value), 1)
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
          <div className="relative w-full flex items-end justify-center" style={{ height: '100px' }}>
            <div
              className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-700 min-h-[4px]"
              style={{ height: `${(d.value / max) * 100}%` }}
            />
          </div>
          <span className="text-[10px] text-gray-400 font-medium">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

// Mini donut ring
function DonutRing({ pct, color }: { pct: number; color: string }) {
  const r = 34, c = 2 * Math.PI * r
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" className="-rotate-90">
      <circle cx="44" cy="44" r={r} fill="none" stroke="#F1F5F9" strokeWidth="9" />
      <circle
        cx="44" cy="44" r={r} fill="none" stroke={color} strokeWidth="9"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
    </svg>
  )
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ totalOrders: 0, totalProjects: 0, totalClients: 0, pendingOrders: 0 })
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [weeklyOrders, setWeeklyOrders] = useState<{label: string, value: number}[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      // 1. Ambil summary counts & recent
      const [ordersRes, projectsRes, clientsRes, pendingRes, recentRes, allOrdersRes] = await Promise.all([
        supabase.from('orders').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('whatsapp', { count: 'exact', head: true }),
        supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'Pending'),
        supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
        // Fetch order 7 hari terakhir untuk chart
        supabase.from('orders').select('created_at').gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      ])

      setStats({
        totalOrders: ordersRes.count ?? 0,
        totalProjects: projectsRes.count ?? 0,
        totalClients: clientsRes.count ?? 0,
        pendingOrders: pendingRes.count ?? 0,
      })
      setRecentOrders(recentRes.data ?? [])

      // 2. Kalkulasi chart 7 hari terakhir
      const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
      const todayStr = new Date()
      const last7Days = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(todayStr)
        d.setDate(d.getDate() - (6 - i))
        return {
          dateStr: d.toISOString().split('T')[0],
          label: days[d.getDay()],
          value: 0
        }
      })

      if (allOrdersRes.data) {
        allOrdersRes.data.forEach((o: any) => {
          const dStr = o.created_at.split('T')[0]
          const dayData = last7Days.find(d => d.dateStr === dStr)
          if (dayData) dayData.value += 1
        })
      }

      setWeeklyOrders(last7Days.map(d => ({ label: d.label, value: d.value })))
      setLoading(false)
    }
    fetchData()
  }, [])

  const statCards = [
    { label: 'Total Order', value: stats.totalOrders, icon: ShoppingBag, color: 'from-blue-500 to-blue-600', sub: 'Keseluruhan order', iconBg: 'bg-blue-500' },
    { label: 'Project Selesai', value: stats.totalProjects, icon: FolderKanban, color: 'from-violet-500 to-violet-600', sub: 'Portofolio aktif', iconBg: 'bg-violet-500' },
    { label: 'Total Klien', value: stats.totalClients, icon: Users, color: 'from-emerald-500 to-emerald-600', sub: 'Dari form landing', iconBg: 'bg-emerald-500' },
    { label: 'Order Pending', value: stats.pendingOrders, icon: Clock, color: 'from-amber-500 to-orange-500', sub: 'Perlu ditindaklanjuti', iconBg: 'bg-amber-500' },
  ]

  const totalWeeklyOrders = weeklyOrders.reduce((acc, curr) => acc + curr.value, 0)
  // Simulasi conversion jika belum ada sistem tracking visitor (untuk visual demo yang cantik)
  // Asumsi: visitor = total order minggu ini * 15 (konversi ~6-10%)
  const dummyVisits = totalWeeklyOrders > 0 ? totalWeeklyOrders * 15 : 150
  const conversionPct = totalWeeklyOrders > 0 ? Math.min(Math.round((totalWeeklyOrders / dummyVisits) * 100), 100) : 0


  return (
    <div className="space-y-6">

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className={`${card.iconBg} w-10 h-10 rounded-xl flex items-center justify-center shadow-lg`} style={{ boxShadow: `0 4px 14px ${card.iconBg.replace('bg-', '')}33` }}>
                <card.icon size={18} className="text-white" />
              </div>
              <ArrowUpRight size={14} className="text-gray-300" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {loading ? <span className="w-8 h-6 bg-gray-100 rounded animate-pulse inline-block" /> : card.value}
            </p>
            <p className="text-xs font-semibold text-gray-500">{card.label}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Main row: Chart + Conversion */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Bar Chart - Tren Order */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Tren Order Harian</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">7 hari terakhir · {totalWeeklyOrders} total order</p>
            </div>
            {totalWeeklyOrders > 0 && (
              <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-semibold">
                <TrendingUp size={11} /> Aktif
              </div>
            )}
          </div>
          <BarChart data={weeklyOrders} />
        </div>

        {/* Conversion Rate Donut */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-3">
          <div>
            <h3 className="font-bold text-gray-900 text-sm text-center">Estimasi Konversi</h3>
            <p className="text-[11px] text-gray-400 text-center mt-0.5">Pengunjung → Order Baru</p>
          </div>
          <div className="relative">
            <DonutRing pct={conversionPct} color="#3B82F6" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{conversionPct}%</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full text-center text-xs">
            <div className="bg-blue-50 rounded-xl p-2">
              <p className="font-bold text-blue-700">~{dummyVisits}</p>
              <p className="text-blue-400 text-[10px]">Visits (Est)</p>
            </div>
            <div className="bg-green-50 rounded-xl p-2">
              <p className="font-bold text-green-700">{totalWeeklyOrders}</p>
              <p className="text-green-400 text-[10px]">Order</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Order Terbaru</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">5 order terakhir yang masuk</p>
          </div>
          <Link href="/admin/orders" className="text-xs text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1">
            Lihat Semua <ArrowUpRight size={12} />
          </Link>
        </div>

        {loading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="py-16 text-center">
            <ShoppingBag size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm font-medium">Belum ada order masuk</p>
            <p className="text-gray-300 text-xs mt-1">Order dari landing page akan muncul di sini</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left text-[11px] font-semibold text-gray-400 px-5 py-3 uppercase tracking-wider">Klien</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 px-3 py-3 uppercase tracking-wider hidden md:table-cell">Layanan</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 px-3 py-3 uppercase tracking-wider">Status</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 px-3 py-3 uppercase tracking-wider hidden lg:table-cell">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => {
                  const sc = statusConfig[order.status] ?? statusConfig['Pending']
                  const Icon = sc.icon
                  return (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#0A192F] to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">{order.customer_name.charAt(0).toUpperCase()}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-xs">{order.customer_name}</p>
                            <p className="text-gray-400 text-[10px]">{order.whatsapp}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3.5 hidden md:table-cell">
                        <p className="text-xs text-gray-600 font-medium">{order.service_type}</p>
                      </td>
                      <td className="px-3 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${sc.color}`}>
                          <Icon size={10} /> {sc.label}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 hidden lg:table-cell">
                        <p className="text-xs text-gray-400">{new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
