import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Blog = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const header = sectionRef.current?.querySelector('.section-header')
    const cards = gsap.utils.toArray('.blog-card')
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
      gsap.set(card, { opacity: 0, y: 50 })
      
      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
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

  const posts = [
    {
      image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=400&fit=crop',
      category: 'Hair Care Tips',
      title: '5 Essential Tips for Maintaining Your Fade',
      excerpt: 'Learn how to keep your fade looking sharp between appointments with these professional tips.',
      date: 'March 15, 2024',
      readTime: '5 min read'
    },
    {
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop',
      category: 'Trends',
      title: 'Best Beard Styles for 2024',
      excerpt: 'Discover the top beard trends that are dominating this year and find the perfect style for your face shape.',
      date: 'March 10, 2024',
      readTime: '7 min read'
    },
    {
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b7d?w=600&h=400&fit=crop',
      category: 'Grooming',
      title: 'Why Regular Haircuts Matter',
      excerpt: 'Understanding the importance of consistent grooming and how it affects your overall appearance and confidence.',
      date: 'March 5, 2024',
      readTime: '4 min read'
    }
  ]

  return (
    <section id="blog" className="blog" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2>Latest from Our Blog</h2>
          <p className="section-subtitle">Hair care tips, styling trends, and expert advice</p>
        </div>
        <div className="blog-grid">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              className="blog-card"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="blog-image">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
                <div className="blog-category">{post.category}</div>
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-date">{post.date}</span>
                  <span className="blog-read-time">{post.readTime}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <a href="#" className="blog-read-more">
                  Read More →
                </a>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="blog-cta">
          <motion.a
            href="#blog"
            className="btn btn-outline btn-large"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Posts
          </motion.a>
        </div>
      </div>
    </section>
  )
}

export default Blog

