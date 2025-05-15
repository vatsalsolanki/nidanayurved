"use client";

import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/utils";
import MotionWrapper from "@/components/ui/MotionWrapper";

interface CTAStripProps {
  dictionary: any;
  locale: Locale;
}

export default function CTAStrip({ dictionary, locale }: CTAStripProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className="relative py-10 md:py-16 bg-primary overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" fill="none">
          <pattern id="wave-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0,20 Q10,15 20,20 T40,20" stroke="white" strokeWidth="1" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#wave-pattern)"></rect>
        </svg>
      </div>

      {/* Grass effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" width="100%" height="100%">
          <path 
            d="M0,0 C50,40 100,50 150,40 C200,30 250,15 300,20 C350,25 400,50 450,45 C500,40 550,20 600,30 C650,40 700,60 750,50 C800,40 850,20 900,25 C950,30 1000,55 1050,50 C1100,45 1150,15 1200,20 L1200,80 L0,80 Z" 
            fill="#D1E8D0"
          />
        </svg>
      </div>
      
      {/* Content container */}
      <MotionWrapper 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative z-10">
            <MotionWrapper className="text-center md:text-left" variants={itemVariants}>
              <h2 className={`text-2xl md:text-3xl font-bold text-white mb-2 font-${locale}`}>
                {dictionary.about.ctaStrip?.title || "Ready to experience Ayurvedic healing?"}
              </h2>
              <p className={`text-white/80 max-w-xl font-${locale}`}>
                {dictionary.about.ctaStrip?.subtitle || "Discover personalized Ayurvedic treatments tailored to your unique constitution."}
              </p>
            </MotionWrapper>
            
            <MotionWrapper 
              variants={itemVariants}
              className="w-full md:w-auto"
            >
              <Link
                href={getLocalizedPath("/contact", locale)}
                className="block text-center w-full md:w-auto px-8 py-4 rounded-lg bg-white text-primary font-medium shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <span className={`font-${locale}`}>
                  {dictionary.about.ctaStrip?.button || "Contact Us Today"}
                </span>
              </Link>
            </MotionWrapper>
          </div>
        </div>
      </MotionWrapper>
    </section>
  );
} 