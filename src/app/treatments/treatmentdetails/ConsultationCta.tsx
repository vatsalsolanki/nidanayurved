'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { getLocalizedPath } from '@/lib/utils';
import { Locale } from '@/lib/i18n';
import { ArrowRight, HelpCircle } from 'lucide-react';

interface ConsultationCtaProps {
  dictionary: any;
  locale: Locale;
}

export default function ConsultationCta({ dictionary, locale }: ConsultationCtaProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: 'beforeChildren'
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Get the localized URL for the booking page
  const bookingUrl = getLocalizedPath('book-appointment', locale);

  // Content for each language
  const content = {
    en: {
      message: "Not sure if this treatment is right for you?",
      buttonText: "Book a Free Consultation"
    },
    hi: {
      message: "क्या आप सुनिश्चित नहीं हैं कि यह उपचार आपके लिए सही है?",
      buttonText: "निःशुल्क परामर्श प्राप्त करें"
    },
    gu: {
      message: "શું તમને ખબર નથી કે આ સારવાર તમારા માટે યોગ્ય છે?",
      buttonText: "મફત પરામર્શ બુક કરો"
    }
  };

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 md:p-8 shadow-md border border-gray-200 overflow-hidden relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Decorative elements */}
          <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/5 rounded-full blur-xl"></div>
          <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-secondary/5 rounded-full blur-xl"></div>
          
          <motion.div 
            className="flex flex-col md:flex-row items-center text-center md:text-left gap-5 md:gap-8 relative z-10"
            variants={itemVariants}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10 shadow-sm flex-shrink-0 mx-auto md:mx-0">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <motion.h3 
                className="text-xl md:text-2xl font-medium mb-4 text-primary"
                variants={itemVariants}
              >
                {content[locale].message}
              </motion.h3>
              <motion.div variants={itemVariants}>
                <Link 
                  href={bookingUrl}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-md hover:bg-primary/90 transition-all duration-300 hover:gap-3"
                >
                  <span>{content[locale].buttonText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 