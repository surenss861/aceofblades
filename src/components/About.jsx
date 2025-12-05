import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

const About = () => {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

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
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out'
        })
      }
    })

    // Image animation
    if (imageRef.current) {
      gsap.from(imageRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
    }

    return () => {
      st.kill()
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <section id="about" className="about luxury-about" ref={sectionRef}>
      <div className="about-background-decoration" />
      <div className="container-wide">
        <div className="about-content-wrapper">
          <div className="about-image-section" ref={imageRef}>
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=1000&fit=crop&q=90" 
                alt="Ace of Blades Barbershop Interior"
                loading="lazy"
              />
              <div className="about-image-overlay" />
              <div className="about-image-badge">
                <span className="badge-number">4+</span>
                <span className="badge-label">Years of Excellence</span>
              </div>
            </div>
          </div>

          <div className="about-text-section">
            <div className="section-header asymmetric">
              <p className="section-subtitle">Our Story</p>
              <h2>More Than a Cut.<br />A Transformation.</h2>
            </div>
            
            <div className="about-text" ref={textRef}>
              <p className="lead">
                At <strong className="accent-text">2207 Kingston Rd</strong>, we've built something special. This isn't just a barbershop—it's where confidence is crafted, one precise line at a time.
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

            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">150+</div>
                <div className="stat-label">Five-Star Reviews</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">4+</div>
                <div className="stat-label">Years Serving Toronto</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">3</div>
                <div className="stat-label">Master Barbers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
