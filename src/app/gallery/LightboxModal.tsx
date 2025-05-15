import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { GalleryImage } from './galleryUtils';

type LightboxModalProps = {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryImage[];
  currentImageIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  dictionary: any;
};

export function LightboxModal({
  isOpen,
  onClose,
  images,
  currentImageIndex,
  onPrevious,
  onNext,
  dictionary
}: LightboxModalProps) {
  const currentImage = images[currentImageIndex];
  const modalRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  
  // Reset error state when image changes
  useEffect(() => {
    setImageError(false);
  }, [currentImageIndex]);
  
  // Add keyboard event listeners for navigation and closing
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrevious();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext]);
  
  // Handle touch events for mobile swipe navigation
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };
    
    const handleSwipe = () => {
      // Minimum swipe distance (pixels)
      const minSwipeDistance = 50;
      const swipeDistance = touchEndX - touchStartX;
      
      if (Math.abs(swipeDistance) >= minSwipeDistance) {
        if (swipeDistance > 0) {
          // Swiped right
          onPrevious();
        } else {
          // Swiped left
          onNext();
        }
      }
    };
    
    const element = modalRef.current;
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOpen, onNext, onPrevious, modalRef]);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Don't render anything if closed
  if (!isOpen || !currentImage) return null;
  
  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={onClose}
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          aria-describedby="lightbox-description"
          style={{ 
            animation: 'fadeIn 0.3s ease-in-out'
          }}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-10 text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label={dictionary.gallery.lightboxClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Navigation buttons - larger click areas for mobile */}
          <button
            className="absolute left-0 top-0 bottom-0 w-1/5 flex items-center justify-start px-4 text-white opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            aria-label={dictionary.gallery.lightboxPrev}
          >
            <div className="bg-black/40 p-2 rounded-full md:p-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </div>
          </button>
          
          <button
            className="absolute right-0 top-0 bottom-0 w-1/5 flex items-center justify-end px-4 text-white opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label={dictionary.gallery.lightboxNext}
          >
            <div className="bg-black/40 p-2 rounded-full md:p-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </button>
          
          {/* Swipe indicator for mobile */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/30 text-white text-xs px-3 py-1 rounded-full sm:hidden">
            {dictionary.gallery.swipeToNavigate}
          </div>
          
          {/* Image content */}
          <div 
            className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center px-4"
            onClick={e => e.stopPropagation()}
          >
            <div
              key={currentImageIndex}
              className="relative w-full h-full select-none"
              style={{
                animation: 'scaleIn 0.3s ease-in-out',
                opacity: 1
              }}
            >
              <div className="relative h-full w-full flex items-center justify-center">
                {imageError ? (
                  <div className="bg-gray-900 p-8 rounded-lg text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-white text-lg">{dictionary.gallery.imageNotAvailable || "Image not available"}</p>
                  </div>
                ) : (
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="object-contain max-h-[70vh]"
                    width={1200}
                    height={800}
                    priority
                    draggable={false}
                    id="lightbox-image"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
              
              {/* Caption panel with metadata */}
              <div className="absolute bottom-0 inset-x-0 bg-black/75 backdrop-blur-sm p-4 text-white rounded-t-lg">
                <h3 className="text-xl font-medium" id="lightbox-title">{currentImage.alt}</h3>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
                  <div className="flex items-center text-sm">
                    <span className="bg-primary-500/80 text-white text-xs px-2 py-0.5 rounded mr-2">
                      {dictionary.gallery.categories[currentImage.category]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300" id="lightbox-description">
                    {currentImageIndex + 1} / {images.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pagination dots for mobile */}
          <div className="absolute bottom-28 left-0 right-0 flex justify-center gap-1.5 sm:hidden">
            {images.length > 1 && images.map((_, index) => (
              <button 
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/40'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (index !== currentImageIndex) {
                    // Set directly to this index
                    // @ts-ignore
                    setCurrentImageIndex(index);
                  }
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
} 