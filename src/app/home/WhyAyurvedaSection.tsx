"use client";

import { motion } from "framer-motion";
import { Locale } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { getLocalizedPath } from "@/lib/utils";

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
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

// Animated SVG path variants
const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: "spring", duration: 1.5, bounce: 0 },
      opacity: { duration: 0.5 }
    }
  }
};

interface WhyAyurvedaSectionProps {
  dictionary: any;
  locale: Locale;
}

export function WhyAyurvedaSection({ dictionary, locale }: WhyAyurvedaSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-background to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -left-20 top-1/4 w-40 h-40 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -right-20 top-3/4 w-40 h-40 rounded-full bg-accent/5 blur-3xl"></div>
      
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" className="text-primary">
          <pattern id="leaf-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20,0 C30,10 30,30 20,40 C10,30 10,10 20,0" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
        </svg>
      </div>
      
      <motion.div
        style={{
          maxWidth: '1280px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          position: 'relative',
          zIndex: 10
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div style={{ textAlign: 'center', marginBottom: '4rem' }} variants={itemVariants}>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 font-${locale}`}>
            {dictionary.home.whyAyurveda?.title || "Why Choose Ayurveda?"}
          </h2>
          <motion.div
            style={{
              width: '6rem',
              height: '0.25rem',
              backgroundColor: 'var(--color-accent)',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '2rem',
              borderRadius: '9999px'
            }}
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          ></motion.div>
          <motion.p
            style={{
              color: '#374151',
              fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
              maxWidth: '48rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.7',
              fontFamily: `var(--font-${locale})`
            }}
            variants={itemVariants}
          >
            {dictionary.home.whyAyurveda?.content || 
              "Ayurveda is more than medicine—it's a science of balanced living. From personalized diet plans and positive lifestyle practices to effective treatments for chronic ailments, Ayurveda offers a holistic approach to well-being."}
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Ancient Wisdom */}
          <motion.div 
            style={{
              position: 'relative',
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid #f1f1f1',
              overflow: 'hidden',
              transition: 'box-shadow 0.5s'
            }}
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-3xl"></div>
            
            <div className="relative">
              <div className="w-16 h-16 mb-6 relative">
                <svg viewBox="0 0 64 64" className="w-full h-full text-primary">
                  <motion.path
                    d="M32 8C18.7 8 8 18.7 8 32C8 45.3 18.7 56 32 56C45.3 56 56 45.3 56 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={pathVariants}
                  />
                  <motion.path
                    d="M32 16V32L24 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={pathVariants}
                  />
                  <motion.path
                    d="M42 8C46 12 46 20 46 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={pathVariants}
                  />
                  <motion.path
                    d="M52 10C56 14 56 22 56 22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={pathVariants}
                  />
                </svg>
              </div>
              
              <h3 className={`text-xl font-semibold text-primary mb-4 font-${locale}`}>
                {dictionary.home.whyAyurveda?.benefit1Title || "Ancient Wisdom"}
              </h3>
              
              <p className={`text-neutral-600 font-${locale}`}>
                {dictionary.home.whyAyurveda?.benefit1Text || "Time-tested practices developed over 5,000 years"}
              </p>
            </div>
          </motion.div>
          
          {/* Holistic Approach */}
          <motion.div 
            style={{
              position: 'relative',
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid #f1f1f1',
              overflow: 'hidden',
              transition: 'box-shadow 0.5s'
            }}
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-3xl"></div>
            
            <div className="relative">
              <div className="w-16 h-16 mb-6 relative">
                <svg viewBox="0 0 64 64" className="w-full h-full text-primary">
                  <motion.circle
                    cx="32"
                    cy="32"
                    r="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    variants={pathVariants}
                  />
                  <motion.path
                    d="M32 16V48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={pathVariants}
                  />
                  <motion.path
                    d="M16 32H48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={pathVariants}
                  />
                  <motion.circle
                    cx="32"
                    cy="32"
                    r="8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    variants={pathVariants}
                  />
                </svg>
              </div>
              
              <h3 className={`text-xl font-semibold text-primary mb-4 font-${locale}`}>
                {dictionary.home.whyAyurveda?.benefit2Title || "Holistic Approach"}
              </h3>
              
              <p className={`text-neutral-600 font-${locale}`}>
                {dictionary.home.whyAyurveda?.benefit2Text || "Treats the whole person, not just symptoms"}
              </p>
            </div>
          </motion.div>
          
          {/* Natural Healing */}
          <motion.div 
            style={{
              position: 'relative',
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid #f1f1f1',
              overflow: 'hidden',
              transition: 'box-shadow 0.5s'
            }}
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-3xl"></div>
            
            <div className="relative">
              <div className="w-16 h-16 mb-6 relative">
                <svg viewBox="0 0 64 64" className="w-full h-full text-primary">
                  <motion.path
                    d="M16,48 C16,32 32,32 32,16 C32,32 48,32 48,48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={pathVariants}
                  />
                  <motion.path
                    d="M16,56 L48,56"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={pathVariants}
                  />
                  <motion.path
                    d="M24,36 C24,36 32,40 40,36"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={pathVariants}
                  />
                </svg>
              </div>
              
              <h3 className={`text-xl font-semibold text-primary mb-4 font-${locale}`}>
                {dictionary.home.whyAyurveda?.benefit3Title || "Natural Healing"}
              </h3>
              
              <p className={`text-neutral-600 font-${locale}`}>
                {dictionary.home.whyAyurveda?.benefit3Text || "Uses herbs and therapies without harmful side effects"}
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* Additional call to action or link */}
        <motion.div 
          style={{
            marginTop: '4rem',
            textAlign: 'center'
          }}
          variants={itemVariants}
        >
          <Link 
            href={getLocalizedPath("/what-is-ayurveda", locale)}
            className={`inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors font-${locale}`}
          >
            <span>{dictionary.home.cta?.learn || "Learn More"}</span>
            <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
} 