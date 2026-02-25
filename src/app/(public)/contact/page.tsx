'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 gradient-warmth relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-sage-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-lavender-200 rounded-full blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <span className="inline-block px-4 py-2 bg-white/50 text-warmth-700 rounded-full text-sm font-medium mb-6">
                Let's Connect
              </span>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-sage-900 mb-6">
                Begin Your Healing Journey
              </h1>
              <p className="text-sage-600 text-lg leading-relaxed">
                I'd love to hear from you. Whether you're ready to book a session or just 
                have questions, reach out and let's start a conversation.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-64 md:w-72 md:h-72">
                <div className="absolute inset-0 bg-gradient-to-br from-warmth-300 to-sage-300 rounded-3xl -rotate-3"></div>
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/angel-profile.jpg"
                    alt="Coach Angel - Let's Connect"
                    fill
                    className="object-cover"
                    style={{ objectPosition: '50% 20%' }}
                    sizes="(max-width: 768px) 256px, 288px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-sage-900 mb-6">
                Send Me a Message
              </h2>
              
              {isSubmitted ? (
                <div className="bg-sage-50 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage-500 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-sage-800 mb-3">Message Received!</h3>
                  <p className="text-sage-600 mb-6">
                    Thank you for reaching out. I'll get back to you within 24-48 hours. 
                    In the meantime, feel free to explore more about my services.
                  </p>
                  <Link
                    href="/services"
                    className="inline-block text-lavender-600 font-medium hover:text-lavender-700 transition-colors"
                  >
                    Explore Services →
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-sage-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 transition-all outline-none"
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-sage-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 transition-all outline-none"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-sage-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 transition-all outline-none"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-sage-700 mb-2">
                        I'm Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 transition-all outline-none bg-white"
                      >
                        <option value="">Select a service...</option>
                        <option value="discovery">Free Discovery Call</option>
                        <option value="coaching">1-on-1 Coaching</option>
                        <option value="doula">Holistic Doula Support</option>
                        <option value="breathwork">Breathwork Sessions</option>
                        <option value="innerchild">Inner Child Healing</option>
                        <option value="shadowwork">Shadow Work</option>
                        <option value="transitions">Life Transitions Support</option>
                        <option value="group">Group Programs</option>
                        <option value="other">Other / Not Sure</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-sage-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 transition-all outline-none resize-none"
                      placeholder="Tell me a little about yourself and what brings you here..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-sage-500 to-sage-600 text-white px-8 py-4 rounded-xl font-medium hover:from-sage-600 hover:to-sage-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:pl-8">
              <h2 className="text-2xl font-serif font-bold text-sage-900 mb-6">
                Other Ways to Connect
              </h2>

              {/* Book a Call CTA */}
              <div className="bg-gradient-to-br from-lavender-50 to-sage-50 rounded-2xl p-8 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-lavender-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sage-800 mb-2">Book a Free Discovery Call</h3>
                    <p className="text-sage-600 text-sm mb-4">
                      Ready to take the next step? Schedule a complimentary 20-minute call 
                      where we can get to know each other and explore how I can support you.
                    </p>
                    <a
                      href="#"
                      className="inline-block bg-lavender-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-lavender-600 transition-colors"
                    >
                      Schedule Now
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sage-800 mb-1">Email</h3>
                    <a href="mailto:hello@vibinwithcoachangel.com" className="text-lavender-600 hover:text-lavender-700 transition-colors">
                      hello@vibinwithcoachangel.com
                    </a>
                    <p className="text-sage-500 text-sm mt-1">I typically respond within 24-48 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sage-800 mb-1">Location</h3>
                    <p className="text-sage-600">Virtual Sessions Worldwide</p>
                    <p className="text-sage-500 text-sm mt-1">All sessions via Zoom from the comfort of your space</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sage-800 mb-1">Availability</h3>
                    <p className="text-sage-600">Monday - Friday</p>
                    <p className="text-sage-500 text-sm mt-1">Flexible scheduling to fit your needs</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10 pt-8 border-t border-sage-200">
                <h3 className="font-semibold text-sage-800 mb-4">Follow Along</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 hover:bg-lavender-500 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 hover:bg-lavender-500 hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 hover:bg-lavender-500 hover:text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 hover:bg-lavender-500 hover:text-white transition-colors"
                    aria-label="TikTok"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-sage-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lavender-600 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-warmth-500 rounded-full blur-3xl opacity-10"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-cream-100 mb-6">
            Join the V.I.B.I.N Community
          </h2>
          <p className="text-cream-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Receive weekly insights on holistic wellness, healing practices, and nurturing 
            your whole self. Plus, be the first to know about new offerings and community events.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full bg-sage-800 border border-sage-700 text-cream-100 placeholder-cream-400 focus:outline-none focus:ring-2 focus:ring-lavender-500"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-lavender-500 to-lavender-600 text-white font-medium hover:from-lavender-600 hover:to-lavender-700 transition-all"
            >
              Subscribe
            </button>
          </form>
          <p className="text-cream-500 text-sm mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  )
}
