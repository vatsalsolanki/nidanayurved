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
  const locale: Locale = 'gu';
  const dictionary = await getDictionary(locale);
  
  return buildMetadata({
    title: "નિદાન આયુર્વેદ - આયુર્વેદ સાથે સંપૂર્ણ ઉપચાર",
    description: "નિદાન આયુર્વેદ ખાતે પ્રામાણિક આયુર્વેદિક સારવાર અને થેરાપીનો અનુભવ કરો. મન, શરીર અને આત્મા વચ્ચે સંતુલન પુનઃસ્થાપિત કરો.",
    url: "https://nidanayurved.com/gu",
    locale: locale,
  });
}

export default async function GujaratiHomePage() {
  const locale: Locale = 'gu';
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