"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Locale } from "@/lib/i18n";
import { cn, getLocalizedPath } from "@/lib/utils";

const footerLinks = [
  { key: "home", path: "/" },
  { key: "about", path: "/about-us" },
  { key: "treatments", path: "/treatments" },
  { key: "gallery", path: "/gallery" },
  { key: "contact", path: "/contact" }
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" }
];

interface FooterProps {
  dictionary: any;
  locale: Locale;
}

export default function Footer({ dictionary, locale }: FooterProps) {
  return (
    <footer className="bg-primary/10 border-t border-primary/20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="mb-4">
              <img 
                src="/logo.png"
                alt="Nidan Ayurved Logo"
                className="h-16 w-auto"
              />
            </div>
            <p className="text-sm text-neutral-600 mb-6">
              {dictionary.footer.description}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <div key={social.label}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">{dictionary.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.key}>
                  <Link 
                    href={getLocalizedPath(link.path, locale)}
                    className="text-sm text-neutral-600 hover:text-primary transition-colors"
                  >
                    {dictionary.header[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">{dictionary.footer.contactUs}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-600">
                  {dictionary.footer.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+919662296922" className="text-sm text-neutral-600 hover:text-primary">
                  +91 9662 29 6922
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-primary shrink-0" />
                <a href="https://wa.me/919662296922" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-600 hover:text-primary">
                  {dictionary.home.cta.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@nidanayurved.com" className="text-sm text-neutral-600 hover:text-primary">
                  info@nidanayurved.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-neutral-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-neutral-500 mb-4 md:mb-0">
              {dictionary.footer.rights}
            </p>
            <div className="flex gap-4">
              <Link 
                href={getLocalizedPath("/privacy-policy", locale)} 
                className="text-xs text-neutral-500 hover:text-primary"
              >
                {dictionary.footer.privacy}
              </Link>
              <Link 
                href={getLocalizedPath("/terms-of-service", locale)}
                className="text-xs text-neutral-500 hover:text-primary"
              >
                {dictionary.footer.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 