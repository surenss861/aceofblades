import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './StickyBooking.css'

const StickyBooking = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section
      const heroHeight = window.innerHeight
      setIsVisible(window.scrollY > heroHeight * 0.5)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      
      // Track sticky booking click
      if (window.gtag) {
        window.gtag('event', 'sticky_booking_click', {
          event_category: 'Booking',
          event_label: 'Sticky Button'
        })
      }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="sticky-booking"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <motion.a
            href="#book"
            className="sticky-booking-btn"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#book')
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Book Now
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default StickyBooking

