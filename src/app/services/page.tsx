import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services & Pricing | VIBIN with Coach Angel',
  description: 'Explore holistic wellness services including 1-on-1 coaching, breathwork sessions, inner child healing, shadow work, and group programs with Coach Angel.',
}

export default function ServicesPage() {
  const services = [
    {
      id: 'coaching',
      title: '1-on-1 Coaching',
      subtitle: 'Personalized Transformation',
      description: "Deep, transformative sessions tailored specifically to your unique journey. Together, we'll explore what's holding you back and create a path forward that honors your whole self.",
      features: [
        'Personalized session structure',
        'Trauma-informed approach',
        'Between-session support via email',
        'Custom resources and practices',
        'Progress tracking and celebration',
      ],
      pricing: [
        { name: 'Single Session', price: '$150', duration: '60 minutes' },
        { name: '4-Session Package', price: '$500', duration: 'Save $100', popular: true },
        { name: '8-Session Journey', price: '$900', duration: 'Save $300' },
      ],
      color: 'sage',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      id: 'breathwork',
      title: 'Breathwork Sessions',
      subtitle: 'Nervous System Restoration',
      description: 'Experience the profound healing power of conscious breathing. These sessions help release stored emotions, regulate your nervous system, and create lasting calm in your body.',
      features: [
        'Guided breathwork techniques',
        'Somatic release practices',
        'Nervous system education',
        'Integration support',
        'Take-home breathing exercises',
      ],
      pricing: [
        { name: 'Single Session', price: '$125', duration: '75 minutes' },
        { name: '4-Session Series', price: '$400', duration: 'Save $100', popular: true },
        { name: 'Monthly Membership', price: '$200/mo', duration: '2 sessions/month' },
      ],
      color: 'lavender',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      id: 'doula',
      title: 'Holistic Doula Support',
      subtitle: 'Nurturing Your Birth Journey',
      description: 'As a certified Doula, I provide continuous physical, emotional, and informational support to you and your partner before, during, and constantly after childbirth.',
      features: [
        'Birth preferences planning',
        'Comfort measures & labor support',
        'Partner guidance & inclusion',
        'Postpartum emotional support',
        'Newborn care education',
      ],
      pricing: [
        { name: 'Birth Package', price: '$1200', duration: 'Prenatal + Birth + Postnatal' },
        { name: 'Postpartum Care', price: '$40/hr', duration: 'Min 4 hours' },
        { name: 'Consultation', price: 'Free', duration: '30 minutes' },
      ],
      color: 'teal',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
    },
    {
      id: 'innerchild',
      title: 'Inner Child Healing',
      subtitle: 'Reconnect & Restore',
      description: 'Gently reconnect with the wounded parts of yourself that need attention and love. This nurturing work helps heal old patterns and beliefs that no longer serve you.',
      features: [
        'Safe, trauma-informed space',
        'Inner child meditation',
        'Reparenting techniques',
        'Emotional processing support',
        'Journal prompts and exercises',
      ],
      pricing: [
        { name: 'Single Session', price: '$150', duration: '75 minutes' },
        { name: '6-Week Deep Dive', price: '$750', duration: 'Save $150', popular: true },
        { name: 'Intensive Weekend', price: '$400', duration: '4 hours' },
      ],
      color: 'warmth',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      id: 'shadowwork',
      title: 'Shadow Work',
      subtitle: 'Integration & Awareness',
      description: 'Explore and integrate the hidden aspects of yourself. This powerful work brings unconscious patterns into the light, allowing for deeper self-awareness and transformation.',
      features: [
        'Shadow identification exercises',
        'Integration techniques',
        'Journaling guidance',
        'Mirror work practices',
        'Ongoing integration support',
      ],
      pricing: [
        { name: 'Single Session', price: '$150', duration: '75 minutes' },
        { name: '8-Week Journey', price: '$950', duration: 'Save $250', popular: true },
        { name: 'VIP Day', price: '$600', duration: 'Half-day intensive' },
      ],
      color: 'sage',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
    },
    {
      id: 'transitions',
      title: 'Life Transitions Support',
      subtitle: 'Navigate Change with Grace',
      description: "Whether you're facing a career change, relationship shift, health challenge, or any major life transition, I'll help you navigate with clarity, resilience, and renewed purpose.",
      features: [
        'Transition mapping',
        'Values clarification',
        'Decision-making support',
        'Stress management tools',
        'Future visioning exercises',
      ],
      pricing: [
        { name: 'Single Session', price: '$150', duration: '60 minutes' },
        { name: 'Transition Package', price: '$650', duration: '5 sessions', popular: true },
        { name: '90-Day Support', price: '$1,200', duration: '8 sessions + extras' },
      ],
      color: 'lavender',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'group',
      title: 'Group Programs',
      subtitle: 'Community Healing',
      description: 'Join a supportive circle of women on similar healing journeys. Group programs offer the power of community witnessing, shared experiences, and collective transformation.',
      features: [
        'Weekly group calls',
        'Private community access',
        'Guest expert sessions',
        'Accountability partners',
        'Lifetime access to recordings',
      ],
      pricing: [
        { name: 'V.I.B.I.N Circle', price: '$297', duration: '6-week program', popular: true },
        { name: 'Healing Sisterhood', price: '$497', duration: '12-week journey' },
        { name: 'Monthly Membership', price: '$67/mo', duration: 'Ongoing support' },
      ],
      color: 'warmth',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; gradient: string; light: string }> = {
      sage: {
        bg: 'bg-sage-500',
        text: 'text-sage-600',
        gradient: 'from-sage-400 to-sage-500',
        light: 'bg-sage-100',
      },
      lavender: {
        bg: 'bg-lavender-500',
        text: 'text-lavender-600',
        gradient: 'from-lavender-400 to-lavender-500',
        light: 'bg-lavender-100',
      },
      warmth: {
        bg: 'bg-warmth-500',
        text: 'text-warmth-600',
        gradient: 'from-warmth-400 to-warmth-500',
        light: 'bg-warmth-100',
      },
    }
    return colors[color] || colors.sage
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 gradient-lavender relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-sage-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-warmth-200 rounded-full blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-2 bg-white/50 text-lavender-700 rounded-full text-sm font-medium mb-6">
            Services & Offerings
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-sage-900 mb-6">
            Choose Your Path to Healing
          </h1>
          <p className="text-sage-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Every journey is unique. Explore the services below and find what resonates with 
            where you are right now. Not sure? Book a free discovery call and we'll find 
            the perfect fit together.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-sage-500 to-sage-600 text-white px-8 py-4 rounded-full font-medium hover:from-sage-600 hover:to-sage-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Book Free Discovery Call
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => {
              const colorClasses = getColorClasses(service.color)
              
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`grid lg:grid-cols-2 gap-12 items-start ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Side */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClasses.gradient} flex items-center justify-center text-white mb-6`}>
                      {service.icon}
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-sage-900 mb-2">
                      {service.title}
                    </h2>
                    <p className={`${colorClasses.text} font-medium mb-4`}>{service.subtitle}</p>
                    <p className="text-sage-600 leading-relaxed mb-8">
                      {service.description}
                    </p>
                    
                    <h3 className="text-sm font-semibold text-sage-800 uppercase tracking-wide mb-4">
                      What's Included
                    </h3>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <svg className={`w-5 h-5 ${colorClasses.text} mt-0.5 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sage-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing Side */}
                  <div className={`bg-cream-50 rounded-3xl p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h3 className="text-xl font-semibold text-sage-800 mb-6">Investment Options</h3>
                    <div className="space-y-4">
                      {service.pricing.map((option, i) => (
                        <div
                          key={i}
                          className={`relative p-6 rounded-2xl border-2 transition-all ${
                            option.popular
                              ? `border-${service.color}-400 bg-white shadow-lg`
                              : 'border-sage-200 bg-white hover:border-sage-300'
                          }`}
                        >
                          {option.popular && (
                            <span className={`absolute -top-3 left-6 px-3 py-1 ${colorClasses.bg} text-white text-xs font-medium rounded-full`}>
                              Most Popular
                            </span>
                          )}
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-sage-800">{option.name}</h4>
                              <p className="text-sage-500 text-sm mt-1">{option.duration}</p>
                            </div>
                            <p className="text-2xl font-bold text-sage-900">{option.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/contact"
                      className={`mt-8 block text-center bg-gradient-to-r ${colorClasses.gradient} text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-all`}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 gradient-sage">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sage-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sage-600 text-lg">
              Have questions? I've got answers.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "How do I know which service is right for me?",
                a: "That's what the free discovery call is for! We'll chat about where you are, what you're looking for, and I'll help guide you toward the service that best fits your needs. There's no pressure—just an honest conversation.",
              },
              {
                q: "Do you offer virtual sessions?",
                a: "Yes! All sessions are conducted virtually via Zoom, which means we can work together no matter where you're located in the world. Virtual sessions are just as effective and offer the comfort of being in your own space.",
              },
              {
                q: "What if I need to cancel or reschedule?",
                a: "Life happens! I ask for 24 hours notice for rescheduling. Cancellations with less notice may forfeit the session, but I'm always willing to work with you if emergencies arise.",
              },
              {
                q: "Are your services a replacement for therapy?",
                a: "Coaching is complementary to, but different from, therapy. While I'm trained in trauma-informed practices, I'm a wellness coach, not a licensed therapist. If you're dealing with severe mental health issues, I recommend working with a licensed mental health professional alongside coaching.",
              },
              {
                q: "What payment methods do you accept?",
                a: "I accept all major credit cards, PayPal, and can arrange payment plans for larger packages. Let's not let finances be a barrier—reach out and we can discuss options.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-sage-800 mb-3">{faq.q}</h3>
                <p className="text-sage-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-sage-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lavender-600 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-warmth-500 rounded-full blur-3xl opacity-10"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-cream-100 mb-6">
            Still Have Questions?
          </h2>
          <p className="text-cream-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            I'm here to help you find the right path. Book a free discovery call and 
            let's explore your options together—no commitment, just conversation.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-lavender-500 to-lavender-600 text-white px-10 py-4 rounded-full font-medium hover:from-lavender-600 hover:to-lavender-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Book Your Free Discovery Call
          </Link>
        </div>
      </section>
    </div>
  )
}
