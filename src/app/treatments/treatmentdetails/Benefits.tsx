'use client';

import { motion } from 'framer-motion';
import { Locale } from '@/lib/i18n';
import { Check } from 'lucide-react';
import { MotionWrapper } from '@/components/ui/MotionWrapper';

interface BenefitsProps {
  dictionary: any;
  locale: Locale;
  treatment: any;
}

export default function Benefits({ dictionary, locale, treatment }: BenefitsProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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

  if (!treatment.benefits || treatment.benefits.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              {dictionary.treatments.keyBenefits || "Key Benefits"}
            </h2>
            <p className="text-text/70 max-w-2xl mx-auto">
              {dictionary.treatments.benefitsSubheading || "Experience these transformative health benefits with this authentic Ayurvedic treatment."}
            </p>
          </MotionWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MotionWrapper
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {treatment.benefits.map((benefit: string, index: number) => (
              <div key={index} className="bg-background border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <MotionWrapper variants={itemVariants}>
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-text">{benefit}</p>
                    </div>
                  </div>
                </MotionWrapper>
              </div>
            ))}
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
} 