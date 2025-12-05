import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const ClientStories = () => {
  const sectionRef = useRef(null)
  const [activeStory, setActiveStory] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const header = sectionRef.current?.querySelector('.section-header')
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

    return () => {
      scrollTriggers.forEach(st => st.kill())
      ScrollTrigger.refresh()
    }
  }, [])

  const stories = [
    {
      name: 'Sophie',
      image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop',
      title: 'Sophie\'s Blonde Balayage Journey',
      story: 'Sophie came to us wanting a complete transformation. After a consultation with Dhan, we created a stunning blonde balayage that perfectly complemented her skin tone. The result? Confidence through the roof!',
      before: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b7d?w=400&h=400&fit=crop'
    },
    {
      name: 'Michael',
      image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop',
      title: 'Michael\'s Precision Fade Transformation',
      story: 'Michael wanted a sharp, professional look for his new job. Ace delivered a perfect fade that not only looked great but was easy to maintain. Michael has been a regular client ever since!',
      before: 'https://images.unsplash.com/photo-1622296242089-6c5e0e1e0e1e?w=400&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop'
    },
    {
      name: 'James',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      title: 'James\'s Complete Grooming Experience',
      story: 'James tried our AOB Presidential package and was blown away. From the hot towel shave to the precision cut, every detail was perfect. "Best grooming experience I\'ve ever had," he said.',
      before: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop'
    }
  ]

  const nextStory = () => {
    setActiveStory((prev) => (prev + 1) % stories.length)
  }

  const prevStory = () => {
    setActiveStory((prev) => (prev - 1 + stories.length) % stories.length)
  }

  return (
    <section id="client-stories" className="client-stories" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2>Client Stories</h2>
          <p className="section-subtitle">Real transformations, real results, real stories</p>
        </div>

        <div className="client-stories-carousel">
          <button
            className="client-stories-nav client-stories-prev"
            onClick={prevStory}
            aria-label="Previous story"
          >
            ‹
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory}
              className="client-story-card"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="client-story-content">
                <div className="client-story-image">
                  <img src={stories[activeStory].image} alt={stories[activeStory].name} />
                </div>
                <div className="client-story-text">
                  <h3>{stories[activeStory].title}</h3>
                  <p>{stories[activeStory].story}</p>
                  <div className="client-story-before-after">
                    <div className="before-after-item">
                      <span className="before-after-label">Before</span>
                      <img src={stories[activeStory].before} alt="Before" />
                    </div>
                    <div className="before-after-item">
                      <span className="before-after-label">After</span>
                      <img src={stories[activeStory].after} alt="After" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            className="client-stories-nav client-stories-next"
            onClick={nextStory}
            aria-label="Next story"
          >
            ›
          </button>
        </div>

        <div className="client-stories-indicators">
          {stories.map((_, index) => (
            <button
              key={index}
              className={`client-stories-indicator ${index === activeStory ? 'active' : ''}`}
              onClick={() => setActiveStory(index)}
              aria-label={`Go to story ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ClientStories

