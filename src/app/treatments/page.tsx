import { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import TreatmentsHero from './TreatmentsHero';
import TreatmentsList from './TreatmentsList';
import TreatmentsCta from './TreatmentsCta';

// Generate metadata for SEO
export async function generateMetadata({
  params
}: {
  params: { locale?: string }
}): Promise<Metadata> {
  // Use default locale if not specified
  const locale = (params.locale || 'en') as Locale;
  
  try {
    const dictionary = await getDictionary(locale);
    
    return {
      title: dictionary.treatments.metaTitle,
      description: dictionary.treatments.metaDescription,
      openGraph: {
        title: dictionary.treatments.metaTitle,
        description: dictionary.treatments.metaDescription,
        locale: locale,
        type: 'website',
        images: [
          {
            url: '/og/treatments.jpg',
            width: 1200,
            height: 630,
            alt: dictionary.treatments.metaTitle
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title: dictionary.treatments.metaTitle,
        description: dictionary.treatments.metaDescription,
        images: ['/og/treatments.jpg']
      },
      alternates: {
        canonical: locale === 'en' ? '/treatments' : `/${locale}/treatments`,
        languages: {
          en: '/treatments',
          hi: '/hi/treatments',
          gu: '/gu/treatments',
        },
      },
    };
  } catch (error) {
    return {
      title: 'Ayurvedic Treatments - Nidan Ayurved',
      description: 'Explore our authentic Ayurvedic treatments for holistic healing and wellness.',
    };
  }
}

export default async function TreatmentsPage({
  params
}: {
  params: { locale?: string }
}) {
  // Use default locale if not specified
  const locale = (params.locale || 'en') as Locale;
  
  try {
    const dictionary = await getDictionary(locale);
    
    // Get treatments data for the current locale
    const treatmentsData = await import(`@/lib/treatments/${locale}.json`).then(
      (module) => module.default
    ).catch(() => {
      // Fallback to English if locale-specific treatments not found
      console.warn(`Treatments data for ${locale} not found, falling back to English`);
      return import('@/lib/treatments/en.json').then((module) => module.default);
    });
    
    if (!treatmentsData || !Array.isArray(treatmentsData) || treatmentsData.length === 0) {
      console.error('Empty or invalid treatments data');
      return notFound();
    }
    
    return (
      <main className="min-h-screen bg-background">
        <TreatmentsHero dictionary={dictionary} locale={locale} />
        <TreatmentsList 
          dictionary={dictionary} 
          locale={locale} 
          treatments={treatmentsData}
        />
        <TreatmentsCta dictionary={dictionary} locale={locale} />
      </main>
    );
  } catch (error) {
    console.error('Error in TreatmentsPage:', error);
    notFound();
  }
} 