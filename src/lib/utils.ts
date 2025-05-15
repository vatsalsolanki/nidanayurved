import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Locale } from "./i18n";

/**
 * Combines and merges Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date according to the locale
 */
export function formatDate(
  date: Date | string,
  locale: Locale,
  options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  }
) {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(getFullLocaleCode(locale), options).format(d);
}

/**
 * Converts our locale code to a full locale code
 */
export function getFullLocaleCode(locale: Locale): string {
  const localeMap: Record<Locale, string> = {
    en: "en-US",
    hi: "hi-IN",
    gu: "gu-IN",
  };
  return localeMap[locale];
}

/**
 * Gets the correct font variable based on locale
 */
export function getFontByLocale(locale: Locale): string {
  const fontMap: Record<Locale, string> = {
    en: "var(--font-en)",
    hi: "var(--font-hi)",
    gu: "var(--font-gu)",
  };
  return fontMap[locale];
}

/**
 * Loads treatments data by locale
 */
export async function getTreatments(locale: Locale) {
  try {
    return (await import(`@/lib/treatments/${locale}.json`)).default;
  } catch (error) {
    console.error(`Error loading treatments for locale ${locale}:`, error);
    return [];
  }
}

/**
 * Gets a specific treatment by slug
 */
export async function getTreatmentBySlug(slug: string, locale: Locale) {
  const treatments = await getTreatments(locale);
  return treatments.find((treatment: any) => treatment.slug === slug);
}

/**
 * Builds metadata for SEO
 */
export function buildMetadata({
  title,
  description,
  url,
  locale,
}: {
  title: string;
  description: string;
  url: string;
  locale: Locale;
}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
      languages: {
        en: url.replace(`/${locale}`, ""),
        hi: url.replace(`/${locale}`, "/hi"),
        gu: url.replace(`/${locale}`, "/gu"),
      },
    },
  };
}

/**
 * Returns path with language prefix (except for default 'en')
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  // Handle empty paths
  if (!path) return locale === "en" ? "/" : `/${locale}`;
  
  // Remove leading slash for consistent handling
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  
  // Default locale (English) has no prefix
  if (locale === "en") {
    return cleanPath ? `/${cleanPath}` : "/";
  }
  
  // Other locales get the prefix
  return `/${locale}${cleanPath ? `/${cleanPath}` : ""}`;
} 