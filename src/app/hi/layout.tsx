import { Locale } from '@/lib/i18n';

export default function HindiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This locale parameter will be passed to the root layout
  return children;
}

// Export locale to be used by parent layouts
export const params = {
  locale: 'hi' as Locale
}; 