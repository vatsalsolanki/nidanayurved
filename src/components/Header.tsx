"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Locale, locales } from "@/lib/i18n";
import { cn, getLocalizedPath } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";

type NavItem = {
  key: string;
  path: string;
};

// These are the same across all languages, only the text will change
const navItems: NavItem[] = [
  { key: "home", path: "/" },
  { key: "about", path: "/about-us" },
  { key: "treatments", path: "/treatments" },
  { key: "gallery", path: "/gallery" },
  { key: "contact", path: "/contact" },
];

interface HeaderProps {
  dictionary: any;
  locale: Locale;
}

export default function Header({ dictionary, locale }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState<Locale>(locale);

  // Update currentLocale if the locale prop changes
  useEffect(() => {
    setCurrentLocale(locale);
    console.log("Current locale in Header:", locale);
  }, [locale]);

  // Determine if a nav item is active
  const isActive = (path: string) => {
    // Normalize the current pathname by removing locale prefix
    let normalizedPathname = pathname;
    
    // Remove locale prefix if present
    for (const loc of locales) {
      if (pathname === `/${loc}`) {
        normalizedPathname = '/';
        break;
      } else if (pathname.startsWith(`/${loc}/`)) {
        normalizedPathname = pathname.replace(`/${loc}`, '');
        break;
      }
    }
    
    // For home page, use exact matching
    if (path === '/') {
      return normalizedPathname === '/';
    }
    
    // For other pages, check if the normalized path equals or starts with the nav path
    return normalizedPathname === path || 
           (path !== '/' && normalizedPathname.startsWith(path));
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href={getLocalizedPath("", currentLocale)}
            className="flex items-center gap-2"
          >
            <img 
              src="/logo.png"
              alt="Nidan Ayurved Logo"
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.key}
                href={getLocalizedPath(item.path, currentLocale)}
                className={cn(
                  "relative text-sm transition-colors hover:text-primary",
                  isActive(item.path) 
                    ? "font-medium text-primary" 
                    : "text-neutral-700"
                )}
              >
                {dictionary.header[item.key]}
                {isActive(item.path) && (
                  <span 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Language Switcher and Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher locale={currentLocale} />
            
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 text-neutral-700 hover:text-primary"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-white md:hidden"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link 
                href={getLocalizedPath("", currentLocale)}
                className="flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <img 
                  src="/logo.png"
                  alt="Nidan Ayurved Logo"
                  className="h-10 w-auto"
                />
              </Link>
              
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-neutral-700 hover:text-primary"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="flex flex-col mt-8 space-y-4">
              {navItems.map((item) => (
                <Link 
                  key={item.key}
                  href={getLocalizedPath(item.path, currentLocale)}
                  className={cn(
                    "py-2 text-lg hover:text-primary",
                    isActive(item.path) 
                      ? "font-medium text-primary" 
                      : "text-neutral-700"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {dictionary.header[item.key]}
                </Link>
              ))}
            </nav>
            
            {/* Add language switcher to mobile menu too */}
            <div className="mt-6 pb-4 border-t border-neutral-200 pt-4">
              <div className="flex justify-center">
                <LanguageSwitcher locale={currentLocale} />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 