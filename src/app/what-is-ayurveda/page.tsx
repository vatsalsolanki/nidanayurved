import { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/i18n';
import AyurvedaIntro from './AyurvedaIntro';
import { notFound } from 'next/navigation';

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
      title: dictionary.ayurveda.metaTitle,
      description: dictionary.ayurveda.metaDescription,
      openGraph: {
        title: dictionary.ayurveda.metaTitle,
        description: dictionary.ayurveda.metaDescription,
        locale: locale,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: dictionary.ayurveda.metaTitle,
        description: dictionary.ayurveda.metaDescription,
      },
    };
  } catch (error) {
    return {
      title: 'What is Ayurveda? - Nidan Ayurved',
      description: 'Learn about Ayurveda, the ancient holistic healing system from India that focuses on balancing mind, body, and spirit.',
    };
  }
}

export default async function AyurvedaPage({
  params
}: {
  params: { locale?: string }
}) {
  // Use default locale if not specified
  const locale = (params.locale || 'en') as Locale;
  
  try {
    const dictionary = await getDictionary(locale);
    
    return (
      <div className="min-h-screen">
        <AyurvedaIntro dictionary={dictionary} locale={locale} />
      </div>
    );
  } catch (error) {
    notFound();
  }
} 