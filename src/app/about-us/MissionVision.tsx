"use client";

import { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import { useState } from 'react';

interface MissionVisionProps {
  dictionary: any;
  locale: Locale;
}

export default function MissionVision({ dictionary, locale }: MissionVisionProps) {
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
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { repeat: Infinity, repeatType: "reverse" as const, duration: 1 } }
  };

  // Font class based on locale
  const fontClass = locale === 'hi' ? 'font-hi' : locale === 'gu' ? 'font-gu' : 'font-en';

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={cn("text-3xl md:text-4xl font-bold text-primary mb-4", fontClass)}>
              {locale === 'hi' ? 'हमारे मूल्य' : locale === 'gu' ? 'અમારાં મૂલ્યો' : 'Our Values'}
            </h2>
          </MotionWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Mission Card */}
          <MotionWrapper 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 p-8 h-full">
              <MotionWrapper variants={itemVariants}>
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <MotionWrapper
                      initial="initial"
                      whileHover="hover"
                      variants={iconVariants}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </MotionWrapper>
                  </div>
                  
                  <h3 className={cn("text-2xl font-bold text-primary mb-4", fontClass)}>
                    {locale === 'hi' ? 'हमारा उद्देश्य' : locale === 'gu' ? 'અમારું લક્ષ્ય' : 'Our Mission'}
                  </h3>
                  
                  <p className={cn("text-text/80 leading-relaxed max-w-md mx-auto", fontClass)}>
                    {dictionary.about.mission}
                  </p>
                </div>
              </MotionWrapper>
            </div>
          </MotionWrapper>
          
          {/* Vision Card */}
          <MotionWrapper 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 p-8 h-full">
              <MotionWrapper variants={itemVariants}>
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 text-accent">
                    <MotionWrapper
                      initial="initial"
                      whileHover="hover"
                      variants={iconVariants}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </MotionWrapper>
                  </div>
                  
                  <h3 className={cn("text-2xl font-bold text-accent mb-4", fontClass)}>
                    {locale === 'hi' ? 'हमारी दृष्टि' : locale === 'gu' ? 'અમારું દૃષ્ટિકોણ' : 'Our Vision'}
                  </h3>
                  
                  <p className={cn("text-text/80 leading-relaxed max-w-md mx-auto", fontClass)}>
                    {dictionary.about.vision}
                  </p>
                </div>
              </MotionWrapper>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
} 