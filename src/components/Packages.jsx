import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Packages.css'

const Packages = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const header = sectionRef.current?.querySelector('.section-header')
    const cards = gsap.utils.toArray('.package-card')
    const scrollTriggers = []
    
    if (header) {
      gsap.set(header, { opacity: 0, y: 30 })
      const headerSt = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          })
        }
      })
      scrollTriggers.push(headerSt)
    }
    
    cards.forEach((card, index) => {
      gsap.set(card, { opacity: 0, y: 50, scale: 0.95 })
      
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            delay: index * 0.15
          })
        }
      })
      
      scrollTriggers.push(st)
    })

    return () => {
      scrollTriggers.forEach(st => st.kill())
      ScrollTrigger.refresh()
    }
  }, [])

  const packages = [
    {
      featured: true,
      badge: 'Most Popular',
      title: 'The Complete Gentleman',
      price: '$95',
      features: [
        '✓ Precision Haircut',
        '✓ Professional Beard Trim',
        '✓ Hot Towel Shave',
        '✓ Hair Wash & Styling',
        '✓ Premium Products'
      ]
    },
    {
      featured: false,
      title: 'The Executive',
      price: '$75',
      features: [
        '✓ Premium Haircut',
        '✓ Beard Trim & Styling',
        '✓ Hair Wash',
        '✓ Finishing Products'
      ]
    },
    {
      featured: false,
      title: 'The Classic',
      price: '$60',
      features: [
        '✓ Professional Haircut',
        '✓ Beard Trim',
        '✓ Styling'
      ]
    }
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="packages" className="packages" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2>Premium Packages</h2>
          <p className="section-subtitle">Complete grooming experiences designed to elevate your look</p>
        </div>
        <div className="packages-grid">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className={`package-card ${pkg.featured ? 'featured' : ''}`}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {pkg.badge && <div className="package-badge">{pkg.badge}</div>}
              <h3>{pkg.title}</h3>
              <div className="package-price">{pkg.price}</div>
              <ul className="package-features">
                {pkg.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <motion.a
                href="#book"
                className={`btn btn-large ${pkg.featured ? 'btn-primary' : 'btn-outline'}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('#book')
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book This Package
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Packages

