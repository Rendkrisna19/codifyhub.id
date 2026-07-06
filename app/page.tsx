import CustomCursor from '@/components/ui/CustomCursor'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import ClientsCarousel from '@/components/sections/ClientsCarousel'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import Testimonials from '@/components/sections/Testimonials'
import CTASection from '@/components/sections/CTASection'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <main className="flex-1 flex flex-col min-h-screen bg-white">
        <Navbar />
        <Hero />
        <ClientsCarousel />
        <Services />
        <Portfolio />
        <Testimonials />
        <CTASection />
        <Footer />
      </main>
    </>
  )
}
