import AyurvedaPage from '@/app/what-is-ayurveda/page';
import { Locale } from '@/lib/i18n';

// Define params type with proper Promise typing for Next.js 15
type Params = Promise<{ locale?: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

type Props = {
  params: Params;
  searchParams: SearchParams;
}

// Re-export the metadata function with Hindi locale parameter
export { generateMetadata } from '@/app/what-is-ayurveda/page';

// Set locale parameter for Hindi
export default function HindiAyurvedaPage(props: Props) {
  // Simply pass the Promise params to the base AyurvedaPage component
  return <AyurvedaPage {...props} />;
} 