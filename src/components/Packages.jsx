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
      gsap.set(header, { opacity: 0, y: 40 })
      const headerSt = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(header, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
          })
        }
      })
      scrollTriggers.push(headerSt)
    }
    
    cards.forEach((card, index) => {
      gsap.set(card, { opacity: 0, y: 60, scale: 0.95 })
      
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            delay: index * 0.2
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
      title: 'The Presidential',
      subtitle: 'Complete Luxury Experience',
      price: '$95',
      originalPrice: '$120',
      features: [
        'Precision Haircut',
        'Professional Beard Trim',
        'Hot Towel Shave',
        'Hair Wash & Conditioning',
        'Premium Styling Products',
        'Complimentary Consultation'
      ],
      highlight: true
    },
    {
      featured: false,
      title: 'The Executive',
      subtitle: 'Professional Grooming',
      price: '$75',
      features: [
        'Premium Haircut',
        'Beard Trim & Styling',
        'Hair Wash',
        'Finishing Products',
        'Style Consultation'
      ]
    },
    {
      featured: false,
      title: 'The Classic',
      subtitle: 'Essential Grooming',
      price: '$60',
      features: [
        'Professional Haircut',
        'Beard Trim',
        'Styling',
        'Product Application'
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
    <section id="packages" className="packages luxury-packages" ref={sectionRef}>
      <div className="packages-background" />
      <div className="container-wide">
        <div className="section-header centered">
          <p className="section-subtitle">Premium Packages</p>
          <h2>Complete Grooming Experiences</h2>
          <p className="section-description">
            Curated packages designed to elevate your entire grooming routine
          </p>
        </div>

        <div className="packages-grid">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className={`package-card ${pkg.featured ? 'featured' : ''}`}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {pkg.badge && (
                <div className="package-badge">
                  <span className="badge-text">{pkg.badge}</span>
                  <div className="badge-ribbon" />
                </div>
              )}
              
              <div className="package-header">
                <h3 className="package-title">{pkg.title}</h3>
                <p className="package-subtitle">{pkg.subtitle}</p>
              </div>

              <div className="package-pricing">
                {pkg.originalPrice && (
                  <span className="package-original-price">{pkg.originalPrice}</span>
                )}
                <div className="package-price-wrapper">
                  <span className="package-currency">$</span>
                  <span className="package-price">{pkg.price.replace('$', '')}</span>
                </div>
              </div>

              <ul className="package-features">
                {pkg.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="feature-check">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href="#book"
                className={`package-cta ${pkg.featured ? 'btn-primary' : 'btn-outline'}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('#book')
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Reserve This Package
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Packages
