"use client";

import { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { MotionWrapper } from '@/components/ui/MotionWrapper';

interface PhilosophySectionProps {
  dictionary: any;
  locale: Locale;
}

export default function PhilosophySection({ dictionary, locale }: PhilosophySectionProps) {
  // Font class based on locale
  const fontClass = locale === 'hi' ? 'font-hi' : locale === 'gu' ? 'font-gu' : 'font-en';
  
  // Get content from dictionary
  const content = dictionary.about.philosophySection;

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 w-full h-full opacity-5 z-0">
        <div className="absolute inset-0 bg-repeat opacity-20" 
          style={{ 
            backgroundImage: 'url("/images/patterns/ayurvedic-pattern.svg")',
            backgroundSize: '300px'
          }} 
        />
      </div>
      
      {/* Decorative leaf patterns */}
      <div className="absolute -left-16 -top-16 w-64 h-64 opacity-10 rotate-45">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-primary">
          <path d="M21.71,3.29a1,1,0,0,0-1.42,0l-3.29,3.3V2a1,1,0,0,0-2,0V8.59L12.71,6.29a1,1,0,0,0-1.42,1.42L15.59,12H9a1,1,0,0,0,0,2h6.59l-4.3,4.29a1,1,0,1,0,1.42,1.42L15,17.41V22a1,1,0,0,0,2,0V15.41l3.29,3.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L18.41,14H23a1,1,0,0,0,0-2H18.41l3.3-3.29A1,1,0,0,0,21.71,3.29Z"/>
        </svg>
      </div>
      
      <div className="absolute -right-16 -bottom-16 w-64 h-64 opacity-10 -rotate-45">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-primary">
          <path d="M21.71,3.29a1,1,0,0,0-1.42,0l-3.29,3.3V2a1,1,0,0,0-2,0V8.59L12.71,6.29a1,1,0,0,0-1.42,1.42L15.59,12H9a1,1,0,0,0,0,2h6.59l-4.3,4.29a1,1,0,1,0,1.42,1.42L15,17.41V22a1,1,0,0,0,2,0V15.41l3.29,3.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L18.41,14H23a1,1,0,0,0,0-2H18.41l3.3-3.29A1,1,0,0,0,21.71,3.29Z"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto bg-gradient-to-b from-accent/5 to-primary/5 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Quote Content */}
            <div className="max-w-2xl">
              <MotionWrapper
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-8 text-primary opacity-80">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <blockquote className={cn("text-2xl md:text-3xl font-medium leading-relaxed mb-6 text-primary", fontClass)}>
                    {content.quote}
                  </blockquote>
                  <div className={cn("flex items-center", fontClass)}>
                    <div className="h-px bg-primary/30 w-8 mr-4"></div>
                    <div>
                      <p className="font-bold text-lg text-primary">{content.founderName}</p>
                      <p className="text-sm text-text/70">{content.founderTitle}</p>
                    </div>
                  </div>
                </div>
              </MotionWrapper>
            </div>

            {/* Decorative Image */}
            <div className="relative w-full max-w-md aspect-square">
              <MotionWrapper
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-xl opacity-50"></div>
                <div className="relative z-10 h-full w-full rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                  <Image
                    src="/images/philosophy/ayurvedic-herbs.jpg"
                    alt={content.imageAlt}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </MotionWrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 