import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './TrustBadges.css'

const TrustBadges = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const badges = gsap.utils.toArray('.trust-item')
    const scrollTriggers = []
    
    badges.forEach((badge, index) => {
      gsap.set(badge, { opacity: 0, y: 50 })
      
      const st = ScrollTrigger.create({
        trigger: badge,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(badge, {
            opacity: 1,
            y: 0,
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

  const badges = [
    { icon: '✓', title: 'Premium Quality', desc: 'Expert barbers with years of experience' },
    { icon: '★', title: '150+ Reviews', desc: 'Rated 4.9/5 on Google' },
    { icon: '✂️', title: 'Premium Products', desc: 'Only the finest grooming essentials' },
    { icon: '💎', title: 'Luxury Experience', desc: 'Where comfort meets sophistication' }
  ]

  return (
    <section className="trust-badges" ref={sectionRef}>
      <div className="container">
        <div className="trust-grid">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              className="trust-item"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="trust-icon">{badge.icon}</div>
              <h3>{badge.title}</h3>
              <p>{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustBadges

