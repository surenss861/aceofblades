import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initAnalytics } from './utils/analytics'
import SEOHead from './components/SEOHead'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBadges from './components/TrustBadges'
import About from './components/About'
import Services from './components/Services'
import BeforeAfter from './components/BeforeAfter'
import Barbers from './components/Barbers'
import Reviews from './components/Reviews'
import Gallery from './components/Gallery'
import FAQ from './components/FAQ'
import Booking from './components/Booking'
import Contact from './components/Contact'
import Blog from './components/Blog'
import Newsletter from './components/Newsletter'
import StickyBooking from './components/StickyBooking'
import Loader from './components/Loader'
import StylistRecommender from './components/StylistRecommender'
import SocialFeed from './components/SocialFeed'
import ClientStories from './components/ClientStories'
import Footer from './components/Footer'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)
    
    // Page transition setup
    gsap.set('.App', { opacity: 0 })
    gsap.to('.App', {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    })
    
    // Refresh ScrollTrigger after all components mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    // Initialize analytics
    initAnalytics()

    return () => {
      clearTimeout(timer)
      // Cleanup all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <div className="App">
      <Loader />
      <SEOHead />
      <Navbar />
      <Hero />
      <TrustBadges />
      <About />
      <Services />
      <BeforeAfter />
      <Barbers />
      <Reviews />
      <Gallery />
      <ClientStories />
      <FAQ />
      <Blog />
      <SocialFeed />
      <Booking />
      <Contact />
      <Newsletter />
      <Footer />
      <StickyBooking />
      <StylistRecommender />
    </div>
  )
}

export default App

