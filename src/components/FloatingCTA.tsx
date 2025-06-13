"use client";

import { useState } from "react";
import { Locale } from "@/lib/i18n";
import { Phone, Calendar, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { getLocalizedPath } from "@/lib/utils";
import Image from "next/image";

interface FloatingCTAProps {
  dictionary: any;
  locale: Locale;
}

export function FloatingCTA({ dictionary, locale }: FloatingCTAProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className={`fixed bottom-6 right-6 z-50 font-${locale}`}>
      <div className="relative">
        {/* Ayurvedic-themed toggler button */}
        <button
          className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white shadow-lg border-2 border-amber-100 focus:outline-none focus:ring-2 focus:ring-primary-400 transform transition-transform duration-300 hover:scale-105 active:scale-95"
          onClick={toggleExpand}
          aria-expanded={isExpanded}
          aria-label={dictionary.home.stickyCta?.help || "Help"}
        >
          {isExpanded ? (
            <X size={24} className="text-amber-100" />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Image 
                src="/floatingcta.svg" 
                alt="Ayurvedic Symbol" 
                width={38} 
                height={38} 
                className="object-contain"
              />
            </div>
          )}
        </button>
        
        {/* Expanded panel with options */}
        <div
          className={`absolute bottom-20 right-0 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-2 border border-primary/20 transition-all duration-300 w-[220px] transform origin-bottom-right ${
            isExpanded 
            ? "scale-100 opacity-100" 
            : "scale-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-primary px-2 py-1 border-b border-primary/10">
              {dictionary.home.stickyCta?.helpTitle || "How can we help?"}
            </h3>
            
            {/* Call Button */}
            <Link 
              href="tel:+919662296922"
              className="flex items-center gap-3 py-3 px-4 hover:bg-primary/10 rounded-md transition-colors text-neutral-700"
              onClick={() => setIsExpanded(false)}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Phone size={15} />
              </div>
              <span className="text-sm font-medium">
                {dictionary.home.stickyCta?.call || "Call Now"}
              </span>
            </Link>
            
            {/* WhatsApp Button */}
            <Link 
              href="https://wa.me/919662296922"
              className="flex items-center gap-3 py-3 px-4 hover:bg-green-50 rounded-md transition-colors text-neutral-700"
              onClick={() => setIsExpanded(false)}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <MessageCircle size={15} />
              </div>
              <span className="text-sm font-medium">
                {dictionary.home.stickyCta?.whatsapp || "WhatsApp"}
              </span>
            </Link>
            
            {/* Book Appointment Button */}
            <Link 
              href={getLocalizedPath("/book-appointment", locale)}
              className="flex items-center gap-3 py-3 px-4 hover:bg-blue-50 rounded-md transition-colors text-neutral-700"
              onClick={() => setIsExpanded(false)}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Calendar size={15} />
              </div>
              <span className="text-sm font-medium">
                {dictionary.home.stickyCta?.book || "Book Appointment"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 