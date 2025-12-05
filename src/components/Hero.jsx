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

    // Cinematic entrance animation
    const tl = gsap.timeline({ delay: 0.3 })
    
    // Title animation - split text effect
    tl.from(titleRef.current, {
      opacity: 0,
      y: 80,
      duration: 1.2,
      ease: 'power3.out'
    })
    .from('.hero-title-line-2', {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.8')
    .from(subtitleRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power2.out'
    }, '-=0.6')
    .from(ctaRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.95,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, '-=0.4')
    .from('.hero-badge', {
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3')

    // Parallax scroll effect
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        gsap.to('.hero-slide.active', {
          y: self.progress * 80,
          scale: 1 + self.progress * 0.1,
          ease: 'none'
        })
        gsap.to('.hero-content', {
          y: self.progress * 40,
          opacity: 1 - self.progress * 0.5,
          ease: 'none'
        })
      }
    })

    // Floating animation for badge
    gsap.to('.hero-badge', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
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
    // Auto-slide functionality
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero luxury-hero" ref={heroRef}>
      {/* Background Texture Layer */}
      <div className="hero-texture" />
      
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
          </div>
        ))}
      </div>

      {/* Floating Book Button */}
      <motion.a
        href="#book"
        className="hero-floating-cta"
        onClick={(e) => {
          e.preventDefault()
          scrollToSection('#book')
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>Book Now</span>
      </motion.a>

      <div className="hero-controls">
        <motion.button
          className="hero-prev"
          onClick={prevSlide}
          aria-label="Previous slide"
          whileHover={{ scale: 1.15, x: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          ‹
        </motion.button>
        <motion.button
          className="hero-next"
          onClick={nextSlide}
          aria-label="Next slide"
          whileHover={{ scale: 1.15, x: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          ›
        </motion.button>
      </div>

      <div className="hero-indicators">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            className={`hero-indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1}`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      <div className="container-wide">
        <div className="hero-content luxury-hero-content">
          {/* Asymmetric Layout */}
          <div className="hero-text-wrapper">
            <motion.p 
              className="hero-label"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Toronto's Premier Grooming Experience
            </motion.p>
            
            <h1 className="hero-title" ref={titleRef}>
              <span className="hero-title-line-1">Crafted Cuts,</span>
              <br />
              <span className="hero-title-line-2 accent-text">Unmatched Detail.</span>
            </h1>
            
            <p className="hero-subtitle" ref={subtitleRef}>
              Where precision meets artistry. Experience the luxury grooming standard that Toronto's elite trust.
            </p>
            
            <div className="hero-cta" ref={ctaRef}>
              <motion.a
                href="#book"
                className="btn btn-large btn-primary magnetic-btn"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('#book')
                }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Reserve Your Appointment
              </motion.a>
            </div>
          </div>

          <div className="hero-badge">
            <div className="stars">★★★★★</div>
            <span className="review-count">150+ Five-Star Reviews</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="hero-scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>Scroll</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  )
}

export default Hero
