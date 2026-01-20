import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources | VIBIN with Coach Angel',
  description: 'Wealth wellness education, community programs, and trusted resources to support your journey beyond coaching.',
}

export default function ResourcesPage() {
  const resources = [
    {
      category: 'Wealth Wellness Education',
      description: 'Educational pathways for financial literacy, money mindset healing, financial protection, and homeownership readiness.',
      items: [
        {
          title: 'Financial Literacy & Wellness',
          subtitle: 'Budgeting, Credit & Debt Navigation',
          description: 'Learn practical financial foundations including budgeting, credit awareness, debt navigation, and building financial confidence during life transitions.',
          icon: '💰',
        },
        {
          title: 'Money Mindset Healing',
          subtitle: 'Nervous System & Money Stories',
          description: 'Heal money trauma, regulate your nervous system around finances, and rewrite inherited money beliefs that limit your abundance.',
          icon: '🧠',
        },
        {
          title: 'Financial Protection & Legacy',
          subtitle: 'Life Insurance & Generational Wealth',
          description: 'Education on protecting your family and building generational wealth. External link to Primerica for insurance solutions.',
          link: 'https://www.primerica.com',
          cta: 'Explore Financial Protection',
          icon: '🛡️',
        },
        {
          title: 'Homeownership & Real Estate Readiness',
          subtitle: 'Education for First-Time & Future Homeowners',
          description: 'Learn about homeownership readiness, real estate investment principles, and preparation for your next home journey.',
          link: 'https://realestatewithangel.kw.com',
          cta: 'Real Estate Education',
          icon: '🏠',
        },
      ],
    },
    {
      category: 'Community & Youth Programs',
      description: 'Community initiatives and programs aligned with VIBIN\'s mission.',
      items: [
        {
          title: 'Angel\'s Tasty Treats',
          subtitle: 'Community Wellness & Youth Initiative',
          description: 'A community program dedicated to wellness and youth empowerment. Join our community and stay connected.',
          links: [
            { label: 'Facebook', url: 'https://facebook.com' },
            { label: 'Instagram', url: 'https://instagram.com' },
            { label: 'Website', url: 'https://roaminghunger.com/angels-tasty-treats' },
          ],
          contact: 'angelstastytreats@gmail.com | 816-535-6976',
          icon: '🍃',
        },
      ],
    },
    {
      category: 'Trusted Professional Resources',
      description: 'Recommended professionals and resources that complement your wellness journey.',
      items: [
        {
          title: 'Software Engineering & Tech Support',
          subtitle: 'Digital Solutions & Web Development',
          description: 'Professional technology and web development support for all your digital needs.',
          contact: '[Professional contact information]',
          icon: '💻',
        },
        {
          title: 'Professional Network',
          subtitle: 'Additional Trusted Resources',
          description: 'A curated selection of professionals and resources that align with VIBIN\'s values and mission.',
          icon: '🤝',
        },
      ],
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 gradient-lavender relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-sage-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-warmth-200 rounded-full blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-2 bg-white/50 text-lavender-700 rounded-full text-sm font-medium mb-6">
            Support & Education
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-sage-900 mb-6">
            Resources
          </h1>
          <p className="text-sage-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Beyond coaching, we've curated educational resources, community programs, and trusted partnerships 
            to support your complete healing and transformation journey.
          </p>
        </div>
      </section>

      {/* Resources Sections */}
      {resources.map((section, idx) => (
        <section key={idx} className={idx % 2 === 0 ? 'py-24 bg-white' : 'py-24 bg-cream-50'}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sage-900 mb-4">
                {section.category}
              </h2>
              <p className="text-sage-600 text-lg max-w-2xl">
                {section.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-sage-100">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-sage-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-lavender-600 font-medium text-sm mb-4">
                    {item.subtitle}
                  </p>
                  <p className="text-sage-600 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gradient-to-r from-lavender-500 to-lavender-600 text-white px-6 py-2 rounded-full font-medium hover:from-lavender-600 hover:to-lavender-700 transition-all"
                    >
                      {item.cta || 'Learn More'}
                    </a>
                  )}

                  {item.links && (
                    <div className="flex flex-wrap gap-3">
                      {item.links.map((link, linkIdx) => (
                        <a
                          key={linkIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-lavender-100 text-lavender-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-lavender-200 transition-colors"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}

                  {item.contact && (
                    <p className="text-sage-600 text-sm mt-6 pt-6 border-t border-sage-200">
                      <span className="font-semibold">Connect:</span> {item.contact}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* VIBIN Ecosystem Section */}
      <section className="py-24 bg-gradient-to-r from-sage-50 via-lavender-50 to-warmth-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sage-900 mb-6">
            One Aligned Ecosystem
          </h2>
          <p className="text-sage-700 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            VIBIN with Coach Angel is your home for holistic healing, transformation coaching, and wellness support. 
            These resources extend that foundation, offering education and pathways tailored to your unique needs.
          </p>
          <p className="text-sage-600">
            When you're ready to explore, we're here to guide you.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-cream-50 border-t border-sage-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 text-sm text-sage-600 leading-relaxed">
            <p>
              <span className="font-semibold">External Resources Notice:</span> This website may include links to external websites, 
              programs, or services for informational purposes. VIBIN with Coach Angel is not responsible for the content, 
              practices, or policies of external sites. Accessing external resources is voluntary and at your discretion.
            </p>
            <p>
              <span className="font-semibold">Independent Services:</span> Primerica, Keller Williams Real Estate, and other 
              external services operate independently from VIBIN with Coach Angel coaching services. No affiliation or endorsement 
              implies a coaching relationship with these providers.
            </p>
          </div>
        </div>
      </section>

      {/* Back to Services */}
      <section className="py-12 bg-white text-center">
        <p className="text-sage-600 mb-6">
          Looking for coaching services?
        </p>
        <Link
          href="/work-with-me"
          className="inline-block bg-gradient-to-r from-sage-500 to-sage-600 text-white px-8 py-3 rounded-full font-medium hover:from-sage-600 hover:to-sage-700 transition-all"
        >
          Back to Coaching Services
        </Link>
      </section>
    </div>
  )
}
