'use client'

import { useRef } from 'react'

const images = [
  '/instansi/1.jpg',
  '/instansi/2.png',
  '/instansi/3.png',
  // Duplicate for seamless track (since only 3 images are available)
  '/instansi/1.jpg',
  '/instansi/2.png',
  '/instansi/3.png',
]

export default function ClientsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  // duplicate for seamless loop
  const items = [...images, ...images]

  return (
    <section className="py-16 bg-white overflow-hidden relative">
      {/* Edge fade - updated to white */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-white to-transparent" />

      <div ref={trackRef} className="marquee-track flex items-center">
        {items.map((src, i) => (
          <div
            key={i}
            className="flex items-center justify-center mx-8 min-w-max"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={src} 
              alt={`Client logo ${i}`} 
              className="h-16 md:h-20 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
