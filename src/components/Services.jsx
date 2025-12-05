import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Services.css'

const Services = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const items = gsap.utils.toArray('.service-item')
    const scrollTriggers = []
    
    items.forEach((item, index) => {
      const isEven = index % 2 === 0
      gsap.set(item, { 
        opacity: 0, 
        x: isEven ? -100 : 100,
        scale: 0.95
      })
      
      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
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

  const services = [
    {
      image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1200&h=800&fit=crop&q=90',
      title: 'Precision Haircuts',
      description: 'Every cut is a masterpiece. Our barbers combine traditional techniques with modern artistry to deliver sharp, clean results that complement your unique style and facial structure.',
      price: 'From $45',
      features: ['Custom Consultation', 'Premium Products', 'Expert Styling']
    },
    {
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&h=800&fit=crop&q=90',
      title: 'Beard Mastery',
      description: 'From precision trims to full beard transformations. We shape, style, and maintain your facial hair with the attention to detail that defines luxury grooming.',
      price: 'From $35',
      features: ['Hot Towel Treatment', 'Premium Oils', 'Custom Shaping']
    },
    {
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b7d?w=1200&h=800&fit=crop&q=90',
      title: 'Creative Designs',
      description: 'Express your individuality with custom patterns, logos, and artistic designs. Our barbers are artists who turn your vision into wearable art.',
      price: 'From $55',
      features: ['Custom Artwork', 'Precision Tools', 'Unique Patterns']
    },
    {
      image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=1200&h=800&fit=crop&q=90',
      title: 'Hot Towel Shave',
      description: 'Experience the timeless luxury of a traditional straight razor shave. Hot towels, premium products, and masterful technique for the smoothest shave of your life.',
      price: 'From $40',
      features: ['Straight Razor', 'Hot Towels', 'Premium Balms']
    }
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="services" className="services luxury-services" ref={sectionRef}>
      <div className="container-wide">
        <div className="section-header asymmetric">
          <p className="section-subtitle">Our Craft</p>
          <h2>Where Precision Meets Artistry</h2>
          <p className="section-description">
            Each service is delivered with meticulous attention to detail, 
            using only the finest products and techniques.
          </p>
        </div>

        <div className="services-list">
          {services.map((service, index) => {
            const isEven = index % 2 === 0
            return (
              <motion.div
                key={index}
                className={`service-item ${isEven ? 'left' : 'right'}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <div className={`service-content-wrapper ${isEven ? '' : 'reverse'}`}>
                  <div className="service-image-wrapper">
                    <div className="service-image">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        loading="lazy"
                      />
                      <div className="service-image-overlay" />
                    </div>
                    <div className="service-number">0{index + 1}</div>
                  </div>
                  
                  <div className="service-text-wrapper">
                    <div className="service-price-tag">{service.price}</div>
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>
                    
                    <ul className="service-features">
                      {service.features.map((feature, idx) => (
                        <li key={idx}>
                          <span className="feature-icon">—</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <motion.a
                      href={`#book?service=${encodeURIComponent(service.title)}`}
                      className="service-cta-link"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection('#book')
                      }}
                      whileHover={{ x: 5 }}
                    >
                      Book This Service
                      <span className="arrow">→</span>
                    </motion.a>
                  </div>
                </div>
                
                {index < services.length - 1 && (
                  <div className="service-divider">
                    <div className="divider-line" />
                    <div className="divider-accent" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
