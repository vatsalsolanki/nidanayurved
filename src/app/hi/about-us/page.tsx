import AboutPage from '@/app/about-us/page';
import { Locale } from '@/lib/i18n';

// Re-export the metadata function with Hindi locale parameter
export { generateMetadata } from '@/app/about-us/page';

// Set locale parameter for Hindi
export default function HindiAboutPage() {
  return <AboutPage params={{ locale: 'hi' }} />;
} 