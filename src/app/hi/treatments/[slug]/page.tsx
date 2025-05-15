import { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import TreatmentPage from '@/app/treatments/treatmentdetails/TreatmentPage';
import Script from 'next/script';

// Define props type with proper Promise awaiting
type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale: Locale = 'hi';
  const slug = params.slug;
  
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
        title: `उपचार नहीं मिला - निदान आयुर्वेद`,
        description: 'अनुरोधित आयुर्वेदिक उपचार नहीं मिला।'
      };
    }
    
    return {
      title: `${treatment.title} - ${dictionary.treatments.ayurvedicTreatment || 'आयुर्वेदिक उपचार'} | निदान आयुर्वेद`,
      description: treatment.shortDescription,
      openGraph: {
        title: `${treatment.title} - ${dictionary.treatments.ayurvedicTreatment || 'आयुर्वेदिक उपचार'} | निदान आयुर्वेद`,
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
        title: `${treatment.title} - ${dictionary.treatments.ayurvedicTreatment || 'आयुर्वेदिक उपचार'} | निदान आयुर्वेद`,
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
    console.error('Error generating metadata for Hindi treatment page:', error);
    return {
      title: 'आयुर्वेदिक उपचार - निदान आयुर्वेद',
      description: 'होलिस्टिक हीलिंग और वेलनेस के लिए हमारे प्रामाणिक आयुर्वेदिक उपचार का अन्वेषण करें।',
    };
  }
}

// Generate static params for all treatments in Hindi
export async function generateStaticParams() {
  const locale: Locale = 'hi';
  
  try {
    const treatmentsData = await import(`@/lib/treatments/${locale}.json`).then(
      (module) => module.default
    ).catch(() => {
      console.warn(`Could not load Hindi treatments for static generation`);
      return [];
    });
    
    return treatmentsData.map((treatment: any) => ({
      slug: treatment.slug
    }));
  } catch (error) {
    console.error('Error generating static params for Hindi treatments:', error);
    return [];
  }
}

export default async function HindiTreatmentPage({ params }: Props) {
  const locale: Locale = 'hi';
  
  if (!params || !params.slug) {
    console.error('Missing slug parameter');
    return notFound();
  }
  
  // Safely handle the slug parameter
  const slug = params.slug;
  
  // Strip .jpg extension if present in the slug
  const cleanSlug = slug.replace(/\.jpg$/, '');
  
  console.log(`Rendering Hindi treatment page for slug: ${cleanSlug}`);
  
  try {
    const dictionary = await getDictionary(locale);
    
    // Get treatments data
    console.log(`Loading treatments data for locale: ${locale}`);
    const treatmentsData = await import(`@/lib/treatments/${locale}.json`).then(
      (module) => module.default
    ).catch((error) => {
      // Fallback to English if Hindi treatments not found
      console.warn(`Hindi treatments data not found, falling back to English. Error: ${error.message}`);
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
    console.error(`Error in HindiTreatmentPage for ${slug}:`, error);
    return notFound();
  }
}

// Helper function to generate default FAQs if none are provided
function generateDefaultFaqs(treatment: any, dictionary: any, locale: Locale) {
  return [
    {
      question: dictionary.treatments.faq1Question || `${treatment.title} क्या है?`,
      answer: treatment.shortDescription
    },
    {
      question: dictionary.treatments.faq2Question || `${treatment.title} में कितना समय लगता है?`,
      answer: treatment.sessionDuration 
        ? `${dictionary.treatments.faq2Answer || `प्रत्येक सत्र आमतौर पर ${treatment.sessionDuration} मिनट लेता है।`}`
        : (dictionary.treatments.faq2AnswerDefault || "सत्र की अवधि व्यक्तिगत आवश्यकताओं के आधार पर भिन्न होती है। अधिक जानकारी के लिए कृपया हमारे चिकित्सकों से परामर्श करें।")
    },
    {
      question: dictionary.treatments.faq3Question || `${treatment.title} के क्या लाभ हैं?`,
      answer: treatment.benefits && treatment.benefits.length > 0
        ? `${dictionary.treatments.faq3AnswerPrefix || "प्रमुख लाभों में शामिल हैं:"} ${treatment.benefits.join(", ")}.`
        : (dictionary.treatments.faq3AnswerDefault || "यह उपचार कई स्वास्थ्य लाभ प्रदान करता है। यह विशेष रूप से आपकी कैसे मदद कर सकता है, यह समझने के लिए हमारे आयुर्वेदिक डॉक्टरों से परामर्श करें।")
    }
  ];
} 