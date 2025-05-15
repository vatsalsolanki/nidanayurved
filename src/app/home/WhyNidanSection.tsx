"use client";

import { motion } from "framer-motion";
import { Locale } from "@/lib/i18n";
import Image from "next/image";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

// Benefits data
const benefits = [
  {
    key: "benefit1",
    fallbackText: "Experienced Ayurvedic Physicians",
    fallbackDescription: "Our doctors have years of specialized training in authentic Ayurvedic practices."
  },
  {
    key: "benefit2",
    fallbackText: "Personalized, Side-Effect-Free Therapies",
    fallbackDescription: "Each treatment plan is customized to your unique constitution and health needs."
  },
  {
    key: "benefit3",
    fallbackText: "Holistic Mind-Body Approach",
    fallbackDescription: "We address the root causes of imbalance, not just the symptoms."
  },
  {
    key: "benefit4",
    fallbackText: "Focus on Long-Term Wellness",
    fallbackDescription: "Our goal is to restore your body's natural ability to maintain health and prevent disease."
  },
  {
    key: "benefit5",
    fallbackText: "Authentic Panchakarma Practices",
    fallbackDescription: "We preserve traditional techniques while implementing modern hygienic standards."
  },
];

interface WhyNidanSectionProps {
  dictionary: any;
  locale: Locale;
}

export function WhyNidanSection({ dictionary, locale }: WhyNidanSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 -left-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        
        {/* Leaf pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" fill="none">
            <pattern id="leaf-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20,0 C30,10 30,30 20,40 C10,30 10,10 20,0" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#leaf-pattern)"></rect>
          </svg>
        </div>
      </div>
      
      <motion.div
        className="container mx-auto px-4 md:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Content Column (7 columns on large screens) */}
          <motion.div 
            className="lg:col-span-7 order-2 lg:order-1"
            variants={itemVariants}
          >
            <div className="max-w-2xl">
              <motion.div
                className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {dictionary.home.whyNidan?.subtitle || "Why Choose Nidan Ayurved"}
              </motion.div>
              
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight font-${locale}`}>
                {dictionary.home.whyNidan?.title || "Natural Healing, Rooted in Tradition"}
              </h2>
              
              <motion.div
                className="w-24 h-1 bg-accent mb-10 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              ></motion.div>
              
              <ul className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.li 
                    key={index}
                    className="flex gap-4"
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className={`font-medium text-lg text-primary mb-1 font-${locale}`}>
                        {dictionary.home.whyNidan?.[benefit.key] || benefit.fallbackText}
                      </h3>
                      <p className={`text-neutral-600 text-sm font-${locale}`}>
                        {dictionary.home.whyNidan?.[`${benefit.key}Description`] || benefit.fallbackDescription}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          {/* Image Column (5 columns on large screens) */}
          <motion.div 
            className="lg:col-span-5 order-1 lg:order-2"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Frame decoration */}
              <div className="absolute -inset-4 border-2 border-primary/20 rounded-2xl z-0 transform rotate-3"></div>
              
              {/* Main image container */}
              <div className="relative z-10 rounded-xl overflow-hidden shadow-xl aspect-[4/3]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-primary/20 mix-blend-multiply"></div>
                
                {/* Replace with actual clinic image */}
                <div className="relative w-full h-full">
                  <Image 
                    src="/images/why.png" 
                    alt="Ayurvedic treatment at Nidan Ayurved"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transform transition duration-700 hover:scale-105"
                  />
                </div>
              </div>
              
              {/* Testimonial float card */}
              <div className="absolute -bottom-16 -right-8 md:right-0 md:-right-16 max-w-xs bg-white p-6 rounded-xl shadow-lg border border-neutral-100 z-20 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <h3 className={`text-lg font-semibold text-primary mb-3 font-${locale}`}>
                  {dictionary.home.whyNidan?.didYouKnowTitle || "Did You Know?"}
                </h3>
                
                <p className={`text-neutral-700 text-sm mb-4 font-${locale}`}>
                  {dictionary.home.whyNidan?.didYouKnowText || 
                    "Ayurveda is one of the world's oldest healing systems, originating in India over 5,000 years ago. It's recognized by the World Health Organization as a traditional medical system."}
                </p>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className={`ml-3 text-xs text-accent font-medium font-${locale}`}>
                    {dictionary.home.whyNidan?.ayurvedaFact || "Ayurvedic Fact"}
                  </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full border-4 border-accent/20 z-0"></div>
              <div className="absolute -bottom-6 right-20 w-12 h-12 rounded-full bg-primary/20 z-0"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 