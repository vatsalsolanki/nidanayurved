import AboutPage from '@/app/about-us/page';
import { Locale } from '@/lib/i18n';

// Re-export the metadata function with Gujarati locale parameter
export { generateMetadata } from '@/app/about-us/page';

// Set locale parameter for Gujarati
export default function GujaratiAboutPage() {
  return <AboutPage params={{ locale: 'gu' }} />;
} 