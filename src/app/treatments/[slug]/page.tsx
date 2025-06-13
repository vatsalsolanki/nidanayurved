import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, Locale } from "@/lib/i18n";
import TreatmentHero from "./TreatmentHero";
import TreatmentDetails from "./TreatmentDetails";
import TreatmentCta from "./TreatmentCta";
import TreatmentPage from '../treatmentdetails/TreatmentPage';
import Script from "next/script";

// Define params type with proper Promise typing for Next.js 15
type ParamsType = Promise<{ slug: string; locale?: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

type Props = {
  params: ParamsType;
  searchParams: SearchParams;
}

export async function generateMetadata({ params }: { params: ParamsType }): Promise<Metadata> {
  // Use default locale if not specified
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || 'en') as Locale;
  const slug = resolvedParams?.slug || '';
  
  if (!slug) {
    return {
      title: `Treatment Not Found - Nidan Ayurved`,
      description: 'The requested Ayurvedic treatment could not be found.',
    };
  }
  
  // Strip .jpg extension if present in the slug
  const cleanSlug = slug.replace(/\.jpg$/, '');
  
  try {
    const dictionary = await getDictionary(locale);
    
    // Get treatment data for the current locale
    const treatmentsData = await import(`@/lib/treatments/${locale}.json`).then(
      (module) => module.default
    ).catch(() => {
      // Fallback to English if locale-specific treatments not found
      console.warn(`Treatments data for ${locale} not found, falling back to English`);
      return import('@/lib/treatments/en.json').then((module) => module.default);
    });
    
    // Find the treatment by slug
    const treatment = treatmentsData.find((t: any) => t.slug === cleanSlug);
    
    if (!treatment) {
      return {
        title: `Treatment Not Found - Nidan Ayurved`,
        description: 'The requested Ayurvedic treatment could not be found.',
      };
    }
    
    return {
      title: `${treatment.title} - ${dictionary.treatments.ayurvedicTreatment || 'Ayurvedic Treatment'} | Nidan Ayurved`,
      description: treatment.shortDescription,
      openGraph: {
        title: `${treatment.title} - ${dictionary.treatments.ayurvedicTreatment || 'Ayurvedic Treatment'} | Nidan Ayurved`,
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
        title: `${treatment.title} - ${dictionary.treatments.ayurvedicTreatment || 'Ayurvedic Treatment'} | Nidan Ayurved`,
        description: treatment.shortDescription,
        images: [treatment.image || `/images/treatments/${cleanSlug}.jpg`]
      },
      alternates: {
        canonical: locale === 'en' ? `/treatments/${cleanSlug}` : `/${locale}/treatments/${cleanSlug}`,
        languages: {
          en: `/treatments/${cleanSlug}`,
          hi: `/hi/treatments/${cleanSlug}`,
          gu: `/gu/treatments/${cleanSlug}`,
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata for treatment:', error);
    return {
      title: 'Ayurvedic Treatment - Nidan Ayurved',
      description: 'Explore our authentic Ayurvedic treatment for holistic healing and wellness.',
    };
  }
}

export async function generateStaticParams() {
  // Get treatments for each locale to generate static params
  const locales = ['en', 'hi', 'gu'];
  const params: { slug: string; locale?: string }[] = [];
  
  for (const locale of locales) {
    try {
      const treatmentsData = await import(`@/lib/treatments/${locale}.json`).then(
        (module) => module.default
      );
      
      // For English (default locale), don't include locale in path
      if (locale === 'en') {
        treatmentsData.forEach((treatment: any) => {
          params.push({ slug: treatment.slug });
        });
      } else {
        treatmentsData.forEach((treatment: any) => {
          params.push({ slug: treatment.slug, locale });
        });
      }
    } catch (error) {
      console.warn(`Could not load treatments for locale ${locale} for static generation`);
      // Skip if treatments for this locale don't exist
      continue;
    }
  }
  
  return params;
}

export default async function TreatmentDetailPage({ params }: Props) {
  // Get locale and slug from params
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || 'en') as Locale;
  const slug = resolvedParams?.slug || '';
  
  // Early return if no slug is provided
  if (!slug) {
    console.error('Missing slug parameter');
    return notFound();
  }
  
  // Strip .jpg extension if present in the slug
  const cleanSlug = slug.replace(/\.jpg$/, '');
  
  try {
    const dictionary = await getDictionary(locale);
    
    console.log(`Loading treatment data for slug: ${cleanSlug} (locale: ${locale})`);
    
    // Get treatments data for the current locale
    const treatmentsData = await import(`@/lib/treatments/${locale}.json`).then(
      (module) => module.default
    ).catch((error) => {
      // Fallback to English if locale-specific treatments not found
      console.warn(`Treatments data for ${locale} not found, falling back to English. Error: ${error.message}`);
      return import('@/lib/treatments/en.json').then((module) => module.default);
    });
    
    // Find the treatment by slug
    const treatmentData = treatmentsData.find((treatment: any) => treatment.slug === cleanSlug);
    
    if (!treatmentData) {
      console.error(`Treatment with slug "${cleanSlug}" not found`);
      return notFound();
    }
    
    console.log(`Found treatment: ${treatmentData.title} (${cleanSlug})`);
    
    // Generate FAQ data if it doesn't exist in the treatment data
    if (!treatmentData.faqs) {
      treatmentData.faqs = generateDefaultFaqs(treatmentData, dictionary, locale);
    }
    
    // Get the image path for preloading - ensure the correct path format
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
    console.error('Error in TreatmentDetailPage:', error);
    return notFound();
  }
}

// Helper function to generate default FAQs if none are provided
function generateDefaultFaqs(treatment: any, dictionary: any, locale: Locale) {
  return [
    {
      question: dictionary.treatments.faq1Question || `What is ${treatment.title}?`,
      answer: treatment.shortDescription
    },
    {
      question: dictionary.treatments.faq2Question || `How long does ${treatment.title} take?`,
      answer: treatment.sessionDuration 
        ? `${dictionary.treatments.faq2Answer || `Each session typically takes ${treatment.sessionDuration} minutes.`}`
        : (dictionary.treatments.faq2AnswerDefault || "Session duration varies based on individual needs. Please consult with our practitioners for more information.")
    },
    {
      question: dictionary.treatments.faq3Question || `What are the benefits of ${treatment.title}?`,
      answer: treatment.benefits && treatment.benefits.length > 0
        ? `${dictionary.treatments.faq3AnswerPrefix || "Key benefits include:"} ${treatment.benefits.join(", ")}.`
        : (dictionary.treatments.faq3AnswerDefault || "This treatment offers numerous health benefits. Consult with our Ayurvedic doctors to understand how it can specifically help you.")
    }
  ];
} 