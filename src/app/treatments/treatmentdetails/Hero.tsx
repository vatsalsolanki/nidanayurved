'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getLocalizedPath } from '@/lib/utils';
import { Locale } from '@/lib/i18n';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  dictionary: any;
  locale: Locale;
  treatment: any;
}

export default function Hero({ dictionary, locale, treatment }: HeroProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAnimationReady, setIsAnimationReady] = useState(false);

  // Set animation ready state after initial render
  useEffect(() => {
    // Small delay to ensure DOM is fully ready
    const timer = setTimeout(() => {
      setIsAnimationReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants with reduced complexity
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1,
        when: 'beforeChildren'
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // Get the localized URL for booking
  const bookingUrl = getLocalizedPath('book-appointment', locale);

  // Determine image source - fix to match the correct path format in JSON data
  const imageSrc = treatment.image || `/images/treatments/${treatment.slug}.jpg`;

  return (
    <section className="relative py-12 md:py-16 bg-background overflow-hidden">
      {/* Background pattern with herbal illustrations */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/patterns/herbal-pattern.png')] bg-repeat opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <motion.div 
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate={isAnimationReady ? "visible" : "hidden"}
          >
            <motion.div 
              className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mb-4 font-medium"
              variants={itemVariants}
            >
              {dictionary.treatments.ayurvedicTreatment || "Ayurvedic Treatment"}
            </motion.div>
            
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary"
              variants={itemVariants}
            >
              {treatment.title}
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-text/80 mb-8 max-w-2xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              {treatment.shortDescription}
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <Link 
                href={`${bookingUrl}?treatment=${treatment.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-md hover:bg-primary/90 transition-all duration-300 hover:gap-3"
              >
                <span>{dictionary.treatments.bookTreatment || "Book This Treatment"}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex-1 rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ 
              opacity: isImageLoaded ? 1 : 0, 
              scale: isImageLoaded ? 1 : 0.98 
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative h-72 md:h-96 w-full bg-gray-100">
              <Image 
                src={imageSrc}
                alt={treatment.title}
                fill
                className="object-cover" 
                priority
                loading="eager"
                sizes="(max-width: 768px) 100vw, 50vw"
                onLoad={() => setIsImageLoaded(true)}
                onError={() => setIsImageLoaded(true)} // Still show UI if image fails
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 