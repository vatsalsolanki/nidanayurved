"use client";

import Image from 'next/image';
import { Locale } from '@/lib/i18n';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OurTeamProps {
  dictionary: any;
  locale: Locale;
}

export default function OurTeam({ dictionary, locale }: OurTeamProps) {
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: 'beforeChildren'
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Font class based on the locale
  const fontClass = locale === 'hi' ? 'font-hi' : locale === 'gu' ? 'font-gu' : 'font-en';

  // Team members from dictionary
  const teamMembers = dictionary.about.team || [];

  // Expertise icons mapping
  const expertiseIcons: Record<string, React.ReactNode> = {
    "Panchakarma": (
      <svg className="w-6 h-6" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          d="M20 16C20 12 25.3726 8 32 8C38.6274 8 44 12 44 16V24C44 40 32 56 32 56C32 56 20 40 20 24V16Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M20 24H44" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 8V24" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "Ayurvedic Surgery": (
      <svg className="w-6 h-6" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 32H48" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 16V48" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="16" y="16" width="32" height="32" rx="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "Women's Health": (
      <svg className="w-6 h-6" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="32" cy="24" r="16" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 40V56" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 48H40" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "default": (
      <svg className="w-6 h-6" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          d="M32 48C38.6274 48 44 42.6274 44 36C44 29.3726 38.6274 24 32 24C25.3726 24 20 29.3726 20 36C20 42.6274 25.3726 48 32 48Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M24 20C24 20 28 16 32 20C36 16 40 20 40 20" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  };

  // Helper function to get appropriate icon
  const getExpertiseIcon = (specialization: string) => {
    // Check if specialization contains any of the keys
    for (const [key, icon] of Object.entries(expertiseIcons)) {
      if (specialization && specialization.includes(key)) {
        return icon;
      }
    }
    return expertiseIcons.default;
  };

  // Handle image error
  const handleImageError = (index: number) => {
    setImageError(prev => ({ ...prev, [index]: true }));
  };

  // Generate image fallback - design similar to AboutHero
  const renderImageFallback = (name: string) => (
    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-2 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div className="text-primary text-base font-medium px-4">
          {name}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={cn("text-3xl md:text-4xl font-bold text-primary mb-4", fontClass)}>
              {dictionary.about.teamTitle}
            </h2>
            <p className={cn("text-lg max-w-3xl mx-auto text-text/80", fontClass)}>
              {dictionary.about.teamSubtitle}
            </p>
          </MotionWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {teamMembers.map((member: any, index: number) => (
            <MotionWrapper 
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row h-full">
                {/* Image Section */}
                <div className="relative h-64 md:w-2/5 md:h-auto bg-primary/10">
                  {!imageError[index] ? (
                    <Image
                      src={member.image || "/images/team/placeholder.jpg"}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      onError={() => handleImageError(index)}
                    />
                  ) : renderImageFallback(member.name)}
                </div>
                
                {/* Content Section */}
                <div className="p-6 md:w-3/5 flex flex-col">
                  <h3 className={cn("text-xl font-bold text-primary mb-1", fontClass)}>
                    {member.name}
                  </h3>
                  <p className={cn("text-secondary/80 mb-3", fontClass)}>
                    {member.title}
                  </p>
                  <p className={cn("text-text/70 mb-auto", fontClass)}>
                    {member.bio}
                  </p>

                  {member.specialization && (
                    <div className="mt-4 flex items-center">
                      <span className="text-primary mr-2">
                        {getExpertiseIcon(member.specialization)}
                      </span>
                      <div>
                        <h4 className={cn("text-sm font-semibold text-primary mb-1", fontClass)}>
                          {dictionary.about.specializationLabel}:
                        </h4>
                        <p className={cn("text-sm text-text/70", fontClass)}>
                          {member.specialization}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
} 