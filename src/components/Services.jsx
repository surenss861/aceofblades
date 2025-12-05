import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Services.css'

const Services = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const items = gsap.utils.toArray('.service-editorial-item')
    const scrollTriggers = []
    
    items.forEach((item, index) => {
      const image = item.querySelector('.service-image')
      const content = item.querySelector('.service-content')
      
      // Slow, intentional fade + slide animations
      gsap.set([image, content], { 
        opacity: 0.4,
        y: 20
      })
      
      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 75%',
        onEnter: () => {
          gsap.to([image, content], {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            stagger: 0.2
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
      image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1400&h=900&fit=crop&q=90',
      title: 'Precision Haircuts',
      description: 'Every cut is a masterpiece. Our barbers combine traditional techniques with modern artistry to deliver sharp, clean results that complement your unique style and facial structure.',
      price: 'From $45',
      features: ['Custom Consultation', 'Premium Products', 'Expert Styling']
    },
    {
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1400&h=900&fit=crop&q=90',
      title: 'Beard Mastery',
      description: 'From precision trims to full beard transformations. We shape, style, and maintain your facial hair with the attention to detail that defines luxury grooming.',
      price: 'From $35',
      features: ['Hot Towel Treatment', 'Premium Oils', 'Custom Shaping']
    },
    {
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b7d?w=1400&h=900&fit=crop&q=90',
      title: 'Creative Designs',
      description: 'Express your individuality with custom patterns, logos, and artistic designs. Our barbers are artists who turn your vision into wearable art.',
      price: 'From $55',
      features: ['Custom Artwork', 'Precision Tools', 'Unique Patterns']
    },
    {
      image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=1400&h=900&fit=crop&q=90',
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
    <section id="services" className="services modern-luxury-services" ref={sectionRef}>
      <div className="container-wide">
        <div className="section-header asymmetric">
          <p className="section-subtitle">Our Craft</p>
          <h2>Where Precision<br />Meets Artistry</h2>
        </div>

        <div className="services-editorial-list">
          {services.map((service, index) => {
            const isEven = index % 2 === 0
            
            return (
              <div
                key={index}
                className={`service-editorial-item ${isEven ? '' : 'reverse'}`}
              >
                <div className="service-image">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    loading="lazy"
                  />
                  <div className="service-image-overlay" />
                </div>
                
                <div className="service-content">
                  <div className="service-number">0{index + 1}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  
                  <div className="service-features">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="service-feature-item">
                        <span className="feature-separator">—</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="service-price">{service.price}</div>
                  
                  <motion.a
                    href="#book"
                    className="btn btn-outline"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection('#book')
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book This Service
                  </motion.a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
