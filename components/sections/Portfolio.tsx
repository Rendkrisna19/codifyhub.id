'use client'

import { useState, useEffect } from 'react'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  client_name: string
  link: string
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6)
      
      if (data) setProjects(data)
      setLoading(false)
    }

    fetchProjects()
  }, [])

  return (
    <section id="portofolio" className="py-24 px-6 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14">
          <div>
            <div className="inline-block mb-3 text-xs font-semibold text-gray-400 tracking-widest uppercase">Hasil Kerja Kami</div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
              Portofolio Project
            </h2>
          </div>
          <p className="text-gray-500 max-w-xs text-sm mt-3 md:mt-0">Sebagian dari ratusan project yang telah kami selesaikan.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-gray-400" size={32} />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[28px] border border-gray-100">
            <p className="text-gray-400 font-medium text-sm">Belum ada portofolio yang ditambahkan.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, i) => {
              // Pilih warna secara bergantian berdasarkan index untuk badge dan gradient
              const colorChoices = ['from-blue-500 to-blue-700', 'from-rose-500 to-rose-700', 'from-violet-500 to-violet-700']
              const color = colorChoices[i % colorChoices.length]
              
              return (
                <div key={project.id} className="group rounded-[28px] bg-white border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col">
                  <div className="relative h-48 overflow-hidden bg-gray-100 flex-shrink-0">
                    {project.image_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-t ${color} opacity-0 group-hover:opacity-60 transition duration-500`} />
                    {project.client_name && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className={`bg-gradient-to-r ${color} text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg`}>
                          {project.client_name}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2" style={{ fontFamily: 'var(--font-display)' }}>{project.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3 flex-1">{project.description}</p>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[#0A192F] font-semibold text-xs hover:gap-2.5 transition-all mt-auto w-fit">
                        Lihat Detail <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
