# 📋 Nidan Ayurved Website - Project Specification

## 💼 Project Overview

A **modern, SEO-optimized, animated, and multilingual** website for **Nidan Ayurved**, with a **completely fresh design**, **smooth animations (Framer Motion)**, and **professional UX/UI**.

## 🌐 Tech Stack

* **Next.js Latest** (App Router)
* **Tailwind CSS v3.4.17**
* **TypeScript**
* **PostCSS**
* **Framer Motion** (for all page transitions and key UI elements)
* **React Hook Form** (forms)
* **Lucide Icons** or **Heroicons**
* **Google Fonts via next/font/google**


## 🌍 Multilingual Support

* **Languages:**
  * English (Poppins) - Default
  * Hindi (Mukta)
  * Gujarati (Noto Sans Gujarati)

* **Routing structure:**
  * English (default): https://domain.com/
  * Hindi: https://domain.com/hi/
  * Gujarati: https://domain.com/gu/

* ⚠️ **Important: English is the default locale, no /en route**
  * English pages are at root (/)
  * Other languages are under /hi and /gu
  * Use translation keys for all content

* **Translation Strategy:**
  * Build in one language first
  * Use translation keys for all content
  * Add languages via translation files

## ⚙️ middleware setup

```js
  locales: ['en', 'hi', 'gu'],
  defaultLocale: 'en',
  localeDetection: false, // to avoid auto redirection

English or Default loading on root domain.
```

## 🧱 Directory Structure

```
/src
  /app
      /about-us
          AboutHero.tsx
          OurTeam.tsx
          page.tsx
      /what-is-ayurveda
          AyurvedaIntro.tsx
          page.tsx
      /contact
          ContactForm.tsx
          page.tsx
      /treatments
          /[slug]
              Symptoms.tsx
              Benefits.tsx
              LifestyleTips.tsx
              page.tsx
          TreatmentsList.tsx
          page.tsx
      /gallery
          GalleryGrid.tsx
          page.tsx
      /videos
          VideoList.tsx
          page.tsx
      /book-appointment
          AppointmentForm.tsx
          page.tsx
      layout.tsx
      page.tsx
      not-found.tsx
  /components
    Header.tsx
    Footer.tsx
    LanguageSwitcher.tsx
    TreatmentCard.tsx
    CTAs.tsx
  /lib
    i18n.ts
    utils.ts
    /dictionaries
      en.json
      hi.json
      gu.json
    /treatments
      en.json
      hi.json
      gu.json
/public
/styles
  globals.css
  fonts.css (optional if not using next/font/google)
```

## 🎨 Design & UI Guidelines

### Color Palette (match branding):
```css
{
  --primary: 85, 107, 47;       /* #556B2F - Herbal green */
  --secondary: 139, 69, 19;     /* #8B4513 - Earthy brown */
  --accent: 194, 178, 128;      /* #C2B280 - Sand/Khaki - calming */
  --background: 250, 248, 240;  /* #FAF8F0 - Light herbal parchment */
  --text: 33, 33, 33;           /* #212121 - Almost black, high contrast */
}
```

### Fonts:
* English: Poppins
* Hindi: Mukta
* Gujarati: Noto Sans Gujarati

### Tailwind Setup:
```js
// tailwind.config.js
content: [
  './src/**/*.{js,ts,jsx,tsx}',
],
theme: {
  extend: {
    colors: {
      primary: '#556B2F',
      secondary: '#8B4513',
      accent: '#C2B280',
      background: '#FAF8F0',
      text: '#212121',
    },
    fontFamily: {
      en: ['var(--font-en)'],
      hi: ['var(--font-hi)'],
      gu: ['var(--font-gu)'],
    },
  },
}
```

## 📄 Pages to Build (All 3 Languages)

### Static Pages:
* Home
* About Us
* What is Ayurveda?
* Gallery
* Videos
* Contact
* Book Appointment

### Dynamic Pages:
* Treatments List Page
* 15+ Individual Treatment Pages
  - Each with sections for: Symptoms, Benefits, Lifestyle Tips, etc.
  - Content stored in static JSON files per language

## 🚀 Development Requirements

* **Components:**
  - Header & Footer (multilingual with language switcher)
  - All page sections and components as per directory structure
  
* **Animations:**
  - Page transitions with Framer Motion
  - UI element animations for enhanced UX
  
* **Forms:**
  - Contact form with validation
  - Appointment booking form
  
* **SEO:**
  - Use generateMetadata() for all pages
  - Include localized meta tags for all languages
  - Implement Open Graph and Twitter cards

## 🚦 Development Workflow

1. Set Up Project Structure & Configurations
2. Implement Core Layout, Fonts, and Language Handling
3. Build All Pages in Default Language First
4. Add Language Switcher
5. Add Additional Languages
6. Implement SEO and Metadata
7. Handle Dynamic Treatment Pages
8. Polish, Test, and Optimize

## 🗝️ Translation Examples

```json
// /lib/dictionaries/en.json
{
  "about": {
    "title": "About Us",
    "description": "Learn more about Nidan Ayurved..."
  }
}

// /lib/dictionaries/hi.json
{
  "about": {
    "title": "हमारे बारे में",
    "description": "निदान आयुर्वेद के बारे में जानें..."
  }
}
```

## 📁 Deployment

* Optimized for Cloudflare deployment
* Include necessary configurations for optimal performance

## ✅ Completion Checklist

- [ ] Fully responsive design
- [ ] All pages implemented in all languages
- [ ] Working language switcher
- [ ] Forms with validation
- [ ] Animations and transitions
- [ ] SEO optimizations
- [ ] Accessibility compliance
- [ ] Performance optimizations
- [ ] Ready for Cloudflare deployment 