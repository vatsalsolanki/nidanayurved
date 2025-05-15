"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import MotionWrapper from '@/components/ui/MotionWrapper';

interface ClinicGalleryProps {
  dictionary: any;
  locale: Locale;
}

interface GalleryItem {
  id: number;
  imageSrc: string;
  videoSrc?: string;
  isVideo?: boolean;
  translationKey: string;
}

export default function ClinicGallery({ dictionary, locale }: ClinicGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [videoError, setVideoError] = useState(false);

  // Font class based on locale
  const fontClass = locale === 'hi' ? 'font-hi' : locale === 'gu' ? 'font-gu' : 'font-en';

  // Gallery items with translation keys
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      imageSrc: "/images/clinic/treatment-room.jpg",
      translationKey: "treatmentRoom"
    },
    {
      id: 2,
      imageSrc: "/images/clinic/reception.jpg",
      translationKey: "receptionArea"
    },
    {
      id: 3,
      imageSrc: "/images/clinic/panchakarma.jpg",
      translationKey: "panchakarmaTherapy"
    },
    {
      id: 4,
      imageSrc: "/images/clinic/consultation.jpg",
      translationKey: "consultationRoom"
    },
    {
      id: 5,
      imageSrc: "/images/clinic/herbal-pharmacy.jpg",
      translationKey: "herbalPharmacy"
    },
    {
      id: 6, 
      imageSrc: "/images/clinic/waiting-area.jpg",
      translationKey: "waitingArea"
    },
    {
      id: 7,
      imageSrc: "/images/clinic/clinic-exterior.jpg",
      translationKey: "clinicExterior",
      videoSrc: "/videos/clinic-tour.mp4",
      isVideo: true
    }
  ];

  const handleOpenLightbox = (item: GalleryItem) => {
    setActiveItem(item);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setActiveItem(null);
  };

  const handlePrev = () => {
    if (!activeItem) return;
    const currentIndex = galleryItems.findIndex(item => item.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    setActiveItem(galleryItems[prevIndex]);
  };

  const handleNext = () => {
    if (!activeItem) return;
    const currentIndex = galleryItems.findIndex(item => item.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    setActiveItem(galleryItems[nextIndex]);
  };

  const handleImageError = (id: number) => {
    setImageError(prev => ({ ...prev, [id]: true }));
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  const renderFallbackImage = (translationKey: string) => (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/30">
      <div className={cn("text-lg font-bold text-primary text-center p-4", fontClass)}>
        {dictionary.about.clinicGallery[translationKey]}
      </div>
    </div>
  );

  return (
    <section className="py-16 md:py-20 bg-accent/5">
      <div className="container mx-auto px-4">
        <MotionWrapper
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className={cn("text-3xl md:text-4xl font-bold text-primary mb-3", fontClass)}>
            {dictionary.about.clinicGallery.title}
          </h2>
          <p className={cn("text-lg max-w-3xl mx-auto text-text/80", fontClass)}>
            {dictionary.about.clinicGallery.subtitle}
          </p>
        </MotionWrapper>

        {/* Video Preview - 16:9 aspect ratio */}
        <div className="mb-12 max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
          <div className="relative pb-[56.25%]">
            {!videoError ? (
              <video 
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay 
                muted 
                loop 
                playsInline
                poster="/images/clinic/clinic-preview.jpg"
                onError={handleVideoError}
              >
                <source src="/videos/clinic-tour.mp4" type="video/mp4" />
                {dictionary.about.clinicGallery.videoUnsupported}
              </video>
            ) : (
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className={cn("text-2xl font-bold text-primary mb-3", fontClass)}>
                    {dictionary.about.clinicGallery.videoTitle}
                  </div>
                  <p className={cn("text-lg text-text/80", fontClass)}>
                    {dictionary.about.clinicGallery.videoDescription}
                  </p>
                </div>
              </div>
            )}
            
            <div className="absolute bottom-4 left-4 right-4 text-white bg-black/50 p-3 rounded-lg backdrop-blur-sm">
              <h3 className={cn("text-lg font-bold", fontClass)}>
                {dictionary.about.clinicGallery.videoTitle}
              </h3>
              <p className={cn("text-sm", fontClass)}>
                {dictionary.about.clinicGallery.videoDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {galleryItems.filter(item => !item.isVideo).map((item) => (
            <MotionWrapper
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item.id * 0.1 }}
            >
              <div 
                className="relative overflow-hidden rounded-xl shadow-md cursor-pointer group"
                onClick={() => handleOpenLightbox(item)}
              >
                <div className="aspect-[4/3] relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  
                  {imageError[item.id] ? (
                    renderFallbackImage(item.translationKey)
                  ) : (
                    <Image
                      src={item.imageSrc}
                      alt={dictionary.about.clinicGallery[item.translationKey]}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={() => handleImageError(item.id)}
                    />
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className={cn("text-lg font-bold", fontClass)}>
                      {dictionary.about.clinicGallery[item.translationKey]}
                    </h3>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && activeItem && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="absolute top-4 right-4 z-50">
            <button 
              onClick={handleCloseLightbox}
              className="text-white text-4xl hover:text-primary transition-colors"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          
          <div className="absolute inset-y-0 left-4 flex items-center z-30">
            <button 
              onClick={handlePrev}
              className="bg-white/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute inset-y-0 right-4 flex items-center z-30">
            <button 
              onClick={handleNext}
              className="bg-white/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="max-w-4xl max-h-[80vh] relative z-20">
            <div className="relative rounded-xl overflow-hidden">
              {imageError[activeItem.id] ? (
                <div className="bg-gradient-to-br from-primary/20 to-accent/30 aspect-[4/3] w-full max-w-4xl flex items-center justify-center">
                  <div className={cn("text-2xl font-bold text-primary text-center p-8", fontClass)}>
                    {dictionary.about.clinicGallery[activeItem.translationKey]}
                  </div>
                </div>
              ) : (
                <Image
                  src={activeItem.imageSrc}
                  alt={dictionary.about.clinicGallery[activeItem.translationKey]}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[70vh]"
                  onError={() => handleImageError(activeItem.id)}
                />
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                <h3 className={cn("text-xl font-bold", fontClass)}>
                  {dictionary.about.clinicGallery[activeItem.translationKey]}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 