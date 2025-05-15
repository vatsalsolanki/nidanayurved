'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Locale } from '@/lib/i18n';
import { GalleryImage, getGalleryImages } from './galleryUtils';

type FeaturedMomentsProps = {
  dictionary: any;
  locale: Locale;
};

export function FeaturedMoments({ dictionary, locale }: FeaturedMomentsProps) {
  const featuredRef = useRef<HTMLDivElement>(null);
  const allImages = getGalleryImages(dictionary);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  // Take one image from each category to feature
  const featuredImages: GalleryImage[] = [];
  
  // Get one image from each category to feature (therapies, center, events)
  allImages.forEach(image => {
    // Only add the first image from each category
    if (!featuredImages.some(img => img.category === image.category)) {
      featuredImages.push(image);
    }
  });
  
  // Don't show this section if there are no images
  if (featuredImages.length === 0) return null;

  const handleImageError = (imageSrc: string) => {
    setImageErrors(prev => ({
      ...prev,
      [imageSrc]: true
    }));
  };
  
  return (
    <section className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto mb-20" ref={featuredRef}>
      <h2 className="text-2xl font-bold text-primary-800 mb-6 text-center">
        {dictionary.gallery.featuredMomentsTitle}
      </h2>
      
      {/* Desktop gallery */}
      <div className="hidden md:grid grid-cols-3 gap-5 h-[300px]">
        {featuredImages.map((image, index) => (
          <div 
            key={image.src}
            className="relative h-full w-full overflow-hidden rounded-lg shadow-lg hover:scale-[1.03] transition-transform duration-300 opacity-0 animate-fadeIn"
            style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards' }}
          >
            {imageErrors[image.src] ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-center p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-gray-500">Image not available</p>
                </div>
              </div>
            ) : (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-all duration-700 hover:brightness-110"
                priority
                onError={() => handleImageError(image.src)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white font-semibold text-lg">{image.alt}</h3>
              <span className="bg-primary-600/90 text-white text-xs px-2 py-0.5 rounded-full w-fit mt-2">
                {dictionary.gallery.categories[image.category]}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile slider */}
      <div className="md:hidden flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory">
        {featuredImages.map((image, index) => (
          <div 
            key={image.src}
            className="relative flex-shrink-0 w-[80vw] h-[250px] snap-center overflow-hidden rounded-lg shadow-lg"
          >
            {imageErrors[image.src] ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-center p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-gray-500">Image not available</p>
                </div>
              </div>
            ) : (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="80vw"
                className="object-cover"
                priority
                onError={() => handleImageError(image.src)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white font-semibold text-lg">{image.alt}</h3>
              <span className="bg-primary-600/90 text-white text-xs px-2 py-0.5 rounded-full w-fit mt-2">
                {dictionary.gallery.categories[image.category]}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll indicator for mobile */}
      <div className="flex justify-center mt-3 gap-1.5 md:hidden">
        {featuredImages.map((_, index) => (
          <div key={index} className="w-2 h-2 rounded-full bg-primary-300" />
        ))}
      </div>
    </section>
  );
} 