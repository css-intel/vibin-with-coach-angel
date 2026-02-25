import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Transition Story | VIBIN with Coach Angel',
  description: 'The lived experience behind my Transition Coaching — from chronic health challenges and divorce to spiritual awakening and financial rebuilding.',
}

export default function MyStoryPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 gradient-sage relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-lavender-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-warmth-200 rounded-full blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <span className="inline-block px-4 py-2 bg-lavender-100 text-lavender-700 rounded-full text-sm font-medium mb-6">
                Why I Do This Work
              </span>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-sage-900 mb-6">
                My Transition Story
              </h1>
              <p className="text-sage-600 text-lg leading-relaxed">
                Transformation doesn't happen in spite of disruption—it happens because of it.
                This is the story of how I rebuilt my life and why I'm now called to guide others through theirs.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-72 h-72 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-lavender-300 to-warmth-300 rounded-3xl rotate-3"></div>
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/angel-profile.jpg"
                    alt="Coach Angel - My Transition Story"
                    fill
                    className="object-cover"
                    style={{ objectPosition: '50% 20%' }}
                    sizes="(max-width: 768px) 288px, 320px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Opening */}
          <div className="prose prose-sage prose-lg max-w-none mb-16">
            <p className="text-sage-700 text-xl leading-relaxed mb-8">
              I didn't choose this path—life chose it for me. And looking back, I wouldn't have it any other way.
            </p>
            <p className="text-sage-600 leading-relaxed">
              There was a time when I had what looked like a "put together" life. A family, a home, 
              a career path. But underneath, I was running on empty—physically depleted, emotionally 
              disconnected, and spiritually lost. I didn't realize it then, but I was heading toward 
              a breaking point that would ultimately become my breakthrough.
            </p>
          </div>

          {/* Chapter: Health Disruption */}
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center text-white mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif font-bold text-sage-900">When My Body Said "No More"</h2>
            </div>
            <div className="bg-cream-50 rounded-2xl p-8 border-l-4 border-teal-400">
              <p className="text-sage-600 leading-relaxed mb-4">
                Chronic health challenges forced me to stop. My body was sending signals I had ignored 
                for years—fatigue that wouldn't lift, pain that seemed to come from nowhere, a nervous 
                system constantly on high alert.
              </p>
              <p className="text-sage-600 leading-relaxed">
                I learned that healing isn't just about treating symptoms—it's about listening to what 
                your body is desperately trying to tell you. This became the foundation of how I approach 
                the <span className="font-semibold text-sage-700">Body</span> pillar in my coaching today.
              </p>
            </div>
          </div>

          {/* Chapter: Relationship Disruption */}
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lavender-400 to-lavender-500 flex items-center justify-center text-white mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif font-bold text-sage-900">Rebuilding After Divorce</h2>
            </div>
            <div className="bg-cream-50 rounded-2xl p-8 border-l-4 border-lavender-400">
              <p className="text-sage-600 leading-relaxed mb-4">
                When my marriage ended, I didn't just lose a relationship—I lost the identity I had built 
                around it. Single parenthood meant redefining everything: who I was, what I wanted, and how 
                I would show up for my children while also showing up for myself.
              </p>
              <p className="text-sage-600 leading-relaxed">
                This season taught me that identity is not fixed. We can reconstruct who we are, 
                piece by piece, with intention and grace. This is why <span className="font-semibold text-sage-700">Mind</span>—our 
                thoughts, beliefs, and sense of self—is central to transition work.
              </p>
            </div>
          </div>

          {/* Chapter: Financial Disruption */}
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-warmth-400 to-warmth-500 flex items-center justify-center text-white mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif font-bold text-sage-900">Rock Bottom & Financial Rebuilding</h2>
            </div>
            <div className="bg-cream-50 rounded-2xl p-8 border-l-4 border-warmth-400">
              <p className="text-sage-600 leading-relaxed mb-4">
                There were moments when I didn't know how I would make it through the month. Financial 
                stress layered on top of health challenges and single parenthood created a pressure 
                that felt unbearable. I had to learn—quickly—how to regulate my nervous system around 
                money, heal my relationship with finances, and build real stability from scratch.
              </p>
              <p className="text-sage-600 leading-relaxed">
                This journey is why <span className="font-semibold text-sage-700">Wealth</span> is a 
                non-negotiable part of my coaching framework. Financial wellness isn't separate from 
                emotional or spiritual wellness—it's deeply connected.
              </p>
            </div>
          </div>

          {/* Chapter: Spiritual Awakening */}
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sage-400 to-sage-500 flex items-center justify-center text-white mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif font-bold text-sage-900">The Awakening</h2>
            </div>
            <div className="bg-cream-50 rounded-2xl p-8 border-l-4 border-sage-400">
              <p className="text-sage-600 leading-relaxed mb-4">
                In the midst of everything falling apart, something else began to emerge. I started 
                reconnecting with myself in ways I never had before. Through breathwork, inner child 
                healing, shadow work, and deep spiritual practice, I discovered a version of myself 
                that had always been there—waiting to be seen.
              </p>
              <p className="text-sage-600 leading-relaxed">
                This is the <span className="font-semibold text-sage-700">Spirit</span> pillar—the 
                foundation that holds everything else together. When we're connected to something 
                greater than ourselves, we can weather any storm.
              </p>
            </div>
          </div>

          {/* The Integration */}
          <div className="bg-gradient-to-br from-sage-50 via-lavender-50 to-warmth-50 rounded-3xl p-10 md:p-16 mb-16">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-sage-900 mb-6 text-center">
              From Surviving to Thriving
            </h2>
            <p className="text-sage-700 text-lg leading-relaxed mb-6 text-center">
              I didn't just survive these transitions—I transformed through them. Every challenge 
              became a teacher. Every breakdown became a breakthrough.
            </p>
            <p className="text-sage-600 leading-relaxed text-center">
              Today, I'm healthier than I've ever been. I've rebuilt financial stability and 
              security. I've found deep spiritual connection and purpose. I've created a life 
              that honors who I truly am—not who I thought I was supposed to be.
            </p>
          </div>

          {/* The Mission Statement */}
          <div className="text-center mb-16">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-sage-400 via-lavender-400 to-warmth-400 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p className="text-sage-800 text-xl md:text-2xl leading-relaxed font-serif italic max-w-3xl mx-auto">
              "This lived experience is the foundation of my Transition Coaching programs. 
              I don't teach theory—I teach what I've walked through, what I've healed from, 
              and what I continue to practice every single day."
            </p>
            <p className="text-sage-600 font-medium mt-6">— Coach Angel</p>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-sage-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lavender-600 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-warmth-500 rounded-full blur-3xl opacity-10"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-cream-100 mb-6">
            Ready to Write Your Own Transformation Story?
          </h2>
          <p className="text-cream-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            If you're navigating your own life disruption—whether it's health, relationships, finances, 
            or identity—know that you don't have to figure it out alone. I've been where you are, 
            and I'm here to walk alongside you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/work-with-me"
              className="inline-block bg-gradient-to-r from-lavender-500 to-lavender-600 text-white px-10 py-4 rounded-full font-medium hover:from-lavender-600 hover:to-lavender-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore Transition Coaching
            </Link>
            <Link
              href="/book"
              className="inline-block border-2 border-cream-300 text-cream-100 px-10 py-4 rounded-full font-medium hover:bg-cream-100 hover:text-sage-900 transition-all"
            >
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-cream-50 border-t border-sage-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-sage-500 leading-relaxed text-center">
            This story is shared for educational and inspirational purposes. Individual experiences and 
            outcomes vary. Transition Coaching is a personal development service and is not a substitute 
            for therapy, medical care, or professional financial advice.
          </p>
        </div>
      </section>
    </div>
  )
}
