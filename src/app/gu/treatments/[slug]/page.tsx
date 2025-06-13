import { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import TreatmentPage from '@/app/treatments/treatmentdetails/TreatmentPage';
import Script from 'next/script';

// Define params type with proper Promise typing for Next.js 15
type ParamsType = Promise<{ slug: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

// Define props type with proper Promise awaiting
type Props = {
  params: ParamsType;
  searchParams: SearchParams;
}

export async function generateMetadata({ params }: { params: ParamsType }): Promise<Metadata> {
  const locale: Locale = 'gu';
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Strip .jpg extension if present in the slug
  const cleanSlug = slug?.replace(/\.jpg$/, '') || '';
  
  try {
    const dictionary = await getDictionary(locale);
    
    // Get treatments data
    const treatments = await import(`@/lib/treatments/${locale}.json`).then(
      (module) => module.default
    ).catch(() => {
      // Fallback to English if locale-specific treatments not found
      console.warn(`Treatments data for ${locale} not found, falling back to English`);
      return import('@/lib/treatments/en.json').then((module) => module.default);
    });
    
    // Find the specific treatment
    const treatment = treatments.find((t: any) => t.slug === cleanSlug);
    
    if (!treatment) {
      console.error(`Treatment with slug "${cleanSlug}" not found in locale "${locale}"`);
      return {
        title: `સારવાર મળી નથી - નિદાન આયુર્વેદ`,
        description: 'વિનંતી કરેલ આયુર્વેદિક સારવાર મળી નથી.'
      };
    }
    
    return {
      title: `${treatment.title} - ${dictionary.treatments.ayurvedicTreatment || 'આયુર્વેદિક સારવાર'} | નિદાન આયુર્વેદ`,
      description: treatment.shortDescription,
      openGraph: {
        title: `${treatment.title} - ${dictionary.treatments.ayurvedicTreatment || 'આયુર્વેદિક સારવાર'} | નિદાન આયુર્વેદ`,
        description: treatment.shortDescription,
        locale: locale,
        type: 'website',
        images: [
          {
            url: treatment.image || `/images/treatments/${cleanSlug}.jpg`,
            width: 1200,
            height: 630,
            alt: treatment.title
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title: `${treatment.title} - ${dictionary.treatments.ayurvedicTreatment || 'આયુર્વેદિક સારવાર'} | નિદાન આયુર્વેદ`,
        description: treatment.shortDescription,
        images: [treatment.image || `/images/treatments/${cleanSlug}.jpg`]
      },
      alternates: {
        canonical: `/${locale}/treatments/${cleanSlug}`,
        languages: {
          en: `/treatments/${cleanSlug}`,
          hi: `/hi/treatments/${cleanSlug}`,
          gu: `/gu/treatments/${cleanSlug}`,
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata for Gujarati treatment page:', error);
    return {
      title: 'આયુર્વેદિક સારવાર - નિદાન આયુર્વેદ',
      description: 'હોલિસ્ટિક હીલિંગ અને વેલનેસ માટે અમારી પ્રામાણિક આયુર્વેદિક સારવારનું અન્વેષણ કરો.',
    };
  }
}

// Generate static params for all treatments in Gujarati
export async function generateStaticParams() {
  const locale: Locale = 'gu';
  
  try {
    const treatmentsData = await import(`@/lib/treatments/${locale}.json`).then(
      (module) => module.default
    ).catch(() => {
      console.warn(`Could not load Gujarati treatments for static generation`);
      return [];
    });
    
    return treatmentsData.map((treatment: any) => ({
      slug: treatment.slug
    }));
  } catch (error) {
    console.error('Error generating static params for Gujarati treatments:', error);
    return [];
  }
}

export default async function GujaratiTreatmentPage({ params }: Props) {
  const locale: Locale = 'gu';
  
  const resolvedParams = await params;
  
  if (!resolvedParams || !resolvedParams.slug) {
    console.error('Missing slug parameter');
    return notFound();
  }
  
  // Safely handle the slug parameter
  const slug = resolvedParams.slug;
  
  // Strip .jpg extension if present in the slug
  const cleanSlug = slug.replace(/\.jpg$/, '');
  
  console.log(`Rendering Gujarati treatment page for slug: ${cleanSlug}`);
  
  try {
    const dictionary = await getDictionary(locale);
    
    // Get treatments data
    console.log(`Loading treatments data for locale: ${locale}`);
    const treatmentsData = await import(`@/lib/treatments/${locale}.json`).then(
      (module) => module.default
    ).catch((error) => {
      // Fallback to English if Gujarati treatments not found
      console.warn(`Gujarati treatments data not found, falling back to English. Error: ${error.message}`);
      return import('@/lib/treatments/en.json').then((module) => module.default);
    });
    
    // Find the treatment by slug
    const treatmentData = treatmentsData.find((treatment: any) => treatment.slug === cleanSlug);
    
    if (!treatmentData) {
      console.error(`Treatment with slug "${cleanSlug}" not found in locale "${locale}"`);
      return notFound();
    }
    
    console.log(`Found treatment: ${treatmentData.title} (${cleanSlug})`);
    
    // Generate FAQ data if it doesn't exist in the treatment data
    if (!treatmentData.faqs) {
      treatmentData.faqs = generateDefaultFaqs(treatmentData, dictionary, locale);
    }
    
    // Get the image path for preloading
    const imagePath = treatmentData.image || `/images/treatments/${cleanSlug}.jpg`;
    
    return (
      <>
        {/* Preload critical resources */}
        <Script id="preload-critical-images" strategy="beforeInteractive">
          {`
            // Preload the hero image
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = '${imagePath}';
            document.head.appendChild(preloadLink);
          `}
        </Script>
        
        <TreatmentPage
          dictionary={dictionary}
          locale={locale}
          treatmentData={treatmentData}
        />
      </>
    );
  } catch (error) {
    console.error(`Error in GujaratiTreatmentPage for ${slug}:`, error);
    return notFound();
  }
}

// Helper function to generate default FAQs if none are provided
function generateDefaultFaqs(treatment: any, dictionary: any, locale: Locale) {
  return [
    {
      question: dictionary.treatments.faq1Question || `${treatment.title} શું છે?`,
      answer: treatment.shortDescription
    },
    {
      question: dictionary.treatments.faq2Question || `${treatment.title} કેટલો સમય લે છે?`,
      answer: treatment.sessionDuration 
        ? `${dictionary.treatments.faq2Answer || `દરેક સેશન સામાન્ય રીતે ${treatment.sessionDuration} મિનિટ લે છે.`}`
        : (dictionary.treatments.faq2AnswerDefault || "સેશનનો સમયગાળો વ્યક્તિગત જરૂરિયાતો પર આધારિત બદલાય છે. વધુ માહિતી માટે કૃપા કરીને અમારા પ્રેક્ટિશનર્સનો સંપર્ક કરો.")
    },
    {
      question: dictionary.treatments.faq3Question || `${treatment.title} ના ફાયદા શું છે?`,
      answer: treatment.benefits && treatment.benefits.length > 0
        ? `${dictionary.treatments.faq3AnswerPrefix || "મુખ્ય ફાયદાઓમાં સામેલ છે:"} ${treatment.benefits.join(", ")}.`
        : (dictionary.treatments.faq3AnswerDefault || "આ સારવાર ઘણા આરોગ્ય લાભો આપે છે. તે તમને ખાસ કરીને કેવી રીતે મદદ કરી શકે છે તે સમજવા માટે અમારા આયુર્વેદિક ડૉક્ટરોનો સંપર્ક કરો.")
    }
  ];
} 