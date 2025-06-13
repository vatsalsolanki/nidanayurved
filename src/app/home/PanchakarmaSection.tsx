"use client";

import { motion } from "framer-motion";
import { Locale } from "@/lib/i18n";
import Link from "next/link";
import { getLocalizedPath } from "@/lib/utils";
import { useState } from "react";

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

// Treatment data
const treatments = [
  {
    id: "snehana",
    icon: (className: string) => (
      <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <motion.path 
          d="M21 16C21 16 32 8 43 16C54 24 43 48 32 54C21 48 10 24 21 16Z" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M32 30C34.2091 30 36 28.2091 36 26C36 23.7909 34.2091 22 32 22C29.7909 22 28 23.7909 28 26C28 28.2091 29.7909 30 32 30Z" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M32 30V42" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M28 38C28 38 30 42 36 38" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
      </svg>
    ),
    nameKey: "home.treatments.snehana",
    name: "Snehana",
    subtitle: "Oleation Therapy",
    description: "A therapeutic oil massage that lubricates tissues, loosens toxins, and promotes relaxation.",
  },
  {
    id: "swedana",
    icon: (className: string) => (
      <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <motion.path 
          d="M32 48C38.6274 48 44 42.6274 44 36C44 29.3726 38.6274 24 32 24C25.3726 24 20 29.3726 20 36C20 42.6274 25.3726 48 32 48Z" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M24 20C24 20 28 16 32 20C36 16 40 20 40 20" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M24 14C24 14 28 10 32 14C36 10 40 14 40 14" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M24 8C24 8 28 4 32 8C36 4 40 8 40 8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M28 36L36 36" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M28 40L36 40" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
      </svg>
    ),
    nameKey: "home.treatments.swedana",
    name: "Swedana",
    subtitle: "Herbal Steam Therapy",
    description: "Therapeutic sweating using medicinal herbs to remove toxins and improve circulation.",
  },
  {
    id: "vamana",
    icon: (className: string) => (
      <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <motion.path 
          d="M20 24C20 24 20 12 32 12C44 12 44 24 44 24V40C44 46.6274 38.6274 52 32 52C25.3726 52 20 46.6274 20 40V24Z" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M20 32H44" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M32 32V12" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M26 20L32 12L38 20" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
      </svg>
    ),
    nameKey: "home.treatments.vamana",
    name: "Vamana",
    subtitle: "Therapeutic Emesis",
    description: "Controlled elimination of toxins through therapeutic vomiting to cleanse the digestive system.",
  },
  {
    id: "virechana",
    icon: (className: string) => (
      <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <motion.path 
          d="M20 16C20 16 20 8 32 8C44 8 44 16 44 16V24C44 24 44 32 32 56C20 32 20 24 20 24V16Z" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M20 24H44" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M27 16L32 12L37 16" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M32 12V24" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
      </svg>
    ),
    nameKey: "home.treatments.virechana",
    name: "Virechana",
    subtitle: "Purgation Therapy",
    description: "Therapeutic purgation using herbal laxatives to eliminate toxins from the digestive tract.",
  },
  {
    id: "nasya",
    icon: (className: string) => (
      <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <motion.path 
          d="M22 34C22 34 24 42 32 42C40 42 42 34 42 34" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M16 28C16 28 22 14 32 14C42 14 48 28 48 28" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M16 28L48 28" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M32 28V50" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M24 20L32 14L40 20" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
      </svg>
    ),
    nameKey: "home.treatments.nasya",
    name: "Nasya",
    subtitle: "Nasal Cleansing",
    description: "Administration of medicated oils through the nasal passage to clear sinus channels and improve brain function.",
  },
  {
    id: "raktamokshana",
    icon: (className: string) => (
      <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <motion.circle 
          cx="32" 
          cy="32" 
          r="24" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M32 20C32 20 24 28 24 36C24 40.4183 27.5817 44 32 44C36.4183 44 40 40.4183 40 36C40 28 32 20 32 20Z" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M32 8V20" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M56 32H44" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M8 32H20" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M32 56V44" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
      </svg>
    ),
    nameKey: "home.treatments.raktamokshana",
    name: "Raktamokshana",
    subtitle: "Blood Detoxification",
    description: "Therapeutic bloodletting to remove toxins from the blood and treat various skin and circulatory disorders.",
  },
  {
    id: "basti",
    icon: (className: string) => (
      <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <motion.path 
          d="M20 16C20 12 25.3726 8 32 8C38.6274 8 44 12 44 16V24C44 40 32 56 32 56C32 56 20 40 20 24V16Z" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M20 24H44" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M32 8V24" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M28 16H36" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M28 20H36" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
      </svg>
    ),
    nameKey: "home.treatments.basti",
    name: "Basti",
    subtitle: "Medicated Enema",
    description: "Administration of herbal decoctions or oils through the rectum to cleanse the colon and balance Vata dosha.",
  },
  {
    id: "keraliya",
    icon: (className: string) => (
      <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <motion.path 
          d="M28 12H36C42.6274 12 48 17.3726 48 24V40C48 46.6274 42.6274 52 36 52H28C21.3726 52 16 46.6274 16 40V24C16 17.3726 21.3726 12 28 12Z" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M16 24L48 24" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M16 32L48 32" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M16 40L48 40" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M24 12V52" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M32 12V52" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M40 12V52" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          variants={pathVariants}
        />
      </svg>
    ),
    nameKey: "home.treatments.keraliya",
    name: "Keraliya Panchakarma",
    subtitle: "Kerala Therapies",
    description: "Specialized Ayurvedic treatments from Kerala including Shirodhara, Pizhichil, and other rejuvenation therapies.",
  },
];

interface PanchakarmaSectionProps {
  dictionary: any;
  locale: Locale;
}

export function PanchakarmaSection({ dictionary, locale }: PanchakarmaSectionProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -right-20 top-40 w-40 h-40 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -left-20 bottom-40 w-40 h-40 rounded-full bg-accent/5 blur-3xl"></div>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dots-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" className="text-primary" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dots-pattern)" />
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
            {dictionary.home.treatments?.title || "Our Panchakarma & Treatment Offerings"}
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
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {treatments.map((treatment) => (
            <motion.div
              key={treatment.id}
              style={{
                position: 'relative',
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.3s'
              }}
              variants={itemVariants}
              onHoverStart={() => setActiveCard(treatment.id)}
              onHoverEnd={() => setActiveCard(null)}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="p-6 md:p-8 flex flex-col items-center text-center h-full">
                {/* Top accent border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary transform origin-left transition-transform duration-500 group-hover:scale-x-100 scale-x-30"></div>
                
                {/* Icon */}
                <div className="mb-6 text-primary transition-transform duration-300 group-hover:scale-110">
                  {treatment.icon("w-16 h-16")}
                </div>
                
                {/* Treatment name */}
                <h3 className={`text-xl font-semibold text-primary mb-2 font-${locale}`}>
                  {dictionary[treatment.nameKey] || treatment.name}
                </h3>
                
                {/* Subtitle */}
                <p className={`text-sm text-primary/70 mb-4 font-${locale}`}>
                  {treatment.subtitle}
                </p>
                
                {/* Description - hidden until hover */}
                <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-32">
                  <p className={`text-neutral-600 text-sm leading-relaxed font-${locale}`}>
                    {treatment.description}
                  </p>
                </div>
                
                {/* Learn more link - appears on hover */}
                <div className="mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link 
                    href={getLocalizedPath(`/treatments/${treatment.id}`, locale)}
                    className={`text-primary text-sm font-medium hover:underline font-${locale}`}
                  >
                    {dictionary.home.cta?.learn || "Learn More"}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          style={{ textAlign: 'center', marginTop: '4rem' }}
          variants={itemVariants}
        >
          <p className={`text-neutral-600 italic mb-8 font-${locale}`}>
            {dictionary.home.treatments?.note || "Note: Treatments are tailored after consultation."}
          </p>
          <Link
            href={getLocalizedPath("/treatments", locale)}
            className={`inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors font-${locale}`}
          >
            {dictionary.home.treatments?.viewAll || "View All Treatments"}
            <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
} 