import { motion } from 'framer-motion'
import './Footer.css'

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
        <div className="footer-content">
          <div className="footer-section">
            <img src="/aceofbladeslogo.avif" alt="Ace of Blades Logo" className="footer-logo" />
            <p>Scarborough's sharpest fades. Premium barbershop experience.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('#services') }}>Services</a></li>
              <li><a href="#barbers" onClick={(e) => { e.preventDefault(); scrollToSection('#barbers') }}>Barbers</a></li>
              <li><a href="#reviews" onClick={(e) => { e.preventDefault(); scrollToSection('#reviews') }}>Reviews</a></li>
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('#faq') }}>FAQ</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('#contact') }}>Location</a></li>
              <li><a href="tel:+1416XXXXXXX">Call Us</a></li>
              <li><a href="mailto:info@aceofbladesco.com">Email</a></li>
              <li><a href="#book" onClick={(e) => { e.preventDefault(); scrollToSection('#book') }}>Book Now</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <ul>
              <li><a href="https://www.instagram.com/aceofbladesco" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://g.page/r/XXXXX/review" target="_blank" rel="noopener noreferrer">Google Reviews</a></li>
            </ul>
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

