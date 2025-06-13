'use client';

import { motion } from 'framer-motion';
import { Locale } from '@/lib/i18n';
import { Users } from 'lucide-react';
import { MotionWrapper } from '@/components/ui/MotionWrapper';

interface WhoIsItForProps {
  dictionary: any;
  locale: Locale;
  treatment: any;
}

export default function WhoIsItFor({ dictionary, locale, treatment }: WhoIsItForProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  if (!treatment.symptoms || treatment.symptoms.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-7 w-7 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              {dictionary.treatments.recommendedFor || "Recommended For"}
            </h2>
            <p className="text-text/70 max-w-2xl mx-auto">
              {dictionary.treatments.recommendedForSubheading || "This treatment is particularly beneficial for the following conditions or symptoms."}
            </p>
          </MotionWrapper>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
          <MotionWrapper
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {treatment.symptoms.map((symptom: string, index: number) => (
              <div key={index} className="bg-white px-4 py-2 rounded-full border border-primary/20 shadow-sm text-primary font-medium">
                <MotionWrapper variants={itemVariants}>
                  {symptom}
                </MotionWrapper>
              </div>
            ))}
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
} 