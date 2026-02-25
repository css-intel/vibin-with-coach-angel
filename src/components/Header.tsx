'use client'

import Link from 'next/link'
import { useState } from 'react'
import Logo from './Logo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/work-with-me', label: 'Work With Me' },
    { href: '/resources', label: 'Resources' },
    { href: '/shop', label: 'Shop' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Logo className="w-12 h-12 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
            <div className="hidden sm:block">
              <span className="text-sage-800 font-serif text-xl font-semibold">VIBIN</span>
              <span className="block text-sage-600 text-xs tracking-wide">with Coach Angel</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sage-700 hover:text-lavender-600 transition-colors font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lavender-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
            <Link
              href="/book"
              className="bg-gradient-to-r from-sage-500 to-sage-600 text-white px-6 py-2.5 rounded-full hover:from-sage-600 hover:to-sage-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-sage-700 hover:text-sage-900"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-sage-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sage-700 hover:text-lavender-600 transition-colors font-medium px-4 py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/book"
                onClick={() => setIsMenuOpen(false)}
                className="bg-gradient-to-r from-sage-500 to-sage-600 text-white px-6 py-2.5 rounded-full text-center mx-4"
              >
                Book a Call
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
