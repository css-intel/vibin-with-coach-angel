import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources | VIBIN with Coach Angel',
  description: 'Community resources, financial education, real estate readiness, and trusted partners to support your journey.',
}

// ============================================================
// RESOURCES DATA - SINGLE SOURCE OF TRUTH
// To add/edit/remove resources, modify this array only.
// Each resource must have: id, category, title, subtitle, description, icon
// Optional: link, cta, links (array), contact
// ============================================================
const resources = [
  // ----------------------
  // COMMUNITY & MENTAL HEALTH
  // ----------------------
  {
    id: 'kerns-care-manor',
    category: 'community-mental-health',
    title: 'Kerns Care Manor',
    subtitle: 'Senior Care & Assisted Living',
    description: 'Quality care and compassionate support for seniors in a warm, home-like environment. Providing dignity, comfort, and community for your loved ones.',
    icon: '🏡',
    link: 'https://kernscaremanor.com',
    cta: 'Visit Kerns Care Manor',
  },
  {
    id: 'jfskc',
    category: 'community-mental-health',
    title: 'Jewish Family Services of Greater Kansas City',
    subtitle: 'Mental Health Education',
    description: 'JFSKC provides mental health education, counseling services, and community resources regardless of faith background. Sliding scale fees available.',
    icon: '💙',
    link: 'https://www.jfskc.org/services/mental-health-education/',
    cta: 'Visit JFSKC',
  },

  // ----------------------
  // OPTIONAL PATHWAYS (EDUCATION)
  // ----------------------
  {
    id: 'primerica',
    category: 'optional-pathways',
    title: 'Financial Protection & Legacy (Primerica®)',
    subtitle: 'Financial Education & Resources',
    description: 'Educational resources on financial protection, life insurance awareness, and legacy planning. Angel is an independent Primerica representative—services offered on a separate platform.',
    icon: '🛡️',
    link: 'https://www.primerica.com',
    cta: 'Learn About Primerica',
  },
  {
    id: 'real-estate',
    category: 'optional-pathways',
    title: 'Homeownership & Real Estate Readiness',
    subtitle: 'Education for Future Homeowners',
    description: 'Educational readiness support for first-time and future homeowners—mortgage basics, preparation steps, and investment principles. No listings or sales on this site.',
    icon: '🏠',
    link: 'https://realestatewithangel.kw.com',
    cta: 'Real Estate Education',
  },

  // ----------------------
  // COMMUNITY & YOUTH INITIATIVES
  // ----------------------
  {
    id: 'angels-tasty-treats',
    category: 'community-youth',
    title: "Angel's Tasty Treats",
    subtitle: 'Community & Youth Initiative',
    description: "A separate community initiative dedicated to wellness, youth empowerment, and bringing people together through nourishment and connection. Optional resource for those who want to connect.",
    icon: '🍃',
    links: [
      { label: 'Website', url: 'https://roaminghunger.com/angels-tasty-treats' },
      { label: 'Instagram', url: 'https://instagram.com/angelstastytreats' },
      { label: 'Facebook', url: 'https://facebook.com/angelstastytreats' },
    ],
    contact: 'angelstastytreats@gmail.com | 816-535-6976',
  },
]

// Category configuration for section headers
const categories = [
  {
    id: 'community-mental-health',
    title: 'Community & Mental Health Resources',
    description: 'Local resources for mental health support, senior care, and community wellness.',
  },
  {
    id: 'optional-pathways',
    title: 'Optional Pathways (Education Only)',
    description: 'Educational resources for financial literacy and homeownership readiness. These are separate services—no sales or product pushing on this site.',
  },
  {
    id: 'community-youth',
    title: 'Community & Youth Initiatives',
    description: "Community programs aligned with VIBIN's mission of holistic wellness.",
  },
]

export default function ResourcesPage() {
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
            Trusted community resources, educational pathways, and initiatives to support your journey.
          </p>
        </div>
      </section>

      {/* Resources by Category */}
      {categories.map((category, catIdx) => {
        const categoryResources = resources.filter(r => r.category === category.id)
        if (categoryResources.length === 0) return null
        
        return (
          <section key={category.id} className={catIdx % 2 === 0 ? 'py-24 bg-white' : 'py-24 bg-cream-50'}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-16">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sage-900 mb-4">
                  {category.title}
                </h2>
                <p className="text-sage-600 text-lg max-w-2xl">
                  {category.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {categoryResources.map((resource) => (
                  <div key={resource.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-sage-100">
                    <div className="text-4xl mb-4">{resource.icon}</div>
                    <h3 className="text-xl font-semibold text-sage-900 mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-lavender-600 font-medium text-sm mb-4">
                      {resource.subtitle}
                    </p>
                    <p className="text-sage-600 leading-relaxed mb-6">
                      {resource.description}
                    </p>

                    {/* Single link button */}
                    {resource.link && (
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-lavender-500 to-lavender-600 text-white px-6 py-2 rounded-full font-medium hover:from-lavender-600 hover:to-lavender-700 transition-all"
                      >
                        {resource.cta || 'Learn More'}
                      </a>
                    )}

                    {/* Multiple links */}
                    {resource.links && (
                      <div className="flex flex-wrap gap-3">
                        {resource.links.map((link, linkIdx) => (
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

                    {/* Contact info */}
                    {resource.contact && (
                      <p className="text-sage-600 text-sm mt-6 pt-6 border-t border-sage-200">
                        <span className="font-semibold">Connect:</span> {resource.contact}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* Back to Services */}
      <section className="py-12 bg-gradient-to-r from-sage-50 via-lavender-50 to-warmth-50 text-center">
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

      {/* Disclaimers */}
      <section className="py-12 bg-cream-50 border-t border-sage-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-sage-800 mb-6">Important Notices</h3>
          <div className="space-y-4 text-sm text-sage-600 leading-relaxed">
            <p>
              <span className="font-semibold">External Resources Notice:</span> This website includes links to external websites 
              for informational purposes only. VIBIN with Coach Angel is not responsible for the content, 
              practices, or policies of external sites. Accessing external resources is voluntary and at your discretion.
            </p>
            <p>
              <span className="font-semibold">Primerica Disclosure:</span> Primerica is a separate, independent company offering 
              life insurance and financial services. Angel operates as an independent representative. Any insurance or financial 
              products are provided by Primerica, not VIBIN with Coach Angel.
            </p>
            <p>
              <span className="font-semibold">Real Estate Disclaimer:</span> Real estate information is for educational purposes only. 
              Real estate services are provided through Keller Williams, a separate brokerage.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
