import ContactPage from '@/app/contact/page';
import { Locale } from '@/lib/i18n';

// Re-export the metadata function with Hindi locale parameter
export { generateMetadata } from '@/app/contact/page';

// Set locale parameter for Hindi
export default function HindiContactPage() {
  return <ContactPage params={{ locale: 'hi' as Locale }} />;
} 