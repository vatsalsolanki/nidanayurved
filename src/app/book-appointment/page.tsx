import { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/i18n';
import AppointmentForm from './AppointmentForm';
import { notFound } from 'next/navigation';

// Define params type with proper Promise typing for Next.js 15
type Params = Promise<{ locale?: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

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
      title: dictionary.appointment.metaTitle,
      description: dictionary.appointment.metaDescription,
      openGraph: {
        title: dictionary.appointment.metaTitle,
        description: dictionary.appointment.metaDescription,
        locale: locale,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: dictionary.appointment.metaTitle,
        description: dictionary.appointment.metaDescription,
      },
    };
  } catch (error) {
    return {
      title: 'Book Appointment - Nidan Ayurved',
      description: 'Schedule an appointment with our Ayurvedic experts for consultations and treatments.',
    };
  }
}

type Props = {
  params: Params;
  searchParams: SearchParams;
}

export default async function AppointmentPage({
  params,
  searchParams
}: Props) {
  // Use default locale if not specified
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || 'en') as Locale;
  
  try {
    const dictionary = await getDictionary(locale);
    
    return (
      <div className="min-h-screen py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-primary mb-6">
              {dictionary.appointment.title}
            </h1>
            <p className="text-lg text-center text-text/80 mb-12 max-w-2xl mx-auto">
              {dictionary.appointment.subtitle}
            </p>
            
            <AppointmentForm dictionary={dictionary} locale={locale} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
} 