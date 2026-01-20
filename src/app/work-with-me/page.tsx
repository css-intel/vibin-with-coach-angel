import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work With Me | VIBIN with Coach Angel',
  description: 'Explore holistic coaching services including life transitions, healing, breathwork, and wealth wellness education with certified Life Coach and Doula Angel.',
}

export default function WorkWithMePage() {
  const coachingServices = [
    {
      id: 'transitions',
      title: 'Transition Coaching',
      subtitle: 'Navigate Life\'s Big Changes',
      description: 'Life disruptions don\'t define you—how you move through them does. My Transition Coaching combines compassion with practical tools to help you rebuild after health challenges, relationship changes, career shifts, financial stress, or any major life pivot.',
      features: [
        'Spirit, Mind, Body & Wealth alignment',
        'Nervous system regulation & emotional resilience',
        'Identity reconstruction & purpose realignment',
        'Practical rebuilding strategies',
        'Spiritual awakening & personal empowerment',
      ],
      pricing: [
        { name: 'Single Session', price: '$150', duration: '60 minutes' },
        { name: '6-Session Transition Journey', price: '$800', duration: 'Save $100', popular: true },
        { name: '12-Week Intensive', price: '$1500', duration: 'Weekly + support' },
      ],
      color: 'teal',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'coaching',
      title: '1-on-1 Holistic Coaching',
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
      id: 'doula',
      title: 'Holistic Doula Support',
      subtitle: 'Nurturing Your Birth Journey',
      description: 'As a certified Doula, I provide continuous physical, emotional, and informational support to you and your partner before, during, and after childbirth.',
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
  ]

  const colorMap = {
    sage: 'from-sage-500 to-sage-600',
    lavender: 'from-lavender-500 to-lavender-600',
    warmth: 'from-warmth-500 to-warmth-600',
    teal: 'from-teal-500 to-teal-600',
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 gradient-sage relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-lavender-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-warmth-200 rounded-full blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-2 bg-lavender-100 text-lavender-700 rounded-full text-sm font-medium mb-6">
            My Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-sage-900 mb-6">
            Work With Me
          </h1>
          <p className="text-sage-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Whether you're navigating a major life transition, healing from past patterns, or preparing for birth, 
            I offer transformative coaching rooted in Spirit, Mind, Body, and Wealth alignment.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-sage-50 to-lavender-50 rounded-3xl p-10 md:p-16">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-sage-900 mb-6">
              V.I.B.I.N. Philosophy
            </h2>
            <p className="text-sage-700 text-lg leading-relaxed mb-6">
              Every service I offer is built on five core principles: <span className="font-semibold">Vulnerability, Intuition, Balance, Inner Healing, and Nourishment.</span>
            </p>
            <p className="text-sage-600 text-lg leading-relaxed">
              Whether you're working through life transitions, healing emotional wounds, preparing for birth, 
              or rebuilding after disruption, these principles guide our work together. You are not broken—
              you simply need support to remember your wholeness.
            </p>
          </div>
        </div>
      </section>

      {/* Signature Programs Section */}
      <section className="py-24 bg-gradient-to-b from-lavender-50 to-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-lavender-100 text-lavender-700 rounded-full text-sm font-medium mb-6">
              Premium Programs
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sage-900 mb-4">
              V.I.B.I.N. Signature Programs
            </h2>
            <p className="text-sage-600 max-w-2xl mx-auto text-lg">
              Comprehensive, bundled pathways designed for specific transformational goals. 
              Each program combines coaching, education, and sustainable practices.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Reset Program */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border-2 border-sage-200 hover:border-sage-400">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sage-400 to-sage-500 flex items-center justify-center text-white mb-6 text-3xl">
                🔄
              </div>
              <h3 className="text-2xl font-serif font-bold text-sage-900 mb-3">
                The Reset
              </h3>
              <p className="text-lavender-600 font-semibold mb-4">
                Nervous System Restoration & Foundation
              </p>
              <p className="text-sage-600 leading-relaxed mb-6">
                Designed for those feeling overwhelmed, burnt out, or disconnected. This 8-week intensive focuses 
                on nervous system regulation, emotional release, and rebuilding your foundation.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-lavender-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sage-600">2 coaching sessions/month</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-lavender-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sage-600">Breathwork & somatic practices</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-lavender-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sage-600">Reset Workbook & daily practices</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-lavender-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sage-600">Email support between sessions</span>
                </div>
              </div>
              <div className="bg-sage-50 rounded-2xl p-4 mb-6">
                <p className="text-sage-700 font-bold text-2xl">$800</p>
                <p className="text-sage-600 text-sm">8-week program</p>
              </div>
              <Link
                href="/contact"
                className="block w-full bg-gradient-to-r from-sage-500 to-sage-600 text-white px-6 py-3 rounded-full font-medium text-center hover:from-sage-600 hover:to-sage-700 transition-all"
              >
                Enroll in Reset
              </Link>
            </div>

            {/* Transition Path */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border-2 border-teal-300 hover:border-teal-500 relative">
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-teal-400 to-teal-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center text-white mb-6 text-3xl">
                🌿
              </div>
              <h3 className="text-2xl font-serif font-bold text-sage-900 mb-3">
                The Transition Path
              </h3>
              <p className="text-teal-600 font-semibold mb-4">
                Life Disruption to Rebuilt Identity
              </p>
              <p className="text-sage-600 leading-relaxed mb-6">
                The signature program for navigating major life changes. Combines transition coaching with 
                nervous system work, identity reconstruction, and practical rebuilding strategies for health, 
                relationships, finances, and spirit.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-teal-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sage-600">2-3 sessions/month for 16 weeks</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-teal-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sage-600">Spirit, Mind, Body & Wealth alignment</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-teal-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sage-600">Transition & Rebuilding Workbook</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-teal-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sage-600">Monthly group integration circles</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-teal-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sage-600">Priority email & text support</span>
                </div>
              </div>
              <div className="bg-teal-50 rounded-2xl p-4 mb-6">
                <p className="text-teal-700 font-bold text-2xl">$2,400</p>
                <p className="text-teal-600 text-sm">16-week transformational journey</p>
              </div>
              <Link
                href="/contact"
                className="block w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-full font-medium text-center hover:from-teal-600 hover:to-teal-700 transition-all"
              >
                Start Your Transition Path
              </Link>
            </div>

            {/* Specialized Pathways */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border-2 border-warmth-200 hover:border-warmth-400">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-warmth-400 to-warmth-500 flex items-center justify-center text-white mb-6 text-3xl">
                ✨
              </div>
              <h3 className="text-2xl font-serif font-bold text-sage-900 mb-3">
                Specialized Pathways
              </h3>
              <p className="text-warmth-600 font-semibold mb-4">
                Custom Coaching for Your Unique Needs
              </p>
              <p className="text-sage-600 leading-relaxed mb-6">
                Custom-designed programs for specific life transitions. Examples: postpartum & motherhood 
                transitions, health crisis healing, divorce & rebuilding, financial crisis recovery, career 
                transformation, or any combination of transitions unique to you.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-warmth-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sage-600">Completely customized to you</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-warmth-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sage-600">Flexible duration & frequency</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-warmth-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sage-600">Blend of coaching modalities</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-warmth-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sage-600">Dedicated support & accountability</span>
                </div>
              </div>
              <div className="bg-warmth-50 rounded-2xl p-4 mb-6">
                <p className="text-warmth-700 font-bold text-lg">Custom Pricing</p>
                <p className="text-warmth-600 text-sm">Based on scope & duration</p>
              </div>
              <Link
                href="/contact"
                className="block w-full bg-gradient-to-r from-warmth-500 to-warmth-600 text-white px-6 py-3 rounded-full font-medium text-center hover:from-warmth-600 hover:to-warmth-700 transition-all"
              >
                Design Your Program
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sage-900 mb-4">
              Core Coaching Services
            </h2>
            <p className="text-sage-600 max-w-2xl mx-auto text-lg">
              Choose the support that resonates with where you are in your journey.
            </p>
          </div>

          <div className="space-y-12">
            {coachingServices.map((service, index) => {
              const isEven = index % 2 === 0
              const colors = colorMap[service.color as keyof typeof colorMap]
              
              return (
                <div key={service.id} className="grid lg:grid-cols-2 gap-12 items-center py-12 border-b border-sage-200 last:border-b-0">
                  <div className={isEven ? 'order-1' : 'order-2 lg:order-1'}>
                    <span className="inline-block px-4 py-2 bg-lavender-100 text-lavender-700 rounded-full text-sm font-medium mb-4">
                      {service.subtitle}
                    </span>
                    <h3 className="text-3xl font-serif font-bold text-sage-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-sage-600 text-lg leading-relaxed mb-6">
                      {service.description}
                    </p>
                    
                    <div className="mb-8">
                      <h4 className="font-semibold text-sage-800 mb-4">What's Included:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sage-600">
                            <svg className="w-5 h-5 mr-3 text-lavender-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href="/contact"
                      className={`inline-block bg-gradient-to-r ${colors} text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all`}
                    >
                      Learn More & Book
                    </Link>
                  </div>

                  <div className={isEven ? 'order-2' : 'order-1 lg:order-2'}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors} flex items-center justify-center text-white mb-6`}>
                        {service.icon}
                      </div>
                      
                      <h4 className="font-semibold text-sage-900 mb-6 text-lg">Pricing Options:</h4>
                      <div className="space-y-4">
                        {service.pricing.map((option, idx) => (
                          <div key={idx} className={`p-4 rounded-xl ${option.popular ? 'bg-gradient-to-r from-lavender-50 to-sage-50 border-2 border-lavender-300' : 'bg-cream-50 border border-sage-200'}`}>
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-semibold text-sage-800">{option.name}</h5>
                              {option.popular && <span className="text-xs font-bold text-lavender-600 bg-lavender-100 px-2 py-1 rounded-full">POPULAR</span>}
                            </div>
                            <p className="text-lavender-700 font-bold text-lg mb-1">{option.price}</p>
                            <p className="text-sage-600 text-sm">{option.duration}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-sage-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lavender-600 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-warmth-500 rounded-full blur-3xl opacity-10"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-cream-100 mb-6">
            Ready to Begin?
          </h2>
          <p className="text-cream-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            I'd love to learn more about you and explore how we can work together. 
            Book a free discovery call—no pressure, just a warm conversation.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-lavender-500 to-lavender-600 text-white px-10 py-4 rounded-full font-medium hover:from-lavender-600 hover:to-lavender-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Book Your Free Discovery Call
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-cream-50 border-t border-sage-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-sage-600 leading-relaxed">
              <span className="font-semibold">Coaching Scope:</span> Coaching is a personal development and support service 
              focused on life transitions, emotional regulation, mindset, and self-empowerment. Coaching is not therapy, 
              counseling, or clinical treatment and does not diagnose or treat medical or psychological conditions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
