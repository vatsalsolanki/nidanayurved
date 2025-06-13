import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/utils";
import { GalleryHeader } from "./GalleryHeader";
import { GalleryGrid } from "./GalleryGrid";
import { FloatingCTA } from "@/components/FloatingCTA";
import { FeaturedMoments } from "./FeaturedMoments";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary("en");
  
  return buildMetadata({
    title: dictionary.gallery.metaTitle,
    description: dictionary.gallery.metaDescription,
    url: "https://nidanayurved.com/gallery",
    locale: "en",
  });
}

export default async function GalleryPage() {
  const dictionary = await getDictionary("en");
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-amber-50/30">
      <GalleryHeader dictionary={dictionary} locale="en" />
      <FeaturedMoments dictionary={dictionary} locale="en" />
      <GalleryGrid dictionary={dictionary} locale="en" />
      <FloatingCTA dictionary={dictionary} locale="en" />
    </main>
  );
} 