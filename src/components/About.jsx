import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initSectionHeaderAnimation } from '../utils/sectionAnimations'

const About = () => {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Staggered header animation
    const cleanupHeader = initSectionHeaderAnimation(sectionRef)

    if (!textRef.current) return

    const paragraphs = textRef.current.children
    gsap.set(paragraphs, { opacity: 0, y: 40 })
    
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(paragraphs, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out'
        })
      }
    })

    // Stats animation
    const stats = sectionRef.current?.querySelectorAll('.stat-item-editorial')
    if (stats && stats.length > 0) {
      gsap.set(stats, { opacity: 0, y: 30 })
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => {
          gsap.to(stats, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power2.out'
          })
        }
      })
    }

    return () => {
      st.kill()
      if (cleanupHeader) cleanupHeader()
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <section id="about" className="about luxury-about-editorial" ref={sectionRef}>
      <div className="container-narrow">
        {/* Editorial Layout with Gold Vertical Line */}
        <div className="about-editorial-wrapper">
          <div className="about-gold-line" />
          
          <div className="about-editorial-content">
            <div className="about-header-editorial">
              <p className="section-subtitle">Our Story</p>
              <h2 className="about-title-editorial">
                More Than a Cut.<br />
                <span className="about-title-accent">A Transformation.</span>
              </h2>
            </div>
            
            <div className="about-text-editorial" ref={textRef}>
              <p className="about-pull-quote">
                "At <strong>2207 Kingston Rd</strong>, we've built something special. This isn't just a barbershop—it's where confidence is crafted, one precise line at a time."
              </p>
              
              <p>
                <strong className="accent-text">100% Talent. 0% Pretentious.</strong> That's our promise. We've earned our reputation by delivering razor-sharp fades, flawless lineups, and premium grooming services in an atmosphere that feels both luxurious and genuinely welcoming.
              </p>
              
              <p>
                Our master barbers—<strong>Ace, Chris, and Dhan</strong>—bring decades of combined expertise and an unshakeable passion for perfection. Every cut is a conversation. Every style is a statement. Every client leaves feeling unstoppable.
              </p>
              
              <p>
                We believe your look should match your ambition. That's why we've created a space where you can relax, recharge, and walk out looking like the best version of yourself. <strong>Your transformation starts here.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section - Editorial Style */}
        <div className="about-stats-editorial">
          <div className="stat-item-editorial">
            <div className="stat-number-editorial">150+</div>
            <div className="stat-label-editorial">Five-Star Reviews</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item-editorial">
            <div className="stat-number-editorial">4+</div>
            <div className="stat-label-editorial">Years Serving Toronto</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item-editorial">
            <div className="stat-number-editorial">3</div>
            <div className="stat-label-editorial">Master Barbers</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
