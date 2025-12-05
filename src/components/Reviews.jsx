import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Reviews.css'

const Reviews = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const header = sectionRef.current?.querySelector('.section-header')
    const cards = gsap.utils.toArray('.review-card')
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
      const xOffset = index % 2 === 0 ? -50 : 50
      gsap.set(card, { opacity: 0, x: xOffset })
      
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            x: 0,
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

  const reviews = [
    {
      stars: '★★★★★',
      text: '"Best barbershop in Scarborough! Ace gave me the cleanest fade I\'ve ever had. The atmosphere is relaxed and professional. Highly recommend!"',
      author: 'Sajid Malgi',
      photo: '/sajidmalgi-test.avif'
    },
    {
      stars: '★★★★★',
      text: '"Chris is amazing with beards! The hot towel shave is a game changer. This place has become my go-to spot for all my grooming needs."',
      author: 'Sharan Tyler',
      photo: '/sharantyler-test.avif'
    },
    {
      stars: '★★★★★',
      text: '"Dhan always knows exactly what I want. Great service, great cuts, and the whole team is friendly. Ace of Blades is the real deal!"',
      author: 'Oliver Rahim',
      photo: '/oliverrahim-test.avif'
    },
    {
      stars: '★★★★★',
      text: '"The AOB Presidential package is worth every penny. Complete transformation every time. This is luxury barbering at its finest."',
      author: 'Daniel Thevara',
      photo: '/danielthevara-test.avif'
    },
    {
      stars: '★★★★★',
      text: '"Clean cuts, relaxed vibes, and professional service. Been coming here for months and never disappointed. Best barbershop on Kingston Rd!"',
      author: 'Aliyaan Sheikh',
      photo: '/aliyaansheikh-test.avif'
    }
  ]

  return (
    <section id="reviews" className="reviews" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2>What Our Clients Say</h2>
          <p className="section-subtitle">★★★★★ 150+ Five-Star Reviews</p>
        </div>
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <motion.blockquote
              key={index}
              className="review-card"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="review-header">
                {review.photo && (
                  <img 
                    src={review.photo} 
                    alt={review.author}
                    className="review-photo"
                    loading="lazy"
                  />
                )}
                <div className="review-header-text">
                  <div className="review-stars">{review.stars}</div>
                  <cite className="review-author">{review.author}</cite>
                </div>
              </div>
              <p className="review-text">{review.text}</p>
            </motion.blockquote>
          ))}
        </div>
        <div className="reviews-cta">
          <motion.a
            href="https://g.page/r/XXXXX/review"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-large"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Read More Reviews
          </motion.a>
        </div>
      </div>
    </section>
  )
}

export default Reviews

