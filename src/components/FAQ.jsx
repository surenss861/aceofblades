import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './FAQ.css'

const FAQ = () => {
  const sectionRef = useRef(null)
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const header = sectionRef.current?.querySelector('.section-header')
    const items = gsap.utils.toArray('.faq-item')
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
    
    items.forEach((item, index) => {
      gsap.set(item, { opacity: 0, y: 20 })
      
      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: index * 0.05
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

  const faqs = [
    {
      question: 'What services do you offer?',
      answer: 'We offer a full range of barbering services including haircuts, fades, beard trims, lineups, hot towel shaves, hair washes, and our signature AOB Presidential package. Check out our Services section for detailed descriptions and pricing.'
    },
    {
      question: 'How much do services cost?',
      answer: 'Our services start at $45. Pricing varies based on the specific service and any add-ons. The "From $45" indicates our base starting price, with premium services and packages priced accordingly. Contact us or book online for exact pricing.'
    },
    {
      question: 'Do I need to book an appointment?',
      answer: 'While walk-ins are welcome based on availability, we highly recommend booking an appointment to ensure you get your preferred barber and time slot. You can book online through our booking system or call us directly.'
    },
    {
      question: 'What is the AOB Presidential package?',
      answer: 'The AOB Presidential is our premium signature package that includes a precision haircut, professional beard trim, hot towel shave, hair wash, and styling. It\'s our complete luxury grooming experience designed to leave you looking and feeling your absolute best.'
    },
    {
      question: 'What are your hours?',
      answer: 'We\'re open Monday through Saturday, 9:00 AM to 7:00 PM. Hours may vary on holidays, so please check our booking system or call ahead to confirm.'
    },
    {
      question: 'Where are you located?',
      answer: 'We\'re located at 2207 Kingston Rd, Scarborough, ON. Easily accessible with parking available. See our Contact section for directions and a map.'
    },
    {
      question: 'Can I choose my barber?',
      answer: 'Absolutely! You can select your preferred barber when booking. Each of our barbers—Ace, Chris, and Dhan—has their own specialties and style. Check out our Barbers section to learn more about each team member.'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="faq" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`faq-item ${openIndex === index ? 'active' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <motion.span
                  className="faq-icon"
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ

