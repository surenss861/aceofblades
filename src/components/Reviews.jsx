import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Reviews.css'

const Reviews = () => {
  const sectionRef = useRef(null)
  const carouselRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const header = sectionRef.current?.querySelector('.section-header')
    const scrollTriggers = []
    
    if (header) {
      gsap.set(header, { opacity: 0, y: 40 })
      const headerSt = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(header, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
          })
        }
      })
      scrollTriggers.push(headerSt)
    }

    // Auto-scroll carousel
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)

    return () => {
      clearInterval(interval)
      scrollTriggers.forEach(st => st.kill())
      ScrollTrigger.refresh()
    }
  }, [])

  useEffect(() => {
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        x: `-${currentIndex * 100}%`,
        duration: 0.8,
        ease: 'power3.inOut'
      })
    }
  }, [currentIndex])

  const reviews = [
    {
      stars: '★★★★★',
      text: '"Best barbershop in Scarborough! Ace gave me the cleanest fade I\'ve ever had. The atmosphere is relaxed and professional. Highly recommend!"',
      author: 'Sajid Malgi',
      photo: '/sajidmalgi-test.avif',
      location: 'Scarborough'
    },
    {
      stars: '★★★★★',
      text: '"Chris is amazing with beards! The hot towel shave is a game changer. This place has become my go-to spot for all my grooming needs."',
      author: 'Sharan Tyler',
      photo: '/sharantyler-test.avif',
      location: 'Toronto'
    },
    {
      stars: '★★★★★',
      text: '"Dhan always knows exactly what I want. Great service, great cuts, and the whole team is friendly. Ace of Blades is the real deal!"',
      author: 'Oliver Rahim',
      photo: '/oliverrahim-test.avif',
      location: 'Scarborough'
    },
    {
      stars: '★★★★★',
      text: '"The AOB Presidential package is worth every penny. Complete transformation every time. This is luxury barbering at its finest."',
      author: 'Daniel Thevara',
      photo: '/danielthevara-test.avif',
      location: 'Toronto'
    },
    {
      stars: '★★★★★',
      text: '"Clean cuts, relaxed vibes, and professional service. Been coming here for months and never disappointed. Best barbershop on Kingston Rd!"',
      author: 'Aliyaan Sheikh',
      photo: '/aliyaansheikh-test.avif',
      location: 'Scarborough'
    }
  ]

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section id="reviews" className="reviews luxury-reviews" ref={sectionRef}>
      <div className="container-wide">
        <div className="section-header centered">
          <p className="section-subtitle">Client Testimonials</p>
          <h2>Trusted by Toronto's Elite</h2>
        </div>

        <div className="reviews-carousel-wrapper">
          <button
            className="carousel-nav carousel-prev"
            onClick={prevReview}
            aria-label="Previous review"
          >
            ‹
          </button>

          <div className="reviews-carousel-container">
            <div className="reviews-carousel" ref={carouselRef}>
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  className="review-card luxury-review-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ 
                    opacity: index === currentIndex ? 1 : 0.6,
                    scale: index === currentIndex ? 1 : 0.95
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="review-photo-wrapper">
                    {review.photo && (
                      <img 
                        src={review.photo} 
                        alt={review.author}
                        className="review-photo"
                        loading="lazy"
                      />
                    )}
                    <div className="review-photo-overlay" />
                  </div>
                  
                  <div className="review-content">
                    <div className="review-stars">{review.stars}</div>
                    <blockquote className="review-text">
                      "{review.text}"
                    </blockquote>
                    <div className="review-author-info">
                      <cite className="review-author">{review.author}</cite>
                      <span className="review-location">{review.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <button
            className="carousel-nav carousel-next"
            onClick={nextReview}
            aria-label="Next review"
          >
            ›
          </button>
        </div>

        <div className="reviews-indicators">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`review-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        <div className="reviews-cta">
          <motion.a
            href="https://g.page/r/XXXXX/review"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
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
