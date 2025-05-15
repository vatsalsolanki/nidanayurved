import { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import TreatmentsHero from '@/app/treatments/TreatmentsHero';
import TreatmentsList from '@/app/treatments/TreatmentsList';
import TreatmentsCta from '@/app/treatments/TreatmentsCta';
import dynamic from 'next/dynamic';

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = 'hi';
  
  try {
    const dictionary = await getDictionary(locale);
    
    return {
      title: dictionary.treatments.metaTitle || 'आयुर्वेदिक उपचार - निदान आयुर्वेद',
      description: dictionary.treatments.metaDescription || 'हमारे प्रामाणिक आयुर्वेदिक उपचारों का अन्वेषण करें।',
      openGraph: {
        title: dictionary.treatments.metaTitle || 'आयुर्वेदिक उपचार - निदान आयुर्वेद',
        description: dictionary.treatments.metaDescription || 'हमारे प्रामाणिक आयुर्वेदिक उपचारों का अन्वेषण करें।',
        locale: locale,
        type: 'website',
        images: [
          {
            url: '/og/treatments.jpg',
            width: 1200,
            height: 630,
            alt: dictionary.treatments.metaTitle || 'आयुर्वेदिक उपचार'
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title: dictionary.treatments.metaTitle || 'आयुर्वेदिक उपचार - निदान आयुर्वेद',
        description: dictionary.treatments.metaDescription || 'हमारे प्रामाणिक आयुर्वेदिक उपचारों का अन्वेषण करें।',
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
    console.error('Error generating metadata for Hindi treatments page:', error);
    return {
      title: 'आयुर्वेदिक उपचार - निदान आयुर्वेद',
      description: 'हमारे प्रामाणिक आयुर्वेदिक उपचारों का अन्वेषण करें।',
    };
  }
}

export default async function HindiTreatmentsPage() {
  const locale: Locale = 'hi';
  
  try {
    const dictionary = await getDictionary(locale);
    
    // Get treatments data for Hindi
    console.log(`Loading treatments data for Hindi locale`);
    const treatmentsData = await import(`@/lib/treatments/${locale}.json`).then(
      (module) => module.default
    ).catch((error) => {
      // Fallback to English if Hindi treatments not found
      console.warn(`Hindi treatments data not found, falling back to English. Error: ${error.message}`);
      return import('@/lib/treatments/en.json').then((module) => module.default);
    });
    
    if (!treatmentsData || !Array.isArray(treatmentsData) || treatmentsData.length === 0) {
      console.error('Empty or invalid treatments data for Hindi');
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
    console.error('Error in HindiTreatmentsPage:', error);
    return notFound();
  }
} 