import { useState } from 'react'
import { motion } from 'framer-motion'

const ReferralProgram = () => {
  const [referralCode, setReferralCode] = useState('')
  const [userCode, setUserCode] = useState('AOB-FRIEND-2024')
  const [copied, setCopied] = useState(false)

  const generateCode = () => {
    // In production, this would generate a unique code from your backend
    const newCode = `AOB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    setUserCode(newCode)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}?ref=${userCode}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareLink = (platform) => {
    const link = `${window.location.origin}?ref=${userCode}`
    const text = `Get $10 off your first visit at Ace of Blades! Use my code: ${userCode}`
    
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + link)}`)
    } else if (platform === 'email') {
      window.location.href = `mailto:?subject=Get $10 off at Ace of Blades&body=${encodeURIComponent(text + ' ' + link)}`
    }
  }

  return (
    <section className="referral-program">
      <div className="container">
        <motion.div
          className="referral-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="referral-icon">🎁</div>
          <h2>Refer a Friend, Get Rewarded</h2>
          <p className="referral-subtitle">Give $10, Get $10. Share the Ace of Blades experience!</p>
          
          <div className="referral-box">
            <h3>Your Referral Code</h3>
            <div className="referral-code-display">
              <input
                type="text"
                value={userCode}
                readOnly
                className="referral-code-input"
              />
              <motion.button
                className="btn btn-primary"
                onClick={copyToClipboard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? '✓ Copied!' : 'Copy Link'}
              </motion.button>
            </div>
            
            <p className="referral-instructions">
              Share your code with friends. When they book using your code, you both get $10 off!
            </p>

            <div className="referral-share">
              <h4>Share via:</h4>
              <div className="referral-share-buttons">
                <motion.button
                  className="referral-share-btn"
                  onClick={() => shareLink('whatsapp')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  WhatsApp
                </motion.button>
                <motion.button
                  className="referral-share-btn"
                  onClick={() => shareLink('email')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Email
                </motion.button>
              </div>
            </div>
          </div>

          <div className="referral-benefits">
            <div className="referral-benefit">
              <span className="benefit-icon">💰</span>
              <h4>Earn Credits</h4>
              <p>$10 for every successful referral</p>
            </div>
            <div className="referral-benefit">
              <span className="benefit-icon">👥</span>
              <h4>Unlimited Referrals</h4>
              <p>No limit on how many friends you can refer</p>
            </div>
            <div className="referral-benefit">
              <span className="benefit-icon">⚡</span>
              <h4>Instant Rewards</h4>
              <p>Credits applied immediately after booking</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ReferralProgram

