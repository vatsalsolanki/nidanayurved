'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/lib/i18n';
import { 
  GalleryCategory, 
  GalleryImage, 
  getGalleryImages, 
  filterImagesByCategory 
} from './galleryUtils';
import { CategoryFilter } from './CategoryFilter';
import { GalleryItem } from './GalleryItem';
import { LightboxModal } from './LightboxModal';

type GalleryGridProps = {
  dictionary: any;
  locale: Locale;
};

export function GalleryGrid({ dictionary, locale }: GalleryGridProps) {
  // State for category filtering and lightbox
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get all gallery images
  const allImages = getGalleryImages(dictionary);
  
  // Filter images based on active category and search query
  const filteredImages = filterImagesByCategory(allImages, activeCategory)
    .filter(image => {
      if (!searchQuery) return true;
      return (
        image.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  
  // Available categories
  const categories: GalleryCategory[] = ['all', 'therapies', 'center', 'events'];
  
  // Simulate loading effect (remove this in production when using real images)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };
  
  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };
  
  const goToNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Clear search query
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  return (
    <section className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto pb-20">
      {/* Search bar */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={dictionary.gallery.searchPlaceholder}
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent pl-10 pr-10"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Category filters */}
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        dictionary={dictionary}
        locale={locale}
      />
      
      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      )}
      
      {/* Gallery grid */}
      {!isLoading && filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-auto">
          {filteredImages.map((image, index) => (
            <div
              key={`${activeCategory}-${image.src}`}
              className="opacity-0 animate-fadeIn"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'forwards',
                // Create a masonry-like effect with different heights
                gridRow: `span ${Math.floor(Math.random() * 1) + 1}`
              }}
            >
              <GalleryItem
                image={image}
                onClick={() => openLightbox(index)}
                expandText={dictionary.gallery.expandImage}
                categoryLabel={dictionary.gallery.categories[image.category]}
              />
            </div>
          ))}
        </div>
      ) : !isLoading ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg shadow-sm">
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 mb-2">{dictionary.gallery.noImagesFound}</p>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              {activeCategory !== 'all' ? 
                dictionary.treatments.tryAdjusting : 
                "No images have been added to the gallery yet."}
            </p>
            {activeCategory !== 'all' && (
              <button 
                onClick={() => setActiveCategory('all')}
                className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
              >
                {dictionary.treatments.clearFilters}
              </button>
            )}
          </div>
        </div>
      ) : null}
      
      {/* Lightbox modal */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        images={filteredImages}
        currentImageIndex={currentImageIndex}
        onPrevious={goToPreviousImage}
        onNext={goToNextImage}
        dictionary={dictionary}
      />
    </section>
  );
} 