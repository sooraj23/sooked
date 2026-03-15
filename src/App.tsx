import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Pricing from './components/Pricing'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import CTABanner from './components/CTABanner'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-terminal-bg min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <Process />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
