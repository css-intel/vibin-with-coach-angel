'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Metadata } from 'next'

// Service types and data
const bookingServices = [
  {
    id: 'discovery',
    category: 'free',
    title: 'Free Discovery Call',
    duration: '30 minutes',
    price: 'Free',
    description: 'Let\'s connect and explore how we can work together. No pressure, just a warm conversation about your journey.',
    icon: '💫',
    color: 'lavender',
  },
  {
    id: 'transition-single',
    category: 'transition',
    title: 'Transition Coaching Session',
    duration: '60 minutes',
    price: '$150',
    description: 'Single session for navigating life changes with Spirit, Mind, Body & Wealth alignment.',
    icon: '⚡',
    color: 'teal',
  },
  {
    id: 'transition-journey',
    category: 'transition',
    title: '6-Session Transition Journey',
    duration: '6 sessions',
    price: '$800',
    description: 'Comprehensive support through your life transition. Save $100 with this package.',
    icon: '🌿',
    color: 'teal',
    popular: true,
  },
  {
    id: 'transition-intensive',
    category: 'transition',
    title: '12-Week Intensive',
    duration: 'Weekly sessions + support',
    price: '$1,500',
    description: 'Deep, immersive transformation with weekly sessions and ongoing support.',
    icon: '🔥',
    color: 'teal',
  },
  {
    id: 'holistic-single',
    category: 'coaching',
    title: '1-on-1 Holistic Coaching',
    duration: '60 minutes',
    price: '$150',
    description: 'Personalized session tailored to your unique healing journey.',
    icon: '💜',
    color: 'sage',
  },
  {
    id: 'holistic-4pack',
    category: 'coaching',
    title: '4-Session Package',
    duration: '4 sessions',
    price: '$500',
    description: 'Sustained transformation with four sessions. Save $100.',
    icon: '✨',
    color: 'sage',
    popular: true,
  },
  {
    id: 'breathwork',
    category: 'healing',
    title: 'Breathwork Session',
    duration: '75 minutes',
    price: '$125',
    description: 'Release stored emotions and regulate your nervous system through conscious breathing.',
    icon: '🌬️',
    color: 'lavender',
  },
  {
    id: 'innerchild',
    category: 'healing',
    title: 'Inner Child Healing',
    duration: '75 minutes',
    price: '$150',
    description: 'Gently reconnect with and heal the wounded parts of yourself.',
    icon: '🧒',
    color: 'warmth',
  },
  {
    id: 'shadowwork',
    category: 'healing',
    title: 'Shadow Work Session',
    duration: '75 minutes',
    price: '$150',
    description: 'Explore and integrate hidden aspects of yourself for deeper self-awareness.',
    icon: '🌙',
    color: 'sage',
  },
  {
    id: 'doula-consult',
    category: 'doula',
    title: 'Doula Consultation',
    duration: '30 minutes',
    price: 'Free',
    description: 'Let\'s discuss your birth journey and how I can support you.',
    icon: '🤰',
    color: 'teal',
  },
  {
    id: 'doula-birth',
    category: 'doula',
    title: 'Birth Doula Package',
    duration: 'Full support',
    price: '$1,200',
    description: 'Prenatal visits, birth support, and postpartum care for your complete journey.',
    icon: '👶',
    color: 'teal',
  },
]

const categories = [
  { id: 'all', label: 'All Services' },
  { id: 'free', label: 'Free Consultations' },
  { id: 'transition', label: 'Transition Coaching' },
  { id: 'coaching', label: 'Holistic Coaching' },
  { id: 'healing', label: 'Healing Sessions' },
  { id: 'doula', label: 'Doula Support' },
]

const colorMap: Record<string, string> = {
  sage: 'from-sage-500 to-sage-600',
  lavender: 'from-lavender-500 to-lavender-600',
  warmth: 'from-warmth-500 to-warmth-600',
  teal: 'from-teal-500 to-teal-600',
}

const colorBgMap: Record<string, string> = {
  sage: 'bg-sage-50 border-sage-200',
  lavender: 'bg-lavender-50 border-lavender-200',
  warmth: 'bg-warmth-50 border-warmth-200',
  teal: 'bg-teal-50 border-teal-200',
}

export default function BookPage() {
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedService, setSelectedService] = useState<typeof bookingServices[0] | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentChallenge: '',
    goals: '',
    heardAbout: '',
    additionalInfo: '',
  })

  const filteredServices = selectedCategory === 'all' 
    ? bookingServices 
    : bookingServices.filter(s => s.category === selectedCategory)

  const handleServiceSelect = (service: typeof bookingServices[0]) => {
    setSelectedService(service)
    setStep(2)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(3)
  }

  const goBack = () => {
    if (step === 2) {
      setSelectedService(null)
      setStep(1)
    } else if (step === 3) {
      setStep(2)
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-cream-50 to-white">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-sage-50 via-lavender-50 to-warmth-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-sage-900 mb-4">
            Book Your Session
          </h1>
          <p className="text-sage-600 text-lg">
            {step === 1 && "Select the service that resonates with where you are in your journey."}
            {step === 2 && "Tell me a little about yourself so I can best support you."}
            {step === 3 && "You're almost there! Select your preferred time."}
          </p>
          
          {/* Progress Steps */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step >= s 
                    ? 'bg-gradient-to-r from-lavender-500 to-lavender-600 text-white' 
                    : 'bg-sage-200 text-sage-500'
                }`}>
                  {step > s ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : s}
                </div>
                {s < 3 && (
                  <div className={`w-16 h-1 mx-2 rounded ${step > s ? 'bg-lavender-500' : 'bg-sage-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 space-x-12 text-sm text-sage-600">
            <span>Select Service</span>
            <span>Your Info</span>
            <span>Choose Time</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div>
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-sage-500 to-sage-600 text-white shadow-md'
                        : 'bg-white text-sage-700 border border-sage-200 hover:border-sage-400'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className={`relative bg-white rounded-2xl p-6 border-2 hover:shadow-xl transition-all cursor-pointer group ${
                      service.popular ? 'border-lavender-400' : 'border-sage-100 hover:border-sage-300'
                    }`}
                    onClick={() => handleServiceSelect(service)}
                  >
                    {service.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-lavender-500 to-lavender-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        POPULAR
                      </div>
                    )}
                    
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-lg font-semibold text-sage-900 mb-1 group-hover:text-lavender-700 transition-colors">
                      {service.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xl font-bold bg-gradient-to-r ${colorMap[service.color]} bg-clip-text text-transparent`}>
                        {service.price}
                      </span>
                      <span className="text-sage-500 text-sm">• {service.duration}</span>
                    </div>
                    <p className="text-sage-600 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <div className={`w-full py-2 rounded-full text-center text-sm font-medium transition-all ${colorBgMap[service.color]} group-hover:bg-gradient-to-r group-hover:${colorMap[service.color]} group-hover:text-white`}>
                      Select & Continue
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Intake Form */}
          {step === 2 && selectedService && (
            <div className="max-w-2xl mx-auto">
              {/* Back Button */}
              <button
                onClick={goBack}
                className="flex items-center text-sage-600 hover:text-sage-800 mb-6 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Services
              </button>

              {/* Selected Service Summary */}
              <div className={`rounded-2xl p-6 mb-8 ${colorBgMap[selectedService.color]} border`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">{selectedService.icon}</span>
                    <div>
                      <h3 className="font-semibold text-sage-900">{selectedService.title}</h3>
                      <p className="text-sage-600 text-sm">{selectedService.duration}</p>
                    </div>
                  </div>
                  <span className={`text-2xl font-bold bg-gradient-to-r ${colorMap[selectedService.color]} bg-clip-text text-transparent`}>
                    {selectedService.price}
                  </span>
                </div>
              </div>

              {/* Intake Form */}
              <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl p-8 shadow-lg border border-sage-100">
                <h2 className="text-xl font-serif font-bold text-sage-900 mb-6">Tell Me About You</h2>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 outline-none transition-all"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 outline-none transition-all"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 outline-none transition-all"
                      placeholder="(555) 555-5555"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    What's your current challenge or what brings you here? *
                  </label>
                  <textarea
                    name="currentChallenge"
                    required
                    rows={3}
                    value={formData.currentChallenge}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 outline-none transition-all resize-none"
                    placeholder="Share what you're currently navigating..."
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    What are you hoping to achieve through our work together?
                  </label>
                  <textarea
                    name="goals"
                    rows={3}
                    value={formData.goals}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 outline-none transition-all resize-none"
                    placeholder="Your hopes, goals, or intentions..."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    How did you hear about VIBIN with Coach Angel?
                  </label>
                  <select
                    name="heardAbout"
                    value={formData.heardAbout}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 outline-none transition-all bg-white"
                  >
                    <option value="">Select an option...</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="google">Google Search</option>
                    <option value="referral">Friend/Family Referral</option>
                    <option value="event">Event or Workshop</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    Anything else you'd like me to know?
                  </label>
                  <textarea
                    name="additionalInfo"
                    rows={2}
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 outline-none transition-all resize-none"
                    placeholder="Optional: Share anything else that feels relevant..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-lavender-500 to-lavender-600 text-white py-4 rounded-full font-semibold hover:from-lavender-600 hover:to-lavender-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Continue to Schedule
                </button>
              </form>
            </div>
          )}

          {/* Step 3: Calendar Selection - Cal.com Prototype */}
          {step === 3 && selectedService && (
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <button
                onClick={goBack}
                className="flex items-center text-sage-600 hover:text-sage-800 mb-6 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Form
              </button>

              {/* Booking Header */}
              <div className="bg-white rounded-t-3xl p-6 border border-sage-100 border-b-0">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorMap[selectedService.color]} flex items-center justify-center text-2xl text-white`}>
                      {selectedService.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-serif font-bold text-sage-900">{selectedService.title}</h2>
                      <p className="text-sage-600 text-sm">{selectedService.duration} • {selectedService.price}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sage-500 text-sm">Booking for</p>
                    <p className="font-semibold text-sage-800">{formData.firstName} {formData.lastName}</p>
                  </div>
                </div>
              </div>

              {/* Cal.com Style Calendar - PROTOTYPE */}
              <div className="bg-white rounded-b-3xl shadow-xl border border-sage-100 overflow-hidden">
                {/* This is what Cal.com embed would look like with your branding */}
                <div className="grid md:grid-cols-2">
                  {/* Calendar Side */}
                  <div className="p-6 border-r border-sage-100">
                    <h3 className="font-semibold text-sage-800 mb-4">Select a Date</h3>
                    
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-4">
                      <button className="p-2 hover:bg-sage-50 rounded-lg transition-colors">
                        <svg className="w-5 h-5 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <span className="font-semibold text-sage-800">February 2026</span>
                      <button className="p-2 hover:bg-sage-50 rounded-lg transition-colors">
                        <svg className="w-5 h-5 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-xs text-sage-500 py-2">{day}</div>
                      ))}
                      {/* Sample calendar days */}
                      {[...Array(35)].map((_, i) => {
                        const day = i - 5 // Start from Sunday before Feb 1
                        const isCurrentMonth = day >= 1 && day <= 28
                        const isAvailable = isCurrentMonth && [2, 3, 5, 9, 10, 12, 16, 17, 19, 23, 24, 26].includes(day)
                        const isSelected = day === 10
                        return (
                          <button
                            key={i}
                            disabled={!isAvailable}
                            className={`py-2 rounded-lg text-sm transition-all ${
                              isSelected 
                                ? 'bg-gradient-to-r from-sage-500 to-sage-600 text-white font-semibold' 
                                : isAvailable 
                                  ? 'hover:bg-sage-100 text-sage-800 font-medium' 
                                  : 'text-sage-300'
                            }`}
                          >
                            {isCurrentMonth ? day : ''}
                          </button>
                        )
                      })}
                    </div>

                    <p className="text-xs text-sage-500 mt-4 text-center">
                      Times shown in Central Time (CT)
                    </p>
                  </div>

                  {/* Time Slots Side */}
                  <div className="p-6 bg-cream-50">
                    <h3 className="font-semibold text-sage-800 mb-4">Tuesday, February 10</h3>
                    
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time, idx) => (
                        <button
                          key={time}
                          className={`w-full py-3 px-4 rounded-xl border-2 text-left transition-all ${
                            idx === 2 
                              ? 'border-lavender-500 bg-lavender-50 text-lavender-700' 
                              : 'border-sage-200 hover:border-sage-400 text-sage-700 bg-white'
                          }`}
                        >
                          <span className="font-medium">{time}</span>
                          {idx === 2 && <span className="float-right text-lavender-600">✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Confirm Button */}
                <div className="p-6 bg-white border-t border-sage-100">
                  <button
                    className="w-full bg-gradient-to-r from-lavender-500 to-lavender-600 text-white py-4 px-8 rounded-full font-semibold hover:from-lavender-600 hover:to-lavender-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    Confirm Booking - {selectedService.price === 'Free' ? 'Free' : selectedService.price}
                  </button>
                  <p className="text-xs text-sage-500 mt-3 text-center">
                    {selectedService.price === 'Free' 
                      ? 'No payment required for this consultation'
                      : 'You\'ll be taken to secure checkout to complete payment'
                    }
                  </p>
                </div>
              </div>

              {/* Prototype Notice */}
              <div className="mt-8 p-6 bg-gradient-to-r from-lavender-50 to-sage-50 rounded-2xl border border-lavender-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-lavender-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-lavender-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sage-800 mb-1">This is a Cal.com Prototype</h4>
                    <p className="text-sage-600 text-sm">
                      This shows how Cal.com would look embedded with your exact branding—sage buttons, lavender accents, 
                      cream backgrounds. The actual calendar syncs with your availability and processes payments through Stripe.
                    </p>
                    <a 
                      href="https://paperbell.me/angel-harris" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-lavender-600 hover:text-lavender-700 font-medium text-sm"
                    >
                      For now, book via Paperbell →
                    </a>
                  </div>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap justify-center gap-6 text-sage-600 text-sm mt-8">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-sage-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Secure Booking
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-sage-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Instant Confirmation
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-sage-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Calendar Invite Sent
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 bg-gradient-to-r from-sage-50 to-lavender-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-serif font-semibold text-sage-900 mb-4">
            Not sure which service is right for you?
          </h3>
          <p className="text-sage-600 mb-6">
            Book a free Discovery Call and let's explore together. No pressure, no obligations—just a conversation about your journey.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('free')
              setStep(1)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="inline-block border-2 border-sage-400 text-sage-700 px-8 py-3 rounded-full font-medium hover:bg-sage-100 transition-all"
          >
            Start with a Free Call
          </button>
        </div>
      </section>
    </div>
  )
}
