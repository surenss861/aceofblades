import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import './Loader.css'

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
      document.body.classList.remove('loading')
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('loading')
      
      // GSAP animation for loader (subtle pulse instead of rotation)
      gsap.to('.loader-logo', {
        scale: 1.1,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      })

      gsap.to('.loader-sparkle', {
        scale: 1.5,
        opacity: 0.3,
        duration: 1,
        repeat: -1,
        yoyo: true,
        stagger: 0.2
      })
    }
  }, [isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loader-content">
            <motion.img
              src="/aceofbladeslogo.avif"
              alt="Ace of Blades Logo"
              className="loader-logo"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.h2
              className="loader-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Ace of Blades
            </motion.h2>
            <div className="loader-sparkles">
              <span className="loader-sparkle">✨</span>
              <span className="loader-sparkle">✨</span>
              <span className="loader-sparkle">✨</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loader

