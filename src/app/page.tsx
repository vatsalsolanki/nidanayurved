import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/utils";
import { HeroSection } from "./home/HeroSection";
import { WhyAyurvedaSection } from "./home/WhyAyurvedaSection";
import { PanchakarmaSection } from "./home/PanchakarmaSection";
import { WhyNidanSection } from "./home/WhyNidanSection";
import { TestimonialsSection } from "./home/TestimonialsSection";
import { CTAStrip } from "./home/CTAStrip";
import { FloatingCTA } from "@/components/FloatingCTA";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary("en");
  
  return buildMetadata({
    title: "Nidan Ayurved - Holistic Healing with Ayurveda",
    description: "Experience authentic Ayurvedic treatments and therapies at Nidan Ayurved. Restore balance between mind, body, and spirit.",
    url: "https://nidanayurved.com",
    locale: "en",
  });
}

export default async function Home() {
  const dictionary = await getDictionary("en");
  
  return (
    <main>
      <HeroSection dictionary={dictionary} locale="en" />
      <WhyAyurvedaSection dictionary={dictionary} locale="en" />
      <PanchakarmaSection dictionary={dictionary} locale="en" />
      <WhyNidanSection dictionary={dictionary} locale="en" />
      <TestimonialsSection dictionary={dictionary} locale="en" />
      <CTAStrip dictionary={dictionary} locale="en" />
      <FloatingCTA dictionary={dictionary} locale="en" />
    </main>
  );
}
