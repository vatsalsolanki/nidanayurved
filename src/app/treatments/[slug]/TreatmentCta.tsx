'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Locale } from '@/lib/i18n';
import { MotionWrapper } from '@/components/ui/MotionWrapper';

interface TreatmentCtaProps {
  treatment: any;
  dictionary: any;
  locale: Locale;
}

export default function TreatmentCta({ treatment, dictionary, locale }: TreatmentCtaProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  // Generate the booking URL with appropriate locale path
  const bookingUrl = `/${locale === 'en' ? '' : locale + '/'}book-appointment`;

  return (
    <section className="py-16 md:py-20 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto text-center">
          <MotionWrapper
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
            {dictionary.treatments.consultationNeeded}
          </h2>
          
          <p className="text-lg text-text/80 mb-8 max-w-2xl mx-auto">
            {treatment.longDescription.split('.')[0] + '.'}
          </p>
          
          <Link 
            href={bookingUrl}
            className="inline-flex items-center px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition duration-300 shadow-md hover:shadow-lg"
          >
            {dictionary.treatments.bookTreatment}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
} 