import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Barbers = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const header = sectionRef.current?.querySelector('.section-header')
    const items = gsap.utils.toArray('.barber-spotlight-item')
    const scrollTriggers = []
    
    if (header) {
      gsap.set(header, { opacity: 0.4, y: 20 })
      const headerSt = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(header, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out'
          })
        }
      })
      scrollTriggers.push(headerSt)
    }
    
    items.forEach((item, index) => {
      const image = item.querySelector('.barber-portrait')
      const content = item.querySelector('.barber-spotlight-content')
      
      gsap.set([image, content], { 
        opacity: 0.4,
        y: 20
      })
      
      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 75%',
        onEnter: () => {
          gsap.to([image, content], {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            stagger: 0.15,
            delay: index * 0.2
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

  const barbers = [
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&q=90',
      name: 'Ace',
      title: 'Owner & Master Barber',
      experience: '10+ Years',
      bio: 'The visionary behind Ace of Blades. Ace brings over a decade of mastery to every cut, specializing in precision fades that have become legendary in Scarborough.',
      specialty: 'Precision Fades • Creative Designs • Scissor Mastery',
      signatureQuote: '"Every cut is a statement. Every line is intentional."'
    },
    {
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1000&fit=crop&q=90',
      name: 'Chris',
      title: 'Senior Barber',
      experience: '8+ Years',
      bio: 'A master of the classics. Chris combines traditional barbering techniques with modern precision, delivering flawless hot towel shaves and impeccable beard work.',
      specialty: 'Hot Towel Shaves • Beard Mastery • Classic Cuts',
      signatureQuote: '"Tradition meets precision. That\'s where mastery lives."'
    },
    {
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=1000&fit=crop&q=90',
      name: 'Dhan',
      title: 'Expert Barber',
      experience: '6+ Years',
      bio: 'The creative force. Dhan excels at bringing your vision to life with contemporary styles and artistic flair. Every cut is a collaboration.',
      specialty: 'Modern Styles • Creative Designs • Color Work',
      signatureQuote: '"Your vision, my craft. Together we create art."'
    }
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="barbers" className="barbers modern-luxury-barbers" ref={sectionRef}>
      <div className="container-wide">
        <div className="section-header centered">
          <p className="section-subtitle">The Artists</p>
          <h2>Master Barbers<br />Behind Every Cut</h2>
        </div>

        <div className="barbers-spotlight-list">
          {barbers.map((barber, index) => (
            <div
              key={index}
              className="barber-spotlight-item"
            >
              <div className="barber-spotlight-background" />
              
              <div className="barber-portrait-wrapper">
                <div className="barber-portrait">
                  <img 
                    src={barber.image} 
                    alt={barber.name}
                    loading="lazy"
                  />
                  {/* Gold ring frame */}
                  <div className="barber-ring-frame" />
                  {/* Cinematic spotlight effect */}
                  <div className="barber-spotlight-effect" />
                </div>
              </div>

              <div className="barber-spotlight-content">
                <div className="barber-experience-label">{barber.experience}</div>
                <h3 className="barber-name">{barber.name}</h3>
                <p className="barber-title">{barber.title}</p>
                <p className="barber-bio">{barber.bio}</p>
                <div className="barber-signature-quote">{barber.signatureQuote}</div>
                <div className="barber-specialty">{barber.specialty}</div>
                
                <motion.a
                  href="#book"
                  className="barber-cta-link"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('#book')
                  }}
                  whileHover={{ x: 5 }}
                >
                  Book with {barber.name}
                  <span className="arrow">→</span>
                </motion.a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Barbers
