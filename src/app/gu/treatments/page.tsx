import { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import TreatmentsHero from '@/app/treatments/TreatmentsHero';
import TreatmentsList from '@/app/treatments/TreatmentsList';
import TreatmentsCta from '@/app/treatments/TreatmentsCta';
import dynamic from 'next/dynamic';

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = 'gu';
  
  try {
    const dictionary = await getDictionary(locale);
    
    return {
      title: dictionary.treatments.metaTitle || 'આયુર્વેદિક સારવાર - નિદાન આયુર્વેદ',
      description: dictionary.treatments.metaDescription || 'અમારી પ્રામાણિક આયુર્વેદિક સારવારોનું અન્વેષણ કરો.',
      openGraph: {
        title: dictionary.treatments.metaTitle || 'આયુર્વેદિક સારવાર - નિદાન આયુર્વેદ',
        description: dictionary.treatments.metaDescription || 'અમારી પ્રામાણિક આયુર્વેદિક સારવારોનું અન્વેષણ કરો.',
        locale: locale,
        type: 'website',
        images: [
          {
            url: '/og/treatments.jpg',
            width: 1200,
            height: 630,
            alt: dictionary.treatments.metaTitle || 'આયુર્વેદિક સારવાર'
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title: dictionary.treatments.metaTitle || 'આયુર્વેદિક સારવાર - નિદાન આયુર્વેદ',
        description: dictionary.treatments.metaDescription || 'અમારી પ્રામાણિક આયુર્વેદિક સારવારોનું અન્વેષણ કરો.',
        images: ['/og/treatments.jpg']
      },
      alternates: {
        canonical: `/${locale}/treatments`,
        languages: {
          en: '/treatments',
          hi: '/hi/treatments',
          gu: '/gu/treatments',
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata for Gujarati treatments page:', error);
    return {
      title: 'આયુર્વેદિક સારવાર - નિદાન આયુર્વેદ',
      description: 'અમારી પ્રામાણિક આયુર્વેદિક સારવારોનું અન્વેષણ કરો.',
    };
  }
}

export default async function GujaratiTreatmentsPage() {
  const locale: Locale = 'gu';
  
  try {
    const dictionary = await getDictionary(locale);
    
    // Get treatments data for Gujarati
    console.log(`Loading treatments data for Gujarati locale`);
    const treatmentsData = await import(`@/lib/treatments/${locale}.json`).then(
      (module) => module.default
    ).catch((error) => {
      // Fallback to English if Gujarati treatments not found
      console.warn(`Gujarati treatments data not found, falling back to English. Error: ${error.message}`);
      return import('@/lib/treatments/en.json').then((module) => module.default);
    });
    
    if (!treatmentsData || !Array.isArray(treatmentsData) || treatmentsData.length === 0) {
      console.error('Empty or invalid treatments data for Gujarati');
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
    console.error('Error in GujaratiTreatmentsPage:', error);
    return notFound();
  }
} 