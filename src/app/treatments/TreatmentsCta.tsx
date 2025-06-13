'use client';

import Link from 'next/link';
import { Locale } from '@/lib/i18n';
import { getLocalizedPath } from '@/lib/utils';

interface TreatmentsCtaProps {
  dictionary: any;
  locale: Locale;
}

export default function TreatmentsCta({ dictionary, locale }: TreatmentsCtaProps) {
  // Localized content for the CTA section
  const content = {
    en: {
      title: "Ready to experience authentic Ayurvedic healing?",
      description: "Schedule a consultation with our expert practitioners to discuss which treatment is right for your unique constitution and health goals.",
      buttonText: "Book an Appointment",
    },
    hi: {
      title: "प्रामाणिक आयुर्वेदिक उपचार का अनुभव करने के लिए तैयार हैं?",
      description: "हमारे विशेषज्ञ चिकित्सकों के साथ परामर्श के लिए अपॉइंटमेंट लें और जानें कौन सा उपचार आपके स्वास्थ्य लक्ष्यों के लिए सही है।",
      buttonText: "अपॉइंटमेंट बुक करें",
    },
    gu: {
      title: "પ્રામાણિક આયુર્વેદિક ઉપચારનો અનુભવ કરવા તૈયાર છો?",
      description: "અમારા નિષ્ણાત ચિકિત્સકો સાથે પરામર્શ માટે અપોઇન્ટમેન્ટ બુક કરો અને જાણો કે તમારા સ્વાસ્થ્ય લક્ષ્યો માટે કયો ઉપચાર યોગ્ય છે.",
      buttonText: "અપોઇન્ટમેન્ટ બુક કરો",
    },
  };

  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-primary/10 overflow-hidden">
          <div className="p-8 md:p-10 text-center">
            <div className="transition-all duration-300 transform hover:-translate-y-1">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                {content[locale].title}
              </h2>
              
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                {content[locale].description}
              </p>
              
              <Link
                href={getLocalizedPath('/book-appointment', locale)}
                className="inline-flex justify-center items-center px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-md"
              >
                {content[locale].buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 