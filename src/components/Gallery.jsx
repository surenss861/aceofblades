import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Gallery.css'

const Gallery = () => {
  const sectionRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.classList.add('lightbox-open')
    } else {
      document.body.classList.remove('lightbox-open')
    }
    
    return () => {
      document.body.classList.remove('lightbox-open')
    }
  }, [selectedImage])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const header = sectionRef.current?.querySelector('.section-header')
    const items = gsap.utils.toArray('.gallery-item')
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
      gsap.set(item, { opacity: 0, scale: 0.8, rotation: 5 })
      
      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            scale: 1,
            rotation: 0,
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

  const images = [
    {
      thumbnail: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=600&fit=crop',
      full: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1920&h=1080&fit=crop'
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=600&fit=crop',
      full: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&h=1080&fit=crop'
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b7d?w=600&h=600&fit=crop',
      full: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b7d?w=1920&h=1080&fit=crop'
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=600&fit=crop',
      full: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=1920&h=1080&fit=crop'
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1622296242089-6c5e0e1e0e1e?w=600&h=600&fit=crop',
      full: 'https://images.unsplash.com/photo-1622296242089-6c5e0e1e0e1e?w=1920&h=1080&fit=crop'
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=600&fit=crop',
      full: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1920&h=1080&fit=crop'
    }
  ]

  return (
    <>
      <section id="gallery" className="gallery" ref={sectionRef}>
        <div className="container">
        <div className="section-header centered">
          <p className="section-subtitle">Our Work</p>
          <h2>Every Cut Tells a Story</h2>
          <p className="section-description">
            Witness the artistry, precision, and transformation that happens in our chair every day.
          </p>
        </div>
          <div className="gallery-grid">
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="gallery-item"
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(image.full)}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img 
                  src={image.thumbnail} 
                  alt={`Gallery image ${index + 1}`} 
                  loading="lazy"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.src = `https://via.placeholder.com/600x600/1a1a1a/d4af37?text=Image+${index + 1}`
                  }}
                />
              </motion.div>
            ))}
          </div>
          <div className="gallery-cta">
            <motion.a
              href="https://www.instagram.com/aceofbladesco"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-large"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Follow Us on Instagram
            </motion.a>
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {selectedImage && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Gallery lightbox"
                onLoad={(e) => {
                  // Ensure image is loaded
                  e.target.style.opacity = '1'
                }}
                onError={(e) => {
                  // Fallback if image fails to load
                  e.target.src = selectedImage.replace('w=1920&h=1080', 'w=1200&h=800')
                }}
                style={{ opacity: 0, transition: 'opacity 0.3s' }}
              />
            </motion.div>
            <motion.button
              className="lightbox-close"
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close lightbox"
            >
              ×
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Gallery

