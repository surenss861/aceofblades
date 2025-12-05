import { motion } from 'framer-motion'
import './Contact.css'

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2>Visit Us</h2>
          <p className="section-subtitle">We'd love to see you</p>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <h3>Location</h3>
              <address>
                2207 Kingston Rd<br />
                Scarborough, ON<br />
                Canada
              </address>
            </div>
            <div className="contact-item">
              <h3>Contact</h3>
              <p>
                <a href="tel:+1416XXXXXXX">(416) XXX-XXXX</a><br />
                <a href="mailto:info@aceofbladesco.com">info@aceofbladesco.com</a>
              </p>
            </div>
            <div className="contact-item">
              <h3>Hours</h3>
              <p>
                Monday - Saturday<br />
                9:00 AM - 7:00 PM
              </p>
            </div>
            <div className="contact-item">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="https://www.instagram.com/aceofbladesco" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
                <a href="https://g.page/r/XXXXX/review" target="_blank" rel="noopener noreferrer" aria-label="Google Reviews">Google Reviews</a>
              </div>
            </div>
          </div>
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.123456789!2d-79.2500!3d43.7500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDQ1JzAwLjAiTiA3OcKwMTUnMDAuMCJX!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ace of Blades Barbershop Location Map"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

