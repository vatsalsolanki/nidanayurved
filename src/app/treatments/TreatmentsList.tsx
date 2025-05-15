'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/lib/i18n';
import { getLocalizedPath } from '@/lib/utils';
import { CategoryKey, treatmentCategories } from './TreatmentsHero';
import { Search, X } from 'lucide-react';

interface Treatment {
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
  categories?: string[]; // Array of category keys
}

interface TreatmentsListProps {
  dictionary: any;
  locale: Locale;
  treatments: Treatment[];
}

export default function TreatmentsList({
  dictionary,
  locale,
  treatments
}: TreatmentsListProps) {
  // State for all treatments and filtered treatments
  const [allTreatments, setAllTreatments] = useState<Treatment[]>(treatments);
  const [filteredTreatments, setFilteredTreatments] = useState<Treatment[]>(treatments);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<CategoryKey[]>([]);
  
  // Pagination state - initially show 6 treatments
  const [visibleCount, setVisibleCount] = useState(6);
  
  // Track counts for UI display
  const totalTreatmentsCount = useMemo(() => allTreatments.length, [allTreatments]);
  const filteredTreatmentsCount = useMemo(() => filteredTreatments.length, [filteredTreatments]);
  
  // Function to determine if filtering is active
  const isFilteringActive = useCallback(() => {
    return searchQuery !== '' || selectedCategories.length > 0;
  }, [searchQuery, selectedCategories]);
  
  // Reset visible count when filters change
  useEffect(() => {
    // When filters change, reset to show first 6 items
    setVisibleCount(6);
  }, [searchQuery, selectedCategories]);
  
  // Update allTreatments when treatments prop changes
  useEffect(() => {
    if (treatments.length > 0) {
      setAllTreatments(treatments);
      
      // If no filters are applied, also update filtered treatments
      if (!isFilteringActive()) {
        setFilteredTreatments(treatments);
      } else {
        // If filters are active, reapply them with the new data
        filterTreatments(treatments, searchQuery, selectedCategories);
      }
    }
  }, [treatments]);
  
  // Function to handle showing more treatments
  const handleShowMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + 6, filteredTreatments.length));
  }, [filteredTreatments.length]);
  
  // Main filtering function
  const filterTreatments = useCallback((
    treatmentsToFilter = allTreatments,
    query = searchQuery,
    categories = selectedCategories
  ) => {
    console.log('Filtering treatments with:', {
      query,
      categories: categories.join(', '),
      treatmentsCount: treatmentsToFilter.length
    });
    
    // If no filters, show all treatments
    if (!query && categories.length === 0) {
      console.log('No filters applied, showing all treatments');
      setFilteredTreatments(treatmentsToFilter);
      return;
    }
    
    // Start with all treatments
    let filtered = [...treatmentsToFilter];
    
    // Apply search query filter
    if (query) {
      const queryLower = query.toLowerCase().trim();
      filtered = filtered.filter(treatment => 
        treatment.title.toLowerCase().includes(queryLower) || 
        treatment.shortDescription.toLowerCase().includes(queryLower)
      );
      console.log('After search filter:', filtered.length);
    }
    
    // Apply category filter
    if (categories.length > 0) {
      filtered = filtered.filter(treatment => {
        if (!treatment.categories || !Array.isArray(treatment.categories)) {
          return false;
        }
        
        // Check if any selected category matches any treatment category
        return treatment.categories.some(category => 
          categories.includes(category as CategoryKey)
        );
      });
      console.log('After category filter:', filtered.length);
    }
    
    console.log('Final filtered treatments:', filtered.length, 'out of total:', treatmentsToFilter.length);
    setFilteredTreatments(filtered);
  }, [allTreatments, searchQuery, selectedCategories]);
  
  // Handle search event from TreatmentsHero
  const handleSearchEvent = useCallback((event: Event) => {
    const query = (event as CustomEvent).detail;
    console.log('Search event received in TreatmentsList:', query);
    setSearchQuery(query);
    filterTreatments(allTreatments, query, selectedCategories);
  }, [allTreatments, selectedCategories, filterTreatments]);
  
  // Handle category filter event from TreatmentsHero
  const handleCategoryEvent = useCallback((event: Event) => {
    try {
      const customEvent = event as CustomEvent;
      if (!customEvent.detail) return;
      
      const { categories } = customEvent.detail;
      
      if (Array.isArray(categories)) {
        console.log('Category event received in TreatmentsList:', categories);
        setSelectedCategories(categories);
        filterTreatments(allTreatments, searchQuery, categories);
      }
    } catch (error) {
      console.error('Error handling category event in TreatmentsList:', error);
    }
  }, [allTreatments, searchQuery, filterTreatments]);
  
  // Handle clear filters event
  const handleClearEvent = useCallback(() => {
    console.log('Clear filters event received in TreatmentsList');
    setSearchQuery('');
    setSelectedCategories([]);
    setFilteredTreatments(allTreatments);
    setVisibleCount(6);
  }, [allTreatments]);
  
  // Clear all filters from the list component
  const handleClearFilters = useCallback(() => {
    console.log('Clearing all filters from TreatmentsList');
    setSearchQuery('');
    setSelectedCategories([]);
    setFilteredTreatments(allTreatments);
    setVisibleCount(6);
    
    // Notify the Hero component with setTimeout to avoid render cycle conflicts
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('treatmentsClearFilters'));
    }, 0);
  }, [allTreatments]);
  
  // Add category from badge click
  const handleAddCategory = useCallback((category: string) => {
    // Check if category is already selected
    if (selectedCategories.includes(category as CategoryKey)) {
      return;
    }
    
    const newCategories = [...selectedCategories, category as CategoryKey];
    console.log('Adding category from badge click:', category);
    
    setSelectedCategories(newCategories);
    
    // Apply filters with the new category
    filterTreatments(allTreatments, searchQuery, newCategories);
    
    // Sync with Hero component with setTimeout to avoid render cycle conflicts
    setTimeout(() => {
      const event = new CustomEvent('treatmentsCategoryFilter', {
        detail: { categories: newCategories }
      });
      window.dispatchEvent(event);
    }, 0);
  }, [allTreatments, filterTreatments, searchQuery, selectedCategories]);
  
  // Remove category from filter tags
  const handleRemoveCategory = useCallback((categoryToRemove: CategoryKey) => {
    const newCategories = selectedCategories.filter(c => c !== categoryToRemove);
    console.log('Removing category filter:', categoryToRemove);
    
    setSelectedCategories(newCategories);
    
    // Apply filters without the removed category
    filterTreatments(allTreatments, searchQuery, newCategories);
    
    // Sync with Hero component with setTimeout to avoid render cycle conflicts
    setTimeout(() => {
      const event = new CustomEvent('treatmentsCategoryFilter', {
        detail: { categories: newCategories }
      });
      window.dispatchEvent(event);
    }, 0);
  }, [allTreatments, filterTreatments, searchQuery, selectedCategories]);
  
  // Set up event listeners
  useEffect(() => {
    console.log('Setting up event listeners in TreatmentsList');
    
    window.addEventListener('treatmentsSearch', handleSearchEvent);
    window.addEventListener('treatmentsCategoryFilter', handleCategoryEvent);
    window.addEventListener('treatmentsClearFilters', handleClearEvent);
    
    // Check for saved search query
    const savedQuery = sessionStorage.getItem('treatmentsSearchQuery');
    if (savedQuery) {
      console.log('Loading saved search query:', savedQuery);
      setSearchQuery(savedQuery);
      filterTreatments(allTreatments, savedQuery, selectedCategories);
    }
    
    return () => {
      window.removeEventListener('treatmentsSearch', handleSearchEvent);
      window.removeEventListener('treatmentsCategoryFilter', handleCategoryEvent);
      window.removeEventListener('treatmentsClearFilters', handleClearEvent);
    };
  }, [allTreatments, filterTreatments, handleCategoryEvent, handleClearEvent, handleSearchEvent, selectedCategories]);
  
  return (
    <section className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Treatment count display */}
        <div className="mb-8 text-center">
          <p className="text-sm text-gray-500">
            {dictionary.treatments.showingResults || "Showing"}{' '}
            <span className="font-medium text-primary">
              {Math.min(visibleCount, filteredTreatmentsCount)}
            </span>{' '}
            {dictionary.treatments.outOf || "out of"}{' '}
            <span className="font-medium">
              {filteredTreatmentsCount}
            </span>{' '}
            {isFilteringActive() ? (
              <>
                {dictionary.treatments.filteredTreatments || "filtered treatments"}{' '}
                <span className="text-xs text-gray-400">
                  ({dictionary.treatments.totalOf || "total of"} {totalTreatmentsCount})
                </span>
              </>
            ) : (
              <>{dictionary.treatments.treatments || "treatments"}</>
            )}
          </p>
        </div>

        {/* Active filters display */}
        {selectedCategories.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-gray-500">
              {dictionary.treatments.activeFilters || "Active filters:"}
            </span>
            {selectedCategories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
              >
                {treatmentCategories[category][locale]}
                <button
                  onClick={() => handleRemoveCategory(category)}
                  className="ml-1.5 text-primary/70 hover:text-primary"
                  aria-label={`Remove ${treatmentCategories[category][locale]} filter`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
            <button
              onClick={handleClearFilters}
              className="text-sm text-gray-500 hover:text-primary underline"
            >
              {dictionary.treatments.clearAllFilters || "Clear all"}
            </button>
          </div>
        )}

        {/* Treatment cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredTreatments.slice(0, visibleCount).map((treatment) => (
            <div 
              key={treatment.slug}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-primary/20 h-full flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <Image
                  src={treatment.image || `/images/treatments/${treatment.slug}.jpg`}
                  alt={treatment.title}
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Categories badges */}
                {treatment.categories && treatment.categories.length > 0 && (
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                    {treatment.categories.slice(0, 2).map((category) => (
                      <span 
                        key={category} 
                        className="px-2 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full text-primary shadow-sm border border-primary/10 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddCategory(category);
                        }}
                      >
                        {treatmentCategories[category as CategoryKey]?.[locale] || category}
                      </span>
                    ))}
                    {treatment.categories.length > 2 && (
                      <span className="px-2 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full text-gray-700 shadow-sm">
                        +{treatment.categories.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col flex-grow p-5">
                <h3 className="text-lg font-medium text-primary mb-2">
                  {treatment.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 flex-grow">
                  {treatment.shortDescription}
                </p>
                
                <Link
                  href={getLocalizedPath(`/treatments/${treatment.slug}`, locale)}
                  className="inline-flex items-center justify-center px-4 py-2 bg-background border border-primary/20 rounded-lg text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
                >
                  {dictionary.treatments.learnMore || "Learn more"}
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Show More button */}
        {visibleCount < filteredTreatmentsCount && (
          <div className="mt-8 text-center">
            <button
              onClick={handleShowMore}
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              {dictionary.treatments.showMore || "Show More"} 
              <span className="ml-2 text-xs">
                ({filteredTreatmentsCount - visibleCount} {dictionary.treatments.more || "more"})
              </span>
            </button>
          </div>
        )}
        
        {/* No results message */}
        {filteredTreatmentsCount === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {dictionary.treatments.noResultsFound || "No matching treatments found"}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {dictionary.treatments.tryAdjustingFilters || "Try adjusting your search or filter criteria to find what you're looking for."}
            </p>
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              <X className="mr-2 h-4 w-4" aria-hidden="true" />
              {dictionary.treatments.clearAllFilters || "Clear all filters"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
} 