import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Contact = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const items = gsap.utils.toArray('.contact-item')
    items.forEach((item, index) => {
      gsap.set(item, { opacity: 0, y: 40 })
      
      ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.15
          })
        }
      })
    })

    return () => {
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <section id="contact" className="contact luxury-contact" ref={sectionRef}>
      <div className="container-wide">
        <div className="section-header centered">
          <p className="section-subtitle">Visit Us</p>
          <h2>Your Transformation Awaits</h2>
          <p className="section-description">
            Located in the heart of Scarborough. Walk-ins welcome, appointments preferred.
          </p>
        </div>
        <div className="contact-content-wrapper">
          <div className="contact-info">
            <motion.div 
              className="contact-item"
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="contact-icon">📍</div>
              <h3>Location</h3>
              <address>
                2207 Kingston Rd<br />
                Scarborough, ON<br />
                Canada
              </address>
            </motion.div>
            
            <motion.div 
              className="contact-item"
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="contact-icon">📞</div>
              <h3>Call Us</h3>
              <p>
                <a href="tel:+1416XXXXXXX" className="contact-link">(416) XXX-XXXX</a>
              </p>
              <p>
                <a href="mailto:info@aceofbladesco.com" className="contact-link">info@aceofbladesco.com</a>
              </p>
            </motion.div>
            
            <motion.div 
              className="contact-item"
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="contact-icon">🕐</div>
              <h3>Hours</h3>
              <p>
                <strong>Monday - Saturday</strong><br />
                9:00 AM - 7:00 PM<br />
                <span className="hours-note">Closed Sundays</span>
              </p>
            </motion.div>
            
            <motion.div 
              className="contact-item"
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="contact-icon">✨</div>
              <h3>Connect</h3>
              <div className="social-links">
                <a 
                  href="https://www.instagram.com/aceofbladesco" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
                <a 
                  href="https://g.page/r/XXXXX/review" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  aria-label="Google Reviews"
                >
                  Google Reviews
                </a>
              </div>
            </motion.div>
          </div>
          
          <div className="contact-map-wrapper">
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.123456789!2d-79.2500!3d43.7500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDQ1JzAwLjAiTiA3OcKwMTUnMDAuMCJX!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 'var(--radius-xl)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ace of Blades Barbershop Location Map"
              />
              <div className="map-overlay" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
