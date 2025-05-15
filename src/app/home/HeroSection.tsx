"use client";

import { motion } from "framer-motion";
import { Locale } from "@/lib/i18n";
import { HeroCta } from "@/components/CTAs";
import Image from "next/image";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const backgroundItemVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 50 },
  },
};

interface HeroSectionProps {
  dictionary: any;
  locale: Locale;
}

export function HeroSection({ dictionary, locale }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-background pt-20 md:pt-24 lg:pt-28 pb-16 md:pb-20">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.div 
          className="absolute top-40 -left-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        
        {/* Mandala pattern overlay */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="mandala-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20,0 C20,11.05 11.05,20 0,20 C11.05,20 20,28.95 20,40 C20,28.95 28.95,20 40,20 C28.95,20 20,11.05 20,0" fill="currentColor" />
              <circle cx="20" cy="20" r="3" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#mandala-pattern)" />
          </svg>
        </div>
      </div>

      <motion.div
        className="container mx-auto px-4 md:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content Section (7 columns on large screens) */}
          <div className="lg:col-span-7">
            <motion.div 
              className="max-w-3xl"
              variants={itemVariants}
            >
              <motion.h1
                className={`text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight font-${locale}`}
                variants={itemVariants}
              >
                {dictionary.home.hero.welcomeTitle}
              </motion.h1>
              
              <motion.p 
                className={`text-neutral-700 text-lg md:text-xl mb-8 max-w-2xl font-${locale}`}
                variants={itemVariants}
              >
                {dictionary.home.hero.welcomeSubtitle}
              </motion.p>
              
              <motion.div variants={itemVariants}>
                <HeroCta dictionary={dictionary} locale={locale} />
              </motion.div>
            </motion.div>
          </div>
          
          {/* Image Section (5 columns on large screens) */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl"
              variants={backgroundItemVariants}
            >
              {/* This would ideally be replaced with an actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8FA75C]/30 to-[#C2B280]/20 flex items-center justify-center overflow-hidden">
                {/* Placeholder for actual image - replace with your image */}
                <div className="relative w-full h-full">
                  <Image 
                    src="/images/hero-ayurveda.jpg" 
                    alt="Ayurvedic Treatment at Nidan Ayurved"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                </div>
              </div>
              
              {/* Decorative leaf elements */}
              <motion.div 
                className="absolute -bottom-10 -right-10 w-48 h-48 opacity-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.2, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100,0 C150,50 150,150 100,200 C50,150 50,50 100,0" fill="currentColor" className="text-primary" />
                </svg>
              </motion.div>
              
              <motion.div 
                className="absolute -top-10 -left-10 w-48 h-48 opacity-20 transform rotate-45"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 0.2, y: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100,0 C150,50 150,150 100,200 C50,150 50,50 100,0" fill="currentColor" className="text-accent" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-[50px] md:h-[70px]"
          fill="#556B2F10"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".1" />
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".1" />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" opacity=".1" />
        </svg>
      </div>
    </section>
  );
} 