import { motion } from 'framer-motion'

const Footer = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content-simplified">
          <div className="footer-brand">
            <img src="/aceofbladeslogo.avif" alt="Ace of Blades Logo" className="footer-logo" />
          </div>
          <div className="footer-info-row">
            <div className="footer-address">
              <p>2207 Kingston Rd, Scarborough, ON</p>
            </div>
            <div className="footer-contact">
              <a href="tel:+1416XXXXXXX">Call Us</a>
              <span className="footer-separator">•</span>
              <a href="mailto:info@aceofbladesco.com">Email</a>
            </div>
            <div className="footer-social">
              <a href="https://www.instagram.com/aceofbladesco" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Ace of Blades Barbershop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

