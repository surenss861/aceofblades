import { useState } from 'react'
import { motion } from 'framer-motion'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Integrate with your email service
    console.log('Newsletter signup:', email)
    
    if (window.gtag) {
      window.gtag('event', 'newsletter_signup', {
        event_category: 'Lead Generation',
        event_label: 'Footer Newsletter'
      })
    }

    setSubmitted(true)
    setEmail('')
    
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter-content">
          <h2>Stay Sharp</h2>
          <p>Subscribe to our newsletter for styling tips, exclusive offers, and the latest trends.</p>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <motion.button
                type="submit"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>
          ) : (
            <motion.div
              className="newsletter-success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span className="success-icon">✓</span>
              <span>Thank you for subscribing!</span>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Newsletter

