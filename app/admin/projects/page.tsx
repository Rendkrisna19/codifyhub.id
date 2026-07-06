'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Plus, Pencil, Trash2, ExternalLink, X, Save, Image, Loader2 } from 'lucide-react'
import { Toast, confirmDelete } from '@/lib/swal'

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  client_name: string
  link: string
  created_at: string
}

const emptyForm = { title: '', description: '', image_url: '', client_name: '', link: '' }

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    setLoading(true)
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    setProjects(data ?? [])
    setLoading(false)
  }

  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowForm(true) }
  const openEdit = (p: Project) => { setForm({ title: p.title, description: p.description, image_url: p.image_url, client_name: p.client_name, link: p.link ?? '' }); setEditId(p.id); setShowForm(true) }
  const closeForm = () => { setShowForm(false); setEditId(null) }

  const handleSave = async () => {
    if (!form.title) return
    setSaving(true)
    let err = null
    if (editId) {
      const { error } = await supabase.from('projects').update(form).eq('id', editId)
      err = error
    } else {
      const { error } = await supabase.from('projects').insert([form])
      err = error
    }
    
    setSaving(false)
    if (err) {
      Toast.fire({ icon: 'error', title: 'Gagal menyimpan data!' })
      return
    }
    
    Toast.fire({ icon: 'success', title: editId ? 'Project diupdate!' : 'Project ditambahkan!' })
    await fetchProjects()
    closeForm()
  }

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirmDelete('Hapus project ini?')
    if (!isConfirmed) return
    
    setDeletingId(id)
    const { error } = await supabase.from('projects').delete().eq('id', id)
    setDeletingId(null)
    
    if (error) {
      Toast.fire({ icon: 'error', title: 'Gagal menghapus project!' })
      return
    }
    
    Toast.fire({ icon: 'success', title: 'Project dihapus!' })
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div className="space-y-5">
      {/* Header action */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Total <span className="font-bold text-gray-800">{projects.length}</span> project terdaftar</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-[#0A192F] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-900 transition shadow-sm">
          <Plus size={16} /> Tambah Project
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="h-44 bg-gray-100 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 text-center">
          <FolderIcon />
          <p className="text-gray-400 text-sm font-medium mt-3">Belum ada project</p>
          <p className="text-gray-300 text-xs mt-1">Klik &quot;Tambah Project&quot; untuk mulai mengisi portofolio</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300">
              <div className="relative h-44 bg-gray-100 overflow-hidden">
                {p.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image size={28} className="text-gray-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                  <button onClick={() => openEdit(p)} className="bg-white text-gray-800 p-2 rounded-xl shadow-md hover:bg-gray-50 transition">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(p.id)} disabled={deletingId === p.id} className="bg-red-500 text-white p-2 rounded-xl shadow-md hover:bg-red-600 transition">
                    {deletingId === p.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{p.title}</h3>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 transition flex-shrink-0">
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
                {p.client_name && <p className="text-[10px] text-blue-600 font-semibold mb-1.5 bg-blue-50 inline-block px-2 py-0.5 rounded-full">{p.client_name}</p>}
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={e => e.target === e.currentTarget && closeForm()}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900 text-base">{editId ? 'Edit Project' : 'Tambah Project Baru'}</h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600 transition"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              {[
                { key: 'title', label: 'Nama Project *', placeholder: 'Sistem Informasi ...' },
                { key: 'client_name', label: 'Nama Klien', placeholder: 'PT. / CV. / ...' },
                { key: 'image_url', label: 'URL Gambar', placeholder: 'https://...' },
                { key: 'link', label: 'Link Demo (Opsional)', placeholder: 'https://...' },
              ].map(field => (
                <div key={field.key}>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">{field.label}</label>
                  <input
                    value={(form as any)[field.key]}
                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Deskripsi</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition resize-none"
                  placeholder="Jelaskan fitur dan teknologi yang digunakan..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={closeForm} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">Batal</button>
              <button onClick={handleSave} disabled={saving || !form.title}
                className="flex-1 py-2.5 rounded-xl bg-[#0A192F] text-white text-sm font-semibold hover:bg-gray-900 transition flex items-center justify-center gap-2 disabled:opacity-60">
                {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FolderIcon() {
  return (
    <div className="w-16 h-16 bg-gray-100 rounded-2xl mx-auto flex items-center justify-center">
      <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
      </svg>
    </div>
  )
}
