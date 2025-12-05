import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import './Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Slow, intentional GSAP animation for navbar on scroll
    gsap.to('.navbar', {
      backgroundColor: isScrolled ? 'rgba(12, 12, 12, 0.98)' : 'rgba(12, 12, 12, 0.95)',
      boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.4)' : '0 2px 16px rgba(0, 0, 0, 0.3)',
      duration: 0.6,
      ease: 'power2.out'
    })
  }, [isScrolled])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Barbers', href: '#barbers' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' }
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-wrapper">
          <motion.a
            href="#home"
            className="logo"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#home')
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/aceofbladeslogo.avif" alt="Ace of Blades Logo" className="logo-img" />
          </motion.a>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>

          <motion.ul
            className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
            initial={false}
            animate={isMenuOpen ? { x: 0 } : { x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(link.href)
                      }}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                >
                  <a
                    href="#book"
                    className="nav-link btn-primary"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection('#book')
                    }}
                  >
                    Book Now
                  </a>
                </motion.li>
          </motion.ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

