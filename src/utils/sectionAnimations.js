/**
 * Staggered fade-in animations for section headings
 * Luxury feel with slow, intentional animations
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const initSectionHeaderAnimation = (sectionRef) => {
  if (!sectionRef?.current) return

  const header = sectionRef.current.querySelector('.section-header')
  if (!header) return

  const subtitle = header.querySelector('.section-subtitle')
  const title = header.querySelector('h2')
  const description = header.querySelector('.section-description')

  // Set initial states
  if (subtitle) gsap.set(subtitle, { opacity: 0, y: 20 })
  if (title) gsap.set(title, { opacity: 0, y: 30 })
  if (description) gsap.set(description, { opacity: 0, y: 20 })

  const st = ScrollTrigger.create({
    trigger: sectionRef.current,
    start: 'top 80%',
    onEnter: () => {
      const tl = gsap.timeline()
      
      if (subtitle) {
        tl.to(subtitle, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out'
        })
      }
      
      if (title) {
        tl.to(title, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out'
        }, '-=0.6')
      }
      
      if (description) {
        tl.to(description, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out'
        }, '-=0.8')
      }
    }
  })

  return () => st.kill()
}

