"use client";

import { Locale } from '@/lib/i18n';
import MotionWrapper from '@/components/ui/MotionWrapper';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Image from 'next/image';

interface AboutHeroProps {
  dictionary: any;
  locale: Locale;
}

export default function AboutHero({ dictionary, locale }: AboutHeroProps) {
  const [imageError, setImageError] = useState(false);
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: 'beforeChildren',
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  // Font class based on the locale
  const fontClass = locale === 'hi' ? 'font-hi' : locale === 'gu' ? 'font-gu' : 'font-en';

  // Safely access dictionary values with fallbacks
  const clinicName = dictionary?.site?.name || "Nidan Ayurved";
  const title = dictionary?.about?.title || "About Us";
  const subtitle = dictionary?.about?.subtitle || "Dedicated to authentic healing through ancient wisdom";
  const clinicHistory = dictionary?.about?.clinicHistory || "Our Journey Since 2015";
  const description = dictionary?.about?.description || 
    "At Nidan Ayurved, we believe in the power of ancient Ayurvedic practices to address the root cause of health issues, not just the symptoms.";
  const missionTitle = dictionary?.about?.missionTitle || "Our Healing Mission";
  const mission = dictionary?.about?.mission || 
    "Our mission is to provide authentic, personalized Ayurvedic treatments that restore balance to your body, mind, and spirit.";
  const locationTitle = dictionary?.about?.locationTitle || "Our Location";
  const location = dictionary?.about?.location || "Based in Vadodara, Gujarat";
  const imageAlt = dictionary?.about?.imageAlt || "Nidan Ayurved Clinic";
  const trustedExperience = dictionary?.about?.trustedExperience || "Trusted and experienced since 2015";
  const ourNameTitle = dictionary?.about?.ourNameTitle || "Our Name";
  const ourNameText = dictionary?.about?.ourNameText || "The word 'Nidan' in Ayurveda refers to precise diagnosis — understanding the root cause of imbalance.";

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-background">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 z-0 opacity-5 bg-primary/5">
        <div className="absolute inset-0" style={{ 
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23556B2F' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px',
          opacity: 0.15
        }}/>
      </div>

      <div className="container mx-auto px-4">
        <MotionWrapper
          className="flex flex-col-reverse md:flex-row gap-12 lg:gap-16 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left column - Text content */}
          <MotionWrapper 
            className="md:w-1/2 lg:pr-8 flex flex-col"
            variants={itemVariants}
          >
            <h1 className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary",
              fontClass
            )}>
              {title}
            </h1>
            
            <p className={cn(
              "text-lg mb-8 text-secondary leading-relaxed",
              fontClass
            )}>
              {subtitle}
            </p>
            
            {/* Our Name Section - Added before other sections */}
            <MotionWrapper
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-primary/10 to-accent/5 p-5 rounded-lg relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute -right-4 -top-4 w-20 h-20 opacity-10">
                  <svg className="w-full h-full text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11 2c-0.552 0-1 0.448-1 1v8c0 0.552 0.448 1 1 1h1v2h-5v2h5v4c0 0.552 0.448 1 1 1s1-0.448 1-1v-4h5v-2h-5v-2h1c0.552 0 1-0.448 1-1v-8c0-0.552-0.448-1-1-1h-4zM11 4h4v6h-4v-6z" />
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <h3 className={cn("text-primary font-bold text-xl mb-2 flex items-center", fontClass)}>
                    <span className="inline-block w-6 h-6 mr-2 text-primary">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    {ourNameTitle}
                  </h3>
                  <p className={cn("text-text/90 relative pl-8 border-l-2 border-primary/30", fontClass)}>
                    <strong className="text-primary font-medium">निदान</strong> {ourNameText}
                  </p>
                </div>
              </div>
            </MotionWrapper>
            
            <div className={cn("space-y-6 flex-grow", fontClass)}>
              {/* Origin and History */}
              <div className="bg-accent/10 p-5 rounded-lg border-l-4 border-accent">
                <h3 className="text-secondary font-semibold text-lg mb-2">
                  {clinicHistory}
                </h3>
                <p className="text-text/90">
                  {description}
                </p>
              </div>
              
              {/* Mission */}
              <div className="bg-primary/10 p-5 rounded-lg border-l-4 border-primary">
                <h3 className="text-primary font-semibold text-lg mb-2">
                  {missionTitle}
                </h3>
                <p className="text-text/90">
                  {mission}
                </p>
              </div>
              
              {/* Location */}
              <div className="bg-secondary/10 p-5 rounded-lg border-l-4 border-secondary">
                <h3 className="text-secondary font-semibold text-lg mb-2">
                  {locationTitle}
                </h3>
                <p className="text-text/90">
                  {location}
                </p>
              </div>
            </div>
          </MotionWrapper>
          
          {/* Right column - Ayurvedic healing image or fallback design */}
          <MotionWrapper 
            className="md:w-1/2 flex"
            variants={itemVariants}
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl w-full h-full flex">
              {!imageError ? (
                <>
                  <div className="w-full h-full flex-grow relative">
                    <Image
                      src="/images/hero-ayurveda.jpg"
                      alt={imageAlt}
                      fill
                      priority
                      className="object-cover"
                      style={{ objectPosition: 'center center' }}
                      onError={() => setImageError(true)}
                    />
                    {/* Gradient overlay for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-60"></div>
                  </div>
                </>
              ) : (
                // Fallback design when image is missing
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/30 flex flex-col items-center justify-center p-6">
                  {/* Decorative leaf pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100,0 C150,50 150,150 100,200 C50,150 50,50 100,0" fill="currentColor" className="text-primary" />
                    </svg>
                  </div>
                  
                  {/* Center content */}
                  <div className="relative z-10 text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="text-primary text-lg font-medium mb-3">
                      {imageAlt}
                    </div>
                    <div className="text-text max-w-md mx-auto">
                      <p>Experience the ancient wisdom of Ayurvedic healing at our serene clinic in Vadodara.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Clinic name overlay on image - always visible */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className={cn("text-2xl font-bold drop-shadow-md", fontClass)}>
                  {clinicName}
                </h3>
                <p className={cn("text-white/90 drop-shadow-md", fontClass)}>
                  {trustedExperience}
                </p>
              </div>
            </div>
          </MotionWrapper>
        </MotionWrapper>
      </div>
    </section>
  );
} 