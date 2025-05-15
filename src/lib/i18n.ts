import { Poppins, Mukta } from 'next/font/google';
import { notFound } from 'next/navigation';

// Define the locales we support
export const locales = ['en', 'hi', 'gu'] as const;
export type Locale = (typeof locales)[number];

// Define the fonts for each locale
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-en',
  display: 'swap',
});

export const mukta = Mukta({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hi',
  display: 'swap',
});

// For Gujarati fonts, we need to import Noto Sans Gujarati
// This might need adjustment based on actual imports
export const gujarati = {
  variable: '--font-gu',
};

// Helper function to get dictionary
export async function getDictionary(locale: Locale) {
  try {
    return (await import(`@/lib/dictionaries/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

// Simple hook for translations
export function useTranslations(dictionary: any) {
  return function t(key: string) {
    const keys = key.split('.');
    return keys.reduce((obj, key) => obj?.[key], dictionary) || key;
  };
}

// Helper to validate a locale
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Helper to get locale from path
export function getLocaleFromPath(path: string): Locale {
  const parts = path.split('/').filter(Boolean);
  const locale = parts[0] as Locale;
  
  if (isValidLocale(locale)) {
    return locale;
  }
  
  return 'en'; // Default locale
} 