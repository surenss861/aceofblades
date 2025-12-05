import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Barbers.css'

const Barbers = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const header = sectionRef.current?.querySelector('.section-header')
    const cards = gsap.utils.toArray('.barber-card')
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
      gsap.set(card, { opacity: 0, y: 50, scale: 0.9 })
      
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: index * 0.15
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
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      name: 'Ace',
      title: 'Owner & Master Barber',
      bio: 'With over 10 years of experience, Ace specializes in precision fades and modern styling. Known for his attention to detail and ability to bring any vision to life.',
      specialty: 'Fades, scissor work, creative designs'
    },
    {
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      name: 'Chris',
      title: 'Senior Barber',
      bio: 'Chris brings a passion for classic cuts and traditional barbering techniques. His expertise in hot towel shaves and beard grooming has made him a customer favorite.',
      specialty: 'Classic cuts, hot towel shaves, beard styling'
    },
    {
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      name: 'Dhan',
      title: 'Expert Barber',
      bio: 'Dhan excels in contemporary styles and creative designs. His friendly personality and technical skill make every visit enjoyable and results consistently impressive.',
      specialty: 'Modern styles, creative designs, precision lineups'
    }
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="barbers" className="barbers" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2>Choose Your Barber</h2>
          <p className="section-subtitle">Meet our skilled team of professionals</p>
        </div>
        <div className="barbers-grid">
          {barbers.map((barber, index) => (
            <motion.div
              key={index}
              className="barber-card"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                className="barber-image"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <img 
                  src={barber.image} 
                  alt={`${barber.name} - ${barber.title}`} 
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x400/1a1a1a/d4af37?text=${encodeURIComponent(barber.name)}`
                  }}
                />
              </motion.div>
              <div className="barber-info">
                <h3>{barber.name}</h3>
                <p className="barber-title">{barber.title}</p>
                <p className="barber-bio">{barber.bio}</p>
                <p className="barber-specialty">
                  <strong>Specializes in:</strong> {barber.specialty}
                </p>
                <motion.a
                  href="#book"
                  className="btn btn-small"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('#book')
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book with {barber.name}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Barbers

