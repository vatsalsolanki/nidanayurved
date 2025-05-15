import AyurvedaPage from '@/app/what-is-ayurveda/page';
import { Locale } from '@/lib/i18n';

// Re-export the metadata function with Hindi locale parameter
export { generateMetadata } from '@/app/what-is-ayurveda/page';

// Set locale parameter for Hindi
export default function HindiAyurvedaPage() {
  return <AyurvedaPage params={{ locale: 'hi' as Locale }} />;
} 