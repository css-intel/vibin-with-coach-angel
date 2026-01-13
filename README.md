# VIBIN with Coach Angel

A modern, holistic health and wellness coaching website built with Next.js, TypeScript, and Tailwind CSS.

## 🌿 About

**VIBIN with Coach Angel** is a professional website for a holistic health and wellness coach specializing in:

- **V**ulnerability
- **I**ntuition
- **B**alance
- **I**nner Healing
- **N**ourishment

## ✨ Features

- **Modern Design**: Calming, earthy color palette with lavender and sage accents
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **SEO Optimized**: Built with Next.js for excellent search engine performance
- **Fast Performance**: Optimized images, fonts, and code splitting
- **Accessible**: Focus states, semantic HTML, and screen reader support

## 📄 Pages

- **Home**: Hero section, V.I.B.I.N philosophy, services overview, testimonials
- **About**: Coach Angel's story, journey, values, and personal note
- **Services**: Detailed service offerings with pricing (1-on-1 coaching, breathwork, inner child healing, shadow work, life transitions, group programs)
- **Contact**: Contact form, booking CTA, newsletter signup

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Inter + Playfair Display (Google Fonts)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Color Palette

| Color | Usage |
|-------|-------|
| **Sage** | Primary brand color, buttons, nature/growth |
| **Lavender** | Accent color, spirituality, calm |
| **Warmth** | Tertiary accent, energy, nourishment |
| **Cream** | Backgrounds, soft neutral tones |

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and Tailwind
│   ├── layout.tsx       # Root layout with header/footer
│   ├── page.tsx         # Home page
│   ├── about/
│   │   └── page.tsx     # About page
│   ├── services/
│   │   └── page.tsx     # Services page
│   └── contact/
│       └── page.tsx     # Contact page
└── components/
    ├── Header.tsx       # Navigation header
    └── Footer.tsx       # Site footer
```

## 📝 Customization

### Update Contact Information
Edit the contact details in:
- `src/components/Footer.tsx`
- `src/app/contact/page.tsx`

### Update Services & Pricing
Edit `src/app/services/page.tsx` to modify:
- Service descriptions
- Pricing packages
- FAQ section

### Add Real Images
Replace the placeholder avatar circles with actual images by:
1. Add images to `public/images/`
2. Use Next.js `Image` component to replace the placeholder divs

### Connect Contact Form
The contact form currently simulates submission. To make it functional:
1. Set up a form handling service (Formspree, Netlify Forms, etc.)
2. Or create an API route in `src/app/api/contact/route.ts`

## 📄 License

This project is created for VIBIN with Coach Angel. All rights reserved.

---

Built with 💜 for holistic healing and wellness
