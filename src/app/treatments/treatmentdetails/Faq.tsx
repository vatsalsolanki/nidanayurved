'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Locale } from '@/lib/i18n';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  dictionary: any;
  locale: Locale;
  treatment: any;
}

export default function Faq({ dictionary, locale, treatment }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Toggle FAQ item
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // If no FAQs are provided, don't render the section
  if (!treatment.faqs || treatment.faqs.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <HelpCircle className="h-7 w-7 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            {dictionary.treatments.faqHeading || "Frequently Asked Questions"}
          </h2>
          <p className="text-text/70 max-w-2xl mx-auto">
            {dictionary.treatments.faqSubheading || "Get answers to common questions about this treatment."}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {treatment.faqs.map((faq: FaqItem, index: number) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full p-5 text-left bg-background hover:bg-background/80 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-medium text-primary">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-primary flex-shrink-0" />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 bg-white border-t border-gray-100">
                    <p className="text-text/80">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 