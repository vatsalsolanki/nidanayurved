import type { Metadata } from "next";
import { headers } from "next/headers";
import { getDictionary, Locale, isValidLocale, poppins, mukta, gujarati } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nidan Ayurved",
  description: "Authentic Ayurvedic Treatments",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  // Get the headers - correctly await the headers object
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const headerLocale = headersList.get("x-locale");
  
  // Resolve the params promise
  const resolvedParams = await params;
  
  // Determine locale from headers, params, or default to English
  let locale: Locale = "en"; // Default is English
  
  if (resolvedParams.locale && isValidLocale(resolvedParams.locale)) {
    // Locale from route params (for /hi/... or /gu/... routes)
    locale = resolvedParams.locale;
  } else if (headerLocale && isValidLocale(headerLocale)) {
    // Locale from headers (set by middleware)
    locale = headerLocale as Locale;
  }
  
  // Get the appropriate dictionary for translations
  const dictionary = await getDictionary(locale);
  
  // Font classes based on locale
  const fontClasses: Record<Locale, string> = {
    en: "font-en",
    hi: "font-hi",
    gu: "font-gu",
  };
  
  return (
    <html lang={locale} className={`${poppins.variable} ${mukta.variable} ${gujarati.variable}`}>
      <body className={`min-h-screen flex flex-col bg-background text-text ${fontClasses[locale]}`}>
        <Header dictionary={dictionary} locale={locale} />
        <main className="flex-1">
          {children}
        </main>
        <Footer dictionary={dictionary} locale={locale} />
        <FloatingCTA dictionary={dictionary} locale={locale} />
      </body>
    </html>
  );
}
