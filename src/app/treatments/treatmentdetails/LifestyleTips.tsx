'use client';

import { motion } from 'framer-motion';
import { Locale } from '@/lib/i18n';
import { Leaf, Coffee, Sun, Moon, Utensils, Activity } from 'lucide-react';
import { MotionWrapper } from '@/components/ui/MotionWrapper';

interface LifestyleTipsProps {
  dictionary: any;
  locale: Locale;
  treatment: any;
}

export default function LifestyleTips({ dictionary, locale, treatment }: LifestyleTipsProps) {
  // Icons for each type of lifestyle tip
  const tipIcons = [
    <Leaf key="leaf" className="h-6 w-6" />,
    <Utensils key="utensils" className="h-6 w-6" />,
    <Coffee key="coffee" className="h-6 w-6" />,
    <Sun key="sun" className="h-6 w-6" />,
    <Moon key="moon" className="h-6 w-6" />,
    <Activity key="activity" className="h-6 w-6" />
  ];

  if (!treatment.lifestyleTips || treatment.lifestyleTips.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              {dictionary.treatments.lifestyleTipsHeading || "Lifestyle Tips During Treatment"}
            </h2>
            <p className="text-text/70 max-w-2xl mx-auto">
              {dictionary.treatments.lifestyleTipsSubheading || "Follow these Ayurvedic recommendations to enhance the effectiveness of your treatment."}
            </p>
          </MotionWrapper>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {treatment.lifestyleTips.map((tip: string, index: number) => (
              <div key={index} className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <MotionWrapper
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4 w-full">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {tipIcons[index % tipIcons.length]}
                    </div>
                    <div>
                      <p className="text-text font-medium">{tip}</p>
                    </div>
                  </div>
                </MotionWrapper>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 