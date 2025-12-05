import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import './EmailCapture.css'

const EmailCapture = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Exit intent detection (primary trigger)
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        const hasSeenPopup = localStorage.getItem('emailCaptureSeen')
        if (!hasSeenPopup) {
          setIsOpen(true)
        }
      }
    }

    // Show popup after 5 seconds (fallback)
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('emailCaptureSeen')
      if (!hasSeenPopup && !isOpen) {
        setIsOpen(true)
      }
    }, 5000)

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would integrate with your email service (Mailchimp, Klaviyo, etc.)
    console.log('Email submitted:', email)
    
    // Track conversion
    if (window.gtag) {
      window.gtag('event', 'email_signup', {
        event_category: 'Lead Generation',
        event_label: 'Email Capture Popup'
      })
    }

    setSubmitted(true)
    localStorage.setItem('emailCaptureSeen', 'true')
    
    setTimeout(() => {
      setIsOpen(false)
      setEmail('')
      setSubmitted(false)
    }, 2000)
  }

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('emailCaptureSeen', 'true')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="email-capture-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className="email-capture-popup"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <button
              className="email-capture-close"
              onClick={handleClose}
              aria-label="Close"
            >
              ×
            </button>
            
            {!submitted ? (
              <>
                <div className="email-capture-content">
                  <h2>Wait! Don't Miss Out 🎁</h2>
                  <p>Get 10% off your first visit when you join our newsletter. Plus exclusive offers, styling tips, and early access to special promotions.</p>
                  <form onSubmit={handleSubmit} className="email-capture-form">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="email-capture-input"
                    />
                    <motion.button
                      type="submit"
                      className="btn btn-primary email-capture-submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Claim My Discount
                    </motion.button>
                  </form>
                  <p className="email-capture-disclaimer">
                    By signing up, you agree to receive marketing emails. Unsubscribe anytime.
                  </p>
                </div>
              </>
            ) : (
              <motion.div
                className="email-capture-success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="success-icon">✓</div>
                <h2>Thank You!</h2>
                <p>Check your email for your 10% discount code.</p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default EmailCapture

