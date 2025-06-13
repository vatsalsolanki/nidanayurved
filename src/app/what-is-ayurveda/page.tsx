import { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/i18n';
import AyurvedaIntro from './AyurvedaIntro';
import { notFound } from 'next/navigation';

// Define params type with proper Promise typing for Next.js 15
type Params = Promise<{ locale?: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

type Props = {
  params: Params;
  searchParams: SearchParams;
}

// Generate metadata for SEO
export async function generateMetadata({
  params
}: {
  params: Params
}): Promise<Metadata> {
  // Use default locale if not specified
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || 'en') as Locale;
  
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
  params,
  searchParams
}: Props) {
  // Use default locale if not specified
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || 'en') as Locale;
  
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