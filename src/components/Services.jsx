import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Services.css'

const Services = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const header = sectionRef.current?.querySelector('.section-header')
    const cards = gsap.utils.toArray('.service-card')
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
      gsap.set(card, { opacity: 0, y: 50, scale: 0.9 })
      
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: index * 0.1
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

  const services = [
    {
      image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=400&fit=crop',
      title: 'Hair & Styling',
      description: 'Precision cuts and modern styling tailored to your unique look. From classic cuts to contemporary styles, we deliver sharp, clean results every time.',
      price: 'From $45'
    },
    {
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop',
      title: 'Haircut + Beard',
      description: 'Complete grooming package combining a precision haircut with professional beard trimming and styling. The ultimate head-to-chin transformation.',
      price: 'From $45'
    },
    {
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b7d?w=600&h=400&fit=crop',
      title: 'Design',
      description: 'Creative patterns, logos, and designs shaved into your hair. Express your individuality with custom artwork that sets you apart.',
      price: 'From $45'
    },
    {
      image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=400&fit=crop',
      title: 'Hot Towel Shave',
      description: 'Traditional straight razor shave with hot towels for the ultimate luxury experience. Smooth, close shave with premium products and expert technique.',
      price: 'From $45'
    },
    {
      image: 'https://images.unsplash.com/photo-1622296242089-6c5e0e1e0e1e?w=600&h=400&fit=crop',
      title: 'AOB Presidential',
      description: 'Our signature premium package featuring haircut, beard trim, hot towel shave, hair wash, and styling. The complete luxury grooming experience.',
      price: 'From $45'
    }
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="services" className="services" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2>Our Services</h2>
          <p className="section-subtitle">Premium grooming services tailored to your style. Every cut is crafted with precision, passion, and attention to detail.</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="service-image">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/600x400/1a1a1a/d4af37?text=${encodeURIComponent(service.title)}`
                  }}
                />
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-price">{service.price}</div>
                <motion.a
                  href={`#book?service=${encodeURIComponent(service.title)}`}
                  className="btn btn-small"
                  onClick={(e) => {
                    e.preventDefault()
                    // Track service click
                    if (window.gtag) {
                      window.gtag('event', 'service_view', {
                        event_category: 'Services',
                        event_label: service.title
                      })
                    }
                    scrollToSection('#book')
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book This Service
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

