import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GeoSmartCTA from './GeoSmartCTA'
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
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&h=1080&fit=crop'
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Preload all hero images
    preloadImages(slides)

    // GSAP animations for hero content
    const tl = gsap.timeline({ delay: 0.5 })
    
    tl.from('.hero-title', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    })
    .from('.hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5')
    .from('.hero-cta', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.4')
    .from('.hero-badge', {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: 'back.out(1.7)'
    }, '-=0.3')

    // Parallax effect on scroll
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.to('.hero-slide.active', {
          y: self.progress * 50,
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
    // Auto-slide functionality
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

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
    <section id="home" className="hero" ref={heroRef}>
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

      <div className="hero-controls">
        <motion.button
          className="hero-prev"
          onClick={prevSlide}
          aria-label="Previous slide"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ‹
        </motion.button>
        <motion.button
          className="hero-next"
          onClick={nextSlide}
          aria-label="Next slide"
          whileHover={{ scale: 1.1 }}
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
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      <div className="container">
        <div className="hero-content">
          <GeoSmartCTA />
          <h1 className="hero-title">
            Scarborough's Sharpest Fades.<br />
            <span className="accent-text">Period.</span>
          </h1>
          <p className="hero-subtitle">
            The perfect crossover between luxury and comfort. Experience premium cuts in a relaxed, welcoming atmosphere where artistry meets authenticity.
          </p>
          <div className="hero-cta">
            <motion.a
              href="#book"
              className="btn btn-large btn-primary"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#book')
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Book My Transformation
            </motion.a>
            <motion.a
              href="tel:+1416XXXXXXX"
              className="btn btn-outline btn-large"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Call Now
            </motion.a>
          </div>
          <div className="hero-badge">
            <div className="stars">★★★★★</div>
            <span className="review-count">150+ Five-Star Reviews</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

