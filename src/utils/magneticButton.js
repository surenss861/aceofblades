/**
 * Magnetic Button Effect - Subtle pull, not dramatic
 * Luxury interaction for premium feel
 */
export const initMagneticButton = (button) => {
  if (!button) return

  const handleMouseMove = (e) => {
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    // Enhanced magnetic pull (slightly more responsive) - luxury feel
    const moveX = x * 0.15
    const moveY = y * 0.15
    
    button.style.transform = `translate(${moveX}px, ${moveY}px)`
    button.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  }

  const handleMouseLeave = () => {
    button.style.transform = 'translate(0, 0)'
  }

  button.addEventListener('mousemove', handleMouseMove)
  button.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    button.removeEventListener('mousemove', handleMouseMove)
    button.removeEventListener('mouseleave', handleMouseLeave)
  }
}

