import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

// Preload images
const preloadImages = (urls) => {
  urls.forEach(url => {
    const img = new Image()
    img.src = url
  })
}

const Hero = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const underlineRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1920&h=1080&fit=crop&q=90',
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1920&h=1080&fit=crop&q=90',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&h=1080&fit=crop&q=90'
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Preload all hero images
    preloadImages(slides)

    // Slow, intentional cinematic entrance animation
    const tl = gsap.timeline({ delay: 0.5 })
    
    // Hero image scales from 1.05 → 1.0 (cinematic)
    gsap.from('.hero-slide.active', {
      scale: 1.05,
      duration: 2,
      ease: 'power2.out'
    })
    
    // Title fades in from 20px lower (luxury motion)
    tl.from(titleRef.current, {
      opacity: 0,
      y: 20,
      duration: 1.5,
      ease: 'power2.out'
    })
    // Gold accent underline draws in
    .from(underlineRef.current, {
      scaleX: 0,
      duration: 1.2,
      ease: 'power2.out',
      transformOrigin: 'left'
    }, '-=1')
    .from(subtitleRef.current, {
      opacity: 0.4,
      y: 10,
      duration: 1.2,
      ease: 'power2.out'
    }, '-=0.8')
    .from(ctaRef.current, {
      opacity: 0.4,
      y: 10,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.6')

    // Parallax scroll effect (2-3% movement - subtle and cinematic)
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
      onUpdate: (self) => {
        const progress = self.progress
        // Subtle 2-3% parallax movement
        gsap.to('.hero-slide.active', {
          y: progress * 30, // 30px max = ~3% of 1000px viewport
          ease: 'none'
        })
        // Content fades slightly as you scroll
        gsap.to('.hero-content', {
          opacity: 1 - progress * 0.3,
          y: progress * 20,
          ease: 'none'
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === heroRef.current) {
          st.kill()
        }
      })
    }
  }, [])

  useEffect(() => {
    // Slow auto-slide (luxury timing)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000) // Slower for luxury feel

    return () => clearInterval(interval)
  }, [slides.length])

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero modern-luxury-hero" ref={heroRef}>
      {/* Full-bleed cinematic background */}
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ 
              backgroundImage: `url(${slide})`,
            }}
          >
            {/* Cinematic overlay with vignette */}
            <div className="hero-overlay" />
            {/* Soft grain texture */}
            <div className="hero-grain" />
          </div>
        ))}
      </div>

      {/* Editorial content layout */}
      <div className="container-wide">
        <div className="hero-content">
          <div className="hero-text-wrapper">
            <motion.p 
              className="hero-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              EST. 2020
            </motion.p>
            
            <h1 className="hero-title" ref={titleRef}>
              Where Every Cut<br />
              <span className="accent-text">Tells Your Story</span>
            </h1>
            
            {/* Gold accent underline */}
            <div className="hero-underline" ref={underlineRef} />
            
            <p className="hero-subtitle" ref={subtitleRef}>
              Precision meets artistry. Where Toronto's most discerning gentlemen trust their transformation.
            </p>
            
            <div className="hero-cta" ref={ctaRef}>
              <motion.a
                href="#book"
                className="btn btn-primary magnetic-btn"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('#book')
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Reserve Your Appointment
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - minimal */}
      <motion.div 
        className="hero-scroll-indicator"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="scroll-line" />
      </motion.div>
    </section>
  )
}

export default Hero
