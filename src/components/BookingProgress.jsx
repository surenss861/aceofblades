import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './BookingProgress.css'

const BookingProgress = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState('')
  const [selectedBarber, setSelectedBarber] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const steps = [
    { number: 1, title: 'Select Service', component: 'service' },
    { number: 2, title: 'Choose Barber', component: 'barber' },
    { number: 3, title: 'Pick Date & Time', component: 'datetime' },
    { number: 4, title: 'Confirm', component: 'confirm' }
  ]

  const services = [
    'Hair & Styling',
    'Haircut + Beard',
    'Design',
    'Hot Towel Shave',
    'AOB Presidential'
  ]

  const barbers = ['Ace', 'Chris', 'Dhan']

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    // Track booking completion
    if (window.gtag) {
      window.gtag('event', 'booking_completed', {
        event_category: 'Booking',
        event_label: `${selectedService} - ${selectedBarber}`,
        value: 1
      })
    }
    alert('Booking confirmed! (In production, this would complete the booking)')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="booking-progress-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="booking-progress-modal"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <button
              className="booking-progress-close"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>

            <div className="booking-progress-header">
              <h2>Book Your Appointment</h2>
              <div className="booking-progress-steps">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className={`booking-progress-step ${currentStep >= step.number ? 'active' : ''} ${currentStep === step.number ? 'current' : ''}`}
                  >
                    <div className="step-number">{step.number}</div>
                    <div className="step-title">{step.title}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="booking-progress-content">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="service"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="booking-step-content"
                  >
                    <h3>Select a Service</h3>
                    <div className="booking-options">
                      {services.map((service) => (
                        <motion.button
                          key={service}
                          className={`booking-option ${selectedService === service ? 'selected' : ''}`}
                          onClick={() => setSelectedService(service)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {service}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="barber"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="booking-step-content"
                  >
                    <h3>Choose Your Barber</h3>
                    <div className="booking-options">
                      {barbers.map((barber) => (
                        <motion.button
                          key={barber}
                          className={`booking-option ${selectedBarber === barber ? 'selected' : ''}`}
                          onClick={() => setSelectedBarber(barber)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {barber}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="datetime"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="booking-step-content"
                  >
                    <h3>Select Date & Time</h3>
                    <div className="booking-datetime">
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="booking-input"
                        required
                      />
                      <input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="booking-input"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="booking-step-content"
                  >
                    <h3>Confirm Your Booking</h3>
                    <div className="booking-summary">
                      <div className="summary-item">
                        <strong>Service:</strong> {selectedService}
                      </div>
                      <div className="summary-item">
                        <strong>Barber:</strong> {selectedBarber}
                      </div>
                      <div className="summary-item">
                        <strong>Date:</strong> {selectedDate}
                      </div>
                      <div className="summary-item">
                        <strong>Time:</strong> {selectedTime}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="booking-progress-actions">
              {currentStep > 1 && (
                <motion.button
                  className="btn btn-outline"
                  onClick={handleBack}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back
                </motion.button>
              )}
              {currentStep < steps.length ? (
                <motion.button
                  className="btn btn-primary"
                  onClick={handleNext}
                  disabled={!selectedService && currentStep === 1 || !selectedBarber && currentStep === 2 || (!selectedDate || !selectedTime) && currentStep === 3}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  className="btn btn-primary"
                  onClick={handleComplete}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Confirm Booking
                </motion.button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default BookingProgress

