import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initMagneticButton } from '../utils/magneticButton'

// Preload images
const preloadImages = (urls) => {
  urls.forEach(url => {
    const img = new Image()
    img.src = url
  })
}

const Hero = () => {
  const heroRef = useRef(null)
  const textRef = useRef(null)
  const ctaRef = useRef(null)
  const magneticBtnRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    '/herobg1.jpeg',
    '/herobg2.jpeg'
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Preload all hero images
    preloadImages(slides)

    // Set initial state - make sure content is visible
    if (textRef.current && ctaRef.current) {
      gsap.set([textRef.current, ctaRef.current], { opacity: 1, y: 0 })
    }

    // Slow zoom on hero image (cinematic entrance)
    gsap.from('.hero-slide.active', {
      scale: 1.08,
      duration: 3,
      ease: 'power2.out'
    })

    // Luxury fade-up animation with gold underline
    const tl = gsap.timeline({ delay: 0.5 })
    
    if (textRef.current) {
      const line1 = textRef.current.querySelector('.hero-headline-line1')
      const line2 = textRef.current.querySelector('.hero-headline-line2')
      const underline = textRef.current.querySelector('.hero-gold-underline')
      
      if (line1) {
        gsap.set(line1, { opacity: 0, y: 40 })
        tl.to(line1, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out'
        })
      }
      
      if (line2) {
        gsap.set(line2, { opacity: 0, y: 30 })
        tl.to(line2, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out'
        }, '-=0.8')
      }
      
      if (underline) {
        gsap.set(underline, { scaleX: 0, opacity: 0 })
        tl.to(underline, {
          scaleX: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          transformOrigin: 'left center'
        }, '-=0.5')
      }
    }
    
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { opacity: 0, y: 25 })
      tl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=0.6')
    }

    // Parallax mouse-follow lighting effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const xPercent = (clientX / innerWidth) * 100
      const yPercent = (clientY / innerHeight) * 100
      
      gsap.to('.hero-slide.active', {
        backgroundPosition: `${xPercent}% ${yPercent}%`,
        duration: 2,
        ease: 'power1.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Slow parallax scroll effect - luxury feel
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 2,
      onUpdate: (self) => {
        const progress = self.progress
        // Slow, cinematic parallax on hero image
        gsap.to('.hero-slide.active', {
          y: progress * 20,
          scale: 1 + progress * 0.02,
          ease: 'none'
        })
        // Subtle content movement
        gsap.to('.hero-content', {
          y: progress * 15,
          ease: 'none'
        })
      }
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === heroRef.current) {
          st.kill()
        }
      })
    }
  }, [])

  // Initialize magnetic button effect
  useEffect(() => {
    if (magneticBtnRef.current) {
      const cleanup = initMagneticButton(magneticBtnRef.current)
      return cleanup
    }
  }, [])

  useEffect(() => {
    // Slow auto-slide
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000)

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
            <div className="hero-overlay" />
            <div className="hero-grain" />
          </div>
        ))}
      </div>

      {/* Right-side gradient for text readability */}
      <div className="hero-text-gradient" />
      
      {/* Brand signature elements */}
      <div className="hero-brand-pattern" />
      
      {/* Hero Content - Bottom Right Positioning */}
      <div className="hero-content-wrapper">
        <div className="hero-content">
          <div className="hero-headline-wrapper" ref={textRef}>
            <h1 className="hero-headline-line1">Precision meets artistry.</h1>
            <h2 className="hero-headline-line2">Crafted for Toronto's modern gentleman.</h2>
            <div className="hero-gold-underline" />
          </div>
          
          <div className="hero-cta-wrapper" ref={ctaRef}>
            <motion.a
              ref={magneticBtnRef}
              href="#book"
              className="btn btn-primary magnetic-btn hero-cta-primary"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#book')
              }}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(201, 168, 106, 0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              Reserve Your Appointment
            </motion.a>
            <motion.a
              href="#barbers"
              className="btn btn-outline-gold hero-cta-secondary"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#barbers')
              }}
              whileHover={{ scale: 1.02, borderColor: 'var(--muted-gold)' }}
              whileTap={{ scale: 0.98 }}
            >
              Find Your Stylist
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
