import { NextResponse } from 'next/server';
import { Locale } from '@/lib/i18n';

interface Treatment {
  slug: string;
  title: string;
  shortDescription?: string;
  longDescription?: string;
  image?: string;
  symptoms?: string[];
  benefits?: string[];
  lifestyleTips?: string[];
  categories?: string[];
}

export async function GET() {
  try {
    const locales: Locale[] = ['en', 'hi', 'gu'];
    const treatmentsByLocale: Record<string, Treatment[]> = {};
    
    // Load all treatments for each locale
    for (const locale of locales) {
      try {
        const treatments = await import(`@/lib/treatments/${locale}.json`).then(
          (module) => module.default
        );
        
        if (Array.isArray(treatments)) {
          treatmentsByLocale[locale] = treatments;
        } else {
          console.warn(`Invalid treatments data for ${locale} (not an array)`);
          treatmentsByLocale[locale] = [];
        }
      } catch (error) {
        console.error(`Failed to load treatments for ${locale}:`, error);
        treatmentsByLocale[locale] = [];
      }
    }
    
    // Check which treatments are missing in each non-English locale
    const diagnosis: Record<string, any> = {};
    
    // Use English as the reference
    const englishTreatments = treatmentsByLocale['en'] || [];
    
    for (const locale of locales) {
      if (locale === 'en') continue; // Skip English as it's our reference
      
      const localeTreatments = treatmentsByLocale[locale] || [];
      const localeSlugs = new Set(localeTreatments.map(t => t.slug));
      
      const missingTreatments = englishTreatments
        .filter(treatment => !localeSlugs.has(treatment.slug))
        .map(treatment => ({
          slug: treatment.slug,
          title: treatment.title,
          englishDescription: treatment.shortDescription
        }));
      
      diagnosis[locale] = {
        count: localeTreatments.length,
        missingCount: missingTreatments.length,
        missingTreatments,
        isComplete: missingTreatments.length === 0
      };
    }
    
    // Check for treatments in non-English locales that aren't in English
    const unexpectedTreatments: Record<string, any[]> = {};
    
    for (const locale of locales) {
      if (locale === 'en') continue;
      
      const localeTreatments = treatmentsByLocale[locale] || [];
      const englishSlugs = new Set(englishTreatments.map(t => t.slug));
      
      const extraTreatments = localeTreatments
        .filter(treatment => !englishSlugs.has(treatment.slug))
        .map(treatment => ({
          slug: treatment.slug,
          title: treatment.title
        }));
      
      if (extraTreatments.length > 0) {
        unexpectedTreatments[locale] = extraTreatments;
      }
    }
    
    return NextResponse.json({
      englishCount: englishTreatments.length,
      diagnosis,
      unexpectedTreatments: Object.keys(unexpectedTreatments).length > 0 ? unexpectedTreatments : null,
      allSlugsInEnglish: englishTreatments.map(t => t.slug)
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: `Failed to diagnose treatments: ${(error as Error).message}`,
        stack: (error as Error).stack 
      },
      { status: 500 }
    );
  }
} 