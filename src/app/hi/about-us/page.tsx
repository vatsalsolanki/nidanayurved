import AboutPage from '@/app/about-us/page';
import { Locale } from '@/lib/i18n';

// Define params type with proper Promise typing for Next.js 15
type Params = Promise<{ locale?: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

type Props = {
  params: Params;
  searchParams: SearchParams;
}

// Re-export the metadata function with Hindi locale parameter
export { generateMetadata } from '@/app/about-us/page';

// Set locale parameter for Hindi
export default function HindiAboutPage(props: Props) {
  // Simply pass the Promise params to the base AboutPage component
  return <AboutPage {...props} />;
} 