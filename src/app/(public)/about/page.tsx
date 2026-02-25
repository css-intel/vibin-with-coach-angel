import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import Logo from '@/components/Logo'

export const metadata: Metadata = {
  title: 'About Coach Angel | Certified Life Coach & Doula',
  description: 'Meet Coach Angel - a holistic health coach and doula dedicated to helping women heal through vulnerability, intuition, balance, inner healing, and nourishment.',
}

export default function AboutPage() {
  const values = [
    {
      title: 'Trauma-Informed Approach',
      description: 'Every session is rooted in safety, consent, and gentle guidance. Your pace is always honored.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Holistic Perspective',
      description: 'I see you as a whole person—Spirit, Mind, & Body are all connected in the healing journey.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: 'Compassionate Space',
      description: 'There is no judgment here—only understanding, empathy, and unconditional support.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Empowerment Focused',
      description: 'My goal is to help you reconnect with your own inner wisdom and strength—you are your own healer.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ]

  const journey = [
    {
      year: 'The Beginning',
      title: 'My Own Healing Journey',
      description: 'Like many of you, I found myself at a crossroads—struggling with burnout, disconnected from my body, and searching for meaning. This crisis became my calling.',
    },
    {
      year: 'The Training',
      title: 'Deep Study & Certification',
      description: 'I immersed myself in holistic wellness, trauma-informed practices, and nervous system regulation. My path also led me to become a certified Doula, honoring the sacred transition of birth.',
    },
    {
      year: 'The Mission',
      title: 'Holistic Support for Women',
      description: 'Now, I dedicate my life to holding space for women who are ready to transform or bring new life into the world. The V.I.B.I.N philosophy guides my work as both a Life Coach and a Doula.',
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 gradient-sage relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-lavender-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-warmth-200 rounded-full blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="aspect-[4/5] max-w-lg mx-auto rounded-3xl bg-gradient-to-br from-sage-100 via-lavender-100 to-warmth-100 p-4">
                <div className="w-full h-full rounded-2xl bg-white overflow-hidden relative shadow-xl">
                  <Image 
                    src="/images/profilenew.png"
                    alt="Coach Angel - Certified Life Coach & Doula"
                    fill
                    sizes="(min-width: 1024px) 32rem, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: '50% 20%' }}
                    priority
                  />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-warmth-200 rounded-full opacity-50"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-lavender-200 rounded-full opacity-50"></div>
            </div>

            {/* Content Side */}
            <div>
              <span className="inline-block px-4 py-2 bg-lavender-100 text-lavender-700 rounded-full text-sm font-medium mb-6">
                My Story
              </span>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-sage-900 mb-6">
                Hello, I'm Angel
              </h1>
              <div className="space-y-4 text-sage-600 leading-relaxed text-lg">
                <p>
                  I'm a certified Holistic Life Coach and Doula with a deep passion for helping women 
                  reconnect with their authentic selves, embrace their power, and find their path to healing and joyful mothering.
                </p>
                <p>
                  My approach is rooted in the belief that true wellness encompasses mind, body, 
                  and spirit. Whether supporting a birth or guiding a life transition, I bring 
                  vulnerability, intuition, and balance—the pillars of V.I.B.I.N—to every client relationship.
                </p>
                <p>
                  Whether you're preparing for childbirth, navigating a major life transition, healing from past trauma, 
                  or simply seeking more balance and peace in your daily life, I'm here to 
                  walk alongside you with compassion, understanding, and unwavering support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sage-900 mb-4">
              My Journey to This Work
            </h2>
            <p className="text-sage-600 max-w-2xl mx-auto text-lg">
              The path that led me to become a wellness coach wasn't linear—it was beautifully winding.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-sage-300 via-lavender-300 to-warmth-300"></div>
            
            <div className="space-y-12">
              {journey.map((item, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-1 md:text-right">
                    {index % 2 === 0 && (
                      <div className="bg-cream-50 rounded-2xl p-8 md:ml-auto md:max-w-lg">
                        <span className="text-lavender-500 font-medium text-sm">{item.year}</span>
                        <h3 className="text-xl font-semibold text-sage-800 mt-2 mb-3">{item.title}</h3>
                        <p className="text-sage-600 leading-relaxed">{item.description}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Center dot */}
                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-sage-400 to-lavender-400 ring-4 ring-white"></div>
                  </div>
                  
                  <div className="flex-1">
                    {index % 2 !== 0 && (
                      <div className="bg-cream-50 rounded-2xl p-8 md:mr-auto md:max-w-lg">
                        <span className="text-lavender-500 font-medium text-sm">{item.year}</span>
                        <h3 className="text-xl font-semibold text-sage-800 mt-2 mb-3">{item.title}</h3>
                        <p className="text-sage-600 leading-relaxed">{item.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 gradient-lavender">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sage-900 mb-4">
              What I Believe
            </h2>
            <p className="text-sage-600 max-w-2xl mx-auto text-lg">
              These core values guide every interaction and session.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sage-100 to-lavender-100 flex items-center justify-center text-sage-600 mb-6">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-sage-800 mb-3">{value.title}</h3>
                <p className="text-sage-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Note Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-sage-50 via-lavender-50 to-warmth-50 rounded-3xl p-10 md:p-16 text-center">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-sage-400 via-lavender-400 to-warmth-400 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p className="text-sage-700 text-xl md:text-2xl leading-relaxed font-serif italic mb-8">
              "I know what it feels like to be disconnected from yourself, to carry the weight 
              of unprocessed emotions, and to wonder if healing is even possible. I'm here to 
              tell you: it is. And you don't have to do it alone."
            </p>
            <p className="text-sage-600 font-medium mb-8">— Coach Angel</p>
            <Link
              href="/about/my-story"
              className="inline-flex items-center text-lavender-600 font-medium hover:text-lavender-700 transition-colors group"
            >
              Read My Full Transition Story
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-sage-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lavender-600 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-warmth-500 rounded-full blur-3xl opacity-10"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-cream-100 mb-6">
            Let's Begin Your Healing Journey Together
          </h2>
          <p className="text-cream-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            I'd love to learn more about you and explore how we can work together. 
            Book a free discovery call—no pressure, just a warm conversation.
          </p>
          <a
            href="/book"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-lavender-500 to-lavender-600 text-white px-10 py-4 rounded-full font-medium hover:from-lavender-600 hover:to-lavender-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Book Your Free Discovery Call
          </a>
        </div>
      </section>
    </div>
  )
}
