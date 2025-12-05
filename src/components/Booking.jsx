import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import BookingProgress from './BookingProgress'
import './Booking.css'

const Booking = () => {
  const sectionRef = useRef(null)
  const [showBookingModal, setShowBookingModal] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const content = document.querySelector('.booking-content')
    if (!content) return

    gsap.set(content, { opacity: 0, y: 50 })
    
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(content, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        })
      }
    })

    return () => {
      st.kill()
      ScrollTrigger.refresh()
    }
  }, [])

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="book" className="booking luxury-booking" ref={sectionRef}>
      <div className="booking-background-decoration" />
      <div className="container-wide">
        <div className="booking-content">
          <div className="booking-text-section">
            <div className="section-header asymmetric">
              <p className="section-subtitle">Reserve Your Spot</p>
              <h2>Ready to Transform Your Look?</h2>
              <p className="booking-description">
                Book your appointment with one of our master barbers. Experience the precision, artistry, and confidence that comes with every cut at Ace of Blades.
              </p>
            </div>
            
            <div className="booking-features">
              <motion.div 
                className="booking-feature"
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">✓</span>
                </div>
                <span className="feature-text">Easy Online Booking</span>
              </motion.div>
              <motion.div 
                className="booking-feature"
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">✓</span>
                </div>
                <span className="feature-text">Choose Your Barber</span>
              </motion.div>
              <motion.div 
                className="booking-feature"
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">✓</span>
                </div>
                <span className="feature-text">Flexible Scheduling</span>
              </motion.div>
              <motion.div 
                className="booking-feature"
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">✓</span>
                </div>
                <span className="feature-text">Instant Confirmation</span>
              </motion.div>
            </div>
          </div>

          <div className="booking-cta-section">
            <motion.div
              className="booking-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'power3.out' }}
            >
              <div className="booking-card-header">
                <h3>Book Your Appointment</h3>
                <p>Select your preferred barber and time slot</p>
              </div>
              
              <motion.button
                className="btn btn-large btn-primary booking-button"
                onClick={() => setShowBookingModal(true)}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Now
              </motion.button>
              
              <div className="booking-alternative">
                <p>Prefer to call?</p>
                <a href="tel:+1416XXXXXXX" className="booking-phone">
                  (416) XXX-XXXX
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showBookingModal && (
          <BookingProgress onClose={() => setShowBookingModal(false)} />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Booking
