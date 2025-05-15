import { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/i18n';
import AppointmentForm from '../../book-appointment/AppointmentForm';
import { notFound } from 'next/navigation';

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = 'gu';
  
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
      title: 'એપોઈન્ટમેન્ટ બુક કરો - નિદાન આયુર્વેદ',
      description: 'અમારા આયુર્વેદિક નિષ્ણાતો સાથે પરામર્શ અને સારવાર માટે એપોઈન્ટમેન્ટ શેડ્યૂલ કરો.',
    };
  }
}

export default async function GujaratiAppointmentPage() {
  const locale: Locale = 'gu';
  
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