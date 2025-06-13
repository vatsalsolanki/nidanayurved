import { GalleryCategory } from "./galleryUtils";
import { Locale } from "@/lib/i18n";

type CategoryFilterProps = {
  categories: Array<GalleryCategory>;
  activeCategory: GalleryCategory;
  onCategoryChange: (category: GalleryCategory) => void;
  dictionary: any;
  locale: Locale;
};

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  dictionary,
  locale
}: CategoryFilterProps) {
  return (
    <div className="mb-12">
      <h2 className="text-center text-lg font-medium text-gray-700 mb-4">{dictionary.gallery.filterTitle}</h2>
      
      <div className="max-w-md mx-auto bg-gray-100 p-1.5 rounded-full flex flex-wrap justify-center shadow-sm">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className="relative flex-1 min-w-[80px] py-2 px-3 text-center text-sm font-medium transition-all duration-200 outline-none focus:ring-0"
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <div 
                  className="absolute inset-0 bg-white rounded-full shadow-sm transition-all duration-300"
                />
              )}
              <span className={`relative z-10 ${isActive ? 'text-primary-700 font-semibold' : 'text-gray-600'}`}>
                {category === 'all' && dictionary.gallery.filterAll}
                {category === 'therapies' && dictionary.gallery.filterTherapies}
                {category === 'center' && dictionary.gallery.filterCenter}
                {category === 'events' && dictionary.gallery.filterEvents}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Active category indicator */}
      {activeCategory !== 'all' && (
        <div className="mt-4 flex justify-center items-center">
          <span className="text-xs bg-gray-100 text-gray-700 py-1 px-3 rounded-full flex items-center">
            <span className="mr-1">{dictionary.gallery.activeFilter}</span>
            <span className="font-medium">
              {activeCategory === 'therapies' && dictionary.gallery.filterTherapies}
              {activeCategory === 'center' && dictionary.gallery.filterCenter}
              {activeCategory === 'events' && dictionary.gallery.filterEvents}
            </span>
            <button 
              onClick={() => onCategoryChange('all')}
              className="ml-2 text-gray-500 hover:text-gray-700"
              aria-label={dictionary.gallery.clearFilter}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          </span>
        </div>
      )}
    </div>
  );
} 