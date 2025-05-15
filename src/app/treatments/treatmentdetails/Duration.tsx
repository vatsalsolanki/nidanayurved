'use client';

import { motion } from 'framer-motion';
import { Locale } from '@/lib/i18n';
import { Clock, Calendar } from 'lucide-react';

interface DurationProps {
  dictionary: any;
  locale: Locale;
  treatment: any;
}

export default function Duration({ dictionary, locale, treatment }: DurationProps) {
  // Check if we have duration information to display
  const hasDurationInfo = treatment.sessionDuration || treatment.totalSessions;
  
  if (!hasDurationInfo) {
    return null;
  }
  
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            {dictionary.treatments.treatmentDuration || "Treatment Duration"}
          </h2>
          <p className="text-text/70 max-w-2xl mx-auto">
            {dictionary.treatments.durationSubheading || "Plan your healing journey with our recommended treatment schedule."}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {treatment.sessionDuration && (
              <motion.div
                className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-text mb-1">
                      {dictionary.treatments.sessionDuration || "Session Duration"}
                    </h3>
                    <p className="text-2xl font-bold text-primary">
                      {treatment.sessionDuration} 
                      <span className="text-lg font-medium text-primary/70 ml-1">
                        {dictionary.treatments.minutes || "minutes"}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {treatment.totalSessions && (
              <motion.div
                className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-text mb-1">
                      {dictionary.treatments.recommendedSessions || "Recommended Sessions"}
                    </h3>
                    <p className="text-2xl font-bold text-primary">
                      {treatment.totalSessions}
                      <span className="text-lg font-medium text-primary/70 ml-1">
                        {treatment.totalSessions > 1 
                          ? (dictionary.treatments.sessions || "sessions")
                          : (dictionary.treatments.session || "session")}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {treatment.durationNote && (
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-text/70 italic">
                {treatment.durationNote}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
} 