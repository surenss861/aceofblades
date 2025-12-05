import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
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
    
    if (header) {
      gsap.set(header, { opacity: 0.4, y: 20 })
      ScrollTrigger.create({
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
    }

    // Slow auto-scroll (luxury timing)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 8000)

    return () => {
      clearInterval(interval)
      ScrollTrigger.refresh()
    }
  }, [])

  useEffect(() => {
    if (carouselRef.current) {
      // Slow, intentional scroll animation
      gsap.to(carouselRef.current, {
        x: `-${currentIndex * 100}%`,
        duration: 1.2,
        ease: 'power2.inOut'
      })
    }
  }, [currentIndex])

  const reviews = [
    {
      stars: '★★★★★',
      text: 'Best barbershop in Scarborough! Ace gave me the cleanest fade I\'ve ever had. The atmosphere is relaxed and professional. Highly recommend!',
      author: 'Sajid Malgi',
      photo: '/sajidmalgi-test.avif',
      location: 'Scarborough'
    },
    {
      stars: '★★★★★',
      text: 'Chris is amazing with beards! The hot towel shave is a game changer. This place has become my go-to spot for all my grooming needs.',
      author: 'Sharan Tyler',
      photo: '/sharantyler-test.avif',
      location: 'Toronto'
    },
    {
      stars: '★★★★★',
      text: 'Dhan always knows exactly what I want. Great service, great cuts, and the whole team is friendly. Ace of Blades is the real deal!',
      author: 'Oliver Rahim',
      photo: '/oliverrahim-test.avif',
      location: 'Scarborough'
    },
    {
      stars: '★★★★★',
      text: 'The AOB Presidential package is worth every penny. Complete transformation every time. This is luxury barbering at its finest.',
      author: 'Daniel Thevara',
      photo: '/danielthevara-test.avif',
      location: 'Toronto'
    },
    {
      stars: '★★★★★',
      text: 'Clean cuts, relaxed vibes, and professional service. Been coming here for months and never disappointed. Best barbershop on Kingston Rd!',
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
    <section id="reviews" className="reviews modern-luxury-reviews" ref={sectionRef}>
      <div className="container-wide">
        <div className="section-header centered">
          <p className="section-subtitle">Testimonials</p>
          <h2>What Our Clients<br />Say</h2>
        </div>

        {/* Horizontal Reel - Oversized Minimal Cards */}
        <div className="reviews-reel-wrapper">
          <button
            className="reel-nav reel-prev"
            onClick={prevReview}
            aria-label="Previous review"
          >
            ←
          </button>

          <div className="reviews-reel-container">
            <div className="reviews-reel" ref={carouselRef}>
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  className="review-card-minimal"
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: index === currentIndex ? 1 : 0.6 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="review-photo-minimal">
                    <img 
                      src={review.photo} 
                      alt={review.author}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200/1a1a1a/c9a86a?text=Client'
                      }}
                    />
                  </div>
                  
                  <div className="review-stars-minimal">{review.stars}</div>
                  
                  <blockquote className="review-quote-serif">
                    {review.text}
                  </blockquote>
                  
                  <div className="review-author-minimal">
                    <cite>{review.author}</cite>
                    <span className="review-location-minimal">{review.location}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <button
            className="reel-nav reel-next"
            onClick={nextReview}
            aria-label="Next review"
          >
            →
          </button>
        </div>

        {/* Indicators */}
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
      </div>
    </section>
  )
}

export default Reviews
