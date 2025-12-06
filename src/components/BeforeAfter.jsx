import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const BeforeAfter = () => {
  const sectionRef = useRef(null)
  const [revealPositions, setRevealPositions] = useState({})

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const header = sectionRef.current?.querySelector('.section-header')
    const items = gsap.utils.toArray('.before-after-item')
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
    
    items.forEach((item, index) => {
      gsap.set(item, { opacity: 0, scale: 0.9, rotation: -3 })
      
      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
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

  const handleMouseMove = (index, e) => {
    const container = e.currentTarget
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = (x / rect.width) * 100
    setRevealPositions(prev => ({ ...prev, [index]: Math.max(0, Math.min(100, percent)) }))
  }

  const handleMouseLeave = (index) => {
    // Optionally reset to 50% on leave, or keep position
    // setRevealPositions(prev => ({ ...prev, [index]: 50 }))
  }

  const handleTouchMove = (index, e) => {
    const container = e.currentTarget
    const rect = container.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - rect.left
    const percent = (x / rect.width) * 100
    setRevealPositions(prev => ({ ...prev, [index]: Math.max(0, Math.min(100, percent)) }))
  }

  const transformations = [
    {
      before: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=600&fit=crop&q=90',
      after: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=600&fit=crop&q=90',
      title: 'Classic Fade Transformation'
    },
    {
      before: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b7d?w=600&h=600&fit=crop&q=90',
      after: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=600&fit=crop&q=90',
      title: 'Modern Style Upgrade'
    },
    {
      before: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=600&fit=crop&q=90',
      after: 'https://images.unsplash.com/photo-1622296242089-6c5e0e1e0e1e?w=600&h=600&fit=crop&q=90',
      title: 'Complete Grooming Package'
    },
    {
      before: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=600&fit=crop&q=90',
      after: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=600&fit=crop&q=90',
      title: 'Beard Mastery'
    }
  ]

  return (
    <section id="before-after" className="before-after" ref={sectionRef}>
      <div className="container-wide">
        <div className="section-header centered">
          <p className="section-subtitle">Transformations</p>
          <h2>Real Results. Real Confidence.</h2>
          <p className="section-description">
            Every cut is a transformation. See the precision and artistry that defines our work.
          </p>
        </div>
        <div className="before-after-grid">
          {transformations.map((item, index) => {
            const revealPercent = revealPositions[index] ?? 50
            
            return (
              <motion.div
                key={index}
                className="before-after-item"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                <div 
                  className="before-after-slider-container"
                  onMouseMove={(e) => handleMouseMove(index, e)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  onTouchMove={(e) => handleTouchMove(index, e)}
                >
                  {/* Before image (background) */}
                  <div className="before-after-image before-image">
                    <img 
                      src={item.before} 
                      alt={`Before - ${item.title}`}
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                    <span className="before-after-label before">Before</span>
                  </div>
                  
                  {/* After image (revealed on drag/hover) */}
                  <div 
                    className="before-after-image after-image"
                    style={{ clipPath: `inset(0 ${100 - revealPercent}% 0 0)` }}
                  >
                    <img 
                      src={item.after} 
                      alt={`After - ${item.title}`}
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                    <span className="before-after-label after">After</span>
                  </div>
                  
                  {/* Drag handle */}
                  <div 
                    className="before-after-handle"
                    style={{ left: `${revealPercent}%` }}
                  >
                    <div className="handle-line" />
                    <div className="handle-circle">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="before-after-title">{item.title}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BeforeAfter
