# Nidan Ayurved

A modern, SEO-optimized, animated, and multilingual website for Nidan Ayurved, built with Next.js, Tailwind CSS, and TypeScript.

## Project Overview

This website showcases Ayurvedic treatments and therapies offered by Nidan Ayurved, with a focus on holistic healing and authentic Ayurvedic practices.

## Features

- 🌐 **Multilingual support** (English, Hindi, Gujarati)
- 🎨 **Modern, responsive design** with Tailwind CSS
- ✨ **Smooth animations** with Framer Motion
- 📱 **Fully responsive** for all device sizes
- 🔎 **SEO optimized** with proper metadata
- 📝 **Form handling** with React Hook Form
- 📧 **Contact form with email notifications** via SMTP

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript**
- **Tailwind CSS 3.4.17**
- **Framer Motion** for animations
- **React Hook Form** for form handling
- **Lucide Icons** for UI icons
- **Nodemailer** for email functionality

## Multilingual Support

- **English** (default): [https://nidanayurved.com/](https://nidanayurved.com/)
- **Hindi**: [https://nidanayurved.com/hi/](https://nidanayurved.com/hi/)
- **Gujarati**: [https://nidanayurved.com/gu/](https://nidanayurved.com/gu/)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables for contact form functionality:

```
# SMTP Configuration for Contact Form
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=user@example.com
EMAIL_PASSWORD=your_password_here
EMAIL_RECIPIENT=contact@nidanayurved.com
```

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start the production server
npm start
```

## Project Structure

```
/src
  /app                # Next.js App Router pages
    /api              # API routes
      /contact        # Contact form submission endpoint
  /components         # Reusable UI components
  /lib                # Utility functions and data
    /dictionaries     # Translation files
    /treatments       # Treatment data by language
  /styles             # Global styles
/public               # Static assets
```

## Deployment

This project is configured for deployment on Cloudflare.
