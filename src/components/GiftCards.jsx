import { useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

const GiftCards = () => {
  const sectionRef = useRef(null)
  const [selectedAmount, setSelectedAmount] = useState(50)
  const [recipientEmail, setRecipientEmail] = useState('')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const header = sectionRef.current?.querySelector('.section-header')
    const cards = gsap.utils.toArray('.gift-card-option')
    const scrollTriggers = []
    
    if (header) {
      gsap.set(header, { opacity: 0, y: 30 })
      const headerSt = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          })
        }
      })
      scrollTriggers.push(headerSt)
    }
    
    cards.forEach((card, index) => {
      gsap.set(card, { opacity: 0, y: 30 })
      
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
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

  const amounts = [25, 50, 100, 150, 200, 250]

  const handlePurchase = (e) => {
    e.preventDefault()
    // Track conversion
    if (window.gtag) {
      window.gtag('event', 'gift_card_purchase', {
        event_category: 'E-commerce',
        event_label: `$${selectedAmount} Gift Card`,
        value: selectedAmount
      })
    }
    // Here you would integrate with payment processor
    alert(`Gift card purchase initiated for $${selectedAmount}`)
  }

  return (
    <section id="gift-cards" className="gift-cards" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2>Gift Cards</h2>
          <p className="section-subtitle">Give the gift of style. Perfect for any occasion.</p>
        </div>
        
        <div className="gift-cards-content">
          <div className="gift-cards-info">
            <h3>Why Choose Our Gift Cards?</h3>
            <ul className="gift-cards-features">
              <li>✓ Instant email delivery</li>
              <li>✓ Never expires</li>
              <li>✓ Works for all services</li>
              <li>✓ Add to Apple Wallet</li>
              <li>✓ Printable PDF option</li>
            </ul>
          </div>

          <div className="gift-cards-form">
            <h3>Select Amount</h3>
            <div className="gift-card-amounts">
              {amounts.map((amount) => (
                <motion.button
                  key={amount}
                  className={`gift-card-option ${selectedAmount === amount ? 'selected' : ''}`}
                  onClick={() => setSelectedAmount(amount)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ${amount}
                </motion.button>
              ))}
            </div>

            <motion.button
              className="btn btn-primary btn-large"
              onClick={() => setShowForm(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Purchase ${selectedAmount} Gift Card
            </motion.button>

            {showForm && (
              <motion.form
                className="gift-card-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                onSubmit={handlePurchase}
              >
                <input
                  type="email"
                  placeholder="Recipient email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  required
                  className="gift-card-input"
                />
                <div className="gift-card-form-actions">
                  <motion.button
                    type="submit"
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Complete Purchase
                  </motion.button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GiftCards

