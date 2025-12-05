import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './BeforeAfter.css'

const BeforeAfter = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const header = sectionRef.current?.querySelector('.section-header')
    const items = gsap.utils.toArray('.before-after-item')
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
    
    items.forEach((item, index) => {
      gsap.set(item, { opacity: 0, scale: 0.8, rotation: -5 })
      
      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
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

  const images = [
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b7d?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=600&fit=crop'
  ]

  return (
    <section id="before-after" className="before-after" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2>Our Work</h2>
          <p className="section-subtitle">See the transformation. Real results from real clients.</p>
        </div>
        <div className="before-after-grid">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="before-after-item"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="before-after-image">
                <img 
                  src={image} 
                  alt={`Transformation ${index + 1}`} 
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/600x600/1a1a1a/d4af37?text=Before+%26+After+${index + 1}`
                  }}
                />
                <div className="before-after-label before">Before</div>
                <div className="before-after-label after">After</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BeforeAfter

