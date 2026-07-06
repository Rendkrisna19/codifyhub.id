export default function Footer() {
  return (
    <footer className="bg-[#060D1A] border-t border-white/5 py-10 px-6 text-center">
      <div className="flex items-center justify-center gap-2.5 mb-3">
        <div className="w-6 h-6 flex-shrink-0">
          <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
        <span className="font-bold text-base text-white" style={{ fontFamily: 'var(--font-display)' }}>CodifyHub.id</span>
      </div>
      <p className="text-gray-500 text-xs">© {new Date().getFullYear()} CodifyHub.id — Solusi Digital Terpercaya untuk Skripsi, UMKM & Corporate.</p>
    </footer>
  )
}
