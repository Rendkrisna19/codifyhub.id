export type PricingPackage = {
  id: string
  name: string
  target: string
  description: string
  originalPrice: string
  price: string
  period?: string
  features: string[]
  isPopular?: boolean
}

export type ServiceCategory = {
  id: string
  title: string
  packages: PricingPackage[]
}

export const servicesData: ServiceCategory[] = [
  {
    id: 'mahasiswa',
    title: 'Mahasiswa IT',
    packages: [
      {
        id: 'mhs-1',
        name: 'Joki Tugas Kuliah',
        target: 'Tugas Harian / Mingguan',
        description: 'Bantuan pengerjaan tugas coding ringan, algoritma, UML, dan UI/UX dasar.',
        originalPrice: 'Rp 50.000',
        price: 'Rp 10.000',
        period: '/ Tugas',
        features: [
          'Joki Koding (C++, Java, Python, dll)',
          'Joki Tugas Web & Aplikasi',
          'Joki UML & Desain Database',
          'Joki Desain UI/UX',
          'Selesai 1-3 Hari',
          'Revisi tak terbatas'
        ]
      },
      {
        id: 'mhs-2',
        name: 'Joki Skripsi / Sistem',
        target: 'Tugas Akhir & Skripsi',
        description: 'Pengerjaan full sistem informasi atau aplikasi skripsi beserta laporan bab.',
        originalPrice: 'Rp 2.500.000',
        price: 'Rp 500.000',
        period: '/ Project',
        isPopular: true,
        features: [
          'Sistem Informasi (Web/Mobile/Desktop)',
          'Source Code Rapi & Mudah Dipahami',
          'Gratis Konsultasi & Bimbingan',
          'Revisi Sampai ACC Dosen',
          'Bantuan Setup ke Laptop',
          'Bonus Jurnal / Paper'
        ]
      },
      {
        id: 'mhs-3',
        name: 'Mentoring Private',
        target: 'Belajar Coding',
        description: 'Bimbingan belajar koding langsung dari ahli untuk persiapan project atau skripsi.',
        originalPrice: 'Rp 300.000',
        price: 'Rp 100.000',
        period: '/ Sesi',
        features: [
          'Sesi Zoom 1.5 Jam',
          'Bedah Source Code',
          'Latihan Studi Kasus',
          'Paham Fundamental',
          'Tips & Trik Cepat Koding',
          'Bebas Tanya Jawab'
        ]
      }
    ]
  },
  {
    id: 'umkm',
    title: 'UMKM & Bisnis Baru',
    packages: [
      {
        id: 'umkm-1',
        name: 'Landing Page',
        target: 'Bisnis Baru & UMKM',
        description: 'Website satu halaman yang dirancang untuk konversi dan promosi produk.',
        originalPrice: 'Rp 800.000',
        price: 'Rp 300.000',
        period: '/ Web',
        features: [
          'Desain Modern & Responsif',
          'Gratis Domain & Hosting 1 Tahun',
          'Integrasi WhatsApp & Sosial Media',
          'SEO Basic (Google Index)',
          'Gratis SSL (HTTPS)',
          'Selesai dalam 3 Hari'
        ]
      },
      {
        id: 'umkm-2',
        name: 'Toko Online (E-Commerce)',
        target: 'Jualan Produk Fisik/Digital',
        description: 'Website katalog produk dengan fitur keranjang belanja dan checkout otomatis.',
        originalPrice: 'Rp 2.500.000',
        price: 'Rp 1.200.000',
        period: '/ Web',
        isPopular: true,
        features: [
          'Sistem Kasir Digital Terintegrasi',
          'Hitung Ongkir Otomatis',
          'Payment Gateway (Transfer/OVO/Dana)',
          'Gratis Domain & Hosting 1 Tahun',
          'Panel Admin Kelola Produk',
          'Maintenance & Support'
        ]
      },
      {
        id: 'umkm-3',
        name: 'Redesign Website',
        target: 'Pembaruan Tampilan',
        description: 'Perbarui website lama Anda menjadi lebih modern, cepat, dan mobile-friendly.',
        originalPrice: 'Rp 1.500.000',
        price: 'Rp 750.000',
        period: '/ Web',
        features: [
          'Analisa UI/UX Web Lama',
          'Desain Ulang Lebih Modern',
          'Optimasi Kecepatan (PageSpeed)',
          'Perbaikan Bug & Error',
          'Mobile Responsive Terjamin',
          'SEO & Meta Tag Update'
        ]
      }
    ]
  },
  {
    id: 'enterprise',
    title: 'Enterprise & Perusahaan',
    packages: [
      {
        id: 'ent-1',
        name: 'Company Profile',
        target: 'Website Perusahaan',
        description: 'Website profesional multi-halaman untuk branding dan profil perusahaan.',
        originalPrice: 'Rp 3.500.000',
        price: 'Rp 1.800.000',
        period: '/ Web',
        features: [
          'Desain Custom Eksklusif',
          'Halaman Tak Terbatas',
          'Gratis Domain (.com/.id) & Hosting Cloud',
          'Email Perusahaan Resmi (anda@pt.com)',
          'Optimasi SEO Lanjutan',
          'Keamanan Ekstra & Backup Berkala'
        ]
      },
      {
        id: 'ent-2',
        name: 'Custom Development',
        target: 'Sistem Internal',
        description: 'Pengembangan aplikasi web atau mobile custom sesuai alur bisnis (ERP, CRM, dll).',
        originalPrice: 'Rp 10.000.000',
        price: 'Rp 5.000.000',
        period: '/ Sistem',
        isPopular: true,
        features: [
          'Analisa Proses Bisnis Mendalam',
          'Web, Mobile (iOS/Android), atau Desktop',
          'Integrasi API (Payment, Maps, dll)',
          'Dashboard & Reporting Real-time',
          'Support & Maintenance Prioritas',
          'Garansi Bebas Bug 1 Tahun'
        ]
      },
      {
        id: 'ent-3',
        name: 'Advanced IoT & AI',
        target: 'Solusi Teknologi Canggih',
        description: 'Implementasi Internet of Things (IoT) atau Artificial Intelligence pada sistem Anda.',
        originalPrice: 'Rp 20.000.000',
        price: 'Rp 8.000.000',
        period: '/ Project',
        features: [
          'Hardware & Software IoT Terintegrasi',
          'Machine Learning / AI Implementation',
          'Big Data Analytics',
          'Arsitektur Cloud Scalable',
          'Dokumentasi Teknis Lengkap',
          'Pelatihan Staff / Karyawan'
        ]
      }
    ]
  }
]
