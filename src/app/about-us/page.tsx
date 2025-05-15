import { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/i18n';
import AboutHero from './AboutHero';
import OurTeam from './OurTeam';
import MissionVision from './MissionVision';
import Timeline from './Timeline';
import ClinicGallery from './ClinicGallery';
import TrustSection from './TrustSection';
import PhilosophySection from './PhilosophySection';
import CTAStrip from './CTAStrip';
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
      title: dictionary.about.metaTitle,
      description: dictionary.about.metaDescription,
      openGraph: {
        title: dictionary.about.metaTitle,
        description: dictionary.about.metaDescription,
        locale: locale,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: dictionary.about.metaTitle,
        description: dictionary.about.metaDescription,
      },
    };
  } catch (error) {
    return {
      title: 'About Us - Nidan Ayurved',
      description: 'Learn more about Nidan Ayurved and our mission to provide authentic Ayurvedic treatments.',
    };
  }
}

export default async function AboutPage({
  params = { locale: 'en' }
}: {
  params?: { locale?: string }
}) {
  // Use default locale if not specified
  const locale = (params.locale || 'en') as Locale;
  
  try {
    const dictionary = await getDictionary(locale);
    
    return (
      <div className="min-h-screen">
        <AboutHero dictionary={dictionary} locale={locale} />
        <TrustSection dictionary={dictionary} locale={locale} />
        <MissionVision dictionary={dictionary} locale={locale} />
        <PhilosophySection dictionary={dictionary} locale={locale} />
        <Timeline dictionary={dictionary} locale={locale} />
        <ClinicGallery dictionary={dictionary} locale={locale} />
        <OurTeam dictionary={dictionary} locale={locale} />
        <CTAStrip dictionary={dictionary} locale={locale} />
      </div>
    );
  } catch (error) {
    console.error("Error loading about page:", error);
    notFound();
  }
} 