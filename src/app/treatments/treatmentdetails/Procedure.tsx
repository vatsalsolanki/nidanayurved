'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Locale } from '@/lib/i18n';
import { ListOrdered } from 'lucide-react';
import Image from 'next/image';
import { MotionWrapper } from '@/components/ui/MotionWrapper';

interface ProcedureProps {
  dictionary: any;
  locale: Locale;
  treatment: any;
}

export default function Procedure({ dictionary, locale, treatment }: ProcedureProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Animation variants for text content
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <MotionWrapper
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <ListOrdered className="h-7 w-7 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                {dictionary.treatments.procedureOverview || "Procedure Overview"}
              </h2>
              <p className="text-text/70 max-w-2xl mx-auto">
                {dictionary.treatments.procedureSubheading || "Understand the careful and expert process followed during this Ayurvedic treatment."}
              </p>
            </MotionWrapper>
          </div>

          <div className="bg-background/50 rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <MotionWrapper
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Optional image - conditionally rendered if procedure image exists */}
                {treatment.procedureImage && (
                  <div className={`md:w-1/3 rounded-xl overflow-hidden shadow-md ${isImageLoaded ? '' : 'bg-gray-100'}`}>
                    <div className="relative h-64 w-full">
                      <Image
                        src={treatment.procedureImage}
                        alt={`${treatment.title} procedure`}
                        fill
                        className={`object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        loading="eager"
                        priority
                        sizes="(max-width: 768px) 100vw, 33vw"
                        onLoad={() => setIsImageLoaded(true)}
                        onError={() => setIsImageLoaded(true)}
                      />
                    </div>
                  </div>
                )}
                
                {/* Procedure description */}
                <div className={`${treatment.procedureImage ? 'md:w-2/3' : 'w-full'}`}>
                  <MotionWrapper
                    variants={textVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <div className="prose prose-lg max-w-none text-text/90">
                      <div dangerouslySetInnerHTML={{ __html: treatment.longDescription }} />
                    </div>
                  </MotionWrapper>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </div>
    </section>
  );
} 