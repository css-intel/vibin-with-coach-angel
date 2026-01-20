import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop | VIBIN with Coach Angel',
  description: 'Wellness products, journals, workbooks, and inspirational apparel to support your healing journey.',
}

export default function ShopPage() {
  const products = [
    {
      category: 'Wellness Products',
      description: 'Natural, supportive self-care tools for your daily wellness practice.',
      items: [
        {
          name: 'Wellness Oils & Aromatherapy',
          price: 'Starting at $12',
          description: 'Thoughtfully blended essential oils to support calm, focus, and emotional balance.',
          icon: '🌿',
        },
        {
          name: 'Healing Sprays & Mists',
          price: 'Starting at $10',
          description: 'Refreshing sprays infused with intention and natural ingredients for daily wellness.',
          icon: '✨',
        },
        {
          name: 'Crystal & Wellness Jewelry',
          price: 'Starting at $25',
          description: 'Beautiful crystals and jewelry pieces to carry healing energy with you.',
          icon: '💎',
        },
        {
          name: 'Wellness Shots',
          price: 'Starting at $8',
          description: 'Nourishing wellness shots to support your body and spirit.',
          icon: '🥤',
        },
      ],
    },
    {
      category: 'Journals & Workbooks',
      description: 'Guided resources for reflection, healing, and transformation.',
      items: [
        {
          name: 'V.I.B.I.N. Healing Journal',
          price: '$22',
          description: 'A beautifully designed journal featuring prompts aligned with the V.I.B.I.N philosophy for daily reflection and healing.',
          icon: '📓',
        },
        {
          name: 'Inner Child Healing Workbook',
          price: '$28',
          description: 'A comprehensive guide with exercises, meditations, and practices to reconnect with and nurture your inner child.',
          icon: '💝',
        },
        {
          name: 'Transition & Rebuilding Workbook',
          price: '$32',
          description: 'A practical workbook designed to guide you through life transitions with clarity, resilience, and renewed purpose.',
          icon: '🔄',
        },
        {
          name: 'Money Mindset Journal',
          price: '$18',
          description: 'Release money blocks and rewrite your money story with guided journaling and affirmation practices.',
          icon: '💫',
        },
      ],
    },
    {
      category: 'Apparel & Community Wear',
      description: 'Inspirational designs that carry the VIBIN energy with you.',
      items: [
        {
          name: 'V.I.B.I.N. Inspirational T-Shirts',
          price: 'Starting at $22',
          description: 'Premium quality tees featuring empowering VIBIN messages and designs. Customizable options available.',
          icon: '👕',
          note: 'Custom orders available through Krowned Printing',
        },
      ],
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 gradient-warmth relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-sage-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-lavender-200 rounded-full blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-2 bg-white/50 text-warmth-700 rounded-full text-sm font-medium mb-6">
            Self-Care & Support Tools
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-sage-900 mb-6">
            Shop
          </h1>
          <p className="text-sage-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Curated wellness products, journals, workbooks, and apparel designed to support your healing journey 
            and keep the VIBIN energy with you every day.
          </p>
        </div>
      </section>

      {/* Shop Categories */}
      {products.map((section, idx) => (
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
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-sage-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-lavender-600 font-bold text-lg mb-4">
                    {item.price}
                  </p>
                  <p className="text-sage-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                  
                  {('note' in item && item.note) && (
                    <p className="text-sm text-warmth-700 bg-warmth-50 rounded-lg p-3 mb-4 italic">
                      {item.note}
                    </p>
                  )}

                  <Link
                    href="/contact"
                    className="inline-block bg-gradient-to-r from-sage-500 to-sage-600 text-white px-6 py-2 rounded-full font-medium hover:from-sage-600 hover:to-sage-700 transition-all"
                  >
                    Learn More
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Custom Apparel Section */}
      <section className="py-24 bg-gradient-to-r from-warmth-50 to-sage-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-10 md:p-16 shadow-lg">
            <div className="mb-8">
              <div className="text-5xl mb-4">👕</div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-sage-900 mb-4">
                Custom T-Shirt Printing & Apparel
              </h3>
            </div>
            
            <p className="text-sage-700 text-lg leading-relaxed mb-8">
              Create custom VIBIN apparel with our partner, <span className="font-semibold">Krowned Printing</span>. 
              Whether you want personalized designs, bulk orders for community events, or custom merch, 
              Krowned Printing brings your vision to life with premium quality.
            </p>

            <div className="bg-gradient-to-br from-lavender-50 to-sage-50 rounded-2xl p-8 mb-8">
              <h4 className="font-semibold text-sage-900 mb-4">Use Code: VIBIN</h4>
              <p className="text-sage-700 mb-4">
                Visit Krowned Printing and use code <span className="font-bold bg-lavender-100 px-2 py-1 rounded">VIBIN</span> for 
                a special discount on your custom order.
              </p>
              <div className="space-y-3">
                <p className="text-sage-700"><span className="font-semibold">Website:</span> <a href="https://krownedprinting.com" target="_blank" rel="noopener noreferrer" className="text-lavender-600 hover:underline">krownedprinting.com</a></p>
                <p className="text-sage-700"><span className="font-semibold">Sister Company:</span> Owned and operated by Angel's sister with the same care and quality</p>
              </div>
            </div>

            <Link
              href="https://krownedprinting.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-warmth-500 to-warmth-600 text-white px-8 py-3 rounded-full font-medium hover:from-warmth-600 hover:to-warmth-700 transition-all"
            >
              Visit Krowned Printing
            </Link>
          </div>
        </div>
      </section>

      {/* How to Order */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sage-900 mb-12 text-center">
            How to Order
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">1️⃣</div>
              <h3 className="text-xl font-semibold text-sage-900 mb-3">Browse & Select</h3>
              <p className="text-sage-600">Explore our curated wellness products, journals, and apparel. Each item is chosen with intention to support your journey.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">2️⃣</div>
              <h3 className="text-xl font-semibold text-sage-900 mb-3">Reach Out</h3>
              <p className="text-sage-600">Contact us via email or book a call to discuss your order, ask questions, or explore custom options.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">3️⃣</div>
              <h3 className="text-xl font-semibold text-sage-900 mb-3">Receive & Enjoy</h3>
              <p className="text-sage-600">Your items ship directly to you with care. Enjoy your wellness tools and supportive products.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-lavender-500 to-lavender-600 text-white px-10 py-4 rounded-full font-medium hover:from-lavender-600 hover:to-lavender-700 transition-all shadow-lg hover:shadow-xl"
            >
              Get in Touch to Order
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-cream-50 border-t border-sage-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-sage-600 leading-relaxed">
            <p className="mb-4">
              <span className="font-semibold">Product Disclaimer:</span> Wellness products sold through this website are not intended to 
              diagnose, treat, cure, or prevent any disease. Statements regarding products have not been evaluated by the Food and Drug 
              Administration (FDA). Results may vary. Use products as directed and consult a healthcare professional if you have questions or concerns.
            </p>
            <p>
              <span className="font-semibold">External Partners:</span> Custom apparel orders through Krowned Printing are processed independently. 
              Please refer to their policies regarding returns, shipping, and customer service.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
