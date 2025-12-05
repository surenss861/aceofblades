import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SocialFeed = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const header = sectionRef.current?.querySelector('.section-header')
    const items = gsap.utils.toArray('.social-feed-item')
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
      gsap.set(item, { opacity: 0, scale: 0.9 })
      
      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
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

  // In production, fetch from Instagram/TikTok API
  const posts = [
    {
      image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=600&fit=crop',
      platform: 'instagram',
      caption: 'Fresh fade just dropped ✂️',
      link: 'https://www.instagram.com/p/example1'
    },
    {
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=600&fit=crop',
      platform: 'instagram',
      caption: 'Beard game strong 💪',
      link: 'https://www.instagram.com/p/example2'
    },
    {
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b7d?w=600&h=600&fit=crop',
      platform: 'tiktok',
      caption: 'Transformation Tuesday 🔥',
      link: 'https://www.tiktok.com/@aceofblades/video/example'
    },
    {
      image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=600&fit=crop',
      platform: 'instagram',
      caption: 'Hot towel shave vibes ✨',
      link: 'https://www.instagram.com/p/example3'
    },
    {
      image: 'https://images.unsplash.com/photo-1622296242089-6c5e0e1e0e1e?w=600&h=600&fit=crop',
      platform: 'instagram',
      caption: 'Behind the scenes 🎬',
      link: 'https://www.instagram.com/p/example4'
    },
    {
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=600&fit=crop',
      platform: 'tiktok',
      caption: 'Satisfying fade process 👌',
      link: 'https://www.tiktok.com/@aceofblades/video/example2'
    }
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="social-feed" className="social-feed" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2>Follow Our Journey</h2>
          <p className="section-subtitle">See our latest work on Instagram & TikTok. Book the look you love!</p>
        </div>
        
        <div className="social-feed-grid">
          {posts.map((post, index) => (
            <motion.a
              key={index}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="social-feed-item"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="social-feed-image">
                <img src={post.image} alt={post.caption} loading="lazy" />
                <div className="social-feed-overlay">
                  <div className="social-feed-platform">
                    {post.platform === 'instagram' ? '📷' : '🎵'}
                  </div>
                  <p className="social-feed-caption">{post.caption}</p>
                </div>
              </div>
              <motion.button
                className="social-feed-book-btn"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('#book')
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Book This Look
              </motion.button>
            </motion.a>
          ))}
        </div>

        <div className="social-feed-cta">
          <motion.a
            href="https://www.instagram.com/aceofbladesco"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-large"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Follow @aceofbladesco
          </motion.a>
        </div>
      </div>
    </section>
  )
}

export default SocialFeed

