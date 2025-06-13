"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { locales, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const languageNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी", // Hindi
  gu: "ગુજરાતી", // Gujarati
};

interface LanguageSwitcherProps {
  locale: Locale;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [availableLocales, setAvailableLocales] = useState<Locale[]>([]);

  // Initialize the available locales on mount
  useEffect(() => {
    console.log("Available locales:", locales);
    // Convert readonly array to regular array using spread operator
    setAvailableLocales([...locales]);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // Change the language by modifying the URL and forcing a full page reload
  const changeLanguage = (newLocale: Locale) => {
    if (newLocale === locale) return;

    console.log(`Changing language from ${locale} to ${newLocale}`);

    // Get the path without any locale prefix
    let pathWithoutLocale = pathname;
    
    // Remove current locale prefix if it exists
    locales.forEach(loc => {
      if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
        pathWithoutLocale = pathname.replace(`/${loc}`, '');
      }
    });
    
    // Default to home if path is empty
    if (!pathWithoutLocale || pathWithoutLocale === '') {
      pathWithoutLocale = '/';
    }
    
    let newPath;
    
    // For English (default locale), don't add a prefix
    if (newLocale === 'en') {
      newPath = pathWithoutLocale;
    } else {
      // For other locales, add the locale prefix
      newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    }
    
    console.log(`New path: ${newPath}`);
    
    // Force a complete page reload by setting window.location.href
    window.location.href = newPath;
    closeDropdown();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-1 px-2 py-1 text-sm rounded-md hover:bg-background"
      >
        <span>{languageNames[locale]}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform", 
            isOpen ? "rotate-180" : ""
          )}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-1 w-32 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-50"
        >
          <div className="py-1 flex flex-col">
            {availableLocales.map((loc) => (
              <button
                key={loc}
                onClick={() => changeLanguage(loc)}
                className={cn(
                  "px-4 py-2 text-sm text-left hover:bg-background",
                  locale === loc ? "font-medium bg-background/70" : ""
                )}
              >
                {languageNames[loc]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 