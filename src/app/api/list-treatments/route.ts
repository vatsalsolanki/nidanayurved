import { NextResponse } from 'next/server';
import { Locale } from '@/lib/i18n';

interface Treatment {
  slug: string;
  title: string;
  shortDescription?: string;
  image?: string;
  categories?: string[];
}

export async function GET() {
  try {
    const locales: Locale[] = ['en', 'hi', 'gu'];
    const result: Record<string, any> = {};
    
    // Load all treatments for each locale
    for (const locale of locales) {
      try {
        const treatments = await import(`@/lib/treatments/${locale}.json`).then(
          (module) => module.default
        );
        
        if (Array.isArray(treatments)) {
          result[locale] = {
            count: treatments.length,
            treatments: treatments.map((t: Treatment) => ({
              slug: t.slug,
              title: t.title,
              hasImage: !!t.image
            }))
          };
        } else {
          result[locale] = { error: 'Invalid treatments data (not an array)' };
        }
      } catch (error) {
        result[locale] = { 
          error: `Failed to load treatments: ${(error as Error).message}`,
          stack: (error as Error).stack
        };
      }
    }
    
    // Cross-check if all treatments exist in all locales
    const allSlugs = new Set<string>();
    
    // Collect all slugs across all locales
    for (const locale of locales) {
      if (result[locale]?.treatments) {
        for (const treatment of result[locale].treatments) {
          allSlugs.add(treatment.slug);
        }
      }
    }
    
    // Check which treatments are missing in each locale
    const coverage: Record<string, Record<string, boolean>> = {};
    
    for (const slug of allSlugs) {
      coverage[slug] = {};
      
      for (const locale of locales) {
        if (result[locale]?.treatments) {
          coverage[slug][locale] = result[locale].treatments.some(
            (t: any) => t.slug === slug
          );
        } else {
          coverage[slug][locale] = false;
        }
      }
    }
    
    // Get detailed information about missing treatments
    const missingTreatments = Object.entries(coverage)
      .filter(([_, localePresence]) => Object.values(localePresence).some(present => !present))
      .map(([slug, localePresence]) => {
        const missingIn = Object.entries(localePresence)
          .filter(([_, present]) => !present)
          .map(([locale]) => locale);
          
        const presentIn = Object.entries(localePresence)
          .filter(([_, present]) => present)
          .map(([locale]) => locale);
          
        // Get the title from a locale where it exists
        let title = "Unknown";
        for (const locale of presentIn) {
          const treatmentInLocale = result[locale]?.treatments?.find((t: any) => t.slug === slug);
          if (treatmentInLocale?.title) {
            title = treatmentInLocale.title;
            break;
          }
        }
        
        return {
          slug,
          title,
          missingIn,
          presentIn
        };
      });
    
    return NextResponse.json({
      localeInfo: result,
      coverage,
      missingTreatments,
      allSlugs: Array.from(allSlugs),
      totalUniqueCount: allSlugs.size,
      completeCoverage: missingTreatments.length === 0
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: `Failed to analyze treatments: ${(error as Error).message}`,
        stack: (error as Error).stack 
      },
      { status: 500 }
    );
  }
} 