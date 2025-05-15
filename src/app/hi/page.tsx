import { Metadata } from "next";
import { getDictionary, Locale } from '@/lib/i18n';
import { buildMetadata } from "@/lib/utils";
import { HeroSection } from "../home/HeroSection";
import { WhyAyurvedaSection } from "../home/WhyAyurvedaSection";
import { PanchakarmaSection } from "../home/PanchakarmaSection";
import { WhyNidanSection } from "../home/WhyNidanSection";
import { TestimonialsSection } from "../home/TestimonialsSection";
import { CTAStrip } from "../home/CTAStrip";
import { FloatingCTA } from "@/components/FloatingCTA";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = 'hi';
  const dictionary = await getDictionary(locale);
  
  return buildMetadata({
    title: "निदान आयुर्वेद - आयुर्वेद के साथ समग्र उपचार",
    description: "निदान आयुर्वेद में प्रामाणिक आयुर्वेदिक उपचार और चिकित्सा का अनुभव करें। मन, शरीर और आत्मा के बीच संतुलन बहाल करें।",
    url: "https://nidanayurved.com/hi",
    locale: locale,
  });
}

export default async function HindiHomePage() {
  const locale: Locale = 'hi';
  const dictionary = await getDictionary(locale);
  
  return (
    <main>
      <HeroSection dictionary={dictionary} locale={locale} />
      <WhyAyurvedaSection dictionary={dictionary} locale={locale} />
      <PanchakarmaSection dictionary={dictionary} locale={locale} />
      <WhyNidanSection dictionary={dictionary} locale={locale} />
      <TestimonialsSection dictionary={dictionary} locale={locale} />
      <CTAStrip dictionary={dictionary} locale={locale} />
      <FloatingCTA dictionary={dictionary} locale={locale} />
    </main>
  );
} 