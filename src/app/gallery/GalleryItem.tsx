import { useState } from 'react';
import Image from 'next/image';
import { GalleryImage } from './galleryUtils';

type GalleryItemProps = {
  image: GalleryImage;
  onClick: () => void;
  expandText: string;
  categoryLabel: string;
};

export function GalleryItem({ image, onClick, expandText, categoryLabel }: GalleryItemProps) {
  const [isImageError, setIsImageError] = useState(false);
  
  return (
    <figure 
      className="relative overflow-hidden rounded-lg shadow-md bg-white hover:scale-[1.02] transition-transform duration-300 cursor-pointer" 
      onClick={onClick}
    >
      <div className="aspect-square relative">
        {isImageError ? (
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
            title={image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-[1.08]"
            loading="lazy"
            onError={() => setIsImageError(true)}
          />
        )}
        
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-primary-600/90 text-white text-xs px-2 py-1 rounded-full">
          {categoryLabel}
        </span>
        
        {/* Overlay with caption */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <span className="text-sm font-light">{expandText}</span>
          </div>
          <h3 className="font-medium text-lg">{image.alt}</h3>
        </div>
      </div>
    </figure>
  );
} 