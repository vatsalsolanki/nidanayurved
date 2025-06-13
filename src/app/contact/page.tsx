import { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import ContactFormWrapper from './ContactFormWrapper';
import SimpleContactForm from './SimpleContactForm';

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
      title: dictionary.contact.metaTitle,
      description: dictionary.contact.metaDescription,
      openGraph: {
        title: dictionary.contact.metaTitle,
        description: dictionary.contact.metaDescription,
        locale: locale,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: dictionary.contact.metaTitle,
        description: dictionary.contact.metaDescription,
      },
    };
  } catch (error) {
    return {
      title: 'Contact Us - Nidan Ayurved',
      description: 'Get in touch with our Ayurvedic experts for consultations, appointments, or any inquiries about our treatments.',
    };
  }
}

export default async function ContactPage({
  params = { locale: 'en' } as unknown as Params,
  searchParams
}: Props) {
  // Use default locale if not specified
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || 'en') as Locale;
  
  try {
    const dictionary = await getDictionary(locale);
    
    return (
      <div className="min-h-screen py-16 md:py-24 bg-gradient-to-b from-accent/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-primary mb-6">
              {dictionary.contact.title}
            </h1>
            <p className="text-lg text-center text-text/80 mb-12 max-w-2xl mx-auto">
              {dictionary.contact.subtitle}
            </p>
            
            {/* Client component wrapper for form with error boundary */}
            <div className="contact-form-container relative">
              <ContactFormWrapper 
                dictionaryData={JSON.stringify(dictionary)} 
                locale={locale} 
              />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in Contact Page:', error);
    // Fallback content if getDictionary fails
    return (
      <div className="min-h-screen py-16 md:py-24 bg-gradient-to-b from-accent/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-primary mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-center text-text/80 mb-12 max-w-2xl mx-auto">
              We'd love to hear from you. Feel free to reach out with any questions about our Ayurvedic treatments or to schedule a consultation.
            </p>
            
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
              <SimpleContactForm 
                dictionary={{
                  contact: {
                    title: 'Contact Us',
                    thankYou: 'Thank You!',
                    successMessage: 'Your message has been received. We will get back to you shortly.'
                  }
                }} 
                locale="en" 
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
} 