import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'VIBIN with Coach Angel | Holistic Health Coach & Doula',
  description: 'Transform your life with Coach Angel, a Certified Life Coach & Doula. Specializing in holistic healing, breathwork, inner child work, and trauma-informed wellness coaching.',
  keywords: 'wellness coach, doula, holistic healing, breathwork, trauma healing, inner child work, life transitions, health coaching, spiritual wellness',
  authors: [{ name: 'Coach Angel' }],
  openGraph: {
    title: 'VIBIN with Coach Angel',
    description: 'Holistic Health & Wellness Coaching - Transform your life through vulnerability, intuition, balance, inner healing, and nourishment.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
