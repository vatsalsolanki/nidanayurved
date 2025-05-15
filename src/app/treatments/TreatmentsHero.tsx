'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Locale } from '@/lib/i18n';

interface TreatmentsHeroProps {
  dictionary: any;
  locale: Locale;
}

// Define treatment categories with translations
export const treatmentCategories = {
  panchakarma: {
    en: 'Panchakarma',
    hi: 'पंचकर्म',
    gu: 'પંચકર્મ',
  },
  detoxification: {
    en: 'Detoxification',
    hi: 'डिटॉक्स',
    gu: 'ડિટોક્સિફિકેશન',
  },
  rejuvenation: {
    en: 'Rejuvenation',
    hi: 'कायाकल्प',
    gu: 'પુનર્જીવન',
  },
  painManagement: {
    en: 'Pain Management',
    hi: 'दर्द प्रबंधन',
    gu: 'પીડા નિયંત્રણ',
  },
  stressRelief: {
    en: 'Stress Relief',
    hi: 'तनाव राहत',
    gu: 'તણાવમાં રાહત',
  },
  digestiveHealth: {
    en: 'Digestive Health',
    hi: 'पाचन स्वास्थ्य',
    gu: 'પાચન આરોગ્ય',
  },
  skinCare: {
    en: 'Skin Care',
    hi: 'त्वचा देखभाल',
    gu: 'ત્વચાની સંભાળ',
  },
  immunityBoost: {
    en: 'Immunity Boost',
    hi: 'प्रतिरक्षा बढ़ाना',
    gu: 'રોગપ્રતિકારકતા વધારવી',
  },
  womensWellness: {
    en: "Women's Wellness",
    hi: 'महिलाओं का स्वास्थ्य',
    gu: 'મહિલાઓની કલ્યાણ',
  },
  lifestyleDisorders: {
    en: 'Lifestyle Disorders',
    hi: 'जीवनशैली विकार',
    gu: 'જીવનશૈલીના વિકાર',
  },
};

export type CategoryKey = keyof typeof treatmentCategories;

export default function TreatmentsHero({ dictionary, locale }: TreatmentsHeroProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<CategoryKey[]>([]);
  const [showClearButton, setShowClearButton] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  // Title and description content for each language
  const content = {
    en: {
      title: 'Authentic Ayurvedic Treatments',
      description: 'Explore our comprehensive range of traditional Ayurvedic therapies designed to heal, detoxify, and rejuvenate naturally.',
    },
    hi: {
      title: 'प्रामाणिक आयुर्वेदिक उपचार',
      description: 'पारंपरिक आयुर्वेदिक चिकित्सा की हमारी व्यापक श्रृंखला का अन्वेषण करें, जो प्राकृतिक रूप से उपचार, विषहरण और कायाकल्प के लिए डिज़ाइन की गई है।',
    },
    gu: {
      title: 'અધિકૃત આયુર્વેદિક સારવાર',
      description: 'આપ વ્યાપક પરંપરાગત આયુર્વેદિક સારવારોની શ્રેણી શોધો જે પ્રાકૃતિક રીતે સારવાર, ડિટોક્સ અને પુનર્જીવિત કરવા માટે રચાયેલ છે.',
    },
  };

  // Search event dispatcher
  const dispatchSearchEvent = useCallback((query: string) => {
    console.log('Dispatching search event with query:', query);
    
    // Store in sessionStorage for persistence
    if (query) {
      sessionStorage.setItem('treatmentsSearchQuery', query);
    } else {
      sessionStorage.removeItem('treatmentsSearchQuery');
    }
    
    // Use setTimeout to break the direct update cycle
    setTimeout(() => {
      // Create and dispatch the event
      const event = new CustomEvent('treatmentsSearch', { detail: query });
      window.dispatchEvent(event);
    }, 0);
  }, []);

  // Category filter event dispatcher
  const dispatchCategoryEvent = useCallback((categories: CategoryKey[]) => {
    console.log('Dispatching category filter event with categories:', categories);
    
    // Use setTimeout to break the direct update cycle
    setTimeout(() => {
      // Create and dispatch the event
      const event = new CustomEvent('treatmentsCategoryFilter', { 
        detail: { categories }
      });
      window.dispatchEvent(event);
    }, 0);
  }, []);

  // Handle search input change
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowClearButton(!!query);
    
    // Dispatch the search event
    dispatchSearchEvent(query);
  }, [dispatchSearchEvent]);

  // Clear search
  const clearSearch = useCallback(() => {
    console.log('Clearing search in TreatmentsHero');
    setSearchQuery('');
    setShowClearButton(false);
    
    // Dispatch empty search event
    dispatchSearchEvent('');
  }, [dispatchSearchEvent]);

  // Handle category selection/deselection
  const handleCategoryClick = useCallback((category: CategoryKey) => {
    console.log('Category clicked:', category);
    
    // Toggle the category in the array
    setSelectedCategories(prev => {
      const isSelected = prev.includes(category);
      
      // Create new array of categories
      const newCategories = isSelected
        ? prev.filter(c => c !== category) // Remove if already selected
        : [...prev, category];             // Add if not selected
      
      console.log('New categories after toggle:', newCategories);
      
      // Schedule dispatch after state update is complete
      setTimeout(() => {
        // Dispatch the category filter event
        dispatchCategoryEvent(newCategories);
      }, 0);
      
      return newCategories;
    });
  }, [dispatchCategoryEvent]);
  
  // Clear all category filters
  const clearAllFilters = useCallback(() => {
    console.log('Clearing all category filters from TreatmentsHero');
    setSelectedCategories([]);
    
    // Clear search as well for complete reset
    setSearchQuery('');
    setShowClearButton(false);
    sessionStorage.removeItem('treatmentsSearchQuery');
    
    // Dispatch events to reset both search and categories
    dispatchSearchEvent('');
    dispatchCategoryEvent([]);
    
    // Also dispatch a clear filters event to ensure both components are in sync
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('treatmentsClearFilters'));
    }, 0);
  }, [dispatchCategoryEvent, dispatchSearchEvent]);

  // Handle clear filters event from TreatmentsList
  useEffect(() => {
    const handleClearFilters = () => {
      setSearchQuery('');
      setSelectedCategories([]);
      setShowClearButton(false);
      sessionStorage.removeItem('treatmentsSearchQuery');
      console.log('Received clear filters event in TreatmentsHero');
    };
    
    // Listen for clear filters event
    window.addEventListener('treatmentsClearFilters', handleClearFilters);
    
    // Listen for category filter events to stay in sync
    const handleCategoryEvent = (event: Event) => {
      try {
        const customEvent = event as CustomEvent;
        if (customEvent.detail && Array.isArray(customEvent.detail.categories)) {
          console.log('Received categories from event in Hero:', customEvent.detail.categories);
          setSelectedCategories(customEvent.detail.categories);
        }
      } catch (error) {
        console.error('Error handling category event in Hero:', error);
      }
    };
    
    window.addEventListener('treatmentsCategoryFilter', handleCategoryEvent);
    
    // Load saved search query on mount
    const savedQuery = sessionStorage.getItem('treatmentsSearchQuery');
    if (savedQuery) {
      console.log('Loading saved search query in Hero:', savedQuery);
      setSearchQuery(savedQuery);
      setShowClearButton(!!savedQuery);
    }
    
    // For debugging
    console.log('TreatmentsHero event listeners set up');
    
    return () => {
      window.removeEventListener('treatmentsClearFilters', handleClearFilters);
      window.removeEventListener('treatmentsCategoryFilter', handleCategoryEvent);
    };
  }, []);

  return (
    <section className="relative pt-8 pb-0 md:pt-10 bg-background">
      {/* Background pattern with herbal illustrations */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/patterns/herbal-pattern.png')] bg-repeat opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="opacity-100 transition-opacity duration-500">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-primary">
              {content[locale].title}
            </h1>
            
            <p className="text-base md:text-lg mb-5 md:mb-6 text-text/80 mx-auto max-w-3xl">
              {content[locale].description}
            </p>
            
            {/* Search bar */}
            <div className="max-w-2xl mx-auto relative mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/60" />
                <input
                  type="text"
                  placeholder={dictionary.treatments.searchPlaceholder || "Search treatments..."}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                  aria-label="Search treatments"
                />
                {showClearButton && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <button 
                      onClick={clearSearch}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Filter toggle button */}
          <div className="mb-4">
            <button 
              onClick={() => {
                // Toggle filters visibility
                setFiltersVisible(!filtersVisible);
                console.log('Filter visibility toggled:', !filtersVisible);
              }}
              className={`flex items-center justify-center gap-2 mx-auto px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all
                ${selectedCategories.length > 0 
                  ? 'bg-primary text-white border border-primary' 
                  : 'bg-white text-primary border border-gray-200 hover:bg-gray-50'}`}
              aria-expanded={filtersVisible}
              aria-controls="filter-categories"
            >
              <Filter className="h-4 w-4" />
              <span>{dictionary.treatments.filterByCategory || "Filter by Category"}</span>
              {selectedCategories.length > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 ml-1 bg-white text-primary text-xs font-medium rounded-full">
                  {selectedCategories.length}
                </span>
              )}
              {filtersVisible ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
          
          {/* Filter categories - displayed conditionally based on toggle state */}
          <div
            id="filter-categories"
            className={`bg-white border border-gray-200 rounded-xl shadow-sm mb-6 overflow-hidden transition-all duration-300 ${filtersVisible ? 'block' : 'hidden'}`}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h2 className="text-sm font-medium text-text/90 flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary/70" />
                {dictionary.treatments.filterByCategory || "Filter by Category:"}
              </h2>
              
              {selectedCategories.length > 0 && (
                <button 
                  onClick={clearAllFilters}
                  className="px-3 py-1.5 rounded-md text-xs font-medium transition-all bg-gray-50 text-gray-600 hover:bg-gray-100 flex items-center gap-1.5 border border-gray-200"
                  aria-label="Clear all filters"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>{dictionary.treatments.clearFilters || "Clear all filters"}</span>
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-3 sm:p-4">
              {Object.entries(treatmentCategories).map(([key, labels]) => {
                const isSelected = selectedCategories.includes(key as CategoryKey);
                return (
                  <button
                    key={key}
                    onClick={() => handleCategoryClick(key as CategoryKey)}
                    className={`relative min-h-[42px] px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 overflow-hidden w-full
                      ${isSelected
                        ? 'bg-primary text-white shadow-sm ring-2 ring-primary/50' 
                        : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-primary/30 hover:shadow-sm'}`}
                    aria-pressed={isSelected}
                    role="checkbox"
                    aria-checked={isSelected}
                    data-category={key}
                  >
                    {isSelected && (
                      <div
                        className="absolute inset-0 bg-primary opacity-10"
                      />
                    )}
                    <span className="filter-icon text-lg relative flex-shrink-0" aria-hidden="true">
                      {key === 'rejuvenation' && '🧘'}
                      {key === 'painManagement' && '🔥'}
                      {key === 'detoxification' && '🌿'}
                      {key === 'skinCare' && '🧴'}
                      {key === 'immunityBoost' && '💪'}
                      {key === 'digestiveHealth' && '🍃'}
                      {key === 'stressRelief' && '😌'}
                      {key === 'panchakarma' && '♨️'}
                      {key === 'womensWellness' && '👩'}
                      {key === 'lifestyleDisorders' && '⚖️'}
                    </span>
                    <span className="z-10 relative whitespace-normal break-words leading-tight text-left text-xs sm:text-sm">{labels[locale]}</span>
                    {isSelected && (
                      <span 
                        className="absolute top-1.5 right-1.5 w-2 h-2 bg-white rounded-full shadow-sm z-10"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 