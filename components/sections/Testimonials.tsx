const testimonials = [
  {
    name: 'Reza Pratama',
    role: 'Mahasiswa Teknik Informatika, UNAIR',
    text: 'Sempurna banget! Skripsi sistem informasiku selesai jauh sebelum deadline dan coding-nya rapi banget. Dosen pembimbing juga puas. Highly recommended!',
    rating: 5,
    avatar: 'R',
    color: 'bg-blue-500',
  },
  {
    name: 'Siti Rahayu',
    role: 'Owner Butik Batik Nusantara',
    text: 'Website tokonya keren banget, order online langsung naik 3x lipat dalam sebulan pertama. Pelayanan tim CodifyHub juga cepat dan responsif.',
    rating: 5,
    avatar: 'S',
    color: 'bg-rose-500',
  },
  {
    name: 'Budi Santoso',
    role: 'IT Manager, PT. Maju Bersama',
    text: 'Sistem inventory yang mereka buat sudah sangat membantu operasional gudang kami. Fitur barcode scan-nya akurat dan dashboard-nya mudah dipakai semua staff.',
    rating: 5,
    avatar: 'B',
    color: 'bg-violet-500',
  },
  {
    name: 'Anisa Wulandari',
    role: 'Mahasiswi S1 Sistem Informasi, ITS',
    text: 'Awalnya ragu, tapi hasilnya melampaui ekspektasi. Project TA-ku tentang e-learning dikerjain dengan detail dan bisa saya presentasikan dengan percaya diri.',
    rating: 5,
    avatar: 'A',
    color: 'bg-emerald-500',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonial" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-3 text-xs font-semibold text-gray-400 tracking-widest uppercase">Kata Mereka</div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Testimoni Klien
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">Kepercayaan klien adalah aset terbesar kami.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-[#F8FAFC] rounded-[24px] p-7 border border-gray-100 hover:shadow-md transition-all duration-300 group">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({length: t.rating}).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`${t.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
