import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './StylistRecommender.css'

const StylistRecommender = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [recommendedStylist, setRecommendedStylist] = useState(null)

  const questions = [
    {
      id: 'hairType',
      question: 'What\'s your hair type?',
      options: [
        { value: 'straight', label: 'Straight', stylist: 'Ace' },
        { value: 'wavy', label: 'Wavy', stylist: 'Chris' },
        { value: 'curly', label: 'Curly', stylist: 'Dhan' },
        { value: 'coily', label: 'Coily', stylist: 'Dhan' }
      ]
    },
    {
      id: 'vibe',
      question: 'What vibe are you going for?',
      options: [
        { value: 'classic', label: 'Classic & Timeless', stylist: 'Chris' },
        { value: 'modern', label: 'Modern & Trendy', stylist: 'Dhan' },
        { value: 'bold', label: 'Bold & Creative', stylist: 'Ace' },
        { value: 'natural', label: 'Natural & Low-Maintenance', stylist: 'Chris' }
      ]
    },
    {
      id: 'service',
      question: 'What service are you most interested in?',
      options: [
        { value: 'fade', label: 'Precision Fades', stylist: 'Ace' },
        { value: 'beard', label: 'Beard Grooming', stylist: 'Chris' },
        { value: 'design', label: 'Creative Designs', stylist: 'Dhan' },
        { value: 'full', label: 'Complete Package', stylist: 'Ace' }
      ]
    }
  ]

  const handleAnswer = (questionId, option) => {
    const newAnswers = { ...answers, [questionId]: option }
    setAnswers(newAnswers)

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Calculate recommended stylist
      const stylistCounts = {}
      Object.values(newAnswers).forEach(answer => {
        stylistCounts[answer.stylist] = (stylistCounts[answer.stylist] || 0) + 1
      })
      const recommended = Object.keys(stylistCounts).reduce((a, b) => 
        stylistCounts[a] > stylistCounts[b] ? a : b
      )
      setRecommendedStylist(recommended)
    }
  }

  const resetQuiz = () => {
    setCurrentStep(0)
    setAnswers({})
    setRecommendedStylist(null)
  }

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <>
      <motion.button
        className="stylist-recommender-trigger"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>🎯</span>
        <span>Find Your Stylist</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="stylist-recommender-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="stylist-recommender-modal"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <button
                className="stylist-recommender-close"
                onClick={() => {
                  setIsOpen(false)
                  resetQuiz()
                }}
                aria-label="Close"
              >
                ×
              </button>

              {!recommendedStylist ? (
                <>
                  <div className="stylist-recommender-progress">
                    <div 
                      className="stylist-recommender-progress-bar"
                      style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                    />
                    <span>Step {currentStep + 1} of {questions.length}</span>
                  </div>

                  <h2>{questions[currentStep].question}</h2>
                  
                  <div className="stylist-recommender-options">
                    {questions[currentStep].options.map((option, index) => (
                      <motion.button
                        key={index}
                        className="stylist-recommender-option"
                        onClick={() => handleAnswer(questions[currentStep].id, option)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </>
              ) : (
                <motion.div
                  className="stylist-recommender-result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="result-icon">✨</div>
                  <h2>We Found Your Perfect Match!</h2>
                  <p className="result-stylist">{recommendedStylist}</p>
                  <p className="result-description">
                    Based on your preferences, {recommendedStylist} is the perfect stylist for you!
                  </p>
                  <div className="result-actions">
                    <motion.a
                      href="#barbers"
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection('#barbers')
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Meet {recommendedStylist}
                    </motion.a>
                    <motion.a
                      href="#book"
                      className="btn btn-outline"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection('#book')
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book with {recommendedStylist}
                    </motion.a>
                  </div>
                  <button
                    className="result-reset"
                    onClick={resetQuiz}
                  >
                    Take Quiz Again
                  </button>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default StylistRecommender

