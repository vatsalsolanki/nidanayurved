'use client';

import { useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ContactForm from './ContactForm';
import SimpleContactForm from './SimpleContactForm';
import { Locale } from '@/lib/i18n';

interface ContactFormWrapperProps {
  dictionaryData: string;
  locale: Locale;
}

// Define our own fallback props type for compatibility with React 19
interface CustomFallbackProps {
  error: Error;
}

export default function ContactFormWrapper({ dictionaryData, locale }: ContactFormWrapperProps) {
  const [dictionary, setDictionary] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const parsedDictionary = JSON.parse(dictionaryData);
      setDictionary(parsedDictionary);
    } catch (err) {
      console.error('Error parsing dictionary data:', err);
      setError(err instanceof Error ? err : new Error('Failed to parse dictionary data'));
    }
  }, [dictionaryData]);

  // Fallback component for when the main form fails
  const FallbackComponent = ({ error }: CustomFallbackProps) => {
    console.error('Error in ContactForm component:', error);
    return dictionary ? (
      <SimpleContactForm dictionary={dictionary} locale={locale} />
    ) : (
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
        <p className="text-center text-red-500">
          Sorry, there was an issue loading the contact form. Please try again later or contact us directly at info@nidanayurved.com
        </p>
      </div>
    );
  };

  // Show loading state while parsing dictionary
  if (!dictionary && !error) {
    return (
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  // Show error state if dictionary parsing failed
  if (error) {
    return <FallbackComponent error={error} />;
  }

  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <ContactForm dictionary={dictionary} locale={locale} />
    </ErrorBoundary>
  );
} 