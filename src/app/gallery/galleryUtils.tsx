export type GalleryCategory = 'all' | 'therapies' | 'center' | 'events';

export type GalleryImage = {
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, 'all'>;
  key: string;
};

// This function generates the gallery image objects based on static mapping
// In a real application, you might use a file system or API to get these paths
export function getGalleryImages(dictionary: any): GalleryImage[] {
  // The actual file names from our gallery folders
  const imageData = [
    // Therapies category
    { src: '/gallery/therapies/panchakarma.jpg', key: 'panchakarma', category: 'therapies' as const },
    { src: '/gallery/therapies/abhyanga.jpg', key: 'abhyanga', category: 'therapies' as const },
    { src: '/gallery/therapies/shirodhara.jpg', key: 'shirodhara', category: 'therapies' as const },
    
    // Center category
    { src: '/gallery/center/reception.jpg', key: 'reception', category: 'center' as const },
    { src: '/gallery/center/consultation-room.jpg', key: 'consultationRoom', category: 'center' as const },
    { src: '/gallery/center/herbal-pharmacy.jpg', key: 'herbalPharmacy', category: 'center' as const },
    
    // Events category
    { src: '/gallery/events/workshop.jpg', key: 'workshop', category: 'events' as const },
    { src: '/gallery/events/ayurveda-awareness.jpg', key: 'ayurvedaAwareness', category: 'events' as const },
    { src: '/gallery/events/community-program.jpg', key: 'communityProgram', category: 'events' as const },
  ];
  
  // Map to full objects with alt text from dictionary
  return imageData.map(image => ({
    ...image,
    alt: dictionary.gallery.imageAlt[image.key] || formatImageName(image.key)
  }));
}

// Format an image key into a readable title (e.g., "herbal-pharmacy" -> "Herbal Pharmacy")
export function formatImageName(key: string): string {
  return key
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Filter gallery images by category
export function filterImagesByCategory(images: GalleryImage[], category: GalleryCategory): GalleryImage[] {
  if (category === 'all') {
    return images;
  }
  
  return images.filter(image => image.category === category);
} 