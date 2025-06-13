import ContactPage from '@/app/contact/page';
import { Locale } from '@/lib/i18n';

// Define params type with proper Promise typing for Next.js 15
type Params = Promise<{ locale?: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

type Props = {
  params: Params;
  searchParams: SearchParams;
}

// Re-export the metadata function with Gujarati locale parameter
export { generateMetadata } from '@/app/contact/page';

// Set locale parameter for Gujarati
export default function GujaratiContactPage(props: Props) {
  // Simply pass the Promise params to the base ContactPage component
  return <ContactPage {...props} />;
} 