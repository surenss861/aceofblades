import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

const About = () => {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!textRef.current) return

    const paragraphs = textRef.current.children
    gsap.set(paragraphs, { opacity: 0, y: 30 })
    
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(paragraphs, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out'
        })
      }
    })

    return () => {
      st.kill()
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2>About Ace of Blades</h2>
          <p className="section-subtitle">Scarborough's Premier Barbershop Experience</p>
        </div>
        <div className="about-content">
          <div className="about-text" ref={textRef}>
            <p className="lead">
              Located at <strong>2207 Kingston Rd in Scarborough</strong>, Ace of Blades is more than a barbershop—it's where artistry meets authenticity. We don't just cut hair; we craft confidence, one precise fade at a time.
            </p>
            <p>
              Our philosophy is simple: <strong>100% Talent, 0% Pretentious</strong>. We've built our reputation on delivering sharp fades, clean lineups, and premium grooming services in a space that feels both luxurious and comfortable. Every client walks in as a guest and leaves as family.
            </p>
            <p>
              Our team of master barbers—Ace, Chris, and Dhan—bring decades of combined experience and an unwavering passion for their craft. Whether you're looking for a classic cut, a modern fade, or a complete transformation, we're here to help you look and feel your absolute best.
            </p>
            <p>
              We believe that a great haircut is more than just a service—it's an experience. That's why we've created an environment where you can relax, unwind, and leave looking sharp. Your transformation awaits.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

