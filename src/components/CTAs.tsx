"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Locale } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/utils";

interface CtaButtonProps {
  href: string;
  locale: Locale;
  primary?: boolean;
  children: React.ReactNode;
}

export function CtaButton({ 
  href, 
  locale, 
  primary = false, 
  children 
}: CtaButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link
        href={getLocalizedPath(href, locale)}
        className={`inline-block px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
          primary
            ? "bg-primary text-white hover:bg-primary/90"
            : "bg-white text-primary border border-primary hover:bg-primary/5"
        }`}
      >
        {children}
      </Link>
    </motion.div>
  );
}

interface HeroCtaProps {
  dictionary: any;
  locale: Locale;
}

export function HeroCta({ dictionary, locale }: HeroCtaProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <CtaButton href="/book-appointment" locale={locale} primary>
        {dictionary.home.cta.book}
      </CtaButton>
      <CtaButton href="/treatments" locale={locale}>
        {dictionary.home.cta.learn}
      </CtaButton>
    </div>
  );
}

interface AppointmentCtaProps {
  title: string;
  description: string;
  buttonText: string;
  locale: Locale;
}

export function AppointmentCta({ 
  title, 
  description, 
  buttonText, 
  locale 
}: AppointmentCtaProps) {
  return (
    <section className="bg-primary/10 py-16 px-4 md:px-8 rounded-2xl">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
          {title}
        </h2>
        <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <CtaButton href="/book-appointment" locale={locale} primary>
          {buttonText}
        </CtaButton>
      </div>
    </section>
  );
} 