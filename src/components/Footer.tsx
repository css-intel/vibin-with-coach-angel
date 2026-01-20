import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-sage-900 text-cream-100">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Logo className="w-16 h-16" />
              <div>
                <span className="text-cream-100 font-serif text-2xl font-semibold">VIBIN</span>
                <span className="block text-cream-300 text-sm">with Coach Angel</span>
              </div>
            </div>
            <p className="text-cream-300 mb-6 max-w-md leading-relaxed">
              Embark on a holistic healing journey that honors your whole self. Through vulnerability, 
              intuition, balance, inner healing, and nourishment, discover the path to your most 
              vibrant life.
            </p>
            {/* VIBIN Meaning */}
            <div className="space-y-2 text-sm">
              <p className="text-lavender-300 font-medium">V.I.B.I.N</p>
              <ul className="text-cream-400 space-y-1">
                <li><span className="text-warmth-400">V</span>ulnerability</li>
                <li><span className="text-warmth-400">I</span>ntuition</li>
                <li><span className="text-warmth-400">B</span>alance</li>
                <li><span className="text-warmth-400">I</span>nner Healing</li>
                <li><span className="text-warmth-400">N</span>ourishment</li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-cream-100 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Angel' },
                { href: '/work-with-me', label: 'Work With Me' },
                { href: '/resources', label: 'Resources' },
                { href: '/shop', label: 'Shop' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream-300 hover:text-lavender-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-cream-100 font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-cream-300">
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-lavender-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>hello@vibinwithcoachangel.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-lavender-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Virtual Sessions Worldwide</span>
              </li>
            </ul>
            
            {/* Social Links */}
            <div className="mt-6">
              <p className="text-cream-100 font-semibold mb-3">Follow Along</p>
              <div className="flex space-x-4">
                <a href="https://instagram.com/vibinwithcoachang" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-sage-800 flex items-center justify-center hover:bg-lavender-600 transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-sage-800 flex items-center justify-center hover:bg-lavender-600 transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer & Bottom Bar */}
      <div className="border-t border-sage-800 bg-sage-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-6">
          <p className="text-cream-400 text-xs leading-relaxed">
            <span className="font-semibold">Website Disclaimer:</span> VIBIN with Coach Angel provides coaching, education, and holistic support services only. 
            No guarantees are made regarding outcomes. The content provided on this website is for educational and informational purposes only and is not intended as medical, mental health, legal, or financial advice.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-cream-400 text-sm">
              © {currentYear} VIBIN with Coach Angel. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-cream-400">
              <Link href="/privacy" className="hover:text-lavender-300 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-lavender-300 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
