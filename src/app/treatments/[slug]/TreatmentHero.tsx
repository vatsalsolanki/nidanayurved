'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/lib/i18n';
import { MotionWrapper } from '@/components/ui/MotionWrapper';

interface TreatmentHeroProps {
  treatment: any;
  dictionary: any;
  locale: Locale;
}

export default function TreatmentHero({ treatment, dictionary, locale }: TreatmentHeroProps) {
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

  // Generate the booking URL with appropriate locale path
  const bookingUrl = `/${locale === 'en' ? '' : locale + '/'}book-appointment`;

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 to-transparent overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <Image
          src="/images/ayurvedic-pattern.png"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <MotionWrapper
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left column - Text content */}
            <div>
              <MotionWrapper variants={itemVariants}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary">
              {treatment.title}
            </h1>
            
            <p className="text-lg mb-8 text-text/80">
              {treatment.shortDescription}
            </p>
            
            <Link 
              href={bookingUrl}
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition duration-300"
            >
              {dictionary.treatments.bookTreatment}
            </Link>
              </MotionWrapper>
            </div>
          
          {/* Right column - Image */}
            <div>
              <MotionWrapper variants={itemVariants}>
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src={treatment.image}
                alt={treatment.title}
                fill
                className="object-cover"
              />
            </div>
              </MotionWrapper>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
} 