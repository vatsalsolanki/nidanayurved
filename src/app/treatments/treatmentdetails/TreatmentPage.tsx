'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Locale } from '@/lib/i18n';
import Hero from './Hero';
import Benefits from './Benefits';
import WhoIsItFor from './WhoIsItFor';
import Procedure from './Procedure';
import Duration from './Duration';
import LifestyleTips from './LifestyleTips';
import Faq from './Faq';
import ConsultationCta from './ConsultationCta';

interface TreatmentPageProps {
  dictionary: any;
  locale: Locale;
  treatmentData: any;
}

export default function TreatmentPage({ dictionary, locale, treatmentData }: TreatmentPageProps) {
  const [isPageReady, setIsPageReady] = useState(false);

  // Set page ready state after component mounts
  useEffect(() => {
    // Short delay to ensure hydration is complete
    const timer = setTimeout(() => {
      setIsPageReady(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  if (!treatmentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">
          {dictionary.common.treatmentNotFound || "Treatment not found."}
        </p>
      </div>
    );
  }

  // If page is not ready yet, render a minimal placeholder
  if (!isPageReady) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 pt-16">
          <div className="animate-pulse space-y-8">
            <div className="h-20 bg-gray-200 rounded-lg w-3/4 mx-auto"></div>
            <div className="h-72 md:h-96 bg-gray-200 rounded-xl w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Hero 
        dictionary={dictionary} 
        locale={locale} 
        treatment={treatmentData} 
      />
      <Benefits 
        dictionary={dictionary} 
        locale={locale} 
        treatment={treatmentData} 
      />
      <WhoIsItFor 
        dictionary={dictionary} 
        locale={locale} 
        treatment={treatmentData} 
      />
      <Procedure 
        dictionary={dictionary} 
        locale={locale} 
        treatment={treatmentData} 
      />
      <Duration 
        dictionary={dictionary} 
        locale={locale} 
        treatment={treatmentData} 
      />
      <LifestyleTips 
        dictionary={dictionary} 
        locale={locale} 
        treatment={treatmentData} 
      />
      <Faq 
        dictionary={dictionary} 
        locale={locale} 
        treatment={treatmentData} 
      />
      <ConsultationCta 
        dictionary={dictionary} 
        locale={locale} 
      />
    </main>
  );
} 