import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 gradient-sage"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-lavender-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-warmth-200 rounded-full blur-3xl opacity-30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <span className="inline-block px-4 py-2 bg-lavender-100 text-lavender-700 rounded-full text-sm font-medium mb-6">
              ✨ Holistic Life Coaching & Doula Support
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-sage-900 leading-tight mb-6">
              Begin Your Journey to
              <span className="text-gradient block mt-2">Wholeness & Healing</span>
            </h1>
            <p className="text-lg text-sage-600 mb-8 max-w-xl leading-relaxed">
              Through <span className="text-lavender-600 font-semibold">V</span>ulnerability, 
              <span className="text-lavender-600 font-semibold"> I</span>ntuition, 
              <span className="text-lavender-600 font-semibold"> B</span>alance, 
              <span className="text-lavender-600 font-semibold"> I</span>nner Healing, and 
              <span className="text-lavender-600 font-semibold"> N</span>ourishment — discover a 
              holistic path that honors your whole self and guides you toward your most vibrant life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-sage-500 to-sage-600 text-white px-8 py-4 rounded-full text-center font-medium hover:from-sage-600 hover:to-sage-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Book Your Free Discovery Call
              </Link>
              <Link
                href="/services"
                className="border-2 border-sage-300 text-sage-700 px-8 py-4 rounded-full text-center font-medium hover:bg-sage-50 transition-all"
              >
                Explore Services
              </Link>
            </div>
          </div>
          
          {/* Hero Image - Profile Photo */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square rounded-full bg-gradient-to-br from-lavender-200 via-sage-100 to-warmth-200 p-4 animate-float">
              <div className="w-full h-full rounded-full bg-cream-100 flex items-center justify-center overflow-hidden relative border-4 border-white shadow-2xl">
                <Image 
                  src="/images/angel-profile.jpg"
                  alt="Coach Angel - Certified Life Coach & Doula"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute top-10 right-10 w-16 h-16 bg-warmth-300 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute bottom-20 left-0 w-12 h-12 bg-lavender-300 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  )
}

// VIBIN Meaning Section
function VibinSection() {
  const meanings = [
    {
      letter: 'V',
      word: 'Vulnerability',
      description: 'Embrace the courage to be seen authentically, creating space for true healing and connection.',
      color: 'from-sage-400 to-sage-500',
    },
    {
      letter: 'I',
      word: 'Intuition',
      description: 'Reconnect with your inner knowing and trust the wisdom that lives within you.',
      color: 'from-lavender-400 to-lavender-500',
    },
    {
      letter: 'B',
      word: 'Balance',
      description: 'Find harmony between mind, body, and spirit through intentional practices.',
      color: 'from-warmth-400 to-warmth-500',
    },
    {
      letter: 'I',
      word: 'Inner Healing',
      description: 'Gently tend to wounds of the past and nurture your inner child back to wholeness.',
      color: 'from-sage-400 to-lavender-400',
    },
    {
      letter: 'N',
      word: 'Nourishment',
      description: 'Feed your soul with practices, relationships, and choices that truly serve you.',
      color: 'from-lavender-400 to-warmth-400',
    },
  ]

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cream-50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sage-900 mb-4">
            The V.I.B.I.N Philosophy
          </h2>
          <p className="text-sage-600 max-w-2xl mx-auto text-lg">
            A holistic healing path that honors your whole person—mind, body, and spirit.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {meanings.map((item, index) => (
            <div
              key={index}
              className="group bg-cream-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <span className="text-white font-serif text-2xl font-bold">{item.letter}</span>
              </div>
              <h3 className="text-sage-800 font-semibold text-lg mb-2">{item.word}</h3>
              <p className="text-sage-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// About Preview Section
function AboutPreview() {
  return (
    <section className="py-24 gradient-lavender">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image/Visual Side */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-sage-100 via-lavender-100 to-warmth-100 p-4 rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full rounded-2xl bg-white overflow-hidden relative shadow-xl">
                 <Image 
                  src="/images/angel-profile.jpg"
                  alt="Coach Angel - Holistic Wellness Guide"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-warmth-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-lavender-200 rounded-full opacity-50"></div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <span className="inline-block px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-6">
              Meet Your Coach
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sage-900 mb-6">
              Hi, I'm Angel — Your Partner in Healing
            </h2>
            <div className="space-y-4 text-sage-600 leading-relaxed">
              <p>
                As a holistic health and wellness coach, I believe that true healing begins when we 
                reconnect with our inner peace. My journey through personal transformation taught me 
                that we all carry the power to heal within us.
              </p>
              <p>
                I specialize in helping women navigate life transitions, heal from emotional wounds, 
                and restore their nervous systems through trauma-informed practices, breathwork, 
                and compassionate guidance.
              </p>
              <p>
                Whether you're working through shadow work, nurturing your inner child, or simply 
                seeking balance in a chaotic world, I'm here to walk alongside you with gentleness 
                and understanding.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center mt-8 text-lavender-600 font-medium hover:text-lavender-700 transition-colors group"
            >
              Read My Full Story
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// Services Overview Section
function ServicesOverview() {
  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: '1-on-1 Coaching',
      description: 'Personalized sessions tailored to your unique healing journey and goals.',
      color: 'bg-sage-100 text-sage-600',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Breathwork Sessions',
      description: 'Restore your nervous system and release stored emotions through guided breathwork.',
      color: 'bg-lavender-100 text-lavender-600',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Inner Child Healing',
      description: 'Gently reconnect with and heal the wounded parts of yourself from the past.',
      color: 'bg-warmth-100 text-warmth-600',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Life Transitions Support',
      description: 'Navigate major life changes with grace, clarity, and renewed purpose.',
      color: 'bg-sage-100 text-sage-600',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
      title: 'Shadow Work',
      description: 'Explore and integrate hidden aspects of yourself for deeper self-awareness.',
      color: 'bg-lavender-100 text-lavender-600',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
      title: 'Holistic Doula Support',
      description: 'Nurturing physical and emotional support for your pregnancy, birth, and postpartum journey.',
      color: 'bg-warmth-100 text-warmth-600',
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-lavender-100 text-lavender-700 rounded-full text-sm font-medium mb-6">
            How I Can Help
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sage-900 mb-4">
            Services to Support Your Journey
          </h2>
          <p className="text-sage-600 max-w-2xl mx-auto text-lg">
            Every healing journey is unique. Choose the support that resonates with where you are right now.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-cream-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-sage-100"
            >
              <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-sage-800 mb-3">{service.title}</h3>
              <p className="text-sage-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center text-lavender-600 font-medium hover:text-lavender-700 transition-colors group"
          >
            View All Services & Pricing
            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Working with Coach Angel has been transformative. Her gentle, trauma-informed approach helped me finally feel safe enough to heal wounds I'd been carrying for decades.",
      name: "Sarah M.",
      title: "Life Coaching Client",
    },
    {
      quote: "The breathwork sessions changed my life. I never knew how much tension I was holding in my body until Angel guided me to release it. I feel lighter than I have in years.",
      name: "Jennifer K.",
      title: "Breathwork Client",
    },
    {
      quote: "Angel created such a nurturing space for me to do my inner child work. Her compassion and insight helped me reconnect with parts of myself I'd abandoned long ago.",
      name: "Michelle R.",
      title: "Inner Healing Client",
    },
  ]

  return (
    <section className="py-24 gradient-warmth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-white/50 text-warmth-700 rounded-full text-sm font-medium mb-6">
            Client Love
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sage-900 mb-4">
            Words from the Heart
          </h2>
          <p className="text-sage-600 max-w-2xl mx-auto text-lg">
            Real stories from women who've walked this healing path.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 rounded-full bg-lavender-100 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-lavender-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-sage-700 leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
              <div className="border-t border-sage-100 pt-6">
                <p className="font-semibold text-sage-800">{testimonial.name}</p>
                <p className="text-sage-500 text-sm">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="py-24 bg-sage-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lavender-600 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-warmth-500 rounded-full blur-3xl opacity-10"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream-100 mb-6">
          Ready to Start Your Healing Journey?
        </h2>
        <p className="text-cream-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Take the first step toward wholeness. Book a free discovery call and let's explore 
          how we can work together to support your transformation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-gradient-to-r from-lavender-500 to-lavender-600 text-white px-10 py-4 rounded-full font-medium hover:from-lavender-600 hover:to-lavender-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Book Your Free Discovery Call
          </Link>
          <Link
            href="/services"
            className="border-2 border-cream-300 text-cream-100 px-10 py-4 rounded-full font-medium hover:bg-cream-100/10 transition-all"
          >
            Learn More About Services
          </Link>
        </div>
      </div>
    </section>
  )
}

// Main Home Page
export default function Home() {
  return (
    <>
      <HeroSection />
      <VibinSection />
      <AboutPreview />
      <ServicesOverview />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
