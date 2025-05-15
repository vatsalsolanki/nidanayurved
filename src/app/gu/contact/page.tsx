import ContactPage from '@/app/contact/page';
import { Locale } from '@/lib/i18n';

// Re-export the metadata function with Gujarati locale parameter
export { generateMetadata } from '@/app/contact/page';

// Set locale parameter for Gujarati
export default function GujaratiContactPage() {
  return <ContactPage params={{ locale: 'gu' as Locale }} />;
} 