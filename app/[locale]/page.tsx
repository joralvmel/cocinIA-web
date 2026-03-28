import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { FAQ } from '@/components/sections/FAQ'
import { Features } from '@/components/sections/Features'
import { Hero } from '@/components/sections/Hero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Pricing } from '@/components/sections/Pricing'
import { Screenshots } from '@/components/sections/Screenshots'
import { Waitlist } from '@/components/sections/Waitlist'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[--bg] text-[--ink]">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Screenshots />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <Waitlist />
      </main>
      <Footer />
    </div>
  )
}
