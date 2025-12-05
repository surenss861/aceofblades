import { useState } from 'react'
import { motion } from 'framer-motion'
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
          ease: 'power2.out'
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
    <section id="book" className="booking" ref={sectionRef}>
      <div className="container">
        <div className="booking-content">
          <div className="booking-text">
            <h2>Ready to Look Sharp?</h2>
            <p>Book your appointment with one of our expert barbers and experience the Ace of Blades difference.</p>
            <div className="booking-features">
              <div className="booking-feature">
                <span className="feature-icon">✓</span>
                <span>Easy online booking</span>
              </div>
              <div className="booking-feature">
                <span className="feature-icon">✓</span>
                <span>Choose your barber</span>
              </div>
              <div className="booking-feature">
                <span className="feature-icon">✓</span>
                <span>Flexible scheduling</span>
              </div>
            </div>
          </div>
          <div className="booking-cta">
            <motion.button
              className="btn btn-large btn-primary"
              onClick={() => setShowBookingModal(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Your Appointment
            </motion.button>
            <motion.a
              href="tel:+1416XXXXXXX"
              className="btn btn-large btn-outline"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Call to Book
            </motion.a>
          </div>
        </div>
      </div>
      <BookingProgress isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />
    </section>
  )
}

export default Booking

