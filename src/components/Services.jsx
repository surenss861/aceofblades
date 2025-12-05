import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Services = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const items = gsap.utils.toArray('.service-editorial-item')
    const scrollTriggers = []
    
    items.forEach((item, index) => {
      const image = item.querySelector('.service-image-full')
      const content = item.querySelector('.service-content-editorial')
      
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
      image: '/haircut-beard.avif',
      title: 'Haircut + Beard',
      description: 'The complete transformation. A precision haircut paired with expert beard grooming for the ultimate gentleman\'s look. Every detail is crafted to perfection.',
      price: 'From $65',
      features: ['Full Haircut', 'Beard Trim & Shape', 'Premium Styling Products', 'Hot Towel Treatment']
    },
    {
      image: '/design.webp',
      title: 'Design',
      description: 'Express your individuality with custom patterns, logos, and artistic designs. Our barbers are artists who turn your vision into wearable art.',
      price: 'From $55',
      features: ['Custom Artwork', 'Precision Tools', 'Unique Patterns', 'Creative Consultation']
    },
    {
      image: '/beardtrim-lineup.avif',
      title: 'Beard Trim / Lineup',
      description: 'From precision trims to flawless lineups. We shape, style, and maintain your facial hair with the attention to detail that defines luxury grooming.',
      price: 'From $35',
      features: ['Precision Trim', 'Clean Lineup', 'Premium Oils', 'Hot Towel Treatment']
    },
    {
      image: '/kidscut.avif',
      title: 'Kids Cut',
      description: 'A gentle, patient approach to children\'s haircuts. We make the experience comfortable and fun while delivering sharp, clean results your little one will love.',
      price: 'From $30',
      features: ['Child-Friendly Environment', 'Patient Styling', 'Fun Experience', 'Quality Cut']
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
                <div className="service-image-full">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    loading="lazy"
                  />
                  <div className="service-image-overlay" />
                </div>
                
                <div className="service-content-editorial">
                  <div className="service-number-large">0{index + 1}</div>
                  <h3 className="service-title-editorial">{service.title}</h3>
                  <div className="service-gold-divider" />
                  <p className="service-description-editorial">{service.description}</p>
                  
                  <div className="service-features-editorial">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="service-feature-item-editorial">
                        <span className="feature-separator-gold">—</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <motion.a
                    href="#book"
                    className="btn btn-primary service-cta-editorial"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection('#book')
                    }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book Now
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
