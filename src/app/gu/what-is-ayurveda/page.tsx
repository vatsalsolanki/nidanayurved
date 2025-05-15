import AyurvedaPage from '@/app/what-is-ayurveda/page';
import { Locale } from '@/lib/i18n';

// Re-export the metadata function with Gujarati locale parameter
export { generateMetadata } from '@/app/what-is-ayurveda/page';

// Set locale parameter for Gujarati
export default function GujaratiAyurvedaPage() {
  return <AyurvedaPage params={{ locale: 'gu' as Locale }} />;
} 