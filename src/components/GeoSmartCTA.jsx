import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const GeoSmartCTA = () => {
  const [location, setLocation] = useState('Scarborough')

  useEffect(() => {
    // Try to get user's location from browser or IP
    // In production, use a geolocation service
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Reverse geocode to get city name
          // For now, we'll use a simple approach
          setLocation('Scarborough')
        },
        () => {
          // Fallback to default
          setLocation('Scarborough')
        }
      )
    }

    // Alternative: Check URL params for location
    const urlParams = new URLSearchParams(window.location.search)
    const cityParam = urlParams.get('city')
    if (cityParam) {
      setLocation(cityParam)
    }
  }, [])

  const getPersonalizedMessage = () => {
    const messages = {
      'Scarborough': 'Serving Scarborough Since 2020',
      'Toronto': 'Downtown Toronto\'s Premier Barbershop',
      'default': 'Scarborough\'s Sharpest Fades'
    }
    return messages[location] || messages.default
  }

  return (
    <motion.div
      className="geo-smart-cta"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <p className="geo-message">{getPersonalizedMessage()}</p>
    </motion.div>
  )
}

export default GeoSmartCTA

