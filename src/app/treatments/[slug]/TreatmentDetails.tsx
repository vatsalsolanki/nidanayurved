'use client';

import { motion } from 'framer-motion';
import { Locale } from '@/lib/i18n';
import { MotionWrapper } from '@/components/ui/MotionWrapper';

interface TreatmentDetailsProps {
  treatment: any;
  dictionary: any;
  locale: Locale;
}

export default function TreatmentDetails({ treatment, dictionary, locale }: TreatmentDetailsProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <MotionWrapper
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Description */}
            <div className="mb-16">
              <MotionWrapper variants={itemVariants}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
              {`${dictionary.common.about} ${treatment.title}`}
            </h2>
            <p className="text-text/80 text-lg leading-relaxed">
              {treatment.longDescription}
            </p>
              </MotionWrapper>
            </div>
          
          {/* Symptoms and Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <MotionWrapper variants={itemVariants}>
            {/* Symptoms */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-neutral-100">
              <h3 className="text-xl font-semibold mb-6 text-primary">
                {dictionary.treatments.symptomsTitle}
              </h3>
              <ul className="space-y-3">
                {treatment.symptoms.map((symptom: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-secondary mr-3 mt-1">•</span>
                    <span className="text-text/80">{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>
              </MotionWrapper>
            
              <MotionWrapper variants={itemVariants}>
            {/* Benefits */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-neutral-100">
              <h3 className="text-xl font-semibold mb-6 text-primary">
                {dictionary.treatments.benefitsTitle}
              </h3>
              <ul className="space-y-3">
                {treatment.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-secondary mr-3">✓</span>
                    <span className="text-text/80">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
              </MotionWrapper>
            </div>
          
          {/* Lifestyle Tips */}
            <MotionWrapper variants={itemVariants}>
            <div className="bg-secondary/5 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-6 text-primary">
                {dictionary.treatments.lifestyleTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {treatment.lifestyleTips.map((tip: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <span className="bg-secondary/10 text-secondary font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-text/80">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
            </MotionWrapper>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
} 