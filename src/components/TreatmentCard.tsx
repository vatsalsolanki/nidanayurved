"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Locale } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/utils";

interface TreatmentCardProps {
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
  locale: Locale;
  dictionary: any;
}

export default function TreatmentCard({
  slug,
  title,
  shortDescription,
  image,
  locale,
  dictionary
}: TreatmentCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group border border-neutral-200">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative h-52 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
          <p className="text-neutral-600 text-sm mb-4">{shortDescription}</p>
          <Link
            href={getLocalizedPath(`treatments/${slug}`, locale)}
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {dictionary.common.readMore}
            <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 